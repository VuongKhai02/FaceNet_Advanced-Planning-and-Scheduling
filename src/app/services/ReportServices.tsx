import axios from "axios";
import { PLANNING_API_URL } from "../../config";

const LOAD_PRODUCT_ITEMS = PLANNING_API_URL + "/services/api/report/product-order-detail";
const LOAD_WORKORDER_DETAIL = PLANNING_API_URL + "/services/api/report/work-order-detail";
const LOAD_ATTRITION = PLANNING_API_URL + "/services/api/dnlnvl/report-detail-material";
const LOAD_ATTRITION_WO = PLANNING_API_URL + "/services/api/dnlnvl/report-material";

const loadProductOrderItem = async () => {
    let storage = window.localStorage;
    const token = storage.getItem("_jmixRestAccessToken");
    let headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.get(LOAD_PRODUCT_ITEMS, { headers });
};

const loadWorkOrderDetail = async () => {
    let storage = window.localStorage;
    const token = storage.getItem("_jmixRestAccessToken");
    let headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.get(LOAD_WORKORDER_DETAIL, { headers });
};

const loadAttrition = async () => {
    let storage = window.localStorage;
    const token = storage.getItem("_jmixRestAccessToken");
    let headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.get(LOAD_ATTRITION, { headers });
};

const loadAttritionWO = async () => {
    let storage = window.localStorage;
    const token = storage.getItem("_jmixRestAccessToken");
    let headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.get(LOAD_ATTRITION_WO, { headers });
};

const ReportServices = { loadProductOrderItem, loadWorkOrderDetail, loadAttrition, loadAttritionWO };
export default ReportServices;
