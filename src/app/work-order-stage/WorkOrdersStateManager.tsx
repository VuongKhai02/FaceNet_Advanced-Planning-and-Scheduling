import React, { useEffect, useState } from "react";
import { collection, instance } from "@haulmont/jmix-react-core";
import DataGrid, { Column, Editing, Lookup, Scrolling, Toolbar, Item as TItem } from "devextreme-react/data-grid";
import { StageCode } from "../../jmix/entities/StageCode";
import { WorkOrderStage } from "../../jmix/entities/WorkOrderStage";
import { EmployeeGroup } from "../../jmix/entities/EmployeeGroup";
import { Employee } from "../../jmix/entities/Employee";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import UserAdminService from "../../utils/UserAdminService";
import "devextreme/data/odata/store";
import { v4 as uuidv4 } from "uuid";
import { QmsStageGroup } from "../../jmix/entities/QmsStageGroup";
import SelectBox from "devextreme-react/select-box";
import { QmsStageGroupMapping } from "../../jmix/entities/QmsStageGroupMapping";
import { values } from "mobx";

export const WorkOrderStateMamager = React.memo((props: any) => {
    let tmpArr: WorkOrderStage[] = [];
    let tmpArrData: any[] = [];
    const [data, setData] = useState(tmpArr);
    const [stageList, setStageList] = useState(tmpArr);
    const [defaultList, setDefaultList] = useState(tmpArr);
    const [dataLookup, setDataLookup] = useState(tmpArr);
    const [isDisable, setIsDisable] = useState(false);
    const [ssoUsers, setSsoUsers] = useState([]);
    const [isInsertNew, setIsInsertNew] = useState(true);
    const [stageGroupLst, setStageGroupLst] = useState(tmpArrData);
    const [grouping, setGrouping] = useState("");

    const rowData = props && props.row ? props.row : null;
    const stageCollection = collection<StageCode>(StageCode.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const workOrderStageDataInstance = instance<WorkOrderStage>(WorkOrderStage.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const stageGroupCollection = collection<QmsStageGroup>(QmsStageGroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const stageGroupMappingCollection = collection<QmsStageGroupMapping>(QmsStageGroupMapping.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const workOrderStageCollection = collection<WorkOrderStage>(WorkOrderStage.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });

    const processing = async () => {
        let listWorkOrderStage: WorkOrderStage[] = [];
        // console.log("use effect")
        setGrouping("");
        await stageCollection.load().then((res) => {
            if (stageCollection.items && stageCollection.items.length > 0) {
                // console.log("WorkOrderStateMamager: stage ")
                // console.log(stageCollection.items)
                stageCollection.items.map((item) => {
                    let workOrderStageItem = new WorkOrderStage();
                    // workOrderStageItem.id = i + "";
                    workOrderStageItem.stageName = item.stageName;
                    workOrderStageItem.stageCode = item.id;
                    workOrderStageItem.workOrder = "WO-";
                    workOrderStageItem.id = uuidv4();
                    listWorkOrderStage.push(workOrderStageItem);
                });
                console.log("listWorkOrderStage", listWorkOrderStage);
                setDataLookup(listWorkOrderStage);
            }
        });

        if (props.workOrderStage && props.workOrderStage.length > 0) {
            let listTmp: any[] = [];
            props.workOrderStage.map((item) => {
                listTmp.push(item);
            });
            setData(listTmp);
            setIsInsertNew(false);
            setStageList(listWorkOrderStage);
        } else {
            //nếu chưa khai báo lần nào thì hiển thị all công đoạn lên
            setData(listWorkOrderStage);
            setStageList(listWorkOrderStage);
            setIsInsertNew(true);
            setIsDisable(false);
        }

        await stageGroupCollection.load().then((res) => {
            if (stageGroupCollection.items) {
                let tmpArr: any[] = [];
                stageGroupCollection.items.map((item) => {
                    tmpArr.push({ groupId: item.id, groupName: item.groupName });
                });
                setStageGroupLst(tmpArr);
            }
        });
    };

    useEffect(() => {
        processing();
        // UserAdminService.groupList().then(res => console.log(res))
    }, [props]);

    useEffect(() => {
        processing();
        // UserAdminService.groupList().then(res => console.log(res))
    }, []);

    const setUserGroupValue = (rowData, value) => {
        // console.log("setUserGroupValue")
        // console.log(rowData)
        rowData.userName = null;
        rowData.employeeGroupCode = value;
        // @ts-ignore
        // defaultSetCellValue(rowData, value);
    };

    const closePopup = () => {
        props.closePopup();
    };

    const groupChanged = (e) => {
        // console.log(e)
        setGrouping(e.value);
        if (e.value) {
            stageGroupMappingCollection.filter = {
                conditions: [{ property: "groupId", operator: "=", value: e.value }],
            };
            stageGroupMappingCollection.load().then((res) => {
                let listTmp: any[] = [];
                let listDefault: any[] = [];
                stageGroupMappingCollection.items.map((item) => {
                    let workOrderStageItem = new WorkOrderStage();
                    // workOrderStageItem.id = i + "";
                    workOrderStageItem.stageName = item.stageName;
                    workOrderStageItem.stageCode = item.stageCode;
                    workOrderStageItem.employeeGroupCode = item.defaultGroup;
                    workOrderStageItem.userName = item.defaultUser;
                    workOrderStageItem.workOrder = "WO-";
                    workOrderStageItem.id = uuidv4();
                    if (workOrderStageItem.employeeGroupCode || workOrderStageItem.userName) {
                        listDefault.push(workOrderStageItem);
                    }
                    listTmp.push(workOrderStageItem);
                });
                setData(listTmp);
                setDefaultList(listDefault);
            });
        } else {
            // console.log(dataLookup)
            setData(dataLookup);
        }
    };

    // TODO bug planning xuất hiện ở đây
    const savingStage = (e) => {
        console.log("savingStage isInsertNew = " + isInsertNew);
        var toSaveItemList;
        console.log("e.changes");
        console.log(e.changes);
        if (isInsertNew) {
            toSaveItemList = data.map((item) => ({
                stageCode: item.stageCode,
                userName: item.userName,
                employeeGroupCode: item.employeeGroupCode,
            }));

            //remove id của item
            // toSaveItemList.forEach(item => item.id = undefined);
            //neu ko chinh sua gi -> luu het du lieu trong $data
            //neu co chinh sua -> check tiep
            if (e.changes && e.changes.length > 0) {
                e.changes.forEach((item) => {
                    //add item vao danh sach luu db
                    toSaveItemList.push(item.data);
                    if (item.type === "update") {
                        //set stageCode cho item
                        let key = item.key;
                        let tmpItem = data.filter((tmp) => tmp.id == key).pop();
                        if (tmpItem && tmpItem.stageCode) item.data.stageCode = tmpItem.stageCode;
                        //neu update cong doan, remove item trung voi stagecode trong $toSaveItemList
                        toSaveItemList = toSaveItemList.filter((tmp) => tmp.stageCode !== item.data.stageCode);
                        //add item vao danh sach luu db
                        if (item.data.employeeGroupCode) toSaveItemList.push(item.data);
                    } else {
                        //case add them dong
                        // let tmpItem = new WorkOrderStage()
                        // //remove id của item
                        // tmpItem.stageCode = item.data.stageCode
                        // tmpItem.userName = item.data.userName
                        // tmpItem.employeeGroupCode = item.data.employeeGroupCode
                        // //add item vao danh sach luu db
                        // toSaveItemList.push(tmpItem)
                    }
                });
            }
            //disable group selection
            setIsDisable(true);
        } else {
            //case update stage, chi luu item trong $changes
            toSaveItemList = [];
            if (e.changes && e.changes.length > 0) {
                e.changes.forEach((item) => {
                    //set stageCode cho item
                    let key = item.key;
                    let tmpItem = data.filter((tmp) => tmp.id == key).pop();
                    if (tmpItem && tmpItem.stageCode) item.data.stageCode = tmpItem.stageCode;
                    //set id cho item
                    item.data.id = key;
                    //add item vao danh sach luu db
                    toSaveItemList.push(item.data);
                });
            }
        }
        console.log("toSaveItemList");
        console.log(toSaveItemList);
        //thuc hien luu db
        if (toSaveItemList) {
            toSaveItemList.forEach((item) => {
                //bo sung thong tin woId cho item
                item.workOrder = rowData.woId;
                item.productCode = rowData.productCode;
                item.productName = rowData.productName;

                var p: Promise<any>;
                if (item.userName == null && item.employeeGroupCode == null && item.id) {
                    //delete work stage
                    p = workOrderStageCollection.delete(item);
                } else {
                    //update
                    workOrderStageDataInstance.item = item;
                    p = workOrderStageDataInstance.commit();
                }
                p.then((res) => {
                    setIsInsertNew(false);
                    notify(
                        {
                            message:
                                rowData.woId +
                                ": " +
                                (isInsertNew ? "Khai báo công đoạn thành công!" : "Cập nhật khai báo công đoạn thành công!"),
                            width: 450,
                        },
                        "SUCCESS",
                        3000,
                    );
                });
            });
        }
    };

    function onSaving(e) {
        // console.log("onSaving" + isInsertNew)
        let defaultListTmp: any[] = [];
        if (e.changes && e.changes.length > 0) {
            e.changes.forEach((item) => {
                // console.log(item)
                let updateData: WorkOrderStage = item.data;
                let key = item.data.stageCode;
                if (item) {
                    if (isInsertNew) {
                        stageList.map((row) => {
                            if (row.stageCode == key) {
                                updateData.stageCode = row.stageCode;
                                updateData.workOrder = rowData.woId;
                                updateData.productCode = rowData.productCode;
                                updateData.productName = rowData.productName;
                                workOrderStageDataInstance.item = updateData;
                                if (workOrderStageDataInstance.item && workOrderStageDataInstance.item.id)
                                    workOrderStageDataInstance.item.id = undefined;
                                //remove from listDefault if item exist
                                defaultListTmp.push(row.stageCode);

                                workOrderStageDataInstance.commit().then((res) => {
                                    notify(
                                        {
                                            message:
                                                rowData.woId +
                                                ": " +
                                                (isInsertNew
                                                    ? "Khai báo công đoạn thành công!"
                                                    : "Cập nhật khai báo công đoạn thành công!"),
                                            width: 450,
                                        },
                                        "SUCCESS",
                                        3000,
                                    );
                                });
                            }
                        });
                        //disable group selection
                        setIsDisable(true);
                        //save default list into db
                        saveDefaultList(rowData, defaultListTmp);
                    } else if (item.type === "insert") {
                        updateData.workOrder = rowData.woId;
                        updateData.productCode = rowData.productCode;
                        updateData.productName = rowData.productName;
                        workOrderStageDataInstance.item = updateData;
                        if (workOrderStageDataInstance.item && workOrderStageDataInstance.item.id)
                            workOrderStageDataInstance.item.id = undefined;
                        workOrderStageDataInstance.commit().then((res) => {
                            notify(
                                {
                                    message:
                                        rowData.woId +
                                        ": " +
                                        (isInsertNew ? "Khai báo công đoạn thành công!" : "Cập nhật khai báo công đoạn thành công!"),
                                    width: 450,
                                },
                                "SUCCESS",
                                3000,
                            );
                        });
                    } else {
                        let key = item.key;
                        data.map((row) => {
                            if (row.id === key) {
                                if (updateData.employeeGroupCode) row.employeeGroupCode = updateData.employeeGroupCode;
                                if (updateData.userName) row.userName = updateData.userName;
                                if (updateData.stageCode) row.stageCode = updateData.stageCode;
                                row.workOrder = rowData.woId;
                                row.productCode = rowData.productCode;
                                row.productName = rowData.productName;
                                workOrderStageDataInstance.item = row;
                                workOrderStageDataInstance.commit().then((res) => {
                                    notify(
                                        {
                                            message:
                                                rowData.woId +
                                                ": " +
                                                (isInsertNew
                                                    ? "Khai báo công đoạn thành công!"
                                                    : "Cập nhật khai báo công đoạn thành công!"),
                                            width: 450,
                                        },
                                        "SUCCESS",
                                        3000,
                                    );
                                });
                            }
                        });
                    }
                }
            });
        } else {
            //disable group selection
            setIsDisable(true);
            //save default list into db
            saveDefaultList(rowData, null).then((res) => {
                notify(
                    {
                        message:
                            rowData.woId +
                            ": " +
                            (isInsertNew ? "Khai báo công đoạn thành công!" : "Cập nhật khai báo công đoạn thành công!"),
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            });
        }
    }

    const saveDefaultList = async (rowData, updateList) => {
        if (defaultList.length > 0) {
            let updateData: WorkOrderStage;
            defaultList.forEach((item) => {
                if (updateList == null || (updateList != null && updateList.find((value) => value === item.stageCode) == null)) {
                    // console.log(updateList)
                    updateData = item;
                    updateData.workOrder = rowData.woId;
                    updateData.productCode = rowData.productCode;
                    updateData.productName = rowData.productName;
                    workOrderStageDataInstance.item = updateData;
                    // if (workOrderStageDataInstance.item && workOrderStageDataInstance.item.id)
                    // workOrderStageDataInstance.item.id = undefined
                    workOrderStageDataInstance.commit("create");
                }
            });
        }
    };

    const saveButtonOptions = {
        onContentReady: (e: any) => {
            if (isInsertNew) e.component.option("disabled", false);
        },
    };

    const getDisplayName = (item) => {
        return `${item.username} - ${item.firstName ? item.firstName : ""}  ${item.lastName ? item.lastName : ""}`;
    };

    return (
        <div style={{ height: "100%" }}>
            {data ? (
                <DataGrid
                    id='gridContainer'
                    dataSource={data}
                    keyExpr='id'
                    showBorders={true}
                    height={"650"}
                    onSaving={savingStage}
                    allowColumnResizing={true}
                    columnMinWidth={50}
                    rowAlternationEnabled={true}
                    wordWrapEnabled={true}>
                    <Toolbar>
                        {/*<TItem location={"before"}>*/}
                        {/*  <div className={"caption-wo-manager"}>Khai báo công đoạn</div>*/}
                        {/*</TItem>*/}
                        {isInsertNew ? (
                            <TItem location='after' widget='dxButton'>
                                <SelectBox
                                    width='225'
                                    showClearButton={true}
                                    items={stageGroupLst}
                                    displayExpr='groupName'
                                    valueExpr='groupId'
                                    className={"combobox-grouping"}
                                    value={grouping}
                                    onValueChanged={groupChanged}
                                    placeholder={"Chọn group..."}
                                    disabled={isDisable}
                                />
                            </TItem>
                        ) : null}
                        {isInsertNew ? <TItem name='addRowButton' /> : null}
                        <TItem name='saveButton' options={saveButtonOptions} />
                        <TItem name='revertButton' />
                    </Toolbar>
                    <Scrolling mode='infinite' />
                    <Editing mode='batch' allowUpdating={true} allowDeleting={false} allowAdding={true} useIcons={true} />
                    <Column
                        dataField={"stageCode"}
                        // width={300}
                        caption={"Tên công đoạn"}
                        allowEditing={true}
                        cssClass={"font-weight1"}>
                        <Lookup dataSource={dataLookup} displayExpr={"stageName"} valueExpr={"stageCode"}></Lookup>
                    </Column>
                    <Column dataField={"employeeGroupCode"} caption={"Chọn Nhóm User"} minWidth={100} setCellValue={setUserGroupValue}>
                        <Lookup dataSource={props.ssoGroups} displayExpr='name' valueExpr='name' allowClearing={true} />
                    </Column>
                    <Column dataField={"userName"} caption={"Chọn User"} minWidth={120}>
                        <Lookup dataSource={props.ssoUsers} displayExpr={getDisplayName} valueExpr='username' allowClearing={true} />
                    </Column>
                </DataGrid>
            ) : (
                ""
            )}
            {/*<div style={{height: '10%'}}>*/}
            {/*  <Button style={{marginTop: '10px', float: "right"}} text="Đóng lại" type="default" onClick={closePopup}/>*/}
            {/*</div>*/}
        </div>
    );
});
