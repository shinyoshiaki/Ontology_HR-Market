import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

storiesOf("organisms", module).add("login", () => (
  <Component login={() => action} register={() => action} />
));
