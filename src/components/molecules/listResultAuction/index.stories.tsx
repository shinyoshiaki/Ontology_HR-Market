import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component, { IlistResultAuctionProps } from ".";
import { makeHumanDatasMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const listResultBitStory: IlistResultAuctionProps = {
  listResultAuction: makeHumanDatasMock().datas,
  onViewBitResult: action("action")
};

storiesOf("molecules", module).add("listResultAuction", () => <Component {...listResultBitStory} />);
