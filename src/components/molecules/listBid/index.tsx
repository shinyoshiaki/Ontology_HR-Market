import * as React from "react";
import ViewComment from "../../atoms/viewComment";
import {HumanData} from '../../../interface'

export interface IlistBidProps {
  listBidComments: HumanData[];
  maxheight?: string;
  style?: object;
}

export interface IlistBidState {}

export default class ListBidMol extends React.Component<
  IlistBidProps,
  IlistBidState
> {
  url?: string;
  constructor(props: IlistBidProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  private renderComment(comment: HumanData, i: number) {
    return <ViewComment id={comment.id} msg={comment.msg} key={i} />;
  }

  render() {
    const { maxheight } = this.props;
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10,
          maxHeight: maxheight ? maxheight : "50vh",
          overflow: "scroll",
          ...this.props.style
        }}
      >
        {this.props.listBidComments.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
