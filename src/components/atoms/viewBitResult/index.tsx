import * as React from "react";
import { Button } from "@material-ui/core";
import { HumanData } from "../../../interface";

export interface IviewBitResultProps {
  resultHuman?: HumanData;
  onViewBitResult: (resultHuman: HumanData) => void;
}

export default class ViewBitResult extends React.Component<IviewBitResultProps, {}> {
  constructor(props: IviewBitResultProps) {
    super(props);
  }

  public render() {
    const { resultHuman, onViewBitResult } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            if (resultHuman) onViewBitResult(resultHuman);
          }}
        >
          {JSON.stringify(resultHuman)}
        </Button>
      </div>
    );
  }
}
