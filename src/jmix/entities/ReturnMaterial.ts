import { User } from "./User";
import { PlanningWorkOrder } from "./PlanningWorkOrder";

export class ReturnMaterial {
    static NAME = "ReturnMaterial";
    id?: string;
    planningWorkOrder?: PlanningWorkOrder | null;
    transactionType?: string | null;
    owhNameTo?: string | null;
    owhCodeTo?: string | null;
    userManageExcessQuantity?: string | null;
    returnMaterialStatus?: number | null;
    noReturn?: number | null;
    canSendSAP?: boolean | null;
    canSendMES?: boolean | null;
    locationReturned?: string | undefined;
    noteSendSAP?: string | null;
}

export type ReturnMaterialViewName = "_base" | "_instance_name" | "_local" | "with-pwo";
export type ReturnMaterialDetailView<V extends ReturnMaterialViewName> = V extends "_base"
    ? Pick<
          ReturnMaterial,
          | "id"
          | "planningWorkOrder"
          | "transactionType"
          | "owhCodeTo"
          | "owhNameTo"
          | "returnMaterialStatus"
          | "userManageExcessQuantity"
          | "noReturn"
          | "canSendMES"
          | "canSendSAP"
          | "locationReturned"
          | "noteSendSAP"
      >
    : V extends "_instance_name"
    ? Pick<
          ReturnMaterial,
          | "id"
          | "planningWorkOrder"
          | "transactionType"
          | "owhCodeTo"
          | "owhNameTo"
          | "returnMaterialStatus"
          | "noReturn"
          | "canSendSAP"
          | "canSendMES"
          | "locationReturned"
          | "noteSendSAP"
      >
    : V extends "_local"
    ? Pick<
          ReturnMaterial,
          | "id"
          | "planningWorkOrder"
          | "transactionType"
          | "owhCodeTo"
          | "owhNameTo"
          | "returnMaterialStatus"
          | "noReturn"
          | "canSendMES"
          | "canSendSAP"
          | "locationReturned"
          | "noteSendSAP"
      >
    : V extends "with-pwo"
    ? Pick<
          ReturnMaterial,
          | "id"
          | "planningWorkOrder"
          | "transactionType"
          | "owhCodeTo"
          | "owhNameTo"
          | "returnMaterialStatus"
          | "userManageExcessQuantity"
          | "noReturn"
          | "canSendMES"
          | "canSendSAP"
          | "locationReturned"
          | "noteSendSAP"
      >
    : never;
