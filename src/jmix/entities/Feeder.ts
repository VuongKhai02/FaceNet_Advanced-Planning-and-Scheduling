import { FeederGroup } from "./FeederGroup";
export class Feeder {
  static NAME = "Feeder";
  id?: string;
  createdAt?: any | null;
  entryDate?: any | null;
  feederCode?: string | null;
  feederGroup?: FeederGroup | null;
  maintainTime?: number | null;
  manufacturingCode?: string | null;
  manufacturingDate?: any | null;
  name?: string | null;
  ncc?: string | null;
  note?: string | null;
  numberSlot?: any | null;
  qrCode?: string | null;
  serial?: string | null;
  status?: boolean | null;
  updatedAt?: any | null;
}
export type FeederViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "feeder-with-feeder-groups";
export type FeederView<V extends FeederViewName> = V extends "_base"
  ? Pick<
      Feeder,
      | "id"
      | "name"
      | "createdAt"
      | "entryDate"
      | "feederCode"
      | "maintainTime"
      | "manufacturingCode"
      | "manufacturingDate"
      | "ncc"
      | "note"
      | "numberSlot"
      | "qrCode"
      | "serial"
      | "status"
      | "updatedAt"
    >
  : V extends "_instance_name"
  ? Pick<Feeder, "id" | "name">
  : V extends "_local"
  ? Pick<
      Feeder,
      | "id"
      | "createdAt"
      | "entryDate"
      | "feederCode"
      | "maintainTime"
      | "manufacturingCode"
      | "manufacturingDate"
      | "name"
      | "ncc"
      | "note"
      | "numberSlot"
      | "qrCode"
      | "serial"
      | "status"
      | "updatedAt"
    >
  : V extends "feeder-with-feeder-groups"
  ? Pick<
      Feeder,
      | "id"
      | "name"
      | "createdAt"
      | "entryDate"
      | "feederCode"
      | "maintainTime"
      | "manufacturingCode"
      | "manufacturingDate"
      | "ncc"
      | "note"
      | "numberSlot"
      | "qrCode"
      | "serial"
      | "status"
      | "updatedAt"
      | "feederGroup"
    >
  : never;
