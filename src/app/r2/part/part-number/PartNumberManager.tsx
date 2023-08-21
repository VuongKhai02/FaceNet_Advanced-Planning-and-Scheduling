import React, { useEffect, useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { loadMessages, locale } from "devextreme/localization";
import { observer } from "mobx-react";

import "./index.css";
import DataGrid, {
    Button,
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    Form,
    HeaderFilter,
    Item as ToolbarItem,
    OperationDescriptions,
    Pager,
    Paging,
    Popup,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Item, SimpleItem } from "devextreme-react/form";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { PartNumber } from "../../../../jmix/entities/PartNumber";
import { onStatusRender, print, str } from "../../../../utils/utils";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { Autocomplete } from "devextreme-react";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { Button as StandaloneButton } from "devextreme-react/button";
import { Popup as StandalonePopup } from "devextreme-react/popup";
import PartNumberImport from "../../../profile/PartNumberImport";
import { LoadPanel } from "devextreme-react/load-panel";
import { custom } from "devextreme/ui/dialog";

const ROUTING_PATH = "/partNumberManager";

const PartNumberManager = observer(() => {
    const partNumberCollection = collection<PartNumber>(PartNumber.NAME, {
        view: "_base",
        sort: "-updatedAt",
        loadImmediately: false,
    });
    const partNumberDataInstance = instance<PartNumber>(PartNumber.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const mainStore = useMainStore();

    const [partNumberList, setPartNumberList] = useState<PartNumber[] | undefined>([]);
    const [vendorList, setVendorList] = useState<string[] | undefined>(undefined);
    const [partNumberCodeList, setPartNumberCodeList] = useState<string[] | undefined>(undefined);
    const [mode, setMode] = useState<"row" | "popup" | "batch">("row");
    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
    const changeTextDefaultPopup = useRef<DataGrid>(null);

    const [searchByText, setSearchByText] = useState("");

    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };

    const setPopUpImportOpen = () => {
        setPopupImportIsOpen(true);
    };

    const loadPartNumber = async () => {
        await partNumberCollection.load().then((res) => {
            if (partNumberCollection.items && partNumberCollection.items.length > 0) {
                setPartNumberList(partNumberCollection.items);
            }
        });
    };

    /**
     * Kiểm tra có part number nào không
     * @param name
     * @param value
     */
    const checkExistPartNumber = async (name, value) => {
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
            .post(PLANNING_API_URL + "/rest/entities/PartNumber/search", data, {
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
        const checkExistPartNumberCode = await checkExistPartNumber("partNumberCode", insertData.partNumberCode);
        const checkExistName = await checkExistPartNumber("name", insertData.name);
        const checkExistVendor = await checkExistPartNumber("vendor", insertData.vendor);
        if (checkExistPartNumberCode) {
            return {
                status: false,
                message: "Part Number Code đã tồn tại trong hệ thống",
            };
        }
        if (checkExistVendor) {
            return {
                status: false,
                message: "Vendor Code đã tồn tại trong hệ thống",
            };
        }
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

    const onInsertPartNumber = async (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onInsertPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(data);
            // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;
            insertData.type = 0;
            // @ts-ignore
            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    partNumberDataInstance.setItem(insertData);
                    await partNumberDataInstance.commit().then((res) => {
                        insertData.id = res.id;
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        today.setHours(today.getHours() + 7);
                        insertData.createdAt = today.toISOString();
                        data.data = insertData;
                        toastSuccess("Thêm mới Part Number thành công");
                        refresh();
                        resolve(false);
                    });
                }
            });
            data.cancel = isCanceled;
        });
    };

    const onEditPartNumber = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onEditPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);

            if (data.oldData.type === 1) {
                toastError(" Không được sửa part của Panacimmic");
                return;
            }

            let updateData = data.newData;
            updateData.id = data.key;
            await checkIfExist(updateData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    partNumberDataInstance.setItem(updateData);
                    partNumberDataInstance
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
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onRemovePartNumber = (data) => {
        if (data.data.type === 1) {
            toastError(" Không được xóa part của Panacimmic");
            return;
        }

        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa PartNumber?",
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
                    // data.data.productOrder = this.props.data.data.productOrderId;
                    // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                    const deleteDataId = data.data.id;
                    axios
                        .delete(PLANNING_API_URL + "/rest/entities/PartNumber/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function () {
                            toastSuccess("Xóa partNumber thành công");
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

    const modeRow = () => {
        setMode("row");
    };
    const modePopUp = () => {
        setMode("popup");
    };

    // const namePattern = '^[a-zA-Z0-9.]*$';

    const autoCompleteVendorCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
        };
        return (
            <>
                {vendorList && vendorList.length ? (
                    <div>
                        <Autocomplete
                            dataSource={vendorList}
                            // value={value}
                            defaultValue={data.data.vendor}
                            onValueChanged={setEditedValue}></Autocomplete>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const autoCompletePartNumberCodeCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
        };
        return (
            <>
                {partNumberCodeList && partNumberCodeList.length ? (
                    <div>
                        <Autocomplete
                            dataSource={partNumberCodeList}
                            // value={value}
                            defaultValue={data.data.partNumberCode}
                            onValueChanged={setEditedValue}
                        />
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const refresh = async () => {
        await loadPartNumber();
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    const generateListVendor = () => {
        if (partNumberList && partNumberList.length) {
            let tempListVendor: string[] = [];
            for (let i = 0; i < partNumberList.length; i++) {
                const tempVendor = partNumberList[i]?.vendor?.toString() || "";
                tempListVendor.push(tempVendor);
            }
            setVendorList(tempListVendor);
        }
    };

    const generateListPartNumberCode = () => {
        if (partNumberList && partNumberList.length) {
            let tempListPartNumberCode: string[] = [];
            for (let i = 0; i < partNumberList.length; i++) {
                const tempPartNumberCode = partNumberList[i]?.partNumberCode?.toString() || "";
                tempListPartNumberCode.push(tempPartNumberCode);
            }
            setPartNumberCodeList(tempListPartNumberCode);
        }
    };

    useEffect(() => {
        loadPartNumber();
    }, []);

    useEffect(() => {
        generateListVendor();
    }, [partNumberList]);

    useEffect(() => {
        generateListPartNumberCode();
    }, [partNumberList]);

    const popUpImportRender = () => {
        return <PartNumberImport />;
    };

    const syncPanaCimmc = () => {
        setLoadPanelVisible(true);
        axios
            .get(PLANNING_API_URL + "/services/api/partNumber/syncPanaCIMMC", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then(function (response) {
                toastSuccess("Đồng bộ thành công");
                setLoadPanelVisible(false);
            })
            .catch(function (err) {
                toastError(err.response?.data?.message);
                setLoadPanelVisible(false);
            });
    };

    const syncSap = () => {
        setLoadPanelVisible(true);
        axios
            .get(PLANNING_API_URL + "/services/api/partNumber/syncPartSap", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then(function (response) {
                toastSuccess("Đồng bộ thành công");
                setLoadPanelVisible(false);
            })
            .catch(function (err) {
                toastError(err.response?.data?.message);
                setLoadPanelVisible(false);
            });
    };

    const onSelectionChanged = () => {};

    const onVisibleEdit = (data) => {
        print(str(data.row.data));
        console.log("type type data", data.row.data.name);
        return data.row.data.type === 0 || data.row.data.type === null || data.row.data.type === undefined;
    };

    const onVisibleDelete = (data) => {
        print(str(data.row.data));
        return (
            data.row.data.name === undefined ||
            data.row.data.name === null ||
            data.row.data.name === "" ||
            data.row.data.type === 0 ||
            data.row.data.type === null ||
            data.row.data.type === undefined
        );
    };

    const typeCellRender = (data) => {
        if (data?.value === 1) return "Panacim";
        else if (data?.value === 2) return "SAP";
        else if (data?.value === 3) return "Panacim, SAP";
        return "R2";
    };

    locale("en");
    loadMessages({
        en: {
            Yes: "Đồng ý",
            No: "Hủy bỏ",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
        },
    });

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
                        Part Number
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
                    ref={changeTextDefaultPopup}
                    showColumnLines={true}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    repaintChangesOnly={true}
                    showBorders={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    focusedRowEnabled={true}
                    onRowInserting={onInsertPartNumber}
                    onRowUpdating={onEditPartNumber}
                    onRowRemoving={onRemovePartNumber}
                    onSelectionChanged={onSelectionChanged}
                    dataSource={partNumberList}
                    keyExpr='id'
                    onEditCanceled={modeRow}
                    onSaved={modeRow}
                    onInitNewRow={modePopUp}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Toolbar>
                        <ToolbarItem location='after'>
                            <StandaloneButton icon='pulldown' hint='Đồng bộ Part Panacim' onClick={syncPanaCimmc} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <StandaloneButton icon='pulldown' hint='Đồng bộ Part Sap' onClick={syncSap} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <StandaloneButton icon='import' hint='Import' onClick={setPopUpImportOpen} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <StandaloneButton icon='refresh' hint='Refresh' onClick={refresh} />
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
                        placeholder='VD: STW '
                        highlightSearchText={true}
                        text={searchByText}
                        highlightCaseSensitive={true}></SearchPanel>
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
                        allowDeleting={true}
                        allowAdding={true}
                        useIcons={true}
                        texts={{
                            cancelRowChanges: "Hoàn tác",
                            saveRowChanges: "Lưu lại",
                            deleteRow: "Xóa",
                            editRow: "Sửa",
                            addRow: "Thêm Part Number",
                            confirmDeleteMessage: "",
                        }}
                        popup={{
                            title: "Thông tin Part Number",
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
                        <Popup title='Thông tin Part Number' showTitle={true} width={700} height={525} closeOnOutsideClick={true} />
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2}>
                                <SimpleItem dataField='partNumberCode' isRequired />
                                <SimpleItem dataField='name' isRequired />
                                <SimpleItem dataField='partLibraryName' isRequired />
                                <SimpleItem dataField='vendor' isRequired />
                                <SimpleItem dataField='description' editorType={"dxTextArea"} />
                            </Item>
                        </Form>
                    </Editing>
                    <Column type='buttons' caption={"Tùy chọn"} alignment={"center"}>
                        <Button name='edit' visible={onVisibleEdit} />
                        <Button name='delete' visible={onVisibleDelete} />
                    </Column>

                    <Column
                        alignment='left'
                        dataField='id'
                        caption='Id'
                        // width={"50"}
                        allowEditing={false}
                    />

                    {/*<Column*/}
                    {/*  dataField="partNumberCode"*/}
                    {/*  caption={"Part Code"}*/}
                    {/*  editCellRender={autoCompletePartNumberCodeCellRender}*/}
                    {/*  alignment="left"*/}
                    {/*  >*/}
                    {/*</Column>*/}
                    <Column dataField='name'></Column>
                    <Column dataField='partLibraryName'></Column>
                    <Column dataField='vendor' editCellRender={autoCompleteVendorCellRender}></Column>
                    <Column dataField='type' cellRender={onStatusRender} allowEditing={false} alignment='left'></Column>
                    <Column dataField='description'></Column>
                    <Column
                        dataField='createdAt'
                        caption='Ngày tạo'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                        alignment='left'></Column>
                    <Column
                        dataField='updatedAt'
                        caption='Sửa đổi gần nhất'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                        alignment='left'
                    />
                </DataGrid>
            </div>
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={"center"}
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={true}
                message='Đang tải...'
            />
        </div>
    );
});

export default PartNumberManager;

registerScreen({
    component: PartNumberManager,
    caption: "Quản lý Part Number",
    screenId: "screen.PartNumberManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
