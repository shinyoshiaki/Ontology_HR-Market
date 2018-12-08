import * as React from "react";
import { Button } from "@material-ui/core";
import { HumanData } from "../../../interface";

export interface IviewAuctionResultProps {
  resultHuman?: HumanData;
  onViewAuctionResult: (resultHuman: HumanData) => void;
}

export default class ViewAuctionResult extends React.Component<IviewAuctionResultProps, {}> {
  constructor(props: IviewAuctionResultProps) {
    super(props);
  }

  renderView(human: HumanData) {
    return human.name;
  }

  public render() {
    const { resultHuman, onViewAuctionResult } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            if (resultHuman) onViewAuctionResult(resultHuman);
          }}
        >
          {resultHuman ? this.renderView(resultHuman) : undefined}
        </Button>
      </div>
    );
  }
}
