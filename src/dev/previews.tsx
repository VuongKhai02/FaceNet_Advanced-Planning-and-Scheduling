import React from "react";
// import { TestDevExpress } from "../app/test/TestDevExpress";

import {ComponentPreview, Previews} from "@haulmont/react-ide-toolbox";
import {MrpSaleOrders} from "../app/mrporder/MrpSaleOrders"
export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/mrpsaleorders">
        <MrpSaleOrders/>
      </ComponentPreview>
    </Previews>
  );
};
