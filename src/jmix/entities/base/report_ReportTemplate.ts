import { Report } from "./report_Report";
import { ReportOutputType, CustomTemplateDefinedBy } from "../../enums/enums";
export class ReportTemplate {
  static NAME = "report_ReportTemplate";
  id?: string;
  version?: number | null;
  createTs?: any | null;
  createdBy?: string | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
  report?: Report | null;
  reportOutputType?: ReportOutputType | null;
  code?: string | null;
  groovy?: boolean | null;
  custom?: boolean | null;
  alterable?: boolean | null;
  customDefinition?: string | null;
  customDefinedBy?: CustomTemplateDefinedBy | null;
  outputNamePattern?: string | null;
  name?: string | null;
  content?: any | null;
}
export type ReportTemplateViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "reportTemplate.withOutputType"
  | "template.edit";
export type ReportTemplateView<
  V extends ReportTemplateViewName
> = V extends "_base"
  ? Pick<
      ReportTemplate,
      | "id"
      | "code"
      | "name"
      | "customDefinition"
      | "custom"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "reportOutputType"
      | "groovy"
      | "alterable"
      | "customDefinedBy"
      | "outputNamePattern"
      | "content"
    >
  : V extends "_instance_name"
  ? Pick<ReportTemplate, "id" | "code" | "name" | "customDefinition" | "custom">
  : V extends "_local"
  ? Pick<
      ReportTemplate,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "reportOutputType"
      | "code"
      | "groovy"
      | "custom"
      | "alterable"
      | "customDefinition"
      | "customDefinedBy"
      | "outputNamePattern"
      | "name"
      | "content"
    >
  : V extends "reportTemplate.withOutputType"
  ? Pick<
      ReportTemplate,
      | "id"
      | "code"
      | "name"
      | "customDefinition"
      | "custom"
      | "reportOutputType"
    >
  : V extends "template.edit"
  ? Pick<
      ReportTemplate,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "reportOutputType"
      | "code"
      | "groovy"
      | "custom"
      | "alterable"
      | "customDefinition"
      | "customDefinedBy"
      | "outputNamePattern"
      | "name"
      | "content"
      | "report"
    >
  : never;
