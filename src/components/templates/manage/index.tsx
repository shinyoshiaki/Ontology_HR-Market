import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import ManageLeftOrg, { ImanageLeftOrgProps } from "../../organisms/manageLeft";
import ManageRightOrg, { ImanageRightOrgProps } from "../../organisms/manageRight";

export interface ImangeTempProps extends ImanageLeftOrgProps, ImanageRightOrgProps, IheaderOrgProps {}

export default class ManageTemp extends React.Component<ImangeTempProps, {}> {
  constructor(props: ImangeTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
        <div
          style={{
            display: "inline-block",
            width: "280px"
          }}
        >
          <ManageLeftOrg {...this.props} />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "calc(100% - 280px)",
            verticalAlign: "top"
          }}
        >
          <ManageRightOrg {...this.props} />
        </div>
      </div>
    );
  }
}
