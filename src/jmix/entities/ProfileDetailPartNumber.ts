import { PartNumber } from "./PartNumber";
import { ProgrammingDetail } from "./ProgrammingDetail";
import {Profile} from "./Profile";
export class ProfileDetailPartNumber {
  static NAME = "ProfileDetailPartNumber";
  id?: string;
  partNumber?: PartNumber | null;
  profile?: Profile | null;
  type?: string | null;
  createdBy?: string | null;
  createdDate?: any | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: any | null;
  deletedBy?: string | null;
  deletedDate?: any | null;
  programmingDetail?: ProgrammingDetail | null;
}
export type ProfileDetailPartNumberViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "with-all";
export type ProfileDetailPartNumberView<
  V extends ProfileDetailPartNumberViewName
> = V extends "_base"
  ? Pick<
      ProfileDetailPartNumber,
      | "id"
      | "type"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "deletedBy"
      | "deletedDate"
    >
  : V extends "_local"
  ? Pick<
      ProfileDetailPartNumber,
      | "id"
      | "type"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "deletedBy"
      | "deletedDate"
    >
  : V extends "with-all"
  ? Pick<
      ProfileDetailPartNumber,
      | "id"
      | "type"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "deletedBy"
      | "deletedDate"
      | "partNumber"
    >
  : never;
