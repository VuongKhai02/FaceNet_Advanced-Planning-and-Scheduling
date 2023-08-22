import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import axios from "axios";
import { Button, CheckBox, DataGrid, Form, Popup, ScrollView, SelectBox, TextArea } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem1,
    OperationDescriptions,
    Pager,
    Paging,
    Toolbar,
} from "devextreme-react/data-grid";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import InfoRow from "../../../../utils/InfoRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { PLANNING_API_URL } from "../../../../config";
import { ReturnMaterialStatuses, TransactionType } from "../../enum/statusEnum";
import { User } from "../../../../jmix/entities/User";
import { ReturnMaterialDetail } from "../../../../jmix/entities/ReturnMaterialDetail";
import { ReturnMaterial } from "../../../../jmix/entities/ReturnMaterial";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";

import { saveAs } from "file-saver-es";
import { useWindowDimensions } from "../../../../hooks";

type DnlnvlGivebackRedundantPopupProps = {
    visible: boolean;
    setClose: () => void;
    currentReturnMaterial: ReturnMaterial | undefined;
};
const DnlnvlHistoryGivebackRedundantPopup = ({
    visible = false,
    setClose = () => {},
    currentReturnMaterial = {} as ReturnMaterial,
}: DnlnvlGivebackRedundantPopupProps) => {
    const usersCollection = useCollection<User>(User.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const returnMaterialDetailCollection = useCollection<ReturnMaterialDetail>(ReturnMaterialDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const mainStore = useMainStore();
    const dataGridRef = useRef<DataGrid>(null);
    const [returnMaterialDetailList, setReturnMaterialDetailList] = useState<ReturnMaterialDetail[]>([]);
    const [user, setUser] = useState<User>();
    const [usernameSelected, setUsernameSelected] = useState<String>("");
    const [users, setUsers] = useState<User[]>([]);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [warehouse, setWarehouse] = useState<any>();
    const [transactionType, setTransactionType] = useState<string>("");
    const transactionsTypes = useMemo(() => {
        return Object.keys(TransactionType).filter((item) => {
            return isNaN(Number(item));
        });
    }, []);

    const { width } = useWindowDimensions();
    useEffect(() => {
        loadWarehouses(currentReturnMaterial?.owhCodeTo || null);
        loadUsers();
        loadReturnMaterialDetail(currentReturnMaterial?.id);
        const newTransactionType = transactionsTypes.find((item) => TransactionType[item] === currentReturnMaterial?.transactionType);
        setTransactionType(newTransactionType || "");
    }, []);
    const loadWarehouses = (whCode: string | null) => {
        // console.log("current whCode", whCode)
        axios
            .get(`${PLANNING_API_URL}/rest/entities/Owh`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((res) => {
                setWarehouses(res.data);
                setWarehouse(res.data.find((item) => item.whsCode === whCode));
            })
            .catch((error) => {
                toastError(error);
            });
    };
    const loadUsers = async () => {
        await axios
            .get(`${PLANNING_API_URL}/services/keycloak/getUsers?username=`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((response) => {
                setUsers(response.data);
                const newUser = response.data.find((user) => user.username === currentReturnMaterial?.userManageExcessQuantity);
                if (newUser) {
                    setUser(newUser);
                    setUsernameSelected(newUser.username as string);
                }
            })
            .catch((e) => {});
    };
    const loadReturnMaterialDetail = async (returnMaterialId) => {
        returnMaterialDetailCollection.current.filter = {
            conditions: [
                {
                    group: "AND",
                    conditions: [{ property: "returnMaterial.id", operator: "=", value: returnMaterialId }],
                },
            ],
        };
        returnMaterialDetailCollection.current.load().then((res) => {
            setReturnMaterialDetailList(returnMaterialDetailCollection.current.items);
        });
    };

    const onExportXlsx = () => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("exportMaterialRedundantDetails");
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

                headerRow.getCell(1).value = "Chi tiết lịch sử trả vật tư dư thừa";
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
                    toastSuccess("Xuất file excel lịch sử chi tiết trả vật tư dư thừa thành công");
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
        toastSuccess("Xuất file csv chi tiết trả vật tư dư thừa thành công");
        e.cancel = true;
    };
    const [location, setLocation] = useState<string>();

    function updateLocation(filterExp: any) {
        if (filterExp && filterExp[0] && filterExp[0][2]) {
            setLocation(filterExp[0][2]);
        }
    }

    const renderContent = () => {
        return (
            <ScrollView useNative={true} showScrollbar='always'>
                <div
                    style={{
                        height: "100%",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        borderRadius: "16px",
                        padding: "16px",
                        position: "relative",
                        marginTop: "8px",
                    }}>
                    <span
                        style={{
                            position: "absolute",
                            background: "#fff",
                            top: "-10px",
                            left: "30px",
                            padding: "0 5px",
                        }}>
                        <b>Thông tin đề nghị lĩnh</b>
                    </span>
                    {currentReturnMaterial?.returnMaterialStatus === ReturnMaterialStatuses["Chờ duyệt trả kho"] && (
                        <div
                            style={{
                                padding: "4px 15px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(228, 184, 25, 0.1)",
                                color: "rgba(228, 184, 25, 1)",
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: 15,
                            }}>
                            <span>Chờ duyệt trả kho</span>
                        </div>
                    )}
                    {currentReturnMaterial?.returnMaterialStatus === ReturnMaterialStatuses["Chờ duyệt trả kho"] && (
                        <div
                            style={{
                                padding: "4px 15px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(228, 184, 25, 0.1)",
                                color: "rgba(228, 184, 25, 1)",
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: 15,
                            }}>
                            <span>Chờ duyệt trả kho</span>
                        </div>
                    )}
                    {currentReturnMaterial?.returnMaterialStatus === ReturnMaterialStatuses["Đã gửi SAP"] && (
                        <div
                            style={{
                                padding: "4px 15px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(17, 168, 32, 0.1)",
                                color: "rgba(0, 151, 15, 0.9)",
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: 15,
                            }}>
                            <span>Đã gửi SAP</span>
                        </div>
                    )}
                    {currentReturnMaterial?.returnMaterialStatus === ReturnMaterialStatuses["Đã gửi MES"] && (
                        <div
                            style={{
                                padding: "4px 15px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(17, 168, 32, 0.1)",
                                color: "rgba(0, 151, 15, 0.9)",
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: 15,
                            }}>
                            <span>Đã gửi MES</span>
                        </div>
                    )}
                    {currentReturnMaterial?.returnMaterialStatus === ReturnMaterialStatuses["Đã gửi SAP, MES"] && (
                        <div
                            style={{
                                padding: "4px 15px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(17, 168, 32, 0.1)",
                                color: "rgba(0, 151, 15, 0.9)",
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: 15,
                            }}>
                            <span>Đã gửi SAP, MES</span>
                        </div>
                    )}
                    {currentReturnMaterial?.returnMaterialStatus === ReturnMaterialStatuses["Bị từ chối"] && (
                        <div
                            style={{
                                padding: "4px 15px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(229, 28, 15, 0.1)",
                                color: "#E51C0F",
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: 15,
                            }}>
                            <span>Bị từ chối</span>
                        </div>
                    )}
                    <div>
                        {currentReturnMaterial ? (
                            <>
                                <div style={{ backgroundColor: "white" }}>
                                    <Form colCount={3} alignItemLabels={true}>
                                        <SimpleItem colSpan={3}>
                                            <table
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}>
                                                <td>
                                                    <InfoRow label={"PO"} data={currentReturnMaterial.planningWorkOrder?.productCode} />
                                                    <InfoRow label={"WO"} data={currentReturnMaterial.planningWorkOrder?.woId} />
                                                    <InfoRow
                                                        label={"Profile"}
                                                        data={currentReturnMaterial.planningWorkOrder?.profileId?.profileCode}
                                                    />
                                                </td>

                                                <td>
                                                    <InfoRow
                                                        label={"Mã sản phẩm"}
                                                        data={currentReturnMaterial.planningWorkOrder?.productCode}
                                                    />
                                                    <InfoRow
                                                        label={"Tên sản phẩm"}
                                                        data={currentReturnMaterial.planningWorkOrder?.productName}
                                                    />
                                                    <InfoRow label={"Dây chuyền"} data={currentReturnMaterial.planningWorkOrder?.line} />
                                                </td>

                                                <td>
                                                    <InfoRow
                                                        label={"SL kế hoạch"}
                                                        data={currentReturnMaterial.planningWorkOrder?.quantityPlan}
                                                    />
                                                    {/* <InfoRow label={"Ngày bắt đầu"} data={currentReturnMaterial.planningWorkOrder?.startTime} />
                                                    <InfoRow label={"Ngày kết thúc"} data={currentReturnMaterial.planningWorkOrder?.endTime} /> */}

                                                    <InfoRow
                                                        label={"Ngày bắt đầu"}
                                                        data={
                                                            currentReturnMaterial.planningWorkOrder?.startTime
                                                                ? new Date(
                                                                      currentReturnMaterial.planningWorkOrder?.startTime,
                                                                  ).toLocaleString("en-GB")
                                                                : ""
                                                        }
                                                    />
                                                    <InfoRow
                                                        label={"Ngày kết thúc"}
                                                        data={
                                                            currentReturnMaterial.planningWorkOrder?.endTime
                                                                ? new Date(currentReturnMaterial.planningWorkOrder?.endTime).toLocaleString(
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
                                color: "#FFFFFF",
                                backgroundColor: "#1F6EE5",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                marginTop: 30,
                                fontSize: 16,
                            }}
                            disabled>
                            Quét mã nguyên vật liệu dư thừa
                        </Button>
                        <DataGrid
                            keyExpr='id'
                            showColumnLines={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            repaintChangesOnly={true}
                            showBorders={true}
                            activeStateEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            // focusedRowEnabled={true}
                            ref={dataGridRef}
                            dataSource={returnMaterialDetailList}
                            noDataText='Không có dữ liệu để hiển thị'>
                            <Toolbar>
                                <ToolbarItem1 location={"after"}>
                                    <Button onClick={onExportXlsx} icon='xlsxfile' hint='Xuất file Excel' />
                                </ToolbarItem1>
                                <ToolbarItem1 location={"after"}>
                                    <Button onClick={onExportCsv} icon='csvfile' hint='Xuất file Csv' />
                                </ToolbarItem1>

                                <ToolbarItem1 location={"after"} name={"exportButton"} />
                            </Toolbar>
                            <Paging enabled={true} defaultPageSize={5} />
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
                            <Column type='buttons' caption={"Tùy chọn"}></Column>
                            <Column dataField='materialName' caption={"Material"} allowEditing={false} alignment={"left"} />
                            <Column dataField='partNumber' caption='PartNumber' allowEditing={false} />
                            <Column dataField={"vendor"} caption={"Vendor"} allowEditing={false} />
                            <Column dataField={"lot"} caption={"Số LOT"} allowEditing={false} />
                            <Column dataField='userData4' caption={"User Data 4"} allowEditing={false} />
                            <Column dataField={"quantity"} caption={"Số lượng kế hoạch"} allowEditing={false} alignment={"left"} />
                            <Column dataField='excessQuantity' caption={"Số lượng dư thừa"} alignment={"left"} />
                        </DataGrid>
                    </div>
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
                        gridTemplateRows: width > 600 ? "auto auto" : "auto auto auto",
                        justifyContent: "center",
                        rowGap: "20px",
                    }}>
                    <span
                        style={{
                            position: "absolute",
                            background: "#fff",
                            top: "-10px",
                            left: "30px",
                            padding: "0 5px",
                        }}>
                        <b>Chọn thông tin trả kho</b>
                    </span>
                    <div>
                        <div
                            style={{
                                fontWeight: "600",
                                marginBottom: "4px",
                                paddingLeft: "4px",
                            }}>
                            Chọn bộ phận quản lý kho phê duyệt
                        </div>
                        <SelectBox
                            style={{
                                width: 280,
                            }}
                            dataSource={users}
                            value={user}
                            onSelectionChanged={(e) => {
                                setUser(e.selectedItem);
                            }}
                            displayExpr={"username"}
                            placeholder={"--Lựa chọn--"}
                            searchEnabled={true}
                            disabled
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                fontWeight: "600",
                                marginBottom: "4px",
                                paddingLeft: "4px",
                            }}>
                            Chọn kho đến
                        </div>
                        <SelectBox
                            style={{
                                width: 280,
                            }}
                            dataSource={warehouses}
                            value={warehouse}
                            onSelectionChanged={(e) => {
                                setWarehouse(e.selectedItem);
                            }}
                            placeholder={"--Lựa chọn--"}
                            displayExpr={"whsName"}
                            searchEnabled={true}
                            disabled
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                fontWeight: "600",
                                marginBottom: "4px",
                                paddingLeft: "4px",
                            }}>
                            Chọn loại giao dịch
                        </div>
                        <SelectBox
                            style={{
                                width: 280,
                            }}
                            placeholder={"--Lựa chọn--"}
                            searchEnabled={true}
                            value={transactionType}
                            dataSource={transactionsTypes}
                            onSelectionChanged={(e) => {
                                setTransactionType(e.selectedItem);
                            }}
                            disabled
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                fontWeight: "600",
                                marginBottom: "4px",
                                paddingLeft: "4px",
                            }}>
                            Location
                        </div>
                        <SelectBox
                            style={{
                                width: 280,
                            }}
                            placeholder={currentReturnMaterial?.locationReturned}
                            searchEnabled={true}
                            disabled
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
                                <CheckBox disabled value={currentReturnMaterial?.canSendSAP} text={"Gửi SAP"} />
                                <CheckBox
                                    disabled
                                    value={currentReturnMaterial?.canSendMES}
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
                        <TextArea value={currentReturnMaterial?.noteSendSAP as string | undefined} disabled />
                    </div>
                </div>
            </ScrollView>
        );
    };
    return (
        <Popup
            visible={visible}
            onHiding={setClose}
            title='Thông tin lịch sử đề nghị lĩnh NVL dư thừa trả kho'
            showTitle={true}
            fullScreen={false}
            contentRender={renderContent}
            dragEnabled={false}
            resizeEnabled={true}
            hideOnOutsideClick={true}
            height={"95%"}>
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Hủy",
                    onClick: setClose,
                    stylingMode: "outlined",
                }}
            />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Lưu",
                    type: "default",
                }}
                disabled
            />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Gửi",
                    type: "success",
                }}
                disabled
            />
        </Popup>
    );
};

export default DnlnvlHistoryGivebackRedundantPopup;
