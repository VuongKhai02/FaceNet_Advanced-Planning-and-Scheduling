import React, { useEffect, useState } from "react";
import DataGrid, { Column, Editing, Lookup, Scrolling, Toolbar, Item as TItem, Selection, SearchPanel } from "devextreme-react/data-grid";
import { collection, instance } from "@haulmont/jmix-react-core";
import { QmsStageGroup } from "../../jmix/entities/QmsStageGroup";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import { QmsStageGroupMapping } from "../../jmix/entities/QmsStageGroupMapping";
import { Item } from "devextreme-react/form";

export const QmsStageGroupManager = (props) => {
    const [data, setData] = useState<any[]>([]);

    const stageGroupCollection = collection<QmsStageGroup>(QmsStageGroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const dataInstance = instance<QmsStageGroup>(QmsStageGroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const loadData = () => {
        let tmpData: any[] = [];
        stageGroupCollection.load().then((res) => {
            stageGroupCollection.items.map((item) => {
                tmpData.push(item);
            });
            setData(tmpData);
        });
    };

    const onRefreshGrid = () => {
        loadData();
    };

    useEffect(() => {
        loadData();
    }, [props]);

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
        stageGroupCollection.delete(data.data).then((res) =>
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

    return (
        <DataGrid
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
            width={"100%"}
            height={"100%"}>
            <Toolbar>
                <TItem name='addRowButton' location={"after"} />
                <TItem location='after' widget='dxButton'>
                    <Button icon={"refresh"} onClick={onRefreshGrid} />
                </TItem>
                <TItem name='columnChooserButton' />
            </Toolbar>
            <Column dataField={"groupName"} caption={"Nhóm công đoạn"} allowEditing={true}></Column>
            <Editing mode='row' allowAdding={true} allowUpdating={true} allowDeleting={true} useIcons={true}>
                <Item dataField='groupName' />
            </Editing>
        </DataGrid>
    );
};
