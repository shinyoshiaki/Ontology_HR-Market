import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";
import { makeIlistCommentPropsMock } from "../../organisms/commentchat/index.stories";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";

storiesOf("templates", module).add("main", () => (
  <Component
    {...makeIdrawerMolPropsMock()}
    listCommentComments={makeIlistCommentPropsMock().listCommentComments}
    listSuperChatComments={makeIlistCommentPropsMock().listCommentComments}
    onformCommentPost={action("post")}
    onformCommentSuperchat={action("superchat")}
    onformSetAddress={action("formsetaddress")}
    myAddress="name"
  />
));
