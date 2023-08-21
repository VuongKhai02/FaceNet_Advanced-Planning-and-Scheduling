import React, { useState } from "react";
import { instance } from "@haulmont/jmix-react-core";
import { PlanningWorkOrderAssignment } from "../../../jmix/entities/PlanningWorkOrderAssignment";
import { ProgressBar } from "devextreme-react/progress-bar";
import { formatDate } from "devextreme/localization";
import { Tag } from "antd";
import { getStateString } from "./WOTemplate";
import { Button } from "devextreme-react/button";
import { ProgressWO } from "./ProgressWO";
import { stateTagRender } from "../../utils";

const ROUTING_PATH = "/workOrderTooltip";

// const getWoById = (id) => {
//   const dataInstance = instance<PlanningWorkOrderAssignment>(PlanningWorkOrderAssignment.NAME, {
//     view: '_base',
//     loadImmediately: false
//   });
//   dataInstance.load(id);
//   console.log(dataInstance.item)
//   return dataInstance.item
// }
function statusFormat(value) {
    return `Tiến độ: ${value * 100}%`;
}

export const WorkOrderTooltip = (model) => {
    // const [wo, setWo] = useState(getWoById(woId));
    const { appointmentData } = model.data;
    // console.log(model)
    return (
        <div className='movie-tooltip' style={{ height: "auto" }}>
            <div className='movie-info'>
                <div className='dot' style={{ background: "rgb(29, 178, 245)" }}></div>
                <div>
                    <div className='movie-title'>
                        {" "}
                        {appointmentData.woId} {stateTagRender(appointmentData)}
                    </div>
                    <div style={{ opacity: ".8" }}>
                        <div style={{ paddingTop: "10px", whiteSpace: "initial" }}>
                            <strong>Mã PO:</strong> {appointmentData.productOrder}
                        </div>
                        <div style={{ whiteSpace: "initial" }}>
                            <strong>Sản Phẩm:</strong> {appointmentData.productName}
                        </div>
                        <div>
                            <strong>Bom Version:</strong>
                            {appointmentData.bomVersion}
                        </div>
                        <div>
                            <strong>Thời gian: </strong> {formatDate(new Date(appointmentData.startTime), "shortDateShortTime")}
                            {" - "}
                            {formatDate(new Date(appointmentData.endTime), "shortDateShortTime")}
                        </div>
                        <div>
                            {/*<strong>Trạng thái: </strong>*/}
                            {/*<Tag color="processing">{getStateString(appointmentData.state)}</Tag>*/}
                        </div>

                        <div>
                            <strong>Sản lượng thực tế/kế hoạch: </strong>
                            {appointmentData.quantityActual ? appointmentData.quantityActual : 0}/{appointmentData.quantityPlan}
                            {/*<ProgressWO quantityActual ={appointmentData.quantityActual} quantityPlan ={appointmentData.quantityPlan}/>*/}
                        </div>
                    </div>
                </div>
                <div style={{ float: "right" }}>
                    <Button stylingMode='text' icon={"edit"} />
                </div>

                {/*<ProgressBar*/}
                {/*  id="progress-bar-status"*/}
                {/*  className={appointmentData.actual === appointmentData.planning ? 'complete' : '' }*/}
                {/*  width="90%"*/}
                {/*  min={0}*/}
                {/*  max={appointmentData.planning}*/}
                {/*  statusFormat={statusFormat}*/}
                {/*  value={appointmentData.actual}*/}
                {/*/>*/}
            </div>
        </div>
    );
};
