import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { CommentData, IlistCommentProps } from ".";
// import { action } from "@storybook/addon-actions";

const makeCommentMock = (
  payload: { [key in keyof CommentData]?: CommentData[key] } = {}
): CommentData => {
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

export const makeIlistCommentPropsMock = (
  payload: { [key in keyof IlistCommentProps]?: IlistCommentProps[key] } = {}
): IlistCommentProps => {
  return Object.assign(
    {},
    {
      listCommentComments: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeCommentMock()))
    },
    payload
  );
};

storiesOf("molecules", module).add("listComment", () => (
  <Component
    listCommentComments={makeIlistCommentPropsMock().listCommentComments}
  />
));
