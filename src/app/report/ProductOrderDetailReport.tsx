import React, { useEffect, useState } from "react";
import { loadMessages, locale } from "devextreme/localization";
import DataGrid, {
    Column,
    Export,
    FilterRow,
    Format,
    FormItem,
    Item,
    Lookup,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    StateStoring,
    Toolbar,
} from "devextreme-react/data-grid";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import { LoadPanel } from "devextreme-react/load-panel";
import { collection } from "@haulmont/jmix-react-core";
// import { ProductOrderItem } from "../../jmix/entities/ProductOrderItem";
import { BranchGroup } from "../../jmix/entities/BranchGroup";
import ReportServices from "../services/ReportServices";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { toastSuccess } from "../../utils/ToastifyManager";
import moment from "moment";
import { Tag } from "antd";
import Button from "devextreme-react/button";
import ReportPODetailObject from "../observables/ReportPODetailObject";
import { ChartPopup } from "./popup/ChartPopup";
import { ReasonList } from "../../jmix/entities/ReasonList";
import { customizeColor } from "../../utils/utils";

const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
    view: "_base",
    sort: "code",
    loadImmediately: false,
});
const reasonsDs = collection<ReasonList>(ReasonList.NAME, {
    view: "_base",
    loadImmediately: false,
});
const completePercent = (row) => {
    let outQuantity = row.data.item.quantityOut;
    let quantity = row.data.item.quantity;
    let displayQuantity = (outQuantity * 100) / quantity;
    if (outQuantity && quantity) {
        return <div>{displayQuantity.toFixed(2)}%</div>;
    }
    return <div>---</div>;
};
const completePercentCD1 = (row) => {
    let outQuantity = row.data.item.scadaQuantityOut1;
    let quantity = row.data.item.quantity;
    let displayQuantity = (outQuantity * 100) / quantity;
    if (outQuantity && quantity) {
        return <div>{displayQuantity.toFixed(2)}%</div>;
    }
    return <div>---</div>;
};

const getProductState = (row) => {
    let outQuantity = row.data.item.quantityOut;
    let quantity = row.data.item.quantity;
    if (outQuantity && quantity) {
        let percent = Math.round((outQuantity * 100) / quantity);
        let status = row.data.item.status;
        let now = moment();
        let itemEndTime = row.data.item.endDate;
        let itemStartTime = row.data.item.startDate;
        if (percent >= 100) {
            return <Tag color={"success"}>Hoàn Thành</Tag>;
        } else if (itemEndTime != null && now.isAfter(itemEndTime)) {
            return <Tag color={"error"}>Chậm tiến độ</Tag>;
        } else if (itemStartTime != null && itemEndTime != null && now.isAfter(itemStartTime) && now.isBefore(itemEndTime)) {
            return <Tag color={"processing"}>Đang sản xuất</Tag>;
        } else if (status === "DEACTIVE") {
            return <Tag color={"error"}>Ngưng sản xuất</Tag>;
        } else if (itemStartTime != null && itemEndTime != null && now.isBefore(itemStartTime)) {
            return <Tag color={"processing"}>Chờ sản xuất</Tag>;
        }
    }
    return <Tag color={"processing"}>Chưa xác định</Tag>;
};

const onCellPrepared = (e) => {
    if (e.rowType === "data" && e.column.dataField === "completePercent") {
        if (e.data.completePercent > 5) e.cellElement.className += " cls";
    }
};
const onExporting = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("ProductOrderDetail");
    exportDataGrid({
        component: e.component,
        worksheet,
        topLeftCell: { row: 4, column: 1 },
    })
        .then((cellRange) => {
            // header
            const headerRow = worksheet.getRow(2);
            headerRow.height = 30;
            worksheet.mergeCells(2, 1, 2, 8);
            headerRow.getCell(1).value = "Báo cáo thống kê chi tiết đơn hàng";
            headerRow.getCell(1).font = { name: "Segoe UI Light", size: 22 };
            headerRow.getCell(1).alignment = { horizontal: "center" };
            // footer
            // @ts-ignore
            const footerRowIndex = cellRange.to.row + 2;
            const footerRow = worksheet.getRow(footerRowIndex);
            worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);
            footerRow.getCell(1).value = "https://rangdong.com.vn";
            footerRow.getCell(1).font = { color: { argb: "BFBFBF" }, italic: true };
            footerRow.getCell(1).alignment = { horizontal: "right" };
        })
        .then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ProductOrderDetail.xlsx");
                toastSuccess("Xuất file xlsx chi tiết đơn hàng thành công");
            });
        });
    e.cancel = true;
};
// const quantityOut = (row) => {
//   let outQuantity = row.data.item.scadaQuantityOut;
//   if (outQuantity) return <div className={"highlightColumnQuantity"}>{outQuantity}</div>
//   return <div>0.00</div>
// }
const allowedPageSizes = [10, 20, 50];

const reportPODetailObject = new ReportPODetailObject();

export const ProductOrderDetailReport = React.memo((props: any) => {
    const [data, setData] = useState<any>(null);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
    const [reasonList, setReasonList] = useState<any[]>([]);
    const [disableExportBtn, setDisableExportBtn] = useState(true);

    locale("en");
    loadMessages({
        en: {
            "dxPager-pageSizesAllText": "Tất cả",
            Loading: "Đang tải...",
        },
    });

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };
    const loadProductOrderItem = () => {
        ReportServices.loadProductOrderItem().then((resp) => {
            if (resp.status === 200) {
                setData(resp.data);
            }
        });
    };
    useEffect(() => {
        loadProductOrderItem();
        loadBranchGroup();
        loadReason();
    }, []);

    const loadBranchGroup = () => {
        sapBranchGroupCollection.load().then((res) => {
            let branchGroupArrayTmp: any[] = [];
            let groupArrayTmp: any[] = [];
            sapBranchGroupCollection.items.map((item) => {
                let { uBranchcode, uBranchname, uGroupcode, uGroupname } = item;
                if (uBranchcode && uBranchname && uGroupcode && uGroupname) {
                    if (
                        !branchGroupArrayTmp.find((childItem) => {
                            return uBranchcode === childItem.id;
                        })
                    ) {
                        branchGroupArrayTmp.push({ id: uBranchcode, text: uBranchname });
                    }
                    groupArrayTmp.push({ branchCode: uBranchcode, id: uGroupcode, text: uGroupname });
                }
            });
            setBranchGroupArray(branchGroupArrayTmp);
            setGroupArray(groupArrayTmp);
        });
    };
    const loadReason = async () => {
        await reasonsDs.load().then(() => {
            if (reasonsDs.items) {
                setReasonList(reasonsDs.items);
            }
        });
    };

    function onStatusRender(row) {
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
                case "processing":
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

        getColor(row.data.item.processStatus);
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
    }

    const renderProcessStatus = (row) => {
        // let outQuantity = row.data.item.quantityOut;
        // let quantity = row.data.item.quanti;
        let status = row.data.item.processStatus;

        if (status === "complete") {
            return <Tag color={"success"}>Hoàn Thành</Tag>;
        } else if (status === "early_complete") {
            return <Tag color={"success"}>Hoàn thành sớm</Tag>;
        } else if (status === "unknown" || status === null) {
            return <Tag color={"success"}>Chưa xác định</Tag>;
        } else if (status === "stop") {
            return <Tag color={"success"}>Ngưng sản xuất</Tag>;
        } else if (status === "in_production") {
            return <Tag color={"success"}>Đang sản xuất</Tag>;
        } else if (status === "wait_production") {
            return <Tag color={"success"}>Chờ sản xuất</Tag>;
        } else if (status === "delay") {
            return <Tag color={"success"}>Chậm tiến độ</Tag>;
        } else if (status === "not_complete") {
            return <Tag color={"success"}>Không hoàn thành</Tag>;
        }
        return <Tag color={"processing"}>Chưa xác định</Tag>;
    };

    const onContentReady = (e) => {
        var filterExpr = e.component.getCombinedFilter();
        console.log(filterExpr);
    };

    function showPopup() {
        setTimeout(() => reportPODetailObject.setPopupVisible(true), 500);
    }

    return (
        <div className={"master-detail-title"}>
            <div>
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
                        Báo cáo chi tiết đơn hàng
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
                <DataGrid
                    id='gridContainer'
                    dataSource={data}
                    keyExpr='item.id'
                    height={"auto"}
                    showBorders={true}
                    showColumnLines={true}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    onCellPrepared={onCellPrepared}
                    wordWrapEnabled={true}
                    columnAutoWidth={true}
                    onExporting={onExporting}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Export
                        enabled={true}
                        texts={{
                            exportAll: "Xuất báo cáo Excel",
                        }}
                    />
                    <Paging defaultPageSize={10} />
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
                    <Toolbar>
                        <Item location={"before"} name={"searchPanel"} />
                        {/* <Item location={"center"}>
              <div className={"informer"}>
                <h5 className={"name"}>Báo cáo chi tiết đơn hàng</h5>
              </div>
            </Item> */}
                        <Item location={"after"} name={"exportButton"} showText={"always"} />
                        <Item location={"after"} widget='dxButton'>
                            <Button icon={"chart"} onClick={showPopup} text={"Xem biểu đồ"} hint='Xem biểu đồ' />
                        </Item>
                    </Toolbar>
                    {/* <HeaderFilter visible={true} /> */}
                    <StateStoring enabled={true} type='sessionStorage' storageKey='storage' savingTimeout={100} />
                    <SearchPanel visible={true} placeholder='VD: RD' />
                    {/*<Selection mode="single" />*/}
                    <Column width={80} caption={"STT"} alignment={"left"} dataField='itemIndex' allowFiltering={false} />
                    <Column dataField='customerCode' minWidth={140} caption='Mã khách hàng'></Column>
                    <Column dataField='item.productOrder' minWidth={140} caption='Mã PO Planning'></Column>
                    <Column dataField='item.productCode' minWidth={140} caption='Mã sản phẩm'></Column>
                    <Column dataField='item.productName' caption='Tên Sản phẩm' hidingPriority={4} minWidth={200}></Column>
                    <Column dataField='item.branchCode' caption='Ngành' width={150} hidingPriority={2}>
                        <Lookup dataSource={branchGroupArray} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column dataField='item.groupCode' width={100} caption='Tổ'>
                        <Lookup dataSource={groupArray} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column
                        dataField='item.startDate'
                        caption='Thời gian bắt đầu'
                        format={"dd/MM/yyyy"}
                        dataType='date'
                        alignment={"center"}
                        minWidth={140}
                        hidingPriority={0}></Column>
                    <Column
                        dataField='item.endDate'
                        caption='Thời gian trả hàng'
                        dataType='date'
                        format={"dd/MM/yyyy"}
                        alignment={"center"}
                        minWidth={140}
                        hidingPriority={1}></Column>
                    <Column
                        dataField='item.quantity'
                        minWidth={140}
                        caption='Tổng sản lượng cần sản xuất'
                        hidingPriority={2}
                        alignment='right'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        dataField='item.quantityOut'
                        width={200}
                        caption='Tổng sản lượng nhập kho'
                        alignment='left'
                        // cellRender={quantityOutCellRender}
                    >
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        dataField={"completePercent"}
                        width={150}
                        alignment='left'
                        caption='Tỷ lệ hoàn thành'
                        cellRender={completePercent}
                        allowFiltering={false}
                    />
                    <Column dataField='item.scadaQuantityOut' width={150} alignment='left' caption='Sản lượng Scada'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField='item.scadaQuantityOut1' width={100} alignment='right' caption='Tổng sản lượng CĐ1'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        dataField={"completePercent"}
                        cellRender={completePercentCD1}
                        caption={"Tỷ lệ hoàn thành CĐ1"}
                        allowFiltering={false}
                        width={100}
                    />
                    {/*<Column dataField="state" width={100} caption={"Tình trạng"}*/}
                    {/*        cellRender={getProductState}>*/}
                    {/*</Column>*/}
                    <Column
                        dataField='item.processStatus'
                        width={150}
                        caption={"Đánh giá"}
                        // cellRender={renderProcessStatus}
                        cellRender={onStatusRender}></Column>
                    <Column dataField='item.note' caption={"Ghi chú"} width={240} filterOperations={["contains"]}>
                        <FormItem colSpan={2} editorType='dxTextArea' editorOptions={{ height: 100 }} />
                    </Column>
                    <Column dataField='item.reasonId' caption={"Nguyên nhân"} width={240} filterOperations={["contains", "notcontains"]}>
                        <Lookup dataSource={reasonList} displayExpr='reason' valueExpr='id' />
                    </Column>
                </DataGrid>
            </div>
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={"center"}
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={true}
                message='Đang tải...'
            />
            <ChartPopup reportPODetailObject={reportPODetailObject} />
        </div>
    );
});
export default ProductOrderDetailReport;
const ROUTING_PATH = "/productOrderDetailReport";
registerScreen({
    component: ProductOrderDetailReport,
    caption: "Báo cáo chi tiết đơn đặt hàng",
    screenId: "screen.ProductOrderDetailReport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
