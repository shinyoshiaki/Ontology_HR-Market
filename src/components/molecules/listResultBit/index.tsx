import * as React from "react";
import { HumanData } from "../../../interface";

export interface IlistResultBitProps {
  listResultBit: HumanData[];
}

export interface IlistResultBitState {}

export default class ListResultBitMol extends React.Component<IlistResultBitProps, IlistResultBitState> {
  constructor(props: IlistResultBitProps) {
    super(props);
    this.state = {};
  }

  private renderComment(human: HumanData, i: number) {
    return JSON.stringify(human);
    // <ViewComment id={comment.id} msg={comment.msg} key={i} />;
  }

  render() {
    return (
      <div>
        listResultBit
        {this.props.listResultBit.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
