import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    Export,
    FilterRow,
    HeaderFilter,
    Lookup,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
} from "devextreme-react/data-grid";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { Dnlnvl } from "../../jmix/entities/Dnlnvl";
import { DnlnvlDetail } from "../../jmix/entities/DnlnvlDetail";
import { Line } from "../../jmix/entities/Line";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";
import { DnlnvlDetailDetail } from "../../jmix/entities/DnlnvlDetailDetail";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { locale, loadMessages } from "devextreme/localization";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
};

const MaterialAttritionReportWO: React.FC<DnlnvlViewProps> = observer(({ planningWorkOrder = undefined }) => {
    const dnlnvlCollection =
        planningWorkOrder != undefined && planningWorkOrder.woId != undefined
            ? useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  loadImmediately: false,
                  sort: "-createdAt",
                  filter: {
                      conditions: [{ property: "planningWorkOrder.woId", operator: "=", value: planningWorkOrder.woId }],
                  },
              })
            : useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  loadImmediately: false,
                  sort: "-createdAt",
              });

    const mainStore = useMainStore();
    const lineStateCollection = useCollection<Line>(Line.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const [dnlnvlList, setDnlnvlList] = useState<Dnlnvl[] | undefined>(undefined);
    const [currentDnlnvlDetailDetails, setCurrentDnlnvlDetailDetails] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    const [currentDnlnvl, setCurrentDnlnvl] = useState<Dnlnvl | undefined>(undefined);
    const [lines, setLines] = useState<Line[] | undefined>(undefined);

    useEffect(() => {
        loadDnlnvl();
        loadLine();
    }, [planningWorkOrder]);

    useEffect(() => {
        loadDnlnvlDetailDetail(currentDnlnvl?.id);
    }, [currentDnlnvl]);

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

    const loadDnlnvl = async () => {
        await dnlnvlCollection.current.load().then((res) => {
            if (dnlnvlCollection.current.items) {
                setDnlnvlList(dnlnvlCollection.current.items);
            }
        });
    };

    const loadLine = async () => {
        await lineStateCollection.current.load().then((res) => {
            setLines(lineStateCollection.current.items);
        });
    };

    const loadDnlnvlDetailDetail = async (id) => {
        dnlnvlDetailDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvlDetail.dnlnvl.id", operator: "=", value: id }],
        };
        await dnlnvlDetailDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailDetailCollection.current.items) {
                setCurrentDnlnvlDetailDetails(dnlnvlDetailDetailCollection.current.items);
            }
        });
    };

    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("MaterialAttritionReport");

        exportDataGrid({
            component: e.component,
            worksheet,
            topLeftCell: { row: 4, column: 1 },
        })
            .then((cellRange) => {
                const headerRow = worksheet.getRow(2);
                headerRow.height = 30;
                worksheet.mergeCells(2, 1, 2, 8);

                headerRow.getCell(1).value = "Báo cáo tiêu hao nguyên vật liệu tổng hợp trên WO";
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "MaterialAttritionReportWO.xlsx");
                });
            });
        e.cancel = true;
    };

    return (
        <div id='dnlnvl-view'>
            <DataGrid
                keyExpr='id'
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                repaintChangesOnly={true}
                showBorders={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                focusedRowEnabled={true}
                dataSource={dnlnvlList}
                onExporting={onExporting}>
                <Export enabled={true} />
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
                <SearchPanel visible={true} width={300} placeholder='Nhập thông tin và ấn Enter để tìm kiếm' />
                <Paging enabled={true} defaultPageSize={10} />
                <Pager
                    visible={true}
                    displayMode={"compact"}
                    showInfo={true}
                    showNavigationButtons={true}
                    allowedPageSizes={[10, 20, 40]}
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
                <Column
                    dataField='planningWorkOrder.startTime'
                    caption='Thời gian bắt đầu'
                    dataType='datetime'
                    format='dd/MM/yyyy hh:mm:ss'
                    allowEditing={false}
                />
                <Column
                    dataField='planningWorkOrder.endTime'
                    caption='Thời gian kết thúc'
                    dataType='datetime'
                    format='dd/MM/yyyy hh:mm:ss'
                    allowEditing={false}
                />
                <Column dataField='planningWorkOrder.productOrder' caption={"PO"} alignment='left' />
                <Column dataField='planningWorkOrder.parentWorkOrderId' caption={"Mã WO "} alignment='left' />
                <Column dataField='planningWorkOrder.woId' caption={"Mã PO-KBSX"} alignment='left' />
                <Column dataField='planningWorkOrder.sapWo' caption='SAP WO' />
                <Column dataField='planningWorkOrder.lotNumber' width={100} caption='LOT number' />
                <Column dataField='profile' caption='Profile' />
                <Column caption={"Ngành"} dataField='parentWorkOrderId'>
                    <Lookup dataSource={[""]} displayExpr='text' valueExpr='id' />
                </Column>
                <Column caption={"Tổ"} dataField='parentWorkOrderId'>
                    <Lookup dataSource={[""]} displayExpr='text' valueExpr='id' />
                </Column>
                <Column dataField='planningWorkOrder.productCode' caption='Mã sản phẩm' />
                <Column dataField='planningWorkOrder.productName' caption='Tên sản phẩm' />

                <Column dataField='sentBy' caption='Người gửi duyệt' />
                <Column dataField='approver' caption='Người phê duyệt' />
                <Column
                    width={180}
                    dataField='createdAt'
                    caption='Ngày tạo'
                    dataType='datetime'
                    format='dd/MM/yyyy hh:mm:ss'
                    allowEditing={false}
                />

                <Column dataField='woId' caption='Machine ' />
                <Column dataField='branchCode' caption='Side' />
                <Column dataField='numOfReq' caption='Số lần khuyến nghị' width={180} />
                <Column dataField='partNumberCode' caption='Part Number' allowEditing={false} />
                <Column dataField='line' caption='LOT' />
                <Column dataField='line' caption='SAP code' />
                <Column dataField='line' caption='Số lượng xuất hợp lệ' />
            </DataGrid>
        </div>
    );
});

export default MaterialAttritionReportWO;

const ROUTING_PATH = "/materialAttritionReportWO";
registerScreen({
    component: MaterialAttritionReportWO,
    caption: "Báo cáo tiêu hao nguyên vật liệu tổng hợp theo WO",
    screenId: "screen.MaterialAttritionReportWO",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
