import * as React from "react";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";

export interface ImanageRightOrgProps extends IdetailWorkerProps {}

export default class ManageRightOrg extends React.Component<ImanageRightOrgProps, {}> {
  constructor(props: ImanageRightOrgProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <DetailWorkerMol {...this.props} />{" "}
      </div>
    );
  }
}
