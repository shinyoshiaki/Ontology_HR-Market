import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";
import { CommentData, IlistCommentProps } from "../../molecules/listComment";

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
      listCommentComments: new Array(20)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeCommentMock()))
    },
    payload
  );
};

storiesOf("organisms", module).add("commentchat", () => (
  <Component
    listCommentComments={makeIlistCommentPropsMock().listCommentComments}
    listSuperChatComments={makeIlistCommentPropsMock().listCommentComments}
    onformCommentPost={action("post")}
    onformCommentSuperchat={action("superchat")}
    onformSetAddress={action("formsetaddress")}
    myAddress="name"
  />
));
