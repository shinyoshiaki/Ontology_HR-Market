import * as React from "react";

import { storiesOf } from "@storybook/react";
import { HumanData } from "../../../interface";
import Component, { IlistWorkerProps } from ".";

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

export const listWorkerStory = {
  listWorkers: makeIlistWorkerPropsMock().listWorkers
};

storiesOf("molecules", module).add("listWorkers", () => <Component {...listWorkerStory} />);
