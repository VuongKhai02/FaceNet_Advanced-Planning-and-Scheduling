import React, { useEffect, useState } from "react";
import DataGrid, { Column, Editing, Lookup, Scrolling, Toolbar, Item as TItem, Selection, SearchPanel } from "devextreme-react/data-grid";
import { collection, instance } from "@haulmont/jmix-react-core";
import { StageCode } from "../../jmix/entities/StageCode";
import { QmsStageGroupMapping } from "../../jmix/entities/QmsStageGroupMapping";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { WorkOrderManager } from "../work-order/WorkOrderManager";
import { QmsStageGroup } from "../../jmix/entities/QmsStageGroup";
import { Button } from "devextreme-react/button";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import { Button as ButtonAnt } from "antd";
import { locale, loadMessages } from "devextreme/localization";
import UserAdminService from "../../utils/UserAdminService";

export const QmsStageGroupMappingManager = (props) => {
    let arr: any[] = [];
    const [data, setData] = useState(arr);
    const [stageList, setStageList] = useState(arr);
    const [stageGroupLst, setStageGroupLst] = useState(arr);
    const [ssoGroups, setSsoGroup] = useState<any[]>([]);
    const [ssoUsers, setSsoUsers] = useState<any[]>([]);

    const dataInstance = instance<QmsStageGroupMapping>(QmsStageGroupMapping.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const dataCollection = collection<QmsStageGroupMapping>(QmsStageGroupMapping.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const stageCollection = collection<StageCode>(StageCode.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const stageGroupCollection = collection<QmsStageGroup>(QmsStageGroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    useEffect(() => {
        loadData();
    }, [props]);

    const showPopUp = () => {
        props.showInfo();
    };

    const loadData = () => {
        let tmpData: any[] = [];
        dataCollection.load().then((res) => {
            if (dataCollection.items) {
                dataCollection.items.map((item) => {
                    tmpData.push(item);
                });
                setData(tmpData);
            }
        });

        let tmpData2: any = [];
        stageCollection.load().then((res) => {
            stageCollection.items.map((item) => {
                tmpData2.push(item);
            });
            setStageList(tmpData2);
        });

        let tmpData3: any[] = [];
        stageGroupCollection.load().then((res) => {
            stageGroupCollection.items.map((item) => {
                tmpData3.push(item);
            });
            setStageGroupLst(tmpData3);
        });

        loadSsoUserAndGroup();
    };

    const onRefreshGrid = () => {
        loadData();
    };

    const onEdit = (data) => {
        let updateItem = data.newData;
        updateItem.id = data.key;
        dataInstance.setItem(updateItem);
        dataInstance.commit().then((res) =>
            notify(
                {
                    message: "Cập nhật thành công!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            ),
        );
    };

    const onDelete = (data) => {
        dataCollection.delete(data.data).then((res) =>
            notify(
                {
                    message: "Xóa thành công!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            ),
        );
    };

    const onInsert = (data) => {
        let newItem = data.data;
        dataInstance.setItem(newItem);
        dataInstance.commit().then((res) =>
            notify(
                {
                    message: "Thêm mới thành công!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            ),
        );
    };

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
        },
    });

    const getDisplayName = (item) => {
        return `${item.username} - ${item.firstName ? item.firstName : ""}  ${item.lastName ? item.lastName : ""}`;
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

    return (
        <DataGrid
            style={{ height: "90%" }}
            id='gridContainer'
            dataSource={data}
            keyExpr='id'
            showBorders={true}
            allowColumnResizing={true}
            columnMinWidth={50}
            showRowLines={true}
            onRowUpdating={onEdit}
            onRowRemoving={onDelete}
            onRowInserting={onInsert}
            noDataText='Không có dữ liệu để hiển thị'>
            <Toolbar>
                <TItem location='before' widget='dxButton'>
                    <ButtonAnt type='link' onClick={showPopUp}></ButtonAnt>
                </TItem>
                <TItem name='addRowButton' />
                <TItem name='searchPanel' location={"before"} />
                <TItem location='after' widget='dxButton'>
                    <Button icon={"refresh"} onClick={onRefreshGrid} />
                </TItem>
                <TItem name='columnChooserButton' />
            </Toolbar>
            <SearchPanel visible={true} width={240} placeholder='Tìm kiếm...' />
            <Selection mode='single' />
            <Column
                dataField={"groupId"}
                // width={300}
                caption={"Nhóm công đoạn"}
                allowEditing={true}
                groupIndex={0}>
                <Lookup dataSource={stageGroupLst} displayExpr='groupName' valueExpr='id' />
            </Column>
            <Column dataField={"stageCode"} width={600} caption={"Tên công đoạn"} allowEditing={true} alignment={"left"}>
                <Lookup dataSource={stageList} displayExpr='stageName' valueExpr='id' />
            </Column>
            <Column dataField={"defaultGroup"} caption={"Chọn Nhóm User"} minWidth={150}>
                <Lookup dataSource={ssoGroups} displayExpr='name' valueExpr='name' allowClearing={true} />
            </Column>
            <Column dataField={"defaultUser"} caption={"Chọn User"} minWidth={150}>
                <Lookup dataSource={ssoUsers} displayExpr={getDisplayName} valueExpr='username' allowClearing={true} />
            </Column>

            <Editing
                mode='form'
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true}
                texts={{
                    editRow: "Sửa",
                    saveRowChanges: "Lưu lại",
                    cancelRowChanges: "Hủy bỏ",
                    undeleteRow: "Khôi phục",
                    deleteRow: "Xóa",
                    saveAllChanges: "Lưu tất cả",
                    cancelAllChanges: "Hủy tất cả",
                    addRow: "Thêm ",
                    confirmDeleteTitle: "Xác nhận xóa bản ghi",
                    confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                }}>
                <Item dataField='groupId' />
                <Item dataField='stageCode' />
                <Item dataField='defaultGroup' />
                <Item dataField='defaultUser' />
            </Editing>
        </DataGrid>
    );
};
