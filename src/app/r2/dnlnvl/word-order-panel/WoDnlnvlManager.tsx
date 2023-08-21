import React, { useEffect, useRef, useState } from "react";
import DropDownButton from "devextreme-react/drop-down-button";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    ColumnChooser,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem1,
    MasterDetail,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    ToolbarItem,
} from "devextreme-react/data-grid";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Button } from "devextreme-react/button";
import { Popup } from "devextreme-react/popup";
import { toastError } from "../../../../utils/ToastifyManager";
import DnlnvlPanelManager from "../dnlnvlPanel/DnlnvlPanelManager";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { LoadPanel } from "devextreme-react/load-panel";
import { ScrollView } from "devextreme-react";
import DnlnvlAddPanacim from "../dnlnvlPanel/DnlnvlAddPanacim";
import CustomStore from "devextreme/data/custom_store";
import { LoadOptions } from "devextreme/data";
import { mappingFilterDevextreme } from "../../../../utils/utils";

import { useAppDispatch } from "../../../../hooks";
import { filterDnlnvlList } from "./../dnlnvlListSlice";
import { toJS } from "mobx";
import DnlnvlViewMasterDetail from "../dnlnvlView/DnlnvlViewMasterDetail";

const WoDnlnvlManager = observer(() => {
    const workOrderStateCollection = useCollection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "with-profile-programming",
        sort: "-latestTimeCreateDnlnvl",
        filter: {
            conditions: [
                { property: "workOrderType", operator: "in", value: ["LINE", "LOT"] },
                { property: "latestTimeCreateDnlnvl", operator: "notEmpty", value: null },
            ],
        },
        loadImmediately: false,
    });
    const mainStore = useMainStore();

    const dispatch = useAppDispatch();

    const [workOrder, setWorkOrder] = useState<PlanningWorkOrder[] | undefined>(undefined);
    const [currentWorkOrder, setCurrentWorkOrder] = useState<PlanningWorkOrder | undefined>(undefined);
    const [currentWorkOrderStat, setCurrentWorkOrderStat] = useState<PlanningWorkOrder | undefined>(undefined);
    const [currentDnlnvlDetailDetails, setCurrentDnlnvlDetailDetails] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    const [popupStatPanelIsOpen, setPopupStatPanelIsOpen] = useState<boolean>(false);
    const [popupCreateDnlIsOpen, setPopupCreateDnlIsOpen] = useState<boolean>(false);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
    const [addR2, setAddR2] = useState<boolean>(false);
    const [addPanacim, setAddPanacim] = useState<boolean>(false);
    const [locationList, setLocationList] = useState<Location[] | undefined>(undefined);

    useEffect(() => {
        setLoadPanelVisible(true);
        loadWorkOrder().then((res) => {
            setLoadPanelVisible(false);
        });
        dispatch(filterDnlnvlList({}));
    }, []);

    const dataStorePlanningWorkOrder = useRef(
        new CustomStore({
            key: "id",
            load(options: LoadOptions) {
                // console.log("option Load", options)

                workOrderStateCollection.current.offset = options?.skip ? options.skip : 0;
                workOrderStateCollection.current.limit = options?.take ? options.take : 10;
                if (options?.filter) {
                    let filter: any[] = [];
                    if (options.filter[1] === "and" || options.filter[1] === "or") {
                        filter = options.filter.reduce((acc, curr) => {
                            // console.log("curr", curr)
                            if (curr === "and" || curr === "or") {
                                return acc;
                            } else {
                                return [...acc, mappingFilterDevextreme(curr)];
                            }
                        }, []);
                    } else {
                        filter = [mappingFilterDevextreme(options.filter)];
                    }
                    workOrderStateCollection.current.filter = {
                        conditions: filter,
                    };
                    // console.log("filter", filter)
                }
                return workOrderStateCollection.current.load().then((res) => {
                    // console.log("workOrderStateCollection.current.items", workOrderStateCollection.current.items)
                    // console.log("workOrderStateCollection.current.count", workOrderStateCollection.current.count)
                    return {
                        data: workOrderStateCollection.current.items,
                        totalCount: workOrderStateCollection.current.count,
                    };
                });
            },
            cacheRawData: false,
        }),
    );

    const loadWorkOrder = async () => {
        await workOrderStateCollection.current.load().then((res) => {
            setWorkOrder(workOrderStateCollection.current.items);
        });
    };

    const loadStat = async (id) => {
        axios
            .get(PLANNING_API_URL + "/services/api/dnlnvl/material-synthesis", {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
                params: {
                    planningWorkOrderId: id,
                },
            })
            .then(function (response) {
                setCurrentDnlnvlDetailDetails(response.data);
            })
            .catch(function (error) {
                toastError("Có lỗi xảy ra!");
            });
    };

    function setPopUpStatClose() {
        setPopupStatPanelIsOpen(false);
        refresh();
    }

    function refresh() {
        loadWorkOrder().then((res) => {
            // toastSuccess("Tải thành công")
        });
    }

    const popUpStatContentRender = (e) => {
        return (
            <ScrollView useNative={true} showScrollbar='always'>
                <DnlnvlViewMasterDetail planningWorkOrder={currentWorkOrderStat} />
            </ScrollView>
        );
    };

    const dispacthFilterDnlnvl = (e) => {
        // console.log("dispatch event", e);
        if (e.rowType === "data") {
            dispatch(filterDnlnvlList(toJS(e.data)));
        }
    };

    const buttonCellRender = (e) => {
        const onButtonStatClick = async () => {
            setLoadPanelVisible(true);
            setCurrentWorkOrderStat(e.data);
            await loadStat(e.data.id).then((res) => {
                setLoadPanelVisible(false);
            });
            setPopupStatPanelIsOpen(true);
        };

        const onButtonCreateDnlClick = () => {
            setCurrentWorkOrder(e.data);
            // setPopupCreateDnlIsOpen(true);
        };

        const onItemAddClick = (e) => {
            // console.log("Item Data", e.itemData);
            if (e.itemData === "Thêm DNL R2") {
                setAddR2(true);
                setPopupCreateDnlIsOpen(true);
            } else {
                setAddR2(false);
                setPopupCreateDnlIsOpen(false);
            }
            if (e.itemData === "Thêm DNL Panacim") {
                setAddPanacim(true);
                setPopupCreateDnlIsOpen(true);
            } else {
                setAddPanacim(false);
                // setPopupCreateDnlIsOpen(false);
            }
        };
        const addPanacim_R2 = ["Thêm DNL R2", "Thêm DNL Panacim"];
        const buttonDropDownOptions = { width: 145 };
        return (
            <div id={"sendButton" + e.data.id} style={{ float: "left" }}>
                <DropDownButton
                    hint='Thêm'
                    style={{ marginRight: 2 }}
                    icon='add'
                    dropDownOptions={buttonDropDownOptions}
                    // onClick={onButtonCreateDnlClick}
                    onButtonClick={onButtonCreateDnlClick}
                    onItemClick={onItemAddClick}
                    items={addPanacim_R2}
                    // splitButton={true}
                />
                <Button hint='Thống kê chi tiết' icon='activefolder' onClick={onButtonStatClick} />
            </div>
        );
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    function onSelectedRowKeysChange(e) {
        if (e.data) {
            setCurrentWorkOrderStat(e.data);
            setCurrentWorkOrder(e.data);
        }
    }

    return (
        <div id='data-grid-demo'>
            <LoadPanel
                position={{ of: "#root" }}
                shadingColor='rgba(0,0,0,0.4)'
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                // closeOnOutsideClick={true}
                message='Đang tải...'
            />

            <Popup
                visible={popupStatPanelIsOpen}
                onHiding={setPopUpStatClose}
                title='Thống kê'
                // titleComponent={() => {
                //   return <div>Thống kê</div>
                // }}
                showTitle={true}
                fullScreen={false}
                contentRender={popUpStatContentRender}
                closeOnOutsideClick={true}
                dragEnabled={false}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        stylingMode: "outlined",
                        onClick: setPopUpStatClose,
                    }}
                />
            </Popup>
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
                        Danh sách Work Order
                    </h5>
                </div>
                {/* <div className="informer" style={{
          backgroundColor: "#ffffff",
          paddingLeft: 13
        }}>
          <h5 className="name" style={{
            color: "rgba(0, 0, 0, 0.7)",
            marginBottom: 0,
            fontSize: 15,
            boxSizing: "border-box",
            fontWeight: 550
          }}>Tìm kiếm chung</h5>
        </div> */}
                <DataGrid
                    // id='gridContainer'
                    keyExpr='id'
                    showColumnLines={true}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    repaintChangesOnly={true}
                    showBorders={true}
                    onSelectionChanged={onSelectedRowKeysChange}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    focusedRowEnabled={true}
                    dataSource={workOrder}
                    // dataSource={dataStorePlanningWorkOrder.current}
                    // remoteOperations={true}
                    noDataText='Không có dữ liệu để hiển thị'
                    onRowClick={dispacthFilterDnlnvl}>
                    <Toolbar>
                        <ToolbarItem1 location='after'>
                            <Button hint='Refresh' onClick={refresh} icon='refresh' />
                        </ToolbarItem1>
                        <ToolbarItem1 location='after'>
                            <Button hint='Refresh' onClick={refresh} icon='refresh' />
                        </ToolbarItem1>
                        <ToolbarItem1 name='addRowButton' />
                        <ToolbarItem1 name='revertButton' />
                        <ToolbarItem1 name='saveButton' />
                        <ToolbarItem1 name='searchPanel' location='before' />
                        <ToolbarItem1 name='columnChooserButton' />
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
                    <SearchPanel visible={true} placeholder='VD: WO' />
                    <HeaderFilter
                        visible={true}
                        texts={{
                            cancel: "Hủy bỏ",
                            ok: "Đồng ý",
                            emptyValue: "Rỗng",
                        }}
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
                    <Column type='buttons' cellRender={buttonCellRender} caption={"Tùy chọn"} alignment={"center"} />
                    {/* <Column dataField="id" caption="Id" allowEditing={false} /> */}
                    <Column caption={"Plan Wo"} dataField='parentWorkOrderId' />
                    <Column dataField='woId' caption='Plan Wo Detail' />
                    <Column dataField='sapWo' caption='Sap WO' />
                    <Column dataField='branchCode' caption='Mã ngành' />
                    <Column dataField='lotNumber' caption='Số LOT' />
                    <Column dataField='profile' caption='Profile' />
                    <Column dataField='groupName' caption='Tổ' />
                    <Column dataField='workOrderType' caption='Work Order Type' />
                    <Column dataField='workOrderTypeName' caption='Work Order Type Name' />
                    <Column dataField='productCode' caption='Mã sản phẩm' />
                    <Column dataField='productName' caption='Tên sản phẩm' />
                    <Column dataField='line' caption='Dây chuyền' />
                    <Column dataField='note' caption='Ghi chú' />
                    <MasterDetail enabled={true} component={DnlnvlViewMasterDetail} />
                </DataGrid>
            </div>
            {addR2 && currentWorkOrder && popupCreateDnlIsOpen ? (
                <DnlnvlPanelManager
                    planningWorkOrder={currentWorkOrder}
                    popupIsOpen={popupCreateDnlIsOpen}
                    setPopUpIsOpen={setPopupCreateDnlIsOpen}
                />
            ) : (
                ""
            )}
            {addPanacim && currentWorkOrder && popupCreateDnlIsOpen ? (
                <DnlnvlAddPanacim
                    planningWorkOrder={currentWorkOrder}
                    popupIsOpen={popupCreateDnlIsOpen}
                    setPopUpIsOpen={setPopupCreateDnlIsOpen}
                />
            ) : (
                ""
            )}
        </div>
    );
});

export default WoDnlnvlManager;
