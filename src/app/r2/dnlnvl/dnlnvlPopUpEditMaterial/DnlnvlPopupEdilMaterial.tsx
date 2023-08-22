import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import {
    Column,
    ColumnChooser,
    DataGrid,
    Editing,
    FilterRow,
    Grouping,
    GroupPanel,
    HeaderFilter,
    Item as DataGripToolbarItem,
    LoadPanel as DataGridLoadPanel,
    OperationDescriptions,
    Pager,
    Paging,
    Selection,
    Toolbar,
} from "devextreme-react/data-grid";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import _ from "lodash";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import InfoTableRow from "../../../../utils/InfoTableRow";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { copy, print } from "../../../../utils/utils";
import { Button } from "devextreme-react/button";
import { useMainStore } from "@haulmont/jmix-react-core";
import LocationComp from "./LocationComp";
import { LoadPanel } from "devextreme-react";
import Box, { Item } from "devextreme-react/box";
import ScrollView from "devextreme-react/scroll-view";
import { set } from "mobx";

const DnlnvlPopupEditMaterial = observer(({ dnlnvlDetail, popupIsOpen, setPopUpIsOpen, updateStillNeed = () => {} }) => {
    // console.log("dnlnvlDetail dnlnvl edit material", dnlnvlDetail);

    const mainStore = useMainStore();

    const [listMaterialAvailable, setListMaterialAvailable] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    const [listChooseMaterial, setListChooseMaterial] = useState<DnlnvlDetailDetail[] | undefined>();
    const [listChooseMaterialKeys, setListChooseMaterialKeys] = useState<number[] | undefined>();
    const [stillNeed, setStillNeed] = useState<number | undefined>(dnlnvlDetail.stillNeed);
    const [estTotalQty, setEstTotalQty] = useState<number | undefined>(dnlnvlDetail.estTotalQty);
    const [dnlnvlLoad, setDnlnvlLoad] = useState<boolean>(false);

    const dataMaterialRef = useRef<DataGrid>(null);

    const setPopUpModifyDnlnvlClose = () => {
        updateStillNeed();
        setPopUpIsOpen(false);
        setListChooseMaterialKeys(undefined);
        setListChooseMaterial(undefined);
        setListMaterialAvailable(undefined);
        setStillNeed(undefined);
        setEstTotalQty(undefined);
    };

    const renderPartNumberCell = (data) => {
        return <div>{data.value?.partNumberCode}</div>;
    };

    const getAvailableMaterial = async () => {
        setDnlnvlLoad(true);
        await axios
            .get(PLANNING_API_URL + "/services/api/dnlnvl/get-available-material/" + dnlnvlDetail.id, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((res) => {
                const listDnlnvlDetailMaterialExist: DnlnvlDetailDetail[] | undefined = copy(res.data).filter(
                    (value) => value.isBelongToDnlnvlDetail == 1,
                );
                // print(listDnlnvlDetailMaterialExist);
                const listDnlnvlDetailMaterialExistKeys: number[] | undefined = listDnlnvlDetailMaterialExist?.map((value) =>
                    value.id ? parseInt(value.id) : 0,
                );
                setListChooseMaterialKeys(listDnlnvlDetailMaterialExistKeys);
                setListChooseMaterial(listDnlnvlDetailMaterialExist);
                setListMaterialAvailable(res.data);
                setStillNeed(dnlnvlDetail.stillNeed);
                setEstTotalQty(dnlnvlDetail.estTotalQty);
                setDnlnvlLoad(false);
            })
            .catch((res) => {
                toastError("Gửi thất bại");
                setDnlnvlLoad(false);
                setPopUpIsOpen(false);
            });
    };

    const refresh2 = async () => {
        await getAvailableMaterial();
    };

    async function syncMaterialmanual() {
        try {
            setDnlnvlLoad(true);
            const res = await axios.post(
                `${PLANNING_API_URL}/services/api/dnlnvl/manual-sync-material`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                },
            );
            console.log(res);
            refresh2();
        } catch (error) {
            toastError("Có lỗi xảy ra");
        }
    }

    const popUpContentModifyDnlnvlRender = (props) => {
        const onSelectionChangedContentModifyDnlnvl = (e) => {
            setDnlnvlLoad(true);
            let selectedRowsData = e.selectedRowsData;
            print(e);
            if (stillNeed === undefined) {
                toastError("Có lỗi xảy ra");
                return;
            }

            // if (stillNeed && stillNeed < 0 && listChooseMaterial && selectedRowsData.length > listChooseMaterial?.length) {
            //   toastError("Bạn đang reserved quá số lượng cần thiết");
            //   return
            // }

            let tempListChooseMaterial: DnlnvlDetailDetail[] | undefined = listMaterialAvailable;

            e.currentDeselectedRowKeys.forEach((key: string, index: number) => {
                tempListChooseMaterial = tempListChooseMaterial?.map((dnlnvlDetailAvaible, i) => {
                    if (dnlnvlDetailAvaible.id === key) {
                        dnlnvlDetailAvaible.stillNeed = null;
                    }
                    return dnlnvlDetailAvaible;
                });
            });

            //calculate total reserved qty
            const currentReserveQty = _.sumBy(selectedRowsData, function (dnlnvlDetailChoose) {
                return dnlnvlDetailChoose.reserveQty;
            });

            let stillNeedPerMaterial = dnlnvlDetail.estTotalQty;
            selectedRowsData = e.selectedRowsData.map((dnlnvlDetailChoose, index) => {
                stillNeedPerMaterial -= dnlnvlDetailChoose.reserveQty;
                dnlnvlDetailChoose.stillNeed = stillNeedPerMaterial;
                return dnlnvlDetailChoose;
            });

            setEstTotalQty(currentReserveQty);
            setStillNeed(dnlnvlDetail.estTotalQty - currentReserveQty);
            setListChooseMaterialKeys(e.selectedRowKeys);
            setListChooseMaterial(selectedRowsData);
            setListMaterialAvailable(tempListChooseMaterial);
            dataMaterialRef.current?.instance.refresh(true).then(() => {});
            setDnlnvlLoad(false);
        };

        const filterByLocation = (filterExp: any) => {
            if (filterExp) {
                dataMaterialRef.current?.instance.filter(filterExp);
            } else {
                dataMaterialRef.current?.instance.clearFilter();
            }
        };

        const statusCellRender = (cell) => {
            return cell.value == 3 ? "Khả dụng" : "Không khả dụng";
        };

        return (
            <Box id={"dnhjbdf"} style={{ height: "100%" }}>
                <Item ratio={1}>
                    <ScrollView width='100%' height='100%'>
                        <Box style={{ background: "lightgray", padding: "10px", borderRadius: "8px" }}>
                            <Item ratio={1}>
                                <h2>KHUYẾN NGHỊ</h2>
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <InfoTableRow label={"id"} data={dnlnvlDetail.id} />
                                        <InfoTableRow label={"Part Number Code"} data={dnlnvlDetail.partNumber.partNumberCode} />
                                        <InfoTableRow label={"Name"} data={dnlnvlDetail.partNumber.name} />
                                        <InfoTableRow label={"Est Reqd Qty"} data={dnlnvlDetail.estReqdQty} />
                                        <InfoTableRow label={"Buffer Qty"} data={dnlnvlDetail.bufferQty} />
                                        <InfoTableRow label={"Reserve Qty "} data={dnlnvlDetail.estTotalQty} />
                                        <InfoTableRow label={"Current Reserve Qty "} data={estTotalQty} />
                                        <div
                                            style={{
                                                background: stillNeed !== undefined && stillNeed <= 0 ? "#06BE18" : "#E51C0F",
                                                color: "white",
                                                borderRadius: "8px",
                                            }}>
                                            <InfoTableRow label={"Still Need"} data={stillNeed} />
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Box>
                        <div style={{ height: "80%" }}>
                            <LoadPanel visible={dnlnvlLoad} showPane={true} showIndicator={true} message='Đang tải...' />
                            <LocationComp updateLocations={filterByLocation} />
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
                                onSelectionChanged={onSelectionChangedContentModifyDnlnvl}
                                // defaultSelectionFilter={selectionFilter}
                                height={"100%"}
                                dataSource={listMaterialAvailable}
                                keyExpr='id'
                                selectedRowKeys={listChooseMaterialKeys}
                                ref={dataMaterialRef}
                                noDataText='Không có dữ liệu để hiển thị'>
                                <Toolbar>
                                    <DataGripToolbarItem>
                                        <Button onClick={syncMaterialmanual} hint='Đồng bộ danh sách NVL' icon='pulldown' />
                                    </DataGripToolbarItem>
                                    <DataGripToolbarItem name='columnChooserButton'></DataGripToolbarItem>
                                    <DataGripToolbarItem>
                                        <Button onClick={refresh2} icon='refresh' hint='Refresh' />
                                    </DataGripToolbarItem>
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
                                <HeaderFilter visible={true} />
                                <Paging enabled={true} defaultPageSize={30} />
                                <Pager
                                    visible={true}
                                    displayMode={"full"}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    allowedPageSizes={[5, 30]}
                                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                />
                                <Selection
                                    mode='multiple'
                                    // allowSelectAll={false}
                                    // deferred={true}
                                    showCheckBoxesMode={"onClick"}
                                />
                                {/* <Scrolling mode={"virtual"} columnRenderingMode="virtual" /> */}
                                <Editing />
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
                                        //
                                    }}
                                />
                                {/* <Column dataField="id" caption={"Id"} /> */}
                                <Column visible={false} dataField='id' caption='Id' alignment={"left"} />
                                <Column dataField='material' caption='Material Id' alignment={"left"} />
                                <Column dataField='materialName' caption='Material Name' />
                                <Column dataField='reserveQty' caption='Reserve Qty' alignment={"left"} />
                                <Column dataField='stillNeed' caption='Still Need' />
                                {/*<Column dataField="partNumber" caption="Part Code" cellRender={renderPartNumberCell}/>*/}
                                <Column dataField='partNumber' caption='Part Name' cellRender={renderPartNumberNameCell} />
                                <Column dataField='rankAp' caption='rankAp' />
                                <Column dataField='rankMau' caption='rankMau' />
                                <Column dataField='rankQuang' caption='rankQuang' dataType='string' />
                                <Column dataField='userData4' caption='userData4' dataType='string' />
                                <Column dataField='userData5' caption='userData5' />
                                <Column dataField='materialState' caption='Material State' />
                                <Column dataField='locationType' caption='Location (Type)' />
                                <Column dataField='status' caption='Trạng thái' alignment={"left"} cellRender={statusCellRender} />
                                <DataGridLoadPanel enabled={dnlnvlLoad} />
                            </DataGrid>
                        </div>
                    </ScrollView>
                </Item>
            </Box>
        );
    };

    const onInsertDnlnvlDetail = async () => {
        await axios
            .post(PLANNING_API_URL + "/services/api/dnlnvl/modify-material/" + dnlnvlDetail.id, listChooseMaterial, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((res) => {
                toastSuccess("Thay đổi material thành công");
                setPopUpIsOpen(false);
            })
            .catch((res) => {
                toastError("Gửi thất bại");
            });
    };

    const renderPartNumberNameCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const onShowingActive = async () => {
        setDnlnvlLoad(true);
        await getAvailableMaterial();
    };

    useEffect(() => {
        if (popupIsOpen === true) {
            onShowingActive();
        }
    }, [popupIsOpen]);

    return (
        <div id='data-grid-demo'>
            <Popup
                visible={popupIsOpen ? popupIsOpen : false}
                // onShowing={onShowingActive}
                onHiding={setPopUpModifyDnlnvlClose}
                title={`Danh sách các nguyên vật liệu khả dụng cho part (${dnlnvlDetail.partNumber.name}) ở vị trí (${
                    dnlnvlDetail.slot + dnlnvlDetail.locationFrontRear
                })`}
                showTitle={true}
                fullScreen={true}
                contentRender={popUpContentModifyDnlnvlRender}
                resizeEnabled={true}
                dragEnabled={false}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        stylingMode: "outlined",
                        onClick: setPopUpModifyDnlnvlClose,
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Lưu lại",
                        type: "default",
                        onClick: onInsertDnlnvlDetail,
                    }}
                />
                {/**/}
            </Popup>
        </div>
    );
});

export default DnlnvlPopupEditMaterial;
