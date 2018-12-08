import * as React from "react";
import DetailWorkerMol from "../../molecules/detailWorker";
import { HumanData } from "../../../interface";

export interface ImanageLeftOrgProps {
  human?: HumanData;
  style?: object;
}

export default class ManageLeftOrg extends React.Component<ImanageLeftOrgProps, {}> {
  constructor(props: ImanageLeftOrgProps) {
    super(props);
  }

  public render() {
    const { human } = this.props;
    return <div>{human ? <DetailWorkerMol human={human} /> : undefined}</div>;
  }
}
