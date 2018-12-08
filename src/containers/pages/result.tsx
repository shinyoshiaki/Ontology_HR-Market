import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ResultTemp from "../../components/templates/result";
import { HumanData } from "../../interface";
import { ContractState } from "../../modules/contract";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {
  human?: HumanData;
}

class Result extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      human: undefined
    };
  }

  onViewAuctionResult = (human: HumanData) => {
    this.setState({ human });
  };

  onformResultApprove = () => {
    console.log("onformResultApprove", this.state.human);
  };

  render() {
    const { history, myAddress, listResultAuction } = this.props;
    return (
      <div>
        <ResultTemp
          history={history}
          myAddress={myAddress ? myAddress : "error"}
          listResultAuction={listResultAuction}
          onViewAuctionResult={this.onViewAuctionResult}
          detailHuman={this.state.human}
          onformResultApprove={this.onformResultApprove}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Result);
