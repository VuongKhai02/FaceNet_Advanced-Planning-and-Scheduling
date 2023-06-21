export class ReportGroup {
  static NAME = "report_ReportGroup";
  id?: string;
  version?: number | null;
  createTs?: any | null;
  createdBy?: string | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
  title?: string | null;
  code?: string | null;
  localeNames?: string | null;
  sysTenantId?: string | null;
  systemFlag?: boolean | null;
}
export type ReportGroupViewName = "_base" | "_instance_name" | "_local";
export type ReportGroupView<V extends ReportGroupViewName> = V extends "_base"
  ? Pick<
      ReportGroup,
      | "id"
      | "title"
      | "localeNames"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "sysTenantId"
    >
  : V extends "_instance_name"
  ? Pick<ReportGroup, "id" | "title" | "localeNames">
  : V extends "_local"
  ? Pick<
      ReportGroup,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "title"
      | "code"
      | "localeNames"
      | "sysTenantId"
    >
  : never;
