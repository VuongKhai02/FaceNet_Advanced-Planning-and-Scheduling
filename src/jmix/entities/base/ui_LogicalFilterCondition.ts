import { FilterCondition } from "./ui_FilterCondition";
import { io_jmix_ui_component_LogicalFilterComponent_Operation } from "../../enums/enums";
export class LogicalFilterCondition extends FilterCondition {
  static NAME = "ui_LogicalFilterCondition";
  operation?: io_jmix_ui_component_LogicalFilterComponent_Operation | null;
  operationCaptionVisible?: boolean | null;
  ownFilterConditions?: FilterCondition[] | null;
}
export type LogicalFilterConditionViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type LogicalFilterConditionView<
  V extends LogicalFilterConditionViewName
> = V extends "_base"
  ? Pick<LogicalFilterCondition, "operation">
  : V extends "_instance_name"
  ? Pick<LogicalFilterCondition, "operation">
  : never;
