import { useEffect, useState } from "react";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { custom } from "devextreme/ui/dialog";
import { Button, DataGrid, Form, Popup, ScrollView, SelectBox } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import {
    Toolbar,
    Item as ToolbarItemDataGrid,
    Export,
    Column,
    Pager,
    Paging,
    MasterDetail,
    GroupPanel,
    Grouping,
    FilterRow,
    HeaderFilter,
    OperationDescriptions,
} from "devextreme-react/data-grid";

import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import { Line } from "../../../../jmix/entities/Line";
import { DnlnvlDetail } from "../../../../jmix/entities/DnlnvlDetail";
import InfoRow from "../../../../utils/InfoRow";
import DnlnvlPopupEditMaterial from "../dnlnvlPopUpEditMaterial";
import DnlnvlDetailView from "./DnlnvlDetailView";

import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { User } from "../../../../jmix/entities/User";
import { Roles, StatusApproveEnum } from "../../enum/statusEnum";
import UserService from "../../../../Keycloak";
import CheckBox from "devextreme-react/check-box";
import { print, str } from "../../../../utils/utils";

interface DnlnvlPopupViewProps {
    visible: boolean;
    onHiding: () => void;
    setPopupClose: () => void;
    refreshDnlnvl: () => void;
    currentDnlnvl: Dnlnvl | undefined;
}

class DnlnvlSenderAndApprover {
    sender: string | null;
    approver: User | null;
    warehouseApprover: User | null;
}

const DnlnvlPopupView = ({
    visible = false,
    onHiding = () => {},
    setPopupClose = () => {},
    refreshDnlnvl = () => {},
    currentDnlnvl,
}: DnlnvlPopupViewProps) => {
    const mainStore = useMainStore();
    const lineStateCollection = useCollection<Line>(Line.NAME, { view: "_base", loadImmediately: false });
    const dnlnvlDetailCollection = useCollection<DnlnvlDetail>(DnlnvlDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });

    const [lines, setLines] = useState<Line[] | undefined>(undefined);
    const [currentDnlnvlDetails, setCurrentDnlnvlDetails] = useState<DnlnvlDetail[] | undefined>(undefined);
    const [currentDnlnvlDetail, setCurrentDnlnvlDetail] = useState<DnlnvlDetail | undefined>(undefined);
    const [popupModifyMaterialIsOpen, setPopupModifyMaterialIsOpen] = useState<boolean>(false);
    const [listWarehouses, setListWarehouses] = useState<any[]>([]);
    const [listUsers, setListUsers] = useState<User[]>([]);
    const [warehouseApprove, setWarehouseApprove] = useState();
    const [warehouseSelectedValue, setWarehouseSelectedValue] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userSelectedUsername, setUserSelectedUsername] = useState<string | null>(null);
    const [warehouseApprover, setWarehouseApprover] = useState<User | null>(null);
    const [warehouseApproverSelectedValue, setWarehouseApproverSelectedValue] = useState<string | null>(null);
    const [canSendMES, setCanSendMES] = useState<boolean>(false);
    const [canSendSAP, setCanSendSAP] = useState<boolean>(false);

    useEffect(() => {
        loadLine().then(() => {});
        loadDnlnvlDetail(currentDnlnvl?.id).then(() => {});
        loadWarehouse().then(() => {});
        loadUser().then(() => {});
        if (currentDnlnvl?.saveSendMES) {
            setCanSendMES(true);
        }
        if (currentDnlnvl?.saveSendSAP) {
            setCanSendSAP(true);
        }
    }, []);

    const loadDnlnvlDetail = async (dnlnvlId) => {
        dnlnvlDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvl.id", operator: "=", value: dnlnvlId }],
        };
        await dnlnvlDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailCollection.current.items) {
                setCurrentDnlnvlDetails(dnlnvlDetailCollection.current.items);
            }
        });
    };

    const loadLine = async () => {
        await lineStateCollection.current.load().then((res) => {
            setLines(lineStateCollection.current.items);
        });
    };
    const loadWarehouse = async () => {
        await axios
            .get(`${PLANNING_API_URL}/rest/entities/Owh`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((response) => {
                setListWarehouses(response.data);
                const newWarehouse = response.data.find((warehouse) => warehouse.whsCode === currentDnlnvl?.owhCode);
                if (newWarehouse) {
                    setWarehouseApprove(newWarehouse);
                    setWarehouseSelectedValue(newWarehouse.whsName);
                }
            })
            .catch((e) => {
                toastError(e);
            });
    };
    const loadUser = async () => {
        await axios
            .get(`${PLANNING_API_URL}/services/keycloak/getUsers?username=`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((response) => {
                setListUsers(response.data);
                const newUser = response.data.find((user) => user.username === currentDnlnvl?.approver);
                const newWarehouseApprover = response.data.find((user) => user.username === currentDnlnvl?.warehouseApprover);
                if (newUser) {
                    setUser(newUser);
                    setUserSelectedUsername(newUser.username as string);
                }
                if (newWarehouseApprover) {
                    setWarehouseApprover(newWarehouseApprover);
                    setWarehouseApproverSelectedValue(newWarehouseApprover.username as string);
                }
            })
            .catch((e) => {});
    };
    const getLineName = (id) => {
        const templines: Line | undefined = lines?.find((value) => value.id === id);
        return templines ? templines.lineName : "";
    };
    const refresh = () => {
        loadDnlnvlDetail(currentDnlnvl?.id).then(() => {});
    };
    const renderLaneCell = (data) => {
        return <div>{data.value?.laneName}</div>;
    };
    const renderMachineCell = (data) => {
        return <div>Máy / Công đoạn: {data.value?.machineName}</div>;
    };
    const onOpenPanelModify = (data) => {
        setCurrentDnlnvlDetail(data.data);
        setPopupModifyMaterialIsOpen(true);
    };
    const onUpdateStillNeed = () => {
        refresh();
    };
    const onInsertDnlnvlSapOnPopup = async () => {
        if (!warehouseApprove) {
            toastError("Vui lòng chọn kho");
            return;
        }
        if (!user) {
            toastError("Vui lòng chọn người duyệt");
            return;
        }
        if (!warehouseApprover) {
            toastError("Vui lòng chọn người duyệt kho");
            return;
        }

        const promptPromise = custom({
            title: "Xác nhận gửi đi",
            messageHtml: "Bạn có chắc chắn muốn gửi sang Quản lý đối chiếu?",
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
        let isInsertDnlnvlSap = false;
        await promptPromise.show().then((result) => {
            isInsertDnlnvlSap = result;
        });

        //Status === 0 trạng thái draft
        if (isInsertDnlnvlSap && currentDnlnvl?.status === StatusApproveEnum["Bản nháp"]) {
            const requestBodyData: DnlnvlSenderAndApprover = {
                sender: mainStore.userName,
                approver: user,
                warehouseApprover: warehouseApprover,
            };
            await axios
                .put(PLANNING_API_URL + "/services/api/dnlnvl/send-dnlnvl/" + currentDnlnvl?.id, requestBodyData, {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                    params: {
                        owhCode: (warehouseApprove as any).whsCode,
                        owhName: (warehouseApprove as any).whsName,
                        canSendMES: canSendMES,
                        canSendSAP: canSendSAP,
                    },
                })
                .then((res) => {
                    toastSuccess("Xác nhận thành công");
                    refreshDnlnvl();
                })
                .catch((res) => {
                    toastError("Gửi thất bại");
                });
            setPopupClose();
        } else {
            toastError("Đề nghị lĩnh đã được hủy");
        }
    };
    const onSaveDnlnvl = async () => {
        if (currentDnlnvl?.status === StatusApproveEnum["Bản nháp"]) {
            const requestBodyData: DnlnvlSenderAndApprover = {
                sender: mainStore.userName,
                approver: user,
                warehouseApprover: warehouseApprover,
            };

            await axios
                .put(PLANNING_API_URL + "/services/api/dnlnvl/save-dnlnvl/" + currentDnlnvl?.id, requestBodyData, {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                    params: {
                        owhCode: warehouseApprove ? (warehouseApprove as any).whsCode : null,
                        owhName: warehouseApprove ? (warehouseApprove as any).whsName : null,
                        canSendMES: canSendMES,
                        canSendSAP: canSendSAP,
                    },
                })
                .then((res) => {
                    toastSuccess("Lưu thành công");
                    refreshDnlnvl();
                    setPopupClose();
                })
                .catch((error) => {
                    toastError("Lưu thất bại");
                });
        }
    };

    async function onDeleteDnlnvl() {
        const promtPromis = custom({
            title: "Xác nhận xóa",
            messageHtml: "Bạn có chắc chắn muốn xóa đề nghị lĩnh này?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Xóa",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        const isDelete: boolean = await promtPromis.show();
        if (isDelete) {
            try {
                const deleteResponse: AxiosResponse = await axios.delete<string>(
                    PLANNING_API_URL + "/services/api/dnlnvl/" + currentDnlnvl?.id,
                    {
                        headers: {
                            Authorization: "Bearer " + mainStore.authToken,
                        },
                    },
                );
                if (deleteResponse.data === "Ok") {
                    const releaseMaterialRes = await axios.post<boolean>(
                        PLANNING_API_URL + "/services/api/dnlnvl/release-material/" + currentDnlnvl?.id,
                        {},
                        {
                            headers: {
                                Authorization: "Bearer " + mainStore.authToken,
                            },
                        },
                    );
                    if (releaseMaterialRes.data) {
                        toastSuccess("Xóa thành công");
                        refreshDnlnvl();
                        setPopupClose();
                    }
                }
            } catch (error: unknown) {
                toastError("Xóa thất bại");
                if (axios.isAxiosError(error)) {
                    console.error("axios, Lỗi xóa đề nghị lĩnh: ", error.message);
                } else {
                    console.error("Lỗi xóa đề nghị lĩnh: ", error);
                }
            }
        }
    }

    const setPopUpDetailClose = () => {
        setPopupClose();
    };
    const renderPartNumberCell = (data) => {
        print("fix bug");
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                    icon={"edit"}
                    onClick={() => onOpenPanelModify(data)}
                    disabled={currentDnlnvl?.status !== "0" ? true : false}
                    style={{ backgroundColor: "#5cb85c", color: "#ffffff" }}
                />

                <div style={{ marginLeft: "3px" }}>{data.value.name}</div>
            </div>
        );
    };
    const popUpDetailContentRender = () => {
        const lineName = getLineName(currentDnlnvl?.planningWorkOrder?.line);
        const calculatePercent = () => {
            let stillNeed = 0;
            let estTotalQty = 0;
            currentDnlnvlDetails?.forEach((item) => {
                stillNeed += item.stillNeed;
                estTotalQty += item.estTotalQty;
            });
            if (stillNeed === 0) {
                return 0;
            }
            return Math.round(((estTotalQty - stillNeed) / estTotalQty) * 100);
        };
        return (
            <ScrollView height='100%' useNative={true} showScrollbar='always'>
                <div
                    style={{
                        height: "100%",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
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
                    {
                        <div>
                            {currentDnlnvl?.planningWorkOrder ? (
                                <>
                                    {/* <button onClick={() => console.log(warehouseApprove)}>Click me!</button> */}
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
                                                        <InfoRow label={"Loại"} data={currentDnlnvl?.dnlnvlType} />
                                                        <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                                        <InfoRow label={"Số LOT"} data={currentDnlnvl?.planningWorkOrder.lotNumber} />
                                                    </td>
                                                    <td>
                                                        <InfoRow
                                                            label={"Profile"}
                                                            data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode}
                                                        />
                                                        <InfoRow
                                                            label={"Mã sản phẩm"}
                                                            data={currentDnlnvl?.planningWorkOrder.productCode}
                                                        />
                                                        <InfoRow
                                                            label={"Tên sản phẩm"}
                                                            data={currentDnlnvl?.planningWorkOrder.productName}
                                                        />
                                                    </td>
                                                    <td>
                                                        <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder?.line} />
                                                        <InfoRow
                                                            label={"Profile name"}
                                                            data={currentDnlnvl?.planningWorkOrder.profileId?.name}
                                                        />
                                                    </td>
                                                </table>
                                            </SimpleItem>
                                            {/*<SimpleItem>*/}
                                            {/*    <table>*/}
                                            {/*     fdgfghfgjgkfhdgfdfh*/}
                                            {/*    </table>*/}
                                            {/*</SimpleItem>*/}
                                        </Form>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            <DataGrid
                                style={{
                                    marginTop: 8,
                                }}
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
                                dataSource={currentDnlnvlDetails}
                                noDataText='Không có dữ liệu để hiển thị'>
                                <Toolbar>
                                    <ToolbarItemDataGrid location={"after"}>
                                        <div style={{ marginRight: "24px", paddingTop: "12px" }}>
                                            <h5>Tỉ lệ % NVL theo tổng khuyến nghị : {calculatePercent()} %</h5>
                                        </div>
                                    </ToolbarItemDataGrid>
                                    <ToolbarItemDataGrid location='after'>
                                        <Button hint='Refresh' onClick={refresh} icon='refresh' />
                                    </ToolbarItemDataGrid>
                                </Toolbar>
                                <Export enabled={true} formats={["xlsx"]} allowExportSelectedData={true} />
                                <Paging enabled={true} defaultPageSize={10} />
                                <Pager
                                    visible={true}
                                    displayMode={"full"}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    allowedPageSizes={[5, 10]}
                                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                />
                                {/*<Column dataField="id" caption={"ID"}/>*/}
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
                                <Column dataField='lane' caption={"Lane"} cellRender={renderLaneCell} />
                                <Column dataField={"slot"} />
                                <Column dataField={"locationFrontRear"} caption={"Location Front Rear"} />
                                <Column dataField={"locationLeftRight"} caption={"Location Left Right"} />
                                <Column dataField={"qrFeeder.qrFeederCode"} caption={"Feeder Code"} />
                                renderPartNumberCell
                                <Column dataField='partNumber' caption='Part Name' cellRender={renderPartNumberCell} />
                                <Column dataField={"estReqdQty"} caption={"Tổng số lượng cần"} alignment='left' />
                                <Column dataField={"bufferQty"} caption={"Số lượng dự phòng tiêu hao"} alignment='left' />
                                <Column dataField={"estTotalQty"} caption={"Tổng số lượng khuyến nghị"} alignment='left' />
                                <Column dataField={"stillNeed"} caption={"Số lượng cần thêm"} alignment='left' />
                                <Column dataField={"machine"} caption={"Máy"} cellRender={renderMachineCell} />
                                <Column
                                    allowEditing={false}
                                    dataField={"machine.machineName"}
                                    // groupCellRender={renderMachineCell}
                                    cellRender={renderMachineCell}
                                    caption='Máy/ Công đoạn'
                                    groupIndex={0}
                                />
                                <GroupPanel visible={true} allowColumnDragging={true} />
                                <Grouping autoExpandAll={true} />
                                <MasterDetail enabled={true} component={DnlnvlDetailView} />
                            </DataGrid>
                        </div>
                    }
                </div>
                <div
                    style={{
                        position: "relative",
                        marginTop: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "16px",
                        padding: "16px",
                        display: "grid",
                        gridTemplateColumns: "auto auto auto auto",
                        gridTemplateRows: "auto auto",
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
                        <b>Chọn thông tin gửi</b>
                    </span>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn kho duyệt
                        </div>
                        <SelectBox
                            displayExpr={"whsName"}
                            placeholder={"-- Lựa chọn --"}
                            valueExpr={"whsName"}
                            value={warehouseSelectedValue}
                            dataSource={listWarehouses}
                            onSelectionChanged={(data) => {
                                setWarehouseApprove(data.selectedItem);
                                setWarehouseSelectedValue(data.selectedItem.whsName);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                        />
                    </div>

                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn người duyệt
                        </div>

                        <SelectBox
                            displayExpr={"username"}
                            placeholder={"-- Lựa chọn --"}
                            valueExpr={"username"}
                            dataSource={listUsers}
                            value={userSelectedUsername}
                            onSelectionChanged={(data) => {
                                setUser(data.selectedItem);
                                setUserSelectedUsername(data.selectedItem.username);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                        />
                    </div>

                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn người quản lý kho
                        </div>

                        <SelectBox
                            displayExpr={"username"}
                            placeholder={"-- Lựa chọn --"}
                            valueExpr={"username"}
                            dataSource={listUsers}
                            value={warehouseApproverSelectedValue}
                            onSelectionChanged={(data) => {
                                setWarehouseApprover(data.selectedItem);
                                setWarehouseApproverSelectedValue(data.selectedItem.username);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                        />
                    </div>

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
                                marginTop: 4,
                            }}>
                            <CheckBox
                                text={"Gửi SAP"}
                                disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                                value={canSendSAP}
                                onValueChange={() => {
                                    setCanSendSAP((prevState) => {
                                        return !prevState;
                                    });
                                }}
                            />
                            <CheckBox
                                text={"Gửi MES"}
                                value={canSendMES}
                                disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                                onValueChange={() => {
                                    setCanSendMES((prevState) => {
                                        return !prevState;
                                    });
                                }}
                                style={{
                                    marginLeft: 30,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </ScrollView>
        );
    };
    return (
        <>
            <Popup
                visible={visible}
                onHiding={onHiding}
                title={"Danh sách đề nghị lĩnh"}
                // titleRender={() => { return <div>Danh sách đề nghị lĩnh</div> }}
                showTitle={true}
                fullScreen={false}
                contentRender={popUpDetailContentRender}
                height={"90%"}
                dragEnabled={false}
                hideOnOutsideClick={true}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        stylingMode: "outlined",
                        onClick: setPopUpDetailClose,
                    }}
                />
                {(UserService.hasRole([Roles["admin"]]) || UserService.hasRole([Roles["qly_DNL"]])) && (
                    <ToolbarItem
                        widget='dxButton'
                        toolbar='bottom'
                        location='after'
                        options={{
                            text: "Bỏ áp dụng",
                            type: "danger",
                            onClick: onDeleteDnlnvl,
                        }}
                        disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                    />
                )}
                {(UserService.hasRole([Roles["admin"]]) || UserService.hasRole([Roles["qly_DNL"]])) && (
                    <ToolbarItem
                        widget='dxButton'
                        toolbar='bottom'
                        location='after'
                        options={{
                            text: "Lưu",
                            type: "default",
                            onClick: onSaveDnlnvl,
                        }}
                        disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                    />
                )}
                {(UserService.hasRole([Roles["admin"]]) || UserService.hasRole([Roles["qly_DNL"]])) && (
                    <ToolbarItem
                        widget='dxButton'
                        toolbar='bottom'
                        location='after'
                        options={{
                            text: "Gửi",
                            type: "success",
                            onClick: onInsertDnlnvlSapOnPopup,
                        }}
                        disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                    />
                )}
            </Popup>
            {currentDnlnvlDetail ? (
                <DnlnvlPopupEditMaterial
                    dnlnvlDetail={currentDnlnvlDetail}
                    popupIsOpen={popupModifyMaterialIsOpen}
                    setPopUpIsOpen={setPopupModifyMaterialIsOpen}
                    updateStillNeed={onUpdateStillNeed}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default DnlnvlPopupView;
