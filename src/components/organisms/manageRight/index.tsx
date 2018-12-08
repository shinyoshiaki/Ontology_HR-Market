import * as React from "react";
import DetailWorkerMol from "../../molecules/detailWorker";
import { HumanData } from "../../../interface";

export interface ImanageRightOrgProps {
  human?: HumanData;
}

export default class ManageRightOrg extends React.Component<ImanageRightOrgProps, {}> {
  constructor(props: ImanageRightOrgProps) {
    super(props);
  }

  public render() {
    const { human } = this.props;
    return <div>{human ? <DetailWorkerMol human={human} /> : undefined}</div>;
  }
}
