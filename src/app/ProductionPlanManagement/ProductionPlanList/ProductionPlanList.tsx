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
    Toolbar, ColumnChooser, Button as ButtonIcon
} from "devextreme-react/data-grid";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { IWarning } from "../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../config";
import { customizeColor, getColor } from "../../../utils/utils";
import { Tag } from "antd";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";


const ROUTING_PATH = "/ProductionPlanList";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];
export const ProductionPlanList = () => {

    const [warnings, setWarnings] = useState<[]>();
    const [content, setContent] = useState<string>();
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
    const [currentWarning, setCurrentWarning] = useState<IWarning>()
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const mainStore = useMainStore();

    const handleHideUploadImport = () => {
        setPopupVisible(false)
    }

    const handleShowUploadImport = () => {
        setPopupVisible(true)
    }

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


    const onSelectedRowKeysChange = (e) => {
        if (e.data) {
            setCurrentWarning(e.data)
        }
    }
    const setPopUpOpen = () => {
        setPopupIsOpen(true);
    }
    const setPopUpClose = () => {
        setPopupIsOpen(false);
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const saveOrder = (data) => {
        console.log(data);
        console.log("click submit")
    }

    const handleAddFormTech = () => {
        setIsAddNewTechForm(true);
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

    return (
        <>
            {
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
                            }}>Danh sách kế hoạch sản xuất</h5>
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
                            onRowUpdating={updateOrder}
                            onRowRemoving={removeOrder}
                        >
                            <Toolbar>
                                <ToolbarItem location="after">
                                    <Button hint="Thêm mới" icon="add" text="Thêm mới" onClick={handleAddFormTech} />
                                </ToolbarItem>
                                <ToolbarItem location="after">
                                    <Button
                                        hint="Xuất Excel"
                                        icon="download"
                                        text="Xuất Excel" />
                                </ToolbarItem>
                                <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                <ToolbarItem name="searchPanel" location="before" />
                            </Toolbar>
                            <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} />
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
                            <SearchPanel visible={true} placeholder={"Tìm kiếm..."} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"full"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText="Trang số {0} trên {1} ({2} bản ghi)" />
                            <Column caption={"Mã WO"} dataField={"saleOrderId"} alignment="left" width={100} />
                            <Column caption={"Mã SO"} dataField={"productionCode"} />
                            <Column caption={"Mã PCN"} dataField={"productionCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"customer"} />
                            <Column caption={"Tên thẻ "} dataType="datetime" dataField={"startTime"} />
                            <Column caption={"Số lượng"} dataType="datetime" dataField={"deliveryDate"} />
                            <Column caption={"Số lượng bù hao"} dataField={"customer"} />
                            <Column caption={"Mã QR"} dataField={"customer"} />
                            <Column caption={"Mức độ ưu tiên"} dataField={"customer"} />
                            <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                            <Column type={"buttons"} caption={"Thao tác"} alignment="left" >
                                <ButtonIcon icon="add" />
                                <ButtonIcon icon="fill" />
                                <ButtonIcon icon="copy" />
                                <ButtonIcon icon="paste" />
                                <ButtonIcon icon="sun" />
                                <ButtonIcon icon="moon" />
                            </Column>
                        </DataGrid>
                    </div>
                </div>

            }
        </>
    )

}


registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: ProductionPlanList,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "productionPlanList"
});

export default ProductionPlanList;