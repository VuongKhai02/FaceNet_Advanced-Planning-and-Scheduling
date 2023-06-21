import { Report } from "./report_Report";
export class ReportExecution {
  static NAME = "report_ReportExecution";
  id?: string;
  createTs?: any | null;
  createdBy?: string | null;
  report?: Report | null;
  reportName?: string | null;
  reportCode?: string | null;
  username?: string | null;
  startTime?: any | null;
  finishTime?: any | null;
  success?: boolean | null;
  cancelled?: boolean | null;
  outputDocument?: any | null;
  params?: string | null;
  errorMessage?: string | null;
  executionTimeSec?: any | null;
}
export type ReportExecutionViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "reportExecution.browse";
export type ReportExecutionView<
  V extends ReportExecutionViewName
> = V extends "_base"
  ? Pick<
      ReportExecution,
      | "id"
      | "createTs"
      | "createdBy"
      | "reportName"
      | "reportCode"
      | "username"
      | "startTime"
      | "finishTime"
      | "success"
      | "cancelled"
      | "outputDocument"
      | "params"
      | "errorMessage"
    >
  : V extends "_local"
  ? Pick<
      ReportExecution,
      | "id"
      | "createTs"
      | "createdBy"
      | "reportName"
      | "reportCode"
      | "username"
      | "startTime"
      | "finishTime"
      | "success"
      | "cancelled"
      | "outputDocument"
      | "params"
      | "errorMessage"
    >
  : V extends "reportExecution.browse"
  ? Pick<
      ReportExecution,
      | "id"
      | "createTs"
      | "createdBy"
      | "reportName"
      | "reportCode"
      | "username"
      | "startTime"
      | "finishTime"
      | "success"
      | "cancelled"
      | "outputDocument"
      | "params"
      | "errorMessage"
    >
  : never;
