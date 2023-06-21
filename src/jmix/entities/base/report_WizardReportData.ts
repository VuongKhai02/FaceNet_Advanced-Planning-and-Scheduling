import { EntityTreeNode } from "./report_WizardReportEntityTreeNode";
import { Report } from "./report_Report";
import { ReportGroup } from "./report_ReportGroup";
import { ReportOutputType, TemplateFileType } from "../../enums/enums";
import { ReportRegion } from "./report_WizardReportRegion";
import { QueryParameter } from "./report_QueryParameter";
export class ReportData {
  static NAME = "report_WizardReportData";
  id?: string;
  name?: string | null;
  entityName?: string | null;
  entityTreeRootNode?: EntityTreeNode | null;
  generatedReport?: Report | null;
  group?: ReportGroup | null;
  reportTypeGenerate?: any | null;
  templateFileName?: string | null;
  outputNamePattern?: string | null;
  outputFileType?: ReportOutputType | null;
  reportRegions?: ReportRegion[] | null;
  query?: string | null;
  queryParameters?: QueryParameter[] | null;
  templateFileType?: TemplateFileType | null;
}
export type ReportDataViewName = "_base" | "_instance_name" | "_local";
export type ReportDataView<V extends ReportDataViewName> = never;
