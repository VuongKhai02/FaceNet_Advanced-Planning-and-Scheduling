import React, { useRef, useEffect, useState } from "react";
import { locale, loadMessages } from "devextreme/localization";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import DataGrid, {
    AsyncRule,
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
    PatternRule,
    Popup,
    RequiredRule,
    SearchPanel,
    StringLengthRule,
    Toolbar,
} from "devextreme-react/data-grid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Popup as StandalonePopup, Popup as Popup2 } from "devextreme-react/popup";

import "devextreme-react/text-area";
import { Form as Form2, GroupItem, Item, SimpleItem } from "devextreme-react/form";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { print } from "../../../utils/utils";
import { custom } from "devextreme/ui/dialog";
import axios from "axios";
import { PLANNING_API_URL } from "../../../config";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import { Programming } from "../../../jmix/entities/Programming";
import ProgrammingDetailManager from "./ProgrammingDetailManager";
import { Button as StandaloneButton } from "devextreme-react/button";
import InfoTableRow from "../../../utils/InfoTableRow";
import { ScrollView, Validator } from "devextreme-react";
import ProgramingImport from "../../profile/ProgramingImport";
import { LoadPanel } from "devextreme-react/load-panel";

const ROUTING_PATH = "/programmingManager";

const ProgrammingManager = observer(() => {
    const programmingCollection = collection<Programming>(Programming.NAME, {
        view: "_base",
        sort: "-updatedAt",
        loadImmediately: false,
    });
    const programmingDataInstance = instance<Programming>(Programming.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const mainStore = useMainStore();

    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
    const [programmingList, setProgrammingList] = useState<Programming[] | undefined>(undefined);
    const [currentProgramming, setCurrentProgramming] = useState<Programming | null>(null);
    const [popupIsOpen, setPopUpIsOpen] = useState(false);
    const [mode, setMode] = useState<"batch" | "popup">("batch");
    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);
    const changeTextDefaultPopup = useRef<DataGrid>(null);

    const [searchByText, setSearchByText] = useState("");

    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };

    const setPopUpImportOpen = () => {
        setPopupImportIsOpen(true);
    };

    const loadProgrammingList = async () => {
        setLoadPanelVisible(true);
        await programmingCollection.load().then((res) => {
            setProgrammingList(programmingCollection.items);
            setLoadPanelVisible(false);
        });
    };

    const checkExistProgrammingCode = async (name, value) => {
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
            .post(PLANNING_API_URL + "/rest/entities/Programming/search", data, {
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
        const checkExistProfileCode = await checkExistProgrammingCode("programingCode", insertData.programingCode);
        const checkExistName = await checkExistProgrammingCode("name", insertData.name);

        if (checkExistProfileCode) {
            return {
                status: false,
                message: "Profile Code đã tồn tại trong hệ thống",
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

    const onInsertProgramming = async (data) => {
        // print("onInsertProgramming");
        const isCanceled = new Promise(async (resolve, reject) => {
            let insertData = data.data;
            // print("du lieu tho: " + data);
            // print("*****************************************");
            // print("du lieu tinh: " + insertData);
            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    programmingDataInstance.setItem(insertData);
                    await programmingDataInstance.commit().then((res) => {
                        insertData.id = res.id;
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        today.setHours(today.getHours() + 7);
                        insertData.createdAt = today.toISOString();
                        data.data = insertData;
                        toastSuccess("Thêm mới dữ liệu Programming thành công");
                        refresh();
                        resolve(false);
                    });
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onEditProgramming = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onEditProgramming`);
            // print("du lieu tho: " + data);
            let updateData = data.newData;
            // print("****************************************");
            // print("du lieu tinh: " + updateData);
            updateData.id = data.key;

            await checkIfExist(updateData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    programmingDataInstance.setItem(updateData);
                    programmingDataInstance.commit();
                    refresh();
                    resolve(false);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onRemoveProgramming = (data) => {
        // console.log("onRemoveProgramming", data);
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa Programming?",
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
                    // print("onRemoveProgramming");
                    // print(data);
                    // // data.data.productOrder = this.props.data.data.productOrderId;
                    // print("Dữ liệu sau khi xử lý ${ROUTING_PATH}: ");
                    const deleteDataId = data.data.id;
                    axios
                        .delete(PLANNING_API_URL + "/rest/entities/Programming/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function (response) {
                            resolve(false);
                            toastSuccess("Xóa Programming thành công");
                        })
                        .catch(function (error) {
                            reject("Có lỗi xảy ra");
                            toastError("Xóa Programming thất bại");
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onSelectedRowKeysChange = (e) => {
        if (e.data) {
            setCurrentProgramming(e.data);
        }
    };

    const modePopUp = () => {
        setMode("popup");
    };

    const modeBatch = () => {
        setMode("batch");
    };

    const setPopUpOpen = (e) => {
        onSelectedRowKeysChange(e.row);
        setPopUpIsOpen(true);
    };

    const popUpImportRender = () => {
        return <ProgramingImport />;
    };

    const refresh = () => {
        loadProgrammingList();
    };

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };

    const regexSpecialCharacters = /^[a-zA-Z0-9._\-\s]+$/;

    const setPopUpClose = () => {
        setPopUpIsOpen(false);
    };

    const popUpContentRender = () => {
        return (
            <div style={{ height: "100%" }}>
                <ScrollView height={"100%"}>
                    <Form2 colCount={3} alignItemLabels={true}>
                        <SimpleItem colSpan={2}>
                            <div className={"dx-fieldset"}>
                                <div className='dx-fieldset-header'>Thông tin Programming</div>
                                {currentProgramming ? (
                                    <>
                                        <table>
                                            <InfoTableRow label={"Mã programming"} data={currentProgramming.programingCode} />
                                            <InfoTableRow label={"Tên programming"} data={currentProgramming.name} />
                                        </table>
                                    </>
                                ) : (
                                    "Bạn chưa chọn programming"
                                )}
                            </div>
                        </SimpleItem>
                    </Form2>
                    <Form2 colCount={1}>
                        <GroupItem>
                            <ProgrammingDetailManager idProgramming={currentProgramming?.id} />
                        </GroupItem>
                    </Form2>
                </ScrollView>
            </div>
        );
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    useEffect(() => {
        loadProgrammingList();
    }, []);

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
            Loading: "Đang tải...",
        },
    });

    return (
        <div id='dataGridProgramming'>
            <LoadPanel
                position={{ of: "#root" }}
                shadingColor='rgba(0,0,0,0.4)'
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={true}
                message='Đang tải...'
            />

            <StandalonePopup
                visible={popupImportIsOpen ? popupImportIsOpen : false}
                onHiding={setPopUpImportClose}
                title='Import'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpImportRender}
                closeOnOutsideClick={true}></StandalonePopup>

            <Popup2
                visible={popupIsOpen}
                onHiding={setPopUpClose}
                title='Thông tin Programming Detail'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpContentRender}
                dragEnabled={false}
                closeOnOutsideClick={true}
            />
            <div>
                <div
                    className='informer'
                    style={{
                        textAlign: "center",
                        background: "#fff",
                        paddingTop: 12,
                    }}>
                    <h5
                        className='name'
                        style={{
                            fontSize: 18,
                            marginBottom: 0,
                        }}>
                        Programming
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
                    onRowClick={onSelectedRowKeysChange}
                    onSelectionChanged={onSelectedRowKeysChange}
                    onCellClick={onSelectedRowKeysChange}
                    onRowInserting={onInsertProgramming}
                    onRowUpdating={onEditProgramming}
                    onRowRemoving={onRemoveProgramming}
                    dataSource={programmingList}
                    keyExpr='id'
                    onInitNewRow={modePopUp}
                    onEditCanceled={modeBatch}
                    onSaved={modeBatch}
                    ref={changeTextDefaultPopup}
                    noDataText='Không có dữ liệu để hiển thị'
                    onOptionChanged={onOptionChangedSearchByText}>
                    <Toolbar>
                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Import' icon='import' onClick={setPopUpImportOpen} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Refresh' onClick={refresh} icon='refresh' />
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
                        placeholder='VD: PN'
                        highlightSearchText={true}
                        text={searchByText}
                        highlightCaseSensitive={true}
                    />
                    <Paging enabled={true} defaultPageSize={10} />
                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[5, 10]}
                        infoText='Trang số {0} trên {1} ({2} bản ghi)'
                    />
                    <Editing
                        mode={mode}
                        useIcons={true}
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}
                        texts={{
                            editRow: "Sửa",
                            saveRowChanges: "Lưu lại",
                            cancelRowChanges: "Hoàn tác",
                            undeleteRow: "Hoàn tác",
                            deleteRow: "Xóa",
                            saveAllChanges: "Lưu tất cả",
                            cancelAllChanges: "Hoàn tác tất cả",
                            addRow: "Thêm Programming",
                        }}
                        popup={{
                            title: "Thông tin Programming",
                            showTitle: true,
                            width: 700,
                            height: 525,
                            position: {
                                my: "center",
                                at: "center",
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
                                            // console.log("save", e);
                                            changeTextDefaultPopup.current?.instance.saveEditData();
                                        },
                                        text: "Lưu lại",
                                    },
                                },
                            ],
                        }}>
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2}>
                                <SimpleItem dataField='programingCode' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                    <PatternRule message={"Bạn không được nhập ký tự đặc biệt!"} pattern={regexSpecialCharacters} />
                                </SimpleItem>
                                <SimpleItem dataField='name' isRequired>
                                    <RequiredRule message='Tên không được để trống' />
                                    <StringLengthRule message={"Bạn chỉ được nhập tối đa 256 ký tự!"} max={256} />
                                    <PatternRule message={"Bạn không được nhập ký tự đặc biệt!"} pattern={regexSpecialCharacters} />
                                </SimpleItem>
                                <SimpleItem dataField='lineName' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                    <PatternRule message={"Bạn không được nhập ký tự đặc biệt!"} pattern={regexSpecialCharacters} />
                                </SimpleItem>
                                <SimpleItem dataField='note' />
                            </Item>
                        </Form>
                    </Editing>
                    <Column type='buttons' caption={"Tùy chọn"} alignment={"center"}>
                        <Button name='edit' onClick={setPopUpOpen} visible={true} />
                        <Button name='delete' />
                    </Column>
                    <Column alignment='left' dataField='id' caption='Id' allowEditing={false} />
                    <Column dataField='programingCode' alignment='left'></Column>
                    <Column dataField='name'></Column>
                    <Column dataField='lineName'></Column>
                    <Column dataField='note' />
                    <Column
                        dataField='createdAt'
                        caption='Ngày tạo'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}></Column>
                    <Column
                        dataField='updatedAt'
                        caption='Sửa đổi gần nhất'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}></Column>
                </DataGrid>
            </div>
        </div>
    );
});

export default ProgrammingManager;

registerScreen({
    component: ProgrammingManager,
    caption: "Quản lý Programming",
    screenId: "screen.ProgrammingManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
