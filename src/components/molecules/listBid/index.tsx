import * as React from "react";
import { HumanData, Ibid } from "../../../interface";
import ViewBid from "../../atoms/viewBid";

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

  private renderComment(bid: Ibid, i: number) {
    return <ViewBid viewBid={bid} key={i} />;
  }

  render() {
    const { listBid } = this.props;
    return (
      <div style={{ overflow: "scroll" }}>{listBid ? listBid.map((v, i) => this.renderComment(v, i)) : undefined}</div>
    );
  }
}
