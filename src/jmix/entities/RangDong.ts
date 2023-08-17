export class RangDong {
    static NAME = "RangDong";
    id?: string;
    errorCode?: string | null;
    errorDescription?: string | null;
    errorType?: string | null;
    status?: number | null;
}

export type RangDongViewName = "_base" | "_instance_name" | "_local";
export type RangDongView<V extends RangDongViewName> = V extends "_base"
    ? Pick<RangDong, "id" | "errorCode" | "errorDescription" | "errorType" | "status">
    : V extends "_local"
    ? Pick<RangDong, "id" | "errorCode" | "errorDescription" | "errorType" | "status">
    : never;
