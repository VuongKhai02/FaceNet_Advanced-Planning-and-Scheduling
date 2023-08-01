import React, {useEffect, useState} from "react";

// @ts-ignore
import {Button, DataGrid, Popup} from "devextreme-react";
import {
  Column,
  FilterRow,
  HeaderFilter,
  Item as ToolbarItem,
  Pager,
  Paging,
  SearchPanel,
  Toolbar,

} from "devextreme-react/data-grid";
import axios from "axios";
import {useMainStore} from "@haulmont/jmix-react-core";
import {registerScreen} from "@haulmont/jmix-react-ui";
import {IWarning} from "../shared/model/Warning.model";
import {PLANNING_API_URL} from "../../config";

const ROUTING_PATH = "/mrporders";

export const MrpSaleOrders = () => {

  const [warnings, setWarnings] = useState<[]>();
  const [content, setContent] = useState<string>();
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
  const [currentWarning, setCurrentWarning] = useState<IWarning>()

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


  function renderWaringDetail(data: any) {
    return <div>
      {/*data.data.id*/}
      <Button icon="search" onClick={setPopUpOpen}/>
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
    axios.get(PLANNING_API_URL + '/api/orders', {headers})
      .then(response => {
          if (response.status === 200) {
            // console.log(response.data)
            setContent(response.data.data)
          }
        }
      );
  }

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

  const contenRender = (data) => {
    // return <WarningDetail warningDetail={currentWarning} />
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
        }}>Danh sách phiếu công nghệ</h5>
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

      <Popup visible={popupIsOpen}
             onHiding={setPopUpClose}
             title={currentWarning?.topicDescription}
             showTitle={true}
             fullScreen={false}
             // contentRender={contenRender}
             dragEnabled={false}
             closeOnOutsideClick={true}
      >
      </Popup>

      <DataGrid
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
      >
        <Toolbar>
          <ToolbarItem location="after">
            <Button hint="Thêm mới"  icon="add" />
          </ToolbarItem>
          <ToolbarItem location="after">
            <Button hint="Upload file" icon="upload" />
          </ToolbarItem>
          <ToolbarItem location="after">
            <Button hint="Refresh" icon="refresh" />
          </ToolbarItem>
          {/*<ToolbarItem name="addRowButton"/>*/}
          {/*<ToolbarItem name="revertButton"/>*/}
          {/*<ToolbarItem name="saveButton"/>*/}
          {/*<ToolbarItem name="searchPanel" location="before"/>*/}
          {/*<ToolbarItem name="columnChooserButton"></ToolbarItem>*/}

        </Toolbar>
        <HeaderFilter visible={true} texts={{
          cancel: "Hủy bỏ",
          ok: "Đồng ý",
          emptyValue: "Rỗng"

        }}/>
        <FilterRow visible={true}/>
        <SearchPanel visible={true}/>
        <Paging defaultPageSize={10}/>
        <Pager
          visible={true}
          displayMode={"full"}
          showInfo={true}
          showNavigationButtons={true}
          allowedPageSizes={[5, 10]}
          infoText="Trang số {0} trên {1} ({2} bản ghi)"
        />
        <Column caption={"Thao tác"} cellRender={renderWaringDetail}/>
        <Column caption={"Trạng thái"} />
        <Column caption={"Mã đơn hàng"} dataField={"saleOrderId"}/>
        <Column caption={"Mã sản xuất"} dataField={"productionCode"}/>
        <Column caption={"Tên khách hàng"} dataField={"customer"} />
        <Column caption={"Tên thẻ"} dataField={"cardName"}/>
        <Column caption={"Số lượng"} dataField={"quantity"}/>
        <Column caption={"Số lượng đã tính bù hao"} dataField={"totalQuantity"}/>
        <Column caption={"Số HD/PO"} dataField={"contractNumber"} width={200}/>
        <Column caption={"Ngày bắt đầu"} dataType="datetime" dataField={"datetime"}
                format="dd/MM/yyyy hh:mm:ss"/>
        <Column caption={"Ngày kết thúc"} dataType="datetime" dataField={"finishTime"}
                format="dd/MM/yyyy hh:mm:ss"/>
        <Column caption={"Ngày giao hàng"} dataType="datetime" dataField={"deliveryDate"}
                format="dd/MM/yyyy hh:mm:ss"/>
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