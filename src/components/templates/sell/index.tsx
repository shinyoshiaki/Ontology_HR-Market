import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";

export interface ISellTempProps extends IheaderOrgProps {}

export default class SellTemp extends React.Component<ISellTempProps, {}> {
  constructor(props: ISellTempProps) {
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
