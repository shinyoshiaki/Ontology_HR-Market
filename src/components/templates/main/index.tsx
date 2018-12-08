import * as React from "react";
import CommentChatOrg, { ICommentChatProps } from "../../organisms/commentchat";
import Video from "../../organisms/video";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";

interface IMainTempProps extends ICommentChatProps, IheaderOrgProps {}

export default class MainTemp extends React.Component<IMainTempProps, {}> {
  constructor(props: IMainTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <HeaderOrg {...this.props} />
          <div style={{ display: "flex" }}>
            <Video style={{ width: "70%" }} />
            <CommentChatOrg {...this.props} style={{ width: "30%" }} />
          </div>
        </div>
      </div>
    );
  }
}
