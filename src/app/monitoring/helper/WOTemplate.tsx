import React from "react";
import Query from "devextreme/data/query";
import { formatDate } from "devextreme/localization";
import "../monitoring.css";
import { StateEnum } from "../../../jmix/enums/enums";
import { Tag } from "antd";

const stateList = [
    {
        id: "NEW",
        text: "Tạo mới",
        color: "#81ecec",
    },
    {
        id: "WAITING",
        text: "Đợi NVL",
        color: "#0984e3",
    },
    {
        id: "SEND_SCADA_OK",
        text: "Đã gửi sang SCADA",
        color: "#fab1a0",
    },
    {
        id: "COMPLETE",
        text: "Hoàn thành",
        color: "#7b49d3",
    },
];

export const getStateString = (state) => {
    // console.log(state)
    let stateStr = "1";
    stateList.map((s) => {
        if (state === "NEW") stateStr = "Tạo mới";
        if (state === "SEND_SCADA_OK") stateStr = "Đã gửi Scada";
    });
    return stateStr;
};

export const WOTemplate = (model) => {
    // console.log('WOTemplate')
    // console.log(model.data.appointmentData)
    const wo = model.data.appointmentData;

    return (
        <div className='showtime-preview'>
            <div>
                <strong>{wo.woId} </strong>
            </div>
            <div className='wo-template-content'>
                <div>{wo.productName}</div>
                <div>
                    {formatDate(new Date(wo.startTime), "monthAndDay")}
                    {" - "}
                    {formatDate(new Date(wo.endTime), "monthAndDay")}
                </div>
                <div>{getStateString(wo.state)}</div>
            </div>
        </div>
    );
};
