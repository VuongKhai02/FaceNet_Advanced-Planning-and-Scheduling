import { lazy } from 'react';

const Welcome = lazy(() => import('./Welcome/Welcome'));
const InformationManagement = lazy(() => import('./InformationManagement/InformationManagement'));
const WarningManagement = lazy(() => import('./WarningManagement/WarningManagement'));
//QUẢN LÝ THÔNG TIN
const MrpSaleOrders = lazy(() => import('./components/InformationManage/mrporder/MrpSaleOrders'));
const ManageProductionRequirements = lazy(() => import('./components/InformationManage/ManageProductionRequirements/ManageProductionRequirements'));
const ManageJobOutput = lazy(() => import('./components/InformationManage/ManageJobOutput/ManageJobOutput'));
const CardManagement = lazy(() => import('./components/InformationManage/CardManagement/CardManagement'));
//BOM
const BOMBodyCard = lazy(() => import('./components/BOM/BOMBodyCard/BOMBodyCard'));
const BOMPersonalized = lazy(() => import('./components/BOM/BOMPersonalized/BOMPersonalized'));
//QUẢN LÝ PCN
const TechFormList = lazy(() => import('./components/TechFormManager/TechFormList/TechFormList'));
const TechFormApprove = lazy(() => import('./components/TechFormManager/TechFormApprove/TechFormApprove'));
//QUẢN LÝ KẾ HOẠCH SẢN XUẤT
const ProductionPlanList = lazy(() => import('./components/ProductionPlanManagement/ProductionPlanList/ProductionPlanList'));
const DeclareProductionObject = lazy(() => import('./components/ProductionPlanManagement/declareObject/DeclareProductionObject'));

//GIÁM SÁT TIẾN ĐỘ
const ProgressMonitoringManufacture = lazy(() => import('./components/ProgressMonitoring/ProgressMonitoringManufacture/ProgressMonitoringManufacture'));
const ProgressMonitoringOrder = lazy(() => import('./components/ProgressMonitoring/ProgressMonitoringOrder/ProgressMonitoringOrder'));
const ProgressMonitoringStageQueue = lazy(() => import('./components/ProgressMonitoring/ProgressMonitoringStageQueue/ProgressMonitoringStageQueue'));

export {
    Welcome,
    InformationManagement,
    WarningManagement,
    MrpSaleOrders,
    ManageProductionRequirements,
    ManageJobOutput,
    CardManagement,
    BOMBodyCard,
    BOMPersonalized,
    TechFormList,
    TechFormApprove,
    ProductionPlanList,
    DeclareProductionObject,
    ProgressMonitoringManufacture,
    ProgressMonitoringOrder,
    ProgressMonitoringStageQueue
}