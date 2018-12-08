import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ScoutTemp from "../../components/templates/scout";
import { ContractState, setContractValue, EcontractValue } from "../../modules/contract";
import { HumanData } from "../../interface";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {}

class Scout extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onformSearchHuman = (word: string) => {};

  onViewScout = (human: HumanData) => {
    setContractValue(EcontractValue.detailHuman, human, this.props.dispatch);
    this.props.history.push("/market");
  };

  render() {
    const { history, myAddress, listResultSearchHumans } = this.props;
    return (
      <div>
        <ScoutTemp
          myAddress={myAddress ? myAddress : "error"}
          history={history}
          onformSearchHuman={this.onformSearchHuman}
          listResultSearchHumans={listResultSearchHumans}
          onViewScout={this.onViewScout}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Scout);
