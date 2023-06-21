import { Report } from "./report_Report";
import { ParameterType, PredefinedTransformation } from "../../enums/enums";
export class ReportInputParameter {
  static NAME = "report_ReportInputParameter";
  id?: string;
  report?: Report | null;
  type?: ParameterType | null;
  name?: string | null;
  localeNames?: string | null;
  alias?: string | null;
  position?: number | null;
  entityMetaClass?: string | null;
  lookup?: boolean | null;
  lookupJoin?: string | null;
  lookupWhere?: string | null;
  enumerationClass?: string | null;
  screen?: string | null;
  required?: boolean | null;
  defaultValue?: string | null;
  parameterClassName?: string | null;
  transformationScript?: string | null;
  validationScript?: string | null;
  validationOn?: boolean | null;
  predefinedTransformation?: PredefinedTransformation | null;
  hidden?: boolean | null;
  defaultDateIsCurrent?: boolean | null;
}
export type ReportInputParameterViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type ReportInputParameterView<
  V extends ReportInputParameterViewName
> = V extends "_base"
  ? Pick<ReportInputParameter, "id" | "localeNames" | "name">
  : V extends "_instance_name"
  ? Pick<ReportInputParameter, "id" | "localeNames" | "name">
  : never;
