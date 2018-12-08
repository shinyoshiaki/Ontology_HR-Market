import * as React from "react";
import { HumanData } from "../../../interface";
import ViewAuctionResult, { IviewAuctionResultProps } from "../../atoms/viewAuctionResult";

export interface IlistResultAuctionProps extends IviewAuctionResultProps {
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
    return <ViewAuctionResult {...this.props} resultHuman={human} key={i} />;
  }

  render() {
    return (
      <div style={{ ...this.props.style, overflow: "scroll" }}>
        {this.props.listResultAuction.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
