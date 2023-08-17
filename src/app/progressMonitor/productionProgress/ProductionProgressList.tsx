import React, { useEffect, useState } from "react";
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
import { IWarning } from "../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../config";
import { ImportOrder } from "../../import/ImportOrder";
import { customizeColor, getColor } from "../../../utils/utils";
// import TechFormListDetail from "./TechFormListDetail";
import { Tooltip } from "devextreme-react/tooltip";
import { Tag } from "antd";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
// import TechProcedure from "./TechFormNewAdd/TechProcedure/TechProcedure";
import { ImportTechForm } from "../../import/ImportTechForm";


const ROUTING_PATH = "/productionProgressList";

export const ProductionProgressList = () => {

    const mainStore = useMainStore();
    const [content, setContent] = useState<string>();


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

    useEffect(() => {
        loadOrders()
    }, [])

    const handleAddFormTech = () => {
    }


    const showInfo = () => {
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


    const saveOrder = (data) => {
    }


    const getProductOrderItemTemplate = row => {
    };

    return (
        <>
            <div>
                <div className="table-responsive">
                    <div className="informer" style={{
                        background: "#fff",
                        textAlign: "center",
                        paddingTop: 12
                    }}>
                        <h5 className="name" style={{
                            fontSize: 18,
                            marginBottom: 0
                        }}>Giám sát tiến độ sản xuất</h5>
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
                </div>
            </div>

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
            // onSelectionChanged={onSelectedRowKeysChange}
            // onRowClick={onSelectedRowKeysChange}
            // onRowUpdating={updateOrder}
            // onRowRemoving={removeOrder}
            >
                <Toolbar>
                    <ToolbarItem location="after">
                        <Button text="Xuất Excel" hint="Xuất Excel" icon="download">
                        </Button>
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
                <SearchPanel visible={true} placeholder={"Tìm kiếm"} />
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    displayMode={"full"}
                    showInfo={true}
                    showNavigationButtons={true}
                    allowedPageSizes={[5, 10]}
                    infoText="Trang số {0} trên {1} ({2} bản ghi)"
                />
                <Column caption={"Mã PO"} dataField={"saleOrderId"} />
                <Column caption={"Mã SO"} />
                <Column caption={"Mã sản xuất"} />
                <Column caption={"Tên khách hàng"} alignment="center" />
                <Column caption={"Tên thẻ"} dataField={"productionCode"} />
                <Column caption={"Sản lượng dự kiến"} dataField={"customer"} alignment="right" />
                <Column caption={"Sản lượng hoàn thành"} alignment="right" />
                <Column caption={"Tỉ lệ hoàn thành"} alignment="right" />
                <Column caption={"Tỉ lệ lỗi"} alignment="right" />
                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                <Column type="buttons" width={110}>
                    <Button hint="Clone" icon="copy" />
                </Column>
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
                //   component={getProductOrderItemTemplate}
                // autoExpandAll={true}
                />
            </DataGrid>
        </>
    )
}


registerScreen({
    caption: "Giám sát tiến độ sản xuất",
    component: ProductionProgressList,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "productionProgressList"
});

export default ProductionProgressList;