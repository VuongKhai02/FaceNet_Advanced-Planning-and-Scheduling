import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging, SearchPanel, Export } from "devextreme-react/data-grid";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { Dnlnvl } from "../../jmix/entities/Dnlnvl";
import { DnlnvlDetail } from "../../jmix/entities/DnlnvlDetail";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { DnlnvlDetailDetail } from "../../jmix/entities/DnlnvlDetailDetail";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
};

const MaterialAttritionReport: React.FC<DnlnvlViewProps> = observer(({ planningWorkOrder = undefined }) => {
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

    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetail>(DnlnvlDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const [dnlnvlList, setDnlnvlList] = useState<Dnlnvl[] | undefined>(undefined);
    const [currentDnlnvlDetailDetails, setCurrentDnlnvlDetailDetails] = useState<DnlnvlDetailDetail[] | undefined>(undefined);

    useEffect(() => {
        loadDnlnvl();
        loadDnlnvlDetailDetail();
    }, [planningWorkOrder]);

    const loadDnlnvlDetailDetail = async () => {
        await dnlnvlDetailDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailDetailCollection.current.items) {
                setCurrentDnlnvlDetailDetails(dnlnvlDetailDetailCollection.current.items);
            }
        });
    };

    const loadDnlnvl = async () => {
        await dnlnvlCollection.current.load().then((res) => {
            if (dnlnvlCollection.current.items) {
                setDnlnvlList(dnlnvlCollection.current.items);
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

                headerRow.getCell(1).value = "Báo cáo tiêu hao nguyên vật liệu";
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "MaterialAttritionReport.xlsx");
                });
            });
        e.cancel = true;
    };

    return (
        <div id='dnlnvl-view'>
            <DataGrid
                // id="gridContainer"
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
                dataSource={dnlnvlList && currentDnlnvlDetailDetails}
                onExporting={onExporting}>
                <Export enabled={true} />
                <Paging defaultPageSize={10} />
                <Pager visible={true} displayMode={"full"} showInfo={true} showNavigationButtons={true} />
                <FilterRow visible={true} applyFilter={"auto"} />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true} width={240} placeholder='Search...' />
                <Column width={80} caption={"STT"} alignment={"left"} dataField='id' />
                <Column dataField='id' width={120} caption='ID' alignment='left'></Column>
                <Column dataField='planningWorkOrder.woId' caption='WO ID' width={120}></Column>
                <Column dataField='material' caption='Material ID' minWidth={100} alignment='left'></Column>

                <Column dataField='materialName' caption='Material Name' minWidth={200} />
                <Column dataField='partNumberCode' width={150} caption='Part Number Code'></Column>

                <Column dataField='laneName' caption='Part Name' width={100}></Column>
                <Column dataField='stillNeed' width={120} caption='Số lượng cần' alignment={"left"}></Column>

                <Column dataField='estReqdQty' width={150} caption='Số lượng dự phòng tiêu hao' alignment={"left"}></Column>
                <Column dataField='estTotalQty' width={150} caption='Tổng số lượng khuyến nghị' alignment={"left"}></Column>
                <Column dataField='bufferQty' width={170} caption='Số lượng đã sử dụng' alignment={"left"}></Column>
            </DataGrid>
        </div>
    );
});

export default MaterialAttritionReport;

const ROUTING_PATH = "/materialAttritionReport";
registerScreen({
    component: MaterialAttritionReport,
    caption: "Báo cáo tiêu hao nguyên vật liệu",
    screenId: "screen.MaterialAttritionReport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
