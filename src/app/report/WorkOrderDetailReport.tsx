import React, { useEffect, useState } from "react";
import DataGrid, {
    Column,
    Selection,
    Export,
    FilterRow,
    Format,
    FormItem,
    HeaderFilter,
    Item,
    Lookup,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    OperationDescriptions,
    StateStoring,
} from "devextreme-react/data-grid";
import { saveAs } from "file-saver-es";
import { collection, useMainStore } from "@haulmont/jmix-react-core";
import { BranchGroup } from "../../jmix/entities/BranchGroup";
import { registerScreen } from "@haulmont/jmix-react-ui";
import ReportServices from "../services/ReportServices";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Tag } from "antd";
import moment from "moment";
import { toastSuccess } from "../../utils/ToastifyManager";
import { locale, loadMessages } from "devextreme/localization";
import Button from "devextreme-react/button";
import ReportPODetailObject from "../observables/ReportPODetailObject";
import { ChartPopup } from "./popup/ChartPopup";
import { WOChartPopup } from "./popup/wo/WOChartPopup";
import { customizeColor } from "../../utils/utils";

const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, "all"];
const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
    view: "_base",
    sort: "code",
    loadImmediately: false,
});

const reportWODetailObject = new ReportPODetailObject();

export const WorkOrderDetailReport = React.memo((props: any) => {
    const [data, setData] = useState<any>(null);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);

    useEffect(() => {
        ReportServices.loadWorkOrderDetail().then((res) => {
            if (res.status === 200) {
                setData(res.data);
            }
        });
        loadBranchGroup();
    }, []);

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxPager-pageSizesAllText": "Tất cả",
            Loading: "Đang tải...",
        },
    });

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

    const completePercent = (row) => {
        let outQuantity = row.data.workOrder.quantityActual;
        let quantity = row.data.workOrder.quantityPlan;
        if (outQuantity && quantity) {
            let percent = Math.round((outQuantity * 100) / quantity);
            if (percent >= 95) {
                return <Tag color={"success"}>{percent}%</Tag>;
            }
            if (percent < 95 && percent >= 85) {
                return <Tag color={"warning"}>{percent}%</Tag>;
            }
            if (percent < 85) {
                return <Tag>{percent}%</Tag>;
            }
        }
        return <div>---</div>;
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
                case "stop":
                    status = "Ngưng sản xuất";
                    break;
                case "wait_production":
                    status = "Chờ sản xuất";
                    break;
                default:
                    status = "Chưa xác định";
                    break;
            }
        };

        getColor(row.data.workOrder.processStatus);
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

    const getWoState = (row) => {
        let processStatus = row.data.workOrder.processStatus;
        if (processStatus) {
            let status = row.data.workOrder.status;

            if (processStatus === "complete") {
                return <Tag color={"success"}>Hoàn thành</Tag>;
            } else if (processStatus === "early_complete") {
                return <Tag color={"success"}>Hoàn thành sớm</Tag>;
            } else if (processStatus === "delay") {
                return <Tag color={"error"}>Chậm tiến độ</Tag>;
            } else if (processStatus === "in_production") {
                return <Tag color={"processing"}>Đang sản xuất</Tag>;
            } else if (status === "stop") {
                return <Tag color={"error"}>Ngưng sản xuất</Tag>;
            } else if (status === "not_complete") {
                return <Tag color={"error"}>Không hoàn thành</Tag>;
            } else if (processStatus === "unknown") {
                return <Tag color={"processing"}>Chưa xác định</Tag>;
            } else if (processStatus === "wait_production") {
                return <Tag>Chờ sản xuất</Tag>;
            }
        }
        return <Tag>Chưa xác định</Tag>;
    };

    const getStateValue1 = (row) => {
        return getStateValue(row.data.workOrder);
    };

    const getStateValue = (workorder) => {
        let outQuantity = workorder.quantityActual;
        let quantity = workorder.quantityPlan;
        if (outQuantity && quantity) {
            let percent = Math.round((outQuantity * 100) / quantity);
            let status = workorder.status;
            let now = moment();
            let woEndTime = workorder.endTime;
            let startTime = workorder.startTime;
            if (percent >= 100) {
                return "Hoàn Thành";
            } else if (woEndTime != null && now.isAfter(woEndTime)) {
                return "Chậm tiến độ";
            } else if (startTime != null && woEndTime != null && now.isAfter(startTime) && now.isBefore(woEndTime)) {
                return "Đang sản xuất";
            } else if (status === "DEACTIVE") {
                return "Ngưng sản xuất";
            } else {
                return "Chờ sản xuất";
            }
        }
        return "Chưa xác định";
    };

    const getPercentValue = (workOrder) => {
        let outQuantity = workOrder.quantityActual;
        let quantity = workOrder.quantityPlan;
        if (outQuantity && quantity) return Math.round((outQuantity * 100) / quantity);
        return "---";
    };

    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("WorkOrderDetail");

        exportDataGrid({
            component: e.component,
            worksheet,
            topLeftCell: { row: 4, column: 1 },
            customizeCell: function (options) {
                const { gridCell, excelCell } = options;
                if (gridCell) {
                    if (gridCell.rowType === "data") {
                        let wo = gridCell.data.workOrder;
                        if (gridCell.column && gridCell.column.dataField === "state") {
                            excelCell.value = getStateValue(wo);
                        }
                        if (gridCell.column && gridCell.column.dataField === "completePercent") {
                            excelCell.value = getPercentValue(wo);
                        }
                    }
                }
            },
        })
            .then((cellRange) => {
                const headerRow = worksheet.getRow(2);
                headerRow.height = 30;
                worksheet.mergeCells(2, 1, 2, 8);

                headerRow.getCell(1).value = "Báo cáo  kiểm soát KBSX chi tiết";
                headerRow.getCell(1).font = { name: "Segoe UI Light", size: 22 };
                headerRow.getCell(1).alignment = { horizontal: "center" };
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "WorkOrderDetailReport.xlsx");
                    toastSuccess("Xuất file xlsx chi tiết đơn hàng thành công");
                });
            });
        e.cancel = true;
    };

    function showPopup() {
        setTimeout(() => reportWODetailObject.setPopupVisible(true), 500);
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
                        Báo cáo kiểm soát KBSX chi tiết{" "}
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
                    keyExpr='workOrder.woId'
                    height={"100%"}
                    showBorders={true}
                    showColumnLines={true}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    wordWrapEnabled={true}
                    onExporting={onExporting}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Export
                        enabled={true}
                        texts={{
                            exportAll: "Xuất file Excel",
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
                <h5 className={"name"}>Báo cáo kiểm soát KBSX chi tiết</h5>
              </div>
            </Item> */}
                        <Item location={"after"} name={"exportButton"} showText={"always"} />
                        <Item location={"after"} widget='dxButton'>
                            <Button icon={"chart"} onClick={showPopup} text={"Xem biểu đồ"} />
                        </Item>
                    </Toolbar>
                    <StateStoring enabled={true} type='sessionStorage' storageKey='storageWOReport' savingTimeout={100} />
                    <SearchPanel visible={true} placeholder='VD: RD' />
                    {/*<Selection mode="single" />*/}
                    <Column width={80} caption={"STT"} alignment={"left"} dataField='itemIndex' />
                    <Column dataField='externalPO' width={120} caption='Mã đơn hàng'></Column>
                    <Column dataField='workOrder.productOrder' caption='Mã PO Planning' width={150}></Column>
                    <Column dataField='workOrder.productCode' caption='Mã Sản phẩm' minWidth={130}></Column>

                    <Column dataField='workOrder.productName' caption='Tên Sản phẩm' minWidth={150} />
                    <Column dataField='workOrder.parentWorkOrderId' width={100} caption='Mã WO'></Column>

                    <Column dataField='workOrder.branchCode' caption='Ngành' width={100} hidingPriority={2}>
                        <Lookup dataSource={branchGroupArray} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column dataField='workOrder.groupCode' width={100} caption='Tổ' hidingPriority={1}>
                        <Lookup dataSource={groupArray} displayExpr='text' valueExpr='id' />
                    </Column>

                    <Column dataField='workOrder.woId' width={130} caption='Mã WO-Line'></Column>
                    <Column dataField='workOrder.sapWo' width={120} caption='SAP WO' hidingPriority={4}></Column>
                    <Column dataField='workOrder.lotNumber' width={120} caption='LotNumber' hidingPriority={5}></Column>
                    <Column
                        dataField='workOrder.startTime'
                        alignment='left'
                        dataType='datetime'
                        format={"dd/MM/yyyy HH:mm"}
                        width={160}
                        caption='Thời gian bắt đầu'></Column>
                    <Column
                        dataField='workOrder.endTime'
                        alignment='left'
                        dataType='datetime'
                        format={"dd/MM/yyyy HH:mm"}
                        width={160}
                        caption='Thời gian kết thúc'></Column>
                    <Column dataField='workOrder.quantityPlan' alignment={"left"} width={180} caption='Sản lượng kế hoạch'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        dataField='workOrder.quantityActual'
                        width={100}
                        caption='Tổng sản lượng nhập kho'
                        visible={true}
                        alignment='right'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField='workOrder.scadaQuantityOut' width={100} alignment='right' caption='Sản lượng Scada'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField={"completePercent"} cellRender={completePercent} caption={"Tỷ lệ hoàn thành"} width={100} />
                    {/*<Column dataField="workOrder.startTime"*/}
                    {/*  alignment="center"*/}
                    {/*  dataType="datetime"*/}
                    {/*  format={"dd/MM/yyyy HH:mm"}*/}
                    {/*  width={160}*/}
                    {/*  caption={"Thời gian bắt đầu chạy Scada"}>*/}
                    {/*</Column>*/}
                    {/*<Column alignment="center"*/}
                    {/*  dataType="datetime"*/}
                    {/*  format={"dd/MM/yyyy HH:mm"}*/}
                    {/*  width={160}*/}
                    {/*  hidingPriority={3}*/}
                    {/*  caption={"Thời gian hoàn thành CĐ1 Scada"}>*/}
                    {/*</Column>*/}
                    <Column dataField='workOrder.scadaQuantityOut' width={100} alignment='right' caption='Tổng sản lượng CĐ1'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField='workOrder.note' width={240} caption={"Ghi chú"} hidingPriority={0}>
                        <FormItem colSpan={2} editorType='dxTextArea' editorOptions={{ height: 50 }} />
                    </Column>
                    <Column
                        dataField='workOrder.processStatus'
                        width={150}
                        caption={"Đánh giá"}
                        // calculateCellValue={getStateValue1}
                        cellRender={onStatusRender}
                        alignment='center'></Column>
                </DataGrid>
            </div>
            <WOChartPopup reportWODetailObject={reportWODetailObject} />
        </div>
    );
});

export default WorkOrderDetailReport;

const ROUTING_PATH = "/workOrderDetailReport";
registerScreen({
    component: WorkOrderDetailReport,

    caption: "Báo cáo chi tiết KBSX",
    screenId: "screen.WorkOrderDetailReport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
