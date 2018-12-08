import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";

export const listBidStory = {
  listBidComments: []
};

storiesOf("molecules", module).add("listBid", () => <Component {...listBidStory} />);
