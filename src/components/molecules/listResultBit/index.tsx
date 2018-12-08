import * as React from "react";
import { HumanData } from "../../../interface";
import ViewBitResult, { IviewBitResultProps } from "../../atoms/viewBitResult";

export interface IlistResultBitProps extends IviewBitResultProps {
  listResultBit: HumanData[];
  style?: React.CSSProperties;
}

export interface IlistResultBitState {}

export default class ListResultBitMol extends React.Component<IlistResultBitProps, IlistResultBitState> {
  constructor(props: IlistResultBitProps) {
    super(props);
    this.state = {};
  }

  private renderComment(human: HumanData, i: number) {
    return <ViewBitResult {...this.props} resultHuman={human} key={i} />;
  }

  render() {
    return (
      <div style={{ ...this.props.style, overflow: "scroll" }}>
        {this.props.listResultBit.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
