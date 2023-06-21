export class WorkOrderStage {
  static NAME = "WorkOrderStage";
  id?: string;
  stageCode?: string | null;
  stageName?: string | null;
  status?: number | null;
  workOrder?: string | null;
  employeeGroupCode?: string | null;
  employeeGroupName?: string | null;
  employeeName?: string | null;
  userName?: string | null;
  productCode?: string | null;
  productName?: string | null;
}
export type WorkOrderStageViewName = "_base" | "_instance_name" | "_local";
export type WorkOrderStageView<
  V extends WorkOrderStageViewName
> = V extends "_base"
  ? Pick<
      WorkOrderStage,
      | "id"
      | "stageCode"
      | "stageName"
      | "status"
      | "workOrder"
      | "employeeGroupCode"
      | "employeeGroupName"
      | "employeeName"
      | "userName"
      | "productCode"
      | "productName"
    >
  : V extends "_local"
  ? Pick<
      WorkOrderStage,
      | "id"
      | "stageCode"
      | "stageName"
      | "status"
      | "workOrder"
      | "employeeGroupCode"
      | "employeeGroupName"
      | "employeeName"
      | "userName"
      | "productCode"
      | "productName"
    >
  : never;
