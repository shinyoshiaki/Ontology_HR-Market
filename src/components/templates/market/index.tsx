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
        <div
          style={{
            display: "inline-block",
            width:"280px",
            verticalAlign: "top",
            marginLeft: "10px",
            marginTop: "10px"
          }}>
          <DetailWorkerMol {...this.props} />
        </div>
        <div
          style={{
            display: "inline-block",
            width:"calc(100% - 290px)",
            textAlign:"center"
          }}
        >
          <p>
            現在の入札金額
          </p>
          <p>
            円
          </p>
          <ListBidMol {...this.props} />
          <FormBitWorkerMol {...this.props} />
        </div>
      </div>
    );
  }
}
