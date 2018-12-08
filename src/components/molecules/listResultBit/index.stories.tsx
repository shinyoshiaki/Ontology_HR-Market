import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component, { IlistResultBitProps } from ".";
import { makeHumanDatasMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const listResultBitStory: IlistResultBitProps = {
  listResultBit: makeHumanDatasMock().datas,
  onViewBitResult: action("action")
};

storiesOf("molecules", module).add("listResultBit", () => <Component {...listResultBitStory} />);
