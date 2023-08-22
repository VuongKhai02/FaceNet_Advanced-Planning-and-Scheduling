import React from "react";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";
import { collection, instance } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { ProductOrderItem } from "../../jmix/entities/ProductOrderItem";
import { CommitMode } from "@haulmont/jmix-rest";

const GET_SAP_WO = "/services/api/work-order/getSapWO?productCode=";

const workOrderCollection = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
    view: "_base",
    sort: "-createTime",
    loadImmediately: false,
});

const workOrderDataInstance = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
    view: "_base",
    loadImmediately: false,
});

const updateQuantityWoByPOAndProduct = (poId, productCode, quantity) => {
    // console.log("poid = " + poId + " productCode " + productCode + " quantity " + quantity)
    workOrderCollection.filter = {
        conditions: [
            { property: "productOrder", operator: "=", value: poId },
            { property: "productCode", operator: "=", value: productCode },
            { property: "workOrderType", operator: "=", value: "WO" },
        ],
    };
    workOrderCollection.load().then((res) => {
        if (workOrderCollection.items && workOrderCollection.items.length > 0) {
            let workOrder = workOrderCollection.items.pop();
            if (workOrder) {
                // console.log(workOrder)
                workOrder.quantityPlan = quantity;
                workOrderDataInstance.setItem(workOrder);
                workOrderDataInstance.commit("edit");
            } else {
                console.log("workorder null");
            }
        } else {
            console.log("workorder not found");
        }
    });
};

const getSapWO = (productCode) => {
    let storage = window.localStorage;
    const token = storage.getItem("_jmixRestAccessToken");

    let headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.get(GET_SAP_WO + productCode, { headers });
};

const WorkOrderService = { updateQuantityWoByPOAndProduct, getSapWO };
export default WorkOrderService;
