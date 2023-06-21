import React, {useCallback, useEffect, useState} from "react";
import {DataGrid} from "devextreme-react";
import BusinessLogService from "../services/BusinessLogService";
import {Column, Lookup, Pager, Paging} from "devextreme-react/data-grid";

const allowedPageSizes = [10, 15, 'all'];


const actionList = [
  {"actionCode":"SCADA_RECEIVE","actionName":"Cập nhật sản lượng Scada"},
  {"actionCode":"IMPORT_ORDER","actionName":"Import PO"},
  {"actionCode":"INSERT_PRODUCT","actionName":"Thêm mới sản phẩm"},
  {"actionCode":"EDIT_PRODUCT","actionName":"Cập nhật sản phẩm"},
  {"actionCode":"REMOVE_PRODUCT","actionName":"Xóa sản phẩm"},
  {"actionCode":"REMOVE_PRODUCT_ORDER","actionName":"Xóa PO"},
  {"actionCode":"QMS_SEND_QUANTITY","actionName":"Cập nhật sản lượng QMS"},
  {"actionCode":"APPROVE_PRODUCT_ORDER","actionName":"Phê duyệt đơn hàng"},
  {"actionCode":"CREATE_WO","actionName":"Tạo mới WO"},
  {"actionCode":"SEND_SCADA","actionName":"Gửi Scada"},
  {"actionCode":"DELETE_WORK_ORDER","actionName":"Xóa WO"},
  {"actionCode":"EDIT_PRODUCT_ORDER","actionName":"Chỉnh sửa PO"},
  {"actionCode":"EDIT_WORK_ORDER","actionName":"Chỉnh sửa WO"},
]
export const BusinessLogPopup = (props) => {

  const [data,setData] = useState<any[]>([])

  useEffect(() => {
    BusinessLogService.loadByWoId(props.woId,setData);
  }, [props]);

  return <DataGrid
    rowAlternationEnabled={false}
    dataSource={data}
    showBorders={true}
    columnAutoWidth={true}
    keyExpr={"id"}
    height={"500"}
    className={"second-group"}
    wordWrapEnabled={false}
    showRowLines={true}
    allowColumnResizing={true}
    >
    <Paging defaultPageSize={10}/>
    <Pager
      visible={true}
      allowedPageSizes={allowedPageSizes}
      displayMode={"full"}
      showPageSizeSelector={true}
      showInfo={true}
      showNavigationButtons={true}/>
    <Column dataField="woId"
            minWidth={160}
            caption="Primary Id">
    </Column>
    <Column dataField="actionName"
            minWidth={180}
            caption="Action Name">
      <Lookup dataSource={actionList} displayExpr={"actionName"}
              valueExpr={"actionCode"}/>
    </Column>
    <Column dataField="referenceId"
            caption="Reference Id">
    </Column>
    <Column dataField="startTime"
            dataType="datetime"
            format={"dd-MM-yyyy HH:mm:ss"}
            width={190}
            caption="Start Time">
    </Column>
    <Column dataField="endTime"
            dataType="datetime"
            format={"dd-MM-yyyy HH:mm:ss"}
            width={190}
            caption="End Time">
    </Column>
    <Column dataField="duration"
            caption="Duration">
    </Column>
    {/*<Column dataField="errorCode"*/}
    {/*        caption="Error Code">*/}
    {/*</Column>*/}

    {/*<Column dataField="errorDescription"*/}
    {/*        caption="Error Description">*/}
    {/*</Column>*/}
    <Column dataField="userName"
            caption="User Name">
    </Column>
    <Column dataField="outData"
            caption="Data">
    </Column>
  </DataGrid>
}