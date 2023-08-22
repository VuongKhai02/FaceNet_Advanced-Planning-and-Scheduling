import { PlanningWorkOrder } from "./PlanningWorkOrder";
import { Line } from "./Line";
import { StateEnum, StatusEnum } from "../enums/enums";

export class PlanningWorkOrderAssignment {
    static NAME = "PlanningWorkOrderAssignment";
    id?: string;
    actual?: number | null;
    planningWo?: any | null;
    batch?: string | null;
    bomVersion?: string | null;
    productName?: string | null;
    productOrderId?: string | null;
    endTime?: any | null;
    exptected?: number | null;
    planningWorkOrder?: PlanningWorkOrder | null;
    line?: Line | null;
    machine?: number | null;
    performEmployee?: string | null;
    planning?: number | null;
    qaEmployee?: string | null;
    sapBatchCode?: string | null;
    sapBranchGroupCode?: number | null;
    sapWorkOrder?: string | null;
    startTime?: any | null;
    state?: StateEnum | null;
    status?: StatusEnum | null;
    workCenter?: number | null;
}

export type PlanningWorkOrderAssignmentViewName = "_base" | "_instance_name" | "_local" | "with-line";
export type PlanningWorkOrderAssignmentView<V extends PlanningWorkOrderAssignmentViewName> = V extends "_base"
    ? Pick<
          PlanningWorkOrderAssignment,
          | "id"
          | "actual"
          | "planningWo"
          | "batch"
          | "bomVersion"
          | "productName"
          | "productOrderId"
          | "endTime"
          | "exptected"
          | "machine"
          | "performEmployee"
          | "planning"
          | "qaEmployee"
          | "sapBatchCode"
          | "sapBranchGroupCode"
          | "sapWorkOrder"
          | "startTime"
          | "state"
          | "status"
          | "workCenter"
      >
    : V extends "_local"
    ? Pick<
          PlanningWorkOrderAssignment,
          | "id"
          | "actual"
          | "planningWo"
          | "batch"
          | "bomVersion"
          | "productName"
          | "productOrderId"
          | "endTime"
          | "exptected"
          | "machine"
          | "performEmployee"
          | "planning"
          | "qaEmployee"
          | "sapBatchCode"
          | "sapBranchGroupCode"
          | "sapWorkOrder"
          | "startTime"
          | "state"
          | "status"
          | "workCenter"
      >
    : V extends "with-line"
    ? Pick<
          PlanningWorkOrderAssignment,
          | "id"
          | "actual"
          | "planningWo"
          | "batch"
          | "bomVersion"
          | "productName"
          | "productOrderId"
          | "endTime"
          | "exptected"
          | "machine"
          | "performEmployee"
          | "planning"
          | "qaEmployee"
          | "sapBatchCode"
          | "sapBranchGroupCode"
          | "sapWorkOrder"
          | "startTime"
          | "state"
          | "status"
          | "workCenter"
          | "line"
      >
    : never;
