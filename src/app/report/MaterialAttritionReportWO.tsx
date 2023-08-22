import React, { useEffect, useState } from "react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    Export,
    FilterRow,
    Item,
    Lookup,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { Button } from "devextreme-react/button";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { toastSuccess } from "../../utils/ToastifyManager";
import ReportServices from "../services/ReportServices";
import { BranchGroup } from "../../jmix/entities/BranchGroup";
import { collection } from "@haulmont/jmix-react-core";
import { locale, loadMessages } from "devextreme/localization";

const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
    view: "_base",
    sort: "code",
    loadImmediately: false,
});

export const MaterialAttritionReportWO = React.memo(() => {
    const [dataReportMaterialWO, setDataReportMaterialWO] = useState<any>(null);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);

    useEffect(() => {
        loadAttritionWO();
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
            Exporting: "Đang xuất file...",
        },
    });

    const loadAttritionWO = () => {
        ReportServices.loadAttritionWO().then((res) => {
            if (res.status === 200) {
                setDataReportMaterialWO(res.data);
            }
        });
    };

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

    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("MaterialAttritionReportWO");

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
                    toastSuccess("Xuất file xlsx tiêu hao nguyên vật liệu tổng hợp trên WO thành công");
                });
            });
        e.cancel = true;
    };

    return (
        <div id='material-attrition-report-wo-view'>
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
                        Báo cáo tiêu hao nguyên vật liệu tổng hợp trên WO
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
                    keyExpr='approver'
                    showColumnLines={true}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    repaintChangesOnly={true}
                    showBorders={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    focusedRowEnabled={true}
                    dataSource={dataReportMaterialWO}
                    onExporting={onExporting}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Export
                        enabled={true}
                        texts={{
                            exportAll: "Xuất file Excel",
                        }}
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
                    <SearchPanel visible={true} placeholder='VD: RD' />
                    {/* <HeaderFilter visible={true} /> */}
                    <Paging enabled={true} defaultPageSize={20} />
                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[10, 20, "all"]}
                        showPageSizeSelector={true}
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
                            <h5 className={"name"}>Báo cáo tiêu hao nguyên vật liệu tổng hợp trên WO</h5>
                        </div>
                    </Item> */}
                        <Item location={"after"} name={"exportButton"} />
                    </Toolbar>
                    <Column
                        dataField='startTime'
                        caption='Thời gian bắt đầu'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column
                        dataField='endTime'
                        caption='Thời gian kết thúc'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                        defaultSortOrder='desc'
                    />
                    <Column dataField='productOrder' caption={"Mã PO"} alignment='left' />
                    <Column dataField='parentWorkOrderId' caption={"Mã WO "} alignment='left' />
                    <Column dataField='woId' caption={"Mã PO-KBSX"} alignment='left' />
                    <Column dataField='sapWo' caption='SAP WO' />
                    <Column dataField='lotNumber' width={100} caption='Số LOT' />
                    <Column dataField='profileName' caption='Profile' />
                    <Column caption={"Ngành"} dataField='branchName'>
                        {/* <Lookup dataSource={branchGroupArray} displayExpr="text" valueExpr="id" /> */}
                    </Column>
                    <Column caption={"Tổ"} dataField='groupName'>
                        {/* <Lookup dataSource={groupArray} displayExpr="text" valueExpr="id" /> */}
                    </Column>
                    <Column dataField='productCode' caption='Mã sản phẩm' />
                    <Column dataField='productName' caption='Tên sản phẩm' />

                    <Column dataField='sentBy' caption='Người gửi' />
                    <Column dataField='approver' caption='Người duyệt' />
                    <Column
                        width={180}
                        dataField='createdAt'
                        caption='Ngày tạo'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />

                    <Column dataField='machineName' caption='Machine ' />
                    <Column dataField='side' caption='Side' />
                    <Column dataField='numOfReq' caption='Số lần khuyến nghị' width={180} alignment={"left"} />
                    <Column dataField='partName' caption='Part Number' allowEditing={false} />
                    <Column dataField='lot' caption='LOT' />
                    <Column dataField='sapCode' caption='SAP Code' />
                    <Column dataField='quantityExport' caption='Số lượng xuất hợp lệ' alignment={"left"} />
                </DataGrid>
            </div>
        </div>
    );
});

export default MaterialAttritionReportWO;

const ROUTING_PATH = "/materialAttritionReportWO";
registerScreen({
    component: MaterialAttritionReportWO,
    caption: "Báo cáo tiêu hao nguyên vật liệu chi tiết",
    screenId: "screen.MaterialAttritionReportWO",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
