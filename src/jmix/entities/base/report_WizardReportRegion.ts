import { ReportData } from "./report_WizardReportData";
import { RegionProperty } from "./report_WizardReportRegionProperty";
import { EntityTreeNode } from "./report_WizardReportEntityTreeNode";
export class ReportRegion {
  static NAME = "report_WizardReportRegion";
  id?: string;
  reportData?: ReportData | null;
  isTabulatedRegion?: boolean | null;
  regionProperties?: RegionProperty[] | null;
  regionPropertiesRootNode?: EntityTreeNode | null;
  orderNum?: any | null;
  bandNameFromReport?: string | null;
  nameForBand?: string | null;
  nameForHeaderBand?: string | null;
}
export type ReportRegionViewName = "_base" | "_instance_name" | "_local";
export type ReportRegionView<V extends ReportRegionViewName> = never;
