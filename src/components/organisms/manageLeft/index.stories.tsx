import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

import { HumanData } from "../../../interface";
import { IlistWorkerProps } from "../../molecules/listWorkers";

export const makeHumanDataMock = (payload: { [key in keyof HumanData]?: HumanData[key] } = {}): HumanData => {
  return Object.assign(
    {},
    {
      id: "this is mock string",
      msg: "this is mock string",
      money: 1,
      timestamp: undefined
    },
    payload
  );
};

export const makeIlistWorkerPropsMock = (
  payload: { [key in keyof IlistWorkerProps]?: IlistWorkerProps[key] } = {}
): IlistWorkerProps => {
  return Object.assign(
    {},
    {
      listWorkers: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeHumanDataMock())),
      maxheight: "this is mock string",
      style: undefined
    },
    payload
  );
};

export const searchHumanOrgStory = {
  onformSearchHuman: action("action"),
  listWorkers: makeIlistWorkerPropsMock().listWorkers
};

storiesOf("organisms", module).add("searchHUman", () => <Component {...searchHumanOrgStory} />);
