import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IformBitWorkerProps {
  onformBitWorker: (v?: number) => void;
}

export interface IformBitWorkerState {
  amount: number;
}

const initialState = {
  amount: 0
};

export default class FormBitWorkerMol extends React.Component<IformBitWorkerProps, IformBitWorkerState> {
  constructor(props: IformBitWorkerProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div>
        <TextField
          onChange={e => {
            this.setState({ amount: parseInt(e.target.value, 10) });
          }}
          value={this.state.amount}
          label="入札額"
        />
        <Button
          onClick={() => {
            this.props.onformBitWorker(this.state.amount);
            this.setState(initialState);
          }}
          style={{
            verticalAlign: "bottom"
          }}
        >
          bit
        </Button>
      </div>
    );
  }
}
