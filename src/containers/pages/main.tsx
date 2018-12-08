import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import MainTemp from "src/components/templates/main";
import { Chatstate, addComment, listenComment, superChat, listenKadComment } from "../../modules/chat";
import { CommentData } from "../../components/molecules/listComment";
import { Modal } from "@material-ui/core";
import FormSuperChat from "../../components/molecules/formSuperChat";
import { setWalletValue, EwalletValue, Walletstate, setMyAddress } from "../../modules/wallet";

interface Props extends Chatstate, Walletstate {
  dispatch: Dispatch;
  history: any;
}

interface States {
  modalOpen: boolean;
}

export const drawerList = [{ address: "", label: "watch" }, { address: "stream", label: "stream" }];

class Main extends React.Component<Props, States> {
  isListenComments = false;
  constructor(props: any) {
    super(props);
    this.state = { modalOpen: false };
    this.init();
  }

  async init() {
    await setMyAddress(this.props.dispatch);
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  formCommentPost = (msg: string) => {
    if (!this.props.myAddress || !this.props.targetAddress) return;
    const comment: CommentData = {
      id: this.props.myAddress,
      msg,
      money: 0,
      timestamp: Date.now()
    };
    addComment(this.props.targetAddress, comment, this.props.dispatch);
  };

  formSetAddress = (target: string) => {
    setWalletValue(EwalletValue.targetAddress, target, this.props.dispatch);
    if (!this.isListenComments) {
      listenComment(target, this.props.dispatch);
      listenKadComment(target, this.props.dispatch);
      this.isListenComments = true;
    }
  };

  render() {
    const { comments, dispatch, targetAddress, history, myAddress } = this.props;
    return (
      <div>
        <MainTemp
          myAddress={myAddress ? myAddress : "error"}
          listCommentComments={comments.slice().reverse()}
          listSuperChatComments={comments.slice().reverse()}
          onformCommentPost={this.formCommentPost}
          onformCommentSuperchat={this.handleModalOpen}
          onformSetAddress={this.formSetAddress}
          history={history}
          drawerMolList={drawerList}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          style={{ display: "flex" }}
        >
          <div
            style={{
              width: "60%",
              height: "auto",
              flex: "0 1 auto",
              margin: "auto",
              background: "white"
            }}
          >
            <FormSuperChat
              myAddress={myAddress ? myAddress : "error"}
              onformSuperChatPost={(msg, amount) => {
                console.log({ targetAddress });

                if (targetAddress) superChat(targetAddress, msg, amount, dispatch);
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.chat, state.wallet))(Main);
