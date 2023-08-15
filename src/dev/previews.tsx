import { ComponentPreview, Previews } from "@haulmont/react-ide-toolbox";
import { MrpSaleOrders } from "../app/mrporder/MrpSaleOrders"
import TechFormList from "../app/TechFormManager/TechFormList/TechFormList";
import TechFormApprove from "../app/TechFormManager/TechFormApprove/TechFormApprove";
import ProductionPlanList from "../app/ProductionPlanManagement/ProductionPlanList/ProductionPlanList";
import BOMBodyCard from "../app/BOM/BOMBodyCard/BOMBodyCard";
import BOMPersonalized from "../app/BOM/BOMPersonalized/BOMPersonalized";
import DnlNvlList from "../app/ProductionPlanManagement/DnlNvlList/DnlNvlList";
export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/mrpsaleorders">
        <MrpSaleOrders />
      </ComponentPreview>
      <ComponentPreview path="/techFormList">
        <TechFormList />
      </ComponentPreview>
      <ComponentPreview path="/techFormApprove">
        <TechFormApprove />
      </ComponentPreview>
      <ComponentPreview path="/productionPlanList">
        <ProductionPlanList />
      </ComponentPreview>
      <ComponentPreview path="/dnlNvlList">
        <DnlNvlList />
      </ComponentPreview>
      <ComponentPreview path="/bomBodyCard">
        <BOMBodyCard />
      </ComponentPreview>
      <ComponentPreview path="/bomPersonalized">
        <BOMPersonalized />
      </ComponentPreview>
    </Previews>
  );
};
