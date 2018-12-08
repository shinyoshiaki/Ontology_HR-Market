import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import { Chatstate } from "../../modules/chat";
import { Walletstate } from "../../modules/wallet";
import ScoutTemp from "../../components/templates/scout";
import { drawerList } from "./const";

interface Props extends Chatstate, Walletstate {
  dispatch: Dispatch;
  history: any;
}

interface States {}

class Scout extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onformSearchHuman = () => {};

  render() {
    const { history } = this.props;
    return (
      <div>
        <ScoutTemp
          myAddress="test"
          drawerMolList={drawerList}
          history={history}
          onformSearchHuman={this.onformSearchHuman}
          listResultSearchHumans={[]}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.chat, state.wallet))(Scout);
