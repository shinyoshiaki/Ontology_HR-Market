import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeHumanDataMock } from "../../../interface";

export const detailWorkerStory = {
  human: makeHumanDataMock()
};

storiesOf("molecules", module).add("detailWorker", () => <Component {...detailWorkerStory} />);
