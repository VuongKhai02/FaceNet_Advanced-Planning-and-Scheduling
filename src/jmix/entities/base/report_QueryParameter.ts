import { ParameterType, PredefinedTransformation } from "../../enums/enums";
export class QueryParameter {
  static NAME = "report_QueryParameter";
  id?: string;
  name?: string | null;
  javaClassName?: string | null;
  entityMetaClassName?: string | null;
  parameterType?: ParameterType | null;
  defaultValueString?: string | null;
  predefinedTransformation?: PredefinedTransformation | null;
  hidden?: boolean | null;
}
export type QueryParameterViewName = "_base" | "_instance_name" | "_local";
export type QueryParameterView<V extends QueryParameterViewName> = never;
