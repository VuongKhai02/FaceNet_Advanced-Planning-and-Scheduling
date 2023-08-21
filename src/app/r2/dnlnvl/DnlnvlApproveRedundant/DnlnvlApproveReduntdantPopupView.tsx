import { useMemo } from "react";
import { useMainStore, useCollection } from "@haulmont/jmix-react-core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { custom } from "devextreme/ui/dialog";
import { Button, DataGrid, Form, Popup, ScrollView } from "devextreme-react";
import {
    Export,
    Column,
    FilterRow,
    HeaderFilter,
    Pager,
    Paging,
    Toolbar,
    Item as ToolbarItemDataGrid,
    GroupPanel,
    Grouping,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { useEffect, useRef, useState } from "react";
import { PLANNING_API_URL } from "../../../../config";
import { ReturnMaterial } from "../../../../jmix/entities/ReturnMaterial";
import { ReturnMaterialDetail } from "../../../../jmix/entities/ReturnMaterialDetail";
import InfoRow from "../../../../utils/InfoRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { ReturnMaterialStatuses } from "../../enum/statusEnum";
import { saveAs } from "file-saver-es";
import UserService from "../../../../Keycloak";

type DnlnvlApproveRedundantPopupViewProps = {
    isOpen: boolean;
    onClose: () => void;
    currentReturnMaterial?: ReturnMaterial;
};
const DnlnvlApproveRedundantPopupView = ({
    isOpen = false,
    onClose = () => {},
    currentReturnMaterial = {} as ReturnMaterial,
}: DnlnvlApproveRedundantPopupViewProps) => {
    const returnMaterialDetailCollection = useCollection<ReturnMaterialDetail>(ReturnMaterialDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const returnMaterialDetailWorkOrderCollection = useCollection<ReturnMaterialDetail>(ReturnMaterialDetail.NAME, {
        view: "full-info",
        loadImmediately: false,
        filter: {
            conditions: [
                {
                    property: "returnMaterial.planningWorkOrder.woId",
                    operator: "=",
                    value: currentReturnMaterial.planningWorkOrder?.woId ?? "",
                },
            ],
        },
    });
    const mainStore = useMainStore();
    const [popupMaterialRedundant, setPopupMaterialRedundant] = useState(false);
    const [returnMaterialDetailList, setReturnMaterialDetailList] = useState<ReturnMaterialDetail[]>([]);
    const [returnMaterialDetailWorkOrderList, setReturnMaterialDetailWorkOrderList] = useState<ReturnMaterialDetail[]>([]);
    const dataGridRef = useRef<DataGrid>(null);
    useEffect(() => {
        loadMaterialDetails();
        loadMaterialDetailsWorkOrder();
    }, []);

    const userName = useMemo(() => {
        return UserService.getUsername();
    }, []);

    const loadMaterialDetails = () => {
        if (currentReturnMaterial.id) {
            returnMaterialDetailCollection.current.filter = {
                conditions: [{ property: "returnMaterial.id", operator: "=", value: currentReturnMaterial.id }],
            };
            returnMaterialDetailCollection.current.load().then((data) => {
                setReturnMaterialDetailList(returnMaterialDetailCollection.current.items);
            });
        }
    };
    const loadMaterialDetailsWorkOrder = () => {
        if (currentReturnMaterial.planningWorkOrder?.woId) {
            returnMaterialDetailWorkOrderCollection.current.load().then((data) => {
                setReturnMaterialDetailWorkOrderList(returnMaterialDetailWorkOrderCollection.current.items);
            });
        }
    };
    const refresh = () => {
        loadMaterialDetails();
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

                headerRow.getCell(1).value = "Chi tiết phê duyệt trả nguyên vật liệu dư thừa theo WO";
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "exportMaterialRedundantDetails.xlsx");
                    toastSuccess("Xuất file Excel chi tiết phê duyệt trả nguyên vật liệu dư thừa theo WO thành công");
                });
            });
    };
    /**
     * export file csv
     */

    const onExportCsv = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("exportMaterialRedundantDetails");
        const dataGrid = dataGridRef.current?.instance;
        exportDataGrid({
            component: dataGrid,
            worksheet,
        }).then(() => {
            workbook.csv.writeBuffer().then((buffer) => {
                saveAs(
                    new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), buffer], { type: "text/csv;charset=utf-8" }),
                    "exportMaterialRedundantDetails.csv",
                );
            });
        });
        toastSuccess("Xuất file csv chi tiết phê duyệt trả nguyên vật liệu dư thừa theo WO thành công");
        e.cancel = true;
    };

    const rejectReturnMaterial = async () => {
        const promptPromise = custom({
            title: "Từ chối trả vật tư dư thừa",
            messageHtml: "Bạn muốn từ chối yêu cầu trả NVL dư thừa không?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Từ chối",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        let confirmMaterial = false;
        await promptPromise.show().then((res) => {
            if (res) {
                confirmMaterial = true;
            }
        });
        if (confirmMaterial) {
            axios
                .put(
                    `${PLANNING_API_URL}/services/api/reject-material-return/${currentReturnMaterial.id}`,
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + mainStore.authToken,
                        },
                        params: {
                            userConfirm: userName,
                        },
                    },
                )
                .then((res) => {
                    toastSuccess("Từ chối trả kho thành công");
                    onClose();
                })
                .catch((err) => {
                    toastError("Từ chối trả kho thất bại");
                });
        }
    };
    const approveReturnMaterial = async () => {
        const promptPromise = custom({
            title: "Phê duyệt trả vật tư dư thừa",
            messageHtml: "Bạn muốn phê duyệt yêu cầu trả NVL dư thừa không?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Phê duyệt",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        let confirmMaterial = false;
        await promptPromise.show().then((res) => {
            if (res) {
                confirmMaterial = true;
            }
        });
        if (confirmMaterial) {
            axios
                .put<string>(
                    `${PLANNING_API_URL}/services/api/confirm-material-return/${currentReturnMaterial.id}`,
                    returnMaterialDetailList,
                    {
                        headers: {
                            Authorization: "Bearer " + mainStore.authToken,
                        },
                        params: {
                            userConfirm: userName,
                        },
                    },
                )
                .then((res: AxiosResponse<string>) => {
                    toastSuccess("Phê duyệt trả nguyên vật liệu dư thừa về kho thành công");
                    onClose();
                })
                .catch((err: AxiosError<string>) => {
                    toastError(`Phê duyệt trả nguyên vật liệu dư thừa về kho thất bại ${err.response?.data ? err.response?.data : ""}`);
                });
        }
    };
    const popUpDetailContentRender = () => {
        return (
            <ScrollView height={"100%"} useNative={true} showScrollbar='always'>
                <div style={{ height: "100%" }}>
                    {currentReturnMaterial.returnMaterialStatus === ReturnMaterialStatuses["Chờ duyệt trả kho"] && (
                        <div
                            style={{
                                padding: "2px 10px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(175, 25, 228, 0.1)",
                                color: "#AF19E4",
                                position: "absolute",
                                top: "1px",
                                right: "1px",
                                fontSize: 15,
                            }}>
                            <span>Chờ duyệt trả kho</span>
                        </div>
                    )}
                    {currentReturnMaterial.returnMaterialStatus === ReturnMaterialStatuses["Bị từ chối"] && (
                        <div
                            style={{
                                padding: "2px 10px",
                                borderRadius: "16px",
                                background: "rgba(229, 28, 15, 0.1)",
                                color: "#E51C0F",
                                position: "absolute",
                                top: "1px",
                                right: "1px",
                                fontSize: 15,
                            }}>
                            <span>Bị từ chối</span>
                        </div>
                    )}
                    {currentReturnMaterial.returnMaterialStatus === ReturnMaterialStatuses["Hoàn thành"] && (
                        <div
                            style={{
                                padding: "2px 10px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(17, 168, 32, 0.1)",
                                color: "rgba(0, 151, 15, 0.9)",
                                position: "absolute",
                                top: "1px",
                                right: "1px",
                                fontSize: 15,
                            }}>
                            <span>Hoàn thành</span>
                        </div>
                    )}
                    <div>
                        {currentReturnMaterial.planningWorkOrder ? (
                            <>
                                <div
                                    style={{
                                        backgroundColor: "white",
                                    }}>
                                    <Form colCount={3} alignItemLabels>
                                        <SimpleItem colSpan={3}>
                                            <table
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}>
                                                <td>
                                                    <InfoRow
                                                        space={70}
                                                        label={"PO"}
                                                        data={currentReturnMaterial?.planningWorkOrder.productOrder}
                                                    />
                                                    <InfoRow space={70} label={"WO"} data={currentReturnMaterial?.planningWorkOrder.woId} />
                                                    <InfoRow
                                                        space={70}
                                                        label={"Profile"}
                                                        data={currentReturnMaterial?.planningWorkOrder.profileId?.profileCode}
                                                    />
                                                </td>
                                                <td>
                                                    <InfoRow
                                                        space={120}
                                                        label={"Mã sản phẩm"}
                                                        data={currentReturnMaterial?.planningWorkOrder.productCode}
                                                    />
                                                    <InfoRow
                                                        space={120}
                                                        label={"Tên sản phẩm"}
                                                        data={currentReturnMaterial?.planningWorkOrder.productName}
                                                    />
                                                    <InfoRow
                                                        space={120}
                                                        label={"Dây chuyền"}
                                                        data={currentReturnMaterial?.planningWorkOrder.line}
                                                    />
                                                </td>
                                                <td>
                                                    <InfoRow
                                                        space={120}
                                                        label={"SL kế hoạch"}
                                                        data={currentReturnMaterial?.planningWorkOrder.quantityPlan}
                                                    />
                                                    {/* <InfoRow space={120} label={"Ngày bắt đầu"} data={currentReturnMaterial?.planningWorkOrder.startTime} />
                                                    <InfoRow space={120} label={"Ngày kết thúc"} data={currentReturnMaterial?.planningWorkOrder.endTime} /> */}

                                                    <InfoRow
                                                        label={"Ngày bắt đầu"}
                                                        data={
                                                            currentReturnMaterial?.planningWorkOrder.startTime
                                                                ? new Date(
                                                                      currentReturnMaterial?.planningWorkOrder.startTime,
                                                                  ).toLocaleString("en-GB")
                                                                : ""
                                                        }
                                                    />
                                                    <InfoRow
                                                        label={"Ngày kết thúc"}
                                                        data={
                                                            currentReturnMaterial?.planningWorkOrder.endTime
                                                                ? new Date(currentReturnMaterial?.planningWorkOrder.endTime).toLocaleString(
                                                                      "en-GB",
                                                                  )
                                                                : ""
                                                        }
                                                    />
                                                </td>
                                            </table>
                                        </SimpleItem>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <Button
                            style={{
                                width: 200,
                                height: 47,
                                color: "#FFFFFF",
                                backgroundColor: "#1F6EE5",
                                marginTop: 30,
                                fontSize: 14,
                                borderRadius: 10,
                            }}
                            onClick={() => setPopupMaterialRedundant(true)}
                            // disabled={true}
                        >
                            Thống kê NVL dư thừa{" "}
                        </Button>
                        <Popup
                            visible={popupMaterialRedundant}
                            showCloseButton={true}
                            onHiding={() => setPopupMaterialRedundant(false)}
                            titleComponent={(e) => {
                                return <div>Danh sách nguyên vật liệu dư thừa theo Work Order </div>;
                            }}
                            showTitle={true}
                            hideOnOutsideClick={true}
                            dragEnabled={false}>
                            <ToolbarItem
                                widget='dxButton'
                                toolbar='bottom'
                                location='after'
                                options={{
                                    text: "Hủy bỏ",
                                    stylingMode: "outlined",
                                    onClick: () => setPopupMaterialRedundant(false),
                                }}
                            />
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
                                dataSource={returnMaterialDetailWorkOrderList}
                                onExporting={onExportCsv}
                                noDataText='Không có dữ liệu để hiển thị'>
                                <Paging enabled={true} defaultPageSize={10} />

                                <Pager
                                    visible={true}
                                    displayMode={"full"}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    allowedPageSizes={[5, 10]}
                                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                />
                                <HeaderFilter
                                    visible={true}
                                    texts={{
                                        cancel: "Hủy bỏ",
                                        ok: "Đồng ý",
                                        emptyValue: "Rỗng",
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
                                <Column dataField={"returnMaterial.planningWorkOrder.productCode"} caption={"Mã hàng hóa"}>
                                    {" "}
                                </Column>
                                <Column dataField='returnMaterial.planningWorkOrder.productName' caption='Tên hàng hóa' />
                                <Column dataField='returnMaterial.planningWorkOrder.lotNumber' caption='Số LOT' />
                                <Column dataField='excessQuantity' caption='Số lượng' alignment={"left"} />
                            </DataGrid>
                        </Popup>
                        <DataGrid
                            keyExpr='materialName'
                            showColumnLines={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            repaintChangesOnly={true}
                            showBorders={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            dataSource={returnMaterialDetailList}
                            ref={dataGridRef}
                            noDataText='Không có dữ liệu để hiển thị'>
                            <Toolbar>
                                <ToolbarItemDataGrid location={"after"}>
                                    <Button onClick={onExportXlsx} icon='xlsxfile' hint='Xuất file Excel' />
                                </ToolbarItemDataGrid>
                                <ToolbarItemDataGrid location={"after"}>
                                    <Button onClick={onExportCsv} icon='csvfile' hint='Xuất file Csv' />
                                </ToolbarItemDataGrid>
                                <ToolbarItemDataGrid location={"after"} name={"exportButton"} />
                                <ToolbarItemDataGrid location={"after"}>
                                    <Button onClick={refresh} hint={"Làm mới"} icon='refresh' />
                                </ToolbarItemDataGrid>
                            </Toolbar>
                            <Paging enabled={true} defaultPageSize={10} />
                            <Pager
                                visible={true}
                                displayMode={"full"}
                                showInfo={true}
                                showNavigationButtons={true}
                                allowedPageSizes={[5, 10]}
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
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                            />
                            <Column dataField='materialName' caption={"Material"} />
                            <Column dataField='partNumber' caption='PartNumber' />
                            <Column dataField='vendor' caption='Vendor' />
                            <Column dataField='lot' caption='Số LOT' />
                            <Column dataField='userData4' caption={"User Data 4"} />
                            <Column dataField={"quantity"} caption={"Số lượng kế hoạch"} alignment={"left"} />
                            <Column dataField='excessQuantity' caption={"Số lượng dư thừa"} alignment={"left"} />
                            <GroupPanel visible={true} allowColumnDragging={true} />
                            <Grouping autoExpandAll={true} />
                        </DataGrid>
                    </div>
                </div>
            </ScrollView>
        );
    };

    return (
        <Popup
            visible={isOpen}
            onHiding={onClose}
            title='Chi tiết phê duyệt trả nguyên vật liệu dư thừa theo WO'
            showTitle={true}
            fullScreen={false}
            contentRender={popUpDetailContentRender}
            dragEnabled={false}
            resizeEnabled={true}
            hideOnOutsideClick={true}>
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Hủy bỏ ",
                    stylingMode: "outlined",
                    onClick: onClose,
                }}
            />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Từ chối",
                    type: "danger",
                    onClick: rejectReturnMaterial,
                }}
                disabled={currentReturnMaterial.returnMaterialStatus !== ReturnMaterialStatuses["Chờ duyệt trả kho"]}
            />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Phê duyệt",
                    type: "default",
                    onClick: approveReturnMaterial,
                }}
                disabled={currentReturnMaterial.returnMaterialStatus !== ReturnMaterialStatuses["Chờ duyệt trả kho"]}
            />
        </Popup>
    );
};

export default DnlnvlApproveRedundantPopupView;
