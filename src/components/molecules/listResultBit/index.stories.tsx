import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component from ".";
import { makeHumanDatasMock } from "../../../interface";

export const listResultBitStory = {
  listResultBit: makeHumanDatasMock().datas
};

storiesOf("molecules", module).add("listResultBit", () => <Component {...listResultBitStory} />);
