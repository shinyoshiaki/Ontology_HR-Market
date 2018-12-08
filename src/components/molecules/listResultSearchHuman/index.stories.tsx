import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { HumanData, IlistResultSearchHumanProps } from ".";

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

export const makeIlistResultSearchHumanPropsMock = (
  payload: { [key in keyof IlistResultSearchHumanProps]?: IlistResultSearchHumanProps[key] } = {}
): IlistResultSearchHumanProps => {
  return Object.assign(
    {},
    {
      listResultSearchHumanComments: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeHumanDataMock())),
      maxheight: "this is mock string",
      style: undefined
    },
    payload
  );
};

export const ListResultSearchHumanStory = {
  listResultSearchHumanComments: makeIlistResultSearchHumanPropsMock().listResultSearchHumanComments
};

storiesOf("molecules", module).add("listResultSearchHuman", () => <Component {...ListResultSearchHumanStory} />);
