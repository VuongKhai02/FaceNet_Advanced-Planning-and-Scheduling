import React, {useEffect, useState} from "react";

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
import {useMainStore} from "@haulmont/jmix-react-core";
import {registerScreen} from "@haulmont/jmix-react-ui";
import WarningDetail from "./WarningDetail";
import {print, str} from "../../utils/utils";
import {IWarning} from "../shared/model/Warning.model";

const ROUTING_PATH = "/warnings";

export const Warning = () => {

  // const loading = useAppSelector(selectLoading);
  const [warnings, setWarnings] = useState<[]>();
  const [token, setToken] = useState<string>("");
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
        case "2":
          status = "Chờ gửi đối chiếu NVL"
          color = "rgba(175, 25, 228, 1)"
          backgroundColor = "rgba(175, 25, 228, 0.1)"
          padding = "3px 15px"
          borderRadius = "4px"
          border = "1px solid rgba(175, 25, 228, 0.5)"
          width = "173px"
          break;
        case "3":
          status = "Đã gửi SAP"
          color = "rgba(0, 151, 15, 1)"
          backgroundColor = "rgba(17, 168, 32, 0.1)"
          padding = "3px 18px"
          borderRadius = "4px"
          border = "1px solid rgba(0, 151, 15, 0.5)"
          width = "105px"
          break
        case "Nghiêm trọng":
          status = "Nghiêm trọng"
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
          status = value
          color = "rgba(0, 0, 0, 0.6)"
          backgroundColor = "rgba(0, 0, 0, 0.05)"
          padding = "3px 15px"
          borderRadius = "4px"
          width = "85px"
          border = "1px solid rgba(0, 0, 0, 0.5)"

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

  const onStatusHinhThucRender = (data) => {
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
        case "0":
          status = "Bản thảo"
          color = "rgba(0, 0, 0, 0.6)"
          backgroundColor = "rgba(0, 0, 0, 0.05)"
          padding = "3px 15px"
          borderRadius = "4px"
          width = "85px"
          border = "1px solid rgba(0, 0, 0, 0.5)"
          break;
        case "Telegram":
          status = "Telegram"
          color = "rgba(53, 171, 231, 1)"
          backgroundColor = "rgba(53, 171, 231, 0.1)"
          padding = "3px 15px"
          borderRadius = "4px"
          width = "125px"
          border = "1px solid rgba(228, 184, 25, 0.5)"
          break;
        case "Forum":
          status = "Forum"
          color = "rgba(175, 25, 228, 1)"
          backgroundColor = "rgba(175, 25, 228, 0.1)"
          padding = "3px 15px"
          borderRadius = "4px"
          border = "1px solid rgba(175, 25, 228, 0.5)"
          width = "173px"
          break;
        case "Tất cả":
          status = "Tất cả"
          color = "rgba(0, 151, 15, 1)"
          backgroundColor = "rgba(17, 168, 32, 0.1)"
          padding = "3px 18px"
          borderRadius = "4px"
          border = "1px solid rgba(0, 151, 15, 0.5)"
          width = "105px"
          break
        case "Nghiêm trọng":
          status = "Nghiêm trọng"
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

  const loadWarnings = () => {
    // const headers = {
    //   'Authorization': 'Bearer ' + mainStore.authToken,
    //   'content-type': 'application/json'
    // };
    // axios.get(PLANNING_API_URL + '/api/warnings/all', {headers})
    //   .then(response => {
    //       if (response.status === 200) {
    //         setWarnings(response.data.data)
    //       }
    //     }
    //   );
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

  // useEffect(() => {
  //   loadWarnings()
  // }, [])

  const contenRender = (data) => {
    print("------------------------------------")
    return <WarningDetail warningDetail={currentWarning} />
  }

  return <div>
    {/*<input type="text" value={token} onChange={(e) => setToken(e.target.value)}/>*/}
    {/*<button onClick={() => dispatch(getWarnings(token))}>Get Warnings</button>*/}
    <div className="table-responsive">
      <div className="informer" style={{
        background: "#fff",
        textAlign: "center",
        paddingTop: 12
      }}>
        <h5 className="name" style={{
          fontSize: 18,
          marginBottom: 0
        }}>TABLE CONTENT</h5>
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
        // titleComponent={() => { return <div>Thêm mới đề nghị lĩnh nguyên vật liệu Panacim</div> }}
             showTitle={true}
             fullScreen={false}
             contentRender={contenRender}
             dragEnabled={false}
             closeOnOutsideClick={true}

      >
      </Popup>

      <DataGrid
        keyExpr={"id"}
        dataSource={warnings}
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
            <Button icon="refresh" hint="Refresh" onClick={refresh}/>
          </ToolbarItem>
          <ToolbarItem name="addRowButton"/>
          <ToolbarItem name="revertButton"/>
          <ToolbarItem name="saveButton"/>
          <ToolbarItem name="searchPanel" location="before"/>
          <ToolbarItem name="columnChooserButton"></ToolbarItem>
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
        <Column caption={""} cellRender={renderWaringDetail}/>
        <Column caption={"ID"} dataField={"id"}/>
        <Column caption={"Mức độ"} dataField={"level"} cellRender={onStatusRender}/>
        <Column caption={"Hệ thống"} dataField={"system"}/>
        <Column caption={"Mã hạng mục"} dataField={"topic"}/>
        <Column caption={"Tên hạng mục"} dataField={"topicDescription"}/>
        <Column caption={"Nội dung"} dataField={"content"} width={200}/>
        <Column caption={"Hình thức"} dataField={"warningType"} cellRender={onStatusHinhThucRender}/>
        <Column caption={"Thời gian"} dataType="datetime" dataField={"warningDate"}
                format="dd/MM/yyyy hh:mm:ss"/>
      </DataGrid>
    </div>
  </div>
}

registerScreen({
  component: Warning,
  caption: "Warnings",
  screenId: "Warnings",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default Warning;