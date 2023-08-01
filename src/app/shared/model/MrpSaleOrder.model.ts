
export interface IMrpOrder {
  saleOrderId?: number,
  productionCode?: string,
  customer?: string,
  cardName?: string,
  contractNumber?: string,
  startTime?: string,
  sender?: string,
  quantity?: number,
  totalQuantity?: number,
  finishTime?: string,
  deliveryDate?: string
}
export const defaultValue: Readonly<IMrpOrder> = {};