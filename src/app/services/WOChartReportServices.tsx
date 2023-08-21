import React from "react";
import { collection, instance } from "@haulmont/jmix-react-core";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";

const PO_QUANTITY_URL = "/services/api/chart/quantity-po";
const PO_GROUP_BY_BRANCH_URL = "/services/api/chart/wo/quantity/group-by-branch";
const PO_GROUP_BY_GROUP_URL = "/services/api/chart/wo/quantity/group-by-group-code";
const PO_GROUP_BY_PRODUCT_URL = "/services/api/chart/wo/quantity/group-by-product";
const WO_GROUP_BY_STATUS_URL = "/services/api/chart/wo/quantity/group-by-status";
const WO_PARENT_GROUP_BY_STATUS_URL = "/services/api/chart/wo/parent/quantity/group-by-status";
const PO_GROUP_BY_BRANCH_DASHBOARD = "/services/api/chart/wo/dashboard/quantity/group-by-branch";
const PO_GROUP_BY_REASON_URL = "/services/api/chart/wo/quantity/group-by-reason";
const PO_GROUP_BY_GROUP_DASHBOARD = "/services/api/chart/wo/dashboard/quantity/group-by-group-code";
// const PO_GROUP_BY_BRANCH_DASHBOARD = '/services/api/chart/wo/quantity/group-by-branch';
const getWODetailData = (token) => {
    // console.log("getWODetailData ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_QUANTITY_URL}`, data, { headers });
};

const getWODetailDataGroupByBranch = (token) => {
    // console.log("getPoDetailDataGroupByBranch ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_URL}`, data, { headers });
};

const getWODetailDataGroupByGroupCode = (token) => {
    // console.log("getWODetailDataGroupByGroupCode ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_GROUP_URL}`, data, { headers });
};

const getWODetailDataGroupByProduct = (token) => {
    // console.log("getWODetailDataGroupByProduct ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_PRODUCT_URL}`, data, { headers });
};

const getWODetailDataGroupByStatus = (token) => {
    // console.log("getWODetailDataGroupByStatus ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${WO_GROUP_BY_STATUS_URL}`, data, { headers });
};

const getWOParentDetailDataGroupByStatus = (token) => {
    // console.log("getWODetailDataGroupByStatus ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${WO_PARENT_GROUP_BY_STATUS_URL}`, data, { headers });
};

const getWODetailDataGroupByReason = (token) => {
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    let data;
    if (sessionStorage) {
        data = JSON.parse(sessionStorage).columns;
    }
    const headers = {
        Authorization: "Bearer " + token,
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_REASON_URL}`, data, { headers });
};

const getWODetailDataGroupByBranchDashboard = (token, data) => {
    // console.log("getPoDetailDataGroupByBranch ")
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };

    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_DASHBOARD}`, data, { headers });
};
const getWODetailDataGroupByGroupCodeDashboard = (token, data) => {
    // console.log("getWODetailDataGroupByGroupCode ")
    let sessionStorage = window.sessionStorage.getItem("storageWOReport");
    const headers = {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
    };
    return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_GROUP_DASHBOARD}`, data, { headers });
};

const WOChartReportServices = {
    getWODetailData,
    getWODetailDataGroupByBranch,
    getWODetailDataGroupByGroupCode,
    getWODetailDataGroupByProduct,
    getWODetailDataGroupByStatus,
    getWODetailDataGroupByReason,
    getWOParentDetailDataGroupByStatus,
    getWODetailDataGroupByBranchDashboard,
    getWODetailDataGroupByGroupCodeDashboard,
};
export default WOChartReportServices;
