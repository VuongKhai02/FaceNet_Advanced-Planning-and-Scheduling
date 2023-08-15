import React, { useEffect, useState } from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
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
import { customizeColor } from "../../../utils/utils";
import { Modal, Tag } from "antd";
import notify from "devextreme/ui/notify";
import InfoRow from "../../shared/components/InfoRow/InfoRow";


const ROUTING_PATH = "/DnlNvlList";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

const data = [
    { no: '1', codeMaterial: '1C01CBANK000021', nameMaterial: 'Chíp vàng 6 chân S3D350AACS-6GK6DEA(U-MA/VI/VC) load Visa Master', quantity: '1500', unit: 'Cái' },
    { no: '2', codeMaterial: '1C02P0.15TQ0010', nameMaterial: 'Tấm nhựa PVC B trong suốt, kt: 0.15x480x590mm', quantity: '1500', unit: 'Cái' },
    { no: '2', codeMaterial: '1C02P0.15YS0003', nameMaterial: 'PVC bạc 7 màu (rainbow bạc) kt 295*480*0.15 - boyuan', quantity: '1500', unit: 'Cái' }


]
export const DnlNvlList = () => {

    const [content, setContent] = useState<string>();
    const [currentWarning, setCurrentWarning] = useState<IWarning>()
    const mainStore = useMainStore();
    const [isVisibleAdd, setIsVisibleAdd] = React.useState<boolean>(false);

    const [isViewMaterial, setIsViewMaterial] = React.useState<boolean>(false);

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
                            }}>Danh sách đề nghị lĩnh nguyên vật liệu</h5>
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
                        <div>
                            <DataGrid
                                key={'saleOrderId'}
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
                                <SearchPanel visible={true} placeholder={"Tìm kiếm..."} width={300} />
                                <Paging defaultPageSize={5} />
                                <Pager
                                    visible={true}
                                    allowedPageSizes={allowedPageSizes}
                                    displayMode={"compact"}
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
                                <Column caption={"Bom version"} dataField={"customer"} />
                                <Column caption={"Mức độ ưu tiên"} dataField={"customer"} />
                                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                                <Column type={"buttons"} caption={"Thao tác"} alignment="center" >
                                    <ButtonIcon icon="eyeopen" onClick={() => { setIsViewMaterial(true) }} />
                                    <ButtonIcon icon="trash" />
                                </Column>
                            </DataGrid>
                        </div>

                        {/* Xem nguyên vật liệu */}

                        <Popup
                            visible={isViewMaterial}
                            title="Xem danh sách nguyên vật liệu cần lĩnh"
                            onHiding={() => { setIsViewMaterial(false) }}
                            width={1500}
                            height={800}
                        >
                            <div>
                                <div>
                                    <table
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-arround"
                                        }}>
                                        <td>
                                            <InfoRow label='Tên thẻ/Card Name' data='Phôi thẻ Visa Credit Classic, TP Bank, T8/2022' />
                                            <InfoRow label='Bom version' data='1.1' />
                                        </td>
                                        <td>
                                            <InfoRow label='Mã PCN' data='PCN-123' />
                                            <InfoRow label='Mã SO' data='SO-T82023' />
                                        </td>
                                    </table>
                                </div>
                                <div style={{ marginTop: 40 }}><h4>Danh sách nguyên vật liệu cần lĩnh</h4></div>
                            </div>
                            <DataGrid
                                key={'no'}
                                keyExpr={"no"}
                                dataSource={data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}
                            >
                                <Paging defaultPageSize={5} />
                                <Pager
                                    visible={true}
                                    allowedPageSizes={allowedPageSizes}
                                    displayMode={"compact"}
                                    showPageSizeSelector={true}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    infoText="Trang số {0} trên {1} ({2} bản ghi)" />
                                <HeaderFilter visible={true} texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng"

                                }} allowSearch={true} />
                                <FilterRow visible={true} />
                                <Paging defaultPageSize={5} />
                                <Column caption={"No."} dataField={"no"} alignment="left" width={100} />
                                <Column caption={"Mã vật tư"} dataField={"codeMaterial"} />
                                <Column caption={"Tên vật tư"} dataField={"nameMaterial"} />
                                <Column caption={"Số lượng"} dataField={"quantity"} />
                                <Column caption={"Đơn vị tính"} dataField={"unit"} />
                            </DataGrid>
                            <div
                                className="toolbar"
                                style={{
                                    marginTop: 15,
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "center",
                                    background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Button
                                    text="Hủy bỏ"
                                    style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                                />
                                <Button
                                    text="Gửi đề nghị lĩnh"
                                    style={{ backgroundColor: "#FF7A00", color: "#fff" }}
                                />
                            </div>
                        </Popup>
                    </div>
                </div>
            }
        </>
    )

}


registerScreen({
    caption: "Danh sách đề nghị lĩnh nguyên vật liệu",
    component: DnlNvlList,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "dnlNvlList"
});

export default DnlNvlList;