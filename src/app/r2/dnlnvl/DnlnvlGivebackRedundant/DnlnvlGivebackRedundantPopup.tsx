import { custom } from "devextreme/ui/dialog";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import axios, { AxiosResponse } from "axios";
import { Button, CheckBox, DataGrid, Form, Popup, ScrollView, SelectBox, TextArea } from "devextreme-react";
import {
    Column,
    Editing,
    FilterRow,
    HeaderFilter,
    Pager,
    Paging,
    Toolbar,
    Item as ToolbarItem1,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import InfoRow from "../../../../utils/InfoRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { PLANNING_API_URL } from "../../../../config";
import { ReturnMaterialStatuses, TransactionType } from "../../enum/statusEnum";
import { User } from "../../../../jmix/entities/User";
import _ from "lodash";
import { ReturnMaterialDetail } from "../../../../jmix/entities/ReturnMaterialDetail";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { ReturnMaterial } from "../../../../jmix/entities/ReturnMaterial";
import "./GivebackRedundant.css";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import ScanMaterialReturn from "./ScanMaterialReturn";
import InfoRow2 from "../../../../utils/InfoRow2";
import { useWindowDimensions } from "../../../../hooks";
import { LocationComp } from "../dnlnvlPopUpEditMaterial";

type DnlnvlGivebackRedundantPopupProps = {
    visible: boolean;
    setClose: () => void;
    refresh: () => void;
    currentPlanningWorkOrder: PlanningWorkOrder | undefined;
};
const DnlnvlGivebackRedundantPopup = ({
    visible = false,
    setClose = () => {},
    currentPlanningWorkOrder,
    refresh = () => {},
}: DnlnvlGivebackRedundantPopupProps) => {
    const returnMaterialCollection = useCollection<ReturnMaterial>(ReturnMaterial.NAME, {
        view: "with-pwo",
        loadImmediately: false,
    });
    const returnMaterialDetailCollection = useCollection<ReturnMaterialDetail>(ReturnMaterialDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const mainStore = useMainStore();
    const [returnMaterialDetailList, setReturnMaterialDetailList] = useState<ReturnMaterialDetail[]>([]);
    const [currentReturnMaterial, setCurrentReturnMaterial] = useState<ReturnMaterial>();
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [usernameSelected, setUsernameSelected] = useState<String>("");
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [warehouse, setWarehouse] = useState<any>();
    const [transactionType, setTransactionType] = useState<string>("");
    const [canSendMES, setCanSendMES] = useState<boolean>(false);
    const [canSendSAP, setCanSendSAP] = useState<boolean>(false);
    const [location, setLocation] = useState<string>();
    const [note, setNote] = useState<string>();
    const transactionsTypes = useMemo(() => {
        return Object.keys(TransactionType).filter((item) => {
            return isNaN(Number(item));
        });
    }, []);
    const defaultLocation = useMemo(() => {
        return [currentReturnMaterial?.locationReturned] || [];
    }, [currentReturnMaterial?.locationReturned]);
    const dataGridRef = useRef<DataGrid>(null);
    useEffect(() => {
        loadCurrentReturnMaterial();
    }, []);

    const { width, height } = useWindowDimensions();

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

    const loadUsers = async (currReturnMaterial: ReturnMaterial | null) => {
        await axios
            .get(`${PLANNING_API_URL}/services/keycloak/getUsers?username=`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((response) => {
                setUsers(response.data);
                const newUser = response.data.find((user) => user.username === currReturnMaterial?.userManageExcessQuantity);
                //   console.log("cur return material :", currReturnMaterial);
                //   console.log("new User :", newUser);
                if (newUser) {
                    setUser(newUser);
                    setUsernameSelected(newUser.username as string);
                }
            })
            .catch((e) => {});
    };

    const loadCurrentReturnMaterial = async () => {
        // console.log("current status", currentPlanningWorkOrder?.statusReturnMaterial == ReturnMaterialStatuses["Bản thảo"], currentPlanningWorkOrder?.statusReturnMaterial, ReturnMaterialStatuses["Bản thảo"])
        if (currentPlanningWorkOrder?.id && currentPlanningWorkOrder.statusReturnMaterial == ReturnMaterialStatuses["Bản thảo"]) {
            returnMaterialCollection.current.filter = {
                conditions: [
                    {
                        group: "AND",
                        conditions: [
                            { property: "planningWorkOrder.id", operator: "=", value: currentPlanningWorkOrder.id },
                            { property: "returnMaterialStatus", operator: "=", value: 0 },
                        ],
                    },
                ],
            };
            returnMaterialCollection.current.load().then((res) => {
                setCurrentReturnMaterial(returnMaterialCollection.current.items[0]);
                loadReturnMaterialDetail(returnMaterialCollection.current.items[0].id);
                loadUsers(returnMaterialCollection.current.items[0]);
                loadWarehouses(
                    returnMaterialCollection.current.items[0].owhCodeTo ? returnMaterialCollection.current.items[0].owhCodeTo : null,
                );
                setTimeout(() => {
                    setCanSendMES(returnMaterialCollection.current.items[0].canSendMES || false);
                    setCanSendSAP(returnMaterialCollection.current.items[0].canSendSAP || false);
                    setLocation(returnMaterialCollection.current.items[0].locationReturned || "");
                }, 0);
                setTransactionType(
                    transactionsTypes.find(
                        (item) => TransactionType[item] === returnMaterialCollection.current.items[0]?.transactionType,
                    ) || "",
                );
                setNote(returnMaterialCollection.current.items[0].noteSendSAP || "");
            });
        } else {
            loadUsers(null);
            loadWarehouses(null);
        }
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

    const updateReturnMaterialDetails = (returnMaterialDetail: ReturnMaterialDetail) => {
        setReturnMaterialDetailList((prevState) => {
            return [returnMaterialDetail, ...prevState];
        });
    };

    const validToSend = (): boolean => {
        return returnMaterialDetailList.every((returnMaterialDetail) => {
            if (returnMaterialDetail.excessQuantity) {
                return returnMaterialDetail.excessQuantity > 0;
            }
            return false;
        });
    };
    const onSaveMaterialGiveback = async () => {
        const promptPromise = custom({
            title: "Lưu vật tư dư thừa",
            messageHtml: "Bạn chắc chắn muốn lưu vật tư dư thừa không?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Lưu lại",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });

        let confirmReturnMaterial = false;

        await promptPromise.show().then((res) => {
            if (res) {
                confirmReturnMaterial = true;
            }
        });
        // console.log("confirmReturnMaterial", confirmReturnMaterial)
        if (confirmReturnMaterial) {
            axios
                .post(
                    `${PLANNING_API_URL}/services/api/return-material`,
                    {
                        userManageExcessMaterial: user?.username,
                        returnMaterialDetails: returnMaterialDetailList,
                        noteSendSAP: note,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + mainStore.authToken,
                        },
                        params: {
                            planningWorkOrderId: currentPlanningWorkOrder?.planningWorkOrderId,
                            returnMaterialId: currentReturnMaterial?.id ? currentReturnMaterial?.id : 0,
                            owhCode: warehouse?.whsCode,
                            owhName: warehouse?.whsName,
                            transactionTypeReturn: TransactionType[transactionType],
                            canSendMES: canSendMES,
                            canSendSAP: canSendSAP,
                            locationReturned: location,
                        },
                    },
                )
                .then((res) => {
                    toastSuccess("Lưu thành công");
                    setClose();
                    refresh();
                })
                .catch((error) => {
                    toastError("Lưu thất bại");
                });
        }
    };

    const sendMaterialGiveback = async () => {
        if (!warehouse) {
            toastError("Vui lòng chọn kho trả vật tư dư thừa");
            return;
        }
        if (!user) {
            toastError("Vui lòng chọn người quản lý vật tư dư thừa");
            return;
        }
        if (!transactionType) {
            toastError("Vui lòng chọn loại giao dịch");
            return;
        }
        if (!location) {
            toastError("Vui lòng chọn location");
            return;
        }
        let confirmReturnMaterial = false;
        const promptPromise = custom({
            title: "Yêu cầu trả vật tư",
            messageHtml: "Bạn chắc chắn muốn gửi yêu cầu trả vật tư dư thừa không?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Gửi đi",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        await promptPromise.show().then((res) => {
            if (res) {
                confirmReturnMaterial = true;
            }
        });
        if (!validToSend()) {
            toastError("Vui lòng điền đầy đủ thông tin số lượng vật tư dư thừa");
            return;
        }
        if (confirmReturnMaterial) {
            axios
                .post(
                    `${PLANNING_API_URL}/services/api/send-return-material`,
                    {
                        userManageExcessMaterial: user.username,
                        returnMaterialDetails: returnMaterialDetailList,
                        noteSendSAP: note,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + mainStore.authToken,
                        },
                        params: {
                            planningWorkOrderId: currentPlanningWorkOrder?.planningWorkOrderId,
                            returnMaterialId: currentReturnMaterial?.id ? currentReturnMaterial.id : 0,
                            owhCode: warehouse?.whsCode,
                            owhName: warehouse?.whsName,
                            transactionTypeReturn: TransactionType[transactionType],
                            canSendMES: canSendMES,
                            canSendSAP: canSendSAP,
                            locationReturned: location,
                        },
                    },
                )
                .then((res) => {
                    toastSuccess("Gửi yêu cầu trả vật tư dư thừa thành công");
                    setClose();
                    refresh();
                })
                .catch((error) => {
                    toastError(error);
                });
            return;
        }
    };
    /**
     * update Location
     * @param filterExp example: [['locationType', 'contains', '01-A1-01-L - SLOT-01-06']], filterExp[0][2] ~ locationFullname
     */

    const updateLocation = useCallback((filterExp: any) => {
        if (filterExp && filterExp[0] && filterExp[0][2]) {
            setLocation(filterExp[0][2]);
        }
    }, []);

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

                headerRow.getCell(1).value = "Chi tiết trả vật tư dư thừa";
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
                    toastSuccess("Xuất file excel chi tiết trả vật tư dư thừa thành công");
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
        toastSuccess("Xuất file excel chi tiết trả vật tư dư thừa thành công");
        e.cancel = true;
    };

    const renderContent = () => {
        return (
            <ScrollView useNative={true} showScrollbar='always' direction={"both"}>
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
                    <div
                        style={{
                            padding: "4px 15px",
                            borderRadius: "16px",
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                            color: "rgba(0, 0, 0, 0.6)",
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            fontSize: 15,
                        }}>
                        <span>Bản thảo</span>
                    </div>
                    <div>
                        {currentPlanningWorkOrder ? (
                            <>
                                <div style={{ backgroundColor: "white" }}>
                                    <Form colCount={3} alignItemLabels={true}>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"PO"} data={currentPlanningWorkOrder?.productCode} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"Mã sản phẩm"} data={currentPlanningWorkOrder?.productCode} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"SL kế khoạch"} data={currentPlanningWorkOrder?.quantityPlan} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"WO"} data={currentPlanningWorkOrder?.woId} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"Tên sản phẩm"} data={currentPlanningWorkOrder?.productName} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2
                                                label={"Ngày bắt đầu"}
                                                data={
                                                    currentPlanningWorkOrder?.startTime
                                                        ? new Date(currentPlanningWorkOrder?.startTime).toLocaleString("en-GB")
                                                        : ""
                                                }
                                            />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"Profile"} data={currentPlanningWorkOrder?.profileId?.profileCode} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2 label={"Dây chuyền"} data={currentPlanningWorkOrder?.line} />
                                        </SimpleItem>
                                        <SimpleItem colSpan={1}>
                                            <InfoRow2
                                                label={"Ngày kết thúc"}
                                                data={
                                                    currentPlanningWorkOrder?.endTime
                                                        ? new Date(currentPlanningWorkOrder?.endTime).toLocaleString("en-GB")
                                                        : ""
                                                }
                                            />
                                        </SimpleItem>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <div
                            style={{
                                marginTop: 30,
                                display: "flex",
                            }}>
                            <ScanMaterialReturn
                                returnMaterialDetails={returnMaterialDetailList}
                                updateMaterialDetails={updateReturnMaterialDetails}
                            />
                        </div>
                        <DataGrid
                            keyExpr='materialName'
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
                            dataSource={returnMaterialDetailList}
                            ref={dataGridRef}
                            noDataText={"Không có dữ liệu để hiển thị"}>
                            <Toolbar>
                                <ToolbarItem1 location={"after"}>
                                    <Button
                                        icon={"save"}
                                        onClick={() => {
                                            dataGridRef.current?.instance.saveEditData();
                                        }}
                                    />
                                </ToolbarItem1>
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
                            <Column dataField='materialName' caption={"Material Name"} allowEditing={false} alignment={"left"} />
                            <Column dataField='partNumber' caption='PartNumber' allowEditing={false} />
                            <Column dataField={"vendor"} caption={"Vendor"} allowEditing={false} />
                            <Column dataField={"lot"} caption={"Số LOT"} allowEditing={false} />
                            <Column dataField='userData4' caption={"User Data 4"} allowEditing={false} />
                            <Column dataField={"quantity"} caption={"Số lượng kế hoạch"} allowEditing={false} alignment={"left"} />
                            <Column dataField='excessQuantity' caption={"Số lượng dư thừa"} alignment={"left"} />
                            <Editing
                                useIcons={true}
                                mode={"batch"}
                                allowUpdating
                                allowDeleting
                                texts={{
                                    cancelRowChanges: "Hoàn tác",
                                    saveRowChanges: "Lưu lại",
                                    deleteRow: "Xóa",
                                    editRow: "Sửa",
                                    confirmDeleteMessage: "Bạn có chắc chắn muốn xóa dữ liệu này?",
                                    confirmDeleteTitle: "Xác nhận xóa dữ liệu",
                                }}
                            />
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
                        justifyContent: "space-between",
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
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn bộ phận quản lý kho phê duyệt
                        </div>
                        <SelectBox
                            dataSource={users}
                            value={usernameSelected}
                            valueExpr={"username"}
                            onSelectionChanged={(data) => {
                                setUser(data.selectedItem);
                                setUsernameSelected(data.selectedItem.username);
                                // console.log("data log username", data)
                            }}
                            displayExpr={"username"}
                            placeholder={"--Lựa chọn--"}
                            searchEnabled={true}
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
                            dataSource={warehouses}
                            value={warehouse}
                            onSelectionChanged={(e) => {
                                setWarehouse(e.selectedItem);
                            }}
                            placeholder={"--Lựa chọn--"}
                            displayExpr={"whsName"}
                            searchEnabled={true}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                fontWeight: 600,
                            }}>
                            Chọn Location
                        </div>
                        <div
                            style={{
                                position: "relative",
                                top: -46,
                            }}>
                            <LocationComp updateLocations={updateLocation} modeSelection='single' defaultValue={defaultLocation} />
                        </div>
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
                            placeholder={"--Lựa chọn--"}
                            searchEnabled={true}
                            value={transactionType}
                            dataSource={transactionsTypes}
                            onSelectionChanged={(e) => {
                                setTransactionType(e.selectedItem);
                            }}
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
                                    value={canSendSAP}
                                    onValueChanged={(event) => {
                                        setCanSendSAP(event.value);
                                    }}
                                    text={"Gửi SAP"}
                                />
                                <CheckBox
                                    value={canSendMES}
                                    onValueChanged={(event) => {
                                        setCanSendMES(event.value);
                                    }}
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
                            value={note}
                            onValueChanged={(e) => {
                                setNote(e.value);
                            }}
                        />
                    </div>
                </div>
            </ScrollView>
        );
    };
    return (
        <Popup
            visible={visible}
            onHiding={setClose}
            title='Thông tin đề nghị lĩnh NVL dư thừa trả kho'
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
                    onClick: onSaveMaterialGiveback,
                }}
            />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Gửi",
                    type: "success",
                    onClick: sendMaterialGiveback,
                }}
            />
        </Popup>
    );
};

export default DnlnvlGivebackRedundantPopup;
