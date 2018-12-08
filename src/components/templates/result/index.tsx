import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import ListResultBitMol, { IlistResultBitProps } from "../../molecules/listResultBit";
import ResultRightOrg, { IresultRightOrgProps } from "../../organisms/resultRight";

export interface IResultTempProps extends IheaderOrgProps, IlistResultBitProps ,IresultRightOrgProps{}

export interface IResultTempState {}

export default class ResultTemp extends React.Component<IResultTempProps, IResultTempState> {
  constructor(props: IResultTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />
        <div
          style={{
            display: "inline-block",
            width: "280px"
          }}
        >
          <p>オークションスカウト済み　人員一覧</p>
          <p>クリックで詳細情報</p>

          <ListResultBitMol {...this.props} />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "calc(100% - 280px)"
          }}
        >
          <ResultRightOrg {...this.props} />
        </div>
      </div>
    );
  }
}
