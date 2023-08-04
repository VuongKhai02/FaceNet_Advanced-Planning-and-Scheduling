import { Condition } from '@haulmont/jmix-rest';
import _ from 'lodash'
import React from "react";

export const print = (str) => {
  console.log(str)
}


export const str = (s) => JSON.stringify(s, null, 4);

export const copy = (s) => JSON.parse(JSON.stringify(s))

export const NUMBER_PATTERN: string = '^[0-9]*$';

export const arrayUnion = (arr1, arr2, identifier) => {
  const array = [...arr1, ...arr2]

  return _.uniqBy(array, identifier)
}

export const addIfNotExist = (arr1, value1, identity) => {

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i][identity] === value1[identity]) return arr1;
  }
  arr1.push(value1)
  return arr1;
}

export const removeIfExist = (arr1, value1, identity) => {

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i][identity] === value1[identity]) {
      arr1.splice(i, 1)
      return arr1;
    }
  }
  return arr1;
}

export const currentDateTime = () => new Date(new Date().toLocaleString("en-US",{timeZone: "Etc/GMT-14"}));



const mappingOperator = {
  "=": "=",
  "<>": "<>",
  ">": ">",
  ">=": ">=",
  "<": "<",
  "<=": "<=",
  "startswith": "startsWith",
  "endswith": "endsWith",
  "contains": "contains",
  "notcontains": "doesNotContain",
}

export function mappingFilterDevextreme(filterDevextreme): Condition {
  const property = filterDevextreme[0];
  const operator = mappingOperator[filterDevextreme[1]];
  const value = filterDevextreme[2];

  return { property, operator, value }
}

export function getColor(value) {
  if (value === "Chờ sản xuất") {
    return "#0066FF"
  } else if (value === "Chưa xác định") {
    return "#FFCC00"
  } else if (value === "Hoàn thành") {
    return "#33CC33"
  } else if (value === "Hoàn thành sớm") {
    return "#33FFFF"
  } else if (value === "Chậm tiến độ") {
    return "#FFFF00"
  } else if (value === "Ngưng sản xuất") {
    return "#666633"
  } else if (value === "Đang sản xuất") {
    return "#FFCCFF"
  } else if (value === "Không hoàn thành" || value === "Chưa hoàn thành") {
    return "#FF0000"
  }
  return "#FF0000"
}

export function customizeColor(value): {color: string, backgroundColor: string}{
  if (value === "Chờ sản xuất") {
    return {
      color: "#0066FF",
      backgroundColor: "#c4dcff"
    }
  } else if (value === "Chưa xác định") {
    return {
      color: "#dcb10b",
      backgroundColor: "#f5f2d6"
    }
  } else if (value === "Hoàn thành") {
    return {
      color: "#33CC33",
      backgroundColor: "#ccffd1"
    }
  } else if (value === "Hoàn thành sớm") {
    return {
      color: "#0ab9b9",
      backgroundColor: "#c8ffff"
    }
  } else if (value === "Chậm tiến độ") {
    return {
      color: "#c0c006",
      backgroundColor: "#fdfdd3"
    }
  } else if (value === "Ngưng sản xuất") {
    return {
      color: "#666633",
      backgroundColor: "#eeeeca"
    }
  } else if (value === "Đang sản xuất") {
    return {
      color: "#f644f6",
      backgroundColor: "#fcedfc"
    }
  } else if (value === "Không hoàn thành" || value === "Chưa hoàn thành") {
    return {
      color: "#FF0000",
      backgroundColor: "#ffdfdf"
    }
  }
  return {
    color: "#FF0000",
    backgroundColor: "#fadbdb"
  }
}


export const onStatusRender = (data) => {
  console.log(data.data)
  // console.log("Data color,", data?.value)
  let status = "";
  let backgroundColor = "";
  let padding = "";
  let borderRadius = "";
  let width = "";
  let border = "";
  const getColor = (value) => {
    let color = ""
    switch (value) {
      case 2:
        status = "SAP"
        color = "rgba(228, 184, 25, 1)"
        backgroundColor = "rgba(228, 184, 25, 0.1)"
        padding = "3px 15px"
        borderRadius = "4px"
        width = "125px"
        border = "1px solid rgba(228, 184, 25, 0.5)"
        break;
      case 1:
        status = "Panacim"
        color = "rgba(175, 25, 228, 1)"
        backgroundColor = "rgba(175, 25, 228, 0.1)"
        padding = "3px 15px"
        borderRadius = "4px"
        border = "1px solid rgba(175, 25, 228, 0.5)"
        width = "173px"
        break;
      case 3:
        status = "Panacim, SAP"
        color = "rgba(0, 151, 15, 1)"
        backgroundColor = "rgba(17, 168, 32, 0.1)"
        padding = "3px 18px"
        borderRadius = "4px"
        border = "1px solid rgba(0, 151, 15, 0.5)"
        width = "105px"
        break
      case 0:
        status = "R2"
        color = "rgba(229, 28, 15, 1)"
        backgroundColor = "rgba(229, 28, 15, 0.1)"
        padding = "3px 15px"
        borderRadius = "4px"
        // width = "90px"
        border = "1px solid rgba(229, 28, 15, 0.5)"
        break;
      case "5":
        status = "Đã gửi SAP, MES"
        color = "rgba(0, 151, 15, 1)"
        backgroundColor = "rgba(17, 168, 32, 0.1)"
        padding = "3px 18px"
        borderRadius = "4px"
        break;
      default:
        status = "R2"
        color = "rgba(229, 28, 15, 1)"
        backgroundColor = "rgba(229, 28, 15, 0.1)"
        padding = "3px 15px"
        borderRadius = "4px"
        // width = "90px"
        border = "1px solid rgba(229, 28, 15, 0.5)"

        break;
    }
    return color
  }

  const color = getColor(data?.value)
  return <div style={{
    "width": "100%",
    "textAlign": "center",
    "color": color,
    "backgroundColor": backgroundColor,
    "padding": padding,
    "borderRadius": borderRadius,
    // "width": width,
    "border": border
  }}>{status}</div>
}