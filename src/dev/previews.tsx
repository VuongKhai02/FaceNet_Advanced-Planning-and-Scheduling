import { ComponentPreview, Previews } from "@haulmont/react-ide-toolbox";
import { MrpSaleOrders } from "../app/mrporder/MrpSaleOrders";
import TechFormList from "../app/TechFormManager/TechFormList/TechFormList";

//import planning
import ProfileDetailPartNumberList from "../app/profile-detail-part-number/ProfileDetailPartNumberList";
import ProfileDetailPartNumberEditor from "../app/profile-detail-part-number/ProfileDetailPartNumberEditor";
import ProgrammingDetailMasterDetail from "../app/programming-detail/ProgrammingDetailMasterDetail";
import ProfileDetailMasterDetail from "../app/profile-detail/ProfileDetailMasterDetail";
import PlanningWorkOrderMasterDetail from "../app/planning-work-order/PlanningWorkOrderMasterDetail";
import EmployeeMasterDetail from "../app/employee/EmployeeMasterDetail";
import EmployeeGroupMasterDetail from "../app/employee-group/EmployeeGroupMasterDetail";
import StageCodeList from "../app/stage-code/StageCodeList";
import StageCodeEditor from "../app/stage-code/StageCodeEditor";
import OitwList from "../app/oitw/OitwList";
import CoittList from "../app/coitt/CoittList";
import Citt1List from "../app/citt1/Citt1List";
import CoittEditor from "../app/coitt/CoittEditor";
import { ChartExample } from "../app/chart/ChartExample";
import BarChart from "../app/chart/BarChart";
import Doughnut from "../app/chart/Doughnut";
import { WorkOrderManager } from "../app/work-order/WorkOrderManager";
import { ProductOrderManager } from "../app/order/ProductOrderManager";
import ProductOrderImport from "../app/order/ProductOrderImport";
import ProfileImport from "../app/profile/ProfileImport";
import ProgramingImport from "../app/profile/ProgramingImport";
import { WorkOrderGroupByPO } from "../app/monitoring/WorkOrderGroupByPO";
import PlanningWorkOrderAssignmentList from "../app/planning-work-order-assignment/PlanningWorkOrderAssignmentList";
import PlanningWorkOrderAssignmentEditor from "../app/planning-work-order-assignment/PlanningWorkOrderAssignmentEditor";
import { WorkOrderTooltip } from "../app/monitoring/helper/WorkOrderTooltip";
import { WorkOrderTimeline } from "../app/monitoring/WorkOrderTimeline";
// import { TestDevExpress } from "../app/test/TestDevExpress";
import LineList from "../app/line/LineList";
import LineEditor from "../app/line/LineEditor";
import ProgramingDetailImport from "../app/profile/ProgramingDetailImport";
import FeederImport from "../app/profile/FeederImport";
import PartNumberImport from "../app/profile/PartNumberImport";
import ProfileDetailImport from "../app/profile/ProfileDetailImport";
import PartNumberManager from "../app/r2/part/part-number/PartNumberManager";
import GroupFeederManager from "../app/r2/part/group-feeder/GroupFeederManager";
import FeederSerialManager from "../app/r2/part/feeder-serial/FeederSerialManager";
import QrFeederManager from "../app/r2/part/qr-feeder/QrFeederManager";
import ProfileManager from "../app/r2/profile/ProfileManager";
import ProgrammingManager from "../app/r2/programming/ProgrammingManager";
import DnlnvlPanelManager from "../app/r2/dnlnvl/dnlnvlPanel/DnlnvlPanelManager";
import DnlnvlManager from "../app/r2/dnlnvl/DnlnvlManager";
import { EmployeeManager } from "../app/employee/EmployeeManager";
import Test from "../app/r2/test/Test";
import EquipmentTypeManager from "../app/r2/part/equipment-type/EquipmentTypeManager";
import { QmsStageGroupMappingManager } from "../app/qms-stage-group/QmsStageGroupMappingManager";
import { QmsStageGroupManagerScreen } from "../app/qms-stage-group/QmsStageGroupManagerScreen";
import { HomePage } from "../app/home/HomePage";
import ProductOrderDetailReport from "../app/report/ProductOrderDetailReport";
import WorkOrderDetailReport from "../app/report/WorkOrderDetailReport";
import DnlnvlApproveManager from "../app/r2/dnlnvl/DnlnvlApproveManager";
import DnlnvlWarehouseManager from "../app/r2/dnlnvl/DnlnvlWarehouseManager";
import MaterialAttrition from "../app/report/MaterialAttrionReport";
import ProductionMeansReport from "../app/report/ProductionMeansReport";
import DnlnvlGivebackRedundantManager from "../app/r2/dnlnvl/DnlnvlGivebackRedundantManager";
import DnlnvlApproveRedundantManager from "../app/r2/dnlnvl/DnlnvlApproveRedundantManager";
import MaterialAttritionReport from "../app/report/MaterialAttrionReport";
import LocationRFIDManager from "../app/r2/location/LocationRFIDManager";
import LocationImport from "../app/profile/LocationImport";
import MaterialAttritionReportWO from "../app/report/MaterialAttritionReportWO";
import DnlnvlHistoryCompareMaterial from "../app/r2/dnlnvl/dnlnvlWarehouse/DnlnvlHistoryCompareMaterial";
import CITT1Import from "../app/profile/CITT1Import";
import COITTImport from "../app/profile/COITTImport";
import OITMImport from "../app/profile/OITMImport";

export const ComponentPreviews = () => {
    return (
        <Previews>
            <ComponentPreview path='/mrpsaleorders'>
                <MrpSaleOrders />
            </ComponentPreview>
            <ComponentPreview path='/techFormList'>
                <TechFormList />
            </ComponentPreview>

            {/*import planning*/}
            <ComponentPreview path='/LineEditor'>
                <LineEditor />
            </ComponentPreview>
            <ComponentPreview path='/LineList'>
                <LineList />
            </ComponentPreview>
            {/*<ComponentPreview path="/testDevExpress">*/}
            {/*  /!*<TestDevExpress />*!/*/}
            {/*</ComponentPreview>*/}
            <ComponentPreview path='/'>
                <HomePage />
            </ComponentPreview>
            <ComponentPreview path='/workOrderTimeline'>
                <WorkOrderTimeline />
            </ComponentPreview>
            <ComponentPreview path='/workOrderTooltip'>
                <WorkOrderTooltip />
            </ComponentPreview>

            <ComponentPreview path='/PlanningWorkOrderAssignmentList'>
                <PlanningWorkOrderAssignmentList />
            </ComponentPreview>
            <ComponentPreview path='/workOrderGroupByPO'>
                <WorkOrderGroupByPO />
            </ComponentPreview>
            <ComponentPreview path='/productOrder'>
                <ProductOrderImport />
            </ComponentPreview>
            <ComponentPreview path='/productOrderDetailReport'>
                <ProductOrderDetailReport />
            </ComponentPreview>
            <ComponentPreview path='/workOrderDetailReport'>
                <WorkOrderDetailReport />
            </ComponentPreview>
            <ComponentPreview path='/materialAttritionReport'>
                <MaterialAttritionReport />
            </ComponentPreview>
            <ComponentPreview path='/materialAttritionReportWO'>
                <MaterialAttritionReportWO />
            </ComponentPreview>
            <ComponentPreview path='/productionMeansReport'>
                <ProductionMeansReport />
            </ComponentPreview>
            <ComponentPreview path='/profileImport'>
                <ProfileImport />
            </ComponentPreview>
            <ComponentPreview path='/profileDetailImport'>
                <ProfileDetailImport />
            </ComponentPreview>
            <ComponentPreview path='/programingImport'>
                <ProgramingImport />
            </ComponentPreview>
            <ComponentPreview path='/programingDetailImport'>
                <ProgramingDetailImport />
            </ComponentPreview>
            <ComponentPreview path='/partNumberImport'>
                <PartNumberImport />
            </ComponentPreview>
            <ComponentPreview path='/locationImport'>
                <LocationImport />
            </ComponentPreview>
            <ComponentPreview path='/feederImport'>
                <FeederImport />
            </ComponentPreview>
            <ComponentPreview path='/productOrderManager'>
                <ProductOrderManager />
            </ComponentPreview>
            <ComponentPreview path='/citt1Import'>
                <CITT1Import />
            </ComponentPreview>
            <ComponentPreview path='/coittImport'>
                <COITTImport />
            </ComponentPreview>
            <ComponentPreview path='/oitmImport'>
                <OITMImport />
            </ComponentPreview>
            <ComponentPreview path='/workOrderManager'>
                <WorkOrderManager />
            </ComponentPreview>
            <ComponentPreview path='/doughnut'>
                <Doughnut />
            </ComponentPreview>
            <ComponentPreview path='/barChart'>
                <BarChart />
            </ComponentPreview>
            <ComponentPreview path='/chartExample'>
                <ChartExample />
            </ComponentPreview>
            <ComponentPreview path='/CoittEditor'>
                <CoittEditor />
            </ComponentPreview>
            <ComponentPreview path='/CoittList'>
                <CoittList />
            </ComponentPreview>
            <ComponentPreview path='/CoittList'>
                <CoittList />
            </ComponentPreview>
            <ComponentPreview path='/Citt1List'>
                <Citt1List />
            </ComponentPreview>
            <ComponentPreview path='/CoittList'>
                <CoittList />
            </ComponentPreview>
            <ComponentPreview path='/OitwList'>
                <OitwList />
            </ComponentPreview>
            <ComponentPreview path='/StageCodeEditor'>
                <StageCodeEditor />
            </ComponentPreview>
            <ComponentPreview path='/StageCodeList'>
                <StageCodeList />
            </ComponentPreview>
            <ComponentPreview path='/EmployeeGroupMasterDetail'>
                <EmployeeGroupMasterDetail />
            </ComponentPreview>
            <ComponentPreview path='/EmployeeMasterDetail'>
                <EmployeeMasterDetail />
            </ComponentPreview>
            {/* --------- START R2 ----------- */}
            <ComponentPreview path='/partNumberManager'>
                <PartNumberManager />
            </ComponentPreview>
            <ComponentPreview path='/groupFeederManager'>
                <GroupFeederManager />
            </ComponentPreview>
            <ComponentPreview path='/feederSerialManager'>
                <FeederSerialManager />
            </ComponentPreview>
            <ComponentPreview path='/qrFeederManager'>
                <QrFeederManager searchKeyword={undefined} />
            </ComponentPreview>
            <ComponentPreview path='/profileManager'>
                <ProfileManager />
            </ComponentPreview>
            <ComponentPreview path='/programmingManager'>
                <ProgrammingManager />
            </ComponentPreview>
            <ComponentPreview path='/dnlnvlManager'>
                <DnlnvlManager />
            </ComponentPreview>
            <ComponentPreview path='/dnlnvlApproveManager'>
                <DnlnvlApproveManager />
            </ComponentPreview>
            <ComponentPreview path='/dnlnvlWarehouseManager'>
                <DnlnvlWarehouseManager />
            </ComponentPreview>
            <ComponentPreview path='/dnlnvlGivebackRedundantManager'>
                <DnlnvlGivebackRedundantManager />
            </ComponentPreview>
            <ComponentPreview path='/dnlnvlApproveRedundantManager'>
                <DnlnvlApproveRedundantManager />
            </ComponentPreview>
            <ComponentPreview path='/locationRFIDManager'>
                <LocationRFIDManager />
            </ComponentPreview>

            {/* --------- END R2 ----------- */}
            <ComponentPreview path='/EmployeeManager'>
                <EmployeeManager />
            </ComponentPreview>
            <ComponentPreview path='/ProfileDetailMasterDetail'>
                <ProfileDetailMasterDetail />
            </ComponentPreview>
            <ComponentPreview path='/ProgrammingDetailMasterDetail'>
                <ProgrammingDetailMasterDetail />
            </ComponentPreview>
            <ComponentPreview path='/ProfileDetailPartNumberEditor'>
                <ProfileDetailPartNumberEditor />
            </ComponentPreview>
            <ComponentPreview path='/ProfileDetailPartNumberList'>
                <ProfileDetailPartNumberList />
            </ComponentPreview>
            <ComponentPreview path='/equipmentTypeManager'>
                <EquipmentTypeManager />
            </ComponentPreview>
            <ComponentPreview path='/Test'>
                <Test />
            </ComponentPreview>
            <ComponentPreview path='/QmsStageGroupMappingManager'>
                <QmsStageGroupManagerScreen />
            </ComponentPreview>
        </Previews>
    );
};
