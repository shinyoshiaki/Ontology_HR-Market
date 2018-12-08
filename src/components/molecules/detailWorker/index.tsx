import * as React from "react";
import { HumanData } from "../../../interface";

export interface IdetailWorkerProps {
  human: HumanData;
}

export interface IdetailWorkerState {}

export default class DetailWorkerMol extends React.Component<IdetailWorkerProps, IdetailWorkerState> {
  constructor(props: IdetailWorkerProps) {
    super(props);
  }

  render() {
    const { human } = this.props;
    return <div>{JSON.stringify(human)}</div>;
  }
}
