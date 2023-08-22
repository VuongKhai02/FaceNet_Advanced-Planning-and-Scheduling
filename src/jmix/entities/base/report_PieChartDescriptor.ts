import { AbstractChartDescription } from "./report_AbstractChartDescription";

export class PieChartDescription extends AbstractChartDescription {
    static NAME = "report_PieChartDescriptor";
    bandName?: string | null;
    titleField?: string | null;
    valueField?: string | null;
    colorField?: string | null;
    units?: string | null;
}

export type PieChartDescriptionViewName = "_base" | "_instance_name" | "_local";
export type PieChartDescriptionView<V extends PieChartDescriptionViewName> = never;
