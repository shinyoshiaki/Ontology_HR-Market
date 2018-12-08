import * as React from "react";
import { HumanData } from "../../../interface";

export interface IdetailWorkerProps {
  detailHuman?: HumanData;
}

export interface IdetailWorkerState {}

export default class DetailWorkerMol extends React.Component<IdetailWorkerProps, IdetailWorkerState> {
  constructor(props: IdetailWorkerProps) {
    super(props);
  }

  render() {
    const { detailHuman } = this.props;
    return <div>{JSON.stringify(detailHuman)}</div>;
  }
}
