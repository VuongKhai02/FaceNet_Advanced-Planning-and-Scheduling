import React from 'react';
import {collection, instance} from "@haulmont/jmix-react-core";
import axios from "axios";
import {PLANNING_API_URL} from "../../config";

const PO_QUANTITY_URL = '/services/api/chart/quantity-po';
const PO_GROUP_BY_BRANCH_URL = '/services/api/chart/wo/quantity/group-by-branch';
const PO_GROUP_BY_GROUP_URL = '/services/api/chart/wo/quantity/group-by-group-code';
const PO_GROUP_BY_PRODUCT_URL = '/services/api/chart/wo/quantity/group-by-product';
const PO_GROUP_BY_STATUS_URL = '/services/api/chart/wo/quantity/group-by-status';

const getWODetailData = (token) => {
  console.log("getWODetailData ")
  let sessionStorage = window.sessionStorage.getItem("storageWOReport");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_QUANTITY_URL}`, data, {headers});
}

const getWODetailDataGroupByBranch = (token) => {
  console.log("getPoDetailDataGroupByBranch ")
  let sessionStorage = window.sessionStorage.getItem("storageWOReport");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_URL}`, data, {headers});
}

const getWODetailDataGroupByGroupCode = (token) => {
  console.log("getWODetailDataGroupByGroupCode ")
  let sessionStorage = window.sessionStorage.getItem("storageWOReport");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_GROUP_URL}`, data, {headers});
}

const getWODetailDataGroupByProduct = (token) => {
  console.log("getWODetailDataGroupByProduct ")
  let sessionStorage = window.sessionStorage.getItem("storageWOReport");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_PRODUCT_URL}`, data, {headers});
}

const getWODetailDataGroupByStatus = (token) => {
  console.log("getWODetailDataGroupByStatus ")
  let sessionStorage = window.sessionStorage.getItem("storageWOReport");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_STATUS_URL}`, data, {headers});
}

const WOChartReportServices = { getWODetailData, getWODetailDataGroupByBranch, getWODetailDataGroupByGroupCode , getWODetailDataGroupByProduct, getWODetailDataGroupByStatus}
export default WOChartReportServices;