import { PartNumber } from "./PartNumber";
import { Profile } from "./Profile";
import { ProfileDetailPartNumber } from "./ProfileDetailPartNumber";
import { ProgrammingDetail } from "./ProgrammingDetail";

export class ProfileDetail {
    static NAME = "ProfileDetail";
    id?: string;
    machineCode?: string | null;
    partNumber?: PartNumber | null;
    profile?: Profile | null;
    profileDetailPartNumbers?: ProfileDetailPartNumber[] | null;
    programmingDetail?: ProgrammingDetail | null;
    createdAt?: any | null;
}

export type ProfileDetailViewName = "_base" | "_instance_name" | "_local" | "with-all";
export type ProfileDetailView<V extends ProfileDetailViewName> = V extends "_base"
    ? Pick<ProfileDetail, "id" | "machineCode" | "createdAt">
    : V extends "_local"
    ? Pick<ProfileDetail, "id" | "machineCode" | "createdAt">
    : V extends "with-all"
    ? Pick<ProfileDetail, "id" | "machineCode" | "createdAt" | "profileDetailPartNumbers">
    : never;
