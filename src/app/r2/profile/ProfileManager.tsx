import React, { useEffect, useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import { Popup as StandalonePopup, Popup } from "devextreme-react/popup";
import DataGrid, {
    Button,
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    Form as FormProfile,
    HeaderFilter,
    Item as ToolbarItem,
    OperationDescriptions,
    Pager,
    Paging,
    Popup as PopupProfile,
    RequiredRule,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { print, str } from "../../../utils/utils";
import axios from "axios";
import { PLANNING_API_URL } from "../../../config";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import { Profile } from "../../../jmix/entities/Profile";
import { Programming } from "../../../jmix/entities/Programming";
import { Item } from "devextreme-react/form";
import { ProductOrderItem } from "../../../jmix/entities/ProductOrderItem";
import { ProfileDetail } from "../../../jmix/entities/ProfileDetail";
import { DropDownOptions, Lookup } from "devextreme-react/lookup";
import { Button as StandaloneButton } from "devextreme-react/button";
import { ProgrammingDetail } from "../../../jmix/entities/ProgrammingDetail";
import ProfileImport from "../../profile/ProfileImport";
import { Coitt } from "../../../jmix/entities/Coitt";
import { loadMessages, locale } from "devextreme/localization";
import { custom } from "devextreme/ui/dialog";
import { PartNumber } from "../../../jmix/entities/PartNumber";
import { LoadPanel } from "devextreme-react/load-panel";
import { ProfileDetailManager } from "./ProfileDetailManager";

const ROUTING_PATH = "/profileManager";

const ProfileManager = observer(() => {
    const mainStore = useMainStore();

    // Constant
    const profileDataCollectionStore = collection<Profile>(Profile.NAME, {
        view: "with-profileDetail",
        sort: "-updatedAt",
        loadImmediately: false, // sort: 'order'
    });
    const profileDataInstanceStore = instance<Profile>(Profile.NAME, {
        view: "with-all",
        loadImmediately: false,
    });
    const programmingCollectionStore = collection<Programming>(Programming.NAME, {
        view: "_base",
        loadImmediately: false, // sort: 'order'
    });
    const coittCollectionStore = collection<Coitt>(Coitt.NAME, {
        view: "_base",
        loadImmediately: false, // sort: 'order'
    });
    const profileDetailInstanceStore = instance<ProfileDetail>(ProfileDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    // Main state
    const [profileList, setProfileList] = useState<Profile[] | undefined>(undefined);
    const [programmingList, setProgrammingList] = useState<Programming[] | undefined>(undefined);
    const [coittList, setCoittList] = useState<Coitt[] | undefined>(undefined);
    const [profileCurrentCell, setProfileCurrentCell] = useState<Profile | undefined>(undefined);
    const [popupIsOpen, setPopUpIsOpen] = useState(false);
    const changeTextDefaultPopup = useRef<DataGrid>(null);
    const [searchByText, setSearchByText] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Coitt | null>(null);
    // popUpRenderState
    const [profileLoading, setProfileLoading] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<ProductOrderItem | null>(null);
    const [currentPartNumber, setCurrentPartNumber] = useState<PartNumber | undefined>();

    // Biến này sinh ra vì k biết tại sao nó cứ render liên tục khi set current Product
    const [tempProduct, setTempProduct] = useState<string>(str({ productName: "", productCode: "", bomVersion: "" }));
    const [currentProgramming, setCurrentProgramming] = useState<Programming | null>(null);

    const [modeNew, setModeNew] = useState<"batch" | "form" | "popup" | "cell" | "row" | undefined>("batch");
    const [currentProgrammingDetailList, setCurrentProgrammingDetailList] = useState<ProgrammingDetail[] | undefined>(undefined);

    const [currentListPartNumber, setCurrentListPartNumber] = useState<PartNumber[]>();

    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);

    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };

    const setPopUpImportOpen = () => {
        setPopupImportIsOpen(true);
    };

    const onSelectedRowKeysChange = (e) => {
        print("JOJJOJOOJOJOJJO");
        print(str(e.data));
        if (e.data) {
            setProfileCurrentCell(e.data);
            setCurrentProgramming(e.data?.programming);
            setTempProduct(
                str({
                    productName: e.data?.uProname,
                    productCode: e.data?.uProno,
                    bomVersion: e.data?.uVersion,
                }),
            );
        }
    };

    const modeNewPopUp = () => {
        setModeNew("popup");
    };

    const modeNewBatch = () => {
        setModeNew("batch");
    };

    const setPopUpOpen = async (e) => {
        // print(str(e.row?.data));
        // print(str(e.row?.data?.programming?.id));
        loadPartNumberByProgrammingId(e.row?.data?.id);
        onSelectedRowKeysChange(e.row);
        setPopUpIsOpen(true);
        const programmingId = e.row?.data?.programming?.id;
        if (programmingId) {
            const programmingDetailDataCollectionStore = collection<ProgrammingDetail>(ProgrammingDetail.NAME, {
                view: "with-all",
                loadImmediately: false,
                filter: {
                    conditions: [{ property: "programming.id", operator: "=", value: programmingId }],
                },
            });
            await programmingDetailDataCollectionStore.load().then(() => {
                setCurrentProgrammingDetailList(programmingDetailDataCollectionStore.items);
            });
        }
    };

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            Search: "Tìm kiếm",
            Loading: "Đang tải...",
        },
    });

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };

    const setPopUpClose = () => {
        setPopUpIsOpen(false);
    };

    const loadProfile = async () => {
        await profileDataCollectionStore.load().then((res) => {
            setProfileList(profileDataCollectionStore.items);
        });
    };

    const loadProgramming = async () => {
        await programmingCollectionStore.load().then((res) => {
            if (programmingCollectionStore.items && programmingCollectionStore.items.length > 0) {
                setProgrammingList(programmingCollectionStore.items);
            }
        });
    };

    const loadProductOrderItem = async () => {
        setProfileLoading(true);
        await coittCollectionStore.load().then((res) => {
            if (coittCollectionStore.items && coittCollectionStore.items.length > 0) {
                // alert(coittCollectionStore.items.length)
                setCoittList(coittCollectionStore.items);
            }
            setProfileLoading(false);
        });
    };

    /**
     * Kiểm tra có part number nào không
     * @param name
     * @param value
     */
    const checkExistProfile = async (name, value) => {
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
            .post(PLANNING_API_URL + "/rest/entities/Profile/search", data, {
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
        const checkExistProfileCode = await checkExistProfile("profileCode", insertData.profileCode);
        const checkExistName = await checkExistProfile("name", insertData.name);

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

    const onInsertProfileDetail = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onInsertQrFeeder`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(data);
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;
            insertData.profile = { id: profileCurrentCell?.id };
            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    profileDetailInstanceStore.setItem(insertData);
                    profileDetailInstanceStore.commit();
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    today.setHours(today.getHours() + 7);
                    insertData.createdAt = today.toISOString();
                    data.data = insertData;
                    toastSuccess("Thêm mới Proflie Detail thành công");
                    resolve(false);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onInsertProfile = async (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            print(`onInsertPartNumber`);
            print(`Dữ liệu thô ${ROUTING_PATH}: `);
            print(data);
            print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;

            if (insertData.uProno != undefined) {
                insertData.uVersion = insertData.uProno.uVersion;
                insertData.uProname = insertData.uProno.uProname;
                insertData.uProno = insertData.uProno.uProno;
            }

            await checkIfExist(insertData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    profileDataInstanceStore.setItem(insertData);
                    profileDataInstanceStore.commit().then((res) => {
                        insertData.id = res.id;
                        const timeElapsed = Date.now();
                        const today = new Date(timeElapsed);
                        today.setHours(today.getHours() + 7);
                        insertData.createdAt = today.toISOString();
                        data.data = insertData;
                        toastSuccess("Thêm mới thành công");
                        refresh();
                        resolve(false);
                    });
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onEditProfile = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            print(`onEditPartNumber`);
            print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // data.data.productOrder = this.props.data.data.productOrderId;
            print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let updateData = data.newData;
            updateData.id = data.key;
            print("sdkooskdfokskooksfokd");
            print(updateData);
            print(data);

            if (updateData.uProno !== undefined) {
                updateData.uVersion = updateData.uProno.uVersion;
                updateData.uProname = updateData.uProno.uProname;
                updateData.uProno = updateData.uProno.uProno;
            }

            // Tại sao lại có tempUpdate ???
            // Vì để có thể hiển thị đúng kết quả của trường sau khi update, cái GUI devextreme nó bị như vậy
            // Để cho đồng bộ devextreme với jmix
            print(updateData);
            await checkIfExist(updateData).then(async (res) => {
                if (!res.status) {
                    toastError(res.message);
                    reject(res.message);
                } else {
                    let tempUpdateProgramming = updateData.programming;
                    if (updateData.programming) {
                        updateData.programming = { id: updateData.programming.id };
                    }
                    print("Jello Hello");
                    print(updateData);
                    profileDataInstanceStore.setItem(updateData);
                    profileDataInstanceStore
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
                    updateData.programming = tempUpdateProgramming;
                    resolve(false);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const onRemoveProfile = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa Profile?",
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
                    // // data.data.productOrder = this.props.data.data.productOrderId;
                    // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                    const deleteDataId = data.data.id;
                    axios
                        .delete(PLANNING_API_URL + "/rest/entities/Profile/" + deleteDataId, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        })
                        .then(function () {
                            resolve(false);
                            toastSuccess("Xóa Profile thành công ");
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

    const onEditorStart = (e) => {
        setProfileCurrentCell(e.data);
        // alert("Hello")
    };

    const loadPartNumberByProgrammingId = async (id) => {
        await axios
            .get(PLANNING_API_URL + "/services/api/programing/part-number/" + id, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((res) => {
                print("KOKOOKOKOKKO");
                print(res);
                setCurrentListPartNumber(res.data);
                // setCurrentDnlnvlDetails(res.data)
                // console.log("dataaa", res.data);
            })
            .catch((res) => {
                console.log("error", res);
            });
    };

    const onChangePartNumber = (e) => {
        // print("Hello")

        if (e.row.data) {
            setCurrentPartNumber(e.row.data);
        }
    };

    const profilePartManager = (e) => {
        print(e);
        return <ProfileDetailManager profileCurrentCell={profileCurrentCell} />;
    };

    const lookupProductOrderItemCellRender = (data) => {
        const renderLookUp = (value: Coitt) => {
            return (
                <div>
                    {value.uProno} | {value.uPronam} | {value.uVersions}
                </div>
            );
        };

        const setEditedValue = (valueChangedEventArg) => {
            const changeValue = valueChangedEventArg.value;

            // @ts-ignore
            const tempData = data.data;
            // print(changeValue?.uVersions);
            // print(changeValue?.uPronam);
            // print(changeValue?.uProno);
            tempData.uVersion = changeValue?.uVersions;
            tempData.uProname = changeValue?.uPronam;
            tempData.uProno = changeValue?.uProno;

            setSelectedProduct(valueChangedEventArg.value);

            data.setValue(tempData);
            print("tempData222: " + str(tempData));
        };
        return (
            <>
                {coittList && coittList.length ? (
                    <div>
                        <Lookup
                            width='600'
                            dataSource={coittList}
                            displayExpr='uProno'
                            defaultValue={data.data}
                            // valueExpr="uProno"
                            onValueChanged={setEditedValue}
                            itemRender={renderLookUp}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const lookupProductOrderNameCellRender = (data) => {
        const renderLookUp = (value: Coitt) => {
            return (
                <div>
                    {value.uProno} | {value.uPronam} | {value.uVersions}
                </div>
            );
        };
        const setEditedValue = (valueChangedEventArg) => {
            // console.log("value change ", valueChangedEventArg);
            // console.log("data", data);
            print(str(valueChangedEventArg.value));
            data.setValue(valueChangedEventArg.value.uPronam);
            data.row.data.uProname = valueChangedEventArg.value.uPronam;
            data.row.data.uProno = valueChangedEventArg.value.uProno;
            data.row.data.uVersion = valueChangedEventArg.value.uVersions;
        };
        return (
            <>
                {coittList && coittList.length ? (
                    <div>
                        <Lookup
                            width='550'
                            dataSource={coittList}
                            displayExpr='uPronam'
                            defaultValue={data.value}
                            onValueChanged={setEditedValue}
                            itemRender={renderLookUp}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const programmingCellRender = (data) => {
        return <div>{data?.value?.programingCode || data?.value?.name ? data.value?.programingCode + " | " + data.value?.name : ""}</div>;
    };

    const lookupProgrammingCellRender = (data) => {
        const renderLookUp = (localData) => {
            return (
                <div>
                    {localData?.programingCode} | {localData?.name}
                </div>
            );
        };

        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = programmingList?.find(({ id }) => id === valueChangedEventArg.value);
            // @ts-ignore
            data.setValue(dat);
        };
        return (
            <>
                {programmingList && programmingList.length ? (
                    <div>
                        <Lookup
                            width='550'
                            dataSource={programmingList}
                            displayExpr='name'
                            valueExpr='id'
                            onValueChanged={setEditedValue}
                            itemRender={renderLookUp}
                            placeholder={"-- Lựa chọn --"}>
                            <DropDownOptions closeOnOutsideClick={true} showTitle={false} />
                        </Lookup>
                    </div>
                ) : (
                    ""
                )}
            </>
        );
    };

    const uPronoCellRender = (data) => {
        if (data?.value?.uProno !== undefined) return data?.value?.uProno;
        return data?.value;
    };

    const uPronameCellRender = (data) => {
        const value2 = profileList?.find(({ uProname }) => uProname === data.value);
        if (value2) return value2.uProname;

        return data?.value?.uProname;
    };

    const uVersionCellRender = (data) => {
        const value2 = profileList?.find(({ uVersion }) => uVersion === data?.value);
        if (value2) return value2?.uVersion;
        return data?.value?.uVersion;
    };

    const popUpImportRender = () => {
        return <ProfileImport />;
    };

    const refresh = async () => {
        loadProfile();
    };

    useEffect(() => {
        loadProfile();
        loadProgramming();
        loadProductOrderItem();
    }, []);

    const asyncValidation = (params) => {
        return new Promise(function executor(resolve) {
            let createdAt = params.data["createdAt"];
            let updatedAt = params.data["updatedAt"];
            if (createdAt > updatedAt) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div id='data-grid-demo'>
            <StandalonePopup
                visible={popupImportIsOpen ? popupImportIsOpen : false}
                onHiding={setPopUpImportClose}
                title='Import'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpImportRender}></StandalonePopup>
            <Popup
                visible={popupIsOpen}
                onHiding={setPopUpClose}
                title='Thông tin chi tiết Profile'
                showTitle={true}
                fullScreen={false}
                contentRender={profilePartManager}
            />
            <div id={"profile-manager"}>
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
                        Profile
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
                    onSelectionChanged={onSelectedRowKeysChange}
                    // onEditingStart={onEditorStart}
                    onRowInserting={onInsertProfile}
                    onRowUpdating={onEditProfile}
                    onRowRemoving={onRemoveProfile}
                    dataSource={profileList}
                    keyExpr='id'
                    noDataText='Không có dữ liệu để hiển thị'
                    ref={changeTextDefaultPopup}
                    onOptionChanged={onOptionChangedSearchByText}
                    onInitNewRow={modeNewPopUp}
                    onEditCanceled={modeNewBatch}
                    onSaved={modeNewBatch}>
                    <Toolbar>
                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Import' icon='import' onClick={setPopUpImportOpen} />
                        </ToolbarItem>
                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Refresh' icon='refresh' onClick={refresh} />
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
                        placeholder='VD: Driver'
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
                        mode={modeNew}
                        // mode={"batch"}
                        useIcons={true}
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}
                        popup={{
                            title: "Thêm Profile",
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
                        <PopupProfile
                            title='Thêm Profile'
                            showTitle={true}
                            width={700}
                            height={525}
                            onShowing={() => {
                                setSelectedProduct(null);
                            }}
                        />
                        <FormProfile>
                            <Item itemType='group' colCount={1} colSpan={2}>
                                {/* <SimpleItem dataField="id" /> */}
                                <Item dataField='profileCode' isRequired>
                                    <RequiredRule message={"Không được để trống"} />
                                </Item>
                                <Item dataField='uProno' isRequired>
                                    <RequiredRule message={"Không được để trống"} />
                                </Item>

                                <Item>
                                    <div>Tên sản phẩm:&nbsp;&nbsp;&nbsp; {selectedProduct ? selectedProduct.uPronam : ""}</div>
                                </Item>
                                <Item>
                                    <div>Bom Version:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {selectedProduct ? selectedProduct.uVersions : ""}</div>
                                </Item>

                                {/* <Item dataField="uVersion" isRequired >
                  <RequiredRule message={"Không được để trống"} />
                </Item> */}
                                <Item dataField='programming' isRequired>
                                    <RequiredRule message={"Không được để trống"} />
                                </Item>
                                <Item dataField='name' isRequired>
                                    <RequiredRule message={"Không được để trống"} />
                                </Item>
                                {/* <SimpleItem dataField="createdAt" isRequired />
                <SimpleItem dataField="updatedAt" isRequired /> */}
                            </Item>
                        </FormProfile>
                    </Editing>

                    <Column width={100} type='buttons' caption={"Tùy chọn"} alignment={"center"}>
                        <Button name={undefined} icon={"activefolder"} onClick={setPopUpOpen} visible={true} />
                        <Button name='edit' />
                        <Button name='delete' />
                    </Column>
                    <Column alignment='left' dataField='id' caption='Id' allowEditing={false} width={100} />
                    <Column dataField='profileCode' dataType='string' />
                    <Column dataField='name' />
                    <Column
                        dataField='uProno'
                        caption='Mã sản phẩm'
                        cellRender={uPronoCellRender}
                        editCellRender={lookupProductOrderItemCellRender}
                    />
                    <Column
                        dataField='uProname'
                        caption='Tên sản phẩm'
                        allowEditing={false}
                        cellRender={uPronameCellRender}
                        editCellRender={lookupProductOrderNameCellRender}
                    />
                    <Column dataField='uVersion' caption='BomVersion' allowEditing={false} cellRender={uVersionCellRender} />
                    <Column dataField='programming' cellRender={programmingCellRender} editCellRender={lookupProgrammingCellRender} />
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
                    <LoadPanel visible={profileLoading} showPane={true} showIndicator={true} message='Đang tải...' />
                </DataGrid>
            </div>
        </div>
    );
});

export default ProfileManager;

registerScreen({
    component: ProfileManager,
    caption: "Quản lý Profile",
    screenId: "screen.ProfileManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
