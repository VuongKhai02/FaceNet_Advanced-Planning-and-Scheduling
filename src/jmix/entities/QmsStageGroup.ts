export class QmsStageGroup {
    static NAME = "QmsStageGroup";
    id?: number;
    groupName?: string;
}

export type QmsStageGroupViewName = "_base" | "_instance_name" | "_local";
export type QmsStageGroupView<V extends QmsStageGroupViewName> = V extends "_base"
    ? Pick<QmsStageGroup, "id" | "groupName">
    : V extends "_local"
    ? Pick<QmsStageGroup, "id" | "groupName">
    : never;
