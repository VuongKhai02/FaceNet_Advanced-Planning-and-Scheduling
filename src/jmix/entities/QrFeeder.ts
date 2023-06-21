import { Feeder } from "./Feeder";
export class QrFeeder {
  static NAME = "QrFeeder";
  id?: string;
  qrFeederCode?: string | null;
  name?: string | null;
  feeder?: Feeder | null;
  note?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
}
export type QrFeederViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "with-all"
  | "with-feeder";
export type QrFeederView<V extends QrFeederViewName> = V extends "_base"
  ? Pick<QrFeeder, "id" | "qrFeederCode" | "name" | "note" | "createdAt" | "updatedAt">
  : V extends "_instance_name"
  ? Pick<QrFeeder, "id" | "qrFeederCode">
  : V extends "_local"
  ? Pick<QrFeeder, "id" | "qrFeederCode" | "name" | "note" | "createdAt" | "updatedAt">
  : V extends "with-all"
  ? Pick<
      QrFeeder,
      "id" | "qrFeederCode" | "name" | "note" | "createdAt" | "feeder" | "updatedAt"
    >
  : V extends "with-feeder"
  ? Pick<
      QrFeeder,
      "id" | "qrFeederCode" | "name" | "note" | "createdAt" | "feeder" | "updatedAt"
    >
  : never;
