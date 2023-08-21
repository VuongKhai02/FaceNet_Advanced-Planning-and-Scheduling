export class AbstractChartDescription {
    static NAME = "report_AbstractChartDescription";
    id?: string;
    showLegend?: boolean | null;
    customJsonConfig?: string | null;
}

export type AbstractChartDescriptionViewName = "_base" | "_instance_name" | "_local";
export type AbstractChartDescriptionView<V extends AbstractChartDescriptionViewName> = never;
