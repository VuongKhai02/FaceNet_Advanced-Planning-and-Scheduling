import { ComponentPreview, Previews } from "@haulmont/react-ide-toolbox";
import { MrpSaleOrders } from "../app/mrporder/MrpSaleOrders"
import TechFormList from "../app/TechFormManager/TechFormList/TechFormList";
import ProductionProgressList from "../app/progressMonitor/productionProgress/ProductionProgressList";
import DeclareProductionObject from "../app/productionPlanManager/declareObject/DeclareProductionObject";


export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/mrpsaleorders">
        <MrpSaleOrders />
      </ComponentPreview>
      <ComponentPreview path="/techFormList">
        <TechFormList />
      </ComponentPreview>
      <ComponentPreview path="/productionProgressList">
        <ProductionProgressList />
      </ComponentPreview>
      <ComponentPreview path="/declareProductionObject">
        <DeclareProductionObject />
      </ComponentPreview>
    </Previews>
  );
};
