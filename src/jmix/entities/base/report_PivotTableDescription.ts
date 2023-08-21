import { RendererType } from "../../enums/enums";
import { PivotTableAggregation } from "./report_PivotTableAggregation";
import { PivotTableProperty } from "./report_PivotTableProperty";

export class PivotTableDescription {
    static NAME = "report_PivotTableDescription";
    id?: string;
    bandName?: string | null;
    defaultRenderer?: RendererType | null;
    renderers?: RendererType | null;
    defaultAggregation?: PivotTableAggregation | null;
    aggregations?: PivotTableAggregation[] | null;
    properties?: PivotTableProperty[] | null;
    editable?: boolean | null;
    filterFunction?: string | null;
    sortersFunction?: string | null;
    colorScaleGeneratorFunction?: string | null;
    c3Width?: any | null;
    c3Height?: any | null;
    rowsProperties?: string | null;
    columnsProperties?: string | null;
    aggregationProperties?: string | null;
}

export type PivotTableDescriptionViewName = "_base" | "_instance_name" | "_local";
export type PivotTableDescriptionView<V extends PivotTableDescriptionViewName> = never;
