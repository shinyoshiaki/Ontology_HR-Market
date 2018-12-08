import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import SearchHumanOrg, { IsearchHumanOrgProps } from "../../organisms/searchHuman";

export interface IBuyTempProps extends IheaderOrgProps, IsearchHumanOrgProps {}

export default class BuyTemp extends React.Component<IBuyTempProps, {}> {
  constructor(props: IBuyTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
        <SearchHumanOrg {...this.props} />
      </div>
    );
  }
}
