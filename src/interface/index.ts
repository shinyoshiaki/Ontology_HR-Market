export interface JobData {
  company: string;
  type: string;
  start: string;
  end: string;
}

export interface HumanData {
  name: string;
  age?: number;
  gender?: number;
  company: string;
  history?: JobData[];
  mail?: string;
  memo?: string;
}

interface HumanDatas {
  datas: HumanData[];
}

export interface Ibid {
  human: HumanData[];
  amount: number;
}

export interface IlistBidProps {
  listBid: Ibid[];
}

export const makeJobDataMock = (payload: { [key in keyof JobData]?: JobData[key] } = {}): JobData => {
  return Object.assign(
    {},
    {
      company: "this is mock string",
      type: "this is mock string",
      start: "this is mock string",
      end: "this is mock string"
    },
    payload
  );
};

export const makeHumanDataMock = (payload: { [key in keyof HumanData]?: HumanData[key] } = {}): HumanData => {
  return Object.assign(
    {},
    {
      name: "this is mock string",
      age: 1,
      gender: 1,
      company: "this is mock string",
      history: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeJobDataMock())),
      mail: "this is mock string",
      memo: "this is mock string"
    },
    payload
  );
};

export const makeIbidMock = (payload: { [key in keyof Ibid]?: Ibid[key] } = {}): Ibid => {
  return Object.assign(
    {},
    {
      human: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeHumanDataMock())),
      amount: 1
    },
    payload
  );
};

export const makeIlistBidPropsMock = (
  payload: { [key in keyof IlistBidProps]?: IlistBidProps[key] } = {}
): IlistBidProps => {
  return Object.assign(
    {},
    {
      listBid: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeIbidMock()))
    },
    payload
  );
};

export const makeHumanDatasMock = (payload: { [key in keyof HumanDatas]?: HumanDatas[key] } = {}): HumanDatas => {
  return Object.assign(
    {},
    {
      datas: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeHumanDataMock()))
    },
    payload
  );
};
