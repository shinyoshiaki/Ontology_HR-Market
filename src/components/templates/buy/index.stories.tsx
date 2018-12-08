import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";
import { searchHumanOrgStory } from "../../organisms/searchHuman/index.stories";

storiesOf("templates", module).add("buy", () => (
  <Component {...searchHumanOrgStory} myAddress="test" {...makeIdrawerMolPropsMock()} />
));
