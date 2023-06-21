export class InventoryMaterialTrace {
  static NAME = "InventoryMaterialTrace";
  id?: string;
  inventorymaterialtraceCreateddate?: any | null;
  inventorymaterialtraceKey?: string | null;
}
export type InventoryMaterialTraceViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type InventoryMaterialTraceView<
  V extends InventoryMaterialTraceViewName
> = V extends "_base"
  ? Pick<
      InventoryMaterialTrace,
      "id" | "inventorymaterialtraceCreateddate" | "inventorymaterialtraceKey"
    >
  : V extends "_local"
  ? Pick<
      InventoryMaterialTrace,
      "id" | "inventorymaterialtraceCreateddate" | "inventorymaterialtraceKey"
    >
  : never;
