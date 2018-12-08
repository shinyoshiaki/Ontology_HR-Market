import * as React from "react";
import { Button } from "@material-ui/core";

interface Props {
  onClick: (v: any) => void;
}

export default class TestButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Button onClick={this.props.onClick}>click</Button>
      </div>
    );
  }
}
