import { AbiInfo, Parameter, ParameterType, RestClient } from "ontology-ts-sdk";
import * as json from "./helloworld.abi.json";
import { Dispatch, Action } from "redux";
import { client } from "ontology-dapi";
import { HumanData, Ibid, makeHumanDatasMock, makeIlistBidPropsMock } from "../interface";
import { onScCall } from "../domain/index";

const rest = new RestClient("http://polaris1.ont.io:20334");
const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
const codeHash = abiInfo.getHash().replace("0x", "");
console.log({ codeHash });

export interface ContractState {
  userInfo?: HumanData;
  myAddress?: string;
  listWorkers: HumanData[];
  listResultSearchHumans: HumanData[];
  listResultAuction: HumanData[];
  detailHuman?: HumanData;
  listBid: Ibid[];
}

const initialState: ContractState = {
  userInfo: undefined,
  myAddress: undefined,
  listWorkers: makeHumanDatasMock().datas,
  listResultSearchHumans: [],
  listResultAuction: makeHumanDatasMock().datas,
  detailHuman: undefined,
  listBid: makeIlistBidPropsMock().listBid
};

enum ActionNames {
  SET_VALUE = "contract/set_value"
}

export enum EcontractValue {
  myAddress = "myAddress",
  listWorkers = "listWorkers",
  detailHuman = "detailHuman",
  userInfo = "userInfo",
  listResultSearchHumans = "listResultSearchHumans"
}

interface SetValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export function setContractValue(key: EcontractValue, value: any, dispatch: Dispatch<SetValueAction>) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

export async function setMyAddress(dispatch: Dispatch<SetValueAction>) {
  const address = await client.api.asset.getAccount();
  if (address) setContractValue(EcontractValue.myAddress, address, dispatch);
  return address;
}

export async function existPerson() {
  const address = await client.api.asset.getAccount();
  const url = "person_" + address;
  const result = await rest.getStorage(codeHash, Buffer.from(url, "ascii").toString("hex")).catch(console.log);
  console.log("existperson", { result });
  if (result.Result && result.Result.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function getPerson(address: string) {
  const url = "person_" + address;
  const result = await rest.getStorage(codeHash, Buffer.from(url, "ascii").toString("hex")).catch(console.log);
  if (result.Result) {
    const arr = Buffer.from(result.Result, "hex")
      .toString("ascii")
      .split("$");
    const human: HumanData = { address, name: arr[0], company: arr[1] };
    return human;
  } else {
    return undefined;
  }
}

export async function SearchPerson(address: string, dispatch: Dispatch<SetValueAction>) {
  const human = await getPerson(address);
  setContractValue(EcontractValue.listResultSearchHumans, [human], dispatch);
}

export async function registerPerson(human: HumanData) {
  const abiFunction = abiInfo.getFunction("RegisterPerson");
  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, human.address),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.String, human.name),
    new Parameter(abiFunction.parameters[2].getName(), ParameterType.String, human.company)
  );
  const result = await onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  }).catch(console.log);
  if (result) {
    console.log("success", result);
  }
}

export async function existAuction(address: string) {
  const url = "auction_" + address;
  const result = await rest.getStorage(codeHash, Buffer.from(url, "ascii").toString("hex")).catch(console.log);
  if (result.Result && result.Result.length > 0) {
    console.log("auction exist", result);
    return true;
  } else {
    return false;
  }
}

export async function registerAuction(address: string) {
  console.log("registerAuction");
  const abiFunction = abiInfo.getFunction("RegisterAuction");
  const human = await getPerson(address);
  if (!human) return;
  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, address),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.String, human.company),
    new Parameter(abiFunction.parameters[2].getName(), ParameterType.String, Date.now().toString()),
    new Parameter(abiFunction.parameters[3].getName(), ParameterType.String, (Date.now() + 1000 * 60).toString())
  );
  const result = await onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  }).catch(console.log);
  if (result) {
    console.log("success", result);
  }
}

export async function addWorker(human: HumanData) {
  console.log("addworker", { human });
  const abiFunction = abiInfo.getFunction("RegisterPerson");

  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, human.name),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.String, human.company)
  );

  await onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  }).catch(console.log);
}

export async function listenWorkers(companyName: string, dispatch: Dispatch<SetValueAction>) {
  setInterval(async () => {
    const address = companyName;
    const result = await rest.getStorage(codeHash, address).catch(console.log);
    console.log({ result });
    const workers: HumanData[] = [];
    setContractValue(EcontractValue.listWorkers, workers, dispatch);
  }, 1000);
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
