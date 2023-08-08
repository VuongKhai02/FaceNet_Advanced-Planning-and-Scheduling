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
    Editing, Form, Selection, ColumnChooser, Button as ButtonB
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
import TechProcedure from "../TechFormList/TechFormNewAdd/TechProcedure/TechProcedure";
import { OrderItem } from "../../../fake_data/OrderItem";
import TechFormUpdate from "../TechFormUpdate/TechFormUpdate";


const ROUTING_PATH = "/TechFormApprove";

export const TechFormApprove = () => {

    const [, setContent] = useState<string>();
    const [, setCurrentWarning] = useState<IWarning>()
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const mainStore = useMainStore();
    const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

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

    useEffect(() => {
        loadOrders()
    }, [])

    const saveOrder = (data) => {
        // return <WarningDetail warningDetail={currentWarning} />
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


    const handleTechFormUpdate = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {
                isAddNewTechForm ?
                    <TechFormUpdate
                        isOpen={isAddNewTechForm}
                        setClose={() => setIsAddNewTechForm(false)} /> :
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
                                }}>Phê duyệt phiếu công nghệ</h5>
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
                                key="id"
                                keyExpr={"id"}
                                dataSource={OrderItem}
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
                                    <ToolbarItem >
                                        <Button
                                            // style={{ border: 'none' }}
                                            icon="download"
                                            text="Xuất Excel" />
                                    </ToolbarItem>
                                    <ToolbarItem name="searchPanel" location="before" />
                                    <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                </Toolbar>
                                <HeaderFilter visible={true} texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng"

                                }} />
                                <FilterRow visible={true} />
                                <SearchPanel visible={true} placeholder={"VD: PO"} />
                                <Paging defaultPageSize={10} />
                                <ColumnChooser enabled={true} />
                                <Pager
                                    visible={true}
                                    allowedPageSizes={allowedPageSizes}
                                    displayMode={"full"}
                                    showPageSizeSelector={true}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    infoText="Trang số {0} trên {1} ({2} bản ghi)" />
                                <Selection mode="multiple" />
                                <Column dataField="productCode"
                                    minWidth={140}
                                    caption="Mã phiếu công nghệ"
                                // cellRender={getProductCode}
                                >
                                </Column>
                                <Column dataField="productName"
                                    caption="Tên thẻ"
                                    // cellRender={getProductName}
                                    minWidth={200}
                                >
                                </Column>

                                <Column dataField="quantity"
                                    minWidth={140}
                                    caption="Số lượng"
                                    alignment="right"
                                >
                                </Column>

                                <Column dataField="startDate"
                                    caption="Ngày bắt đầu"
                                    format={"dd/MM/yyyy"}
                                    dataType="datetime"
                                    alignment={"center"}
                                    minWidth={140}
                                    hidingPriority={0}
                                >

                                </Column>
                                <Column dataField="endDate"
                                    caption="Ngày kết thúc"
                                    dataType="datetime"
                                    format={"dd/MM/yyyy"}
                                    alignment={"center"}
                                    minWidth={140}
                                    hidingPriority={1}
                                >
                                </Column>
                                <Column dataField="createdBy" caption="Người tạo" />
                                <Column dataField="checkBy" caption="Người kiểm tra" />
                                <Column
                                    dataField="priority"
                                    alignment={"left"}
                                    caption={"Mức độ ưu tiên"}
                                    width={140}
                                    renderAsync={true}
                                >
                                </Column>
                                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                                <Column type={'buttons'} caption={"Thao tác"} alignment="left" >
                                    <ButtonB icon="eyeopen" onClick={handleTechFormUpdate} />
                                    <ButtonB icon='check' />
                                    <ButtonB icon='clear' />
                                    <ButtonB icon='add' />
                                    <ButtonB icon='trash' />
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
                            </DataGrid>
                            <div
                                className="toolbar"
                                style={{
                                    marginTop: 15,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "#f2f2f2",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Button
                                    text="Từ chối"
                                    style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                                />
                                <Button
                                    text="Phê duyệt"
                                    style={{ backgroundColor: "#FF7A00", color: "#fff" }}
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    )

}


registerScreen({
    caption: "Phê duyệt phiếu công nghệ",
    component: TechFormApprove,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "techFormApprove"
});

export default TechFormApprove;