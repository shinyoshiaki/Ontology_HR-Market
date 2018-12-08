import * as React from "react";
import StreamChatOrg, { IStreamChatProps } from "../../organisms/streamchat";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";

export interface IStreamTempProps extends IStreamChatProps, IheaderOrgProps {}

export default class StreamTemp extends React.Component<IStreamTempProps, {}> {
  constructor(props: IStreamTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
        <StreamChatOrg {...this.props} />
      </div>
    );
  }
}
