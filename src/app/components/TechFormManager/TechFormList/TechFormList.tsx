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
    MasterDetail,
    Editing,
    Form,
} from "devextreme-react/data-grid";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { IWarning } from "../../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../../config";
import { customizeColor, getColor } from "../../../../utils/utils";
import TechFormListDetail from "./TechFormListDetail";
import { Tag } from "antd";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import TechFormBodyCard from "./TechFormNewAdd/TechFormBodyCard/TechFormBodyCard";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";

const ROUTING_PATH = "/techFormList";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, "all"];
export const TechFormList = () => {
    const [warnings, setWarnings] = useState<[]>();
    const [content, setContent] = useState<string>();
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
    const [currentWarning, setCurrentWarning] = useState<IWarning>();
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const mainStore = useMainStore();

    const handleHideUploadImport = () => {
        setPopupVisible(false);
    };

    const handleShowUploadImport = () => {
        setPopupVisible(true);
    };

    const loadOrders = () => {
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        axios.get(PLANNING_API_URL + "/api/orders", { headers }).then((response) => {
            if (response.status === 200) {
                // console.log(response.data)
                setContent(response.data.data);
            }
        });
    };

    const getProductOrderItemTemplate = (row) => {
        return (
            <TechFormListDetail
                data={row.data}
                // productsFullArrays={this.state.productsFullArrays}
                // reasons={this.state.reasonList}
            />
        );
    };

    const onSelectedRowKeysChange = (e) => {
        if (e.data) {
            setCurrentWarning(e.data);
        }
    };
    const setPopUpOpen = () => {
        setPopupIsOpen(true);
    };
    const setPopUpClose = () => {
        setPopupIsOpen(false);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const saveOrder = (data) => {
        console.log(data);
        console.log("click submit");
    };

    const handleAddFormTech = () => {
        setIsAddNewTechForm(true);
    };

    const updateOrder = (e) => {
        // return <WarningDetail warningDetail={currentWarning} />
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        console.log(e);
        let data = JSON.stringify(e.newData);
        axios.put(PLANNING_API_URL + "/api/orders/" + e.oldData.saleOrderId, data, { headers }).then((response) => {
            if (response.status === 200) {
                notify(
                    {
                        message: "Cập nhật thành công!",
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            } else {
                notify(
                    {
                        message: "Cập nhật thất bại!",
                        width: 450,
                    },
                    "error",
                    3000,
                );
            }
        });
    };
    const removeOrder = (e) => {
        // return <WarningDetail warningDetail={currentWarning} />
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        console.log(e);
        let data = JSON.stringify(e.newData);
        axios.delete(PLANNING_API_URL + "/api/orders/" + e.data.saleOrderId, { headers }).then((response) => {
            if (response.status === 200) {
                notify(
                    {
                        message: "Xóa thành công đơn hàng!",
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            } else {
                notify(
                    {
                        message: "Xóa thất bại!",
                        width: 450,
                    },
                    "error",
                    3000,
                );
            }
        });
    };

    const onStatusPoRender = (rowInfo) => {
        let customColor: {
            color: string;
            backgroundColor: string;
        } = {
            color: "",
            backgroundColor: "",
        };
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
                    status = "Chờ sản xuất";
                    break;
                case "complete":
                    status = "Hoàn thành";
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành";
                    break;
                case "in_production":
                    status = "Đang sản xuất";
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm";
                    break;
                case "delay":
                    status = "Chậm tiến độ";
                    break;
                case "unknown":
                    status = "Chưa xác định";
                    break;
                case "wait_production":
                    status = "Chờ sản xuất";
                    break;
                case "stop":
                    status = "Ngưng sản xuất";
                    break;
                default:
                    status = "Chưa xác định";
                    break;
            }
        };

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status);
        border = "1px solid " + customColor.color;
        // const color = getColor(rowInfo.data.data.processStatus)
        // return <Tag color={color}>{status}</Tag>
        return (
            <Tag
                style={{
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    color: customColor.color,
                    backgroundColor: customColor.backgroundColor,
                    // "padding": padding,
                    borderRadius: "4px",
                    // "width": width,
                    border: border,
                }}>
                {status}
            </Tag>
        );
    };

    const onPriorityRender = (rowInfo) => {
        // console.log("Data color,", data?.value)
        let customColor: {
            color: string;
            backgroundColor: string;
        } = {
            color: "",
            backgroundColor: "",
        };
        let status = "";
        // let backgroundColor = "";
        let padding = "";
        let borderRadius = "";
        let width = "";
        let border = "";

        // let value = rowInfo.data.data.processStatus;
        status = "1";

        getColor(status);
        customColor = customizeColor(status);
        border = "1px solid " + customColor.color;
        // const color = getColor(rowInfo.data.data.processStatus)
        // return <Tag color={color}>{status}</Tag>
        return (
            <Tag
                style={{
                    fontWeight: "bold",
                    width: "50%",
                    textAlign: "center",
                    color: customColor.color,
                    backgroundColor: customColor.backgroundColor,
                    // "padding": padding,
                    borderRadius: "4px",
                    // "width": width,
                    border: border,
                }}>
                {status}
            </Tag>
        );
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechFormBodyCard isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
                <div>
                    <div className='table-responsive'>
                        <div
                            className='informer'
                            style={{
                                background: "#fff",
                                textAlign: "center",
                                paddingTop: 12,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                }}>
                                Danh sách phiếu công nghệ
                            </h5>
                        </div>
                        <div
                            className='informer'
                            style={{
                                backgroundColor: "#ffffff",
                                paddingLeft: 13,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 0,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                }}>
                                Tìm kiếm chung
                            </h5>
                        </div>
                        <PopupImportFile
                            visible={popupVisible}
                            onCancel={() => setPopupVisible(false)}
                            title={"Import file"}
                            onSubmit={() => {}}
                            width={900}
                        />
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
                            onRowRemoving={removeOrder}>
                            <Toolbar>
                                <ToolbarItem location='after'>
                                    <Button hint='Thêm mới' icon='add' onClick={handleAddFormTech} />
                                </ToolbarItem>
                                <ToolbarItem location='after'>
                                    <Button hint='Upload file' icon='upload' onClick={handleShowUploadImport} />
                                </ToolbarItem>
                                <ToolbarItem location='after'>
                                    <Button hint='Refresh' icon='refresh' />
                                </ToolbarItem>
                                <ToolbarItem name='searchPanel' location='before' />
                            </Toolbar>
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                                allowSearch={true}
                            />
                            <FilterRow visible={true} />
                            <SearchPanel visible={true} placeholder={"VD: PO"} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />
                            <Column caption={"Mã PO"} dataField={"saleOrderId"} alignment='left' width={100} />
                            <Column caption={"Mã khách hàng"} dataField={"productionCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"customer"} />
                            <Column caption={"Ngày đặt hàng"} dataType='datetime' dataField={"startTime"} format='dd/MM/yyyy hh:mm:ss' />
                            <Column
                                caption={"Ngày giao hàng"}
                                dataType='datetime'
                                dataField={"deliveryDate"}
                                format='dd/MM/yyyy hh:mm:ss'
                            />
                            <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                            <Column type={"buttons"} caption={"Thao tác"} alignment='center' />
                            <Editing
                                mode='popup'
                                useIcons={true}
                                allowDeleting={true}
                                texts={{
                                    cancelRowChanges: "Hủy bỏ",
                                    saveRowChanges: "Lưu lại",
                                    confirmDeleteTitle: "Xác nhận xóa bản ghi",
                                    confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                                    deleteRow: "Xóa",
                                    editRow: "Sửa",
                                    addRow: "Thêm",
                                }}>
                                <Popup title='Thông tin chi tiết đơn hàng' showTitle={true} width={"80%"} height={"auto"} />
                                <Form labelLocation='top' onEditorEnterKey={saveOrder}>
                                    <Item itemType='group' colCount={2} colSpan={2} caption='Thông tin chi tiết đơn hàng'>
                                        <Item dataField='saleOrderId' disabled={true} caption='Mã sx/Production Code' />
                                        <Item dataField='productionCode' disabled={true} caption='Mã sx/Production Code' />
                                        <Item dataField='customer' caption='Tên khách hàng' />
                                        <Item dataField='cardName' caption='Tên thẻ' />
                                        <Item dataField='quantity' caption='Số lượng' />
                                        <Item dataField='totalQuantity' caption='SL thẻ đã tính bù hao' />
                                        <Item dataField='contractNumber' caption='Số HD/PO' />
                                        <Item dataField='startTime' caption='Ngày bắt đầu' />
                                        <Item dataField='finishTime' caption='Ngày kết thúc' />
                                        <Item dataField='deliveryDate' caption='Ngày giao hàng' />
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
            )}
        </>
    );
};

registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: TechFormList,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
    screenId: "techFormList",
});

export default TechFormList;
