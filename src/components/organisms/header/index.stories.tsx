import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";
// import { action } from "@storybook/addon-actions";

storiesOf("organisms", module).add("header", () => (
  <Component {...makeIdrawerMolPropsMock()} myAddress="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"/>
));
