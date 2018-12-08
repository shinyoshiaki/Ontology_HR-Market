import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import ListResultBitMol, { IlistResultBitProps } from "../../molecules/listResultBit";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";

export interface IResultTempProps extends IheaderOrgProps, IlistResultBitProps, IdetailWorkerProps {}

export default class ResultTemp extends React.Component<IResultTempProps, {}> {
  constructor(props: IResultTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
        <ListResultBitMol {...this.props} />
        <DetailWorkerMol {...this.props} />
      </div>
    );
  }
}
