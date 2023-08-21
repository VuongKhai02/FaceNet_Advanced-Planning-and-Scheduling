import React, { useRef, useEffect, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";

import { observer } from "mobx-react";
import DataGrid, {
    AsyncRule,
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    OperationDescriptions,
    Pager,
    Paging,
    PatternRule,
    Popup,
    RequiredRule,
    SearchPanel,
    StringLengthRule,
    Toolbar,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { print, str } from "../../../../utils/utils";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { Button } from "devextreme-react/button";
import { Popup as StandalonePopup } from "devextreme-react/popup";
import PartNumberImport from "../../../profile/PartNumberImport";
import { EquipmentType } from "../../../../jmix/entities/EquipmentType";
import { locale, loadMessages } from "devextreme/localization";
import { custom } from "devextreme/ui/dialog";

const ROUTING_PATH = "/equipmentType";

const EquipmentTypeManager = observer(() => {
    const equipmentTypeCollection = collection<EquipmentType>(EquipmentType.NAME, {
        view: "_base",
        sort: "-updatedAt",
        loadImmediately: false, // sort: 'order'
    });

    const equipmentTypeDataInstance = instance<EquipmentType>(EquipmentType.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const mainStore = useMainStore();

    const [equipmentTypeList, setEquipmentTypeList] = useState<EquipmentType[] | undefined>([]);
    const [mode, setMode] = useState<"row" | "popup">("row");
    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);

    const changeTextDefaultPopup = useRef<DataGrid>(null);
    const [searchByText, setSearchByText] = useState("");
    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };

    const setPopUpImportOpen = () => {
        setPopupImportIsOpen(true);
    };

    const loadEquipmentType = async () => {
        await equipmentTypeCollection.load().then((res) => {
            if (equipmentTypeCollection.items && equipmentTypeCollection.items.length > 0) {
                // alert(str(equipmentTypeCollection.items))
                setEquipmentTypeList(equipmentTypeCollection.items);
            }
        });
    };

    /**
     * Kiểm tra có Equipment Type nào không
     * @param name
     * @param value
     */
    const checkExistEquipmentType = async (name, value) => {
        let check = false;
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
            .post(PLANNING_API_URL + "/rest/entities/EquipmentType/search", data, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then(function (response) {
                // print(response.data);
                if (response.data.length > 0) check = true;
            })
            .catch(function (error) {
                console.log(error);
            });
        return check;
    };

    const checkIfExist = async (insertData) => {
        const checkExistName = await checkExistEquipmentType("name", insertData.name);
        if (checkExistName) {
            return {
                status: false,
                message: "Name đã tồn tại trong hệ thống",
            };
        }
        return {
            status: true,
            message: "Ok",
        };
    };

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
        },
    });

    const onInsertEquipmentType = async (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onInsertPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(data);
            // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;
            // @ts-ignore
            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                    return;
                } else {
                    equipmentTypeDataInstance.setItem(insertData);
                    await equipmentTypeDataInstance.commit().then((res) => {
                        alert(str(res));
                        insertData.id = res.id;
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        today.setHours(today.getHours() + 7);
                        insertData.createdAt = today.toISOString();
                        data.data = insertData;
                        toastSuccess("Thêm mới Equipment Type thành công");
                        refresh();
                        resolve(false);
                    });
                }
            });
            data.cancel = isCanceled;
        });
    };

    const onEditEquipmentType = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onEditPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let updateData = data.newData;
            updateData.id = data.key;
            await checkIfExist(updateData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    equipmentTypeDataInstance.setItem(updateData);
                    equipmentTypeDataInstance
                        .commit()
                        .then(() => {
                            toastSuccess("Sửa thành công");
                            resolve(false);
                        })
                        .catch(() => {
                            toastError("Sửa thất bại");
                            reject();
                        });
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onRemoveEquipmentType = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa Equipment Type?",
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
                        .delete(PLANNING_API_URL + "/rest/entities/EquipmentType/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function () {
                            toastSuccess("Xóa Equipment Type thành công");
                            resolve(false);
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

    const namePattern = "^[a-zA-Z0-9.]*$";

    const modePopUp = () => {
        setMode("popup");
    };

    const modeRow = () => {
        setMode("row");
    };

    const refresh = async () => {
        await loadEquipmentType();
        // toastSuccess("Tải thành công")
    };

    useEffect(() => {
        loadEquipmentType();
    }, []);

    useEffect(() => {}, [equipmentTypeList]);

    const popUpImportRender = () => {
        return <PartNumberImport />;
    };

    const maxLengthSearch = (e) => {
        if (e.parentType === "searchPanel" || e.parentType === "filterRow") {
            e.editorOptions.maxLength = 5;
        }
    };

    const asyncValidation = (params) => {
        return new Promise(function executor(resolve) {
            let createdAt = params.data["createdAt"];
            let updatedAt = params.data["updatedAt"];
            if (updatedAt < createdAt) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    };

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && (e.fullName === "searchPanel.text" || e.fullName.endsWith("filterValue"))) {
            const searchPanelText = e.value;
            setSearchByText(searchPanelText.trim());
        }
        // console.log("Day la Search Panel Text : ", searchByText)
    };

    const cellRender = (cellData) => {
        const search = searchByText.trim();
        if (search.length > 4) {
            toastError("Chỉ được nhập tối đa 256 ký tự");
        }
        const regExpText = "(".concat(
            search
                .replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&")
                .split(" ")
                .join(")|(")
                .concat(")"),
        );
        const regExp = new RegExp(regExpText, "ig");
        const matches = cellData.value.match(regExp) ? cellData.value.match(regExp).filter((ele: any) => ele !== undefined) : [];
        return (
            <div>
                {cellData.value
                    .split(regExp)
                    .filter((ele: any) => ele !== undefined && ele != null)
                    .map((ele: any, index: any) => {
                        if (ele === matches[0]) {
                            matches.shift();
                            return (
                                <span key={index} className='dx-datagrid-search-text'>
                                    {ele}
                                </span>
                            );
                        } else return ele;
                    })}
            </div>
        );
    };

    return (
        <div>
            <StandalonePopup
                visible={popupImportIsOpen ? popupImportIsOpen : false}
                onHiding={setPopUpImportClose}
                title='Import'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpImportRender}
                closeOnOutsideClick={true}></StandalonePopup>
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
                        Equipment Type
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
                    onRowInserting={onInsertEquipmentType}
                    onRowUpdating={onEditEquipmentType}
                    onRowRemoving={onRemoveEquipmentType}
                    dataSource={equipmentTypeList}
                    keyExpr='id'
                    onInitNewRow={modePopUp}
                    onEditCanceled={modeRow}
                    onSaved={modeRow}
                    onEditorPreparing={maxLengthSearch}
                    noDataText='Không có dữ liệu để hiển thị'
                    ref={changeTextDefaultPopup}
                    onOptionChanged={onOptionChangedSearchByText}>
                    <Toolbar>
                        <ToolbarItem location='after'>
                            <Button hint='Import' icon='import' onClick={setPopUpImportOpen} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <Button hint='Refresh' icon='refresh' onClick={refresh} />
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
                        placeholder='VD: FEEDER'
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
                            cancelRowChanges: "Hoàn tác",
                            saveRowChanges: "Lưu lại",
                            confirmDeleteMessage: "",
                            deleteRow: "Xóa",
                            editRow: "Sửa",
                            addRow: "Thêm Equipment Type",
                        }}
                        popup={{
                            title: "Thông tin Equipment Type",
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
                        <Popup title='Thông tin Equipment Type' showTitle={true} width={700} height={525} closeOnOutsideClick={true} />
                        {/*  /!*<Form>*!/*/}
                        {/*  /!*  <Item itemType="group" colCount={2} colSpan={2}>*!/*/}
                        {/*  /!*    <SimpleItem dataField="partNumberCode" isRequired>*!/*/}
                        {/*  /!*      <RequiredRule message="isRequired"/>*!/*/}
                        {/*  /!*    </SimpleItem>*!/*/}
                        {/*  /!*    <SimpleItem dataField="name" isRequired/>*!/*/}
                        {/*  /!*    <SimpleItem dataField="vendor" isRequired/>*!/*/}
                        {/*  /!*  </Item>*!/*/}
                        {/*  /!*</Form>*!/*/}
                    </Editing>
                    <Column type='buttons' caption={"Tùy chọn"} alignment={"center"}></Column>
                    <Column alignment='left' dataField='id' caption='Id' width={"50"} allowEditing={false} />
                    <Column dataField='name' cellRender={cellRender}>
                        <RequiredRule message='Tên không được để trống' />
                        <StringLengthRule message='Bạn chỉ được nhập tối đa 256 ký tự!' max={256} />
                        <PatternRule message={"Bạn không được nhập ký tự đặc biệt hoặc khoảng trắng!"} pattern={namePattern} />
                    </Column>
                    <Column dataField='createdAt' caption='Ngày tạo' dataType='datetime' format='dd/MM/yyyy hh:mm:ss' allowEditing={false}>
                        <RequiredRule message='Hãy chọn ngày tạo' />
                        <AsyncRule message={"Ngày sửa đổi phải lớn hơn hoặc bằng ngày tạo"} validationCallback={asyncValidation} />
                    </Column>
                    <Column
                        dataField='updatedAt'
                        caption='Sửa đổi gần nhất'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}>
                        <RequiredRule message='Hãy chọn ngày sửa đổi gần nhất' />
                        <AsyncRule message={"Ngày sửa đổi phải lớn hơn hoặc bằng ngày tạo"} validationCallback={asyncValidation} />
                    </Column>
                </DataGrid>
            </div>
        </div>
    );
});

export default EquipmentTypeManager;

registerScreen({
    component: EquipmentTypeManager,
    caption: "Quản lý Equipment Type",
    screenId: "screen.EquipmentTypeManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
