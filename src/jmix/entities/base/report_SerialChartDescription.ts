import { AbstractChartDescription } from "./report_AbstractChartDescription";
import { StackType } from "../../enums/enums";
import { ChartSeries } from "./report_ChartSeries";

export class SerialChartDescription extends AbstractChartDescription {
    static NAME = "report_SerialChartDescription";
    bandName?: string | null;
    categoryField?: string | null;
    categoryAxisCaption?: string | null;
    valueAxisCaption?: string | null;
    valueAxisUnits?: string | null;
    valueStackType?: StackType | null;
    series?: ChartSeries[] | null;
    categoryAxisLabelRotation?: number | null;
}

export type SerialChartDescriptionViewName = "_base" | "_instance_name" | "_local";
export type SerialChartDescriptionView<V extends SerialChartDescriptionViewName> = never;
