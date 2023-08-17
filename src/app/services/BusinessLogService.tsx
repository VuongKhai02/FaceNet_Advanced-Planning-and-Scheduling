import React from "react";
import { collection, instance } from "@haulmont/jmix-react-core";
import { ProductOrderItem } from "../../jmix/entities/ProductOrderItem";
import { BusinessLog } from "../../jmix/entities/BusinessLog";
import { currentDateTime, str } from "../../utils/utils";
import Keycloak from "../../Keycloak";

const businessLogDataInstance = instance<BusinessLog>(BusinessLog.NAME, {
    view: "_base",
    loadImmediately: false,
});

const businessLogDs = collection<BusinessLog>(BusinessLog.NAME, {
    view: "_base",
    sort: "startTime",
    loadImmediately: false,
});

const save = (actionName, workOrder, woId, referenceId, startTime) => {
    let businessLog = new BusinessLog();
    businessLog.actionName = actionName;
    businessLog.woId = woId;
    businessLog.referenceId = referenceId;
    businessLog.startTime = startTime;
    businessLog.endTime = currentDateTime();
    businessLog.outData = str(workOrder);
    businessLog.errorCode = "00";
    businessLog.errorDescription = "Success";
    businessLog.userName = Keycloak.getUsername();
    businessLog.duration = businessLog.endTime.getTime() - businessLog.startTime.getTime();
    businessLogDataInstance.setItem(businessLog);
    // console.log(businessLog)
    businessLogDataInstance.commit();
};

const loadByWoId = (woId, setData) => {
    businessLogDs.filter = {
        conditions: [{ property: "woId", operator: "=", value: woId }],
    };
    businessLogDs.load().then((res) => {
        setData(businessLogDs.items);
    });
};

const BusinessLogService = { save, loadByWoId };
export default BusinessLogService;
