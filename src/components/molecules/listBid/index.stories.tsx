import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { HumanData, IlistBidProps } from ".";

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

export const makeIlistBidPropsMock = (
  payload: { [key in keyof IlistBidProps]?: IlistBidProps[key] } = {}
): IlistBidProps => {
  return Object.assign(
    {},
    {
      listBidComments: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeHumanDataMock())),
      maxheight: "this is mock string",
      style: undefined
    },
    payload
  );
};

export const listBidStory = {
  listBidComments: makeIlistBidPropsMock().listBidComments
};

storiesOf("molecules", module).add("listBid", () => <Component {...listBidStory} />);
