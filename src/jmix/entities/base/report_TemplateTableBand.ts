import { TemplateTableColumn } from "./report_TemplateTableColumn";
export class TemplateTableBand {
  static NAME = "report_TemplateTableBand";
  id?: string;
  bandName?: string | null;
  position?: number | null;
  columns?: TemplateTableColumn[] | null;
}
export type TemplateTableBandViewName = "_base" | "_instance_name" | "_local";
export type TemplateTableBandView<V extends TemplateTableBandViewName> = never;
