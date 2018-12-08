import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

export const manageLeftOrgStory = {
  onformSearchHuman: action("action"),
  listWorkers: []
};

storiesOf("organisms", module).add("manageLeft", () => <Component {...manageLeftOrgStory} />);
