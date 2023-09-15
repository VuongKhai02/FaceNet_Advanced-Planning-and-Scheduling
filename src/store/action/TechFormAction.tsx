import actionTypes from "./actionTypes";

export const updateProductSpec = (productionCode) => ({
    type: actionTypes.UPDATE_PRODUCT_SPEC,
    productionCode: productionCode
})