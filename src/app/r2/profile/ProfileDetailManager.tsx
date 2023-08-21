import { observer } from "mobx-react";
import ScrollView from "devextreme-react/scroll-view";
import { Form, GroupItem, SimpleItem } from "devextreme-react/form";
import InfoRow from "../../../utils/InfoRow";
import InfoTableRow from "../../../utils/InfoTableRow";
import DataGrid, {
    Column,
    ColumnChooser,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    MasterDetail,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { Button as StandaloneButton } from "devextreme-react/button";
import { onStatusRender, print, str } from "../../../utils/utils";
import React, { useEffect, useState } from "react";
import { PartNumber } from "../../../jmix/entities/PartNumber";
import { PLANNING_API_URL } from "../../../config";
import { DropDownOptions, Lookup } from "devextreme-react/lookup";
import axios from "axios";
import { collection, instance, useMainStore } from "@haulmont/jmix-react-core";
import { Profile } from "../../../jmix/entities/Profile";
import { ProductOrderItem } from "../../../jmix/entities/ProductOrderItem";
import { Programming } from "../../../jmix/entities/Programming";
import { ProgrammingDetail } from "../../../jmix/entities/ProgrammingDetail";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import { ProfileDetail } from "../../../jmix/entities/ProfileDetail";
import ProfilePartManager from "./ProfilePartManager";
import { ProfileDetailSubPartManager } from "./ProfileDetailSubPartManager";

export const ProfileDetailManager = observer(({ profileCurrentCell }) => {
    const mainStore = useMainStore();
    const [currentPartNumber, setCurrentPartNumber] = useState<PartNumber | undefined>();
    const [currentSubPartNumber, setCurrentSubPartNumber] = useState<PartNumber[]>();
    const [profileList, setProfileList] = useState<Profile[] | undefined>(undefined);
    const [searchByText, setSearchByText] = useState("");

    const profileDetailInstanceStore = instance<ProfileDetail>(ProfileDetail.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const [currentProduct, setCurrentProduct] = useState<ProductOrderItem | null>(null);

    const profileDataCollectionStore = collection<Profile>(Profile.NAME, {
        view: "with-profileDetail",
        sort: "-updatedAt",
        loadImmediately: false, // sort: 'order'
    });

    const [currentProgrammingDetailList, setCurrentProgrammingDetailList] = useState<ProgrammingDetail[] | undefined>(undefined);
    const [currentListPartNumber, setCurrentListPartNumber] = useState<PartNumber[]>();

    const [currentProgramming, setCurrentProgramming] = useState<Programming | null>(profileCurrentCell.programming);

    const [tempProduct, setTempProduct] = useState<string>(
        str({
            productName: profileCurrentCell?.uProname,
            productCode: profileCurrentCell?.uProno,
            bomVersion: profileCurrentCell?.uVersion,
        }),
    );
    const [partNumberList, setPartNumberList] = useState<PartNumber[] | null>(null);

    const partNumberCollection = collection<PartNumber>(PartNumber.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });

    const loadPartNumber = async () => {
        await partNumberCollection.load().then((res) => {
            if (partNumberCollection.items && partNumberCollection.items.length > 0) {
                setPartNumberList(partNumberCollection.items);
            }
        });
    };

    const onOptionChangedSearchByText = (e) => {
        if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
            const searchPanelText = e.value.trim();
            setSearchByText(searchPanelText);
        }
    };
    const loadPartNumberByProgrammingId = async (id) => {
        print("hhjsdgfhgsvdfjhgvsdjhfasjkdgfsagdfkjashdgbfujasgdf");

        if (id) {
            await axios
                .get(PLANNING_API_URL + "/services/api/programing/part-number/" + id, {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                })
                .then((res) => {
                    print("KOKOOKOKOKKO44444");
                    print(res.data);
                    print(str(res.data));
                    setCurrentListPartNumber(res.data);
                    // setCurrentDnlnvlDetails(res.data)
                    // console.log("dataaa", res.data);
                })
                .catch((res) => {
                    console.log("error", res);
                });
        }
    };
    const getListSubPart = async (mainPart) => {
        await axios
            .get(
                PLANNING_API_URL +
                    "/services/api/programing/getListSubPartNumber?mainPart=" +
                    mainPart +
                    "&profileId=" +
                    profileCurrentCell?.id,
                {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                },
            )
            .then(function (response) {
                setCurrentSubPartNumber(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
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
            const dat = partNumberList?.find(({ name }) => name === valueChangedEventArg.value);
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
                            valueExpr='name'
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
    const onChangePartNumber = (e) => {
        // print("Hello")
        if (e.row.data) {
            setCurrentPartNumber(e.row.data);
            getListSubPart(e.row.data.id);
        }
    };

    const loadProfile = async () => {
        await profileDataCollectionStore.load().then((res) => {
            setProfileList(profileDataCollectionStore.items);
        });
    };
    const partNumberCodeCellRender = (data) => {
        if (data.value) return data.value.partNumberCode;
        return "";
    };

    const refresh = async () => {
        loadProfile();
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
    const renderPartNameCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const profilePartManager = (e) => {
        return <ProfilePartManager programmingDetail={e.data.data} profile={profileCurrentCell} />;
    };

    const loadListProgrammingDetail = async (programmingId) => {
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

    useEffect(() => {
        loadListProgrammingDetail(currentProgramming?.id);
        loadPartNumberByProgrammingId(profileCurrentCell?.id);
        // setCurrentSubPartNumber([])
    }, [profileCurrentCell]);

    return (
        <div id='profilepartmanager' style={{ height: "100%" }}>
            <ScrollView height={"100%"}>
                <Form colCount={3} alignItemLabels={true}>
                    <GroupItem colSpan={3} colCount={2} caption='Thông tin chung'>
                        <SimpleItem colSpan={1}>
                            <div className={"dx-fieldset"}>
                                <div className='dx-fieldset-header'>Thông tin Product</div>
                                {currentProduct ? (
                                    <>
                                        <table>
                                            <InfoRow label={"Mã sản phẩm "} data={currentProduct.productCode} />
                                            <InfoRow label={"Tên sản phẩm"} data={currentProduct.productName} />
                                            <InfoRow label={"Bom version"} data={currentProduct.bomVersion} />
                                        </table>
                                    </>
                                ) : (
                                    <>
                                        <table>
                                            <InfoRow label={"Mã sản phẩm"} data={profileCurrentCell.uProno} />
                                            <InfoRow label={"Tên sản phẩm"} data={profileCurrentCell.uProname} />
                                            <InfoRow label={"Bom version"} data={profileCurrentCell.uVersion} />
                                        </table>
                                    </>
                                )}
                            </div>
                        </SimpleItem>
                        <SimpleItem colSpan={1}>
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
                    </GroupItem>
                    <GroupItem colSpan={3} colCount={2} caption='Thông tin part'>
                        <SimpleItem colSpan={1}>
                            <div>
                                <div
                                    className='informer'
                                    style={{
                                        background: "#fff",
                                        marginBottom: "0px",
                                    }}>
                                    <h5
                                        className='name'
                                        style={{
                                            marginBottom: 0,
                                            fontSize: 18,
                                        }}>
                                        PART CHÍNH{" "}
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
                                {profileCurrentCell ? (
                                    <DataGrid
                                        keyExpr='id'
                                        showColumnLines={true}
                                        showRowLines={true}
                                        rowAlternationEnabled={true}
                                        columnAutoWidth={true}
                                        repaintChangesOnly={true}
                                        showBorders={true}
                                        allowColumnResizing={true}
                                        allowColumnReordering={true}
                                        focusedRowEnabled={true}
                                        // onSelectionChanged={}
                                        // onSelectedRowKeysChange={onChangePartNumber}
                                        // onCellHoverChanged={onChangePartNumber}
                                        onFocusedRowChanged={onChangePartNumber}
                                        dataSource={currentListPartNumber}
                                        onOptionChanged={onOptionChangedSearchByText}
                                        noDataText='Không có dữ liệu để hiển thị'>
                                        <Toolbar>
                                            <ToolbarItem location='after'>
                                                <StandaloneButton icon='refresh' hint='Refresh' onClick={refresh} />
                                            </ToolbarItem>
                                            <ToolbarItem name='addRowButton' />
                                            <ToolbarItem name='revertButton' />
                                            <ToolbarItem name='saveButton' />
                                            <ToolbarItem name='searchPanel' location='before' />
                                            {/*<ToolbarItem name="columnChooserButton"></ToolbarItem>*/}
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
                                        <Column alignment='left' dataField='id' caption='Id' allowEditing={false} />
                                        <Column dataField='name'></Column>
                                        <Column dataField='partLibraryName'></Column>
                                        <Column
                                            dataField='vendor'
                                            // editCellRender={autoCompleteVendorCellRender}
                                        ></Column>
                                        <Column dataField='type' cellRender={onStatusRender} allowEditing={false} alignment='left'></Column>
                                    </DataGrid>
                                ) : (
                                    ""
                                )}
                            </div>
                        </SimpleItem>
                        <SimpleItem colSpan={1}>
                            <ProfileDetailSubPartManager
                                profileCurrentCell={profileCurrentCell}
                                currentSubPartNumber={currentSubPartNumber}
                                currentMainPartNumber={currentPartNumber}
                                loadPartNumberByProgrammingId={getListSubPart}
                            />
                        </SimpleItem>
                    </GroupItem>
                    <GroupItem colSpan={3} caption='Profile Detail'>
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
                                    PROGRAMMING DETAIL
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
                            {profileCurrentCell ? (
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
                                    dataSource={currentProgrammingDetailList}
                                    keyExpr='id'
                                    onRowInserting={onInsertProfileDetail}
                                    onOptionChanged={onOptionChangedSearchByText}
                                    noDataText='Không có dữ liệu để hiển thị'>
                                    <Toolbar>
                                        {/* <ToolbarItem location="center">
                        <div className="informer">
                          <h5>PROGRAMMING DETAIL</h5>
                        </div>
                      </ToolbarItem> */}
                                        <ToolbarItem name='addRowButton' />
                                        <ToolbarItem name='revertButton' />
                                        <ToolbarItem name='saveButton' />
                                        <ToolbarItem name='searchPanel' location='before' />
                                        <ToolbarItem name='columnChooserButton'></ToolbarItem>
                                    </Toolbar>
                                    <HeaderFilter
                                        visible={true}
                                        allowSearch={true}
                                        texts={{
                                            cancel: "Hủy bỏ",
                                            ok: "Đồng ý",
                                            emptyValue: "Rỗng",
                                        }}
                                    />
                                    <SearchPanel
                                        visible={true}
                                        width={240}
                                        placeholder='VD: 20L'
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
                                    -
                                    <Column dataField='id' caption='Id' width={"150"} allowEditing={false} alignment='left' />
                                    <Column dataField='lane' caption='Lane' cellRender={renderLaneCell} />
                                    <Column dataField='machine' caption='Machine' cellRender={renderMachineCell} />
                                    <Column dataField='qrFeeder' caption=' Qr Feeder Code' cellRender={renderQrFeederCell} />
                                    {/*<Column*/}
                                    {/*  dataField="partNumber"*/}
                                    {/*  caption="Part"*/}
                                    {/*  cellRender={renderPartNumberCell}*/}
                                    {/*/>*/}
                                    <Column
                                        dataField='partNumber'
                                        caption='Part Name'
                                        cellRender={renderPartNameCell}
                                        allowEditing={false}
                                    />
                                    <Column dataField='slot' caption='Slot Area' />
                                    <Column dataField='subslot' caption='Subslot' />
                                    <Column dataField='side' caption='Mặt' />
                                    <Column dataField='partten' caption='Partten' />
                                    <Column dataField='note' caption='Note' />
                                    <Column
                                        dataField='createdAt'
                                        caption='Ngày tạo '
                                        dataType='datetime'
                                        format='dd/MM/yyyy hh:mm:ss'
                                        allowEditing={false}
                                    />
                                    <MasterDetail enabled={true} component={profilePartManager} />
                                </DataGrid>
                            ) : (
                                ""
                            )}
                        </div>
                    </GroupItem>
                </Form>
            </ScrollView>
        </div>
    );
});
