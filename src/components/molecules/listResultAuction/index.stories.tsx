import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component, { IlistResultAuctionProps } from ".";
import { makeHumanDatasMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const listResultAuctionStory: IlistResultAuctionProps = {
  listResultAuction: makeHumanDatasMock().datas,
  onViewAuctionResult: action("action")
};

storiesOf("molecules", module).add("listResultAuction", () => <Component {...listResultAuctionStory} />);
