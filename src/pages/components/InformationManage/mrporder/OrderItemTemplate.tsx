import { locale, loadMessages } from "devextreme/localization";
import React, { useEffect, useState } from "react";
import "./MrpSaleOrder.css";
import { OrderItem } from "../../../../fake_data/OrderItem";
import DataGrid, {
    Column,
    FilterRow,
    SearchPanel,
    Editing,
    Popup,
    Selection,
    Lookup,
    Form,
    Toolbar,
    Item as TItem,
    FormItem,
    Format,
    OperationDescriptions,
} from "devextreme-react/data-grid";

import { Item } from "devextreme-react/form";
import { Tooltip } from "devextreme-react/tooltip";
import { Tag } from "antd";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { useTranslation } from "react-i18next";

const getProductName = (rowData: any) => {
    if (rowData.data.status && rowData.data.status === "created_wo") {
        return <div className='product_name_created_wo'>{rowData.data.productName}</div>;
    }
    return <div>{rowData.data.productName}</div>;
};

const getProductCode = (rowData: any) => {
    if (rowData.data.status && rowData.data.status === "created_wo") {
        return <div className='product_name_created_wo'>{rowData.data.productCode}</div>;
    }
    return <div>{rowData.data.productCode}</div>;
};

const setProductSelectionValue = (rowData: any, value: any) => {
    rowData.productCode = value.productCode;
    rowData.productName = value.productName;
    rowData.bomVersion = value.bomVersion;
    rowData.sapUrl = value.uDocurl;
    rowData.sapUrl2 = value.uDocurl2;
};

const quantityOutCellRender = (row: any) => {
    return row.value ? row.value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "0";
};

const completePercent = (row: any) => {
    let outQuantity = row.data.quantityOut;
    let quantity = row.data.quantity;
    let displayQuantity = (outQuantity * 100) / quantity;
    if (outQuantity && quantity) {
        return <div>{displayQuantity.toFixed(2)}%</div>;
    }
    return <div>---</div>;
};

const onCellPrepared = (e: any) => {
    if (e.rowType == "data" && e.column.dataField == "completePercent") {
        if (e.data.completePercent > 5) e.cellElement.className += " cls";
    }
};

const quantityOut = (row: any) => {
    let outQuantity = row.data.scadaQuantityOut;
    if (outQuantity) return <div className={"highlightColumnQuantity"}>{outQuantity}</div>;
    return <div>0.00</div>;
};


export const OrderItemTemplate = React.memo((props: any) => {
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(OrderItem?.length / pageSize);
    const dataPage = OrderItem?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const [branchGroupArray,] = useState<any[]>([]);
    const [groupArray,] = useState<any[]>([]);
    const { t } = useTranslation(["common"]);
    const loadProductOrderItem = () => { };
    const loadProduct = () => { };

    useEffect(() => {
        loadProduct();
        loadProductOrderItem();
        loadBranchGroup();
    }, []);

    const buttonCreateWOByProduct = (row: any) => {
        return (
            <>
                <div id={"buttonCreateWOByProduct" + row.data.id}>
                    <Tooltip
                        target={"#buttonCreateWOByProduct" + row.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Thêm KBSX-WO cho Sản phẩm</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
            </>
        );
    };
    const buttonViewBom = (row: any) => {
        return <div id={"buttonViewBom" + row.data.id}></div>;
    };

    const onEdit = async () => { };
    const onDelete = () => { };
    const onInsert = async () => { };
    const loadBranchGroup = () => { };

    function onStatusPoRender(rowInfo: any) {
        let customColor: {
            color: string;
            backgroundColor: string;
        } = {
            color: "",
            backgroundColor: "",
        };
        let status = "";
        let border = "";
        const getColor = (value: any) => {
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
                case "wait_production":
                    status = "Chờ sản xuất";
                    break;
                case "unknown":
                    status = "Chưa xác định";
                    break;
                default:
                    status = "Chưa xác định";
                    break;
            }
        };

        getColor(rowInfo.data.data.processStatus);
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
    }

    locale("en");
    loadMessages({
        en: {
            Yes: "Xóa",
            No: "Hủy bỏ",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
        },
    });

    return (
        <div>
            <DataGrid
                id='gridContainer'
                dataSource={dataPage}
                key={"id"}
                keyExpr='id'
                height={"auto"}
                onRowUpdating={onEdit}
                onRowInserting={onInsert}
                onRowRemoving={onDelete}
                showBorders={true}
                showColumnLines={false}
                showRowLines={false}
                rowAlternationEnabled={true}
                onCellPrepared={onCellPrepared}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText={t("common.noData-text")}>
                <Toolbar>
                    <TItem location={"before"}>
                        <div style={{ fontSize: 18, fontWeight: "bold" }}>Danh sách sản phẩm</div>
                    </TItem>
                    <TItem name='addRowButton' />
                </Toolbar>
                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                    <OperationDescriptions
                        startsWith={t("common.startsWith")}
                        equal={t("common.equal")}
                        endsWith={t("common.endsWith")}
                        contains={t("common.contains")}
                        notContains={t("common.notContains")}
                        notEqual={t("common.notEqual")}
                        lessThan={t("common.lessThan")}
                        lessThanOrEqual={t("common.lessThanOrEqual")}
                        greaterThan={t("common.greaterThan")}
                        greaterThanOrEqual={t("common.greaterThanOrEqual")}
                        between={t("common.between")}
                    />
                </FilterRow>
                <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />
                <Selection mode='single' />
                <Column type={"buttons"} caption={"Tùy chọn"} alignment='left' />
                {/*<Column cellRender={rowIndexRender} width={50} caption={"STT"} alignment={"left"} />*/}
                <Column
                    width={140}
                    caption='Tìm kiếm sản phẩm'
                    dataField={"coittId"}
                    visible={false}
                    setCellValue={setProductSelectionValue}>
                    <Lookup dataSource={props.productsFullArrays} displayExpr={"productName"} valueExpr={"coittId"} />
                </Column>
                <Column dataField='productCode' minWidth={140} caption='Mã sản phẩm' cellRender={getProductCode}></Column>
                <Column
                    dataField='productName'
                    caption='Tên Sản phẩm'
                    cellRender={getProductName}
                    hidingPriority={4}
                    minWidth={200}></Column>
                <Column
                    dataField='bomVersion'
                    width={140}
                    caption='Version BOM'
                    alignment={"center"}
                // setCellValue={this.setBomversionCellValue}
                >
                    {/*<Lookup dataSource={bomversionList} displayExpr="Name" valueExpr="ID"/>*/}
                </Column>
                <Column dataField='quantity' minWidth={140} caption='Số lượng đặt hàng' hidingPriority={2} alignment='right'>
                    <Format type='fixedPoint' precision={0} />
                </Column>
                <Column
                    dataField='quantityOut'
                    width={140}
                    caption='SL hoàn thành'
                    alignment='right'
                    cellRender={quantityOutCellRender}
                    hidingPriority={3}></Column>
                <Column
                    dataField={"completePercent"}
                    width={140}
                    alignment='center'
                    caption='Tỷ lệ hoàn thành'
                    cellRender={completePercent}
                />
                <Column dataField='scadaQuantityOut' width={120} alignment='right' caption='Sản lượng Scada' cellRender={quantityOut} />
                <Column dataField={"scadaQuantityOut1"} alignment='right' caption={"Sản lượng CĐ1"} width={160} />
                <Column dataField='branchCode' caption='Ngành' width={300} hidingPriority={2} renderAsync={true}>
                    <Lookup dataSource={branchGroupArray} displayExpr='text' valueExpr='id' />
                </Column>
                <Column dataField='groupCode' width={100} caption='Tổ' hidingPriority={3} renderAsync={true}>
                    <Lookup dataSource={groupArray} displayExpr='text' valueExpr='id' />
                </Column>
                <Column
                    dataField='createdAt'
                    caption='Thời gian tạo'
                    format={"dd/MM/yyyy HH:mm:ss"}
                    dataType='datetime'
                    alignment={"center"}
                    minWidth={140}
                />
                <Column dataField='createdBy' width={100} alignment='right' caption='Tạo bởi' />
                <Column
                    alignment='center'
                    caption='Đánh giá'
                    // cellComponent={renderProcessStatus}
                    cellComponent={onStatusPoRender}
                    width={150}></Column>
                <Column
                    dataField='startDate'
                    caption='Ngày bắt đầu'
                    format={"dd/MM/yyyy"}
                    dataType='datetime'
                    alignment={"center"}
                    minWidth={140}
                    hidingPriority={0}></Column>
                <Column
                    dataField='endDate'
                    caption='Ngày kết thúc'
                    dataType='datetime'
                    format={"dd/MM/yyyy"}
                    alignment={"center"}
                    minWidth={140}
                    hidingPriority={1}></Column>
                <Column
                    cellRender={buttonViewBom}
                    // alignment={"center"}
                    caption={"View BOM"}
                    width={100}></Column>
                <Column alignment={"center"} caption={"View Hồ sơ"} width={140} renderAsync={true}></Column>
                <Column cellRender={buttonCreateWOByProduct} alignment={"center"} caption={"Khai WO"} visible={true} width={100}></Column>
                <Column dataField='note' visible={true} caption={"Ghi chú"} minWidth={100} hidingPriority={5}>
                    <FormItem colSpan={2} editorType='dxTextArea' editorOptions={{ height: 100 }} />
                </Column>
                <Column dataField='reasonId' caption={"Nguyên nhân"} hidingPriority={0} visible={false}>
                    <Lookup dataSource={props.reasons} displayExpr='reason' valueExpr='id' allowClearing={true} />
                </Column>
                <Editing
                    mode='popup'
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                    useIcons={true}
                    texts={{
                        cancelRowChanges: "Hủy bỏ",
                        saveRowChanges: "Lưu lại",
                        confirmDeleteTitle: "Xác nhận xóa bản ghi",
                        confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                        deleteRow: "Xóa",
                        editRow: "Sửa",
                        addRow: "Thêm hàng",
                    }}>
                    <Popup title='Cập nhật thông tin sản phẩm' showTitle={true} width={900} height={550} />
                    <Form>
                        <Item itemType='group' colCount={2} colSpan={2}>
                            <Item dataField='coittId' />
                            <Item dataField='coittId' visible={false} />
                            <Item dataField='productCode' />
                            <Item dataField='productName' />
                            <Item dataField='bomVersion' />
                            <Item dataField='startDate' />
                            <Item dataField='endDate' />
                            <Item dataField='quantity' isRequired={true} />
                            <Item dataField='note' colSpan={2} />
                            <Item dataField='branchCode' />
                            <Item dataField='groupCode' />
                            <Item dataField='reasonId' />
                        </Item>
                    </Form>
                </Editing>
            </DataGrid>

            <PaginationComponent
                pageSizeOptions={[10, 20, 40]}
                pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: OrderItem?.length }}
                totalPages={totalPage}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
            />
        </div>
    );
});

export default OrderItemTemplate;
