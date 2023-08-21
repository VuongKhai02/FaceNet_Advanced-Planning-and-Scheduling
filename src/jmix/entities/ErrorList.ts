export class ErrorList {
    static NAME = "ErrorList";
    id?: string;
    errorCode?: string | null;
    errorDescription?: string | null;
    errorType?: string | null;
    status?: number | null;
}

export type ErrorListViewName = "_base" | "_instance_name" | "_local";
export type ErrorListView<V extends ErrorListViewName> = V extends "_base"
    ? Pick<ErrorList, "id" | "errorCode" | "errorDescription" | "errorType" | "status">
    : V extends "_local"
    ? Pick<ErrorList, "id" | "errorCode" | "errorDescription" | "errorType" | "status">
    : never;
