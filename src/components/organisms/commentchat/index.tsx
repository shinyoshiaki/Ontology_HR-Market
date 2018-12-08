import * as React from "react";
import ListComment, { IlistCommentProps } from "../../molecules/listComment";
import FormComment, { IformCommentProps } from "../../molecules/formComment";
import FormSetAddress, {
  IformSetAddressProps
} from "../../molecules/formSetAddress";
import ListSuperChat, {
  IlistSuperChatProps
} from "../../molecules/listSuperChat";

export interface ICommentChatProps
  extends IlistCommentProps,
    IformCommentProps,
    IformSetAddressProps,
    IlistSuperChatProps {
  style?: object;
}

export default class CommentChatOrg extends React.Component<
  ICommentChatProps,
  {}
> {
  constructor(props: ICommentChatProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "90vh"
          }}
        >
          <FormSetAddress {...this.props} />
          <ListSuperChat {...this.props} />
          <div style={{ flex: 1 }}>
            <ListComment {...this.props} style={{ height: "100%" }} />
          </div>
          <FormComment {...this.props} style={{ marginTop: "auto" }} />
        </div>
      </div>
    );
  }
}
