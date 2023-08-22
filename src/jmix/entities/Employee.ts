export class Employee {
    static NAME = "Employee";
    id?: string;
    employeeCode?: string | null;
    employeeGroup?: string | null;
    fullName?: string | null;
    image?: string | null;
    mail?: string | null;
    status?: number | null;
    userName?: string | null;
    phoneNumber?: string | null;
}

export type EmployeeViewName = "_base" | "_instance_name" | "_local";
export type EmployeeView<V extends EmployeeViewName> = V extends "_base"
    ? Pick<Employee, "id" | "employeeCode" | "employeeGroup" | "fullName" | "image" | "mail" | "status" | "userName" | "phoneNumber">
    : V extends "_local"
    ? Pick<Employee, "id" | "employeeCode" | "employeeGroup" | "fullName" | "image" | "mail" | "status" | "userName" | "phoneNumber">
    : never;
