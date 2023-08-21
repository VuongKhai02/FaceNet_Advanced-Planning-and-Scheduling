export class EmployeeGroup {
    static NAME = "EmployeeGroup";
    id?: string;
    userGroupCode?: string | null;
    userGroupName?: string | null;
}

export type EmployeeGroupViewName = "_base" | "_instance_name" | "_local";
export type EmployeeGroupView<V extends EmployeeGroupViewName> = V extends "_base"
    ? Pick<EmployeeGroup, "id" | "userGroupCode" | "userGroupName">
    : V extends "_local"
    ? Pick<EmployeeGroup, "id" | "userGroupCode" | "userGroupName">
    : never;
