import { ComponentPreview, Previews } from "@haulmont/react-ide-toolbox";
import { MrpSaleOrders } from "../app/mrporder/MrpSaleOrders"
import TechFormList from "../app/TechFormManager/TechFormList/TechFormList";
export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/mrpsaleorders">
        <MrpSaleOrders />
      </ComponentPreview>
      <ComponentPreview path="/techFormList">
        <TechFormList />
      </ComponentPreview>
    </Previews>
  );
};
