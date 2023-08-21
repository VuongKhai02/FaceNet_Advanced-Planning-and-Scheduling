export class ErrorType {
    static NAME = "ErrorType";
    id?: string;
    errorTypeCode?: string | null;
    errorTypeName?: string | null;
    status?: number | null;
}

export type ErrorTypeViewName = "_base" | "_instance_name" | "_local";
export type ErrorTypeView<V extends ErrorTypeViewName> = V extends "_base"
    ? Pick<ErrorType, "id" | "errorTypeCode" | "errorTypeName" | "status">
    : V extends "_local"
    ? Pick<ErrorType, "id" | "errorTypeCode" | "errorTypeName" | "status">
    : never;
