import {Dnlnvl} from "./Dnlnvl";
import {Lane} from "./Lane";
import {Machine} from "./Machine";
import {PartNumber} from "./PartNumber";
import {ProgrammingDetail} from "./ProgrammingDetail";
import {DnlnvlDetailDetail} from "./DnlnvlDetailDetail";

export class DnlnvlDetail {
  static NAME = "DnlnvlDetail";
  id?: string;
  bufferQty?: any | null;
  dnlnvl?: Dnlnvl | null;
  estReqdQty?: any | null;
  estTotalQty?: any | null;
  lane?: Lane | null;
  machine?: Machine | null;
  laneName?: string | null;
  partNumber?: PartNumber | null;
  partNumberCode?: string | null;
  programmingDetail?: ProgrammingDetail | null;
  locationFrontRear?: string | null;
  locationLeftRight?: string | null;
  slot?: string | null;
  stillNeed?: any | null;
  createdAt?: any | null;
  createdBy?: string | null;
  updatedAt?: any | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  deletedAt?: any | null;
  dnlnvlDetailDetailList?: DnlnvlDetailDetail[] | null;
}

export type DnlnvlDetailViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "with-dnlnvlDetail"
  | "report-equipment"
export type DnlnvlDetailView<V extends DnlnvlDetailViewName> = V extends "_base"
  ? Pick<DnlnvlDetail,
    | "id"
    | "bufferQty"
    | "estReqdQty"
    | "estTotalQty"
    | "laneName"
    | "partNumberCode"
    | "slot"
    | "locationFrontRear"
    | "locationLeftRight"
    | "stillNeed"
    | "createdAt"
    | "createdBy"
    | "updatedAt"
    | "updatedBy"
    | "deletedBy"
    | "deletedAt">
  : V extends "_local"
    ? Pick<DnlnvlDetail,
      | "id"
      | "bufferQty"
      | "estReqdQty"
      | "estTotalQty"
      | "laneName"
      | "partNumberCode"
      | "slot"
      | "locationFrontRear"
      | "locationLeftRight"
      | "stillNeed"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt">
    : V extends "with-dnlnvlDetail"
      ? Pick<DnlnvlDetail,
        | "id"
        | "bufferQty"
        | "estReqdQty"
        | "estTotalQty"
        | "laneName"
        | "partNumberCode"
        | "slot"
        | "locationFrontRear"
        | "locationLeftRight"
        | "stillNeed"
        | "createdAt"
        | "createdBy"
        | "updatedAt"
        | "updatedBy"
        | "deletedBy"
        | "deletedAt"
        | "dnlnvlDetailDetailList">
: V extends "report-equipment"?
Pick<DnlnvlDetail, 
  | "id"
    | "bufferQty"
    | "estReqdQty"
    | "estTotalQty"
    | "laneName"
    | "partNumberCode"
    | "slot"
    | "locationFrontRear"
    | "locationLeftRight"
    | "stillNeed"
    | "createdAt"
    | "createdBy"
    | "updatedAt"
    | "updatedBy"
    | "deletedBy"
  | "deletedAt"
  | "machine"
  | "partNumber"
  | "programmingDetail"
    >
      : never;
