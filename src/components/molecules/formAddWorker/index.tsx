import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { HumanData, makeHumanDataMock } from "../../../interface";

export interface IformAddWorkerProps {
  onformAddWorker: (v?: HumanData) => void;
}

const initialState: HumanData = makeHumanDataMock();

export default class FormAddWorkerMol extends React.Component<IformAddWorkerProps, HumanData> {
  constructor(props: IformAddWorkerProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10
        }}
      >
        <TextField
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
          value={this.state.name}
          label="name"
        />
        <br />
        <TextField
          onChange={e => {
            this.setState({ age: parseInt(e.target.value, 10) });
          }}
          value={this.state.age}
          label="age"
        />
        <br />
        <TextField
          onChange={e => {
            this.setState({ gender: parseInt(e.target.value, 10) });
          }}
          value={this.state.gender}
          label="gender"
        />
        <br />
        <TextField
          onChange={e => {
            this.setState({ company: e.target.value });
          }}
          value={this.state.company}
          label="company"
        />
        <br />
        <TextField
          onChange={e => {
            this.setState({ mail: e.target.value });
          }}
          value={this.state.mail}
          label="mail"
        />
        <br />
        <TextField
          onChange={e => {
            this.setState({ memo: e.target.value });
          }}
          value={this.state.memo}
          label="memo"
        />
        <br />
        <Button
          onClick={() => {
            this.props.onformAddWorker(this.state);
            this.setState(initialState);
          }}
        >
          add
        </Button>
      </div>
    );
  }
}
