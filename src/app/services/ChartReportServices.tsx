import React from "react";
import { collection, instance } from "@haulmont/jmix-react-core";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";

const PO_QUANTITY_URL = "/services/api/chart/quantity-po";
const PO_GROUP_BY_BRANCH_URL = "/services/api/chart/quantity-po/group-by-branch";
const PO_GROUP_BY_GROUP_URL = "/services/api/chart/quantity-po/group-by-group-code";
const PO_GROUP_BY_PRODUCT_URL = "/services/api/chart/quantity-po/group-by-product";
const PO_GROUP_BY_REASON_URL = "/services/api/chart/quantity-po/group-by-reason";
const PO_ITEM_QUANTITY_REPORT_URL = "/services/api/chart/report-po-item";
const PO_GROUP_BY_STATUS_URL = "/services/api/chart/quantity-po/group-by-status";
const PO_GROUP_BY_STATUS_DASHBOARD = "/services/api/chart/dashboard/quantity-po/group-by-status";
const PO_GROUP_BY_REASON_DASHBOARD = "/services/api/chart/dashboard/quantity-po/group-by-reason";
const PO_GROUP_BY_BRANCH_DASHBOARD = "/services/api/chart/dashboard/quantity-po/group-by-branch";
const PO_GROUP_BY_BRANCH_TP_BTP_DASHBOARD = "/services/api/chart/dashboard/quantity-po/group-by-branch-tp-btp";
const GET_ALL_BRANCH = "/services/api/chart/dashboard/branch";
const PO_GROUP_BY_TP = "/services/api/chart/dashboard/quantity-po/group-by-tp";
const PO_GROUP_BY_PO_ID = "/services/api/chart/dashboard/quantity-po/group-by-po";
const getPoDetailData = (token) => {
    // console.log("getPoDetailData ")
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_QUANTITY_URL}`, data, { headers });
};

const getPoDetailDataGroupByBranch = (token) => {
    // console.log("getPoDetailDataGroupByBranch ")
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_URL}`, data, { headers });
};

const getPoDetailDataGroupByGroupCode = (token) => {
    // console.log("getPoDetailDataGroupByGroupCode ")
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_GROUP_URL}`, data, { headers });
};

const getPoDetailDataGroupByProduct = (token) => {
    // console.log("getPoDetailDataGroupByProduct ")
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_PRODUCT_URL}`, data, { headers });
};

const getPoDetailDataGroupByReason = (token) => {
    // console.log("getPoDetailDataGroupByReason ")
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    console.log(data);
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_REASON_URL}`, data, { headers });
};

const getPOItemEditedReport = (token) => {
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };
    return axios.post(`${PLANNING_API_URL}${PO_ITEM_QUANTITY_REPORT_URL}`, data, { headers });
};

function getPoDetailDataGroupByStatus(token) {
    // console.log("getPoDetailDataGroupByStatus ")
    let sessionStorage = window.sessionStorage.getItem("storage");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    console.log(data);
    const headers = {
        Authorization: "Bearer " + token,
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_STATUS_URL}`, data, { headers });
}
function getPoGroupByStatusDashboard(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_STATUS_DASHBOARD}`, data, { headers });
}

function getPoGroupByReasonDashboard(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_REASON_DASHBOARD}`, data, { headers });
}
function getPoGroupByBranchDashboard(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_DASHBOARD}`, data, { headers });
}

function getAllBranch(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.get(`${PLANNING_API_URL}${GET_ALL_BRANCH}`, { headers });
}

function getPoGroupByBranchTPBTPDashboard(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_TP_BTP_DASHBOARD}`, data, { headers });
}

function getPoGroupByTp(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_TP}`, data, { headers });
}

function getPoGroupByPoId(token, data) {
    // console.log("getPoDetailDataGroupByStatus ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_PO_ID}`, data, { headers });
}

const ChartReportServices = {
    getPoDetailData,
    getPoDetailDataGroupByBranch,
    getPoDetailDataGroupByGroupCode,
    getPoDetailDataGroupByProduct,
    getPoDetailDataGroupByReason,
    getPoDetailDataGroupByStatus,
    getPOItemEditedReport,
    getPoGroupByStatusDashboard,
    getPoGroupByReasonDashboard,
    getPoGroupByBranchDashboard,
    getAllBranch,
    getPoGroupByBranchTPBTPDashboard,
    getPoGroupByTp,
    getPoGroupByPoId,
};

export default ChartReportServices;
