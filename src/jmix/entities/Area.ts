export class Area {
  static NAME = "Area";
  id?: string;
  areaAddress?: string | null;
  areaAreatypename?: string | null;
  areaCreatedby?: string | null;
  areaCreateddate?: any | null;
  areaDescription?: string | null;
  areaImage?: string | null;
  areaName?: string | null;
  areaUniqueid?: any | null;
  resource?: number | null;
}
export type AreaViewName = "_base" | "_instance_name" | "_local";
export type AreaView<V extends AreaViewName> = V extends "_base"
  ? Pick<
      Area,
      | "id"
      | "areaAddress"
      | "areaAreatypename"
      | "areaCreatedby"
      | "areaCreateddate"
      | "areaDescription"
      | "areaImage"
      | "areaName"
      | "areaUniqueid"
      | "resource"
    >
  : V extends "_local"
  ? Pick<
      Area,
      | "id"
      | "areaAddress"
      | "areaAreatypename"
      | "areaCreatedby"
      | "areaCreateddate"
      | "areaDescription"
      | "areaImage"
      | "areaName"
      | "areaUniqueid"
      | "resource"
    >
  : never;
