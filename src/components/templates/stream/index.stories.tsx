import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeIlistCommentPropsMock } from "../../organisms/commentchat/index.stories";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";

storiesOf("templates", module).add("stream", () => (
  <Component
    myAddress="test"
    {...makeIdrawerMolPropsMock()}
    listCommentComments={makeIlistCommentPropsMock().listCommentComments}
    listSuperChatComments={makeIlistCommentPropsMock().listCommentComments}
  />
));
