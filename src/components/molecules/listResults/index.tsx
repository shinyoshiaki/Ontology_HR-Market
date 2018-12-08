import * as React from "react";
import { HumanData } from "../../../interface";

export interface IlistResultsProps {
  listResults: HumanData[];
}

export interface IlistResultsState {}

export default class ListResultsMol extends React.Component<IlistResultsProps, IlistResultsState> {
  constructor(props: IlistResultsProps) {
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
        listResults
        {this.props.listResults.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
