import { QrFeeder } from "./QrFeeder";
import { Lane } from "./Lane";
import { Machine } from "./Machine";
import { PartNumber } from "./PartNumber";
import { Programming } from "./Programming";
import { DnlnvlDetail } from "./DnlnvlDetail";
import { Profile } from "./Profile";
import { ProfileDetail } from "./ProfileDetail";
import { ProfileDetailPartNumber } from "./ProfileDetailPartNumber";

export class ProgrammingDetail {
    static NAME = "ProgrammingDetail";
    id?: string;
    createdAt?: any | null;
    designator?: string | null;
    qrFeeder?: QrFeeder | null;
    locationX?: any | null;
    locationY?: any | null;
    locationZ?: any | null;
    locationFrontRear?: string | null;
    locationLeftRight?: string | null;
    lane?: Lane | null;
    machine?: Machine | null;
    note?: string | null;
    partNumber?: PartNumber | null;
    programming?: Programming | null;
    dnlnvllList?: DnlnvlDetail[] | null;
    rotation?: any | null;
    side?: string | null;
    slot?: string | null;
    subslot?: string | null;
    partten?: string | null;
    profile?: Profile | null;
    profileDetail?: ProfileDetail | null;
    updatedAt?: any | null;
    profileDetailPartNumbers?: ProfileDetailPartNumber[] | null;
}

export type ProgrammingDetailViewName =
    | "_base"
    | "_instance_name"
    | "_local"
    | "with-all"
    | "with-dnlnvlDetail"
    | "with-dnlnvlDetail-2"
    | "with-qr-feeder";
export type ProgrammingDetailView<V extends ProgrammingDetailViewName> = V extends "_base"
    ? Pick<
          ProgrammingDetail,
          | "id"
          | "createdAt"
          | "designator"
          | "locationX"
          | "locationY"
          | "locationZ"
          | "locationFrontRear"
          | "locationLeftRight"
          | "note"
          | "rotation"
          | "side"
          | "slot"
          | "subslot"
          | "partten"
          | "updatedAt"
      >
    : V extends "_local"
    ? Pick<
          ProgrammingDetail,
          | "id"
          | "createdAt"
          | "designator"
          | "locationX"
          | "locationY"
          | "locationZ"
          | "locationFrontRear"
          | "locationLeftRight"
          | "note"
          | "rotation"
          | "side"
          | "slot"
          | "subslot"
          | "partten"
          | "updatedAt"
      >
    : V extends "with-all"
    ? Pick<
          ProgrammingDetail,
          | "id"
          | "createdAt"
          | "designator"
          | "locationX"
          | "locationY"
          | "locationZ"
          | "locationFrontRear"
          | "locationLeftRight"
          | "note"
          | "rotation"
          | "side"
          | "slot"
          | "subslot"
          | "partten"
          | "updatedAt"
          | "profileDetailPartNumbers"
          | "qrFeeder"
          | "programming"
          | "partNumber"
          | "machine"
          | "lane"
      >
    : V extends "with-dnlnvlDetail"
    ? Pick<
          ProgrammingDetail,
          | "id"
          | "createdAt"
          | "designator"
          | "locationX"
          | "locationY"
          | "locationZ"
          | "locationFrontRear"
          | "locationLeftRight"
          | "note"
          | "rotation"
          | "side"
          | "slot"
          | "subslot"
          | "partten"
          | "updatedAt"
          | "dnlnvllList"
      >
    : V extends "with-dnlnvlDetail-2"
    ? Pick<
          ProgrammingDetail,
          | "id"
          | "createdAt"
          | "designator"
          | "locationX"
          | "locationY"
          | "locationZ"
          | "locationFrontRear"
          | "locationLeftRight"
          | "note"
          | "rotation"
          | "side"
          | "slot"
          | "subslot"
          | "partten"
          | "updatedAt"
          | "programming"
      >
    : V extends "with-qr-feeder"
    ? Pick<
          ProgrammingDetail,
          | "id"
          | "createdAt"
          | "designator"
          | "locationX"
          | "locationY"
          | "locationZ"
          | "locationFrontRear"
          | "locationLeftRight"
          | "note"
          | "rotation"
          | "side"
          | "slot"
          | "subslot"
          | "partten"
          | "updatedAt"
          | "qrFeeder"
          | "partNumber"
          | "programming"
      >
    : never;
