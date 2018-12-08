import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeHumanDataMock } from "../../../interface";
import { manageLeftOrgStory } from '../../organisms/manageLeft/index.stories';

storiesOf("templates", module).add("manage", () => (
  <Component {...manageLeftOrgStory} myAddress="test" listWorkers={[]} human={makeHumanDataMock()} />
));
