import React, { useCallback, useEffect, useState } from "react";
import { custom } from "devextreme/ui/dialog";
import DataGrid, {
    Column,
    Editing,
    Form,
    Format,
    FormItem,
    HeaderFilter,
    Item as TItem,
    Lookup,
    Popup,
    Toolbar,
} from "devextreme-react/data-grid";
import "../WorkOrderManager.css";
import { Item } from "devextreme-react/form";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { BomVersionButton } from "../../product/BomversionButton";
import { Coitt } from "../../../jmix/entities/Coitt";
import { Button } from "devextreme-react/button";
import { PlanningWorkOrder } from "../../../jmix/entities/PlanningWorkOrder";
import { stateCellRender, statusList } from "../../utils";
import { Profile } from "../../../jmix/entities/Profile";
import { Tooltip } from "devextreme-react/tooltip";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { PLANNING_API_URL, SCADA_URL } from "../../../config";
import { BranchGroup } from "../../../jmix/entities/BranchGroup";
import Popup2 from "devextreme-react/popup";
import { WorkOrderStateMamager } from "../../work-order-stage/WorkOrdersStateManager";
import { WorkOrderStage } from "../../../jmix/entities/WorkOrderStage";
import { StoreView } from "./StoreView";
import UserAdminService from "../../../utils/UserAdminService";
import DnlnvlPanelManager from "../../r2/dnlnvl/dnlnvlPanel/DnlnvlPanelManager";
import { currentDateTime, customizeColor, print, str } from "../../../utils/utils";
import { DropDownOptions } from "devextreme-react/lookup";
import { SelectBox } from "devextreme-react";
import ScadaService from "../../services/ScadaService";
import StageNameTagBoxComponent from "./StageNameTagBoxComponent";
import BomVersionProps from "../../observables/BomVersionProps";
import StageObserverObject from "../../observables/StageObserverObject";
import { QmsStagePopup } from "../popup/QmsStagePopup";
import { ViewNVLPopup } from "../popup/ViewNVLPopup";
import BusinessLogService from "../../services/BusinessLogService";
import { WorkOrderLogPopup } from "../popup/WorkOrderLogPopup";
import BusinessLogObject from "../../observables/BusinessLogObject";
import DnlnvlApproveRedundantView from "../../r2/dnlnvl/dnlnvlView/DnlnvlApproveRedundantView";
import DnlnvlGivebackRedundantPopup from "../../r2/dnlnvl/DnlnvlGivebackRedundant/DnlnvlGivebackRedundantPopup";
import { SapWOAutocomplete } from "./SapWOAutocomplete";
import { Owor } from "../../../jmix/entities/Owor";
import { Tag } from "antd";

const workOrderStageCollection = collection<WorkOrderStage>(WorkOrderStage.NAME, {
    view: "_base",
    loadImmediately: false,
    // sort: 'order'
});

const profiles = collection<Profile>(Profile.NAME, {
    view: "_base",
    sort: "-id",
    loadImmediately: false,
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

const dataInstance = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, { view: "_base", loadImmediately: false });

const observerObj = new BomVersionProps();
const stageObject = new StageObserverObject();
const businessLogObject = new BusinessLogObject();
let dataGrid;
export const WorkOrderLineTemplate = React.memo((props: any) => {
    let ssoGroups: any[] = [];
    let ssoUsers: any[] = [];
    let scadaStageList: any[] = [];
    // let branchGroupArray: any[] = [];
    // let groupArray: any[] = [];

    const key: string = props.data.data.woId;
    const workOrderItemDs = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "with-profile-programming",
        sort: "-createTime",
        loadImmediately: false,
        filter: {
            conditions: [{ property: "parentWorkOrderId", operator: "=", value: key }],
        },
    });

    const mainStore = useMainStore();
    const [workOrderLineList, setWorkOrderLineList] = useState<any[]>([]);
    const [isRender, setIsRender] = useState(false);
    const [popupDnlnvlIsOpen, setPopupDnlnvlIsOpen] = useState(false);
    const [popupRedundantIsOpen, setPopupRedundantIsOpen] = useState(false);
    const [popupApproveRedundantIsOpen, setPopupApproveRedundantIsOpen] = useState(false);
    const [bomVersion, setBomVersion] = useState<any>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupVisible2, setPopupVisible2] = useState(false);
    const [currentRow, setCurrentRow] = useState<any>(null);
    const [currentPlanningWorkOrder, setCurrentPlanningWorkOrder] = useState<any>(null);
    const [profilesArray, setProfilesArray] = useState<Profile[]>([]);
    const [lines, setLines] = useState<any[]>([]);
    const [workOrderStage, setWorkOrderStage] = useState<any[]>([]);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);

    useEffect(() => {
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
    }, []);
    const loadSsoUserAndGroup = async () => {
        await UserAdminService.groupList().then((res) => {
            if (res && res.status === 200 && res.data) {
                ssoGroups = res.data;
            }
        });

        await UserAdminService.userList().then((res) => {
            if (res && res.status === 200 && res.data) {
                ssoUsers = res.data;
                ssoUsers.map((item) => (item.Value = getDisplayName(item)));
            }
        });
    };

    const loadScadaStageName = async () => {
        // let scadaData = await ScadaService.getStageList();
        // if (scadaData) scadaStageList = scadaData
    };

    const loadProfile = async () => {
        let arr: { id: string; name: string; programmingCode: string }[] = [];
        profiles.load().then(() => {
            if (profiles.items) {
                profiles.items.map((item) => {
                    let { id, name, programming } = item;
                    if (id && name) {
                        arr.push({
                            id: id,
                            name: name,
                            programmingCode: programming?.programingCode ? programming.programingCode : "",
                        });
                    }
                });
            }
            setProfilesArray(arr);
        });
    };

    useEffect(() => {
        console.log("props");
        console.log(props);
        setProfilesArray(props.profiles);
        setLines(props.lines);
        // loadProfile();
        // loadSsoUserAndGroup();
        // loadBranchGroup();
        // loadScadaStageName();

        workOrderItemDs.load().then((res) => {
            // alert(workOrderItemDs.items.length);
            setWorkOrderLineList(workOrderItemDs.items);
        });
    }, []);

    const setPopUpIsOpen = (status) => {
        setPopupDnlnvlIsOpen(status);
    };

    const profileCellRender = (e) => {
        alert(str(e.value));
        return <div>{e.value.name}</div>;
    };

    const getDisplayProfileName = (e) => {
        return e.name;
    };

    let statusWOOptions = {
        items: statusList,
        searchEnabled: true,
        displayExpr: "Name",
        valueExpr: "ID",
    };

    const lookupProfileCellRender = (data) => {
        const renderLookUp = (localData) => {
            return (
                <div>
                    {localData?.programmingCode} | {localData?.name}
                </div>
            );
        };

        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = profilesArray?.find(({ id }) => id === valueChangedEventArg.value);
            // @ts-ignore
            data.setValue(dat);
        };
        return (
            <>
                {profilesArray && profilesArray.length ? (
                    <div>
                        <SelectBox
                            // width="600"
                            dataSource={profilesArray}
                            acceptCustomValue={true}
                            searchEnabled={true}
                            searchExpr={"name"}
                            defaultValue={data?.data?.profileId}
                            displayExpr='name'
                            valueExpr='id'
                            onValueChanged={setEditedValue}
                            itemRender={renderLookUp}>
                            <DropDownOptions hideOnOutsideClick={true} showTitle={false} />
                        </SelectBox>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const addMenuItems = (e) => {
        console.log(e);
        if (e.target == "content") {
            // e.items can be undefined
            if (!e.items) e.items = [];

            // Add a custom menu item
            e.items.push(
                {
                    text: "Khai báo công đoạn",
                    onItemClick: () => {
                        showStageChoosePopup(e.row);
                    },
                },
                {
                    text: "Xem NVL",
                    onItemClick: () => {
                        showNVLViewPopup(e.row);
                    },
                },
                {
                    text: "R2 Tool",
                    onItemClick: () => {
                        onOpenPopUpDnlnvl(e.row.data);
                    },
                },
            );
        }
    };

    const quantityOut = (row) => {
        let outQuantity = row.data.scadaQuantityOut;
        if (outQuantity)
            return <div className={"highlightColumnQuantity"}>{outQuantity.toLocaleString("en-US", { maximumFractionDigits: 2 })}</div>;
        return <div>0</div>;
    };

    const quantityComplete = (row) => {
        let outQuantity = row.data.quantityActual;
        if (outQuantity)
            return <div className={"highlightColumnQuantity"}>{outQuantity.toLocaleString("en-US", { maximumFractionDigits: 2 })}</div>;
        return <div>0</div>;
    };

    const loadBranchGroup = async () => {
        // if (!branchGroupArray || !groupArray)
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
                    groupArray.push({ branchCode: uBranchcode, id: uGroupcode, text: uGroupname });
                }
            });
            setIsRender(false);
        });
    };

    const setBranchValue = (rowData, value) => {
        rowData.groupCode = null;
        rowData.branchCode = value;
        // @ts-ignore
        // this.defaultSetCellValue(rowData, value);
    };

    const oworCollection = collection<Owor>(Owor.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const setSapWoValue = (rowData, value, currentRow) => {
        if (value && value.uproduction) {
            // console.log("check sap code is match with item code")
            // // value.uProduction = value.uProduction.replace("autocomplete","");
            // oworCollection.filter = {
            //   conditions: [
            //     {property: 'itemCode', operator: "=", value: currentRow.productCode},
            //     {property: 'docNum', operator: "=", value: value.uproduction}
            //   ]
            // }
            // oworCollection.load().then(res => {
            //   if(!oworCollection.items || oworCollection.items.length == 0){
            //     notify({
            //       message: 'SAP WO không khớp với mã sản phẩm ' + currentRow.productCode,
            //       width: 650
            //     }, 'error', 5000);
            //   }
            // })

            rowData.sapWo = value.uproduction;
            rowData.lotNumber = value.code;
        } else {
            rowData.sapWo = value;

            //check sap code is match with item code
            oworCollection.filter = {
                conditions: [
                    { property: "itemCode", operator: "=", value: currentRow.productCode },
                    { property: "docNum", operator: "=", value: value },
                ],
            };
            oworCollection.load().then((res) => {
                if (!oworCollection.items || oworCollection.items.length == 0) {
                    notify(
                        {
                            message: "SAP WO không khớp với mã sản phẩm " + currentRow.productCode,
                            width: 650,
                        },
                        "error",
                        5000,
                    );
                }
            });
        }
    };

    const getFilteredBranches = (options): any => {
        return {
            store: props.groupArray,
            filter: options.data ? ["branchCode", "=", options.data.branchCode] : null,
        };
    };

    const getDisplayName = (item) => {
        return `${item.username} - ${item.firstName ? item.firstName : ""}  ${item.lastName ? item.lastName : ""}`;
    };

    const renderPopup = useCallback(
        (row) => {
            return <StoreView row={currentRow} bomVersion={bomVersion} />;
        },
        [popupVisible],
    );

    const renderPopup2 = useCallback(() => {
        console.log("render popup2");
        console.log(currentRow);
        return (
            <>
                <WorkOrderStateMamager
                    row={currentRow}
                    closePopup={() => setPopupVisible2(false)}
                    workOrderStage={workOrderStage}
                    ssoGroups={props.ssoGroups}
                    ssoUsers={props.ssoUsers}
                />
            </>
        );
    }, [popupVisible2]);

    const showNVLViewPopup = async (row) => {
        console.log("showNVLViewPopup");
        bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: row.data.productCode },
                { property: "uVersions", operator: "=", value: row.data.bomVersion },
            ],
        };

        await bomVersionDs.load().then((res) => {
            // setCurrentRow(row)
            // setBomVersion(bomVersionDs.items.pop())
            // setPopupVisible(true)
            observerObj.loadBomVersion(row.data, bomVersionDs.items.pop(), true);
        });
    };

    const showWoLog = async (row) => {
        businessLogObject.setData(row.data.woId, true);
    };

    const showStageChoosePopup = async (row) => {
        console.log("showStageChoosePopup");
        workOrderStageCollection.clear();
        workOrderStageCollection.filter = {
            conditions: [{ property: "workOrder", operator: "=", value: row.data.woId }],
        };

        await workOrderStageCollection.load().then((res) => {
            if (workOrderStageCollection.items) {
                console.log("WorkOrderStateMamager: work order stage " + row.data.woId);
                // setCurrentRow(row)
                // setWorkOrderStage(workOrderStageCollection.items)
                // setPopupVisible2(true)
                stageObject.setData(row.data, workOrderStageCollection.items, true, props.ssoGroups, props.ssoUsers);
            }
        });
    };

    const buttonViewBom = (row) => {
        return <BomVersionButton row={row} showBomversionView={showBomVersionView} disabled={!row.data.bomVersion} />;
    };

    const closePopup = () => {
        setPopupVisible(false);
        setPopupVisible2(false);
    };

    const handlePopupHidden = () => {
        setPopupVisible(false);
        setPopupVisible2(false);
    };

    const showBomVersionView = (row) => {
        bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: row.data.productCode },
                { property: "uVersions", operator: "=", value: row.data.bomVersion },
            ],
        };
        bomVersionDs.load().then((res) => {
            setPopupVisible(true);
            setCurrentRow(row);
        });
    };

    //tao wo từ product
    const showCreateWOByProductPopup = (row) => {
        console.log(`showCreateWOByPOPopup`);
        setPopupVisible2(true);
        setCurrentRow(row);
    };

    const onEdit = (data) => {
        console.log(data);
        let startTime = currentDateTime();
        let orderItem = data.newData;
        if (orderItem.profile) {
            orderItem.profileId = {
                id: orderItem?.profile,
            };
        }
        orderItem.id = data.key;
        console.log("onEdit");
        console.log(branchGroupArray);
        console.log(groupArray);

        if (orderItem.branchCode) {
            branchGroupArray.forEach((value) => {
                if (value.id === orderItem.branchCode) {
                    orderItem.branchName = value.text;
                }
            });
        }
        if (orderItem.groupCode) {
            groupArray.forEach((value) => {
                if (value.id === orderItem.groupCode) {
                    orderItem.groupName = value.text;
                }
            });
        }

        if (orderItem.profile && profiles.items) {
            profiles.items.forEach((value) => {
                if (value.id === orderItem.profile) {
                    orderItem.profileName = value.name;
                }
            });
        }
        if (orderItem.scadaStageList && orderItem.scadaStageList.length > 0) {
            print(orderItem.scadaStageList.length);
            print(orderItem.scadaStageList);
            let data = orderItem.scadaStageList.reduce((result, item) => {
                return `${result},${item}`;
            });
            orderItem.scadaStageList = data;
        } else orderItem.scadaStageList = "";

        if (orderItem.scadaUserName && orderItem.scadaUserName.includes("-")) {
            orderItem.scadaUserName = orderItem.scadaUserName.split("-")[0];
            orderItem.scadaUserFullname = orderItem.scadaUserName.split("-")[1];
        }

        //update isNew = 0 when have update action
        if (orderItem.isNew == null || orderItem.isNew == 1) {
            orderItem.isNew = 0;
            if (props.data.data.isNew == 1) {
                let woParent: PlanningWorkOrder = new PlanningWorkOrder();
                woParent.id = props.data.data.id;
                woParent.isNew = 0;
                let instanceStore = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
                    view: "_base",
                    loadImmediately: false,
                });
                instanceStore.setItem(woParent);
                instanceStore.commit("edit");
            }
        }
        console.log(str(orderItem));

        dataInstance.setItem(orderItem);
        dataInstance.commit().then((res) => {
            BusinessLogService.save("EDIT_WORK_ORDER", orderItem, data.oldData.woId, null, startTime);
        });
    };

    const onInsert = (data) => {
        let workOrder = workOrderLineList[0];
        data.data.parentWorkOrderId = props.data.data.woId;
        data.data.bomVersion = props.data.data.bomVersion;
        data.data.quota = workOrder ? workOrder.quota : props.data.data.quota;
        data.data.line = props.data.data.line;
        data.data.productCode = props.data.data.productCode;
        data.data.productName = props.data.data.productName;
        data.data.productOrder = props.data.data.productOrder;
        data.data.startTime = new Date(); // dung new Date moi hien thi dung timezone hien tai
        data.data.endTime = new Date();
        data.data.createTime = currentDateTime(); // dung currentDateTime de khi gui xuong backend dung timezone
        data.data.isNew = 1;
        data.data.quantityPlan = props.data.data.quantityPlan;
        data.data.profile = props.data.data.profile;
        if (data.data.profile) {
            data.data.profileId = {
                id: props.data.data.profile,
            };
        }
        data.data.profileName = props.data.data.profileName;
        data.data.state = "NEW";
        data.data.workOrderType = "LINE";
        data.data.woId = "WO-" + (props.data.data.planningWorkOrderId + "-" + (workOrderItemDs.items.length + 1));
        data.data.quantityPlan = getQuantityForNewWo();
        data.data.branchCode = props.data.data.branchCode;
        data.data.groupCode = props.data.data.groupCode;
        //TODO phần sửa dữ liệu xuất hiện ở đây
    };

    const getQuantityForNewWo = () => {
        let woQuantity = props.data.data.quantityPlan;
        console.log(woQuantity);
        let sumItemQuantity = 0;
        workOrderLineList.map((item) => {
            if (item.quantityPlan) {
                console.log(item.quantityPlan);
                sumItemQuantity += item.quantityPlan;
            }
        });
        console.log("sumQuantityItem " + sumItemQuantity);
        return woQuantity - sumItemQuantity > 0 ? woQuantity - sumItemQuantity : 0;
    };

    const rowInsert = async (data) => {
        console.log(data);
        let headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };

        let res = await axios.post(PLANNING_API_URL + "/services/api/work-order", data.data, { headers });
        if (res.status === 200 && res.data) {
            onRefreshGrid();
        }
        // dataInstance.commit().then(res => {
        //   print(workOrderLineList);
        // });
    };

    const getIcon = (row) => {
        return (
            <div>
                <i className='dx-icon-pin dx-icon-custom-style'></i>
                <span className='icon-wo-line-name'>
                    {row.data.woId}
                    {row.data.isNew == 1 ? "(*)" : ""}
                </span>
            </div>
        );
    };

    const onOpenPopUpDnlnvl = (planningWorkOrder: PlanningWorkOrder) => {
        setCurrentPlanningWorkOrder(planningWorkOrder);
        setPopupDnlnvlIsOpen(true);
    };

    const buttonCellRender = (data) => {
        return (
            <div>
                <div id={"buttonSendToScadar" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton
                        row={data}
                        showBomversionView={senWOToScadarWithConfirm}
                        icon={"chevrondoubleright"}
                        disabled={data.data.valueOf() === "SEND_SCADA_OK"}
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
                <div id={"stageChoose" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton
                        row={data}
                        showBomversionView={showStageChoosePopup}
                        disabled={data.data.status === "DEACTIVE"}
                        icon='info'
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
                <div id={"storeView" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton row={data} showBomversionView={showNVLViewPopup} disabled={!data.data.bomVersion} icon='chart' />
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
                <div id={"viewLog" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton row={data} showBomversionView={showWoLog} icon='textdocument' />

                    <Tooltip
                        target={"#viewLog" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>View history</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
                <div id={"r2Tool" + data.data.id} style={{ float: "left" }}>
                    <Button icon='customicon' stylingMode={"text"} onClick={(e) => onOpenPopUpDnlnvl(data.data)} />
                    <Tooltip
                        target={"#r2Tool" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>R2 Tool</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
                <div id={"redundantMaterial" + data.data.id} style={{ float: "left" }}>
                    <Button
                        icon='redundaunt'
                        stylingMode={"text"}
                        onClick={(e) => {
                            setPopupRedundantIsOpen(true);
                            setCurrentPlanningWorkOrder(data.data);
                        }}
                    />
                    <Tooltip
                        target={"#redundantMaterial" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Khai báo nguyên vật liệu dư thừa</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
                <div id={"approveRedundantmaterial" + data.data.id} style={{ float: "left" }}>
                    <Button
                        icon='approveredundaunt'
                        stylingMode={"text"}
                        onClick={(e) => {
                            console.log("click");
                            setPopupApproveRedundantIsOpen(true);
                            setCurrentPlanningWorkOrder(data.data);
                        }}
                    />
                    <Tooltip
                        target={"#approveRedundantmaterial" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Duyệt trả nguyên vật liệu dư thừa</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
            </div>
        );
    };

    const senWOToScadarWithConfirm = (row) => {
        let validate = validateBeforeSend(row);
        if (validate !== "PASS") {
            notify(
                {
                    message: "Không thể gửi Scada do WO thiếu dữ liệu: " + validate,
                    width: 650,
                },
                "error",
                5000,
            );
            return;
        }
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận gửi Scada ",
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
                    resolve(false);
                } else {
                    reject("");
                }
            });
        });
    };

    const validateBeforeSend = (row) => {
        let validateRs = "";
        if (!checkEmpty(row.data.quantityPlan)) {
            validateRs += "Số lượng đặt hàng, ";
        }

        if (!checkEmpty(row.data.productCode)) {
            validateRs += "Mã sản phẩm, ";
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

        if (!checkEmpty(row.data.sapWo)) {
            validateRs += "Sap WO, ";
        }

        if (!checkEmpty(row.data.lotNumber)) {
            validateRs += "Lot Number, ";
        }

        if (validateRs === "") {
            validateRs = "PASS";
        } else {
            validateRs = validateRs.substring(0, validateRs.length - 2);
        }

        return validateRs;
    };

    const checkEmpty = (value) => {
        return value && value !== "";
    };

    const testGetScadaQuantity = async (row) => {
        let token = await ScadaService.login();
        if (token) {
            let assetId = await ScadaService.getAssetByName(token, row.data.sapWo + "-" + row.data.lotNumber);
            if (assetId) {
                ScadaService.getQuantityOut(token, assetId);
            }
        }
    };

    const sendWOToScadar = async (row) => {
        console.log("send wo to scadar");
        console.log(row.data);
        let startTime = currentDateTime();
        let headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        console.log("send api to get wo - line " + row.data.productOrder);
        axios
            .get(PLANNING_API_URL + "/services/api/order/get-wo-line?productOrderId=" + row.data.productOrder + "&woId=" + row.data.woId, {
                headers,
            })
            .then((response) => {
                if (response.status === 200) {
                    const woLineList = response.data;
                    console.log("response workOrderLineList");
                    console.log(woLineList);
                    let success = false;
                    if (!woLineList) return;
                    woLineList.map((woLine) => {
                        console.log("woLine " + woLine.Wo_Id);
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
                                    console.log("login thanh cong");

                                    const token = response.data.token;
                                    const headers = {
                                        "content-type": "application/json",
                                        "X-Authorization": "Bearer " + token,
                                    };
                                    let assetName = woLine.Wo_Id + "-" + woLine.Lot_Number;
                                    // let lineId = woLine.Line_Id ? 'vline' : 'Machines';
                                    let lineId = "vline";
                                    let assetId;
                                    axios
                                        .get(SCADA_URL + "/api/tenant/assets?assetName=" + assetName, { headers })
                                        .then((res) => {
                                            if (res.status == 200) {
                                                console.log("asset name " + assetName + " is exists");
                                                assetId = res.data.id.id;
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
                                                        if (res.status == 200) {
                                                            notify(
                                                                {
                                                                    message: woLine.Planning_Code + ": Đã gửi sang scadar thành công!",
                                                                    width: 450,
                                                                },
                                                                "SUCCESS",
                                                                3000,
                                                            );
                                                            console.log("send wo line to scadar success " + woLine.Po_Id + " xxx");
                                                            ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                            BusinessLogService.save(
                                                                "SEND_SCADA",
                                                                woLine,
                                                                woLine.Planning_Code,
                                                                null,
                                                                startTime,
                                                            );
                                                            success = true;
                                                            let headers = {
                                                                Authorization: "Bearer " + mainStore.authToken,
                                                                "content-type": "application/json",
                                                            };

                                                            axios
                                                                .get(
                                                                    PLANNING_API_URL +
                                                                        "/services/api/workorder/update-wo-state?woId=" +
                                                                        woLine.Planning_Code,
                                                                    { headers },
                                                                )
                                                                .then((res) => {
                                                                    console.log("update state ok");
                                                                    onRefreshGrid();
                                                                });
                                                        } else {
                                                            console.log(res);
                                                        }
                                                    });
                                            } else {
                                                console.log("create new asset with name " + assetName);
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
                                                        if (res.status == 200) {
                                                            assetId = res.data.id.id;
                                                            console.log("create scadar asset OK, asset id = " + assetId);
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
                                                                    if (res.status == 200) {
                                                                        notify(
                                                                            {
                                                                                message:
                                                                                    woLine.Planning_Code +
                                                                                    ": Đã gửi WO sang scadar thành công",
                                                                                width: 450,
                                                                            },
                                                                            "SUCCESS",
                                                                            3000,
                                                                        );
                                                                        console.log(
                                                                            "send wo line to scadar success " + woLine.Po_Id + " xxx",
                                                                        );
                                                                        ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                                        BusinessLogService.save(
                                                                            "SEND_SCADA",
                                                                            woLine,
                                                                            woLine.Planning_Code,
                                                                            null,
                                                                            startTime,
                                                                        );
                                                                        success = true;
                                                                        let headers = {
                                                                            Authorization: "Bearer " + mainStore.authToken,
                                                                            "content-type": "application/json",
                                                                        };
                                                                        axios
                                                                            .get(
                                                                                PLANNING_API_URL +
                                                                                    "/services/api/workorder/update-wo-state?woId=" +
                                                                                    woLine.Planning_Code,
                                                                                { headers },
                                                                            )
                                                                            .then((res) => {
                                                                                console.log("update state ok");
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
                                            console.log("reason");
                                            console.log(reason);
                                            console.log("create new asset with name " + assetName);
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
                                                    if (res.status == 200) {
                                                        assetId = res.data.id.id;
                                                        console.log("create scadar asset OK, asset id = " + assetId);
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
                                                                if (res.status == 200) {
                                                                    notify(
                                                                        {
                                                                            message:
                                                                                woLine.Planning_Code + ": Đã gửi WO sang scadar thành công",
                                                                            width: 450,
                                                                        },
                                                                        "SUCCESS",
                                                                        3000,
                                                                    );
                                                                    console.log("send wo line to scadar success " + woLine.Po_Id + " xxx");
                                                                    ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                                    BusinessLogService.save(
                                                                        "SEND_SCADA",
                                                                        woLine,
                                                                        woLine.Planning_Code,
                                                                        null,
                                                                        startTime,
                                                                    );
                                                                    success = true;
                                                                    let headers = {
                                                                        Authorization: "Bearer " + mainStore.authToken,
                                                                        "content-type": "application/json",
                                                                    };
                                                                    axios
                                                                        .get(
                                                                            PLANNING_API_URL +
                                                                                "/services/api/workorder/update-wo-state?woId=" +
                                                                                woLine.Planning_Code,
                                                                            { headers },
                                                                        )
                                                                        .then((res) => {
                                                                            console.log("update state ok");
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

                                    if (success) {
                                        console.log("update wo state to SEND SCADAR OK");
                                        console.log(woLineList.get());
                                        let headers = {
                                            Authorization: "Bearer " + mainStore.authToken,
                                            "content-type": "application/json",
                                        };
                                    }
                                } else {
                                    notify("Gửi yêu cầu sang Scadar thất bại!", "error", 3000);
                                }
                            });
                    });
                    const headers = { "content-type": "application/json" };
                } else {
                    notify("lấy wo list thất bại!", "error", 3000);
                }
            });
        onRefreshGrid();
    };

    const onRefreshGrid = () => {
        loadProductOrder();
    };

    const loadProductOrder = () => {
        workOrderItemDs.load().then((res) => {
            // alert(workOrderItemDs.items.length);
            setWorkOrderLineList(workOrderItemDs.items);
        });
    };

    const setBranchCodeCellValue = (newData, value) => {
        let column = this;
        newData.branchCode = value;
    };

    const lineCellRender = (row) => {
        let name;
        if (lines) {
            lines.map((item) => {
                if (item.ID === row.data.line) name = item.Name;
            });
        }
        return <>{name}</>;
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
        } else if (rowInfo.data.data.processStatus === null || rowInfo.data.data.processStatus === "unknown") {
            cl = "error";
            str = "Chưa xác định";
        }
        return <Tag color={cl}>{str}</Tag>;
    }

    return (
        <div className={"master-detail-grid"}>
            {workOrderLineList != undefined && workOrderLineList.length > 0 ? (
                <DataGrid
                    id='gridContainer'
                    ref={(ref) => (dataGrid = ref)}
                    dataSource={workOrderLineList}
                    keyExpr='id'
                    height={"auto"}
                    onRowUpdating={onEdit}
                    showBorders={true}
                    showColumnLines={false}
                    showRowLines={true}
                    onInitNewRow={onInsert}
                    rowAlternationEnabled={true}
                    onRowInserting={rowInsert}
                    wordWrapEnabled={true}
                    onContextMenuPreparing={addMenuItems}>
                    {/*<Selection mode="single"/>*/}

                    <Toolbar>
                        <TItem location={"before"}>
                            <div className={"master-detail-title"}>Danh sách KBSX - LINE</div>
                        </TItem>
                        <TItem name='addRowButton' />
                    </Toolbar>

                    <Column dataField='woId' width={150} caption='WO-LINE' cellRender={getIcon}></Column>
                    <Column dataField='productOrder' caption='Mã đơn hàng' visible={false}></Column>
                    {/*<Column dataField="productName"*/}
                    {/*        caption="Tên Sản phẩm"*/}
                    {/*  // groupIndex={1}*/}
                    {/*></Column>*/}
                    <Column dataField='line' cellRender={lineCellRender} caption='Dây chuyền'>
                        <Lookup dataSource={lines} displayExpr='Name' valueExpr='ID' />
                    </Column>
                    <Column dataField='productCode' caption='Mã Sản phẩm' visible={false}></Column>

                    <Column dataField='productName' caption='Tên Sản phẩm' visible={false} />
                    <Column dataField='bomversion' caption='Bom version' visible={false} />
                    <Column dataField='branchName' caption='Ngành' width={200} visible={false}></Column>
                    <Column dataField='branchCode' setCellValue={setBranchValue} caption='Ngành' minWidth={100} visible={true}>
                        <Lookup dataSource={props.branchGroupArray} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column dataField='groupCode' minWidth={100} caption='Tổ' visible={true}>
                        <Lookup dataSource={getFilteredBranches} displayExpr='text' valueExpr='id' />
                    </Column>

                    <Column dataField='groupName' width={160} visible={false} caption='Tổ'></Column>

                    <Column dataField='quantityPlan' width={100} caption='Số lượng'>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField={"scadaQuantityOut1"} caption={"Sản lượng CĐ1"} alignment='right' width={120} />
                    <Column
                        dataField='quantityActual'
                        width={140}
                        caption='Số lượng hoàn thành'
                        visible={true}
                        alignment='right'
                        cellRender={quantityComplete}>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column dataField='scadaQuantityOut' width={100} alignment='right' caption='Sản lượng Scada' cellRender={quantityOut}>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        dataField='startTime'
                        alignment='center'
                        dataType='datetime'
                        format={"dd/MM/yyyy HH:mm"}
                        width={160}
                        caption='Thời gian bắt đầu'></Column>
                    <Column
                        dataField='endTime'
                        alignment='center'
                        dataType='datetime'
                        format={"dd/MM/yyyy HH:mm"}
                        width={160}
                        caption='Thời gian kết thúc'></Column>
                    <Column dataField='quota' caption='Định mức NVL' visible={true}></Column>
                    <Column dataField='bomVersion' width={120} caption='Bom Version' visible={false}></Column>
                    <Column
                        dataField='sapWo'
                        width={100}
                        visible={false}
                        caption='SAP WO'
                        editCellComponent={SapWOAutocomplete}
                        setCellValue={setSapWoValue}>
                        <Lookup dataSource={props.scadaStageList} displayExpr={"description"} valueExpr='name' allowClearing={true} />
                    </Column>
                    <Column dataField='lotNumber' caption='Số Lot' width={100} visible={false}></Column>
                    <Column dataField='state' alignment={"center"} width={140} caption='Trạng thái' cellRender={stateCellRender}>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column
                        alignment='center'
                        caption='Đánh giá'
                        // cellComponent={renderProcessStatus}
                        cellComponent={onStatusRender}
                        dataField='processStatus'
                        width={150}></Column>
                    <Column alignment={"center"} width={160} caption={"Thao tác"} cellRender={buttonCellRender}></Column>
                    <Column dataField='numberStaff' dataType={"number"} caption='Số nhân sự' width={100} visible={false}></Column>
                    <Column
                        dataField='profileId'
                        caption='Profile'
                        visible={false}
                        cellRender={profileCellRender}
                        editCellRender={lookupProfileCellRender}
                        width={100}></Column>
                    <Column dataField='scadaUserGroup' caption='Nhóm' width={100} visible={false}>
                        <Lookup dataSource={props.ssoGroups} displayExpr='name' valueExpr='name' allowClearing={true} />
                    </Column>
                    <Column
                        dataField='scadaUserName'
                        caption='Người quản lý'
                        width={100}
                        visible={false}
                        // setCellValue={setScadaUserName}
                    >
                        <Lookup dataSource={props.ssoUsers} displayExpr={getDisplayName} valueExpr='Value' allowClearing={true} />
                    </Column>
                    <Column dataField='scadaUserFullname' caption='scadaUserFullname' width={100} visible={false}></Column>
                    <Column alignment='center' width={100} caption='Trạng thái hoạt động' dataField={"status"} visible={false}></Column>
                    <Column dataField='note' minWidth={100} caption={"Ghi chú"} hidingPriority={5}>
                        <FormItem colSpan={2} editorType='dxTextArea' editorOptions={{ height: 50 }} />
                    </Column>
                    <Column
                        dataField='scadaStageList'
                        caption='Công đoạn'
                        width={100}
                        visible={false}
                        editCellComponent={StageNameTagBoxComponent}
                        renderAsync={true}>
                        <Lookup dataSource={props.scadaStageList} displayExpr={"description"} valueExpr='name' allowClearing={true} />
                    </Column>
                    <Column dataField='reasonId' caption={"Nguyên nhân"} hidingPriority={0} visible={false}>
                        <Lookup dataSource={props.reasons} displayExpr='reason' valueExpr='id' allowClearing={true} />
                    </Column>
                    <Editing
                        mode='popup'
                        allowUpdating={true}
                        allowAdding={true}
                        useIcons={true}
                        texts={{
                            cancelRowChanges: "Hủy bỏ",
                            saveRowChanges: "Lưu lại",
                            confirmDeleteTitle: "Xác nhận xóa bản ghi",
                            confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                            deleteRow: "Xóa",
                            editRow: "Sửa",
                            addRow: "Thêm KBSX-LINE",
                        }}>
                        <Popup title={"Cập nhật Work Order"} showTitle={true} width={"80%"} height={"80%"} />
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2} caption={"Thông tin chung"} horizontalAlignment={"center"}>
                                <Item dataField='woId' disabled={true} />
                                <Item dataField='state' disabled={true} />
                                <Item dataField='quantityPlan' />
                                <Item dataField='quantityActual' />
                                <Item dataField='startTime' />
                                <Item dataField='endTime' />
                                <Item dataField='quota' />
                                <Item dataField='status' editorType='dxSelectBox' editorOptions={statusWOOptions} />
                            </Item>
                            <Item itemType='group' colCount={2} colSpan={2} caption='Thông tin sản phẩm'>
                                <Item dataField='productOrder' disabled={true} />
                                <Item dataField='productCode' disabled={true} />
                                <Item dataField='productName' disabled={true} />
                                <Item dataField='bomVersion' disabled={true} />
                            </Item>
                            <Item itemType='group' colCount={2} colSpan={2} caption='Thông tin khác'>
                                <Item dataField='branchCode' />
                                <Item dataField='groupCode' />
                                <Item dataField='sapWo' />
                                <Item dataField='lotNumber' />
                                <Item dataField='line' />
                                <Item dataField='scadaStageList' />
                                <Item dataField='profileId' />
                                <Item dataField='note' />
                            </Item>
                            <Item itemType='group' colCount={2} colSpan={2} caption='Chọn người/nhóm quản lý work order'>
                                <Item dataField='scadaUserGroup' />
                                <Item dataField='scadaUserName' />
                                <Item dataField='numberStaff' />
                                <Item dataField='reasonId' />
                            </Item>
                        </Form>
                    </Editing>
                </DataGrid>
            ) : (
                "Nothing"
            )}
            <ViewNVLPopup bomVersionProps={observerObj} />
            <WorkOrderLogPopup businessLogObject={businessLogObject} />
            <QmsStagePopup stageObject={stageObject} />

            {currentPlanningWorkOrder && popupDnlnvlIsOpen ? (
                <DnlnvlPanelManager
                    planningWorkOrder={currentPlanningWorkOrder}
                    popupIsOpen={popupDnlnvlIsOpen}
                    setPopUpIsOpen={setPopUpIsOpen}
                />
            ) : (
                ""
            )}
            {currentPlanningWorkOrder && popupRedundantIsOpen ? (
                <DnlnvlGivebackRedundantPopup
                    currentPlanningWorkOrder={currentPlanningWorkOrder}
                    visible={popupRedundantIsOpen}
                    setClose={() => setPopupRedundantIsOpen(false)}
                    refresh={() => {}}
                />
            ) : (
                ""
            )}
            {currentPlanningWorkOrder && popupApproveRedundantIsOpen ? (
                <Popup2
                    title='Duyệt trả NVL dư thừa'
                    visible={popupApproveRedundantIsOpen}
                    onHiding={() => setPopupApproveRedundantIsOpen(false)}
                    height={"auto"}>
                    <DnlnvlApproveRedundantView planningWorkOrder={currentPlanningWorkOrder} />
                </Popup2>
            ) : (
                ""
            )}
            {/*<Popup2*/}
            {/*  // fullScreen={true}*/}
            {/*  width={"70%"}*/}
            {/*  height={"80%"}*/}
            {/*  showTitle={true}*/}
            {/*  title={"Xem nguyên vật liệu"}*/}
            {/*  dragEnabled={true}*/}
            {/*  closeOnOutsideClick={true}*/}
            {/*  visible={popupVisible}*/}
            {/*  onHiding={() => setPopupVisible(false)}*/}
            {/*  contentRender={renderPopup}*/}
            {/*/>*/}
            {/*{*/}
            {/*  str(currentRow)*/}
            {/*}*/}
        </div>
    );
});

export default WorkOrderLineTemplate;
