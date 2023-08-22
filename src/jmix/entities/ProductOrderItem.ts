export class ProductOrderItem {
    static NAME = "ProductOrderItem";
    id?: string;
    productCode?: string | null;
    productName?: string | null;
    productOrder?: string | null;
    bomVersion?: string | null;
    quantity?: number | null;
    quantityOut?: number | null;
    note?: string | null;
    coittId?: number | null;
    status?: string | null;
    itemIndex: number | null;
    scadaQuantityOut?: number | null;
    branchCode?: string | null;
    groupCode?: string | null;
    sapUrl?: string | null;
    sapUrl2?: string | null;
    reasonId?: number | null;
    scadaQuantityOut1?: number | null;
}

export type ProductOrderItemViewName = "_base" | "_instance_name" | "_local";
export type ProductOrderItemView<V extends ProductOrderItemViewName> = V extends "_base"
    ? Pick<
          ProductOrderItem,
          | "id"
          | "productCode"
          | "productName"
          | "productOrder"
          | "bomVersion"
          | "quantity"
          | "quantityOut"
          | "note"
          | "coittId"
          | "status"
          | "itemIndex"
          | "scadaQuantityOut"
          | "branchCode"
          | "groupCode"
          | "reasonId"
          | "sapUrl"
          | "sapUrl2"
      >
    : V extends "_local"
    ? Pick<
          ProductOrderItem,
          | "id"
          | "productCode"
          | "productName"
          | "productOrder"
          | "bomVersion"
          | "quantity"
          | "quantityOut"
          | "note"
          | "coittId"
          | "status"
          | "itemIndex"
          | "scadaQuantityOut"
          | "branchCode"
          | "groupCode"
          | "reasonId"
          | "sapUrl"
          | "sapUrl2"
      >
    : never;
