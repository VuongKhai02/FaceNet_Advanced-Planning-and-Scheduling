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
  MasterDetail, Editing, Form
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


const ROUTING_PATH = "/mrporders";

export const MrpSaleOrders = () => {

  const [warnings, setWarnings] = useState<[]>();
  const [content, setContent] = useState<string>();
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
  const [currentWarning, setCurrentWarning] = useState<IWarning>()
  const [popupVisible, setPopupVisible] = useState(false);

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

  const hideInfo = () => {
    setPopupVisible(false)
  }

  const showInfo = () => {
    setPopupVisible(true)
  }


  function renderWaringDetail(data: any) {
    return <div>
      {/*data.data.id*/}
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
          // console.log(response.data)
          setContent(response.data.data)
        }
      }
      );
  }

  const renderPopupImport = () => {
    // console.log("WorkOrderLogPopup render popup")
    // console.log(props.businessLogObject)
    return <ImportOrder />
  }

  const getProductOrderItemTemplate = row => {
    return (
      <OrderItemTemplate
        data={row.data}
      // productsFullArrays={this.state.productsFullArrays}
      // reasons={this.state.reasonList}
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
    // return <WarningDetail warningDetail={currentWarning} />
    console.log(data);
    console.log("click submit")
  }

  const updateOrder = (e) => {
    // return <WarningDetail warningDetail={currentWarning} />
    const headers = {
      'Authorization': 'Bearer ' + mainStore.authToken,
      'content-type': 'application/json'
    };
    console.log(e)
    let data = JSON.stringify(e.newData);
    axios.put(PLANNING_API_URL + '/api/orders/' + e.oldData.saleOrderId, data, { headers },)
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data)
          // setContent(response.data.data)
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
    // return <WarningDetail warningDetail={currentWarning} />
    const headers = {
      'Authorization': 'Bearer ' + mainStore.authToken,
      'content-type': 'application/json'
    };
    console.log(e)
    let data = JSON.stringify(e.newData);
    axios.delete(PLANNING_API_URL + '/api/orders/' + e.data.saleOrderId, { headers },)
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data)
          // setContent(response.data.data)
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

    // let value = rowInfo.data.data.processStatus;
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
    // const color = getColor(rowInfo.data.data.processStatus)
    // return <Tag color={color}>{status}</Tag>
    return <Tag style={{
      "fontWeight": "bold",
      "width": "100%",
      "textAlign": "center",
      "color": customColor.color,
      "backgroundColor": customColor.backgroundColor,
      // "padding": padding,
      "borderRadius": "4px",
      // "width": width,
      "border": border
    }}>{status}</Tag>
  }

  const onPriorityRender = (rowInfo) => {
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

    // let value = rowInfo.data.data.processStatus;
    status = "1"

    getColor(status);
    customColor = customizeColor(status)
    border = "1px solid " + customColor.color;
    // const color = getColor(rowInfo.data.data.processStatus)
    // return <Tag color={color}>{status}</Tag>
    return <Tag style={{
      "fontWeight": "bold",
      "width": "50%",
      "textAlign": "center",
      "color": customColor.color,
      "backgroundColor": customColor.backgroundColor,
      // "padding": padding,
      "borderRadius": "4px",
      // "width": width,
      "border": border
    }}>{status}</Tag>
  }


  return <div>
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
        paddingLeft: 13
      }}>
        <h5 className="name" style={{
          color: "rgba(0, 0, 0, 0.7)",
          marginBottom: 0,
          fontSize: 15,
          boxSizing: "border-box",
          fontWeight: 550
        }}>Tìm kiếm chung</h5>
      </div>

      {/*<Popup visible={popupIsOpen}*/}
      {/*       onHiding={setPopUpClose}*/}
      {/*       title={currentWarning?.topicDescription}*/}
      {/*       showTitle={true}*/}
      {/*       fullScreen={false}*/}
      {/*       // contentRender={contenRender}*/}
      {/*       dragEnabled={false}*/}
      {/*       closeOnOutsideClick={true}*/}
      {/*>*/}
      {/*</Popup>*/}
      <Popup
        visible={popupVisible}
        onHiding={hideInfo}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showCloseButton={true}
        showTitle={true}
        title="Import đơn hàng"
        // container=".dx-viewport"
        width={"80%"}
        height={"auto"}
      // contentRender={renderPopupImport}
      >
        <ImportOrder />
      </Popup>


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
        <Toolbar>
          <ToolbarItem location="after">
            <Button hint="Thêm mới" icon="add" />
          </ToolbarItem>
          <ToolbarItem location="after">
            <Button hint="Upload file" icon="upload" onClick={showInfo} />
          </ToolbarItem>
          <ToolbarItem location="after">
            <Button hint="Refresh" icon="refresh" />
          </ToolbarItem>
          {/*<ToolbarItem name="addRowButton"/>*/}
          {/*<ToolbarItem name="revertButton"/>*/}
          {/*<ToolbarItem name="saveButton"/>*/}
          <ToolbarItem name="searchPanel" location="before" />
          {/*<ToolbarItem name="columnChooserButton"></ToolbarItem>*/}

        </Toolbar>
        <HeaderFilter visible={true} texts={{
          cancel: "Hủy bỏ",
          ok: "Đồng ý",
          emptyValue: "Rỗng"

        }} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} placeholder={"VD: PO"} />
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          displayMode={"full"}
          showInfo={true}
          showNavigationButtons={true}
          allowedPageSizes={[5, 10]}
          infoText="Trang số {0} trên {1} ({2} bản ghi)"
        />
        <Column caption={"Mã PO"} dataField={"saleOrderId"} alignment="center" width={100} />
        <Column caption={"Mã sản xuất"} dataField={"productionCode"} />
        <Column caption={"Tên khách hàng"} dataField={"customer"} />
        <Column caption={"Tên thẻ"} dataField={"cardName"} />
        <Column caption={"Số lượng"} dataField={"quantity"} />
        <Column caption={"Số lượng đã tính bù hao"} dataField={"totalQuantity"} />
        <Column caption={"Số HD/PO"} dataField={"contractNumber"} width={200} />
        <Column caption={"Ngày bắt đầu"} dataType="datetime" dataField={"startTime"}
          format="dd/MM/yyyy hh:mm:ss" />
        <Column caption={"Ngày kết thúc"} dataType="datetime" dataField={"finishTime"}
          format="dd/MM/yyyy hh:mm:ss" />
        <Column caption={"Ngày giao hàng"} dataType="datetime" dataField={"deliveryDate"}
          format="dd/MM/yyyy hh:mm:ss" />
        <Column caption={"Mức độ ưu tiên"} cellComponent={onPriorityRender} alignment={"center"} />
        <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
        <Column type={"buttons"} caption={"Thao tác"} alignment="left" />
        <Editing mode="popup" useIcons={true} allowUpdating={true} allowDeleting={true}
          texts={{
            cancelRowChanges: "Hủy bỏ",
            saveRowChanges: "Lưu lại",
            confirmDeleteTitle: 'Xác nhận xóa bản ghi',
            confirmDeleteMessage: 'Bạn chắc chắn muốn xóa bản ghi này?',
            deleteRow: "Xóa",
            editRow: "Sửa",
            addRow: "Thêm"
          }}
        >
          <Popup
            title="Thông tin chi tiết đơn hàng"
            showTitle={true}
            width={"80%"}
            height={"auto"}
          />
          <Form labelLocation="top" onEditorEnterKey={saveOrder} >
            <Item
              itemType="group"
              colCount={2}
              colSpan={2}
              caption="Thông tin chi tiết đơn hàng"
            >
              <Item dataField="saleOrderId" disabled={true} caption="Mã sx/Production Code" />
              <Item dataField="productionCode" disabled={true} caption="Mã sx/Production Code" />
              <Item dataField="customer" caption="Tên khách hàng" />
              <Item dataField="cardName" caption="Tên thẻ" />
              <Item dataField="quantity" caption="Số lượng" />
              <Item dataField="totalQuantity" caption="SL thẻ đã tính bù hao" />
              <Item dataField="contractNumber" caption="Số HD/PO" />
              <Item dataField="startTime" caption="Ngày bắt đầu" />
              <Item dataField="finishTime" caption="Ngày kết thúc" />
              <Item dataField="deliveryDate" caption="Ngày giao hàng" />
            </Item>
          </Form>
        </Editing>

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