import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";
import ListBidMol, { IlistBidProps } from "../../molecules/listBid";
import FormBitWorkerMol, { IformBitWorkerProps } from "../../molecules/formBitWorker";

export interface IMarketTempProps extends IheaderOrgProps, IdetailWorkerProps, IlistBidProps, IformBitWorkerProps {}

export default class MarketTemp extends React.Component<IMarketTempProps, {}> {
  constructor(props: IMarketTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
        <DetailWorkerMol {...this.props} />
        <ListBidMol {...this.props} />
        <FormBitWorkerMol {...this.props} />
      </div>
    );
  }
}
