import { DnlnvlDetail } from "./DnlnvlDetail";
import { PartNumber } from "./PartNumber";

export class DnlnvlDetailDetail {
    static NAME = "DnlnvlDetailDetail";
    id?: string;
    dnlnvlDetail?: DnlnvlDetail | null;
    locationType?: string | null;
    material?: any | null;
    materialName?: string | null;
    materialState?: string | null;
    partNumber?: PartNumber | null;
    partNumberCode?: string | null;
    reserveQty?: any | null;
    status?: number | null;
    stillNeed?: any | null;
    createdAt?: any | null;
    createdBy?: string | null;
    updatedAt?: any | null;
    updatedBy?: string | null;
    deletedBy?: string | null;
    deletedAt?: any | null;
    isBelongToDnlnvlDetail?: number | null;
    warehouseStatus?: number | null;
    scanCheck?: number | null;
    userData4?: string | null;
    lot?: string | null;
    isSent?: boolean | null;
    isSentMES?: boolean | null;
}

export type DnlnvlDetailDetailViewName = "_base" | "_instance_name" | "_local" | "with-part" | "with-dnlnvlDetail";
export type DnlnvlDetailDetailView<V extends DnlnvlDetailDetailViewName> = V extends "_base"
    ? Pick<
          DnlnvlDetailDetail,
          | "id"
          | "locationType"
          | "material"
          | "materialName"
          | "materialState"
          | "partNumberCode"
          | "reserveQty"
          | "status"
          | "stillNeed"
          | "createdAt"
          | "createdBy"
          | "updatedAt"
          | "updatedBy"
          | "deletedBy"
          | "deletedAt"
          | "isBelongToDnlnvlDetail"
          | "warehouseStatus"
          | "scanCheck"
          | "userData4"
          | "isSent"
          | "isSentMES"
      >
    : V extends "_local"
    ? Pick<
          DnlnvlDetailDetail,
          | "id"
          | "locationType"
          | "material"
          | "materialName"
          | "materialState"
          | "partNumberCode"
          | "reserveQty"
          | "status"
          | "stillNeed"
          | "createdAt"
          | "createdBy"
          | "updatedAt"
          | "updatedBy"
          | "deletedBy"
          | "deletedAt"
          | "isBelongToDnlnvlDetail"
          | "warehouseStatus"
          | "scanCheck"
          | "isSent"
          | "isSentMES"
      >
    : V extends "with-dnlnvlDetail"
    ? Pick<
          DnlnvlDetailDetail,
          | "id"
          | "locationType"
          | "material"
          | "materialName"
          | "materialState"
          | "partNumberCode"
          | "reserveQty"
          | "status"
          | "stillNeed"
          | "createdAt"
          | "createdBy"
          | "updatedAt"
          | "updatedBy"
          | "deletedBy"
          | "deletedAt"
          | "isBelongToDnlnvlDetail"
          | "warehouseStatus"
          | "scanCheck"
          | "isSent"
          | "isSentMES"
      >
    : V extends "with-part"
    ? Pick<
          DnlnvlDetailDetail,
          | "id"
          | "locationType"
          | "material"
          | "materialName"
          | "materialState"
          | "partNumberCode"
          | "reserveQty"
          | "status"
          | "stillNeed"
          | "createdAt"
          | "createdBy"
          | "updatedAt"
          | "updatedBy"
          | "deletedBy"
          | "deletedAt"
          | "isBelongToDnlnvlDetail"
          | "warehouseStatus"
          | "scanCheck"
          | "userData4"
          | "partNumber"
          | "lot"
          | "isSent"
          | "isSentMES"
      >
    : never;
