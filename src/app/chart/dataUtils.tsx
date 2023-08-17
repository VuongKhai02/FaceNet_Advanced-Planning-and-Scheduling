import React from "react";
import { useMainStore } from "@haulmont/jmix-react-core";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";

export function GetWorkOrderGroupByBranch(setData, mainStore) {
    const headers = {
        Authorization: "Bearer " + mainStore.authToken,
        "content-type": "application/json",
    };
    axios.get(PLANNING_API_URL + "/services/api/workorder/list-wo-group-by-branch?woType=LINE", { headers }).then((response) => {
        if (response.status === 200) {
            setData(response.data);
        }
    });
}
