import { AbiInfo, Parameter, ParameterType, RestClient } from "ontology-ts-sdk";
import * as json from "./helloworld.abi.json";
import { Dispatch, Action } from "redux";
import { client } from "ontology-dapi";
import { HumanData, Ibid, makeHumanDatasMock, Company } from "../interface";
import { onScCall } from "../domain/index";

const rest = new RestClient("http://polaris1.ont.io:20334");
const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
const codeHash = abiInfo.getHash().replace("0x", "");
console.log({ codeHash });

export interface ContractState {
  userInfo?: HumanData;
  myAddress?: string;
  companyInfo?: Company;
  listWorkers: HumanData[];
  listResultSearchHumans: HumanData[];
  listResultAuction: HumanData[];
  detailHuman?: HumanData;
  listBid: Ibid[];
}

const initialState: ContractState = {
  userInfo: undefined,
  myAddress: undefined,
  companyInfo: undefined,
  listWorkers: [],
  listResultSearchHumans: [],
  listResultAuction: makeHumanDatasMock().datas,
  detailHuman: undefined,
  listBid: []
};

enum ActionNames {
  SET_VALUE = "contract/set_value"
}

export enum EcontractValue {
  myAddress = "myAddress",
  listWorkers = "listWorkers",
  detailHuman = "detailHuman",
  userInfo = "userInfo",
  listResultSearchHumans = "listResultSearchHumans",
  listBid = "listBid",
  companyInfo = "companyInfo"
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
    new Parameter(abiFunction.parameters[3].getName(), ParameterType.String, (Date.now() + 1000 * 10).toString())
    // 30
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
    return true;
  } else {
    return false;
  }
}

async function isAuctionClosed(address: string) {
  const url = "auction_" + address;
  const result = await rest.getStorage(codeHash, Buffer.from(url, "ascii").toString("hex")).catch(console.log);
  if (!result || !result.Result) return;
  const arr = Buffer.from(result.Result, "hex")
    .toString("ascii")
    .split("$");
  const end = parseInt(arr[3], 10);
  if (Date.now() > end) {
    console.log("end auction");
    return true;
  } else {
    return false;
  }
}

let listenCloseAuctionFlag = false;
export async function listenCloseAuction(address: string, cb?: () => void) {
  if (listenCloseAuctionFlag) return;
  listenCloseAuctionFlag = true;

  const interval = setInterval(async () => {
    const result = await isAuctionClosed(address);
    if (result) {
      clearInterval(interval);
      if (cb) cb();
    }
  }, 1000);
}

export async function registerBid(address: string, companyAddress: string, price: number) {
  console.log("registerBid");
  const abiFunction = abiInfo.getFunction("RegisterBid");
  const human = await getPerson(address);
  if (!human) return;
  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, address),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.String, companyAddress),
    new Parameter(abiFunction.parameters[2].getName(), ParameterType.String, price.toString())
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

let listenBidflag = false;
export async function listenBid(address: string, dispatch: Dispatch<SetValueAction>) {
  if (listenBidflag) return;
  const closed = await isAuctionClosed(address);
  if (closed) return;
  const interval = setInterval(async () => {
    listenBidflag = true;
    let bids: Ibid[] = [];
    const url = "bids_" + address;
    const result = await rest.getStorage(codeHash, Buffer.from(url, "ascii").toString("hex")).catch(console.log);
    if (!result || !result.Result) return;
    const bidsArr = Buffer.from(result.Result, "hex")
      .toString("ascii")
      .split("#");
    bids = bidsArr.map(bidRaw => {
      const bidArr = bidRaw.split("$");
      const bid: Ibid = {
        personAddr: address,
        companyAddr: bidArr[0],
        price: parseInt(bidArr[1], 10),
        now: Date.now().toString()
      };
      return bid;
    });

    setContractValue(EcontractValue.listBid, bids, dispatch);
  }, 1000);
  return interval;
}

export async function existCompany(address: string, dispatch: Dispatch<SetValueAction>) {
  const url = "company_" + address;
  const result = await rest.getStorage(codeHash, Buffer.from(url, "ascii").toString("hex")).catch(console.log);
  if (result.Result && result.Result.length > 0) {
    console.log("company exist", result);
    const name = Buffer.from(result.Result, "hex").toString("ascii");
    setContractValue(EcontractValue.companyInfo, { companyAddr: address, name } as Company, dispatch);
    return name;
  } else {
    return false;
  }
}

export async function registerCompany(company: Company, dispatch: Dispatch<SetValueAction>) {
  console.log("RegisterCompany");
  const abiFunction = abiInfo.getFunction("RegisterCompany");

  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, company.companyAddr),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.String, company.name)
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
    setContractValue(EcontractValue.companyInfo, company, dispatch);
    return true;
  } else return false;
}

export async function registerCompanyPerson(personAddr: string, companyAddr: string) {
  console.log("RegisterCompanyPerson");
  const abiFunction = abiInfo.getFunction("RegisterCompanyPerson");
  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.String, companyAddr),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.String, personAddr)
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

let listenCompanyPersonFlag = false;
export async function listenCompanyPerson(company: Company, dispatch: Dispatch<SetValueAction>) {
  if (listenCompanyPersonFlag) return;
  setInterval(async () => {
    listenCompanyPersonFlag = true;
    const address = "company_" + company.companyAddr + "_persons";
    const result = await rest.getStorage(codeHash, Buffer.from(address, "ascii").toString("hex")).catch(console.log);
    console.log({ result });
    if (!result || !result.Result) return;
    const arr = Buffer.from(result.Result, "hex")
      .toString("ascii")
      .split("$");
    console.log({ arr });
    const workers: HumanData[] = [];
    for (const pr of arr) {
      let human = await getPerson(pr);
      if (!human) human = { name: "未登録ユーザ", company: company.name, address: pr };
      workers.push(human);
    }
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
