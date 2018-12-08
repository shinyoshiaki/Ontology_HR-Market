import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";

export const ListResultSearchHumanStory = {
  listResultSearchHumans: []
};

storiesOf("molecules", module).add("listResultSearchHuman", () => <Component {...ListResultSearchHumanStory} />);
