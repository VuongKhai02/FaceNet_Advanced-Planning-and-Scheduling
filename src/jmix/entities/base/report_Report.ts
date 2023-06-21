import { ReportGroup } from "./report_ReportGroup";
import { ReportTemplate } from "./report_ReportTemplate";
import { ReportType } from "../../enums/enums";
import { BandDefinition } from "./report_BandDefinition";
import { ReportInputParameter } from "./report_ReportInputParameter";
import { ReportValueFormat } from "./report_ReportValueFormat";
import { ReportScreen } from "./report_ReportScreen";
import { ReportRole } from "./report_ReportRole";
export class Report {
  static NAME = "report_Report";
  id?: string;
  version?: number | null;
  createTs?: any | null;
  createdBy?: string | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
  name?: string | null;
  localeNames?: string | null;
  code?: string | null;
  group?: ReportGroup | null;
  defaultTemplate?: ReportTemplate | null;
  reportType?: ReportType | null;
  description?: string | null;
  xml?: string | null;
  rolesIdx?: string | null;
  screensIdx?: string | null;
  inputEntityTypesIdx?: string | null;
  restAccess?: boolean | null;
  sysTenantId?: string | null;
  templates?: ReportTemplate[] | null;
  system?: boolean | null;
  rootBandDefinition?: BandDefinition | null;
  bands?: BandDefinition[] | null;
  inputParameters?: ReportInputParameter[] | null;
  valuesFormats?: ReportValueFormat[] | null;
  reportScreens?: ReportScreen[] | null;
  reportRoles?: ReportRole[] | null;
  validationScript?: string | null;
  validationOn?: boolean | null;
}
export type ReportViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "report.browse"
  | "report.edit"
  | "report.print"
  | "report.run"
  | "report.selectTemplate"
  | "report.view"
  | "report.withTemplates";
export type ReportView<V extends ReportViewName> = V extends "_base"
  ? Pick<
      Report,
      | "id"
      | "localeNames"
      | "name"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
    >
  : V extends "_instance_name"
  ? Pick<Report, "id" | "localeNames" | "name">
  : V extends "_local"
  ? Pick<
      Report,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
    >
  : V extends "report.browse"
  ? Pick<
      Report,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "group"
    >
  : V extends "report.edit"
  ? Pick<
      Report,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "templates"
      | "defaultTemplate"
      | "group"
    >
  : V extends "report.print"
  ? Pick<
      Report,
      | "id"
      | "name"
      | "localeNames"
      | "description"
      | "templates"
      | "defaultTemplate"
      | "code"
      | "xml"
    >
  : V extends "report.run"
  ? Pick<
      Report,
      | "id"
      | "localeNames"
      | "name"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "templates"
      | "defaultTemplate"
    >
  : V extends "report.selectTemplate"
  ? Pick<Report, "id" | "localeNames" | "name" | "templates">
  : V extends "report.view"
  ? Pick<
      Report,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "description"
      | "reportType"
      | "group"
    >
  : V extends "report.withTemplates"
  ? Pick<Report, "id" | "localeNames" | "name" | "templates">
  : never;
