import React from 'react';
import {collection, instance} from "@haulmont/jmix-react-core";
import axios from "axios";
import {PLANNING_API_URL} from "../../config";

const PO_QUANTITY_URL = '/services/api/chart/quantity-po';
const PO_GROUP_BY_BRANCH_URL = '/services/api/chart/quantity-po/group-by-branch';
const PO_GROUP_BY_GROUP_URL = '/services/api/chart/quantity-po/group-by-group-code';
const PO_GROUP_BY_PRODUCT_URL = '/services/api/chart/quantity-po/group-by-product';
const PO_GROUP_BY_REASON_URL = '/services/api/chart/quantity-po/group-by-reason';

const getPoDetailData = (token) => {
  console.log("getPoDetailData ")
  let sessionStorage = window.sessionStorage.getItem("storage");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_QUANTITY_URL}`, data, {headers});
}

const getPoDetailDataGroupByBranch = (token) => {
  console.log("getPoDetailDataGroupByBranch ")
  let sessionStorage = window.sessionStorage.getItem("storage");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_BRANCH_URL}`, data, {headers});
}

const getPoDetailDataGroupByGroupCode = (token) => {
  console.log("getPoDetailDataGroupByGroupCode ")
  let sessionStorage = window.sessionStorage.getItem("storage");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_GROUP_URL}`, data, {headers});
}

const getPoDetailDataGroupByProduct = (token) => {
  console.log("getPoDetailDataGroupByProduct ")
  let sessionStorage = window.sessionStorage.getItem("storage");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_PRODUCT_URL}`, data, {headers});
}

const getPoDetailDataGroupByReason = (token) => {
  console.log("getPoDetailDataGroupByReason ")
  let sessionStorage = window.sessionStorage.getItem("storage");
  let data;
  if(sessionStorage){
    data =  JSON.parse(sessionStorage).columns;
  }
  const headers = {
    'Authorization': 'Bearer ' + token,
  };

  return axios.post(`${PLANNING_API_URL}${PO_GROUP_BY_REASON_URL}`, data, {headers});
}

const ChartReportServices = { getPoDetailData,getPoDetailDataGroupByBranch,getPoDetailDataGroupByGroupCode ,getPoDetailDataGroupByProduct,getPoDetailDataGroupByReason}
export default ChartReportServices;