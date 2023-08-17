import { Report } from "./report_Report";
import { DataSet } from "./report_DataSet";
import { Orientation } from "../../enums/enums";

export class BandDefinition {
    static NAME = "report_BandDefinition";
    id?: string;
    name?: string | null;
    parentBandDefinition?: BandDefinition | null;
    report?: Report | null;
    childrenBandDefinitions?: BandDefinition[] | null;
    dataSets?: DataSet[] | null;
    orientation?: Orientation | null;
    position?: number | null;
}

export type BandDefinitionViewName = "_base" | "_instance_name" | "_local";
export type BandDefinitionView<V extends BandDefinitionViewName> = V extends "_base"
    ? Pick<BandDefinition, "id" | "name">
    : V extends "_instance_name"
    ? Pick<BandDefinition, "id" | "name">
    : never;
