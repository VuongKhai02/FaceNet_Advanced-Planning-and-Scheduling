export class CatalogStageMapping {
  static NAME = "CatalogStageMapping";
  id?: string;
  productCatalogCode?: string | null;
  productCatalogProductCatalogCode?: string | null;
  productStageCode?: string | null;
  stageCodeStageCode?: string | null;
  stageErrorMapping?: number | null;
  status?: number | null;
}
export type CatalogStageMappingViewName = "_base" | "_instance_name" | "_local";
export type CatalogStageMappingView<
  V extends CatalogStageMappingViewName
> = V extends "_base"
  ? Pick<
      CatalogStageMapping,
      | "id"
      | "productCatalogCode"
      | "productCatalogProductCatalogCode"
      | "productStageCode"
      | "stageCodeStageCode"
      | "stageErrorMapping"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      CatalogStageMapping,
      | "id"
      | "productCatalogCode"
      | "productCatalogProductCatalogCode"
      | "productStageCode"
      | "stageCodeStageCode"
      | "stageErrorMapping"
      | "status"
    >
  : never;
