export class OccupyingMaterial {
    static NAME = "OccupyingMaterial";
    id?: string;
    createdAt?: any | null;
    createdBy?: string | null;
    deletedAt?: any | null;
    deletedBy?: string | null;
    dnlnvl?: number | null;
    material?: any | null;
    updatedAt?: any | null;
    updatedBy?: string | null;
}

export type OccupyingMaterialViewName = "_base" | "_instance_name" | "_local";
export type OccupyingMaterialView<V extends OccupyingMaterialViewName> = V extends "_base"
    ? Pick<
          OccupyingMaterial,
          "id" | "createdAt" | "createdBy" | "deletedAt" | "deletedBy" | "dnlnvl" | "material" | "updatedAt" | "updatedBy"
      >
    : V extends "_local"
    ? Pick<
          OccupyingMaterial,
          "id" | "createdAt" | "createdBy" | "deletedAt" | "deletedBy" | "dnlnvl" | "material" | "updatedAt" | "updatedBy"
      >
    : never;
