import { DataSetType, JsonSourceType } from "../../enums/enums";
import { ReportInputParameter } from "./report_ReportInputParameter";
import { BandDefinition } from "./report_BandDefinition";

export class DataSet {
    static NAME = "report_DataSet";
    id?: string;
    name?: string | null;
    useExistingFetchPLan?: boolean | null;
    fetchPlanName?: string | null;
    text?: string | null;
    type?: DataSetType | null;
    jsonSourceType?: JsonSourceType | null;
    jsonSourceText?: string | null;
    jsonPathQuery?: string | null;
    jsonSourceInputParameter?: ReportInputParameter | null;
    entityParamName?: string | null;
    listEntitiesParamName?: string | null;
    bandDefinition?: BandDefinition | null;
    linkParameterName?: string | null;
    dataStore?: string | null;
    processTemplate?: boolean | null;
}

export type DataSetViewName = "_base" | "_instance_name" | "_local";
export type DataSetView<V extends DataSetViewName> = never;
