import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import SearchHumanOrg, { IsearchHumanOrgProps } from "../../organisms/searchHuman";

export interface IScoutTempProps extends IheaderOrgProps, IsearchHumanOrgProps {}

export default class ScoutTemp extends React.Component<IScoutTempProps, {}> {
  constructor(props: IScoutTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props}
          style={{
            margin:"0px"
          }}
        />
        <SearchHumanOrg {...this.props} />
      </div>
    );
  }
}
