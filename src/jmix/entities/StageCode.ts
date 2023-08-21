export class StageCode {
    static NAME = "StageCode";
    id?: string;
    stageName?: string | null;
    status?: number | null;
}

export type StageCodeViewName = "_base" | "_instance_name" | "_local";
export type StageCodeView<V extends StageCodeViewName> = V extends "_base"
    ? Pick<StageCode, "id" | "stageName" | "status">
    : V extends "_local"
    ? Pick<StageCode, "id" | "stageName" | "status">
    : never;
