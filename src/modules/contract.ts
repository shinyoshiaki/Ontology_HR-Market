import {
  AbiInfo,
  Parameter,
  ParameterType
  // , RestClient, Parameter, ParameterType
} from "ontology-ts-sdk";
import * as json from "./helloworld.abi.json";
import { Dispatch, Action } from "redux";
import { client } from "ontology-dapi";
import { HumanData } from "../interface/index.js";

// import { onScCall } from "./wallet";

// const rest = new RestClient("http://polaris1.ont.io:20334");
const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
const codeHash = abiInfo.getHash().replace("0x", "");
console.log({ codeHash });

const abiFunction = abiInfo.getFunction("ReadPerson");

abiFunction.setParamsValue(new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, "aaa"));

async function test() {
  //   const result = await rest
  //     .getStorage(codeHash, Buffer.from("auction_aaa", "ascii").toString("hex"))
  //     .catch(console.log);
  //   console.log({ result });
  //   await onScCall({
  //     scriptHash: codeHash,
  //     operation: abiFunction.name,
  //     args: abiFunction.parameters,
  //     gasLimit: 20000,
  //     gasPrice: 500
  //   }).catch(console.log);
  //   await onScCall({
  //     scriptHash: codeHash,
  //     operation: abiFunction.name,
  //     args: abiFunction.parameters
  //   }).catch(console.log);
}

test();

export interface ContractState {
  myAddress?: string;
  listWorkers: HumanData[];
  listResultSearchHumans: HumanData[];
  listResultAuction: HumanData[];
}

const initialState: ContractState = {
  myAddress: undefined,
  listWorkers: [],
  listResultSearchHumans: [],
  listResultAuction: []
};

enum ActionNames {
  SET_VALUE = "contract/set_value"
}

export enum EcontractValue {
  myAddress = "myAddress"
}

interface SetValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export async function setMyAddress(dispatch: Dispatch<SetValueAction>) {
  const address = await client.api.asset.getAccount();
  if (address) setContractValue(EcontractValue.myAddress, address, dispatch);
  return address;
}

export function setContractValue(key: EcontractValue, value: any, dispatch: Dispatch<SetValueAction>) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

type ContractActions = SetValueAction;

export default function reducer(state = initialState, action: ContractActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
}
