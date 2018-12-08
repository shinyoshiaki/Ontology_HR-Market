import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component from ".";

export const listWorkerStory = {
  listWorkers: []
};

storiesOf("molecules", module).add("listWorkers", () => <Component {...listWorkerStory} />);
