import { Crypto } from "ontology-ts-sdk";
import * as jsonBin from "./helloworld.abi.json";
import { Dispatch, Action } from "redux";
import { client } from "ontology-dapi";

const json = jsonBin;

console.log({ json });

export interface Walletstate {
  targetAddress?: string;
  myAddress?: string;
}

const initialState: Walletstate = {
  targetAddress: undefined,
  myAddress: undefined
};

enum ActionNames {
  SET_VALUE = "wallet/set_value"
}

export enum EwalletValue {
  targetAddress = "targetAddress",
  myAddress = "myAddress"
}

interface SetValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export function setWalletValue(key: EwalletValue, value: any, dispatch: Dispatch<SetValueAction>) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

export async function setMyAddress(dispatch: Dispatch<SetValueAction>) {
  const address = await client.api.asset.getAccount();
  if (address) setWalletValue(EwalletValue.myAddress, address, dispatch);
  return address;
}

export function address2scriptHash(address: string) {
  const ad = new Crypto.Address(address);
  return ad.serialize();
}



interface Iinvoke {
  scriptHash: string;
  operation: string;
  args?: any[];
  gasPrice?: number;
  gasLimit?: number;
  requireIdentity?: boolean;
}

export async function onScCall(values: Iinvoke) {
  return new Promise<object>(async (resolve, reject) => {
    client.registerClient({});
    const { scriptHash, operation, gasPrice, gasLimit, requireIdentity, args } = values;

    console.log({ args });
    try {
      const result = await client.api.smartContract.invoke({
        scriptHash,
        operation,
        args,
        gasPrice,
        gasLimit,
        requireIdentity
      });
      console.log("onScCall finished, result:" + JSON.stringify(result));
      resolve(result);
    } catch (e) {
      console.log("onScCall error:", e);
      reject(e);
    }
  });
}

type WalletActions = SetValueAction;

export default function reducer(state = initialState, action: WalletActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
}
