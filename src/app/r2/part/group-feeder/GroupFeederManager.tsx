import React, { useEffect, useMemo, useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    Form,
    HeaderFilter,
    Item as ToolbarItem,
    Lookup,
    OperationDescriptions,
    Pager,
    Paging,
    PatternRule,
    Popup,
    RequiredRule,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { print, str } from "../../../../utils/utils";
import { FeederGroup } from "../../../../jmix/entities/FeederGroup";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { Button } from "devextreme-react/button";
import { EquipmentType } from "../../../../jmix/entities/EquipmentType";
import { SelectBox } from "devextreme-react";
import { DropDownOptions } from "devextreme-react/lookup";
import { locale, loadMessages } from "devextreme/localization";
import { custom } from "devextreme/ui/dialog";
import { FeederGroupEnum } from "../../../../jmix/enums/enums";

const ROUTING_PATH = "/groupFeederManager";

const GroupFeederManager = () => {
    const feederGroupDataCollectionStore = collection<FeederGroup>(FeederGroup.NAME, {
        view: "feeder-group-with-equipment-type",
        sort: "-updatedAt",
        loadImmediately: false,
        // sort: 'order'
    });

    const equipmentTypeDataCollectionStore = collection<EquipmentType>(EquipmentType.NAME, {
        view: "_base",
        sort: "-updatedAt",
        loadImmediately: false, // sort: 'order'
    });

    const feederGroupDataInstanceStore = instance<FeederGroup>(FeederGroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const mainStore = useMainStore();
    const typeList = useMemo(() => {
        return Object.keys(FeederGroupEnum).filter((item) => {
            return isNaN(Number(item));
        });
    }, []);

    const [feederGroupList, setFeederGroupList] = useState<FeederGroup[] | undefined>(undefined);
    const [equipmentTypeList, setEquipmentTypeList] = useState<EquipmentType[] | undefined>([]);
    const [mode, setMode] = useState<"row" | "popup">("row");
    const changeTextDefaultPopup = useRef<DataGrid>(null);
    const [searchByText, setSearchByText] = useState("");
    const loadEquipmentType = async () => {
        await equipmentTypeDataCollectionStore.load().then((res) => {
            if (equipmentTypeDataCollectionStore.items && equipmentTypeDataCollectionStore.items.length > 0) {
                // alert(str(equipmentTypeCollection.items))
                setEquipmentTypeList(equipmentTypeDataCollectionStore.items);
            }
        });
    };

    const loadFeederGroup = async () => {
        await feederGroupDataCollectionStore.load().then((res) => {
            if (feederGroupDataCollectionStore.items && feederGroupDataCollectionStore.items.length > 0) {
                setFeederGroupList(feederGroupDataCollectionStore.items);
            }
        });
    };

    /**
     * Kiểm tra có part number nào không
     * @param name
     * @param value
     */
    const checkExistGroupFeeder = async (name, value) => {
        let check = null;
        const data = {
            filter: {
                conditions: [
                    {
                        property: name,
                        operator: "=",
                        value: value,
                    },
                ],
            },
        };

        await axios
            .post(PLANNING_API_URL + "/rest/entities/FeederGroup/search", data, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then(function (response) {
                // alert(response.data)
                if (response.data.length > 0) check = response.data[0];
            })
            .catch(function (error) {
                console.log(error);
            });
        return check;
    };

    const onInsertFeederGroup = async (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onInsertPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(data);
            // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;
            // print(str(insertData));
            const checkExistName = await checkExistGroupFeeder("name", insertData.name);

            if (checkExistName) {
                toastError("Name đã tồn tại trong hệ thống");
                reject("Name đã tồn tại trong hệ thống");
                return;
            }
            feederGroupDataInstanceStore.setItem(insertData);
            await feederGroupDataInstanceStore.commit().then((res) => {
                // print(str(res));

                const timeElapsed = Date.now();
                insertData.id = res.id;
                const today = new Date(timeElapsed);
                today.setHours(today.getHours() + 7);
                insertData.createdAt = today.toISOString();
                data.data = insertData;
                toastSuccess("Thêm mới Feeder Group thành công");
                refresh();
                resolve(false);
            });
        });
        data.cancel = isCanceled;
    };

    const onEditPartNumber = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onEditPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let updateData = data.newData;
            updateData.id = data.key;
            console.log("update data", updateData);
            const checkName = await checkExistGroupFeeder("name", updateData.name);
            if (checkName) {
                toastError("Name đã tồn tại trong hệ thống");
                reject("Name đã tồn tại trong hệ thống");
                return;
            }
            feederGroupDataInstanceStore.setItem(updateData);
            feederGroupDataInstanceStore
                .commit()
                .then((res) => {
                    toastSuccess("Sửa thành công");
                    refresh();
                    resolve(false);
                })
                .catch(() => {
                    toastError("Sửa thất bại");
                    reject();
                });
        });
        data.cancel = isCanceled;
    };

    const onRemoveEquipmentGroup = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa GroupFeeder?",
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
                dragEnabled: false,
            });
            let isConfirmDelete = false;
            promptPromise.show().then((dialogResult) => {
                isConfirmDelete = dialogResult;
                if (isConfirmDelete) {
                    // print(`onRemovePartNumber`);
                    // print(`Dữ liệu thô ${ROUTING_PATH}: `);
                    // print(data);

                    // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                    const deleteDataId = data.data.id;
                    axios
                        .delete(PLANNING_API_URL + "/rest/entities/FeederGroup/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function () {
                            resolve(false);
                            toastSuccess("Xóa groupFeeder thành công");
                        })
                        .catch(function () {
                            reject("Có lỗi xảy ra");
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const refresh = async () => {
        await loadFeederGroup();
        // toastSuccess("Tải thành công")
    };

    const namePattern = "^[a-zA-Z0-9.]*$";

    const modePopUp = () => {
        setMode("popup");
    };

    const modeRow = () => {
        setMode("row");
    };

    useEffect(() => {
        loadFeederGroup();
    }, []);

    useEffect(() => {
        loadEquipmentType();
    }, []);

    locale("en");
    loadMessages({
        en: {
            Select: "-- Lựa chọn --",
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
        },
    });

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };

    const renderEquipmentTypeCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const lookupEquipmentTypeCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = equipmentTypeList?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <>
                {equipmentTypeList && equipmentTypeList.length ? (
                    <div>
                        <SelectBox
                            dataSource={equipmentTypeList}
                            searchEnabled={true}
                            searchMode={"contains"}
                            searchExpr={"name"}
                            acceptCustomValue={true}
                            defaultValue={data.value}
                            displayExpr='name'
                            valueExpr='id'
                            onValueChanged={setEditedValue}
                            placeholder='-- Lựa chọn --'>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} />
                        </SelectBox>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    return (
        <div id='data-grid-demo'>
            {feederGroupList ? (
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
                            Equipment Group
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
                        showColumnLines={true}
                        showRowLines={true}
                        rowAlternationEnabled={true}
                        columnAutoWidth={true}
                        repaintChangesOnly={true}
                        showBorders={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        focusedRowEnabled={true}
                        onRowInserting={onInsertFeederGroup}
                        onRowUpdating={onEditPartNumber}
                        onRowRemoving={onRemoveEquipmentGroup}
                        dataSource={feederGroupList}
                        keyExpr='id'
                        onInitNewRow={modePopUp}
                        onEditCanceled={modeRow}
                        onSaved={modeRow}
                        noDataText='Không có dữ liệu để hiển thị'
                        ref={changeTextDefaultPopup}
                        onOptionChanged={onOptionChangedSearchByText}>
                        <Toolbar>
                            <ToolbarItem location='after'>
                                <Button onClick={refresh} icon='refresh' hint='Refresh' />
                            </ToolbarItem>
                            <ToolbarItem name='addRowButton' />
                            <ToolbarItem name='revertButton' />
                            <ToolbarItem name='saveButton' />
                            <ToolbarItem name='searchPanel' location='before' />
                            <ToolbarItem name='columnChooserButton'></ToolbarItem>
                        </Toolbar>

                        <ColumnChooser enabled={true} />
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
                        <SearchPanel
                            visible={true}
                            placeholder='VD: DOUBLE'
                            highlightSearchText={true}
                            text={searchByText}
                            highlightCaseSensitive={true}
                        />
                        <Paging enabled={true} defaultPageSize={30} />
                        <Pager
                            visible={true}
                            displayMode={"full"}
                            showInfo={true}
                            showNavigationButtons={true}
                            allowedPageSizes={[5, 30]}
                            infoText='Trang số {0} trên {1} ({2} bản ghi)'
                        />
                        <Editing
                            mode={mode}
                            allowUpdating={true}
                            allowAdding={true}
                            allowDeleting={true}
                            useIcons={true}
                            texts={{
                                confirmDeleteMessage: "",
                                cancelRowChanges: "Hoàn tác",
                                saveRowChanges: "Lưu lại",
                                deleteRow: "Xóa",
                                editRow: "Sửa",
                                addRow: "Thêm Equipment Group",
                            }}
                            popup={{
                                title: "Thông tin Group Feeder",
                                showTitle: true,
                                width: 700,
                                height: 525,
                                position: {
                                    my: "top",
                                    at: "top",
                                    of: window,
                                },
                                toolbarItems: [
                                    {
                                        toolbar: "bottom",
                                        location: "after",
                                        widget: "dxButton",
                                        options: {
                                            onClick: function (e) {
                                                changeTextDefaultPopup.current?.instance.cancelEditData();
                                            },
                                            text: "Hủy bỏ",
                                        },
                                    },
                                    {
                                        toolbar: "bottom",
                                        location: "after",
                                        widget: "dxButton",
                                        options: {
                                            onClick: function (e) {
                                                changeTextDefaultPopup.current?.instance.saveEditData();
                                            },
                                            text: "Lưu lại",
                                        },
                                    },
                                ],
                            }}>
                            <Popup title='Thông tin Group Feeder' showTitle={true} width={700} height={525} closeOnOutsideClick={true} />
                            <Form>
                                <Item itemType='group' colCount={2} colSpan={2}>
                                    <Item dataField='name' />
                                    <Item dataField='feederGroupCode' />
                                    <Item dataField='type' />
                                </Item>
                            </Form>
                        </Editing>
                        <Column type='buttons' caption={"Tùy chọn"} alignment={"center"}></Column>
                        <Column alignment='left' dataField='id' caption='Id' allowEditing={false} />
                        {/*<Column dataField="feederGroupCode" caption={"Equipment Group"}/>*/}
                        <Column dataField='name' caption='Name'>
                            <RequiredRule message='Tên không được để trống' />
                            <PatternRule message='Bạn không được nhập ký tự đặc biệt hoặc khoảng trắng!' pattern={namePattern} />
                        </Column>
                        <Column dataField='type' caption='Type'>
                            <RequiredRule message='Hãy chọn trường' />
                            <Lookup dataSource={typeList} />
                        </Column>
                        <Column
                            caption={"Equipment Type"}
                            dataField='equipmentType.name'
                            // cellRender={renderEquipmentTypeCell}
                            editCellRender={lookupEquipmentTypeCellRender}
                        />

                        <Column
                            dataField='createdAt'
                            caption='Ngày tạo'
                            allowEditing={false}
                            dataType={"datetime"}
                            format='dd/MM/yyyy hh:mm:ss'>
                            <RequiredRule message='Hãy chọn ngày tạo' />
                        </Column>
                        <Column
                            dataField='updatedAt'
                            caption='Sửa đổi gần nhất'
                            dataType='datetime'
                            format='dd/MM/yyyy hh:mm:ss'
                            allowEditing={false}
                        />
                    </DataGrid>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default GroupFeederManager;

registerScreen({
    component: GroupFeederManager,
    caption: "Quản lý Equipment Group",
    screenId: "screen.GroupFeederManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
