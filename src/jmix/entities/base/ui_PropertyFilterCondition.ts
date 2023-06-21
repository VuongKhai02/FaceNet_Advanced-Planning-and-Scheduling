import { AbstractSingleFilterCondition } from "./ui_AbstractSingleFilterCondition";
import { io_jmix_ui_component_PropertyFilter_Operation } from "../../enums/enums";
export class PropertyFilterCondition extends AbstractSingleFilterCondition {
  static NAME = "ui_PropertyFilterCondition";
  property?: string | null;
  parameterName?: string | null;
  operation?: io_jmix_ui_component_PropertyFilter_Operation | null;
  operationEditable?: boolean | null;
  operationCaptionVisible?: boolean | null;
}
export type PropertyFilterConditionViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type PropertyFilterConditionView<
  V extends PropertyFilterConditionViewName
> = V extends "_base"
  ? Pick<PropertyFilterCondition, "localizedCaption">
  : V extends "_instance_name"
  ? Pick<PropertyFilterCondition, "localizedCaption">
  : never;
