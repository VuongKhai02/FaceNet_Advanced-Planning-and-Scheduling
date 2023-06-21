import {Dnlnvl} from "./Dnlnvl";

export class DnlnvlMaterialScanFail {
  static NAME = "DnlnvlMaterialScanFail";
  id?: number;
  dnlnvl?: Dnlnvl | null;
  partNumber?: string | null;
  userData2?: string | null;
  userData3?: string | null;
  vendor?: string | null;
  quantity?: number | null;
  PoCode?: string | null;
  msl?: string | null;
  expirationDate?: any | null;
  lot?: string | null;
  materialName?: string | null;
  userData4?: string | null;
  mfgDate?: any | null;
  storageUnit?: string | null;
  userData1?: string | null;
  sapCode?: number | null;
}
export type DnlnvlViewName =
  | "_base"
  | "_instance_name"
  | "_local"
export type DnlnvlView<V extends DnlnvlViewName> = V extends "_base"
  ? Pick<DnlnvlMaterialScanFail,
    "id"
    | "dnlnvl"
    | "partNumber"
    | "userData2"
    | "userData3"
    | "vendor"
    | "quantity"
    | "PoCode"
    | "msl"
    | "expirationDate"
    | "lot"
    | "materialName"
    | "userData4"
    | "mfgDate"
    | "storageUnit"
    | "userData1"
    | "sapCode"
    >
  : V extends "_instance_name"
    ? Pick<DnlnvlMaterialScanFail,
      "id"
      | "dnlnvl"
      | "partNumber"
      | "userData2"
      | "userData3"
      | "vendor"
      | "quantity"
      | "PoCode"
      | "msl"
      | "expirationDate"
      | "lot"
      | "materialName"
      | "userData4"
      | "mfgDate"
      | "storageUnit"
      | "userData1"
      | "sapCode"
      >
    : V extends "_local"
      ? Pick<DnlnvlMaterialScanFail,
        "id"
        | "dnlnvl"
        | "partNumber"
        | "userData2"
        | "userData3"
        | "vendor"
        | "quantity"
        | "PoCode"
        | "msl"
        | "expirationDate"
        | "lot"
        | "materialName"
        | "userData4"
        | "mfgDate"
        | "storageUnit"
        | "userData1"
        | "sapCode"
        >
      : never;