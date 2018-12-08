import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import { Walletstate } from "../../modules/wallet";
import ManageTemp from "../../components/templates/manage";

interface Props extends Walletstate {
  dispatch: Dispatch;
  history: any;
}

interface States {}

class Manage extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onformAddWorker = () => {};
  render() {
    const { history } = this.props;
    return (
      <div>
        <ManageTemp myAddress="" listWorkers={[]} onformAddWorker={this.onformAddWorker} history={history} />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.wallet))(Manage);
