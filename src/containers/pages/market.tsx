import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import MarketTemp from "../../components/templates/market";
import { drawerList } from "./const";
import { ContractState } from "../../modules/contract";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {}

class Market extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onformBitWorker = () => {};

  render() {
    const { history, myAddress, detailHuman, listBid } = this.props;
    return (
      <div>
        <MarketTemp
          history={history}
          myAddress={myAddress ? myAddress : "error"}
          drawerMolList={drawerList}
          detailHuman={detailHuman}
          listBid={listBid}
          onformBitWorker={this.onformBitWorker}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Market);
