import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IlistSuperChatProps } from ".";
import { CommentData } from '../listComment';


const makeCommentMock = (
  payload: { [key in keyof CommentData]?: CommentData[key] } = {}
): CommentData => {
  return Object.assign(
    {},
    {
      id: "id",
      msg: "msg",
      money: 1,
      timestamp: undefined
    },
    payload
  );
};

export const makeIlistSuperChatPropsMock = (
  payload: { [key in keyof IlistSuperChatProps]?: IlistSuperChatProps[key] } = {}
): IlistSuperChatProps => {
  return Object.assign(
    {},
    {
      listSuperChatComments: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeCommentMock()))
    },
    payload
  );
};

storiesOf("molecules", module).add("listSuperChat", () => (
  <Component
    listSuperChatComments={makeIlistSuperChatPropsMock().listSuperChatComments}
  />
));
