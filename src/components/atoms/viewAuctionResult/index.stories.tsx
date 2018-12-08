import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewAuctionResultProps } from ".";
import { makeHumanDataMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const viewAuctionResult: IviewAuctionResultProps = {
  resultHuman: makeHumanDataMock(),
  onViewAuctionResult: action("action")
};

storiesOf("atoms", module).add("viewAuctionResult", () => <Component {...viewAuctionResult} />);
