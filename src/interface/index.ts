export interface JobData {
  company: string;
  type: string;
  start: string;
  end: string;
}

export interface HumanData {
  name: string;
  age: number;
  gender: number;
  company: string;
  history: JobData[];
  mail: string;
  memo: string;
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
