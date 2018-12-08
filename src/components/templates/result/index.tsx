import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";

export interface IResultTempProps extends IheaderOrgProps {}

export default class ResultTemp extends React.Component<IResultTempProps, {}> {
  constructor(props: IResultTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
      </div>
    );
  }
}
