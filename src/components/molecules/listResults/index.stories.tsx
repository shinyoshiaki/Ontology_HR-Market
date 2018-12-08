import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component from ".";

export const listResultsStory = {
  listResults: []
};

storiesOf("molecules", module).add("listResults", () => <Component {...listResultsStory} />);
