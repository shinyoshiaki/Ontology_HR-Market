import * as React from "react";
import { HumanData } from "../../../interface";
import ViewBitResult, { IviewBitResultProps } from "../../atoms/viewBitResult";

export interface IlistResultAuctionProps extends IviewBitResultProps {
  listResultAuction: HumanData[];
  style?: React.CSSProperties;
}

export interface IlistResultAuctionState {}

export default class ListResultAuctionMol extends React.Component<IlistResultAuctionProps, IlistResultAuctionState> {
  constructor(props: IlistResultAuctionProps) {
    super(props);
    this.state = {};
  }

  private renderComment(human: HumanData, i: number) {
    return <ViewBitResult {...this.props} resultHuman={human} key={i} />;
  }

  render() {
    return (
      <div style={{ ...this.props.style, overflow: "scroll" }}>
        {this.props.listResultAuction.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
