import { FilterCondition } from "./ui_FilterCondition";
import { CaptionPosition } from "../../enums/enums";
import { FilterValueComponent } from "./ui_FilterValueComponent";
export class AbstractSingleFilterCondition extends FilterCondition {
  static NAME = "ui_AbstractSingleFilterCondition";
  captionPosition?: CaptionPosition | null;
  valueComponent?: FilterValueComponent | null;
  required?: boolean | null;
}
export type AbstractSingleFilterConditionViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type AbstractSingleFilterConditionView<
  V extends AbstractSingleFilterConditionViewName
> = V extends "_base"
  ? Pick<AbstractSingleFilterCondition, "localizedCaption">
  : V extends "_instance_name"
  ? Pick<AbstractSingleFilterCondition, "localizedCaption">
  : never;
