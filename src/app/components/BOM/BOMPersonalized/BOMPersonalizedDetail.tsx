import { locale, loadMessages } from "devextreme/localization";
import React, { useEffect, useState } from "react";
import { OrderItem } from "../../../../fake_data/OrderItem";
import DataGrid, {
    Column, FilterRow, HeaderFilter, SearchPanel,
    Editing,
    Popup,
    Selection,
    Lookup,
    Form,
    Toolbar,
    Item as TItem, Paging, Pager, OperationDescriptions, Button
} from 'devextreme-react/data-grid';

import { Item } from 'devextreme-react/form';
import { Tag } from "antd";
import PopupSendSAP from "../../../shared/components/PopupSendSAP/PopupSendSAP";
import { WarningOutlined } from "@ant-design/icons";

const getProductName = (rowData) => {
    if (rowData.data.status && rowData.data.status === 'created_wo') {
        return <div className="product_name_created_wo">{rowData.data.productName}</div>
    }
    return <div>{rowData.data.productName}</div>
}

const getProductCode = (rowData) => {
    if (rowData.data.status && rowData.data.status === 'created_wo') {
        return <div className="product_name_created_wo">{rowData.data.productCode}</div>
    }
    return <div>{rowData.data.productCode}</div>
}

const setProductSelectionValue = (rowData, value) => {
    rowData.productCode = value.productCode
    rowData.productName = value.productName
    rowData.bomVersion = value.bomVersion
    rowData.sapUrl = value.uDocurl
    rowData.sapUrl2 = value.uDocurl2
}

const onCellPrepared = (e) => {
    if (e.rowType == "data" && e.column.dataField == "completePercent") {
        if (e.data.completePercent > 5)
            e.cellElement.className += " cls";
    }
}


const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];
export const BOMPersonalizedDetail = React.memo((props: any) => {
    const [isModalVisibleSendSAP, setIsModalVisibleSendSAP] = React.useState<boolean>(false);

    const loadProductOrderItem = () => { }
    const loadProduct = () => { }

    useEffect(() => {
        loadProduct();
        loadProductOrderItem();
        loadBranchGroup();
    }, [])

    const onEdit = async (data) => { }
    const onDelete = (data) => { }
    const onInsert = async (data) => { }
    const loadBranchGroup = () => { }

    function onStatusPoRender(rowInfo) {
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
                case "wait_production":
                    status = "Chờ sản xuất"
                    break;
                case "unknown":
                    status = "Chưa xác định"
                    break;
                default:
                    status = "Chưa xác định"
                    break;
            }
        }

        getColor(rowInfo.data.data.processStatus);
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

    locale("en");
    loadMessages(
        {
            "en": {
                "Yes": "Xóa", "No": "Hủy bỏ",
                "dxList-selectAll": "Chọn tất cả",
                "dxList-pageLoadingText": "Đang tải...",
            }
        }
    );

    const handleShowModalSendSAP = () => {
        setIsModalVisibleSendSAP(true);
    };

    const handleHideModalSendSAP = () => {
        setIsModalVisibleSendSAP(false);
    };

    const handleConfirmSendSAP = () => {
        setIsModalVisibleSendSAP(false);
    };

    return (
        <div>
            <DataGrid id="gridContainer"
                dataSource={OrderItem}
                keyExpr="id"
                height={"auto"}
                onRowUpdating={onEdit}
                onRowInserting={onInsert}
                onRowRemoving={onDelete}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                onCellPrepared={onCellPrepared}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText="Không có dữ liệu để hiển thị"
            >
                <Toolbar>
                    <TItem location={"before"}
                    >
                        <div className={"master-detail-title"}>
                            Danh sách BOM cụ thể
                        </div>
                    </TItem>
                    <TItem name="addRowButton" />
                </Toolbar>
                {/*<Scrolling mode="virtual"/>*/}
                <Paging defaultPageSize={5} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode={"full"}
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true}
                    infoText="Trang số {0} trên {1} ({2} bản ghi)" />
                <FilterRow visible={false} applyFilter={"auto"} showAllText='Tất cả' resetOperationText="Đặt lại">
                    <OperationDescriptions
                        startsWith="Bắt đầu với"
                        equal="Bằng"
                        endsWith="Kết thúc với"
                        contains="Chứa"
                        notContains="Không chứa"
                        notEqual="Không bằng"
                        lessThan="Nhỏ hơn"
                        lessThanOrEqual="Nhỏ hơn hoặc bằng"
                        greaterThan="Lớn hơn"
                        greaterThanOrEqual="Lớn hơn hoặc bằng"
                        between="Nằm giữa"

                    />
                </FilterRow>
                {/* <HeaderFilter visible={true} texts={{
                    cancel: "Hủy bỏ",
                    ok: "Đồng ý",
                    emptyValue: "Rỗng"

                }} /> */}
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Tìm kiếm..."
                />
                <Selection mode="single" />
                <Column
                    width={140}
                    caption="Tìm kiếm sản phẩm"
                    dataField={"coittId"}
                    visible={false}
                    setCellValue={setProductSelectionValue}
                >
                    <Lookup dataSource={props.productsFullArrays} displayExpr={"productName"}
                        valueExpr={"coittId"} />
                </Column>
                <Column dataField="productCode"
                    minWidth={140}
                    caption="Mã phiếu công nghệ"
                    cellRender={getProductCode}
                >
                </Column>
                <Column dataField="productName"
                    caption="Tên thẻ"
                    cellRender={getProductName}
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
                <Column
                    alignment={"center"}
                    caption={"Mức độ ưu tiên"}
                    width={140}
                    renderAsync={true}
                >
                </Column>
                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                <PopupSendSAP
                    isVisible={isModalVisibleSendSAP}
                    onCancel={handleHideModalSendSAP}
                    onSubmit={handleConfirmSendSAP}
                    modalTitle={
                        <div>
                            <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500 }}>
                                Xác nhận gửi SAP
                            </h3>
                        </div>
                    }
                    modalContent={
                        <div style={{ backgroundColor: '#ffe0c2', borderLeft: '4px solid #ff794e' }}>
                            <h4 style={{ fontWeight: 600, marginTop: 20, marginLeft: 20 }}>Bạn chắc chắn muốn gửi thông tin phiếu công nghệ sang SAP?</h4>
                            <h3 style={{ color: '#ff794e' }}>
                                <WarningOutlined style={{ color: '#ff794e', marginRight: '8px' }} />
                                Lưu ý:
                            </h3>
                            <p style={{ marginLeft: 20, fontSize: 15 }}>Tất cả các thông tin của phiếu công nghệ sẽ được gửi lên SAP và không được chỉnh sửa !</p>
                        </div>
                    }
                    width={600} />
                <Column type={'buttons'} caption={"Thao tác"} alignment="left" >
                    <Button icon="edit" />
                    <Button icon="airplane" />
                    <Button icon="globe" />
                    <Button icon="print" />
                    <Button icon="chevronnext" onClick={handleShowModalSendSAP} />
                    <Button icon="trash" />
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                    useIcons={true}
                    texts={{
                        cancelRowChanges: "Hủy bỏ",
                        saveRowChanges: "Lưu lại",
                        confirmDeleteTitle: 'Xác nhận xóa bản ghi',
                        confirmDeleteMessage: 'Bạn chắc chắn muốn xóa bản ghi này?',
                        deleteRow: "Xóa",
                        editRow: "Sửa",
                        addRow: "Thêm hàng"
                    }}
                >
                    <Popup title="Cập nhật thông tin sản phẩm" showTitle={true} width={900} height={550} />
                    <Form>
                        <Item itemType="group" colCount={2} colSpan={2}>
                            <Item dataField="coittId" />
                            <Item dataField="coittId" visible={false} />
                            <Item dataField="productCode" />
                            <Item dataField="productName" />
                            <Item dataField="bomVersion" />
                            <Item dataField="startDate" />
                            <Item dataField="endDate" />
                            <Item dataField="quantity" isRequired={true} />
                            <Item dataField="note" colSpan={2} />
                            <Item dataField="branchCode" />
                            <Item dataField="groupCode" />
                            <Item dataField="reasonId" />
                        </Item>
                    </Form>
                </Editing>
            </DataGrid>


            {/*</Popup2>*/}
        </div>
    );
});
export default BOMPersonalizedDetail;