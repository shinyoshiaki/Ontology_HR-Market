import * as React from "react";
import ListComment, { IlistCommentProps } from "../../molecules/listComment";

import ListSuperChat, {
  IlistSuperChatProps
} from "../../molecules/listSuperChat";

export interface IStreamChatProps
  extends IlistCommentProps,
    IlistSuperChatProps {
  style?: object;
}

export default class StreamChatOrg extends React.Component<
  IStreamChatProps,
  {}
> {
  constructor(props: IStreamChatProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <ListSuperChat {...this.props} />
          <ListComment {...this.props} maxheight="70vh" />
        </div>
      </div>
    );
  }
}
