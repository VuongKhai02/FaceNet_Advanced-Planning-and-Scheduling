import { PivotTablePropertyType } from "../../enums/enums";

export class PivotTableProperty {
    static NAME = "report_PivotTableProperty";
    id?: string;
    name?: string | null;
    caption?: string | null;
    function?: string | null;
    hidden?: boolean | null;
    type?: PivotTablePropertyType | null;
}

export type PivotTablePropertyViewName = "_base" | "_instance_name" | "_local";
export type PivotTablePropertyView<V extends PivotTablePropertyViewName> = never;
