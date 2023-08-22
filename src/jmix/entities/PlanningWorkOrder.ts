import { StateEnum, StatusEnum } from "../enums/enums";
import { Profile } from "./Profile";

export class PlanningWorkOrder {
    static NAME = "PlanningWorkOrder";
    id?: string;
    planningWorkOrderId?: any | null;
    woId?: string | null;
    bomVersion?: string | null;
    branchCode?: string | null;
    branchName?: string | null;
    createTime?: any | null;
    startTime?: any | null;
    endTime?: any | null;
    groupCode?: string | null;
    groupName?: string | null;
    workOrderType?: string | null;
    workOrderTypeName?: string | null;
    parentWorkOrderId?: string | null;
    product?: number | null;
    isNew?: number | null;
    productCode?: string | null;
    productName?: string | null;
    productOrder?: string | null;
    quantityPlan?: number | null;
    numberStaff?: number | null;
    quantityActual?: number | null;
    sapWo?: string | null;
    lotNumber?: string | null;
    line?: string | null;
    state?: StateEnum | null;
    status?: StatusEnum | null;
    processStatus?: string | null;
    note?: string | null;
    profile?: string | null;
    profileId?: Profile | null;
    profileName?: string | null;
    quota?: any | null;
    scadaUserName?: string | null;
    scadaUserGroup?: string | null;
    scadaUserFullname?: string | null;
    scadaStageList?: string | null;
    scadaQuantityOut?: number | null;
    scadaAssetId?: string | null;
    statusReturnMaterial?: number | null;
    reasonId?: number | null;
    scadaQuantityOut1?: number | null;
    latestTimeCreateDnlnvl?: any | null;
}

export type PlanningWorkOrderViewName =
    | "_base"
    | "_instance_name"
    | "_local"
    | "full-info"
    | "with-dnlnvlDetail"
    | "with-profile"
    | "wo-with-assignment";
export type PlanningWorkOrderView<V extends PlanningWorkOrderViewName> = V extends "_base"
    ? Pick<
          PlanningWorkOrder,
          | "id"
          | "planningWorkOrderId"
          | "woId"
          | "bomVersion"
          | "branchCode"
          | "branchName"
          | "createTime"
          | "startTime"
          | "endTime"
          | "groupCode"
          | "groupName"
          | "workOrderType"
          | "workOrderTypeName"
          | "parentWorkOrderId"
          | "product"
          | "isNew"
          | "productCode"
          | "productName"
          | "productOrder"
          | "quantityPlan"
          | "numberStaff"
          | "quantityActual"
          | "sapWo"
          | "lotNumber"
          | "line"
          | "state"
          | "status"
          | "note"
          | "profile"
          | "profileName"
          | "quota"
          | "scadaUserName"
          | "scadaUserGroup"
          | "scadaUserFullname"
          | "scadaStageList"
          | "scadaQuantityOut"
          | "scadaAssetId"
          | "reasonId"
          | "latestTimeCreateDnlnvl"
          | "processStatus"
      >
    : V extends "_local"
    ? Pick<
          PlanningWorkOrder,
          | "id"
          | "planningWorkOrderId"
          | "woId"
          | "bomVersion"
          | "branchCode"
          | "branchName"
          | "createTime"
          | "startTime"
          | "endTime"
          | "groupCode"
          | "groupName"
          | "workOrderType"
          | "workOrderTypeName"
          | "parentWorkOrderId"
          | "product"
          | "isNew"
          | "productCode"
          | "productName"
          | "productOrder"
          | "quantityPlan"
          | "numberStaff"
          | "quantityActual"
          | "sapWo"
          | "lotNumber"
          | "line"
          | "state"
          | "status"
          | "note"
          | "profile"
          | "profileName"
          | "quota"
          | "scadaUserName"
          | "scadaUserGroup"
          | "scadaUserFullname"
          | "scadaStageList"
          | "scadaQuantityOut"
          | "scadaAssetId"
          | "reasonId"
          | "latestTimeCreateDnlnvl"
      >
    : V extends "full-info"
    ? Pick<
          PlanningWorkOrder,
          | "id"
          | "planningWorkOrderId"
          | "woId"
          | "bomVersion"
          | "branchCode"
          | "branchName"
          | "createTime"
          | "startTime"
          | "endTime"
          | "groupCode"
          | "groupName"
          | "workOrderType"
          | "workOrderTypeName"
          | "parentWorkOrderId"
          | "product"
          | "isNew"
          | "productCode"
          | "productName"
          | "productOrder"
          | "quantityPlan"
          | "numberStaff"
          | "quantityActual"
          | "sapWo"
          | "lotNumber"
          | "line"
          | "state"
          | "status"
          | "note"
          | "profile"
          | "profileName"
          | "quota"
          | "scadaUserName"
          | "scadaUserGroup"
          | "scadaUserFullname"
          | "profileId"
          | "scadaStageList"
          | "scadaQuantityOut"
          | "scadaAssetId"
          | "reasonId"
          | "latestTimeCreateDnlnvl"
      >
    : V extends "with-dnlnvlDetail"
    ? Pick<
          PlanningWorkOrder,
          | "id"
          | "planningWorkOrderId"
          | "woId"
          | "bomVersion"
          | "branchCode"
          | "branchName"
          | "createTime"
          | "startTime"
          | "endTime"
          | "groupCode"
          | "groupName"
          | "workOrderType"
          | "workOrderTypeName"
          | "parentWorkOrderId"
          | "product"
          | "isNew"
          | "productCode"
          | "productName"
          | "productOrder"
          | "quantityPlan"
          | "numberStaff"
          | "quantityActual"
          | "sapWo"
          | "lotNumber"
          | "line"
          | "state"
          | "status"
          | "note"
          | "profile"
          | "profileName"
          | "quota"
          | "scadaUserName"
          | "scadaUserGroup"
          | "scadaUserFullname"
          | "profileId"
          | "scadaStageList"
          | "reasonId"
          | "latestTimeCreateDnlnvl"
      >
    : V extends "with-profile"
    ? Pick<
          PlanningWorkOrder,
          | "id"
          | "planningWorkOrderId"
          | "woId"
          | "bomVersion"
          | "branchCode"
          | "branchName"
          | "createTime"
          | "startTime"
          | "endTime"
          | "groupCode"
          | "groupName"
          | "workOrderType"
          | "workOrderTypeName"
          | "parentWorkOrderId"
          | "product"
          | "isNew"
          | "productCode"
          | "productName"
          | "productOrder"
          | "quantityPlan"
          | "numberStaff"
          | "quantityActual"
          | "sapWo"
          | "lotNumber"
          | "line"
          | "state"
          | "status"
          | "note"
          | "profile"
          | "profileName"
          | "quota"
          | "scadaUserName"
          | "scadaUserGroup"
          | "scadaUserFullname"
          | "profileId"
          | "reasonId"
          | "latestTimeCreateDnlnvl"
      >
    : V extends "wo-with-assignment"
    ? Pick<
          PlanningWorkOrder,
          | "id"
          | "planningWorkOrderId"
          | "woId"
          | "bomVersion"
          | "branchCode"
          | "branchName"
          | "createTime"
          | "startTime"
          | "endTime"
          | "groupCode"
          | "groupName"
          | "workOrderType"
          | "workOrderTypeName"
          | "parentWorkOrderId"
          | "product"
          | "isNew"
          | "productCode"
          | "productName"
          | "productOrder"
          | "quantityPlan"
          | "numberStaff"
          | "quantityActual"
          | "sapWo"
          | "lotNumber"
          | "line"
          | "state"
          | "status"
          | "note"
          | "profile"
          | "profileName"
          | "quota"
          | "scadaUserName"
          | "scadaUserGroup"
          | "scadaUserFullname"
          | "reasonId"
          | "latestTimeCreateDnlnvl"
      >
    : never;
