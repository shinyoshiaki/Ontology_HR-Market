import * as React from "react";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";
import FormResultApproveMol, { IformResultApproveProps } from "../../molecules/formResultApprove";

export interface IresultRightOrgProps extends IdetailWorkerProps, IformResultApproveProps {
  style?: object;
}

export default class ResultRightOrg extends React.Component<IresultRightOrgProps, {}> {
  constructor(props: IresultRightOrgProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <div style={{ display: "flex", minHeight: "90vh", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <DetailWorkerMol {...this.props} />
          </div>
          <div style={{ textAlign: "center" }}>
            <FormResultApproveMol {...this.props} style={{ marginTop: "auto" }} />
          </div>
        </div>
      </div>
    );
  }
}
