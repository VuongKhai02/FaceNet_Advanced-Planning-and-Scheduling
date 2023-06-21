import React from 'react';
import axios from 'axios';
import {SCADA_URL, SCADA_USER, SCADA_PWD} from "../../config";

const LOGIN_URL = SCADA_URL + '/api/auth/login';
const GET_STAGE_URL = SCADA_URL + '/api/tenant/assetInfos?pageSize=100000000&page=0&sortProperty=createdTime&sortOrder=DESC&type=stage'
const GET_LINE_URL = SCADA_URL + '/api/tenant/assetInfos?pageSize=100000000&page=0&sortProperty=createdTime&sortOrder=DESC&type=line'

const getAccessToken = async () => {
  let headers = {
    'content-type': 'application/json'
  };
  let response = await axios.post(LOGIN_URL, {
    "username": SCADA_USER,
    "password": SCADA_PWD
  }, {headers});
  if (response.status === 200) {
    console.log("login thanh cong")
    console.log(response)
    return response.data.token;
  } else {
    return null;
  }
}

const getStageList = async () => {
  let data = window.localStorage.getItem("scada_stage_list");
  console.log("get data from local storage first")
  if (data) {
    console.log(data)
    return JSON.parse(data);
  }
  let token = await getAccessToken();
  const headers = {
    'content-type': 'application/json',
    'X-Authorization': 'Bearer ' + token
  }
  let response = await axios.get(GET_STAGE_URL, {headers});
  if (response && response.status === 200) {
    console.log("get stage ok")
    let dataArray = response.data.data;
    let dataArrayReturn: any[] = []
    let name;
    let description;
    dataArray.map(item => {
      name = item.name
      description = item.additionalInfo ? item.additionalInfo.description : item.name
      if (name && description) dataArrayReturn.push({name, description})
    });
    window.localStorage.setItem("scada_stage_list", JSON.stringify(dataArrayReturn));
    return dataArrayReturn;
  }
  return null;
}

const getLineList = async () => {

  let data = window.localStorage.getItem("scada_line_list");
  console.log("get data from local storage first")
  if (data) {
    console.log(data)
    return JSON.parse(data);
  }

  console.log("local store no data, get it from scada")
  let token = await getAccessToken();
  const headers = {
    'content-type': 'application/json',
    'X-Authorization': 'Bearer ' + token
  }

  let response = await axios.get(GET_LINE_URL, {headers});
  if (response && response.status === 200) {
    console.log("get line ok")
    let dataArray = response.data.data;
    let dataArrayReturn: any[] = []
    let name;
    let description;
    dataArray.map(item => {
      name = item.name
      description = item.additionalInfo ? item.additionalInfo.description : item.name
      if (name && description) dataArrayReturn.push({'ID': name, 'Name': description})
    });
    console.log("put data into local storage")
    window.localStorage.setItem("scada_line_list", JSON.stringify(dataArrayReturn));
    return dataArrayReturn;
  }
  return null;
}

const updateProductName = (productCode, token, assetId) => {
  console.log("update productCode " + productCode)
  const headers = {
    'content-type': 'application/json',
    'X-Authorization': 'Bearer ' + token
  };

  axios.post(SCADA_URL + '/api/plugins/telemetry/ASSET/' + assetId + '/attributes/SERVER_SCOPE',
    {"Product_Code": productCode}
    , {headers});
}

const getAssetByName = async (token, assetName) => {
  const headers = {
    'content-type': 'application/json',
    'X-Authorization': 'Bearer ' + token
  };

  let response = await axios.get(SCADA_URL + '/api/tenant/assets?assetName=' + assetName, {headers});
  if (response.status == 200 && response.data.id) {
    console.log('id of asset ' + assetName + ' = ' + response.data.id)
    return response.data.id.id
  }
  return null;
}

const getQuantityOut = async (token, assetId) => {
  const headers = {
    'content-type': 'application/json',
    'X-Authorization': 'Bearer ' + token
  };
  let response = await axios.get(SCADA_URL + '/api/plugins/telemetry/ASSET/' + assetId + "/values/attributes/SERVER_SCOPE",
    {headers});
  if (response.status == 200 && response.data) {
    response.data.map(item => {
      if (item && item.key == 'list_stage') {
        console.log('list stage')
        console.log(item.value)
        if (item.value) {
          console.log(item.value.at(-1))
        }
      }
    })
  }
}

const login = async () => {
  const headers = {
    'content-type': 'application/json'
  };
  let response = await axios.post(SCADA_URL + '/api/auth/login', {
    "username": SCADA_USER,
    "password": SCADA_PWD
  }, {headers})
  if (response.status == 200) {
    console.log('login thanh cong')
    return response.data.token;
  }
  return null;
}

const ScadaService = {getStageList, updateProductName, getAssetByName, login, getQuantityOut,getLineList}
export default ScadaService


