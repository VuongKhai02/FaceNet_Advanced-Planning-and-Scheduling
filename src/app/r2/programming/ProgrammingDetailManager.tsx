import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { locale, loadMessages } from "devextreme/localization";
import DataGrid, {
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
    RequiredRule,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Popup as StandalonePopup, Popup as Popup2 } from "devextreme-react/popup";

import { confirm } from "devextreme/ui/dialog";
import "devextreme-react/text-area";
import { Form as Form2, GroupItem, Item, SimpleItem } from "devextreme-react/form";
import { collection, instance } from "@haulmont/jmix-react-core";
import { print, str } from "../../../utils/utils";
import axios from "axios";
import { PLANNING_API_URL } from "../../../config";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import { ProgrammingDetail } from "../../../jmix/entities/ProgrammingDetail";
import { Lane } from "../../../jmix/entities/Lane";
import { Machine } from "../../../jmix/entities/Machine";
import { QrFeeder } from "../../../jmix/entities/QrFeeder";
import { DropDownOptions, Lookup } from "devextreme-react/lookup";
import { PartNumber } from "../../../jmix/entities/PartNumber";
import { Profile } from "../../../jmix/entities/Profile";
import { Button as StandaloneButton } from "devextreme-react/button";
import ProgramingImport from "../../profile/ProgramingImport";
import ProgramingDetailImport from "../../profile/ProgramingDetailImport";
import { LoadPanel } from "devextreme-react/load-panel";
import { custom } from "devextreme/ui/dialog";

const ProgrammingDetailManager = observer(({ idProgramming }) => {
    const profileDataCollectionStore = collection<Profile>(Profile.NAME, {
        view: "with-all",
        loadImmediately: false,
        sort: "-updatedAt",
        filter: {
            conditions: [{ property: "programming.id", operator: "=", value: idProgramming }],
        },
    });
    const laneDataCollectionStore = collection<Lane>(Lane.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const machineDataCollectionStore = collection<Machine>(Machine.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const qrFeederDataCollectionStore = collection<QrFeeder>(QrFeeder.NAME, {
        view: "with-all",
        loadImmediately: false,
    });
    const programmingDetailDataCollectionStore = collection<ProgrammingDetail>(ProgrammingDetail.NAME, {
        view: "with-all",
        loadImmediately: false,
        filter: {
            conditions: [{ property: "programming.id", operator: "=", value: idProgramming }],
        },
    });
    const programmingDetailDataInstanceStore = instance<ProgrammingDetail>(ProgrammingDetail.NAME, {
        view: "with-all",
        loadImmediately: false,
    });

    const [programmingDetailList, setProgrammingDetailList] = useState<ProgrammingDetail[] | undefined>(undefined);
    const [laneList, setLaneList] = useState<Lane[] | undefined>(undefined);
    const [machineList, setMachineList] = useState<Machine[] | undefined>(undefined);
    const [qrFeederList, setQrFeederList] = useState<QrFeeder[] | undefined>(undefined);
    const [partNumberList, setPartNumberList] = useState<PartNumber[] | undefined>(undefined);
    const [popupIsOpen, setPopUpIsOpen] = useState(false);
    const [programmingDetailLoad, setProgrammingDetailLoad] = useState<boolean>(false);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
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

    const loadProgrammingDetailList = async () => {
        await programmingDetailDataCollectionStore.load().then((res) => {
            const programmingDetails: ProgrammingDetail[] | undefined = programmingDetailDataCollectionStore.items;

            setProgrammingDetailList(programmingDetails);
        });
    };

    const loadLaneList = async () => {
        await laneDataCollectionStore.load().then((res) => {
            if (laneDataCollectionStore.items && laneDataCollectionStore.items.length > 0) {
                setLaneList(laneDataCollectionStore.items);
            }
        });
    };

    const loadPartNumberList = async () => {
        const listPartNumber: PartNumber[] = [];

        await profileDataCollectionStore.load().then((res) => {
            if (profileDataCollectionStore.items && profileDataCollectionStore.items.length > 0) {
                const profile = profileDataCollectionStore.items[0];
                profile.profileDetail?.map((value) => {
                    value.profileDetailPartNumbers?.map((value1) => {
                        if (value1.type == "1" && value1.partNumber != undefined) {
                            listPartNumber.push(value1.partNumber);
                        }
                    });
                });

                setPartNumberList(listPartNumber);
            }
        });
    };

    const loadMachineList = async () => {
        await machineDataCollectionStore.load().then((res) => {
            if (machineDataCollectionStore.items && machineDataCollectionStore.items.length > 0) {
                setMachineList(machineDataCollectionStore.items);
            }
        });
    };

    const loadQrFeederList = async () => {
        await qrFeederDataCollectionStore.load().then((res) => {
            if (qrFeederDataCollectionStore.items && qrFeederDataCollectionStore.items.length > 0) {
                setQrFeederList(qrFeederDataCollectionStore.items);
            }
        });
    };

    const onInsertProgrammingDetail = async (data) => {
        // print("onInsertProgrammingDetail");
        const isCanceled = new Promise(async (resolve, reject) => {
            let insertData = data.data;
            // print("du lieu tho: " + data);
            // print("*****************************************");
            // print("du lieu tinh: " + insertData);
            // print(str(insertData));

            insertData.programming = { id: idProgramming };

            if (insertData.lane) {
                // alert(insertData.lane.id)
                insertData.lane = { id: insertData.lane.id };
                // alert(str(insertData.lane))
            }
            if (insertData.machine) {
                insertData.machine = { id: insertData.machine.id };
            }
            if (insertData.qrFeeder) {
                insertData.qrFeeder = { id: insertData.qrFeeder.id };
            }

            // print(str(insertData));

            // const checkExistPartNumberCode = await checkExistProgrammingCode("programingCode", insertData.programingCode);
            // //   const checkExistVendor = await checkExistProgrammingCode("vendor", insertData.vendor)
            // if (checkExistPartNumberCode) {
            //   toastError("ProgrammingCode đã tồn tại trong hệ thống");
            //   data.cancel = new Promise((resolve, reject) => {
            //     return resolve(true);
            //   });
            //   reject("ProgrammingCode đã tồn tại trong hệ thống");
            //   return;
            // }
            //   if (checkExistVendor) {
            //     toastError("Vendor đã tồn tại trong hệ thống");
            //     data.cancel = new Promise((resolve, reject) => {
            //       return resolve(true);
            //     });
            //     reject("Vendor Code đã tồn tại trong hệ thống");
            //     return;
            //   }

            programmingDetailDataInstanceStore.setItem(insertData);
            await programmingDetailDataInstanceStore.commit().then((res) => {
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

            // const oncheckExistProgrammingCode = await checkExistProgrammingCode("programingCode", updateData.programingCode);
            //   const checkExistVendor = await checkExistPartNumber("vendor", updateData.vendor)
            // if (oncheckExistProgrammingCode) {
            //   toastError("Programming Code đã tồn tại trong hệ thống");
            //   data.cancel = new Promise((resolve, reject) => {
            //     return resolve(true);
            //   })
            //   reject("Programming Code đã tồn tại trong hệ thống");
            //   return;
            // }
            //   if (oncheckExistProgrammingCode) {
            //     toastError("Vendor đã tồn tại trong hệ thống");
            //     data.cancel = new Promise((resolve, reject) => {
            //       return resolve(true)
            //     });
            //     reject("Vendor Code đã tồn tại trong hệ thống");
            //     return
            //   }
            programmingDetailDataInstanceStore.setItem(updateData);
            programmingDetailDataInstanceStore.commit();
            refresh();
            resolve(false);
        });
        data.cancel = isCanceled;
    };

    const onRemoveProgramming = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa dữ liệu?",
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
                        .delete(PLANNING_API_URL + "/rest/entities/ProgrammingDetail/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function (response) {
                            resolve(false);
                            toastSuccess("Xóa thành công");
                        })
                        .catch(function (error) {
                            reject("Có lỗi xảy ra");
                            toastError("Xóa thất bại");
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const modePopUp = () => {
        setMode("popup");
    };

    const modeBatch = () => {
        setMode("batch");
    };

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
            Loading: "Đang tải...",
            Search: "Tìm kiếm",
        },
    });

    const setPopUpClose = () => {
        setPopUpIsOpen(false);
    };

    const popUpContentRender = () => {
        return (
            <div style={{ height: "100%" }}>
                '
                <Form2 colCount={4}>
                    <GroupItem caption='Product'></GroupItem>
                </Form2>
            </div>
        );
    };

    const lookupLaneCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = laneList?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <>
                {laneList && laneList.length ? (
                    <div>
                        <Lookup width={170} dataSource={laneList} displayExpr='laneName' valueExpr='id' onValueChanged={setEditedValue}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} width={200} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const renderLaneCell = (data) => {
        return <div>{data.value?.laneName}</div>;
    };

    const renderMachineCell = (data) => {
        return <div>{data.value?.machineName}</div>;
    };

    const renderQrFeederCell = (data) => {
        // alert(str(data.value))
        return <div>{data.value?.qrFeederCode}</div>;
    };

    const renderPartNumberCell = (data) => {
        return <div>{data.value?.partNumberCode}</div>;
    };

    const renderPartNameCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const refresh = () => {
        setLoadPanelVisible(true);

        loadPartNumberList();
        loadLaneList();
        loadQrFeederList();
        loadMachineList();
        loadProgrammingDetailList().then((res) => {
            // toastSuccess("Tải thành công")
            setLoadPanelVisible(false);
        });
    };

    const lookupMachineCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = machineList?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <>
                {machineList && machineList.length ? (
                    <div>
                        <Lookup
                            width={175}
                            dataSource={machineList}
                            displayExpr='machineName'
                            valueExpr='id'
                            onValueChanged={setEditedValue}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} width={200} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const lookupQrFeederCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = qrFeederList?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <>
                {qrFeederList && qrFeederList.length ? (
                    <div>
                        <Lookup
                            width={170}
                            dataSource={qrFeederList}
                            displayExpr='qrFeederCode'
                            valueExpr='id'
                            onValueChanged={setEditedValue}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} width={200} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const popUpImportRender = () => {
        return <ProgramingDetailImport />;
    };

    const lookupPartNumberCellRender = (data) => {
        // print(str(data.data.profileDetailPartNumbers));
        const selectData: PartNumber[] | undefined = data?.data?.profileDetailPartNumbers?.map((value, index) => {
            return value.partNumber;
        });

        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = selectData?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <div>
                <Lookup width={175} dataSource={selectData} displayExpr='name' valueExpr='id' onValueChanged={setEditedValue}>
                    <DropDownOptions closeOnOutsideClick={true} showTitle={false} width={200} />
                </Lookup>
            </div>
        );
    };

    useEffect(() => {
        setLoadPanelVisible(true);
        loadPartNumberList();
        loadLaneList();
        loadQrFeederList();
        loadMachineList();
        loadProgrammingDetailList().then((res) => {
            setLoadPanelVisible(false);
        });
    }, [idProgramming]);

    const onRowPrepared = (e) => {
        // print(str(e.row.data));
    };

    const onDeleteAllProgramingDetailByProgramingId = (data) => {
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
                    // print("onRemoveProgramming"); // data.data.productOrder = this.props.data.data.productOrderId;
                    // print("Dữ liệu sau khi xử lý ${ROUTING_PATH}: ");
                    // setProgrammingDetailLoad(true);
                    axios
                        .delete(PLANNING_API_URL + "/services/api/programing-detail?programmingId=" + idProgramming, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function (response) {
                            resolve(false);
                            toastSuccess("Xóa tất cả programming Detail thành công");
                            // setProgrammingDetailLoad(false);
                            refresh();
                        })
                        .catch(function (error) {
                            reject("Có lỗi xảy ra");
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        // idProgramming
        // data.cancel = isCanceled;
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };
    return (
        <div>
            <LoadPanel
                position={{ of: "#root" }}
                shadingColor='rgba(0,0,0,0.4)'
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={true}
                message='Đang tải'
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
                closeOnOutsideClick={true}
            />
            <div>
                <div
                    className='informer'
                    style={{
                        background: "#fff",
                        marginBottom: "0px",
                        textAlign: "center",
                    }}>
                    <h5
                        className='name'
                        style={{
                            marginBottom: 0,
                            fontSize: 18,
                        }}>
                        Programming Detail
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
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    focusedRowEnabled={true}
                    onFocusedRowChanged={onRowPrepared}
                    onRowInserting={onInsertProgrammingDetail}
                    onRowUpdating={onEditProgramming}
                    onRowRemoving={onRemoveProgramming}
                    dataSource={programmingDetailList}
                    keyExpr='id'
                    onInitNewRow={modePopUp}
                    onEditCanceled={modeBatch}
                    onSaved={modeBatch}
                    showBorders={true}
                    onOptionChanged={onOptionChangedSearchByText}
                    ref={changeTextDefaultPopup}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Toolbar>
                        {/* <ToolbarItem location="center">
            <div className="informer">
              <h5 className="name">Programming Detail</h5>
            </div>
          </ToolbarItem> */}

                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Import' icon='import' onClick={setPopUpImportOpen} />
                        </ToolbarItem>

                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Close' icon='close' onClick={onDeleteAllProgramingDetailByProgramingId} />
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
                        placeholder='VD: 20L'
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
                            cancelRowChanges: "Hủy bỏ",
                            undeleteRow: "Khôi phục",
                            deleteRow: "Xóa",
                            saveAllChanges: "Lưu tất cả",
                            cancelAllChanges: "Hủy tất cả",
                            addRow: "Thêm ",
                        }}
                        popup={{
                            title: "Thông tin Programming Detail",
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
                                        onClick: function () {
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
                                        onClick: function () {
                                            changeTextDefaultPopup.current?.instance.saveEditData();
                                        },
                                        text: "Lưu lại",
                                    },
                                },
                            ],
                        }}>
                        <Popup title='Thông tin Programming Detail' showTitle={true} width={700} height={525} closeOnOutsideClick={true} />
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2}>
                                <SimpleItem dataField='lane' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='machine' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='qrFeeder' isRequired />
                                <SimpleItem dataField='partNumber' isRequired />
                                <SimpleItem dataField='slot' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='subslot' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='locationFrontRear' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='locationLeftRight' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='side' isRequired>
                                    <RequiredRule message='Không được để trống' />
                                </SimpleItem>
                                <SimpleItem dataField='designator' />
                                <SimpleItem dataField='locationX' />
                                <SimpleItem dataField='locationY' />
                                <SimpleItem dataField='locationZ' />
                                <SimpleItem dataField='rotation' />
                                <SimpleItem dataField='partten' />
                                <SimpleItem dataField='note' />
                            </Item>
                        </Form>
                    </Editing>
                    <Column type={"buttons"} alignment='center' caption={"Tùy chọn"} />
                    <Column dataField='id' caption='Id' allowEditing={false} alignment='left' />
                    <Column
                        dataField='lane'
                        caption='Lane'
                        cellRender={renderLaneCell}
                        editCellRender={lookupLaneCellRender}
                        headerFilter={{ dataSource: laneList }}
                    />
                    <Column dataField='machine' caption='Machine' cellRender={renderMachineCell} editCellRender={lookupMachineCellRender} />
                    <Column
                        dataField='qrFeeder'
                        caption=' Qr Feeder Code'
                        cellRender={renderQrFeederCell}
                        editCellRender={lookupQrFeederCellRender}
                    />
                    {/*<Column dataField="feeder" caption="Feeder Group" cellRender={renderFeederGroupCell}/>*/}
                    <Column
                        dataField='partNumber'
                        caption='Part'
                        cellRender={renderPartNumberCell}
                        editCellRender={lookupPartNumberCellRender}
                    />
                    <Column dataField='partNumber' caption='Part Name' cellRender={renderPartNameCell} allowEditing={false} />
                    {/*<Column dataField={"profileDetail"} caption={"Profile Detail"} editCellRender={lookupProfileDetailCellRender}   />*/}
                    <Column dataField='slot' caption='Slot Area' />
                    <Column dataField='subslot' caption='Subslot' />
                    <Column dataField='locationFrontRear' caption='Location Front Rear' />
                    <Column dataField='locationLeftRight' caption='Location Left Right' />
                    <Column dataField='designator' caption='Desinator' />
                    <Column dataField='locationX' caption='X' alignment='left' />
                    <Column dataField='locationY' caption='Y' alignment='left' />
                    <Column dataField='locationZ' caption='Z' alignment='left' />
                    <Column dataField='rotation' caption='Rotation' alignment='left' />
                    <Column dataField='partten' caption='Partten' />
                    <Column dataField='note' caption='Note' />
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
});

export default ProgrammingDetailManager;
