import { InventoryMaterialTrace } from "./InventoryMaterialTrace";
export class Inventory {
  static NAME = "Inventory";
  id?: string;
  inventoryAvailablequantity?: any | null;
  inventoryBulkBarcode?: string | null;
  inventoryCalculatedstatus?: string | null;
  inventoryCarrierid?: number | null;
  inventoryCarriernumber?: string | null;
  inventoryCheckindate?: any | null;
  inventoryConsumedquantity?: any | null;
  inventoryExpirationdate?: any | null;
  inventoryInitialquantity?: any | null;
  inventoryIsBulk?: boolean | null;
  inventoryLabelingstatus?: number | null;
  inventoryLastlocationid?: number | null;
  inventoryLifetimecount?: number | null;
  inventoryLocationid?: number | null;
  inventoryManufacturingdate?: any | null;
  inventoryMaterialcontrol?: number | null;
  inventoryMaterialidentifier?: string | null;
  inventoryMaterialtraceid?: InventoryMaterialTrace | null;
  inventoryMaterialtype?: number | null;
  inventoryParentinventory?: any | null;
  inventoryParentlocationid?: number | null;
  inventoryParentmaterialidentifier?: string | null;
  inventoryPartalternatenumbers?: number | null;
  inventoryPartclass?: string | null;
  inventoryPartid?: number | null;
  inventoryPartnumber?: string | null;
  inventoryPrinter?: string | null;
  inventoryPuLocation?: string | null;
  inventoryQuantity?: any | null;
  inventoryReceiveddate?: any | null;
  inventoryReservationreference?: string | null;
  inventoryReservedquantity?: any | null;
  inventoryScrappedquantity?: any | null;
  inventorySplicedinventoryid?: any | null;
  inventorySplicedmaterialidentifier?: string | null;
  inventoryStatus?: number | null;
  inventoryTrackingtype?: number | null;
  inventoryUomid?: number | null;
  inventoryUomname?: string | null;
  inventoryUpdatedby?: string | null;
  inventoryUpdateddate?: any | null;
  inventoryUsagecount?: number | null;
  inventroyMaterialname?: string | null;
}
export type InventoryViewName = "_base" | "_instance_name" | "_local";
export type InventoryView<V extends InventoryViewName> = V extends "_base"
  ? Pick<
      Inventory,
      | "id"
      | "inventoryAvailablequantity"
      | "inventoryBulkBarcode"
      | "inventoryCalculatedstatus"
      | "inventoryCarrierid"
      | "inventoryCarriernumber"
      | "inventoryCheckindate"
      | "inventoryConsumedquantity"
      | "inventoryExpirationdate"
      | "inventoryInitialquantity"
      | "inventoryIsBulk"
      | "inventoryLabelingstatus"
      | "inventoryLastlocationid"
      | "inventoryLifetimecount"
      | "inventoryLocationid"
      | "inventoryManufacturingdate"
      | "inventoryMaterialcontrol"
      | "inventoryMaterialidentifier"
      | "inventoryMaterialtype"
      | "inventoryParentinventory"
      | "inventoryParentlocationid"
      | "inventoryParentmaterialidentifier"
      | "inventoryPartalternatenumbers"
      | "inventoryPartclass"
      | "inventoryPartid"
      | "inventoryPartnumber"
      | "inventoryPrinter"
      | "inventoryPuLocation"
      | "inventoryQuantity"
      | "inventoryReceiveddate"
      | "inventoryReservationreference"
      | "inventoryReservedquantity"
      | "inventoryScrappedquantity"
      | "inventorySplicedinventoryid"
      | "inventorySplicedmaterialidentifier"
      | "inventoryStatus"
      | "inventoryTrackingtype"
      | "inventoryUomid"
      | "inventoryUomname"
      | "inventoryUpdatedby"
      | "inventoryUpdateddate"
      | "inventoryUsagecount"
      | "inventroyMaterialname"
    >
  : V extends "_local"
  ? Pick<
      Inventory,
      | "id"
      | "inventoryAvailablequantity"
      | "inventoryBulkBarcode"
      | "inventoryCalculatedstatus"
      | "inventoryCarrierid"
      | "inventoryCarriernumber"
      | "inventoryCheckindate"
      | "inventoryConsumedquantity"
      | "inventoryExpirationdate"
      | "inventoryInitialquantity"
      | "inventoryIsBulk"
      | "inventoryLabelingstatus"
      | "inventoryLastlocationid"
      | "inventoryLifetimecount"
      | "inventoryLocationid"
      | "inventoryManufacturingdate"
      | "inventoryMaterialcontrol"
      | "inventoryMaterialidentifier"
      | "inventoryMaterialtype"
      | "inventoryParentinventory"
      | "inventoryParentlocationid"
      | "inventoryParentmaterialidentifier"
      | "inventoryPartalternatenumbers"
      | "inventoryPartclass"
      | "inventoryPartid"
      | "inventoryPartnumber"
      | "inventoryPrinter"
      | "inventoryPuLocation"
      | "inventoryQuantity"
      | "inventoryReceiveddate"
      | "inventoryReservationreference"
      | "inventoryReservedquantity"
      | "inventoryScrappedquantity"
      | "inventorySplicedinventoryid"
      | "inventorySplicedmaterialidentifier"
      | "inventoryStatus"
      | "inventoryTrackingtype"
      | "inventoryUomid"
      | "inventoryUomname"
      | "inventoryUpdatedby"
      | "inventoryUpdateddate"
      | "inventoryUsagecount"
      | "inventroyMaterialname"
    >
  : never;
