import React, { useEffect, useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import { loadMessages, locale } from "devextreme/localization";
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    Form,
    HeaderFilter,
    Item as ToolbarItem,
    MasterDetail,
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
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { Feeder } from "../../../../jmix/entities/Feeder";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { DropDownOptions } from "devextreme-react/lookup";
import { FeederGroup } from "../../../../jmix/entities/FeederGroup";
import { Button } from "devextreme-react/button";
import { Popup as StandalonePopup } from "devextreme-react/popup";
import FeederImport from "../../../profile/FeederImport";
import { SelectBox } from "devextreme-react";
import { custom } from "devextreme/ui/dialog";
import { Item, SimpleItem } from "devextreme-react/form";
import QrFeederManager from "../qr-feeder/QrFeederManager";
import { print } from "../../../../utils/utils";
import { RowUpdatingEvent } from "devextreme/ui/data_grid";

const ROUTING_PATH = "/feederSerialManager";

const FeederSerialManager = observer(() => {
    const feederDataCollectionStore = collection<Feeder>(Feeder.NAME, {
        view: "feeder-with-feeder-qr-code-feeder-groups",
        sort: "-updatedAt",
        loadImmediately: false, // sort: 'order'
    });

    const feederDataInstanceStore = instance<Feeder>(Feeder.NAME, {
        view: "feeder-with-feeder-qr-code-feeder-groups",
        loadImmediately: false,
    });

    const feederGroupDataCollectionStore = collection<FeederGroup>(FeederGroup.NAME, {
        view: "_base",
        loadImmediately: false, // sort: 'order'
    });

    const mainStore = useMainStore();
    const typeList = ["DOUBLE", "SINGLE", "OTHER"];

    const [feederList, setFeederList] = useState<Feeder[] | any>(undefined);
    const [feederGroupList, setfeederGroupList] = useState<FeederGroup[] | null>(null);
    const changeTextDefaultPopup = useRef<DataGrid>(null);
    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);
    const [currentFeeder, setCurrentFeeder] = useState<Feeder | undefined>(undefined);

    const [searchByText, setSearchByText] = useState("");

    locale("en");
    loadMessages({
        en: {
            Loading: "Đang tải...",
        },
    });

    const toggleStatus = (data) => {
        print(data);
        // const dataItem = feederList[rowIndex];
        const promptPromise = custom({
            title: "Xác nhận thay đổi trạng thái",
            message: "Bạn có muốn thay đổi trạng thái không?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Thay đổi",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });

        promptPromise.show().then((confirmed) => {
            if (confirmed) {
                data.status = !data.status;
                feederDataInstanceStore.setItem(data);
                feederDataInstanceStore
                    .commit()
                    .then((res) => {
                        toastSuccess("Thay đổi trạng thái thành công");
                        // resolve(false);
                        refresh();
                    })
                    .catch(() => {
                        toastError("Thay đổi trạng thái thất bại");
                        // reject("Sửa thất bại");
                    });
            }
        });
    };

    const getStatusColor = (status) => {
        return status ? "#06BE18" : "#E51C0F";
    };

    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };

    const setPopUpImportOpen = () => {
        setPopupImportIsOpen(true);
    };

    const loadFeeder = async () => {
        await feederDataCollectionStore.load().then((res) => {
            setFeederList([...feederDataCollectionStore.items]);
        });
    };

    const loadFeederGroup = async () => {
        await feederGroupDataCollectionStore.load().then((res) => {
            if (feederGroupDataCollectionStore.items && feederGroupDataCollectionStore.items.length > 0) {
                setfeederGroupList(feederGroupDataCollectionStore.items);
            }
        });
    };

    /**
     * Kiểm tra có part number nào không
     * @param name
     * @param value
     */
    const checkExistFeeder = async (name, value) => {
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
            .post(PLANNING_API_URL + "/rest/entities/Feeder/search", data, {
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
        const checkExistFeederCode = await checkExistFeeder("feederCode", insertData.feederCode);
        const checkExistSerial = await checkExistFeeder("serial", insertData.serial);
        if (checkExistFeederCode) {
            return {
                status: false,
                message: "Feeder Code đã tồn tại trong hệ thống",
            };
        }
        if (checkExistSerial) {
            return {
                status: false,
                message: "Serial đã tồn tại trong hệ thống",
            };
        }
        return {
            status: true,
            message: "Ok",
        };
    };

    const onInsertFeeder = async (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            let insertData = data.data;
            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    feederDataInstanceStore.setItem(insertData);
                    feederDataInstanceStore.commit().then((res) => {
                        insertData.id = res.id;
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        today.setHours(today.getHours() + 7);
                        insertData.createdAt = today.toISOString();
                        data.data = insertData;
                        toastSuccess("Thêm mới thành công");

                        resolve(false);
                    });
                }
            });
        });
        data.cancel = isCanceled;
        refresh();
    };

    const onEditFeeder = (data: RowUpdatingEvent<Feeder, string>) => {
        const isCanceled: PromiseLike<void> = new Promise(async (resolve, reject) => {
            // print(`onEditPartNumber`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);

            let updateData = data.newData;
            updateData.id = data.key;
            await checkIfExist(updateData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    feederDataInstanceStore.setItem(updateData);
                    feederDataInstanceStore
                        .commit()
                        .then((res) => {
                            toastSuccess("Sửa thành công");
                            resolve();
                        })
                        .catch(() => {
                            toastError("Sửa thất bại");
                            reject("Sửa thất bại");
                        });
                }
            });
            data.cancel = isCanceled;
        });
        refresh();
    };

    const onRemoveFeeder = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa Feeder?",
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
                    // print(`onRemovePartNumber`);
                    // print(`Dữ liệu thô ${ROUTING_PATH}: `);
                    // print(data);
                    // data.data.productOrder = this.props.data.data.productOrderId;
                    // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                    const deleteDataId = data.data.id;
                    axios
                        .delete(PLANNING_API_URL + "/rest/entities/Feeder/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function (response) {
                            toastSuccess("Xóa thành công Feeder");
                            resolve(false);
                        })
                        .catch(function (error) {
                            reject("Có lỗi xảy ra");
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        data.cancel = isCanceled;
        refresh();
    };

    const refresh = () => {
        loadFeeder();
    };

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };

    const whiteSpaceSpecialCharacters = "^[a-zA-Z0-9.]*$";

    const lookupFeederGroupCellRender = (data) => {
        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = feederGroupList?.find(({ id }) => id === valueChangedEventArg.value);
            data.setValue(dat);
        };
        return (
            <>
                {feederGroupList && feederGroupList.length ? (
                    <div>
                        <SelectBox
                            dataSource={feederGroupList}
                            searchEnabled={true}
                            searchMode={"contains"}
                            searchExpr={"name"}
                            acceptCustomValue={true}
                            defaultValue={data.value}
                            displayExpr='name'
                            valueExpr='id'
                            onValueChanged={setEditedValue}
                            placeholder={"--Lựa chọn--"}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} />
                        </SelectBox>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const renderFeederGroupCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const popUpImportRender = () => {
        return <FeederImport />;
    };

    const setStateValue = (rowData) => {
        // print(rowData);
    };

    useEffect(() => {
        loadFeeder();
        loadFeederGroup();
    }, []);

    const renderEquipmentTypeCell = (data) => {
        return <div>{data.value?.equipmentType?.name}</div>;
    };

    const onRowClickFeeder = (data) => {
        setCurrentFeeder(data?.data);
    };

    const renderQrFeederManager = ({ data }) => {
        // print("OKKOOKOK")
        // print(currentFeeder)
        console.log("data in render", data);
        return <QrFeederManager searchKeyword={data.data.id} feeder={{ ...data.data }} refresh={refresh} />;
    };

    return (
        <div id='data-grid-demo'>
            <StandalonePopup
                visible={popupImportIsOpen ? popupImportIsOpen : false}
                onHiding={setPopUpImportClose}
                title='Import'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpImportRender}></StandalonePopup>

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
                        Equipment
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
                    onRowInserting={onInsertFeeder}
                    onRowUpdating={onEditFeeder}
                    // onRowRemoving={onRemoveFeeder}
                    onRowClick={onRowClickFeeder}
                    dataSource={feederList}
                    ref={changeTextDefaultPopup}
                    keyExpr='id'
                    noDataText='Không có dữ liệu để hiển thị'
                    onOptionChanged={onOptionChangedSearchByText}>
                    <Toolbar>
                        <ToolbarItem location='after'>
                            <Button hint='Import' icon='import' onClick={setPopUpImportOpen} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <Button hint='Refresh' onClick={refresh} icon='refresh' />
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
                        placeholder='VD: FDR'
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
                        mode='popup'
                        allowUpdating={true}
                        allowAdding={true}
                        // allowDeleting={true}
                        useIcons={true}
                        texts={{
                            cancelRowChanges: "Hủy bỏ",
                            saveRowChanges: "Lưu lại",
                            confirmDeleteMessage: "",
                            deleteRow: "Xóa",
                            editRow: "Sửa",
                            addRow: "Thêm Equipment",
                        }}
                        popup={{
                            title: "Thông tin Feeder",
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
                        <Popup title='Thông tin Feeder' showTitle={true} width={700} height={525} />
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2}>
                                <SimpleItem dataField='feederCode' isRequired>
                                    <RequiredRule message={"Hãy nhập Equipment Code"} />
                                </SimpleItem>
                                <SimpleItem dataField='serial' isRequired>
                                    <RequiredRule message='Hãy nhập Serial' />
                                    <PatternRule
                                        message='Không được nhập khoảng trắng hoặc các ký tự đặc biệt!'
                                        pattern={whiteSpaceSpecialCharacters}
                                    />
                                </SimpleItem>
                                <SimpleItem dataField='manufacturingDate' isRequired>
                                    <RequiredRule message={"Hãy chọn Manufacturing Date"} />
                                </SimpleItem>
                                <SimpleItem dataField='entryDate' isRequired>
                                    <RequiredRule message={"Hãy chọn Entry Date"} />
                                </SimpleItem>
                                <SimpleItem dataField='maintainTime' isRequired>
                                    <RequiredRule message={"Hãy nhập Maintain Time"} />
                                </SimpleItem>
                                <SimpleItem dataField='numberSlot' isRequired>
                                    <RequiredRule message={"Hãy nhập Number Slot"} />
                                </SimpleItem>
                                <SimpleItem dataField='feederGroup' isRequired>
                                    <RequiredRule message={"Hãy nhập Equipment Group"} />
                                </SimpleItem>
                                <SimpleItem dataField='ncc' isRequired>
                                    <RequiredRule message={"Hãy nhập Vendor"} />
                                </SimpleItem>
                                <SimpleItem dataField='note' editorType='dxTextArea' />
                            </Item>
                            {/*<Item itemType="group" colCount={2} colSpan={2}>*/}
                            {/*<Item dataField="name"/>*/}

                            {/*<Item dataField="feederGroupCode"/>*/}
                            {/*<Item dataField="type"/>*/}
                            {/*</Item>*/}
                        </Form>
                    </Editing>
                    <Column type='buttons' caption={"Tùy chọn"} alignment={"center"} />
                    <Column
                        dataField={"status"}
                        dataType='number'
                        caption={"Status"}
                        alignment={"left"}
                        width={95}
                        cellRender={({ data, rowIndex }) => (
                            <button
                                onClick={() => toggleStatus(data)}
                                style={{
                                    backgroundColor: getStatusColor(data.status),
                                    borderRadius: 15,
                                    color: "#fff",
                                    border: "#fff",
                                    width: 80,
                                    height: 30,
                                }}>
                                {data.status ? "active" : "inactive"}
                            </button>
                        )}
                    />

                    <Column dataField='id' caption='Id' width='50' allowEditing={false} alignment='left' />
                    <Column dataField='serial' width='140' />
                    <Column dataField='manufacturingDate' dataType='date' format='dd/MM/yyyy' width='170' />
                    <Column dataField='entryDate' dataType='date' format='dd/MM/yyyy' width='140' />
                    <Column dataField='maintainTime' width='130' alignment='left' />
                    <Column dataField='numberSlot' width='130' alignment='left' />
                    <Column
                        dataField='feederGroup'
                        width='160'
                        cellRender={renderFeederGroupCell}
                        editCellRender={lookupFeederGroupCellRender}
                        caption={"Equipment Group"}
                        allowHeaderFiltering={false}
                    />
                    <Column dataField='feederGroup' cellRender={renderEquipmentTypeCell} caption={"Equipment Type"} />
                    <Column dataField='ncc' caption='Vendor' width='100' />
                    <Column dataField='note' width='100' />
                    <Column
                        dataField='createdAt'
                        caption='Ngày tạo'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column
                        dataField='updatedAt'
                        caption='Ngày sửa gần nhất'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <MasterDetail enabled={true} component={renderQrFeederManager} />
                </DataGrid>
            </div>
        </div>
    );
});

export default FeederSerialManager;

registerScreen({
    component: FeederSerialManager,
    caption: "Quản lý Equipment",
    screenId: "screen.FeederSerialManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
