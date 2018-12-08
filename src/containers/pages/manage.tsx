import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ManageTemp from "../../components/templates/manage";
import { ContractState } from "../../modules/contract";

interface Props extends ContractState {
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

  onformSetAddress = () => {};

  onViewWorker = () => {};

  render() {
    const { history, listWorkers, myAddress } = this.props;
    return (
      <div>
        <ManageTemp
          myAddress={myAddress ? myAddress : "error"}
          listWorkers={listWorkers}
          onformAddWorker={this.onformAddWorker}
          history={history}
          onformSetAddress={this.onformSetAddress}
          onViewWorker={this.onViewWorker}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Manage);
