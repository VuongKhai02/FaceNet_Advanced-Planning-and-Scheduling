import { ComponentPreview, Previews } from "@haulmont/react-ide-toolbox";
import { MrpSaleOrders } from "../app/mrporder/MrpSaleOrders"
import TechFormList from "../app/TechFormManager/TechFormList/TechFormList";
import DeclareProductionObject from "../app/productionPlanManager/declareObject/DeclareProductionObject";
import DeclareProductionInfor from "../app/productionPlanManager/declareProductionInfor/DeclareProductionInfor";



export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/mrpsaleorders">
        <MrpSaleOrders />
      </ComponentPreview>
      <ComponentPreview path="/techFormList">
        <TechFormList />
      </ComponentPreview>
      <ComponentPreview path="/declareProductionObject">
        <DeclareProductionObject />
      </ComponentPreview>
      <ComponentPreview path="/declareProductionInfor">
        <DeclareProductionInfor />
      </ComponentPreview>

    </Previews>
  );
};
