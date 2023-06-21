import React from 'react';
import axios from 'axios';
import { PLANNING_API_URL } from "../../config";
import { collection, instance } from "@haulmont/jmix-react-core";
import { ProductOrderItem } from "../../jmix/entities/ProductOrderItem";

const productOrderDataInstance = instance<ProductOrderItem>(ProductOrderItem.NAME, {
  view: '_base',
  loadImmediately: false
});
const productOrderItemDs = collection<ProductOrderItem>(ProductOrderItem.NAME, {
  view: '_base', sort: 'productOrder',
  loadImmediately: false
});

const updateQuantityByProductCodeAndPo = (poId, productCode, quantity) => {
  productOrderItemDs.filter = {
    conditions: [
      { property: 'productOrder', operator: "=", value: poId },
      { property: 'productCode', operator: "=", value: productCode },
    ]
  }
  productOrderItemDs.load().then(res => {
    if (productOrderItemDs.items && productOrderItemDs.items.length > 0) {
      let orderItem = productOrderItemDs.items.pop();
      if (orderItem) {
        orderItem.quantity = quantity;
        productOrderDataInstance.setItem(orderItem)
        productOrderDataInstance.commit('edit')
      } else {
        console.log("orderItem null")
      }
    } else {
      console.log("orderItem not found")
    }
  })
}

const ProductOrderItemService = { updateQuantityByProductCodeAndPo }
export default ProductOrderItemService