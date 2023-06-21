import {Tag} from "antd";
import React from "react";


export function stateCellRender(rowInfo) {
  return stateTagRender(rowInfo.data);
}

export function stateTagRender(workOrder) {
  let cl = "processing";
  let str = "Mới tạo";
  if (!workOrder.status || workOrder.status === 'ACTIVE') {
    if (workOrder.state === 'CREATED') {
      cl = "processing";
      str = "Mới tạo";
    }
    if (workOrder.state === 'SEND_SCADA_OK') {
      cl = "warning";
      str = "Đã gửi Scada";
    }
    if (workOrder.state === 'READY') {
      cl = "warning";
    }
    if (workOrder.state === 'CREATE_WO') {
      cl = "warning";
      str = "Đã khai WO";
    }
    if (workOrder.state === 'APPROVED') {
      cl = "success";
      str = "Đã phê duyệt";
    }
    if (workOrder.state === 'COMPLETE') {
      cl = "success";
      str = "Hoàn thành";
    }
  } else if (workOrder.status === 'HOLD') {
    cl = "warning";
    str = "Tạm ngưng";
  } else {
    cl = "error";
    str = "Ngưng sản xuất";
  }
  return (<Tag color={cl}>{str}</Tag>);
}

export function colorByCompletePercent(outQuantity,quantity) {
  if (outQuantity && quantity) {
    let percent = Math.round(outQuantity * 100 / quantity);
    if(percent <=60){
      return "#1890ff";
    }else if(percent <=80){
      return "#81ecec";
    }else{
      return "#52c41a";
    }
  }
  return "#1890ff"
}

export function getWorkOrderColor(workOrder) {
  let color;
  if (!workOrder.status || workOrder.status === 'ACTIVE') {
    color = "#1890ff";
    if (workOrder.state === 'COMPLETE') {
      color = "#52c41a";
    }else{
      color = colorByCompletePercent(workOrder.quantityActual,workOrder.quantityPlan)
    }
  } else if (workOrder.status === 'HOLD') {
    color = "#faad14";
  } else {
    color = "#ff4d4f";
  }
  return color;
}


export const statusList = [{
  ID: "ACTIVE",
  Name: 'Hoạt động',
}, {
  ID: "HOLD",
  Name: 'Tạm ngưng',
},
  {
    ID: "DEACTIVE",
    Name: 'Ngưng Sản xuất',
  }
]

export const orderStatusList = [{
  ID: "active",
  Name: 'Hoạt động',
}, {
  ID: "deactive",
  Name: 'Ngưng sản xuất',
}
]

export const getPercent = (num) => {
  return  (+(Math.round(Number(num + "e+3"))  + "e-3"))*100
}