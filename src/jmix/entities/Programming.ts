import { ProgrammingDetail } from "./ProgrammingDetail";
import { Profile } from "./Profile";
import { Line } from "./Line";
export class Programming {
  static NAME = "Programming";
  id?: string;
  programmingDetails?: ProgrammingDetail[] | null;
  profiles?: Profile[] | null;
  createdAt?: any | null;
  line?: Line | null;
  lineName?: string | null;
  programingCode?: string | null;
  name?: string | null;
  note?: string | null;
  updatedAt?: any | null;
}
export type ProgrammingViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "with-detail"
  | "with-dnlnvlDetail"
  | "with-dnlnvlDetail-2";
export type ProgrammingView<V extends ProgrammingViewName> = V extends "_base"
  ? Pick<
      Programming,
      | "id"
      | "name"
      | "createdAt"
      | "lineName"
      | "programingCode"
      | "note"
      | "updatedAt"
    >
  : V extends "_instance_name"
  ? Pick<Programming, "id" | "name">
  : V extends "_local"
  ? Pick<
      Programming,
      | "id"
      | "createdAt"
      | "lineName"
      | "programingCode"
      | "name"
      | "note"
      | "updatedAt"
    >
  : V extends "with-detail"
  ? Pick<
      Programming,
      | "id"
      | "name"
      | "createdAt"
      | "lineName"
      | "programingCode"
      | "note"
      | "updatedAt"
      | "line"
      | "programmingDetails"
    >
  : V extends "with-dnlnvlDetail"
  ? Pick<Programming, "id" | "programmingDetails">
  : V extends "with-dnlnvlDetail-2"
  ? Pick<
      Programming,
      | "id"
      | "name"
      | "createdAt"
      | "lineName"
      | "programingCode"
      | "note"
      | "updatedAt"
      | "profiles"
    >
  : never;
