import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import DataGrid, {
    Column,
    Editing,
    Form,
    HeaderFilter,
    Item as ToolbarItem,
    Paging,
    Popup,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { collection, instance } from "@haulmont/jmix-react-core";
import { print, str } from "../../../utils/utils";
import { Feeder } from "../../../jmix/entities/Feeder";
import axios from "axios";
import { Item } from "devextreme-react/form";
import { PLANNING_API_URL } from "../../../config";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import { confirm, custom } from "devextreme/ui/dialog";
import { DropDownOptions, Lookup } from "devextreme-react/lookup";
import { ProfileDetailPartNumber } from "../../../jmix/entities/ProfileDetailPartNumber";
import { PartNumber } from "../../../jmix/entities/PartNumber";
import { ProgrammingDetail } from "../../../jmix/entities/ProgrammingDetail";
import { Button as StandaloneButton } from "devextreme-react/button";
import { LoadPanel } from "devextreme-react/load-panel";
import { Popup as StandalonePopup } from "devextreme-react/popup";
import ProfileDetailImport from "../../profile/ProfileDetailImport";

// import FeederDropDownBoxComponent from "./FeederDropDownBoxComponent";

const ROUTING_PATH = "/qrFeederManager";

const ProfilePartManager = observer(({ programmingDetail, profile }) => {
    const feederDataCollectionStore = collection<Feeder>(Feeder.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });
    const partNumberCollection = collection<PartNumber>(PartNumber.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });
    const profileDetailPartNumberCollectionStore = collection<ProfileDetailPartNumber>(ProfileDetailPartNumber.NAME, {
        view: "with-all",
        loadImmediately: false,
        filter: {
            conditions: [
                {
                    property: "programmingDetail.id",
                    operator: "=",
                    value: programmingDetail.id,
                },
                { property: "profile.id", operator: "=", value: profile.id },
            ],
        },
    });
    const profileDetailPartNumberInstanceStore = instance<ProfileDetailPartNumber>(ProfileDetailPartNumber.NAME, {
        view: "with-all",
        loadImmediately: false,
    });

    const [profileDetailPartNumberList, setProfileDetailPartNumberList] = useState<ProfileDetailPartNumber[] | undefined>(undefined);
    const [partNumberList, setPartNumberList] = useState<PartNumber[] | null>(null);
    const [dnlnvlLoad, setDnlnvlLoad] = useState<boolean>(false);
    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);

    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };
    const loadProfileDetailPartNumber = async () => {
        await profileDetailPartNumberCollectionStore.load().then((res) => {
            setProfileDetailPartNumberList(profileDetailPartNumberCollectionStore.items);
        });
    };

    const getProgrammingDetailList = async (idPartNumber, idProgramming) => {
        const programmingDetailDataCollectionStore = collection<ProgrammingDetail>(ProgrammingDetail.NAME, {
            loadImmediately: false,
            view: "_base",
            filter: {
                conditions: [
                    { property: "programming.id", operator: "=", value: idProgramming },
                    { property: "partNumber.id", operator: "=", value: idPartNumber },
                ],
            },
        });
        let result: ProgrammingDetail[] | undefined = undefined;
        await programmingDetailDataCollectionStore.load().then((res) => {
            result = programmingDetailDataCollectionStore.items;
        });
        return result;
    };

    const onInsertPartExcute = (profileDetailPartNumbers) => {
        axios
            .post(PLANNING_API_URL + "/rest/entities/ProfileDetailPartNumber", profileDetailPartNumbers, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then(function (response) {
                toastSuccess("Thêm thành công");
                // print(str(response));
                setDnlnvlLoad(false);
                refresh();
            })
            .catch(function () {
                toastError("Có lỗi xảy ra");
                setDnlnvlLoad(false);
            });
    };

    const onInsertPart = async (data) => {
        setDnlnvlLoad(true);
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onInsertQrFeeder`);
            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // print(data);
            // // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let insertData = data.data;
            // TODO query lấy ra toàn bộ programmingdetail có trùng partnumber
            let idPartNumber = programmingDetail?.partNumber.id;

            let idProgramming = programmingDetail?.programming.id;
            let idProfile = profile.id;

            getProgrammingDetailList(idPartNumber, idProgramming)
                .then((res) => {
                    let programmingDetails = res;
                    // TODO lấy danh sách programmingdetail id
                    // Tạo list create
                    let profileDetailPartNumbers: ProfileDetailPartNumber[] = [];
                    // @ts-ignore
                    programmingDetails.map((value, index) => {
                        // print(index);
                        // if (index < 4) {
                        let profileDetailPartNumber: ProfileDetailPartNumber = {};
                        profileDetailPartNumber.partNumber = {
                            id: insertData.partNumber.id,
                        };
                        profileDetailPartNumber.programmingDetail = { id: value.id };
                        profileDetailPartNumber.profile = { id: idProfile };
                        profileDetailPartNumber.type = "0";
                        profileDetailPartNumbers.push(profileDetailPartNumber);
                        // }
                    });
                    // print(profileDetailPartNumbers);

                    onInsertPartExcute(profileDetailPartNumbers);
                })
                .catch((err) => {
                    setDnlnvlLoad(false);
                });

            // profileDetailPartNumberInstanceStore.setItem(profileDetailPartNumbers);
            // profileDetailPartNumberInstanceStore.commit();

            // Tại sao lại có tempUpdate ???
            // Vì để có thể hiển thị đúng kết quả của trường sau khi update, cái GUI devextreme nó bị như vậy
            // Để cho đồng bộ devextreme với jmix
            // let tempInsertPartNumber = insertData.partNumber;

            // insertData.progra
            // print(str(data.data));
            // const checkExistName = await checkExistQrFeeder("name", insertData.name)
            // if (checkExistName) {
            //   toastError("Name đã tồn tại trong hệ thống");
            //   reject("Name đã tồn tại trong hệ thống");
            //   return
            // }
            // alert("IOOKOKOK")

            // insertData.partNumber = tempInsertPartNumber
            // const timeElapsed = Date.now();
            // const today = new Date(timeElapsed);
            // today.setHours(today.getHours() + 7);
            // insertData.createdAt = today.toISOString();
            // data.data = insertData;
            // toastSuccess("Thêm mới thành công");
            resolve(false);
        });
        data.cancel = isCanceled;
    };

    const onEditProfileDetail = (data) => {
        const isCanceled = new Promise(async (resolve, reject) => {
            // print(`onEditQrFeeder`);

            // print(`Dữ liệu thô ${ROUTING_PATH}: `);
            // // data.data.productOrder = this.props.data.data.productOrderId;
            // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
            let updateData = data.newData;
            updateData.id = data.key;

            alert(str(updateData));
            // print(str(updateData));
            // alert(str(updateData));
            // updateData.feeder = { 'feederId': updateData.feeder };

            profileDetailPartNumberInstanceStore.setItem(updateData);
            profileDetailPartNumberInstanceStore.commit();
            toastSuccess("Sửa thông tin thành công");
            refresh();
            resolve(false);
        });
        data.cancel = isCanceled;
    };

    const onRemovePart = (data) => {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa Part?",
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
                    setDnlnvlLoad(true);
                    // print(`onRemoveQrFeeder`);
                    // print(`Dữ liệu thô ${ROUTING_PATH}: `);
                    // print(data);
                    // // data.data.productOrder = this.props.data.data.productOrderId;
                    // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                    const deleteDataId = data.data.id;
                    let idPartNumber = programmingDetail.partNumber.id;
                    let idProgramming = programmingDetail.programming.id;
                    let idProfile = profile.id;
                    // print(str(programmingDetail));
                    axios
                        .get(
                            PLANNING_API_URL +
                                "/services/api/profile/deleteAllSubpart?profileId=" +
                                idProfile +
                                "&programmingId=" +
                                idProgramming +
                                "&partNumberId=" +
                                idPartNumber,
                            {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                                },
                            },
                        )
                        .then(function (response) {
                            toastSuccess("Xóa thành công");
                            // print(str(response));
                            setDnlnvlLoad(false);
                            resolve(false);
                        })
                        .catch(function (error) {
                            toastError("Có lỗi xảy ra");
                            setDnlnvlLoad(false);
                            resolve(false);
                        });
                } else {
                    return resolve(true);
                }
            });
        });
        data.cancel = isCanceled;
    };

    const loadPartNumber = async () => {
        await partNumberCollection.load().then((res) => {
            if (partNumberCollection.items && partNumberCollection.items.length > 0) {
                setPartNumberList(partNumberCollection.items);
            }
        });
    };

    const partNumberCodeCellRender = (data) => {
        if (data.value) return data.value.partNumberCode;
        return "";
    };

    const partNumberVendorCellRender = (data) => {
        if (data.value) return data.value.vendor;
        return "";
    };

    const typeCellRender = (data) => {
        return <div style={{ color: data.value === "1" ? "green" : "blue" }}>{data.value === "1" ? "Part chính" : "Part phụ"}</div>;
    };

    const lookupPartNumberCellRender = (data) => {
        const renderLookUp = (data) => {
            return (
                <div>
                    {data.partNumberCode} | {data.name}
                </div>
            );
        };

        const setEditedValue = (valueChangedEventArg) => {
            data.setValue(valueChangedEventArg.value);
            const dat = partNumberList?.find(({ id }) => id === valueChangedEventArg.value);
            // @ts-ignore
            data.setValue(dat);
        };
        return (
            <>
                {partNumberList && partNumberList.length ? (
                    <div>
                        <Lookup
                            dataSource={partNumberList}
                            displayExpr='name'
                            valueExpr='id'
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

    const partNameCellRender = (data) => {
        if (data.value) return data.value.name;
        return "";
    };

    const popUpImportRender = () => {
        return <ProfileDetailImport />;
    };

    const refresh = () => {
        loadProfileDetailPartNumber();
        // .then(res => toastSuccess("Tải thành công")).catch(err => toastError("Tải thất bại"));
    };

    useEffect(() => {
        loadProfileDetailPartNumber();
        loadPartNumber();
    }, []);

    return (
        <div>
            <StandalonePopup
                visible={popupImportIsOpen ? popupImportIsOpen : false}
                // onShowing={on}
                onHiding={setPopUpImportClose}
                title='Import'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpImportRender}></StandalonePopup>

            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={{ of: "#profilepartmanager" }}
                visible={dnlnvlLoad}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={false}
                message='Đang tải...'
            />

            <div>
                <div
                    className='informer'
                    style={{
                        textAlign: "center",
                        background: "#fff",
                    }}>
                    <h5
                        style={{
                            fontSize: 18,
                            marginBottom: 0,
                        }}>
                        DANH SÁCH PART ĐANG ĐƯỢC SỬ DỤNG
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
                    rowAlternationEnabled={true}
                    onRowInserting={onInsertPart}
                    onRowUpdating={onEditProfileDetail}
                    onRowRemoving={onRemovePart}
                    dataSource={profileDetailPartNumberList}
                    keyExpr='id'
                    focusedRowEnabled={true}
                    showBorders={true}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Toolbar>
                        {/*<ToolbarItem location="center">*/}
                        {/*  <div className="informer">*/}
                        {/*    <h5>DANH SÁCH PART ĐANG ĐƯỢC SỬ DỤNG</h5>*/}
                        {/*  </div>*/}
                        {/*</ToolbarItem>*/}
                        <ToolbarItem location='after'>
                            <StandaloneButton hint='Refresh' icon='refresh' onClick={refresh} />
                        </ToolbarItem>
                        <ToolbarItem name='addRowButton' />
                        <ToolbarItem name='revertButton' />
                        <ToolbarItem name='saveButton' />
                        <ToolbarItem name='searchPanel' location='before' />
                        <ToolbarItem name='columnChooserButton'></ToolbarItem>
                    </Toolbar>
                    <SearchPanel visible={true} width={300} placeholder='Nhập thông tin và ấn Enter để tìm kiếm' />
                    <Paging enabled={true} />
                    <Editing
                        mode={"batch"}
                        useIcons={true}
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}
                        texts={{
                            addRow: "Thêm",
                        }}>
                        <Popup title='Thông tin Qr Feeder' showTitle={true} width={700} height={525} />
                        <Form>
                            <Item dataField='type' caption='Loại' />
                        </Form>
                    </Editing>
                    {/*<Column dataField="profileDetail" cellRender={profileDetailCellRender} />*/}
                    {/*<Column dataField="id" caption="Id" width="50" allowEditing={false}/>*/}
                    <Column
                        dataField='partNumber'
                        caption='Part Number Code'
                        cellRender={partNumberCodeCellRender}
                        editCellRender={lookupPartNumberCellRender}
                    />
                    <Column dataField='partNumber' caption='Part Name' cellRender={partNameCellRender} allowEditing={false} />
                    <Column dataField='partNumber' caption='Vendor' cellRender={partNumberVendorCellRender} allowEditing={false} />
                    <Column dataField='type' caption='Loại' cellRender={typeCellRender} allowEditing={false} />
                </DataGrid>
            </div>
        </div>
    );
});

export default ProfilePartManager;
