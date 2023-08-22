import React, { useEffect, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { custom } from "devextreme/ui/dialog";
import { collection, instance, useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { Profile } from "../../jmix/entities/Profile";
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    Form,
    Format,
    FormItem,
    Grouping,
    HeaderFilter,
    Item as TItem,
    Lookup,
    MasterDetail,
    OperationDescriptions,
    Pager,
    Paging,
    Popup,
    SearchPanel,
    Selection,
    Toolbar,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import Button from "devextreme-react/button";
import { Item } from "devextreme-react/form";
import { BranchGroup } from "../../jmix/entities/BranchGroup";
import CheckBox from "devextreme-react/check-box";

import { StoreView } from "./helper/StoreView";
import { BomVersionButton } from "../product/BomversionButton";
import { Coitt } from "../../jmix/entities/Coitt";
import notify from "devextreme/ui/notify";
import { WorkOrderStateMamager } from "../work-order-stage/WorkOrdersStateManager";
import { WorkOrderStage } from "../../jmix/entities/WorkOrderStage";
import WorkOrderLineTemplate from "./helper/WorkOrderLineTemplate";
import axios from "axios";
import { Tooltip } from "devextreme-react/tooltip";
import { getPercent, getWorkOrderColor, stateCellRender, statusList } from "../utils";
import { PLANNING_API_URL, SCADA_URL } from "../../config";

import { StateEnum } from "../../jmix/enums/enums";
import { Button as AntButton, Dropdown, Menu, Tag } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import ProductOrderItemService from "../services/ProductOrderItemService";
import ScadaService from "../services/ScadaService";
import UserAdminService from "../../utils/UserAdminService";

import { LoadingPanel } from "../../utils/LoadingPanel";
import { LoadPanel } from "devextreme-react/load-panel";
import BomVersionProps from "../observables/BomVersionProps";
import { ViewNVLPopup } from "./popup/ViewNVLPopup";
import StageObserverObject from "../observables/StageObserverObject";
import { QmsStagePopup } from "./popup/QmsStagePopup";
import BusinessLogService from "../services/BusinessLogService";
import { loadMessages, locale } from "devextreme/localization";
import { toastError, toastSuccess } from "../../utils/ToastifyManager";
import { ReasonList } from "../../jmix/entities/ReasonList";
import { useAppDispatch } from "../../hooks";
import { setLocationSlice } from "../r2/dnlnvl/locationSlice";
import { customizeColor } from "../../utils/utils";

const ROUTING_PATH = "/workOrderManager";
const observerObj = new BomVersionProps();
const stageObject = new StageObserverObject();

export const WorkOrderManager = (props) => {
    const groupingValues = [
        {
            value: "productOrder",
            text: "Group theo PO",
        },
        {
            value: "branchCode",
            text: "Group theo Ngành",
        },
        {
            value: "state",
            text: "Group theo Trạng thái",
        },
    ];

    const allowedPageSizes: (number | "all" | "auto")[] = [10, 15, "all"];

    const mainStore = useMainStore();
    const [data, setData] = useState<any[]>([]);
    const [isRender, setIsRender] = useState(false);
    const [autoExpandAll, setAutoExpandAll] = useState(true);
    const dispatch = useAppDispatch();
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupVisible2, setPopupVisible2] = useState(false);
    const [currentRow, setCurrentRow] = useState<any>(null);
    const [workOrderStage, setWorkOrderStage] = useState<any>(null);
    const [bomVersionProps, setBomversionProps] = useState<{
        popupVisible: boolean;
        currentRow: any;
        bomVersion: any;
    }>({
        popupVisible: false,
        currentRow: null,
        bomVersion: null,
    });

    // const iotwDs = collection<ProductOrderItem>(ProductOrderItem.NAME, {
    //   view: "_base",
    //   sort: "productOrder",
    //   loadImmediately: false
    // });

    const loadLocationList = async () => {
        let headers = {
            Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
            "content-type": "application/json",
        };
        axios.get(PLANNING_API_URL + "/services/api/location", { headers }).then((res) => {
            dispatch(setLocationSlice(res.data));
        });
        return;
    };
    const woCollection = useCollection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        sort: "-createTime",
        // offset: 0,
        // limit: 10,
        // loadImmediately: false,
        filter: {
            conditions: [{ property: "workOrderType", operator: "=", value: "WO" }],
        },
    });

    const workOrderStageCollection = collection<WorkOrderStage>(WorkOrderStage.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });

    const workOrderCollection = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        sort: "-createTime",
        loadImmediately: false,
        filter: {
            conditions: [{ property: "workOrderType", operator: "=", value: "WO" }],
        },
    });

    const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
        view: "_base",
        sort: "code",
        loadImmediately: false,
    });

    const bomVersionDs = collection<Coitt>(Coitt.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const profiles = collection<Profile>(Profile.NAME, {
        view: "with-profileDetail",
        loadImmediately: false,
    });

    const reasonsDs = collection<ReasonList>(ReasonList.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    // const lineDs = collection<Line>(Line.NAME, {
    //   view: "_base",
    //   loadImmediately: false
    // });
    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxPager-pageSizesAllText": "Tất cả",
        },
    });

    const loadWorkOrder = async () => {
        await workOrderCollection.load().then((res) => {
            setData(workOrderCollection.items);
        });
    };

    const loadBranchGroup = async () => {
        await sapBranchGroupCollection.load().then((res) => {
            sapBranchGroupCollection.items.map((item) => {
                let { uBranchcode, uBranchname, uGroupcode, uGroupname } = item;
                if (uBranchcode && uBranchname && uGroupcode && uGroupname) {
                    if (
                        !branchGroupArray.find((childItem) => {
                            return uBranchcode === childItem.id;
                        })
                    ) {
                        branchGroupArray.push({ id: uBranchcode, text: uBranchname });
                    }
                    groupArray.push({
                        branchCode: uBranchcode,
                        id: uGroupcode,
                        text: uGroupname,
                    });
                }
            });
            setIsRender(true);
        });
    };

    const onRefreshGrid = () => {
        loadWorkOrder();
    };

    useEffect(() => {
        // console.log("workOrder use effect");
        loadWorkOrder();
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
                    groupArrayTmp.push({
                        branchCode: uBranchcode,
                        id: uGroupcode,
                        text: uGroupname,
                    });
                }
            });
            setBranchGroupArray(branchGroupArrayTmp);
            setGroupArray(groupArrayTmp);
        });
        loadScadaStageName();
        loadSsoUserAndGroup();
        loadProfile();
        loadLines();
        loadReason();
        // eslint-disable-next-line no-restricted-globals
        // if (location.length === 0) loadLocationList();
    }, []);

    // shouldComponentUpdate(nextProps, nextState) {
    //   return this.state.isRender ;
    // }

    const orderHeaderFilter = (data) => {
        data.dataSource.postProcess = (results) => {
            results.push({
                text: "Weekends",
                value: "weekends",
            });
            return results;
        };
    };
    // const state1 = [
    //   { id: "ACTIVE", text: "ACTIVE" },
    //   { id: "INACTIVE", text: "INACTIVE" }
    // ];

    const dataInstance = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    // const profileEditorOptions = {
    //   items: profiles,
    //   searchEnabled: true,
    //   displayExpr: "text",
    //   valueExpr: "id"
    // };

    // const positionEditorOptions = {
    //   items: state1,
    //   searchEnabled: true,
    //   displayExpr: "text",
    //   valueExpr: "id"
    // };
    const bomversionList = [
        {
            ID: 1.1,
            Name: "1.1",
        },
    ];

    const bomversionOptions = {
        items: bomversionList,
        searchEnabled: true,
        displayExpr: "Name",
        valueExpr: "ID",
    };

    const statusWOOptions = {
        items: statusList,
        searchEnabled: true,
        displayExpr: "Name",
        valueExpr: "ID",
    };

    const groupChanged = (e) => {
        const grouping = e.value;
        dataGrid.instance.clearGrouping();
        dataGrid.instance.columnOption(grouping, "groupIndex", 0);
    };

    const setBranchValue = (rowData, value) => {
        rowData.groupCode = null;
        rowData.branchCode = value;
        // @ts-ignore
        // this.defaultSetCellValue(rowData, value);
    };

    const getFilteredBranches = (options): any => {
        return {
            store: groupArray,
            filter: options.data ? ["branchCode", "=", options.data.branchCode] : null,
        };
    };

    const onEditorPreparing = (e) => {
        // console.log("onEditorPreparing");
        if (e.dataField === "bomVersion" && e.parentType === "dataRow") {
            const defaultValueChangeHandler = e.editorOptions.onValueChanged;
            bomVersionDs.filter = {
                conditions: [{ property: "uProno", operator: "=", value: e.row.data.productCode }],
            };
            let uVersionList: { id: string; name: string }[] = [];
            bomVersionDs.load().then((res) => {
                if (bomVersionDs.items) {
                    bomVersionDs.items.map((item) => {
                        if (item.uVersions) uVersionList.push({ id: item.uVersions, name: item.uVersions });
                    });
                }
            });
            let uVersionEditorOptions = {
                items: uVersionList,
                searchEnabled: true,
                displayExpr: "name",
                valueExpr: "id",
            };
            e.editorOptions = uVersionEditorOptions;
            e.editorOptions.onValueChanged = function (args) {
                // Override the default handler
                defaultValueChangeHandler(args);
            };
        }
    };

    const onEdit = (data) => {
        let startTime = new Date();
        // console.log("onEdit");
        // console.log(data);
        let workItem = data.newData;
        workItem.id = data.key;
        workItem.woId = data.oldData.woId;
        if (workItem.branchCode) {
            branchGroupArray.forEach((value) => {
                if (value.id === workItem.branchCode) {
                    workItem.branchName = value.text;
                }
            });
        }

        if (workItem.groupCode) {
            groupArray.forEach((value) => {
                if (value.id === workItem.groupCode) {
                    workItem.groupName = value.text;
                }
            });
        }

        if (workItem.profile && profiles != null) {
            if (profiles.count != null && profiles.count > 0) {
                profiles.items.map((item) => {
                    if (item.id === workItem.profile) {
                        workItem.profileName = item.name;
                    }
                });
            }
        }
        dataInstance.setItem(workItem);
        dataInstance.commit().then((res) => {
            // console.log("update child workorder");
            let headers = {
                Authorization: "Bearer " + mainStore.authToken,
                "content-type": "application/json",
            };
            axios.post(PLANNING_API_URL + "/services/api/workorder/save-childrent-wo-info", workItem, { headers }).then((res) => {
                if (res.status === 200 && res.data === "SUCCESS") {
                    notify(
                        {
                            message: "Cập nhật WO thành công!",
                            width: 300,
                        },
                        "SUCCESS",
                        3000,
                    );
                }
            });
        });

        if (workItem.quantityPlan) {
            // console.log(
            //   "update product order item product code " + data.oldData.productCode
            // );
            ProductOrderItemService.updateQuantityByProductCodeAndPo(
                data.oldData.productOrder,
                data.oldData.productCode,
                workItem.quantityPlan,
            );
        }

        BusinessLogService.save("EDIT_WORK_ORDER", workItem, workItem.woId, null, startTime);
    };

    const onDelete = (data) => {
        // console.log("on delete");
        let startTime = new Date();
        workOrderCollection.delete(data.data).then((res) => {
            BusinessLogService.save("DELETE_WORK_ORDER", data.data, data.data.woId, null, startTime);
            notify(
                {
                    message: "Xóa thành công " + data.data.woId,
                    width: 450,
                },
                "info",
                1500,
            );
        });
    };

    const onAutoExpandAllChanged = () => {
        setAutoExpandAll(!autoExpandAll);
    };

    const handlePopupHidden = () => {
        setPopupVisible(false);
        setPopupVisible2(false);
    };

    const renderPopup = (row) => {
        // console.log("render popup");
        // console.log(currentRow);
        return <StoreView row={bomVersionProps.currentRow} bomVersion={bomVersionProps.bomVersion} />;
    };

    const docUrlClick = (row) => {
        bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: row.data.productCode },
                { property: "uVersions", operator: "=", value: row.data.bomVersion },
            ],
        };
        bomVersionDs.load().then((res) => {
            if (bomVersionDs.items) {
                let item = bomVersionDs.items.pop();
                if (item && item.uDocurl) window.open(item.uDocurl, "_blank");
            }
        });
    };

    const docUrlClick2 = (row) => {
        bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: row.data.productCode },
                { property: "uVersions", operator: "=", value: row.data.bomVersion },
            ],
        };
        bomVersionDs.load().then((res) => {
            if (bomVersionDs.items) {
                let item = bomVersionDs.items.pop();
                if (item && item.uDocurl2) window.open(item.uDocurl2, "_blank");
            }
        });
    };

    const renderPopup2 = () => {
        // console.log("render popup2");
        // console.log(currentRow);
        return (
            <>
                <WorkOrderStateMamager
                    row={currentRow}
                    closePopup={closePopup}
                    workOrderStage={workOrderStage}
                    ssoGroups={ssoGroups}
                    ssoUsers={ssoUsers}
                />
            </>
        );
    };

    const viewNVLButton = (data) => {
        let menu = (
            <Menu>
                <Menu.Item>
                    <div id={"viewHs" + data.data.id} style={{ float: "left" }}>
                        <BomVersionButton
                            row={data}
                            showBomversionView={docUrlClick}
                            icon={"folder"}
                            text={"Xem hồ sơ"}
                            disabled={!data.data.bomVersion}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div id={"viewHs2" + data.data.id} style={{ float: "left" }}>
                        <BomVersionButton
                            row={data}
                            showBomversionView={docUrlClick2}
                            icon={"parentfolder"}
                            text={"Xem hồ sơ 2"}
                            disabled={!data.data.bomVersion}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div id={"storeView" + data.data.id} style={{ float: "left" }}>
                        <BomVersionButton
                            row={data}
                            showBomversionView={showNVLViewPopup}
                            disabled={!data.data.bomVersion}
                            icon='chart'
                            text={"Xem nguyên vật liệu"}
                        />
                        <Tooltip
                            target={"#storeView" + data.data.id}
                            showEvent='dxhoverstart'
                            hideEvent='dxhoverend'
                            contentRender={() => {
                                return <p>Xem Nguyên vật liệu của sản phẩm</p>;
                            }}
                            hideOnOutsideClick={false}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div id={"stageChoose" + data.data.id} style={{ float: "left" }}>
                        <BomVersionButton
                            row={data}
                            showBomversionView={showStageChoosePopup}
                            disabled={data.data.status === "DEACTIVE"}
                            icon='info'
                            text={"Khai báo công đoạn QMS"}
                        />
                        <Tooltip
                            target={"#stageChoose" + data.data.id}
                            showEvent='dxhoverstart'
                            hideEvent='dxhoverend'
                            contentRender={() => {
                                return <p>Khai báo công đoạn</p>;
                            }}
                            hideOnOutsideClick={false}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div id={"buttonSendToScadar" + data.data.id} style={{ float: "left" }}>
                        <BomVersionButton
                            row={data}
                            showBomversionView={senWOToScadarWithConfirm}
                            text={"Gửi SCADA"}
                            icon={"chevrondoubleright"}
                            disabled={data.data.state.valueOf() === "SEND_SCADA_OK" || data.data.status === "DEACTIVE"}
                        />
                        <Tooltip
                            target={"#buttonSendToScadar" + data.data.id}
                            showEvent='dxhoverstart'
                            hideEvent='dxhoverend'
                            contentRender={() => {
                                return <p>Gửi WO sang Scadar</p>;
                            }}
                            hideOnOutsideClick={false}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div id={"buttonCompleteWO" + data.data.id} style={{ float: "left" }}>
                        <BomVersionButton
                            row={data}
                            showBomversionView={setCompleteWOState}
                            icon={"selectall"}
                            text={"Đóng WO"}
                            disabled={data.data.state.valueOf() === "COMPLETE" || data.data.status === "DEACTIVE"}
                        />
                        <Tooltip
                            target={"#buttonCompleteWO" + data.data.id}
                            showEvent='dxhoverstart'
                            hideEvent='dxhoverend'
                            contentRender={() => {
                                return <p>Cập nhật trạng thái của WorkOrder sang hoàn thành</p>;
                            }}
                            hideOnOutsideClick={false}
                        />
                    </div>
                </Menu.Item>
            </Menu>
        );
        // </div>

        return (
            <Dropdown overlay={menu} placement='bottom' arrow={{ pointAtCenter: true }} trigger={["click", "contextMenu"]}>
                <AntButton icon={<AlignLeftOutlined type={"text"} />}></AntButton>
            </Dropdown>
        );
    };

    const setCompleteWOState = (row) => {
        // console.log("rowsetCompleteWOState");
        // console.log(row);
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận ",
                messageHtml: "Bạn có chắc chắn muốn đóng" + row.data.woId,
                buttons: [
                    {
                        text: "Hủy bỏ",
                        onClick: function (e) {
                            return false;
                        },
                    },
                    {
                        text: "Đồng ý",
                        onClick: function (e) {
                            return true;
                        },
                    },
                ],
            });
            let isConfirm = false;
            promptPromise.show().then((dialogResult) => {
                isConfirm = dialogResult;
                if (isConfirm) {
                    row.data.state = StateEnum.COMPLETE;
                    dataInstance.setItem(row.data);
                    dataInstance.commit().then((res) => {
                        onRefreshGrid();
                        notify(
                            {
                                message: "Cập nhật trạng thái WO thành công",
                                width: 450,
                            },
                            "info",
                            1500,
                        );
                    });
                    resolve(false);
                } else {
                    reject("");
                }
            });
        });
    };

    const showNVLViewPopup = async (row) => {
        bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: row.data.productCode },
                { property: "uVersions", operator: "=", value: row.data.bomVersion },
            ],
        };
        await bomVersionDs.load().then((res) => {
            // setBomversionProps({
            //   popupVisible: true,
            //   currentRow: row,
            //   bomVersion: bomVersionDs.items.pop()
            //   }
            // )
            observerObj.loadBomVersion(row.data, bomVersionDs.items.pop(), true);
            // setCurrentRow(row);
            // setBomVersion(bomVersionDs.items.pop())
            // setPopupVisible(true);
        });
    };

    const showStageChoosePopup = async (row) => {
        // console.log("showStageChoosePopup");
        workOrderStageCollection.clear();
        workOrderStageCollection.filter = {
            conditions: [{ property: "workOrder", operator: "=", value: row.data.woId }],
        };

        await workOrderStageCollection.load().then((res) => {
            if (workOrderStageCollection.items) {
                // console.log("WorkOrderStateMamager: work order stage " + row.data.woId);
                // setPopupVisible(false);
                // setPopupVisible2(true);
                // setCurrentRow(row);
                // setWorkOrderStage(workOrderStageCollection.items)
                stageObject.setData(row.data, workOrderStageCollection.items, true, ssoGroups, ssoUsers);
            }
        });
    };

    const closePopup = () => {
        setPopupVisible(false);
        setPopupVisible2(false);
    };

    const getIcon = (row) => {
        return (
            <div>
                <span className='icon-wo-name'>
                    {row.data.woId}
                    {row.data.isNew == 1 ? "(*)" : ""}
                </span>
            </div>
        );
    };

    const onCellPrepared = (e) => {
        if (e.rowType === "data") {
            e.cellElement.style.color = getWorkOrderColor(e.data);
        }
    };

    const senWOToScadarWithConfirm = (row) => {
        let validate = validateBeforeSend(row);
        if (validate !== "PASS") {
            notify(
                {
                    message: "Không thể gửi Scada do WO thiếu dữ liệu: " + validate,
                    width: 450,
                },
                "SUCCESS",
                3000,
            );
            return;
        }
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận ",
                messageHtml: "Bạn chắc chắn muốn gửi " + row.data.woId + "  đến SCADA ?",
                buttons: [
                    {
                        text: "Hủy bỏ",
                        onClick: function (e) {
                            return false;
                        },
                    },
                    {
                        text: "Gửi",
                        onClick: function (e) {
                            return true;
                        },
                    },
                ],
            });
            let isConfirm = false;
            promptPromise.show().then((dialogResult) => {
                isConfirm = dialogResult;
                if (isConfirm) {
                    sendWOToScadar(row);
                    toastSuccess("Gửi thành công");
                    resolve(false);
                } else {
                    toastError("Gửi thất bại");
                    reject("");
                }
            });
        });
        row.cancel = isCanceled;
    };

    const validateBeforeSend = (row) => {
        let validateRs = "";
        if (!checkEmpty(row.data.quantityPlan)) {
            validateRs += "Số lượng đặt hàng, ";
        }

        if (!checkEmpty(row.data.quota)) {
            validateRs += "Định mức NVL, ";
        }

        if (!checkEmpty(row.data.branchCode)) {
            validateRs += "Ngành, ";
        }

        if (!checkEmpty(row.data.groupCode)) {
            validateRs += "Tổ, ";
        }

        if (!checkEmpty(row.data.line) && !checkEmpty(row.data.scadaStageList)) {
            validateRs += "Dây chuyền hoặc Công đoạn, ";
        }

        if (!checkEmpty(row.data.scadaUserGroup)) {
            validateRs += "Nhóm người quản lý, ";
        }

        if (!checkEmpty(row.data.scadaUserName)) {
            validateRs += "Username người quản lý, ";
        }

        if (validateRs === "") {
            validateRs = "PASS";
        } else {
            validateRs = validateRs.replace(", ", "");
        }

        return validateRs;
    };

    const checkEmpty = (value) => {
        return value && value !== "";
    };

    const completePercent = (row) => {
        let outQuantity = row.data.quantityActual;
        let quantity = row.data.quantityPlan;
        if (outQuantity && quantity) return <div>{getPercent(outQuantity / quantity)}%</div>;
        return <div />;
    };

    const sendWOToScadar = (row) => {
        // console.log("send wo to scadar");
        // console.log(row.data);
        let headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        // console.log("send api to get wo - line " + row.data.productOrder);
        axios
            .get(
                PLANNING_API_URL +
                    "/services/api/order/get-wo-line?productOrderId=" +
                    row.data.productOrder +
                    "&woId=" +
                    row.data.woId +
                    "&type=WO",
                { headers },
            )
            .then((response) => {
                if (response.status === 200) {
                    const woLineList = response.data;
                    // console.log("response data");
                    // console.log(woLineList);
                    let success = false;
                    if (!woLineList) return;
                    woLineList.map((woLine) => {
                        // console.log("woLine " + woLine.Wo_Id);
                        axios
                            .post(
                                SCADA_URL + "/api/auth/login",
                                {
                                    username: "ecyberlinh@gmail.com",
                                    password: "ATTT@123",
                                },
                                { headers },
                            )
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log("login thanh cong");

                                    const token = response.data.token;
                                    let headers = {
                                        "content-type": "application/json",
                                        "X-Authorization": "Bearer " + token,
                                    };
                                    let assetName = woLine.Wo_Id + "-" + woLine.Lot_Number;
                                    // let lineId = woLine.Line_Id ? "vline" : "Machines";
                                    let lineId = "vline";
                                    let assetId;
                                    axios
                                        .get(SCADA_URL + "/api/tenant/assets?assetName=" + assetName, { headers })
                                        .then((res) => {
                                            if (res.status === 200) {
                                                // console.log("asset name " + assetName + " is exists");
                                                assetId = res.data.id.id;
                                                axios
                                                    .post(
                                                        SCADA_URL + "/api/plugins/telemetry/ASSET/" + assetId + "/attributes/SERVER_SCOPE",
                                                        woLine,
                                                        { headers },
                                                    )
                                                    .then((res) => {
                                                        if (res.status === 200) {
                                                            notify(
                                                                {
                                                                    message: "Đã gửi WO sang scadar thành công",
                                                                    width: 450,
                                                                },
                                                                "SUCCESS",
                                                                3000,
                                                            );
                                                            // console.log(
                                                            //   "send wo line to scadar success " +
                                                            //   woLine.Po_Id +
                                                            //   " xxx"
                                                            // );
                                                            ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                            success = true;
                                                            let headers = {
                                                                Authorization: "Bearer " + mainStore.authToken,
                                                                "content-type": "application/json",
                                                            };

                                                            axios
                                                                .get(
                                                                    PLANNING_API_URL +
                                                                        "/services/api/workorder/update-wo-state?woId=" +
                                                                        woLine.Wo_Id,
                                                                    { headers },
                                                                )
                                                                .then((res) => {
                                                                    // console.log("update state ok");
                                                                    onRefreshGrid();
                                                                });
                                                        } else {
                                                            console.log(res);
                                                        }
                                                    });
                                            } else {
                                                // console.log("create new asset with name " + assetName);
                                                axios
                                                    .post(
                                                        SCADA_URL + "/api/asset",
                                                        {
                                                            name: assetName,
                                                            type: lineId,
                                                            label: assetName,
                                                            additionalInfo: {
                                                                description: assetName,
                                                            },
                                                        },
                                                        { headers },
                                                    )
                                                    .then((res) => {
                                                        if (res.status === 200) {
                                                            assetId = res.data.id.id;
                                                            // console.log(
                                                            //   "create scadar asset OK, asset id = " + assetId
                                                            // );
                                                            axios
                                                                .post(
                                                                    SCADA_URL +
                                                                        "/api/plugins/telemetry/ASSET/" +
                                                                        res.data.id.id +
                                                                        "/attributes/SERVER_SCOPE",
                                                                    woLine,
                                                                    { headers },
                                                                )
                                                                .then((res) => {
                                                                    if (res.status === 200) {
                                                                        notify(
                                                                            {
                                                                                message: "Đã gửi WO sang scadar thành công",
                                                                                width: 450,
                                                                            },
                                                                            "SUCCESS",
                                                                            3000,
                                                                        );
                                                                        // console.log(
                                                                        //   "send wo line to scadar success " +
                                                                        //   woLine.Po_Id +
                                                                        //   " xxx"
                                                                        // );
                                                                        ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                                        success = true;
                                                                        let headers = {
                                                                            Authorization: "Bearer " + mainStore.authToken,
                                                                            "content-type": "application/json",
                                                                        };
                                                                        axios
                                                                            .get(
                                                                                PLANNING_API_URL +
                                                                                    "/services/api/workorder/update-wo-state?woId=" +
                                                                                    woLine.Wo_Id,
                                                                                { headers },
                                                                            )
                                                                            .then((res) => {
                                                                                // console.log("update state ok");
                                                                                onRefreshGrid();
                                                                            });
                                                                    } else {
                                                                        console.log(res);
                                                                    }
                                                                });
                                                        }
                                                    });
                                            }
                                        })
                                        .catch((reason) => {
                                            // console.log("reason");
                                            // console.log(reason);
                                            // console.log("create new asset with name " + assetName);
                                            axios
                                                .post(
                                                    SCADA_URL + "/api/asset",
                                                    {
                                                        name: assetName,
                                                        type: lineId,
                                                        label: assetName,
                                                        additionalInfo: {
                                                            description: assetName,
                                                        },
                                                    },
                                                    { headers },
                                                )
                                                .then((res) => {
                                                    if (res.status === 200) {
                                                        assetId = res.data.id.id;
                                                        // console.log(
                                                        //   "create scadar asset OK, asset id = " + assetId
                                                        // );
                                                        axios
                                                            .post(
                                                                SCADA_URL +
                                                                    "/api/plugins/telemetry/ASSET/" +
                                                                    res.data.id.id +
                                                                    "/attributes/SERVER_SCOPE",
                                                                woLine,
                                                                { headers },
                                                            )
                                                            .then((res) => {
                                                                if (res.status === 200) {
                                                                    notify(
                                                                        {
                                                                            message: "Đã gửi WO sang scadar thành công",
                                                                            width: 450,
                                                                        },
                                                                        "SUCCESS",
                                                                        3000,
                                                                    );
                                                                    // console.log(
                                                                    //   "send wo line to scadar success " +
                                                                    //   woLine.Po_Id +
                                                                    //   " xxx"
                                                                    // );
                                                                    ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                                    success = true;
                                                                    let headers = {
                                                                        Authorization: "Bearer " + mainStore.authToken,
                                                                        "content-type": "application/json",
                                                                    };
                                                                    axios
                                                                        .get(
                                                                            PLANNING_API_URL +
                                                                                "/services/api/workorder/update-wo-state?woId=" +
                                                                                woLine.Wo_Id,
                                                                            { headers },
                                                                        )
                                                                        .then((res) => {
                                                                            // console.log("update state ok");
                                                                            onRefreshGrid();
                                                                        });
                                                                } else {
                                                                    console.log(res);
                                                                    success = false;
                                                                }
                                                            });
                                                    }
                                                });
                                        });
                                } else {
                                    notify("Gửi yêu cầu sang Scadar thất bại!", "error", 3000);
                                }
                            });
                    });
                    const headers = {
                        "content-type": "application/json",
                        Authorization: "Bearer " + mainStore.authToken,
                    };
                    // console.log("update wo state to SEND SCADAR OK");
                    axios
                        .get(PLANNING_API_URL + "/services/api/workorder/update-wo-state?woId=" + row.data.woId, { headers })
                        .then((res) => {
                            // console.log("update state ok");
                            onRefreshGrid();
                        });
                } else {
                    notify("lấy wo list thất bại!", "error", 3000);
                }
            });
        onRefreshGrid();
    };

    let dataGrid;
    const getRef = (ref) => {
        dataGrid = ref;
        // @ts-ignore
        window.dataGrid = dataGrid;
    };
    const [scadaStageList, setStageList] = useState<any[]>([]);
    const [ssoGroups, setSsoGroup] = useState<any[]>([]);
    const [ssoUsers, setSsoUsers] = useState<any[]>([]);
    const [profilesArray, setProfilesArray] = useState<any[]>([]);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);
    const [lines, setLines] = useState<any[]>([]);
    const [reasonList, setReasonList] = useState<any[]>([]);

    const loadScadaStageName = async () => {
        let scadaData = await ScadaService.getStageList();
        if (scadaData) setStageList(scadaData);
    };

    const loadSsoUserAndGroup = async () => {
        await UserAdminService.groupList().then((res) => {
            if (res && res.status === 200 && res.data) {
                setSsoGroup(res.data);
            }
        });

        await UserAdminService.userList().then((res) => {
            let tmp: any[] = [];
            if (res && res.status === 200 && res.data) {
                tmp = res.data;
                tmp.map((item) => (item.Value = getDisplayName(item)));
                setSsoUsers(tmp);
            }
        });
    };

    const loadReason = async () => {
        await reasonsDs.load().then(() => {
            if (reasonsDs.items) {
                setReasonList(reasonsDs.items);
            }
        });
    };

    const getDisplayName = (item) => {
        return `${item.username} - ${item.firstName ? item.firstName : ""}  ${item.lastName ? item.lastName : ""}`;
    };

    const loadProfile = async () => {
        let arr: {
            id: string;
            name: string;
            programmingCode: string | null | undefined;
        }[] = [];
        profiles.load().then(() => {
            if (profiles.items) {
                profiles.items.forEach((item) => {
                    let { id, name, programming } = item;
                    if (id && name) {
                        arr.push({
                            id: id,
                            name: name,
                            programmingCode: programming?.programingCode,
                        });
                    }
                });
            }
            setProfilesArray(arr);
        });
    };

    const loadLines = async () => {
        let tmplines: { ID: string; Name: string }[] | null = [];
        tmplines = await ScadaService.getLineList();
        if (tmplines) setLines(tmplines);
        // lineDs.load().then(res => {
        //     let tmplines: { ID: string, Name: string }[] = [];
        //     lineDs.items.map(item => {
        //       if (item.id && item.lineName)
        //         tmplines.push({'ID': item.id, 'Name': item.lineName})
        //       // alert(str(item))
        //     })
        //     setLines(tmplines)
        //   }
        // );
    };

    const getWorkOrderLineTemplate = (row) => {
        // console.log("getWorkOrderLineTemplate");
        // console.log(row);
        return (
            <WorkOrderLineTemplate
                data={row.data}
                scadaStageList={scadaStageList}
                ssoGroups={ssoGroups}
                ssoUsers={ssoUsers}
                profiles={profilesArray}
                branchGroupArray={branchGroupArray}
                groupArray={groupArray}
                lines={lines}
                reasons={reasonList}
            />
        );
    };

    function onStatusRender(rowInfo) {
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

        getColor(rowInfo.data.data.processStatus);
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

    function renderProcessStatus(rowInfo) {
        let cl = "processing";
        let str = "Chưa xác định";
        console.log(" status in master detail", rowInfo.data.data.processStatus, rowInfo);
        if (!rowInfo.data.data.processStatus || rowInfo.data.data.processStatus === "new") {
            cl = "processing";
            str = "Chờ sản xuất";
        } else if (rowInfo.data.data.processStatus === "complete") {
            cl = "success";
            str = "Hoàn thành";
        } else if (rowInfo.data.data.processStatus === "not_complete") {
            cl = "error";
            str = "Chưa hoàn thành";
        } else if (rowInfo.data.data.processStatus === "early_complete") {
            cl = "success";
            str = "Hoàn thành sớm";
        } else if (rowInfo.data.data.processStatus === "delay") {
            cl = "warning";
            str = "Chậm tiến độ";
        } else if (rowInfo.data.data.processStatus === "in_production") {
            cl = "processing";
            str = "Đang sản xuất";
        } else if (rowInfo.data.data.processStatus === "unknown" || rowInfo.data.data.processStatus === null) {
            cl = "processing";
            str = "Chưa xác định";
        }
        return <Tag color={cl}>{str}</Tag>;
    }

    const loadingPannel = () => {
        return (
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                showIndicator={true}
                shading={true}
                showPane={false}
                hideOnOutsideClick={false}
                message='Đang tải...'
            />
        );
    };
    return (
        <div>
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
                        Planning Work Order
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
                    ref={getRef}
                    dataSource={data}
                    keyExpr='id'
                    allowColumnResizing={true}
                    focusedRowEnabled={false}
                    columnMinWidth={50}
                    rowAlternationEnabled={false}
                    showBorders={true}
                    showRowLines={true}
                    // id={"#work-order-manager"}
                    style={{ maxWidth: "100%" }}
                    onEditorPreparing={onEditorPreparing}
                    onRowUpdating={onEdit}
                    onRowRemoving={onDelete}
                    wordWrapEnabled={true}
                    onCellPrepared={onCellPrepared}
                    noDataText={"Không có dữ liệu để hiển thị"}>
                    <LoadingPanel />
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
                    <Toolbar>
                        <TItem location='before' widget='dxButton'>
                            <SelectBox
                                width='225'
                                showClearButton={true}
                                items={groupingValues}
                                displayExpr='text'
                                valueExpr='value'
                                className={"combobox-grouping"}
                                // value={this.state.grouping}
                                onValueChanged={groupChanged}
                                placeholder={"Chọn nhóm..."}
                            />
                        </TItem>
                        {/* <TItem location={"center"}>
            <div className={"caption-wo-manager"}>Planning Work Order</div>
          </TItem> */}
                        <TItem name='searchPanel' />
                        <TItem location='after' widget='dxButton'>
                            <Button icon={"refresh"} onClick={onRefreshGrid} />
                        </TItem>
                        <TItem name='columnChooserButton' />
                    </Toolbar>
                    <ColumnChooser enabled={true} />
                    <Selection mode='single' />
                    <Grouping autoExpandAll={autoExpandAll} />
                    <Paging defaultPageSize={15} />
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
                    <SearchPanel visible={true} placeholder='VD: RD' />
                    <Column type={"buttons"} caption={"Tùy chọn"} alignment='center' />
                    <Column
                        dataField='woId'
                        // defaultSortOrder={true}
                        // sortOrder={"desc"}
                        width={130}
                        caption='Mã WO'
                        cellRender={getIcon}
                        // allowFiltering={false}
                    />
                    <Column
                        dataField='productOrder'
                        caption='Mã đơn hàng'
                        width={200}
                        // allowFiltering={false}
                        // groupIndex={0}
                    />
                    <Column
                        minWidth={150}
                        dataField='productName'
                        caption='Tên Sản phẩm'
                        // hidingPriority={1}
                    />

                    <Column dataField='quantityPlan' width={100} caption='Số lượng' alignment={"left"}>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField={"scadaQuantityOut1"} caption={"Sản lượng CĐ1"} alignment='right' width={120} />
                    <Column dataField='quantityActual' width={140} caption='Số lượng hoàn thành' visible={false}>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        dataField='startTime'
                        alignment='left'
                        dataType='datetime'
                        format={"dd/MM/yyyy HH:mm"}
                        width={160}
                        caption='Thời gian bắt đầu'>
                        <HeaderFilter dataSource={orderHeaderFilter} />
                    </Column>
                    <Column
                        dataField='endTime'
                        alignment='left'
                        dataType='datetime'
                        format={"dd/MM/yyyy HH:mm"}
                        width={160}
                        caption='Thời gian kết thúc'></Column>
                    <Column
                        dataField='branchCode'
                        setCellValue={setBranchValue}
                        caption='Ngành'
                        width={160}
                        // hidingPriority={3}
                    >
                        <Lookup dataSource={branchGroupArray} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column dataField='groupCode' width={160} caption='Tổ' hidingPriority={2}>
                        <Lookup dataSource={getFilteredBranches} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column dataField={"completePercent"} cellRender={completePercent} caption={"Tỷ lệ hoàn thành"} width={100} />
                    <Column dataField='bomVersion' width={100} caption='Bom Version' hidingPriority={2}></Column>

                    <Column dataField='sapWo' width={100} visible={false} caption='SAP WO'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='lotNumber' caption='Số Lot' width={100} visible={false}></Column>
                    <Column dataField='state' alignment={"center"} width={120} caption='Trạng thái' cellRender={stateCellRender}>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column
                        alignment='center'
                        caption='Đánh giá'
                        dataField={"processStatus"}
                        // cellComponent={renderProcessStatus}
                        cellComponent={onStatusRender}
                        width={150}></Column>
                    <Column alignment='center' width={60} caption='Thao tác' cellRender={viewNVLButton}></Column>
                    <Column alignment='center' width={100} caption='Profile' dataField={"profile"} visible={false}></Column>
                    <Column alignment='center' width={100} caption='Trạng thái hoạt động' dataField={"status"} visible={false}></Column>
                    <Column dataField='note' caption={"Ghi chú"} minWidth={100} width={250}>
                        <FormItem colSpan={2} editorType='dxTextArea' editorOptions={{ height: 50 }} />
                    </Column>
                    <Column dataField='reasonId' caption={"Nguyên nhân"} hidingPriority={0} visible={false}>
                        <Lookup dataSource={reasonList} displayExpr='reason' valueExpr='id' allowClearing={true} />
                    </Column>
                    <Editing
                        mode='popup'
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}
                        useIcons={true}
                        texts={{
                            cancelRowChanges: "Hủy bỏ",
                            saveRowChanges: "Lưu lại",
                            confirmDeleteTitle: "Xác nhận xóa bản ghi",
                            confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                            deleteRow: "Xóa",
                            editRow: "Sửa",
                        }}>
                        <Popup title='Cập nhật Work Order' showTitle={true} width={"80%"} height={"80%"} />
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2} caption='Thông tin sản phẩm'>
                                <Item dataField='productOrder' disabled={true} />
                                <Item dataField='productCode' disabled={true} />
                                <Item dataField='productName' disabled={true} />
                                <Item dataField='bomVersion' editorType='dxSelectBox' editorOptions={bomversionOptions} />
                            </Item>
                            <Item itemType='group' colCount={2} colSpan={2} caption={"Thông tin WO"} horizontalAlignment={"center"}>
                                <Item dataField='quantityPlan' />
                                <Item dataField='quantityActual' />
                                <Item dataField='startTime' />
                                <Item dataField='endTime' />
                                <Item dataField='status' editorType='dxSelectBox' editorOptions={statusWOOptions} />
                                {/*<Item dataField="status" editorType="dxSelectBox" editorOptions={this.positionEditorOptions}*/}
                                {/*      key={"id"}/>*/}
                            </Item>
                            <Item itemType='group' colCount={2} colSpan={2} caption='Thông tin khác'>
                                <Item dataField='branchCode' />
                                <Item dataField='groupCode' />
                                <Item dataField='sapWo' />
                                <Item dataField='lotNumber' />
                                <Item dataField='note' colSpan={2} />
                                <Item dataField='reasonId' />
                            </Item>
                        </Form>
                    </Editing>
                    <MasterDetail enabled={true} autoExpandAll={false} component={getWorkOrderLineTemplate} />
                </DataGrid>
            </div>
            {/*<Popup2*/}
            {/*  // fullScreen={true}*/}
            {/*  width={"70%"}*/}
            {/*  height={"80%"}*/}
            {/*  showTitle={true}*/}
            {/*  title={"Xem nguyên vật liệu"}*/}
            {/*  dragEnabled={true}*/}
            {/*  closeOnOutsideClick={true}*/}
            {/*  visible={bomVersionProps.popupVisible}*/}
            {/*  onHiding={() => setBomversionProps({...bomVersionProps,popupVisible: false})}*/}
            {/*  contentRender={renderPopup}*/}
            {/*/>*/}
            <ViewNVLPopup bomVersionProps={observerObj} />
            <QmsStagePopup stageObject={stageObject} />
            {/*<Popup2*/}
            {/*  maxWidth={"900px"}*/}
            {/*  height={"auto"}*/}
            {/*  showTitle={true}*/}
            {/*  showCloseButton={true}*/}
            {/*  title={"Khai báo công đoạn"}*/}
            {/*  resizeEnabled={true}*/}
            {/*  dragEnabled={true}*/}
            {/*  closeOnOutsideClick={true}*/}
            {/*  visible={popupVisible2}*/}
            {/*  onHiding={() => setPopupVisible2(false)}*/}
            {/*  contentRender={renderPopup2}*/}

            {/*/>*/}

            <div className='options'>
                <div className='caption'>Tùy chọn</div>
                <div className='option'>
                    <CheckBox text='Mở rộng tất cả các nhóm' value={autoExpandAll} onValueChanged={onAutoExpandAllChanged} />
                </div>
            </div>
        </div>
    );
};

registerScreen({
    component: WorkOrderManager,
    caption: "screen.WorkOrderManager",
    screenId: "WorkOrderManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
