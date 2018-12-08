import * as React from "react";
import { HumanData } from "../../../interface";

export interface Ibid {
  human: HumanData[];
  amount: number;
}

export interface IlistBidProps {
  listBid: Ibid[];
}

export interface IlistBidState {}

export default class ListBidMol extends React.Component<IlistBidProps, IlistBidState> {
  url?: string;
  constructor(props: IlistBidProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  private renderComment(human: Ibid, i: number) {
    return JSON.stringify(human);
    //  <ViewComment id={comment.id} msg={comment.msg} key={i} />;
  }

  render() {
    return <div style={{ overflow: "scroll" }}>{this.props.listBid.map((v, i) => this.renderComment(v, i))}</div>;
  }
}
