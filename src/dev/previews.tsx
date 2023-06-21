import React from "react";
// import { TestDevExpress } from "../app/test/TestDevExpress";

import {ComponentPreview, Previews} from "@haulmont/react-ide-toolbox";
import {Warning} from "../app/warning/Warning"
export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/Warnings">
        <Warning/>
      </ComponentPreview>
    </Previews>
  );
};
