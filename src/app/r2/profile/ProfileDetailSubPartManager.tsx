import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { Button as StandaloneButton } from "devextreme-react/button";
import { Popup } from "devextreme-react/popup";
import { Form, Item, SimpleItem } from "devextreme-react/form";
import { onStatusRender, print, str } from "../../../utils/utils";
import { DropDownOptions, Lookup } from "devextreme-react/lookup";
import { PartNumber } from "../../../jmix/entities/PartNumber";
import { collection, instance } from "@haulmont/jmix-react-core";
import { ProfileDetailPartNumber } from "../../../jmix/entities/ProfileDetailPartNumber";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import { confirm } from "devextreme/ui/dialog";
import { PLANNING_API_URL } from "../../../config";
import { ProgrammingDetail } from "../../../jmix/entities/ProgrammingDetail";
import axios from "axios";

export const ProfileDetailSubPartManager = observer(
    ({ profileCurrentCell, currentSubPartNumber, currentMainPartNumber, loadPartNumberByProgrammingId }) => {
        const changeTextDefaultPopup = useRef<DataGrid>(null);

        const [searchByText, setSearchByText] = useState("");
        const [partNumberList, setPartNumberList] = useState<PartNumber[] | null>(null);

        const partNumberCollection = collection<PartNumber>(PartNumber.NAME, {
            view: "_base",
            loadImmediately: false,
            // sort: 'order'
        });

        const profileDetailPartNumberInstanceStore = instance<ProfileDetailPartNumber>(ProfileDetailPartNumber.NAME, {
            view: "with-all",
            loadImmediately: false,
        });
        const onOptionChangedSearchByText = (e) => {
            if (e.name === "searchPanel" && e.fullName === "searchPanel.text") {
                const searchPanelText = e.value.trim();
                setSearchByText(searchPanelText);
            }
        };

        const loadPartNumber = async () => {
            await partNumberCollection.load().then((res) => {
                if (partNumberCollection.items && partNumberCollection.items.length > 0) {
                    setPartNumberList(partNumberCollection.items);
                }
            });
        };

        const refresh = () => {
            if (currentMainPartNumber) {
                loadPartNumberByProgrammingId(currentMainPartNumber.id);
            } else {
                toastError("Vui lòng chọn part chính");
            }
        };

        const partNameCellRender = (data) => {
            if (data.value) return data.value;
            return "";
        };

        const partNumberCellVendorRender = (cell) => {
            if (cell.data && cell.data.vendor) return cell.data.vendor;
            return "";
        };

        const partNumberVendorCellRender = (data) => {
            if (data.value) return data.value.vendor;
            return "";
        };

        const partNumberCellLibraryNameRender = (data) => {
            if (data.value) return data.value.partLibraryName;
            return "";
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
                    // setDnlnvlLoad(false);
                    refresh();
                })
                .catch(function () {
                    toastError("Có lỗi xảy ra");
                    // setDnlnvlLoad(false);
                });
        };

        const findPartNumber = (name) => {
            return partNumberList?.find((v) => v.name === name);
        };

        const onInsertPart = async (data) => {
            // setDnlnvlLoad(true);

            const isCanceled = new Promise(async (resolve, reject) => {
                // print(`onInsertQrFeeder`);
                // print(`Dữ liệu thô ${ROUTING_PATH}: `);
                // print(data);
                // // data.data.productOrder = this.props.data.data.productOrderId;
                // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);
                let insertData = data.data;
                // TODO query lấy ra toàn bộ programmingdetail có trùng partnumber
                let idPartNumber = currentMainPartNumber.id;
                let idProgramming = profileCurrentCell?.programming.id;
                let idProfile = profileCurrentCell.id;

                getProgrammingDetailList(idPartNumber, idProgramming)
                    .then((res) => {
                        let programmingDetails = res;
                        // TODO lấy danh sách programmingdetail id
                        // Tạo list create
                        let profileDetailPartNumbers: ProfileDetailPartNumber[] = [];
                        // @ts-ignore
                        programmingDetails.map((value, index) => {
                            const partNumber = findPartNumber(insertData.name);
                            if (partNumber !== undefined) {
                                // if (index < 4) {
                                let profileDetailPartNumber: ProfileDetailPartNumber = {};
                                profileDetailPartNumber.partNumber = {
                                    id: partNumber.id,
                                };
                                profileDetailPartNumber.programmingDetail = { id: value.id };
                                profileDetailPartNumber.profile = { id: idProfile };
                                profileDetailPartNumber.type = "0";
                                profileDetailPartNumbers.push(profileDetailPartNumber);
                            } else {
                                print("Có lỗi xảy ra không tìm thấy part để insert");
                            }
                            // }
                        });
                        // print(profileDetailPartNumbers);
                        onInsertPartExcute(profileDetailPartNumbers);
                    })
                    .catch((err) => {
                        // setDnlnvlLoad(false);
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
                const promptPromise = confirm("Bạn có muốn xóa sub part này không?", "Xác nhận thay đổi");
                promptPromise.then((dialogResult) => {
                    if (dialogResult) {
                        // setDnlnvlLoad(true);
                        // print(`onRemoveQrFeeder`);
                        // print(`Dữ liệu thô ${ROUTING_PATH}: `);
                        // print(data);
                        // // data.data.productOrder = this.props.data.data.productOrderId;
                        // print(`Dữ liệu sau khi xử lý ${ROUTING_PATH}: `);

                        const deleteDataId = data.data.id;
                        let idPartNumber = currentMainPartNumber.id;
                        let idProgramming = profileCurrentCell.programming.id;
                        let idProfile = profileCurrentCell.id;
                        // print(str(programmingDetail));
                        axios
                            .get(
                                PLANNING_API_URL +
                                    "/services/api/profile/deleteAllSubpart?profileId=" +
                                    idProfile +
                                    "&programmingId=" +
                                    idProgramming +
                                    "&partNumberId=" +
                                    deleteDataId,
                                {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                                    },
                                },
                            )
                            .then(function (response) {
                                toastSuccess("Xóa thành công");
                                // print(str(response));
                                // setDnlnvlLoad(false);
                                resolve(false);
                            })
                            .catch(function (error) {
                                toastError("Có lỗi xảy ra");
                                // setDnlnvlLoad(false);
                                resolve(false);
                            });
                    } else {
                        return resolve(true);
                    }
                });
            });
            data.cancel = isCanceled;
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
                data.setValue(dat.name);
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

        useEffect(() => {
            loadPartNumber();
        }, []);

        return (
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
                        PART PHỤ
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
                        dataSource={currentSubPartNumber}
                        keyExpr='id'
                        onRowInserting={onInsertPart}
                        onRowUpdating={onEditProfileDetail}
                        onRowRemoving={onRemovePart}
                        // onRowInserting={onInsertProfileDetail}
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
                            mode={"batch"}
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
                            <Popup title='Thông tin Part Number' showTitle={true} width={700} height={525} />
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
                        {/*<Column type="buttons" caption={'Tùy chọn'} alignment={'center'}>*/}
                        {/*<Button name="edit" visible={onVisibleEdit}/>*/}
                        {/*<Button name="delete" visible={onVisibleDelete}/>*/}
                        {/*</Column>*/}

                        <Column alignment='left' dataField='id' caption='Id' allowEditing={false} />
                        <Column
                            dataField='name'
                            caption='Part Name'
                            cellRender={partNameCellRender}
                            editCellRender={lookupPartNumberCellRender}
                            // allowEditing={false}
                        />
                        <Column
                            dataField='partLibraryName'
                            caption='Part Library Name'
                            cellRender={partNumberCellLibraryNameRender}
                            allowEditing={false}
                        />

                        <Column dataField='vendor' caption='Vendor' cellRender={partNumberVendorCellRender} allowEditing={false} />

                        <Column dataField='type' cellRender={onStatusRender} allowEditing={false} alignment='left'></Column>
                    </DataGrid>
                ) : (
                    ""
                )}
            </div>
        );
    },
);
