export class QmsStageGroupMapping {
  static NAME = "QmsStageGroupMapping";
  id?: string;
  groupId?: number;
  groupName?: string;
  stageCode?: string;
  stageName?: string | null;
  defaultGroup?: string | null;
  defaultUser?: string | null;
}
export type QmsStageGroupMappingViewName = "_base" | "_instance_name" | "_local";
export type QmsStageGroupMappingView<V extends QmsStageGroupMappingViewName> = V extends "_base"
  ? Pick<QmsStageGroupMapping, "id" |"groupId"| "groupName"|"stageName" | "stageCode"| "defaultGroup"| "defaultUser">
  : V extends "_local"
    ? Pick<QmsStageGroupMapping, "id" |"groupId"| "groupName"|"stageName" | "stageCode"| "defaultGroup"| "defaultUser">
    : never;
