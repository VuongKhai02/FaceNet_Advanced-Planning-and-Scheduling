import React, { useEffect, useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { loadMessages, locale } from "devextreme/localization";
import DataGrid, { Column, Editing, Form, Item as ToolbarItem, Popup, RequiredRule, Toolbar } from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { instance, useMainStore } from "@haulmont/jmix-react-core";
import { print, str } from "../../../../utils/utils";
import { Feeder } from "../../../../jmix/entities/Feeder";
import axios from "axios";
import { Item } from "devextreme-react/form";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { QrFeeder } from "../../../../jmix/entities/QrFeeder";
import { DropDownOptions, Lookup } from "devextreme-react/lookup";
import { Button } from "devextreme-react/button";
import { custom } from "devextreme/ui/dialog";
import { FeederGroupEnum } from "../../../../jmix/enums/enums";
import { RowInsertingEvent } from "devextreme/ui/data_grid";

const ROUTING_PATH = "/qrFeederManager";

type QrFeederManagerProps = {
    searchKeyword?: string;
    feeder?: Feeder;
    refresh?: any;
};

const QrFeederManager: React.FC<QrFeederManagerProps> = ({ searchKeyword, feeder, refresh }) => {
    const qrFeederDataInstanceStore = instance<QrFeeder>(QrFeeder.NAME, {
        view: "with-feeder",
        loadImmediately: false,
    });

    const mainStore = useMainStore();
    // @ts-ignore
    const [qrFeederList, setQrFeederList] = useState<QrFeeder[] | null>(feeder?.qrFeeders);
    const [feederList, setFeederList] = useState<Feeder[] | undefined>(undefined);
    const [mode, setMode] = useState<"row" | "popup">("row");
    const changeTextDefaultPopup = useRef<DataGrid>(null);

    const [searchByText, setSearchByText] = useState("");

    const checkIfExist = async (insertData) => {
        const checkExistQrFeeder = await checkExistQrFeederFunction("qrFeederCode", insertData.qrFeederCode);
        if (checkExistQrFeeder) {
            return {
                status: false,
                message: "Qr Code đã tồn tại trong hệ thống",
            };
        }
        return {
            status: true,
            message: "Ok",
        };
    };

    /**
     * Kiểm tra có part number nào không
     * @param name
     * @param value
     */
    const checkExistQrFeederFunction = async (name, value) => {
        let check = false;
        const data = {
            filter: {
                conditions: [
                    {
                        property: name,
                        operator: "=",
                        value: value,
                    },
                    {
                        property: "deletedAt",
                        operator: "isNull",
                    },
                ],
            },
        };

        await axios
            .post(PLANNING_API_URL + "/rest/entities/QrFeeder/search", data, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then(function (response) {
                print(response.data);
                if (response.data.length > 0) check = true;
            })
            .catch(function (error) {
                console.log(error);
            });
        return check;
    };

    const onInsertQrFeeder = async (data: RowInsertingEvent<QrFeeder, number>) => {
        const isCanceled: PromiseLike<void> = new Promise(async (resolve, reject) => {
            // print(`onInsertQrFeeder`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(data);
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;
            const feederId = searchKeyword ? searchKeyword : insertData?.feeder?.id;
            insertData.feeder = { id: feederId };
            insertData.equipmentCode = feeder?.feederCode;
            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    qrFeederDataInstanceStore.setItem(insertData);
                    qrFeederDataInstanceStore.commit().then((res) => {
                        print(res);
                        insertData.id = res.id;
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        today.setHours(today.getHours() + 7);
                        insertData.createdAt = today.toISOString();
                        insertData.updatedAt = today.toISOString();
                        data.data = insertData;
                        toastSuccess("Thêm thành công");
                        refreshFeeder();
                        resolve();
                    });
                }
            });
            data.cancel = isCanceled;
        });
    };

    const onEditQrFeeder = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onEditQrFeeder`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let updateData = data.newData;
            updateData.id = data.key;
            // print(str(updateData));
            qrFeederDataInstanceStore.setItem(updateData);
            qrFeederDataInstanceStore
                .commit()
                .then(() => {
                    toastSuccess("Sửa thành công");
                    resolve(false);
                    refreshFeeder();
                })
                .catch(() => {
                    toastError("Sửa thất bại");
                    reject();
                });
            resolve(false);
        });
        data.cancel = isCanceled;
    };

    const onRemoveQrFeeder = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa QrFeeder?",
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
            let isConfirmDelete = false;
            promptPromise.show().then((dialogResult) => {
                isConfirmDelete = dialogResult;
                if (isConfirmDelete) {
                    // print(`onRemoveQrFeeder`);
                    // print(`Dữ liệu thô ${ROUTING_PATH}: `);
                    // print(data);
                    // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                    const deleteDataId = data.data.id;
                    axios
                        .delete(PLANNING_API_URL + "/rest/entities/QrFeeder/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function () {
                            // refreshFeeder();
                            resolve(false);
                            toastSuccess("Xóa QrFeeder thành công");
                        })
                        .catch(function () {
                            reject("Có lỗi xảy ra");
                            toastError("Xóa QrFeeder thất bại");
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const lookupFeederCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = feederList?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <>
                {feederList && feederList.length ? (
                    <div>
                        <Lookup
                            dataSource={feederList}
                            displayExpr='serial'
                            defaultValue={data.data.id}
                            valueExpr='id'
                            onValueChanged={setEditedValue}
                            placeholder='-- Lựa chọn --'>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const renderGridCell = (data) => {
        // alert(str(data.value))
        return <div>{data.value?.serial}</div>;
    };

    const modePopUp = () => {
        setMode("popup");
    };

    const modeRow = () => {
        setMode("row");
    };

    const refreshFeeder = async () => {
        refresh();
        // toastSuccess("Tải thành công")
    };

    const onAllowAdding = (): boolean => {
        const feederTypeNumber = feeder?.feederGroup?.type && Number(FeederGroupEnum[feeder?.feederGroup?.type]);
        if (feederTypeNumber) {
            return (qrFeederList?.length ? qrFeederList.length : 0) < feederTypeNumber;
        }
        return false;
    };

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };

    locale("en");
    loadMessages({
        en: {
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            Search: "Tìm kiếm",
        },
    });

    return (
        <div id='data-grid-demo' style={{ width: "72vw" }}>
            <div>
                <div
                    className='informer'
                    style={{
                        background: "#fff",
                        textAlign: "left",
                        paddingTop: 12,
                    }}>
                    <h5
                        className='name'
                        style={{
                            fontSize: 18,
                            marginBottom: 0,
                        }}>
                        {feeder?.serial} - {feeder?.feederGroup?.type}
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
                    onRowInserting={onInsertQrFeeder}
                    onRowUpdating={onEditQrFeeder}
                    onRowRemoving={onRemoveQrFeeder}
                    dataSource={qrFeederList ? qrFeederList : []}
                    onInitNewRow={modePopUp}
                    onEditCanceled={modeRow}
                    onSaved={modeRow}
                    ref={changeTextDefaultPopup}
                    onOptionChanged={onOptionChangedSearchByText}
                    keyExpr='id'
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Toolbar>
                        <ToolbarItem location='after'>
                            <Button hint='Refresh' onClick={refresh} icon='refresh' />
                        </ToolbarItem>
                        <ToolbarItem name='addRowButton' />
                        <ToolbarItem name='revertButton' />
                        <ToolbarItem name='saveButton' />
                        <ToolbarItem name='columnChooserButton'></ToolbarItem>
                    </Toolbar>
                    <Editing
                        mode={mode}
                        allowUpdating={true}
                        allowAdding={onAllowAdding()}
                        allowDeleting={true}
                        useIcons={true}
                        texts={{
                            confirmDeleteMessage: "",
                            cancelRowChanges: "Hoàn tác",
                            saveRowChanges: "Lưu lại",
                            deleteRow: "Xóa",
                            editRow: "Sửa",
                            addRow: "Thêm Qr Feeder",
                        }}
                        popup={{
                            title: "Thông tin Qr Feeder",
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
                        <Popup title='Thông tin Qr Feeder' showTitle={true} width={700} height={525} />
                        <Form>
                            {/*<Item itemType="group" colCount={2} colSpan={2}>*/}

                            <Item dataField='qrFeederCode' />
                            <Item dataField='note' />
                            {/*<Item dataField="name">*/}
                            {/*  <RequiredRule message={"Không được để trống"}/>*/}
                            {/*  <StringLengthRule message={"Nhập quá ký tự cho phép"} max={256}/>*/}
                            {/*</Item>*/}
                            <Item dataField='feeder' visible={!searchKeyword} />
                            {/*</Item>*/}
                        </Form>
                    </Editing>
                    <Column type='buttons' caption={"Tùy chọn"} alignment={"center"}></Column>
                    {/*<Column*/}
                    {/*  dataField="id"*/}
                    {/*  caption="Id"*/}
                    {/*  width={"100"}*/}
                    {/*  allowEditing={false}*/}
                    {/*  alignment="left"*/}
                    {/*/>*/}
                    <Column dataField='equipmentCode' caption='Equipment Code' allowEditing={false} />
                    <Column dataField='qrFeederCode'>
                        <RequiredRule message='Không được để trống' />
                    </Column>

                    <Column dataField='note' alignment={"left"}></Column>
                    <Column
                        dataField='createdAt'
                        caption='Ngày tạo'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column
                        dataField='updatedAt'
                        caption='Sửa đổi gần nhất'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                </DataGrid>
            </div>
        </div>
    );
};

export default QrFeederManager;

registerScreen({
    component: QrFeederManager,
    caption: "Quản lý QrFeeder",
    screenId: "screen.QrFeederManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
