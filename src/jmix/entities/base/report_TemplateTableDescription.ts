import { TemplateTableBand } from "./report_TemplateTableBand";
export class TemplateTableDescription {
  static NAME = "report_TemplateTableDescription";
  id?: string;
  templateTableBands?: TemplateTableBand[] | null;
}
export type TemplateTableDescriptionViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type TemplateTableDescriptionView<
  V extends TemplateTableDescriptionViewName
> = never;
