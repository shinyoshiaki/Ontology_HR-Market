import * as React from "react";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";
import FormResultApproveMol, { IformResultApproveProps } from "../../molecules/formResultApprove";

export interface IresultRightOrgProps extends IdetailWorkerProps, IformResultApproveProps {}

export default class ResultRightOrg extends React.Component<IresultRightOrgProps, {}> {
  constructor(props: IresultRightOrgProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <DetailWorkerMol {...this.props} />
        <FormResultApproveMol {...this.props} />
      </div>
    );
  }
}
