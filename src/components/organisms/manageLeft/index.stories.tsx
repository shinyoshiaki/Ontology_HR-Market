import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { ImanageLeftOrgProps } from ".";
import { action } from "@storybook/addon-actions";

export const manageLeftOrgStory: ImanageLeftOrgProps = {
  onformAddWorker: action("action"),
  listWorkers: []
};

storiesOf("organisms", module).add("manageLeft", () => <Component {...Object.assign({}, manageLeftOrgStory)} />);
