import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ScoutTemp from "../../components/templates/scout";
import { ContractState } from "../../modules/contract";

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

  onformSearchHuman = () => {};

  render() {
    const { history, myAddress, listResultSearchHumans } = this.props;
    return (
      <div>
        <ScoutTemp
          myAddress={myAddress ? myAddress : "error"}
          history={history}
          onformSearchHuman={this.onformSearchHuman}
          listResultSearchHumans={listResultSearchHumans}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Scout);
