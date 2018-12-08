import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";

export interface IMarketTempProps extends IheaderOrgProps {}

export default class MarketTemp extends React.Component<IMarketTempProps, {}> {
  constructor(props: IMarketTempProps) {
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
