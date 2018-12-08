import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

export const searchHumanOrgStory = {
  onformSearchHuman: action("action"),
  listResultSearchHumans: []
};

storiesOf("organisms", module).add("searchHUman", () => <Component {...searchHumanOrgStory} />);
