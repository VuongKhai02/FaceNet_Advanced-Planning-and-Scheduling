import React, { useEffect, useRef, useState } from "react";
import { locale, loadMessages } from "devextreme/localization";
import { callAddFont } from "../../fonts/arial-normal";
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
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { toastSuccess } from "../../utils/ToastifyManager";
import ReportServices from "../services/ReportServices";
import { BranchGroup } from "../../jmix/entities/BranchGroup";
import { collection } from "@haulmont/jmix-react-core";
import { Button } from "devextreme-react/button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
    view: "_base",
    sort: "code",
    loadImmediately: false,
});

export const MaterialAttritionReport = React.memo(() => {
    const [dataReportMaterial, setDataReportMaterial] = useState<any>(null);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);

    const dataGridRef = useRef<DataGrid>(null);

    useEffect(() => {
        loadAttrition();
        loadBranchGroup();
    }, []);

    locale("en");
    loadMessages({
        en: {
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
            "dxPager-pageSizesAllText": "Tất cả",
            Loading: "Đang tải...",
        },
    });

    useEffect(() => {
        jsPDF.API.events.push(["addFonts", callAddFont]);
    }, []);

    const loadAttrition = () => {
        ReportServices.loadAttrition().then((response) => {
            if (response.status === 200) {
                setDataReportMaterial(response.data);
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

    const onExportXlsx = () => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("MaterialAttritionReport");
        const dataGrid = dataGridRef.current?.instance;

        exportDataGrid({
            component: dataGrid,
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
                    toastSuccess("Xuất file xlsx chi tiết tiêu hao nguyên vật liệu thành công");
                });
            });
    };

    const onExportPdf = () => {
        const doc = new jsPDF("l", "mm", [297, 210]);
        const dataGrid = dataGridRef.current?.instance;
        let image =
            "iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAp0lEQVRYhe2UUQ7AIAhDuf+lWZQWXdwB9pZ1iVHefhqgEb9eriyN2/j6hSW386lGI8NZquoXn9jpZ8i4fILonAv1OKMsomxI9+3IEBax3K9TLDJd2qsSHU1qpWLB7imUyG7sv3CJRrCjYptHJFnxXW47/qBk+WqAJpnOiWpfNIISnal64klHnt26l2iiHfNI4knHePUQTMRXuZ0iiZOiYGybhSS/XqwLHdwJWjh3hn4AAAAASUVORK5CYII=";
        doc.addImage(image, "JPEG", 5, 1, 18, 18);
        doc.setFont("arial", "normal");
        doc.setFontSize(16);
        doc.text("Báo cáo chi tiết tiêu hao nguyên vật liệu", 100, 8);
        exportDataGridToPdf({
            component: dataGrid,
            jsPDFDocument: doc,
            // @ts-ignore
            autoTableOptions: {
                styles: {
                    lineHeight: 10,
                    font: "arial",
                    fontStyle: "normal",
                    fontSize: 4,
                },
                margin: {
                    top: 20,
                },
                headStyles: {
                    textColor: "white",
                    fillColor: "#6699FF",
                    font: "arial",
                    fontStyle: "normal",
                },
            },
            loadPanel: {
                enabled: true,
                shading: true,
                text: "Đang tải...",
            },
        }).then(() => {
            doc.save("Báo cáo chi tiết tiêu hao nguyên vật liệu.pdf");
        });
    };

    return (
        <div id='material-attrion-view'>
            <div></div>
            <div>
                <div
                    className={"informer"}
                    style={{
                        paddingTop: 12,
                        background: "#fff",
                        textAlign: "center",
                    }}>
                    <h5
                        className={"name"}
                        style={{
                            fontSize: 18,
                            marginBottom: 0,
                        }}>
                        Báo cáo chi tiết tiêu hao nguyên vật liệu
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
                    ref={dataGridRef}
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
                    dataSource={dataReportMaterial}
                    noDataText='Không có dữ liệu để hiển thị'>
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
                    {/* <FilterRow visible={true} /> */}
                    <Toolbar>
                        <Item location={"before"} name={"searchPanel"} />
                        <Item location={"after"}>
                            <Button hint={"Xuất file pdf"} icon={"pdffile"} onClick={onExportPdf} />
                        </Item>
                        <Item location={"after"}>
                            <Button hint={"Xuất file excel"} icon={"xlsxfile"} onClick={onExportXlsx} />
                        </Item>
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

                    <Column dataField='machineName' caption='Machine' />
                    <Column dataField='side' caption='Side' />
                    <Column dataField='subslot' caption='Subslot' />
                    <Column dataField='numOfReq' alignment={"left"} caption='Số lần khuyến nghị' width={180} />
                    <Column dataField='locationType' caption='Location' />
                    <Column dataField='partName' caption='Part Number' allowEditing={false} />
                    <Column dataField='lot' caption='LOT' />
                    <Column dataField='sapCode' caption='SAP code' />
                    <Column dataField='quantity' caption='Số lượng ' alignment={"left"} />
                    <Column dataField='status' caption='Tình trạng đối chiếu' />
                </DataGrid>
            </div>
        </div>
    );
});

export default MaterialAttritionReport;

const ROUTING_PATH = "/materialAttritionReport";
registerScreen({
    component: MaterialAttritionReport,
    caption: "Báo cáo tiêu hao nguyên vật liệu tổng hợp",
    screenId: "screen.MaterialAttritionReport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
