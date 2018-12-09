import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import manImage from'../../../../public/img/man.jpg';

export interface IformBitWorkerProps {
  onformBitWorker: (v?: number) => void;
  style?: React.CSSProperties;
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
      <div style={this.props.style}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight:"300px",
            height: "50%",
            width: "100%"
          }}>
          <div
            style={{
              margin:"auto",
              display: "inline-block",
              height: "100%",
            }}
          > 
            <div
              style={{display: "block", textAlign: "center"}}
            >
              <img src={manImage}
                style={{
                  height: "150px",
                }}
              />
            </div>
            <TextField
              onChange={e => {
                this.setState({ amount: parseInt(e.target.value, 10) });
              }}
              value={this.state.amount}
              label="入札額"
              type="number"
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
              Bid
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
