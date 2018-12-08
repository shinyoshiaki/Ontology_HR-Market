import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IformSearchHumanProps {
  onformSearchHuman: (v?: string) => void;
}

export interface IformSearchHumanState {
  url: string;
}

export default class FormSearchHuman extends React.Component<
  IformSearchHumanProps,
  IformSearchHumanState
> {
  constructor(props: IformSearchHumanProps) {
    super(props);
    this.state = {
      url: ""
    };
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
            this.setState({ url: e.target.value });
          }}
          value={this.state.url}
          label="url"
          style={{ width: "80%" }}
        />
        <Button
          onClick={() => {
            this.props.onformSearchHuman(this.state.url);
            this.setState({ url: "" });
          }}
        >
          open
        </Button>
      </div>
    );
  }
}
