import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import { Walletstate } from "../../modules/wallet";
import ResultTemp from "../../components/templates/result";
import { makeHumanDatasMock, HumanData } from "../../interface";
// import MarketTemp from "../../components/templates/market";
// import { drawerList } from "./const";

interface Props extends Walletstate {
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

  onViewBitResult = (human: HumanData) => {
    this.setState({ human });
  };

  onformResultApprove = () => {
    console.log("onformResultApprove", this.state.human);
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <ResultTemp
          history={history}
          myAddress="test"
          listResultBit={makeHumanDatasMock().datas}
          onViewBitResult={this.onViewBitResult}
          detailHuman={this.state.human}
          onformResultApprove={this.onformResultApprove}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.wallet))(Result);
