import { Report } from "./report_Report";
export class ReportRole {
  static NAME = "report_ReportRole";
  id?: string;
  report?: Report | null;
  roleName?: string | null;
  roleCode?: string | null;
}
export type ReportRoleViewName = "_base" | "_instance_name" | "_local";
export type ReportRoleView<V extends ReportRoleViewName> = never;
