import { User } from './User';
import { PlanningWorkOrder } from "./PlanningWorkOrder";

export class ReturnMaterial {
    static NAME = "ReturnMaterial";
    id?: string;
    planningWorkOrder?: PlanningWorkOrder | null;
    transactionType?: string | null;
    owhNameTo?: string | null;
    owhCodeTo?: string | null;
    userManageExcessQuantity?: User | null;
    returnMaterialStatus?: number | null;
    noReturn?: number | null;
}
export type ReturnMaterialViewName = "_base" | "_instance_name" | "_local" | "with-pwo";
export type ReturnMaterialDetailView<V extends ReturnMaterialViewName> = V extends "_base"
? Pick<ReturnMaterial, "id" 
| "planningWorkOrder"
| "transactionType"
| "owhCodeTo"
| "owhNameTo"
| "returnMaterialStatus"
| "userManageExcessQuantity"
| "noReturn">
: V extends "_instance_name" ?
Pick<ReturnMaterial, "id" 
| "planningWorkOrder"
| "transactionType"
| "owhCodeTo"
| "owhNameTo"
| "returnMaterialStatus"
| "noReturn">
: V extends "_local" ?
Pick<ReturnMaterial, "id" 
| "planningWorkOrder"
| "transactionType"
| "owhCodeTo"
| "owhNameTo"
| "returnMaterialStatus"
| "noReturn">
: V extends "with-pwo" ? 
Pick<ReturnMaterial, "id"
| "planningWorkOrder"
| "transactionType"
| "owhCodeTo"
| "owhNameTo"
| "returnMaterialStatus"
| "userManageExcessQuantity"
| "noReturn">
: never;