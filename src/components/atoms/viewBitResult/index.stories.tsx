import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewBitResultProps } from ".";
import { makeHumanDataMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const viewBitResult: IviewBitResultProps = {
  resultHuman: makeHumanDataMock(),
  onViewBitResult: action("action")
};

storiesOf("atoms", module).add("viewBitResult", () => <Component {...viewBitResult} />);
