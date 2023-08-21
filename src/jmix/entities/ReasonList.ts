export class ReasonList {
    static NAME = "ReasonList";
    id?: string;
    reason?: string | null;
}

export type ReasonViewName = "_base" | "_instance_name" | "_local";
export type ReasonView<V extends ReasonViewName> = V extends "_base"
    ? Pick<ReasonList, "id" | "reason">
    : V extends "_local"
    ? Pick<ReasonList, "id" | "reason">
    : never;
