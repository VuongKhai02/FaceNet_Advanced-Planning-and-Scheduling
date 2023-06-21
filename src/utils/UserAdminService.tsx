import React from "react";
import axios from "axios";
import {PLANNING_API_URL} from "../config";

const GET_GROUP_URL = "/services/keycloak/getGroups";
const GET_USER_LIST_URL =
  "/services/keycloak/getUsers?username=";
const GET_GROUP_MEMBERS_URL =
  "/services/keycloak/getGroupMembers?groupId=";

const groupList = async () => {
  let storage = window.localStorage;
  const token = storage.getItem("_jmixRestAccessToken");
  const headers = {
    Authorization: "Bearer " + token,
    "content-type": "application/json"
  };

  return await axios.get(GET_GROUP_URL, {headers});
};

const userListByGroup = async groupId => {
  let storage = window.localStorage;
  const token = storage.getItem("_jmixRestAccessToken");
  const headers = {
    Authorization: "Bearer " + token,
    "content-type": "application/json"
  };

  return await axios.get(GET_GROUP_MEMBERS_URL + groupId, {headers});
};

const userList = async () => {
  let storage = window.localStorage;
  const token = storage.getItem("_jmixRestAccessToken");
  const headers = {
    Authorization: "Bearer " + token,
    "content-type": "application/json"
  };

  return await axios.get(GET_USER_LIST_URL, {headers});
};

const UserAdminService = {
  groupList,
  userList,
  userListByGroup,
  GET_USER_LIST_URL: GET_GROUP_MEMBERS_URL
};

export default UserAdminService;
