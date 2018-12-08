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
        <div style={{ display: "flex" }}>
          <DetailWorkerMol {...this.props} style={{ flex: 1 }} />
          <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "90vh" }}>
            <ListBidMol {...this.props} />
            <p>現在の入札金額</p>
            <FormBitWorkerMol {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
