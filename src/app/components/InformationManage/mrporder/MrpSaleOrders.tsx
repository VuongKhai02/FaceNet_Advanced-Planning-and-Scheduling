import React, { useEffect, useState } from "react";
import "./MrpSaleOrder.css"

// @ts-ignore
import { Button, DataGrid, Popup } from "devextreme-react";
import {
  Column,
  FilterRow,
  HeaderFilter,
  Item as ToolbarItem,
  Pager,
  Paging,
  SearchPanel,
  Toolbar,
  MasterDetail, Editing, Form, ColumnChooser
} from "devextreme-react/data-grid";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { IWarning } from "../../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../../config";
import { ImportOrder } from "../../../import/ImportOrder";
import { customizeColor, getColor } from "../../../../utils/utils";
import OrderItemTemplate from "./OrderItemTemplate";
import { Tooltip } from "devextreme-react/tooltip";
import { Tag } from "antd";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import { InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";


const ROUTING_PATH = "/mrporders";
const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];
export const MrpSaleOrders = () => {

  const [content, setContent] = React.useState<string>();
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)
  const [currentWarning, setCurrentWarning] = React.useState<IWarning>()
  const [popupVisible, setPopupVisible] = React.useState<boolean>(false);
  const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
  const [isVisibleConfirmDelete, setIsVisibleConfirmDelete] = React.useState<boolean>(false);

  const mainStore = useMainStore();

  const onStatusRender = (data) => {
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
        case "Cảnh báo":
          status = "Cảnh báo"
          color = "rgba(228, 184, 25, 1)"
          backgroundColor = "rgba(228, 184, 25, 0.1)"
          padding = "3px 15px"
          borderRadius = "4px"
          width = "125px"
          border = "1px solid rgba(228, 184, 25, 0.5)"
          break;
        case "Nghiêm trọng":
          status = "Nghiêm trọng"
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

  const buttonCellRender = (data) => {

    return <div>
      <div id={"r2Tool" + data.data.id} style={{ float: "left" }}>
        <Button icon="customicon" stylingMode={"text"} />
      </div>
      <div id={"redundantMaterial" + data.data.id} style={{ float: "left" }}>
        <Button
          icon="redundaunt"
          stylingMode={"text"}
        />

      </div>
      <div id={"approveRedundantmaterial" + data.data.id} style={{ float: "left" }}>
        <Button
          icon="approveredundaunt"
          stylingMode={"text"}
        />
      </div>

    </div>
  }

  function renderWaringDetail(data: any) {
    return <div>
      <Button icon="search" onClick={setPopUpOpen} />
    </div>
  }

  const refresh = async () => {
    // await loadPartNumber();
  };

  const loadOrders = () => {
    const headers = {
      'Authorization': 'Bearer ' + mainStore.authToken,
      'content-type': 'application/json'
    };
    axios.get(PLANNING_API_URL + '/api/orders', { headers })
      .then(response => {
        if (response.status === 200) {
          setContent(response.data.data)
        }
      }
      );
  }


  const getProductOrderItemTemplate = row => {
    return (
      <OrderItemTemplate
        data={row.data}
      />
    );
  };

  const onSelectedRowKeysChange = (e) => {
    if (e.data) {
      setCurrentWarning(e.data)
    }
  }
  const setPopUpOpen = () => {
    setPopupIsOpen(true);
    refresh();
  }
  const setPopUpClose = () => {
    setPopupIsOpen(false);
    refresh();
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const saveOrder = (data) => {
    console.log(data);
    console.log("click submit")
  }

  const updateOrder = (e) => {
    const headers = {
      'Authorization': 'Bearer ' + mainStore.authToken,
      'content-type': 'application/json'
    };
    console.log(e)
    let data = JSON.stringify(e.newData);
    axios.put(PLANNING_API_URL + '/api/orders/' + e.oldData.saleOrderId, data, { headers },)
      .then(response => {
        if (response.status === 200) {
          notify({
            message: 'Cập nhật thành công!',
            width: 450
          }, 'SUCCESS', 3000);
        } else {
          notify({
            message: 'Cập nhật thất bại!',
            width: 450
          }, 'error', 3000);
        }
      }
      );
  }
  const removeOrder = (e) => {
    const headers = {
      'Authorization': 'Bearer ' + mainStore.authToken,
      'content-type': 'application/json'
    };
    console.log('eeeeeeeeeeeee', e)
    let data = JSON.stringify(e.newData);
    axios.delete(PLANNING_API_URL + '/api/orders/' + e.data.saleOrderId, { headers },)
      .then(response => {
        if (response.status === 200) {
          notify({
            message: 'Xóa thành công đơn hàng!',
            width: 450
          }, 'SUCCESS', 3000);
        } else {
          notify({
            message: 'Xóa thất bại!',
            width: 450
          }, 'error', 3000);
        }
      }
      );
  }

  const onStatusPoRender = (rowInfo) => {
    // console.log("Data color,", data?.value)
    let customColor: {
      color: string,
      backgroundColor: string
    } = {
      color: "",
      backgroundColor: ""
    }
    let status = "";
    // let backgroundColor = "";
    let padding = "";
    let borderRadius = "";
    let width = "";
    let border = "";

    const getColor = (value) => {
      // let color = ""
      switch (value) {
        case "new":
          status = "Chờ sản xuất"
          break;
        case "complete":
          status = "Hoàn thành"
          break;
        case "not_complete":
          status = "Chưa hoàn thành"
          break
        case "in_production":
          status = "Đang sản xuất"
          break;
        case "early_complete":
          status = "Hoàn thành sớm"
          break;
        case "delay":
          status = "Chậm tiến độ"
          break;
        case "unknown":
          status = "Chưa xác định"
          break;
        case "wait_production":
          status = "Chờ sản xuất"
          break;
        case "stop":
          status = "Ngưng sản xuất"
          break;
        default:
          status = "Chưa xác định"
          break;
      }
    }

    getColor(rowInfo.data.data.processStatus);
    customColor = customizeColor(status)
    border = "1px solid " + customColor.color;
    return <Tag style={{
      "fontWeight": "bold",
      "width": "100%",
      "textAlign": "center",
      "color": customColor.color,
      "backgroundColor": customColor.backgroundColor,
      "borderRadius": "4px",
      "border": border
    }}>{status}</Tag>
  }

  const onPriorityRender = (rowInfo) => {
    let customColor: {
      color: string,
      backgroundColor: string
    } = {
      color: "",
      backgroundColor: ""
    }
    let status = "";
    let padding = "";
    let borderRadius = "";
    let width = "";
    let border = "";
    status = "1"

    getColor(status);
    customColor = customizeColor(status)
    border = "1px solid " + customColor.color;
    return <Tag style={{
      "fontWeight": "bold",
      "width": "50%",
      "textAlign": "center",
      "color": customColor.color,
      "backgroundColor": customColor.backgroundColor,
      "borderRadius": "4px",
      "border": border
    }}>{status}</Tag>
  }


  return <div className="box__shadow-table-responsive">
    <div className="table-responsive">
      <div className="informer" style={{
        background: "#fff",
        textAlign: "center",
        paddingTop: 12
      }}>
        <h5 className="name" style={{
          fontSize: 18,
          marginBottom: 0
        }}>Danh sách đơn hàng</h5>
      </div>
      <div className="informer" style={{
        backgroundColor: "#ffffff",
      }}>
        <h5 className="name" style={{
          color: "rgba(0, 0, 0, 0.7)",
          marginBottom: 0,
          fontSize: 15,
          boxSizing: "border-box",
          fontWeight: 550
        }}>Tìm kiếm chung</h5>
      </div>

      <DataGrid
        key={"saleOrderId"}
        keyExpr={"saleOrderId"}
        dataSource={content}
        showBorders={true}
        columnAutoWidth={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        focusedRowEnabled={true}
        onSelectionChanged={onSelectedRowKeysChange}
        onRowClick={onSelectedRowKeysChange}
        onRowUpdating={updateOrder}
        onRowRemoving={removeOrder}
      >
        <PopupConfirmDelete
          isVisible={isVisibleConfirmDelete}
          onCancel={() => setIsVisibleConfirmDelete(false)}
          onSubmit={() => { }}
          modalTitle={
            <div>
              <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500 }}>
                Xóa dữ liệu
              </h3>
            </div>
          }
          modalContent={
            <div>
              <h4 style={{ fontWeight: 400 }}>Bạn có chắc chắn muốn xóa <b>Dữ liệu hiện tại</b>?</h4>
              <div style={{ backgroundColor: '#ffe0c2', borderLeft: '4px solid #ff794e', height: 100, borderRadius: 5 }}>
                <h3 style={{ color: '#ff794e', fontWeight: 500 }}>
                  <WarningOutlined style={{ color: '#ff794e', marginRight: '8px' }} />
                  Lưu ý:
                </h3>
                <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>Nếu bạn xóa <b>Dữ liệu hiện tại </b> thì các thông tin liên quan đều bị mất</p>
              </div>
            </div>
          }
          width={600} />
        <PopupImportFile visible={isVisibleImportFile} onCancel={() => setIsVisibleImportFile(false)} title={'Import file'} onSubmit={() => { }} width={900} />
        <Toolbar>
          <ToolbarItem location="after">
            <SvgIcon onClick={() => setIsVisibleImportFile(true)} text="Thêm mới" tooltipTitle="Thêm mới" sizeIcon={17} textSize={17} icon="assets/icons/ImportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
          </ToolbarItem>
          <ToolbarItem location="after">
            <SvgIcon text="Xuất Excel" tooltipTitle="Xuất Excel" sizeIcon={17} textSize={17} icon="assets/icons/ExportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
          </ToolbarItem>
          <ToolbarItem name="searchPanel" location="before" />
          <ToolbarItem name="columnChooserButton" />

        </Toolbar>
        <FilterRow visible={true} />
        <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
        <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={"compact"}
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          infoText="Trang số {0} trên {1} ({2} bản ghi)" />
        <Column caption={"Mã PO"} dataField={"saleOrderId"} alignment="left" width={100} />
        <Column caption={"Mã sản xuất"} dataField={"productionCode"} />
        <Column caption={"Tên khách hàng"} dataField={"customer"} />
        <Column caption={"Tên thẻ"} dataField={"cardName"} />
        <Column caption={"Số lượng"} dataField={"quantity"} />
        <Column caption={"Số lượng đã tính bù hao"} dataField={"totalQuantity"} alignment="left" />
        <Column caption={"Số HD/PO"} dataField={"contractNumber"} width={200} />
        <Column caption={"Ngày bắt đầu"} dataType="datetime" dataField={"startTime"}
          format="dd/MM/yyyy hh:mm:ss" />
        <Column caption={"Ngày kết thúc"} dataType="datetime" dataField={"finishTime"}
          format="dd/MM/yyyy hh:mm:ss" />
        <Column caption={"Ngày giao hàng"} dataType="datetime" dataField={"deliveryDate"}
          format="dd/MM/yyyy hh:mm:ss" />
        <Column caption={"Mức độ ưu tiên"} cellComponent={onPriorityRender} alignment={"center"} />
        <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
        <Column type={"buttons"} caption={"Thao tác"} alignment="center"
          cellRender={() =>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
              <SvgIcon onClick={() => setIsVisibleConfirmDelete(true)} tooltipTitle="Xóa" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" />

            </div>
          }>
        </Column>
        <MasterDetail
          enabled={true}
          component={getProductOrderItemTemplate}
        // autoExpandAll={true}
        />
      </DataGrid>
    </div>
  </div>
}

registerScreen({
  component: MrpSaleOrders,
  caption: "Quản lý đơn hàng",
  screenId: "MrpSaleOrders",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default MrpSaleOrders;