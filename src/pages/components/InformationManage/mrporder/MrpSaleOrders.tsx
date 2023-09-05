import React, { useEffect } from "react";
import "./MrpSaleOrder.css"

// @ts-ignore
import { Button, DataGrid, Popup } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    MasterDetail, ColumnChooser
} from "devextreme-react/data-grid";
import { PLANNING_API_URL } from "../../../../utils/config";
import { getColor, customizeColor } from "../../../../utils/utils";
import OrderItemTemplate from "./OrderItemTemplate";
import { Tag } from "antd";
import notify from "devextreme/ui/notify";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { WarningOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import httpRequests from "../../../../utils/httpRequests";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";

const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];
export const MrpSaleOrders = () => {

    const [content, setContent] = React.useState<string>();
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const [isVisibleConfirmDelete, setIsVisibleConfirmDelete] = React.useState<boolean>(false);

    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "info-manage",
                        title: "Quản lý thông tin",
                    },
                    {
                        key: "product-order-manager",
                        title: "Quản lý đơn hàng",
                    }
                ]
            })
        }
    }, []);
    const loadOrders = () => {
        httpRequests.get('/api/orders')
            .then(response => {
                if (response.status === 200) {
                    setContent(response.data.data)
                }
            }
            );
    }


    const getProductOrderItemTemplate = (row: any) => {
        return (
            <OrderItemTemplate
                data={row.data}
            />
        );
    };

    useEffect(() => {
        loadOrders()
    }, [])

    const updateOrder = (e: any) => {
        let data = JSON.stringify(e.newData);
        httpRequests.put('/api/orders/' + e.oldData.saleOrderId, data)
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
    const removeOrder = (e: any) => {
        httpRequests.delete('/api/orders/' + e.data.saleOrderId)
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

    const onStatusPoRender = (rowInfo: any) => {
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
        let border = "";

        const getColor = (value: any) => {
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

    const onPriorityRender = () => {
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
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
                        <SvgIcon onClick={() => setIsVisibleImportFile(true)} text="Import file" tooltipTitle="Import file" sizeIcon={17} textSize={17} icon="assets/icons/ImportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
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
                    }
                    fixed={true}
                    fixedPosition="right"
                >
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
export default MrpSaleOrders;