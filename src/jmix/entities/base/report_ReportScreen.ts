import { Report } from "./report_Report";

export class ReportScreen {
    static NAME = "report_ReportScreen";
    id?: string;
    report?: Report | null;
    screenId?: string | null;
}

export type ReportScreenViewName = "_base" | "_instance_name" | "_local";
export type ReportScreenView<V extends ReportScreenViewName> = never;
