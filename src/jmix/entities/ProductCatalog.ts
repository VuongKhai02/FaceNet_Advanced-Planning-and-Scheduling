export class ProductCatalog {
  static NAME = "ProductCatalog";
  id?: string;
  createTime?: any | null;
  productCatalogName?: string | null;
  status?: number | null;
}
export type ProductCatalogViewName = "_base" | "_instance_name" | "_local";
export type ProductCatalogView<
  V extends ProductCatalogViewName
> = V extends "_base"
  ? Pick<ProductCatalog, "id" | "createTime" | "productCatalogName" | "status">
  : V extends "_local"
  ? Pick<ProductCatalog, "id" | "createTime" | "productCatalogName" | "status">
  : never;
