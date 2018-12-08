import * as React from "react";
import BasicButton from "../../atoms/basicButton";

export interface IformResultApproveProps {
  onformResultApprove: () => void;
}

export interface IformResultApproveState {}

const initialState = {};

export default class FormResultApproveMol extends React.Component<IformResultApproveProps, IformResultApproveState> {
  constructor(props: IformResultApproveProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div>
        <BasicButton
          onClick={() => {
            this.props.onformResultApprove();
            this.setState(initialState);
          }}
        >
          approve
        </BasicButton>
      </div>
    );
  }
}
