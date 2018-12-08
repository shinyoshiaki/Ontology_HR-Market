import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";

export interface IBuyTempProps extends IheaderOrgProps {}

export default class BuyTemp extends React.Component<IBuyTempProps, {}> {
  constructor(props: IBuyTempProps) {
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
