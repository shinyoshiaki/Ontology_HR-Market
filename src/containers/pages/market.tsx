import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import { Walletstate } from "../../modules/wallet";
import MarketTemp from "../../components/templates/market";
import { drawerList } from "./const";
import { makeHumanDataMock } from "../../interface";

interface Props extends Walletstate {
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
    const { history } = this.props;
    return (
      <div>
        <MarketTemp
          myAddress="test"
          drawerMolList={drawerList}
          history={history}
          detailHuman={makeHumanDataMock()}
          listBid={[]}
          onformBitWorker={this.onformBitWorker}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.wallet))(Market);
