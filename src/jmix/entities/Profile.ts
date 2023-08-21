import { ProfileDetail } from "./ProfileDetail";
import { Programming } from "./Programming";
import { StatusEnum } from "../enums/enums";
import { PlanningWorkOrder } from "./PlanningWorkOrder";
import { Coitt } from "./Coitt";

export class Profile {
    static NAME = "Profile";
    id?: string;
    profileCode?: string | null;
    details?: ProfileDetail[] | null;
    createdAt?: any | null;
    description?: string | null;
    name?: string | null;
    programming?: Programming | null;
    status?: StatusEnum | null;
    docEntry?: string | null;
    uProname?: string | null;
    uProno?: string | null;
    uVersion?: string | null;
    updatedAt?: any | null;
    profileDetail?: ProfileDetail[] | null;
    planningWorkOrderList?: PlanningWorkOrder[] | null;
    sapDocEntry?: Coitt | null;
}

export type ProfileViewName =
    | "_base"
    | "_instance_name"
    | "_local"
    | "with-all"
    | "with-dnlnvlDetail"
    | "with-dnlnvlDetail-2"
    | "with-profileDetail"
    | "with-programming";
export type ProfileView<V extends ProfileViewName> = V extends "_base"
    ? Pick<
          Profile,
          | "id"
          | "name"
          | "profileCode"
          | "createdAt"
          | "description"
          | "status"
          | "docEntry"
          | "uProname"
          | "uProno"
          | "uVersion"
          | "updatedAt"
      >
    : V extends "_instance_name"
    ? Pick<Profile, "id" | "name">
    : V extends "_local"
    ? Pick<
          Profile,
          | "id"
          | "profileCode"
          | "createdAt"
          | "description"
          | "name"
          | "status"
          | "docEntry"
          | "uProname"
          | "uProno"
          | "uVersion"
          | "updatedAt"
      >
    : V extends "with-all"
    ? Pick<
          Profile,
          | "id"
          | "name"
          | "profileCode"
          | "createdAt"
          | "description"
          | "status"
          | "docEntry"
          | "uProname"
          | "uProno"
          | "uVersion"
          | "updatedAt"
          | "programming"
      >
    : V extends "with-dnlnvlDetail"
    ? Pick<
          Profile,
          | "id"
          | "name"
          | "profileCode"
          | "createdAt"
          | "description"
          | "status"
          | "docEntry"
          | "uProname"
          | "uProno"
          | "uVersion"
          | "updatedAt"
          | "programming"
      >
    : V extends "with-dnlnvlDetail-2"
    ? Pick<
          Profile,
          | "id"
          | "name"
          | "profileCode"
          | "createdAt"
          | "description"
          | "status"
          | "docEntry"
          | "uProname"
          | "uProno"
          | "uVersion"
          | "updatedAt"
          | "planningWorkOrderList"
      >
    : V extends "with-profileDetail"
    ? Pick<
          Profile,
          | "id"
          | "name"
          | "profileCode"
          | "createdAt"
          | "description"
          | "status"
          | "docEntry"
          | "uProname"
          | "uProno"
          | "uVersion"
          | "updatedAt"
          | "programming"
          | "profileDetail"
      >
    : V extends "with-programming"
    ? Pick<Profile, "id" | "programming">
    : never;
