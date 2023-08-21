export class PlanningProductionOrder {
    static NAME = "PlanningProductionOrder";
    id?: string;
    productOrderId?: string | null;
    completeDate?: any | null;
    createdDate?: any | null;
    expectedCompleteDate?: any | null;
    lastModifiedDate?: any | null;
    note?: string | null;
    orderDate?: any | null;
    productOrderType?: string | null;
    orderItem?: string | null;
    status?: string | null;
    priority?: string | null;
    quantityOut?: number | null;
    requestedStartDate?: any | null;
    state?: string | null;
    customerName?: string | null;
    customerCode?: string | null;
    externalPoId?: string | null;
    scadaQuantityOut?: number | null;
    reasonId?: number | null;
    scadaQuantityOut1?: number | null;
    createdAt?: any | null;
    createdBy?: string | null;
}

export type PlanningProductionOrderViewName = "_base" | "_instance_name" | "_local";
export type PlanningProductionOrderView<V extends PlanningProductionOrderViewName> = V extends "_base"
    ? Pick<
          PlanningProductionOrder,
          | "id"
          | "productOrderId"
          | "completeDate"
          | "createdDate"
          | "expectedCompleteDate"
          | "lastModifiedDate"
          | "note"
          | "orderDate"
          | "productOrderType"
          | "orderItem"
          | "status"
          | "priority"
          | "quantityOut"
          | "requestedStartDate"
          | "state"
          | "customerName"
          | "customerCode"
          | "externalPoId"
          | "scadaQuantityOut"
          | "reasonId"
      >
    : V extends "_local"
    ? Pick<
          PlanningProductionOrder,
          | "id"
          | "productOrderId"
          | "completeDate"
          | "createdDate"
          | "expectedCompleteDate"
          | "lastModifiedDate"
          | "note"
          | "orderDate"
          | "productOrderType"
          | "orderItem"
          | "status"
          | "priority"
          | "quantityOut"
          | "requestedStartDate"
          | "state"
          | "customerName"
          | "customerCode"
          | "externalPoId"
          | "scadaQuantityOut"
          | "reasonId"
      >
    : never;
