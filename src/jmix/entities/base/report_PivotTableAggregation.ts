import { AggregationMode } from "../../enums/enums";

export class PivotTableAggregation {
    static NAME = "report_PivotTableAggregation";
    id?: string;
    mode?: AggregationMode | null;
    caption?: string | null;
    function?: string | null;
}

export type PivotTableAggregationViewName = "_base" | "_instance_name" | "_local";
export type PivotTableAggregationView<V extends PivotTableAggregationViewName> = never;
