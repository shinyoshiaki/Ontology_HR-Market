import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";

storiesOf("templates", module).add("result", () => <Component myAddress="test" {...makeIdrawerMolPropsMock()} />);
