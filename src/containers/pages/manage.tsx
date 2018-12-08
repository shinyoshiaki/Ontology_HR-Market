import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ManageTemp from "../../components/templates/manage";
import { ContractState } from "../../modules/contract";
import { HumanData } from "../../interface";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {
  detailHuman?: HumanData;
}

class Manage extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailHuman: undefined
    };
  }

  onformAddWorker = (human: HumanData) => {
    console.log("add", human);
  };

  onformSetAddress = (address: string) => {};

  onViewWorker = (human: HumanData) => {
    this.setState({ detailHuman: human });
  };

  render() {
    const { history, listWorkers, myAddress } = this.props;
    return (
      <div>
        <ManageTemp
          history={history}
          myAddress={myAddress ? myAddress : "error"}
          listWorkers={listWorkers}
          onformAddWorker={this.onformAddWorker}
          onformSetAddress={this.onformSetAddress}
          onViewWorker={this.onViewWorker}
          detailHuman={this.state.detailHuman}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Manage);
