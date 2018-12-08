import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import { Chatstate } from "../../modules/chat";
import { Walletstate } from "../../modules/wallet";
import MarketTemp from "../../components/templates/market";
import { drawerList } from "./const";

interface Props extends Chatstate, Walletstate {
  dispatch: Dispatch;
  history: any;
}

interface States {}

class Sell extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <MarketTemp myAddress="test" drawerMolList={drawerList} history={history} />
        something
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.chat, state.wallet))(Sell);
