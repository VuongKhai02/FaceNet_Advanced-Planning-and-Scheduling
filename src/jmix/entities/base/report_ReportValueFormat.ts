import { Report } from "./report_Report";
export class ReportValueFormat {
  static NAME = "report_ReportValueFormat";
  id?: string;
  valueName?: string | null;
  formatString?: string | null;
  report?: Report | null;
  groovyScript?: boolean | null;
}
export type ReportValueFormatViewName = "_base" | "_instance_name" | "_local";
export type ReportValueFormatView<V extends ReportValueFormatViewName> = never;
