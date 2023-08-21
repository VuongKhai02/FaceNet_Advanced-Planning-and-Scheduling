import { ReturnMaterial } from "./ReturnMaterial";

export class ReturnMaterialDetail {
    static NAME = "ReturnMaterialDetail";
    id?: string;
    quantity?: number | null;
    msl?: string | null;
    userData4?: string | null;
    userData3?: string | null;
    userData2?: string | null;
    userData1?: string | null;
    lot?: string | null;
    storageUnit?: string | null;
    materialName?: string | null;
    mfgDate?: any | null;
    poCode?: string | null;
    partNumber?: string | null;
    expirationDate?: any | null;
    vendor?: string | null;
    excessQuantity?: number | null;
    sapCode: number | null;
    returnMaterial?: ReturnMaterial | null;
}

export type ReturnMaterialDetailViewName = "_base" | "_instance_name" | "_local";
export type ReturnMaterialDetailView<V extends ReturnMaterialDetailViewName> = V extends "_base"
    ? Pick<
          ReturnMaterialDetail,
          | "id"
          | "quantity"
          | "msl"
          | "userData4"
          | "userData3"
          | "userData2"
          | "userData1"
          | "lot"
          | "storageUnit"
          | "materialName"
          | "mfgDate"
          | "poCode"
          | "partNumber"
          | "expirationDate"
          | "vendor"
          | "excessQuantity"
          | "returnMaterial"
          | "sapCode"
      >
    : V extends "_instance_name"
    ? Pick<
          ReturnMaterialDetail,
          | "id"
          | "quantity"
          | "msl"
          | "userData4"
          | "userData3"
          | "userData2"
          | "userData1"
          | "lot"
          | "storageUnit"
          | "materialName"
          | "mfgDate"
          | "poCode"
          | "partNumber"
          | "expirationDate"
          | "vendor"
          | "excessQuantity"
          | "sapCode"
      >
    : V extends "_local"
    ? Pick<
          ReturnMaterialDetail,
          | "id"
          | "quantity"
          | "msl"
          | "userData4"
          | "userData3"
          | "userData2"
          | "userData1"
          | "lot"
          | "storageUnit"
          | "materialName"
          | "mfgDate"
          | "poCode"
          | "partNumber"
          | "expirationDate"
          | "vendor"
          | "excessQuantity"
          | "sapCode"
      >
    : never;
