import { locale, loadMessages } from "devextreme/localization";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import "./MrpSaleOrder.css";
import { OrderItem } from "../../../../fake_data/OrderItem";
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    SearchPanel,
    Editing,
    Popup,
    Selection,
    Lookup,
    Form,
    Toolbar,
    Item as TItem,
    FormItem,
    Scrolling,
    Paging,
    Pager,
    Format,
    OperationDescriptions,
} from "devextreme-react/data-grid";

import Popup2 from "devextreme-react/popup";
import { Item } from "devextreme-react/form";
import { collection, instance } from "@haulmont/jmix-react-core";
import { Tooltip } from "devextreme-react/tooltip";
import notify from "devextreme/ui/notify";
import { Observer } from "@apollo/client";
import { Tag } from "antd";

const getProductName = (rowData) => {
    if (rowData.data.status && rowData.data.status === "created_wo") {
        return <div className='product_name_created_wo'>{rowData.data.productName}</div>;
    }
    return <div>{rowData.data.productName}</div>;
};

const getProductCode = (rowData) => {
    if (rowData.data.status && rowData.data.status === "created_wo") {
        return <div className='product_name_created_wo'>{rowData.data.productCode}</div>;
    }
    return <div>{rowData.data.productCode}</div>;
};

const setProductSelectionValue = (rowData, value) => {
    rowData.productCode = value.productCode;
    rowData.productName = value.productName;
    rowData.bomVersion = value.bomVersion;
    rowData.sapUrl = value.uDocurl;
    rowData.sapUrl2 = value.uDocurl2;
};

const quantityOutCellRender = (row) => {
    return row.value ? row.value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "0";
};

const rowIndexRender = (row) => {
    return <div>{row.data.itemIndex == 0 ? row.rowIndex + 1 : row.data.itemIndex}</div>;
};

const completePercent = (row) => {
    let outQuantity = row.data.quantityOut;
    let quantity = row.data.quantity;
    let displayQuantity = (outQuantity * 100) / quantity;
    if (outQuantity && quantity) {
        return <div>{displayQuantity.toFixed(2)}%</div>;
    }
    return <div>---</div>;
};

const onCellPrepared = (e) => {
    if (e.rowType == "data" && e.column.dataField == "completePercent") {
        if (e.data.completePercent > 5) e.cellElement.className += " cls";
    }
};

const quantityOut = (row) => {
    let outQuantity = row.data.scadaQuantityOut;
    if (outQuantity) return <div className={"highlightColumnQuantity"}>{outQuantity}</div>;
    return <div>0.00</div>;
};

const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, "all"];

export const OrderItemTemplate = React.memo((props: any) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupVisible2, setPopupVisible2] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [productsFullArrays, setProductsFullArrays] = useState<any[]>([]);
    const [bomVersion, setBomVersion] = useState<any>(null);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);

    const productOrderId: string = props.data.data.productOrderId;

    const [bomVersionProps, setBomversionProps] = useState<{ popupVisible: boolean; currentRow: any; bomVersion: any }>({
        popupVisible: false,
        currentRow: null,
        bomVersion: null,
    });

    const loadProductOrderItem = () => {};
    const loadProduct = () => {};

    useEffect(() => {
        loadProduct();
        loadProductOrderItem();
        loadBranchGroup();
    }, []);

    const buttonCreateWOByProduct = (row) => {
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
    const buttonViewBom = (row) => {
        return <div id={"buttonViewBom" + row.data.id}></div>;
    };
    const renderPopup = () => {};

    const renderPopupCreateWO = () => {};

    const closePopup = () => {
        // setPopupVisible(false);
        setPopupVisible2(false);
    };

    const handlePopupHidden = () => {
        bomVersionProps.popupVisible = false;
        setPopupVisible2(false);
    };

    const docUrlRender = (row) => {};

    const showBomversionView = async (row) => {};

    //tao wo từ product
    const showCreateWOByProductPopup = (row) => {
        // setPopupVisible2(true);
        // setCurrentRow(row);
        // createWOByProdObj.setData(true, row.data, null, props.data.data)
    };

    const onEdit = async (data) => {};

    const onDelete = (data) => {};

    const onInsert = async (data) => {};

    const getIndexForNewRow = () => {
        let lastIndex = 0;
        // data.map(item => {
        //   if (item.itemIndex && item.itemIndex > lastIndex) {
        //     lastIndex = item.itemIndex
        //   }
        // });
        return lastIndex + 1;
    };

    const loadBranchGroup = () => {};

    function onStatusPoRender(rowInfo) {
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

    function renderProcessStatus(rowInfo) {
        let cl = "processing";
        let str = "Chưa xác định";
        console.log(" status in master detail", rowInfo.data.data.processStatus, rowInfo);
        if (!rowInfo.data.data.processStatus || rowInfo.data.data.processStatus === "new") {
            cl = "processing";
            str = "Chờ sản xuất";
        } else if (rowInfo.data.data.processStatus === "complete") {
            cl = "success";
            str = "Hoàn thành";
        } else if (rowInfo.data.data.processStatus === "not_complete") {
            cl = "error";
            str = "Chưa hoàn thành";
        } else if (rowInfo.data.data.processStatus === "early_complete") {
            cl = "success";
            str = "Hoàn thành sớm";
        } else if (rowInfo.data.data.processStatus === "delay") {
            cl = "warning";
            str = "Chậm tiến độ";
        } else if (rowInfo.data.data.processStatus === "in_production") {
            cl = "processing";
            str = "Đang sản xuất";
        } else if (rowInfo.data.data.processStatus === "unknown" || rowInfo.data.data.processStatus === null) {
            cl = "processing";
            str = "Chưa xác định";
        }
        return <Tag color={cl}>{str}</Tag>;
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
                dataSource={OrderItem}
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
                noDataText='Không có dữ liệu để hiển thị'>
                <Toolbar>
                    <TItem location={"before"}>
                        <div className={"master-detail-title"}>Danh sách sản phẩm</div>
                    </TItem>
                    <TItem name='addRowButton' />
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
                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                />
                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText='Đặt lại'>
                    <OperationDescriptions
                        startsWith='Bắt đầu với'
                        equal='Bằng'
                        endsWith='Kết thúc với'
                        contains='Chứa'
                        notContains='Không chứa'
                        notEqual='Không bằng'
                        lessThan='Nhỏ hơn'
                        lessThanOrEqual='Nhỏ hơn hoặc bằng'
                        greaterThan='Lớn hơn'
                        greaterThanOrEqual='Lớn hơn hoặc bằng'
                        between='Nằm giữa'
                    />
                </FilterRow>
                <HeaderFilter
                    visible={false}
                    texts={{
                        cancel: "Hủy bỏ",
                        ok: "Đồng ý",
                        emptyValue: "Rỗng",
                    }}
                />
                <SearchPanel visible={true} width={240} placeholder='Tìm kiếm...' />
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

            {/*</Popup2>*/}
        </div>
    );
});

export default OrderItemTemplate;
