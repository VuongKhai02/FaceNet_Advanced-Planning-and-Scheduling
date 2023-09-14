
import _ from 'lodash'

export const NUMBER_PATTERN: string = '^[0-9]*$';

export const currentDateTime = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Etc/GMT-14" }));

export function getColor(value: any) {
  if (value === "Chờ sản xuất") {
    return "#0066FF"
  } else if (value === "Mới tạo") {
    return "#A8A8A8"
  } else if (value === "Đang chờ phê duyệt") {
    return "#DFE229"
  } else if (value === "Đã phê duyệt") {
    return "#00AF12"
  }
  return "#FF0000"
}

export function customizeColor(value: any): { color: string, backgroundColor: string, fontWeight: string } {
  if (value === "Hoạt động") {
    return {
      color: "#FFFFFF",
      backgroundColor: "#00AF12",
      fontWeight: '500'
    }
  } else if (value === "Ngừng hoạt động") {
    return {
      color: "#FFFFFF",
      backgroundColor: "#FFC32B",
      fontWeight: '500'
    }
  } else if (value === "Mới tạo") {
    return {
      color: "#FFFFFF",
      backgroundColor: "#A8A8A8",
      fontWeight: '500'
    }
  }
  else if (value === "Đang chờ phê duyệt") {
    return {
      color: "#FFFFFF",
      backgroundColor: "#FFC32B",
      fontWeight: '500'
    }
  } else if (value === "Đã phê duyệt") {
    return {
      color: "#FFFFFF",
      backgroundColor: "#00AF12",
      fontWeight: '500'
    }
  } else if (value === "Từ chối") {
    return {
      color: "#FFFFFF",
      backgroundColor: "#F11C1C",
      fontWeight: '500'
    }
  } else if (value === 1) {
    return {
      color: "#F11C1C",
      backgroundColor: "",
      fontWeight: '500'
    }
  } else if (value === 2) {
    return {
      color: "#FFC32B",
      backgroundColor: "",
      fontWeight: '500'
    }
  } else if (value === 3) {
    return {
      color: "#00AF12",
      backgroundColor: "",
      fontWeight: '500'
    }
  }
  return {
    color: "#fa4d4d",
    backgroundColor: "#fadbdb",
    fontWeight: '500'
  }
}


export const onStatusRender = (data: any) => {
  console.log(data.data)
  let status = "";
  let backgroundColor = "";
  let padding = "";
  let borderRadius = "";
  let width = "";
  let border = "";
  const getColor = (value: any) => {
    let color = ""
    switch (value) {
      case 2:
        status = "Đã phê duyệt"
        color = "rgba(228, 184, 25, 1)"
        backgroundColor = "rgba(228, 184, 25, 0.1)"
        padding = "3px 15px"
        borderRadius = "4px"
        width = "125px"
        border = "1px solid rgba(228, 184, 25, 0.5)"
        break;
      case 1:
        status = "Đang chờ phê duyệt"
        color = "rgba(175, 25, 228, 1)"
        backgroundColor = "rgba(175, 25, 228, 0.1)"
        padding = "3px 15px"
        borderRadius = "4px"
        border = "1px solid rgba(175, 25, 228, 0.5)"
        width = "173px"
        break;
      case 3:
        status = "Mới tạo"
        color = "rgba(0, 151, 15, 1)"
        backgroundColor = "rgba(17, 168, 32, 0.1)"
        padding = "3px 18px"
        borderRadius = "4px"
        border = "1px solid rgba(0, 151, 15, 0.5)"
        width = "105px"
        break
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