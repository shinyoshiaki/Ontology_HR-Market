import * as React from "react";
import { HumanData } from "../../../interface";

export interface IlistWorkerProps {
  human: HumanData;
}

export interface IlistWorkerState {}

export default class ListWorkerMol extends React.Component<IlistWorkerProps, IlistWorkerState> {
  constructor(props: IlistWorkerProps) {
    super(props);
  }

  render() {
    return <div>a</div>;
  }
}
