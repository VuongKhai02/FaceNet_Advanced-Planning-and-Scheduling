import { useEffect, useMemo, useRef, useState } from "react";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import axios from "axios";
import { confirm } from "devextreme/ui/dialog";
import { Button, CheckBox, DataGrid, Form, Popup, ScrollView, SelectBox, TextArea } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import InfoRow from "../../../../utils/InfoRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { PLANNING_API_URL } from "../../../../config";
import { StatusApproveEnum, TransactionType } from "../../enum/statusEnum";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import {
    Column,
    Editing,
    FilterRow,
    HeaderFilter,
    Pager,
    Paging,
    Toolbar,
    Item as ToolbarItemDataGrid,
    OperationDescriptions,
    Scrolling,
} from "devextreme-react/data-grid";
import { SapDvlinh } from "../../../../jmix/entities/SapDvlinh";
import { SapBpgroup } from "../../../../jmix/entities/SapBpgroup";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { DnlnvlMaterialScanFail } from "../../../../jmix/entities/DnlnvlMaterialScanFail";
import { useWindowDimensions } from "../../../../hooks";

type DnlnvlHistoryComparePopupProps = {
    visible: boolean;
    currentDnlnvl?: Dnlnvl;
    setClose: () => void;
    refreshDnlnvl: () => void;
};
const DnlnvlHistoryCompareMaterialPopup = ({
    visible = false,
    currentDnlnvl,
    setClose = () => {},
    refreshDnlnvl = () => {},
}: DnlnvlHistoryComparePopupProps) => {
    const mainStore = useMainStore();
    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });
    const sapDvlinhCollection = useCollection<SapDvlinh>(SapDvlinh.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const sapBpGroupCollection = useCollection<SapBpgroup>(SapBpgroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const dnlnvlMaterialScanFailCollection = useCollection<DnlnvlMaterialScanFail>(DnlnvlMaterialScanFail.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const [dnlnvlDetailDetails, setDnlnvlDetailDetails] = useState<DnlnvlDetailDetail[]>([]);
    const [dnlnvlMaterialScanFails, setDnlnvlMaterialScanFails] = useState<DnlnvlMaterialScanFail[]>([]);
    const [wareHouses, setWareHouses] = useState([]);
    const [sourceDepartmentList, setSourceDepartmentList] = useState<SapBpgroup[] | undefined>(undefined);
    const [destinationDepartmentList, setDestinationDepartmentList] = useState<SapDvlinh[] | undefined>(undefined);
    const [wareHouseFrom, setWareHouseFrom] = useState();
    const [warehouseTo, setWareHouseTo] = useState();
    const [transactionType, setTransactionType] = useState<String | null>();
    const [sourceDepartment, setSourceDepartment] = useState<SapBpgroup>();
    const [destinationDepartment, setDestinationDepartment] = useState<SapDvlinh>();
    const transactionsTypes = useMemo(() => {
        return Object.keys(TransactionType).filter((item) => {
            return isNaN(Number(item));
        });
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const { width, height } = useWindowDimensions();
    const [openScanCheckFail, setOpenScanCheckFail] = useState<boolean>(false);
    const dataGridRef = useRef<DataGrid>(null);
    useEffect(() => {
        loadWareHouse();
        loadDnlnvlDetailDetail(currentDnlnvl?.id);
        loadDnlnvlMaterialScanFails(currentDnlnvl?.id);
        loadDestinationDepartment();
        loadSourceDepartment();
        // set default value for transaction type
        if (transactionsTypes.length > 0) {
            setTransactionType(transactionsTypes.find((item) => TransactionType[item] === currentDnlnvl?.transactionType));
        }
        if (width > 600) setOpenScanCheckFail(true);
    }, []);

    /**
     * Load data WareHouse
     */
    const loadWareHouse = async () => {
        try {
            const response = await axios.get(`${PLANNING_API_URL}/rest/entities/Owh`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            });
            setWareHouses(response.data);
            // set default value for warehouse from and warehouse to
            if (response.data.length > 0) {
                setWareHouseFrom(response.data.find((item) => (item as any).whsCode === currentDnlnvl?.owhCodeFrom));
                setWareHouseTo(response.data.find((item) => (item as any).whsCode === currentDnlnvl?.owhCodeTo));
            }
        } catch (error) {
            toastError(error);
        }
    };
    /**
     * load dnlnvl detail detail theo dnlnvl id
     * @param id : id of dnlnvl
     */
    const loadDnlnvlDetailDetail = async (id) => {
        try {
            dnlnvlDetailDetailCollection.current.filter = {
                conditions: [{ property: "dnlnvlDetail.dnlnvl.id", operator: "=", value: id }],
            };
            dnlnvlDetailDetailCollection.current.load().then((res) => {
                setDnlnvlDetailDetails(dnlnvlDetailDetailCollection.current.items);
            });
        } catch (error) {
            toastError(error);
        }
    };
    const loadDnlnvlMaterialScanFails = async (id) => {
        try {
            dnlnvlMaterialScanFailCollection.current.filter = {
                conditions: [{ property: "dnlnvl.id", operator: "=", value: id }],
            };
            dnlnvlMaterialScanFailCollection.current.load().then((res) => {
                setDnlnvlMaterialScanFails(dnlnvlMaterialScanFailCollection.current.items);
            });
        } catch (error) {
            toastError(error);
        }
    };
    const loadSourceDepartment = async () => {
        try {
            await sapDvlinhCollection.current.load();
            setSourceDepartmentList(sapDvlinhCollection.current.items);
            if (sapDvlinhCollection.current.items.length > 0) {
                const sourceDepartment = sapDvlinhCollection.current.items.find(
                    (item) => item.code === currentDnlnvl?.sourceDepartmentCode,
                );
                setSourceDepartment(sourceDepartment);
            }
        } catch (error) {
            toastError(error);
        }
    };
    const loadDestinationDepartment = async () => {
        try {
            await sapBpGroupCollection.current.load();
            setDestinationDepartmentList(sapBpGroupCollection.current.items);
            // set default value for destination department
            if (sapBpGroupCollection.current.items.length > 0) {
                const destinationDepartment = sapBpGroupCollection.current.items.find(
                    (item) => item.code === currentDnlnvl?.destinationDepartmentCode,
                );
                setDestinationDepartment(destinationDepartment);
            }
        } catch (error) {
            toastError(error);
        }
    };

    const onExportXlsx = () => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("ExportComparisonDetails");
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

                headerRow.getCell(1).value = "Lịch sử chi tiết đối chiếu nguyên vật liệu cho từng WO";
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "exportComparisonDetails.xlsx");
                    toastSuccess("Xuất file Excel lịch sử chi tiết đối chiếu nguyên vật liệu cho từng WO thành công");
                });
            });
    };
    /**
     * export file csv
     */

    const onExportCsv = (e) => {
        setIsLoading(true);
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("ExportComparisonDetails");
        const dataGrid = dataGridRef.current?.instance;

        exportDataGrid({
            component: dataGrid,
            worksheet,
        }).then(() => {
            workbook.csv.writeBuffer().then((buffer) => {
                saveAs(
                    new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), buffer], { type: "text/csv;charset=utf-8" }),
                    "exportComparisonDetails.csv",
                );
            });
        });
        toastSuccess("Xuất file csv lịch sử chi tiết đối chiếu nguyên vật liệu cho từng WO thành công");
        setIsLoading(false);
        e.cancel = true;
    };

    const refresh = () => {
        setIsLoading(true);
        loadDnlnvlDetailDetail(currentDnlnvl?.id).then((res) => {
            setIsLoading(false);
        });
    };
    const updateStatusWareHouse = async (status: number, materialId: number) => {
        try {
            const response = await axios.put(
                `${PLANNING_API_URL}/services/api/dnlnvl/approve/warehouse`,
                {},
                {
                    headers: {
                        Authorization: "Bear" + mainStore.authToken,
                    },
                    params: {
                        status: status,
                        dnlnvlDetailDetailId: materialId,
                    },
                },
            );
            refresh();
            toastSuccess("Cập nhật trạng thành công");
        } catch (error) {
            toastError("Cập nhật trạng thái thất bại!");
        }
    };
    const renderCheckScan = (cellData) => {
        return <CheckBox disabled value={cellData.data.scanCheck === 1} />;
    };
    const renderWarehouseStatus = (cellData) => {
        let status = "";
        let color = "";
        if (cellData.data.warehouseStatus === 0) {
            status = "Không hợp lệ";
            color = "red";
        } else if (cellData.data.warehouseStatus === 1) {
            status = "Hợp lệ";
            color = "green";
        } else {
            status = "Chưa đối chiếu";
            color = "orange";
        }
        return <div style={{ color: color }}>{status}</div>;
    };
    const dataSourceStatusWareHouse = [
        { id: null, value: "Chưa đối chiếu" },
        { id: 0, value: "Không hợp lệ" },
        { id: 1, value: "Hợp lệ" },
    ];
    const renderEditStatusWareHouse = (cellData) => {
        return (
            <SelectBox
                dataSource={dataSourceStatusWareHouse}
                displayExpr='value'
                valueExpr='id'
                onSelectionChanged={(e) => {
                    updateStatusWareHouse(e.selectedItem.id, cellData.data.id);
                }}
            />
        );
    };

    function onRepaintMobile(event) {
        if (event.rowType === "data") {
            let color;
            if (event.data.warehouseStatus === 0) {
                color = "rgba(245, 40, 30, 0.8)";
            } else if (event.data.warehouseStatus === 1) {
                color = "rgba(83, 244, 31, 0.8)";
            } else {
                color = "rgba(228, 184, 25, 0.8)";
            }
            event.cellElement.style.backgroundColor = color;
        }
    }

    const renderContent = () => {
        return (
            <ScrollView height={"100%"} useNative={true} showScrollbar='always'>
                <div
                    style={{
                        height: "100%",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        padding: "8px 16px",
                        marginTop: "8px",
                        borderRadius: "16px",
                        position: "relative",
                    }}>
                    <span
                        style={{
                            background: "#fff",
                            position: "absolute",
                            top: -10,
                            left: 30,
                            padding: "0 8px",
                        }}>
                        <b>Thông tin đề nghị lĩnh</b>
                    </span>

                    <div
                        style={{
                            padding: "4px 15px",
                            borderRadius: "16px",
                            backgroundColor:
                                currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]
                                    ? "rgba(17, 168, 32, 0.1)"
                                    : "rgba(255, 165, 0, 0.5)",
                            color:
                                currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"] ? "#00970F" : "	rgba(255, 140, 0, 1)",
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            fontSize: 15,
                        }}>
                        {currentDnlnvl?.saveSendSAP &&
                            !currentDnlnvl.saveSendMES &&
                            currentDnlnvl.status === StatusApproveEnum["Chờ gửi đối chiếu NVL"] && (
                                <span>Đã dừng đối chiếu, Đã gửi SAP</span>
                            )}
                        {currentDnlnvl?.saveSendMES &&
                            !currentDnlnvl.saveSendSAP &&
                            currentDnlnvl.status === StatusApproveEnum["Chờ gửi đối chiếu NVL"] && (
                                <span>Đã dừng đối chiếu, Đã gửi MES</span>
                            )}
                        {currentDnlnvl?.saveSendMES &&
                            currentDnlnvl.saveSendSAP &&
                            currentDnlnvl.status === StatusApproveEnum["Chờ gửi đối chiếu NVL"] && (
                                <span>Đã dừng đối chiếu, Đã gửi SAP, MES</span>
                            )}
                        {currentDnlnvl?.status === StatusApproveEnum["Đã gửi MES"] && <span>Hoàn thành đối chiếu, Đã gửi MES</span>}
                        {currentDnlnvl?.status === StatusApproveEnum["Đã gửi SAP"] && <span>Hoàn thành đối chiếu, Đã gửi SAP</span>}
                        {currentDnlnvl?.status === StatusApproveEnum["Đã gửi SAP, MES"] && (
                            <span>Hoàn thành đối chiếu, Đã gửi SAP, MES</span>
                        )}
                    </div>
                    {currentDnlnvl?.planningWorkOrder ? (
                        <div style={{ backgroundColor: "white", marginBottom: "20px" }}>
                            {width > 600 ? (
                                <Form colCount={3} alignItemLabels={true}>
                                    <SimpleItem colSpan={3}>
                                        <table width={"100%"}>
                                            <td>
                                                <InfoRow label={"Loại"} data={currentDnlnvl.dnlnvlType} />
                                                <InfoRow label={"PO"} data={currentDnlnvl?.planningWorkOrder.productOrder} />
                                                <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                                <InfoRow label={"Profile"} data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode} />
                                            </td>
                                            <td>
                                                <InfoRow label={"Mã sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productCode} />
                                                <InfoRow label={"Tên sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productName} />
                                                <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />
                                            </td>
                                            <td>
                                                <InfoRow label={"SL kế khoạch"} data={currentDnlnvl?.planningWorkOrder.quantityPlan} />
                                                {/* <InfoRow label={"Ngày bắt đầu"} data={currentDnlnvl?.planningWorkOrder.startTime} />
                    <InfoRow label={"Ngày kết thúc"} data={currentDnlnvl?.planningWorkOrder.endTime} /> */}
                                                <InfoRow
                                                    label={"Ngày bắt đầu"}
                                                    data={
                                                        currentDnlnvl?.planningWorkOrder.startTime
                                                            ? new Date(currentDnlnvl?.planningWorkOrder.startTime).toLocaleString("en-GB")
                                                            : ""
                                                    }
                                                />
                                                <InfoRow
                                                    label={"Ngày kết thúc"}
                                                    data={
                                                        currentDnlnvl?.planningWorkOrder.endTime
                                                            ? new Date(currentDnlnvl?.planningWorkOrder.endTime).toLocaleString("en-GB")
                                                            : ""
                                                    }
                                                />
                                            </td>
                                        </table>
                                    </SimpleItem>
                                </Form>
                            ) : (
                                <Form colCount={2} alignItemLabels={true}>
                                    <SimpleItem colSpan={2}>
                                        <table width={"100%"}>
                                            <td>
                                                <InfoRow label={"Loại"} data={currentDnlnvl.dnlnvlType} />
                                                <InfoRow label={"PO"} data={currentDnlnvl?.planningWorkOrder.productOrder} />
                                                <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                                <InfoRow label={"Profile"} data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode} />
                                                <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />
                                            </td>
                                            <td>
                                                <InfoRow label={"Mã sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productCode} />
                                                <InfoRow label={"Tên sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productName} />
                                                <InfoRow label={"SL kế khoạch"} data={currentDnlnvl?.planningWorkOrder.quantityPlan} />
                                                <InfoRow label={"Ngày bắt đầu"} data={currentDnlnvl?.planningWorkOrder.startTime} />
                                                <InfoRow label={"Ngày kết thúc"} data={currentDnlnvl?.planningWorkOrder.endTime} />
                                            </td>
                                        </table>
                                    </SimpleItem>
                                </Form>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <Button
                        text={"Quét nguyên vật liệu"}
                        style={{
                            color: "#fff",
                            background: "rgba(31, 110, 229, 1)",
                            borderRadius: 8,
                            padding: "8px 4px",
                            fontSize: 16,
                        }}
                        disabled={true}
                    />
                    <DataGrid
                        keyExpr={"material"}
                        showColumnLines={true}
                        rowAlternationEnabled={true}
                        columnAutoWidth={true}
                        repaintChangesOnly={true}
                        showBorders={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        focusedRowEnabled={true}
                        dataSource={dnlnvlDetailDetails}
                        ref={dataGridRef}
                        noDataText='Không có dữ liệu để hiển thị'
                        height={width <= 600 ? "100vh" : undefined}
                        onCellPrepared={width <= 600 ? onRepaintMobile : undefined}>
                        <Toolbar visible={true}>
                            <ToolbarItemDataGrid location={"before"}>
                                <div>
                                    <h5
                                        style={{
                                            marginBottom: 0,
                                        }}>
                                        Danh sách nguyên vật liệu đối chiếu thành công
                                    </h5>
                                </div>
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"}>
                                <Button onClick={onExportXlsx} icon='xlsxfile' hint='Xuất file Excel' />
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"}>
                                <Button onClick={onExportCsv} icon='csvfile' hint='Xuất file Csv' />
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"} name={"exportButton"} />
                            <ToolbarItemDataGrid location={"after"}>
                                <Button hint='Refresh' icon='refresh' onClick={refresh} />
                            </ToolbarItemDataGrid>
                        </Toolbar>
                        {width > 600 && <Paging defaultPageSize={5} enabled={true} />}
                        {width > 600 && (
                            <Pager
                                visible={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                allowedPageSizes={[5, 10]}
                                displayMode='full'
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />
                        )}
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
                            visible={true}
                            texts={{
                                cancel: "Hủy bỏ",
                                emptyValue: "Rỗng",
                                ok: "Đồng ý",
                            }}
                        />
                        <Column dataField='materialName' caption={"Material"} allowEditing={false} alignment='left' />
                        <Column dataField='partNumberCode' caption='Part Number' allowEditing={false} />
                        {width > 600 && <Column dataField='userData4' caption={"User Data 4"} allowEditing={false} />}
                        <Column dataField='reserveQty' caption={"Số lượng"} alignment='left' allowEditing={false} />
                        {width > 600 && <Column dataField={"lot"} caption={"Số LOT"} allowEditing={false} />}
                        <Column dataField='locationType' caption={"Location Type"} allowEditing={false} />
                        {width > 600 && (
                            <Column
                                dataField='scanCheck'
                                caption={"Check Scan"}
                                allowEditing={false}
                                alignment='center'
                                cellRender={renderCheckScan}
                            />
                        )}
                        {width > 600 && (
                            <Column
                                dataField='warehouseStatus'
                                caption={"Trạng thái"}
                                alignment='left'
                                cellRender={renderWarehouseStatus}
                                editCellRender={renderEditStatusWareHouse}
                                allowEditing={false}>
                                <HeaderFilter
                                    visible={false}
                                    dataSource={[
                                        { text: "Chưa đối chiếu", value: null },
                                        { text: "Không hợp lệ", value: 0 },
                                        { text: "Hợp lệ", value: 1 },
                                    ]}
                                />
                            </Column>
                        )}
                        <Editing mode='batch' allowUpdating={true} />
                    </DataGrid>
                    {width <= 600 && (
                        <Button
                            style={{
                                color: "#fff",
                                background: "rgba(31, 110, 229, 1)",
                                borderRadius: 8,
                                padding: "8px 4px",
                                fontSize: 16,
                            }}
                            onClick={() => setOpenScanCheckFail((prev) => !prev)}>
                            Danh sách NVL đối chiếu thừa
                        </Button>
                    )}
                    {openScanCheckFail && (
                        <DataGrid
                            keyExpr={"id"}
                            showColumnLines={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            repaintChangesOnly={true}
                            showBorders={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            dataSource={dnlnvlMaterialScanFails}
                            noDataText='Không có dữ liệu để hiển thị'
                            height={width <= 600 && dnlnvlMaterialScanFails.length > 0 ? "100vh" : undefined}>
                            {width <= 600 && <Scrolling mode={"infinite"} />}
                            <Toolbar visible={true}>
                                <ToolbarItemDataGrid location={"before"}>
                                    <div>
                                        <h5
                                            style={{
                                                marginBottom: 0,
                                            }}>
                                            Danh sách nguyên vật liệu đối chiếu thừa
                                        </h5>
                                    </div>
                                </ToolbarItemDataGrid>
                            </Toolbar>
                            {width > 600 && <Paging defaultPageSize={5} enabled={true} />}
                            {width > 600 && (
                                <Pager
                                    visible={true}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    allowedPageSizes={[5, 10]}
                                    displayMode='full'
                                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                />
                            )}
                            <FilterRow visible={true} applyFilter={"auto"} />
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    emptyValue: "Rỗng",
                                    ok: "Đồng ý",
                                }}
                            />
                            <Column caption={"Material"} dataField={"materialName"} />
                            <Column caption={"Part Number"} dataField={"partNumber"} />
                            {width > 600 && <Column caption={"User Data 4"} dataField={"userData4"} />}
                            <Column caption={"Số lượng"} dataField={"quantity"} />
                            {width > 600 && <Column caption={"Số LOT"} dataField={"lot"} />}
                            <Column
                                caption={"Trạng thái"}
                                cellRender={() => {
                                    return <div style={{ color: "red" }}>Thất bại</div>;
                                }}
                            />
                        </DataGrid>
                    )}
                </div>
                <div
                    style={{
                        position: "relative",
                        marginTop: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "16px",
                        padding: "16px",
                        display: "grid",
                        gridTemplateColumns: width > 600 ? "30% 30% 30%" : "45% 45%",
                        gridTemplateRows: width > 600 ? "auto auto auto" : "auto auto auto auto",
                        justifyContent: "space-between",
                        rowGap: "20px",
                    }}>
                    <span
                        style={{
                            background: "#fff",
                            position: "absolute",
                            top: -10,
                            left: 30,
                            padding: "0 8px",
                        }}>
                        <b>Chọn thông tin gửi SAP, QMS, Panacim</b>
                    </span>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn kho gửi
                        </div>
                        <SelectBox
                            style={{}}
                            placeholder={"-- Lựa chọn --"}
                            displayExpr={"whsName"}
                            dataSource={wareHouses}
                            value={wareHouseFrom}
                            onSelectionChanged={(e) => {
                                setWareHouseFrom(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn loại giao dịch
                        </div>
                        <SelectBox
                            placeholder={"-- Lựa chọn --"}
                            dataSource={transactionsTypes}
                            value={transactionType}
                            onSelectionChanged={(e) => {
                                setTransactionType(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchMode={"contains"}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn đơn vị lĩnh
                        </div>
                        <SelectBox
                            displayExpr={"name"}
                            placeholder={"-- Lựa chọn --"}
                            dataSource={sourceDepartmentList}
                            value={sourceDepartment}
                            onSelectionChanged={(e) => {
                                setSourceDepartment(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["name"]}
                            searchMode={"contains"}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn kho đến
                        </div>
                        <SelectBox
                            items={wareHouses}
                            placeholder={"-- Lựa chọn --"}
                            displayExpr={"whsName"}
                            value={warehouseTo}
                            onSelectionChanged={(e) => {
                                setWareHouseTo(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn đối tượng
                        </div>
                        <SelectBox
                            displayExpr={"name"}
                            placeholder={"-- Lựa chọn --"}
                            dataSource={destinationDepartmentList}
                            value={destinationDepartment}
                            onSelectionChanged={(e) => {
                                setDestinationDepartment(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["name"]}
                            searchMode={"contains"}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Chọn hệ thống nhận
                            </div>
                            <div
                                style={{
                                    marginTop: "4px",
                                }}>
                                <CheckBox
                                    disabled={true}
                                    value={currentDnlnvl?.saveSendSAP ? currentDnlnvl.saveSendSAP : false}
                                    text={"Gửi SAP"}
                                />
                                <CheckBox
                                    disabled={true}
                                    value={currentDnlnvl?.saveSendMES ? currentDnlnvl.saveSendMES : false}
                                    text={"Gửi MES"}
                                    style={{
                                        marginLeft: "30px",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Ghi chú
                        </div>
                        <TextArea
                            placeholder={"Nhập ghi chú"}
                            value={currentDnlnvl?.noteSendSAP ? currentDnlnvl?.noteSendSAP : ""}
                            disabled={true}
                        />
                    </div>
                </div>
            </ScrollView>
        );
    };
    return (
        <>
            <Popup
                visible={visible}
                onHiding={setClose}
                title='Thông tin đề nghị lĩnh đã đối chiếu NVL'
                showTitle={true}
                fullScreen={false}
                dragEnabled={false}
                resizeEnabled={false}
                hideOnOutsideClick={true}
                contentRender={renderContent}
                height={width > 600 ? "95%" : "100%"}
                width={width > 600 ? undefined : "100%"}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        stylingMode: "outlined",
                        onClick: setClose,
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Lưu",
                        type: "default",
                        disabled: true,
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Gửi",
                        type: "success",
                        disabled: true,
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hoàn thành",
                        type: "success",
                        disabled: true,
                    }}
                />
            </Popup>
        </>
    );
};

export default DnlnvlHistoryCompareMaterialPopup;
