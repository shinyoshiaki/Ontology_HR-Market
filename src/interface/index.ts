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
