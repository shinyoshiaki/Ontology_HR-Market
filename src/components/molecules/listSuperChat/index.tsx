import * as React from "react";
import { CommentData } from "../listComment";
import Identicons from "react-blockies-image";

export interface IlistSuperChatProps {
  listSuperChatComments: CommentData[];
  maxheight?: string;
  style?: object;
}

export interface IlistSuperChatState {}

export default class ListSuperChat extends React.Component<IlistSuperChatProps, IlistSuperChatState> {
  url?: string;
  constructor(props: IlistSuperChatProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  private renderComment(v: CommentData, i: number) {
    return (
      <div
        style={{
          flex: "0 0 auto",
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 5,
          padding: 10,
          whiteSpace: "nowrap"
        }}
        key={i}
      >
        <Identicons seed={v.id} scale={3} />
        {"　" + v.money}
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          overflow: "scroll",
          height: "auto"
        }}
      >
        <div style={{ display: "flex" }}>
          {this.props.listSuperChatComments.map((v, i) => {
            if (v.money > 0) return this.renderComment(v, i);
            else return undefined;
          })}
        </div>
      </div>
    );
  }
}
