import { PlanningWorkOrder } from "./PlanningWorkOrder";
import { DnlnvlDetail } from "./DnlnvlDetail";
import {User} from "./User";
export class Dnlnvl {
  static NAME = "Dnlnvl";
  id?: string;
  planningWorkOrder?: PlanningWorkOrder | null;
  dnlnvlDetails?: DnlnvlDetail[] | null;
  type?: string | null;
  status?: string | null;
  numOfReq?: number | null;
  sentBy?: string | null;
  approver?:string | null;
  warehouseApprover?:string | null;
  createdAt?: any | null;
  createdBy?: string | null;
  updatedAt?: any | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  deletedAt?: any | null;
  sentDate?: any | null;
  approveDate?: any | null;
  owhCode?:string | null;
  owhName?:string | null;
  transactionType?: string | null;
  owhCodeFrom?: string | null;
  owhCodeTo?: string | null;
  owhNameFrom?: string | null;
  owhNameTo?: string | null;
  sourceDepartmentName?: string | null;
  sourceDepartmentCode?: string | null;
  destinationDepartmentName?: string | null;
  destinationDepartmentCode?: string | null;
  returnMaterialStatus?: string | null;
  userManageExcessMaterial?: User | null;
  returnMaterialToWarehouse?: string | null;
  transactionTypeReturn?: string | null;
  dnlnvlType?: string | null;
  saveSendMES?: boolean | null;
  woNamePana?: string | null;
}
export type DnlnvlViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "with-dnlnvlDetail";
export type DnlnvlView<V extends DnlnvlViewName> = V extends "_base"
  ? Pick<
      Dnlnvl,
      | "id"
      | "type"
      | "status"
      | "numOfReq"
      | "sentBy"
      | "approver"
      | "warehouseApprover"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt"
      | "sentDate"
      | "approveDate"
      | "owhCode"
      | "owhName"
    | "transactionType"
    | "owhCodeFrom"
    | "owhCodeTo"
    | "owhNameFrom"
    | "owhNameTo"
    | "sourceDepartmentName"
    | "sourceDepartmentCode"
    | "destinationDepartmentName"
    | "destinationDepartmentCode"
    | "dnlnvlType"
    | "saveSendMES"
    | "woNamePana"
    >
  : V extends "_local"
  ? Pick<
      Dnlnvl,
      | "id"
      | "type"
      | "status"
      | "numOfReq"
      | "sentBy"
      | "approver"
      | "warehouseApprover"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt"
      | "sentDate"
      | "approveDate"
      | "owhCode"
      | "owhName"
      | "transactionType"
      | "owhCodeFrom"
      | "owhCodeTo"
      | "owhNameFrom"
      | "owhNameTo"
      | "sourceDepartmentName"
      | "sourceDepartmentCode"
      | "destinationDepartmentName"
      | "destinationDepartmentCode"
      | "dnlnvlType"
      | "saveSendMES"
      | "woNamePana"
      >
  : V extends "with-dnlnvlDetail"
  ? Pick<
      Dnlnvl,
      | "id"
      | "type"
      | "status"
        | "numOfReq"
        | "sentBy"
        | "approver"
        | "warehouseApprover"
        | "owhCode"
        | "owhName"
        | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt"
      | "dnlnvlDetails"
      | "planningWorkOrder"
        | "transactionType"
        | "owhCodeFrom"
        | "owhCodeTo"
        | "owhNameFrom"
        | "owhNameTo"
        | "sourceDepartmentName"
        | "sourceDepartmentCode"
        | "destinationDepartmentName"
        | "destinationDepartmentCode"
        | "dnlnvlType"
        | "saveSendMES"
        | "woNamePana"
    >
    : V extends "with-work-order"
    ? Pick< Dnlnvl,
    | "id"
      | "type"
      | "status"
      | "numOfReq"
      | "sentBy"
      | "approver"
      | "warehouseApprover"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt"
      | "sentDate"
      | "approveDate"
      | "owhCode"
      | "owhName"
    | "transactionType"
    | "owhCodeFrom"
    | "owhCodeTo"
    | "owhNameFrom"
    | "owhNameTo"
    | "sourceDepartmentName"
    | "sourceDepartmentCode"
    | "destinationDepartmentName"
    | "destinationDepartmentCode"
    | "planningWorkOrder"
    | "returnMaterialStatus"
    | "userManageExcessMaterial"
    | "returnMaterialToWarehouse"
    | "transactionTypeReturn"
    | "dnlnvlType"
    | "saveSendMES"
    | "woNamePana"
    >
  : never;
