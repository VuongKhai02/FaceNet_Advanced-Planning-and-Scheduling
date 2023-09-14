import React from 'react';
import {
    BOMBodyCard,
    BOMPersonalized,
    CardManagement,
    DeclareProductionObject,
    ManageJobOutput,
    ManageProductionRequirements,
    MrpSaleOrders,
    ProductionPlanList,
    ProgressMonitoringManufacture,
    ProgressMonitoringOrder,
    ProgressMonitoringStageQueue,
    TechFormApprove,
    TechFormList,
    Welcome
} from "../pages";
import { withNavigationWatcher } from '../contexts/navigate';
import DeclareQuantity from "../pages/components/DeclareQuantity/DeclareQuantity";
import AccountManagement from '../pages/components/AccountManagement/AccountManagement';

type Route = {
    path: string;
    component: React.ComponentType;
}
const routes: Route[] = [
    {
        path: '/',
        component: Welcome
    },

    //QUẢN LÝ THÔNG TIN
    {
        path: '/product-order-manager',
        component: MrpSaleOrders
    },
    {
        path: '/manage-production-equirements',
        component: ManageProductionRequirements
    },
    {
        path: '/manage-card-box',
        component: CardManagement
    },
    {
        path: '/manage-job-output',
        component: ManageJobOutput
    },
    //BOM
    {
        path: "/BOM-bodycard",
        component: BOMBodyCard,
    },
    {
        path: "/BOM-personalized",
        component: BOMPersonalized,
    },
    //QUẢN LÝ PCN
    {
        path: "/tech-form-list",
        component: TechFormList,
    },
    {
        path: "/tech-form-approve",
        component: TechFormApprove,
    },
    //QUẢN LÝ KẾ HOẠCH SẢN XUẤT
    {
        path: "/production-plan-list",
        component: ProductionPlanList,
    },
    {
        path: "/declare-production-object",
        component: DeclareProductionObject,
    },
    //GIÁM SÁT TIẾN ĐỘ
    {
        path: "/progress-monitoring-manufacture",
        component: ProgressMonitoringManufacture,
    },
    {
        path: "/progress-monitoring-order",
        component: ProgressMonitoringOrder,
    },
    //         {
    //     path: "/machine-monitoring",
    //     component: ProductionPlanList,
    // },
    {
        path: "/stage-queue",
        component: ProgressMonitoringStageQueue,
    },

    //KHAI BÁO SẢN LƯỢNG
    {
        path: "/declare-quantity",
        component: DeclareQuantity,
    },
      {
        path: "/user-management",
        component: AccountManagement,
    }
]

export const ROUTES: RouteType[] = routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.component, route.path)
    }
})


export type RouteType = {
    path: string;
    element: React.ReactNode;
}