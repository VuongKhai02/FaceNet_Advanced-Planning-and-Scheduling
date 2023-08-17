import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    Editing,
    Export,
    FilterRow,
    Grouping,
    GroupPanel,
    HeaderFilter,
    Item as ToolbarItemDataGrid,
    Item as DatagridToolbarItem,
    MasterDetail,
    OperationDescriptions,
    Pager,
    Paging,
    Scrolling,
    Selection,
    Toolbar,
} from "devextreme-react/data-grid";
import { Form, SimpleItem } from "devextreme-react/form";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Button } from "devextreme-react/button";
import RadioGroup from "devextreme-react/radio-group";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { copy } from "../../../../utils/utils";
import "./DnlnvlPanel.css";

import { setDnlnvl, setListCtDnlnvl, updateDnlDetail } from "../dnlnvlSlice";
import _ from "lodash";
import InfoTableRow from "../../../../utils/InfoTableRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { CheckBox, DropDownBox, NumberBox, SelectBox, TagBox } from "devextreme-react";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import ArrayStore from "devextreme/data/array_store";
import { LoadPanel } from "devextreme-react/load-panel";
import { Line } from "../../../../jmix/entities/Line";
import uuid from "react-uuid";
import DnlnvlPopupShowMaterialAvailble from "./DnlnvlPopupShowMaterialAvailble";
import DnlnvlDetailView from "../dnlnvlView/DnlnvlDetailView";
import { DnlnvlDetail } from "../../../../jmix/entities/DnlnvlDetail";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import DnlnvlPopupEditMaterial from "../dnlnvlPopUpEditMaterial";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchDnlnvlList } from "../dnlnvlListSlice";
import { setLocationSlice } from "../locationSlice";
import InfoRow from "../../../../utils/InfoRow";
import InfoRow2 from "../../../../utils/InfoRow2";
import InfoRow3 from "../../../../utils/InfoRow3";
import { custom } from "devextreme/ui/dialog";
import { User } from "../../../../jmix/entities/User";
import { StatusApproveEnum } from "../../enum/statusEnum";

const ownerLabel = { "aria-label": "Owner" };

class PartNumberFilter {
    id: number;
    partNumberId: number | undefined;
    partNumberCode: string;
    name: string;
    rankAp: string;
    rankQuang: string;
    rankMau: string;
    userData4: string;
    userData5: string;
    quantity: number;
}

class LitePartNumber {
    partNumberId: number | undefined;
    partNumberCode: string | undefined;
    name: string | undefined;
}

class PlanningWorkOrderAndSelectPart {
    planningWorkOrder: PlanningWorkOrder;
    partNumberFilterList: PartNumberFilter[];
    locationList: number[];
}

class LocationFilter {
    id: number;
    locationFullname: string | undefined;
    locationName: string | undefined;
    locationSuffixdigitlen?: string | undefined;
}

type DnlnvlSenderAndApprover = {
    sender: string | null;
    approver: User | null;
    warehouseApprover: User | null;
};

const DnlnvlPanelManager = ({ planningWorkOrder, popupIsOpen, setPopUpIsOpen }) => {
    const mainStore = useMainStore();
    const lineStateCollection = useCollection<Line>(Line.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    const dnlnvlDetailCollection = useCollection<DnlnvlDetail>(DnlnvlDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });

    const dnlnvlCollection = useCollection<Dnlnvl>(Dnlnvl.NAME, {
        view: "with-work-order",
        loadImmediately: false,
        sort: "-createdAt",
    });

    const programmingOrBomVersionFilter = [
        { id: 0, text: "Chương trình" },
        { id: 1, text: "Bom Version" },
    ];
    const listDate = new ArrayStore({
        data: [
            {
                ID: "sortByCreateDate",
                name: "Theo ngày tạo lâu nhất",
            },
            {
                ID: "sortByManufacturingDate",
                name: "Theo ngày sản xuất lâu nhất",
            },
            {
                ID: "sortByExpirationDate",
                name: "Theo ngày hết hạn sắp tới",
            },
        ],
        key: "ID",
    });

    const [mainParts, setMainParts] = useState<PartNumberFilter[]>([]);
    // const [locationList, setLocationList] = useState<LocationFilter[]>([]);

    // @ts-ignore

    const dispatch = useAppDispatch();
    const [currentDnlnvl, setCurrentDnlnvl] = useState<Dnlnvl | undefined>(undefined);
    const [dnlnvlId, setDnlnvlId] = useState<number | undefined>(undefined);
    const [lines, setLines] = useState<Line[] | undefined>(undefined);
    const [selectLineOrLot, setSelectLineOrLot] = useState<number>(0);
    const [dateFilter, setDateFilter] = useState([
        {
            ID: "sortByCreateDate",
            name: "Theo ngày tạo lâu nhất",
        },
    ]);
    const location = useAppSelector((state) => state.location.locationSlice);

    const [currentDnlnvlDetail, setCurrentDnlnvlDetail] = useState<DnlnvlDetail | undefined>(undefined);
    const [currentDnlnvlDetails, setCurrentDnlnvlDetails] = useState<DnlnvlDetail[] | undefined>(undefined);

    const [popupModifyMaterialIsOpen, setPopupModifyMaterialIsOpen] = useState<boolean>(false);

    const [currentSelectedAddFilterDnlnvl, setCurrentSelectedAddFilterDnlnvl] = useState<number | undefined>(undefined);
    const [gridBoxValue, setGridBoxValue] = useState<number[]>([]);
    const [gridBoxLocationValue, setGridBoxLocationValue] = useState<number[]>([]);

    const [tiLeTieuHaoFilter, setTiLeTieuHaoFilter] = useState<number>(0.1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPopupFilterDnlnvlVisible, setIsPopupFilterDnlnvlVisible] = useState<boolean>(false);
    const [isPopupAvailableMaterialVisible, setIsPopupAvailableMaterialVisible] = useState<boolean>(false);
    const [currentWorkOrder, setCurrentWorkOrder] = useState<PlanningWorkOrder | undefined>(undefined);
    const [selectBoxPartNumberDataSource, setSelectBoxPartNumberDataSource] = useState<LitePartNumber[]>([]);
    const [locationValue, setLocationValue] = useState<string>("Chọn location");
    const [locationListSelected, setLocationListSelected] = useState<number[]>([]);
    const [isSelectAll, setSelectAll] = useState<boolean>(true);

    const [listWarehouses, setListWarehouses] = useState<any[]>([]);
    const [warehouseSelectedValue, setWarehouseSelectedValue] = useState<string | null>(null);
    const [warehouseApprove, setWarehouseApprove] = useState();
    const [warehouseApprover, setWarehouseApprover] = useState<User | null>(null);
    const [listUsers, setListUsers] = useState<User[]>([]);
    const [userSelectedUsername, setUserSelectedUsername] = useState<string | null>(null);
    const [warehouseApproverSelectedValue, setWarehouseApproverSelectedValue] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [canSendMES, setCanSendMES] = useState<boolean>(false);
    const [canSendSAP, setCanSendSAP] = useState<boolean>(false);

    useEffect(() => {
        loadUser();
        loadWarehouse();
    }, []);

    const loadLine = async () => {
        await lineStateCollection.current.load().then(() => {
            setLines(lineStateCollection.current.items);
        });
    };

    const loadWarehouse = async () => {
        await axios
            .get(`${PLANNING_API_URL}/rest/entities/Owh`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((response) => {
                setListWarehouses(response.data);
                const newWarehouse = response.data.find((warehouse) => warehouse.whsCode === currentDnlnvl?.owhCode);
                if (newWarehouse) {
                    setWarehouseApprove(newWarehouse);
                    setWarehouseSelectedValue(newWarehouse.whsName);
                }
            })
            .catch((e) => {
                toastError(e);
            });
    };

    const loadUser = async () => {
        await axios
            .get(`${PLANNING_API_URL}/services/keycloak/getUsers?username=`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((response) => {
                setListUsers(response.data);
                const newUser = response.data.find((user) => user.username === currentDnlnvl?.approver);
                const newWarehouseApprover = response.data.find((user) => user.username === currentDnlnvl?.warehouseApprover);
                if (newUser) {
                    setUser(newUser);
                    setUserSelectedUsername(newUser.username as string);
                }
                if (newWarehouseApprover) {
                    setWarehouseApprover(newWarehouseApprover);
                    setWarehouseApproverSelectedValue(newWarehouseApprover.username as string);
                }
            })
            .catch((e) => {});
    };

    const onButtonSendClick = async () => {
        if (planningWorkOrder == null) return;
        if (planningWorkOrder.workOrderType !== "LINE" && planningWorkOrder.workOrderType !== "LOT") {
            toastError("Hãy chọn WO theo LINE hoặc LOT");
            return;
        }
        setCurrentWorkOrder(planningWorkOrder);
    };

    const loadDnlnvlDetail = async (dnlnvlId) => {
        dnlnvlDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvl.id", operator: "=", value: dnlnvlId }],
        };
        await dnlnvlDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailCollection.current.items) {
                setCurrentDnlnvlDetails(dnlnvlDetailCollection.current.items);
            }
        });
    };

    const loadDnlnvl = async (dnlnvlId) => {
        dnlnvlCollection.current.filter = {
            conditions: [{ property: "id", operator: "=", value: dnlnvlId }],
        };
        await dnlnvlCollection.current.load().then((res) => {
            if (dnlnvlCollection.current.items) {
                setCurrentDnlnvl(dnlnvlCollection.current.items[0]);
            }
        });
    };

    const loadProfile = async () => {
        const dateQueryParam = dateFilter
            .map((value, index) => {
                return `&${value.ID}=true`;
            })
            .join("")
            .toString();
        const type = selectLineOrLot === 0 ? "PROGRAMMING" : "BOMVERSION";
        const queryParam = `?type=${type}&tiLeTieuHao=${tiLeTieuHaoFilter}` + dateQueryParam;

        if (currentWorkOrder === undefined) {
            toastError("Chưa chọn Work Order");
            return;
        }

        const selectedPart = mainParts.filter((value, index) => {
            const result = gridBoxValue.filter((value1, index1) => {
                return value.id === value1;
            });
            return result.length > 0;
        });

        if (selectedPart.length === 0) {
            toastError("Không có part để tạo Đề nghị lĩnh, hãy chọn part");
            setIsLoading(false);
            return;
        }

        const requestBodyData: PlanningWorkOrderAndSelectPart = {
            planningWorkOrder: currentWorkOrder,
            partNumberFilterList: selectedPart,
            locationList: locationListSelected,
        };

        axios
            .post(PLANNING_API_URL + "/services/api/dnlnvl" + queryParam, requestBodyData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then(function (response) {
                // @ts-ignore
                // print(response.data);
                setDnlnvlId(response.data);

                toastSuccess("Tạo bản nháp thành công");
                dispatch(fetchDnlnvlList());
                setIsLoading(false);
            })
            .catch(function (err) {
                const messageError: string = err.response?.data?.message;
                toastError(messageError);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadDnlnvlDetail(dnlnvlId).then(() => {});
        loadDnlnvl(dnlnvlId).then(() => {});
    }, [dnlnvlId]);

    const createDnlnvl = async () => {
        setIsLoading(true);
        await loadProfile();
    };

    const renderLaneCell = (data) => {
        return <div>{data.value?.laneName}</div>;
    };

    // const getAvailableMaterial = async () => {
    //
    //   await axios.get(PLANNING_API_URL + "/services/api/dnlnvl/get-available-material/", {
    //     headers: {
    //       'Authorization': 'Bearer ' + localStorage.getItem("_jmixRestAccessToken"),
    //     }
    //   }).then(res => {
    //     const listDnlnvlDetailMaterialExist: DnlnvlDetailDetail[] | undefined = copy(res.data).filter(value => value.isBelongToDnlnvlDetail == 1);
    //     // print(listDnlnvlDetailMaterialExist);
    //     const listDnlnvlDetailMaterialExistKeys: number[] | undefined = listDnlnvlDetailMaterialExist?.map((value => value.id ? parseInt(value.id) : 0));
    //     // setListChooseMaterialKeys(listDnlnvlDetailMaterialExistKeys);
    //     // setListChooseMaterial(listDnlnvlDetailMaterialExist);
    //     setListMaterialAvailable(res.data);
    //     // setStillNeed(dnlnvlDetail.stillNeed);
    //     // setEstTotalQty(dnlnvlDetail.estTotalQty);
    //     // setDnlnvlLoad(false);
    //   }).catch(res => {
    //     toastError("Gửi thất bại");
    //     // setDnlnvlLoad(false);
    //     setPopUpIsOpen(false);
    //   })
    // }

    const onOpenPanelModify = (data) => {
        setCurrentDnlnvlDetail(data.data);
        setPopupModifyMaterialIsOpen(true);
    };

    const renderPartNumberCell = (data) => {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                    icon={"edit"}
                    onClick={() => onOpenPanelModify(data)}
                    disabled={currentDnlnvl?.status !== "0" ? true : false}
                    style={{ backgroundColor: "#5cb85c", color: "#ffffff" }}
                />

                <div style={{ marginLeft: "3px" }}>{data.value.name}</div>
            </div>
        );
    };

    const renderMachineCell = (data) => {
        return <div>Máy / Công đoạn: {data.value?.machineName}</div>;
    };

    const deleteMaterialData = () => {
        dispatch(setListCtDnlnvl(null));
    };

    const setPopUpClose = () => {
        setPopUpIsOpen(false);
        deleteMaterialData();
        dispatch(setDnlnvl({}));
    };

    const tagBoxItemRender = (e) => {
        return (
            <div>
                <div>{e.name}</div>
            </div>
        );
    };

    const onTagChange = async (e) => {
        let temp = copy(dateFilter);
        if (e.addedItems.length > 0) {
            // eslint-disable-next-line array-callback-return
            e.addedItems.map((value, index) => {
                temp = _.unionBy(temp, [value], "ID");
            });
            // print("additem6")
            // print(e.addedItems)
            // print("additem7")
            // print(temp)
            setDateFilter(temp);
            // print(temp)
        } else if (e.removedItems.length > 0) {
            // print("removedItems6")
            // print(e.removedItems)
            // print("removedItems7")
            // eslint-disable-next-line array-callback-return
            e.removedItems.map((value, index) => {
                _.remove(temp, function (c) {
                    return c.ID === value.ID; //remove if color is green
                });
            });
            setDateFilter(temp);
        }
    };

    const onEditFilterPartNumber = (data) => {
        let tempMainPart: PartNumberFilter[] = mainParts;
        tempMainPart = tempMainPart.map((value: PartNumberFilter, index) => {
            if (value.id === data.key) {
                value = _.merge(value, data.newData);
            }
            return value;
        });
        setMainParts(tempMainPart);
    };

    const popUpContentRenderProgramming = () => {
        // print(selectLineOrLot)

        // if (currentDnlnvl == undefined)
        //   return <div>Không có dữ liệu khuyến nghị</div>

        const dnlnvlDetail = currentDnlnvl && currentDnlnvl.dnlnvlDetails ? copy(currentDnlnvl.dnlnvlDetails) : undefined;

        const renderTonSoLuongKhuyenNghiCell = (data) => {
            // eslint-disable-next-line array-callback-return
            // @ts-ignore
            const dnlnvlDetail = currentDnlnvl.dnlnvlDetails.filter((value, index) => {
                if (value.id === data.data.id) return value;
            });
            return dnlnvlDetail[0]?.estTotalQty;
        };

        const renderSoLuongDuPhongTieuHaoCell = (data) => {
            // eslint-disable-next-line array-callback-return
            // @ts-ignore
            const dnlnvlDetail = currentDnlnvl.dnlnvlDetails.filter((value, index) => {
                if (value.id === data.data.id) return value;
            });
            return dnlnvlDetail[0]?.bufferQty;
        };

        function renderstillNeedCell(data) {
            // eslint-disable-next-line array-callback-return
            // @ts-ignore
            const stillNeed = currentDnlnvl.dnlnvlDetails.filter((value) => {
                if (value.id === data.data.id) return value;
            });
            return stillNeed.length > 0 && stillNeed[0].stillNeed > 0 ? (
                <div style={{ color: "red" }}>{stillNeed[0].stillNeed}</div>
            ) : (
                <div style={{ color: "green" }}>0</div>
            );
        }

        const onTiLeTieuHaoChange = async (e) => {
            const tiLeTieuHao = e.value;
            // print("onTiLeTieuHaoChange")
            setTiLeTieuHaoFilter(tiLeTieuHao);
        };

        function getLineName(id) {
            const templines: Line | undefined = lines?.find((value) => value.id === id);
            return templines ? templines.lineName : "";
        }

        const refresh = () => {
            loadDnlnvlDetail(currentDnlnvl?.id).then(() => {});
        };
        const onUpdateStillNeed = () => {
            refresh();
        };

        function onEditDnlnvl1(data) {
            let updateData = data.oldData;

            // print("onEditDnlnvl1")
            // print(updateData)
            // print(data.newData)
            updateData.estReqdQty = updateData.bufferQty * data.newData.tiLeTieuHao;
            updateData.estTotalQty = updateData.bufferQty * data.newData.tiLeTieuHao + updateData.bufferQty;
            const object3 = { ...data.oldData, ...data.newData };
            dispatch(updateDnlDetail(object3));
        }

        const onRadioGroupLineOrLot = (e) => {
            // alert("value:" + e.value)
            setSelectLineOrLot(e.value);
            loadMainPart(e.value);
        };

        const renderPartNumberNameCell = (data) => {
            return <div>{data.value?.name}</div>;
        };

        const syncDataGridSelection = (e) => {
            setGridBoxValue(e.value || []);
        };

        const syncDataGridLocationSelection = (e) => {
            setGridBoxValue(e.value || []);
        };

        const dataGridOnSelectionChanged = (e) => {
            setGridBoxValue((e.selectedRowKeys.length && e.selectedRowKeys) || []);
        };
        const dataGridOnLocationSelectionChanged = (e) => {
            // console.log(e.selectedRowKeys);
            // console.log(e.selectedRowsData);
            setLocationListSelected(e.selectedRowKeys);
            // console.log(locationListSelected);
            let value = "";
            for (let i = 0; i < e.selectedRowsData.length; i++) {
                if (i === 8) {
                    break;
                }
                value += e.selectedRowsData[i].locationFullname + ", ";
            }
            if (e.selectedRowsData.length > 5) {
                value += "...";
            }
            setLocationValue(value);
            setSelectAll(false);
            // console.log("Location value: ", locationValue)
            // console.log("LocationList: ", locationListSelected);
        };

        const dataGridLocationRender = () => {
            const selectAllRow = (e) => {
                if (locationListSelected.length === 0 && isSelectAll) {
                    e.component.selectAll();
                }
            };

            const onAddFilterInListFilterDnlnvl = () => {};

            return (
                <div id='scrollview-demo'>
                    <ScrollView
                        id={"scrollview"}
                        // useNative={true}
                        showScrollbar={"always"}
                        // showScrollbar="always"
                    >
                        <div>
                            <div style={{ width: "95%" }}>
                                <h2>Danh sách location</h2>
                                {/*<ScrollView*/}
                                {/*  // style={{display: "container"}}*/}
                                {/*  useNative={true}*/}
                                {/*  showScrollbar="always"*/}
                                {/*>*/}
                                <DataGrid
                                    allowColumnResizing={true}
                                    keyExpr='id'
                                    key='id'
                                    dataSource={location}
                                    hoverStateEnabled={true}
                                    // selectedRowKeys={locationListSelected}
                                    onSelectionChanged={dataGridOnLocationSelectionChanged}
                                    noDataText='Không có dữ liệu để hiển thị'
                                    // onInitialized={selectAllRow}
                                    onContentReady={selectAllRow}
                                    // width={1000}
                                >
                                    <Toolbar>
                                        <DatagridToolbarItem>
                                            <Button
                                                hint='Refresh'
                                                icon='refresh'
                                                // onClick={() => setLocationListSelected(locationList)}
                                            ></Button>
                                        </DatagridToolbarItem>
                                        <DatagridToolbarItem name='saveButton' />
                                        <DatagridToolbarItem name='revertButton' />
                                    </Toolbar>
                                    <Selection mode='multiple' />
                                    {/*<Scrolling mode="virtual"/>*/}
                                    <Paging pageSize={20} />
                                    {/*<Pager*/}
                                    {/*  visible={true}*/}
                                    {/*  displayMode={"full"}*/}
                                    {/*  showInfo={true}*/}
                                    {/*  showNavigationButtons={true}*/}
                                    {/*  allowedPageSizes={[5, 10]}*/}
                                    {/*  infoText="Trang số {0} trên {1} ({2} bản ghi)"*/}

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
                                    <Editing mode='batch' allowUpdating={true} />
                                    <Column dataField='id' width={70} allowEditing={false} />
                                    <Column dataField='locationFullname' allowEditing={false} />
                                    <Column dataField='locationName' allowEditing={false} />
                                    <Column dataField='locationSuffixdigitlen' />
                                </DataGrid>
                                {/*</ScrollView>*/}
                            </div>
                        </div>
                    </ScrollView>
                </div>
            );
        };

        const dataGridRender = () => {
            const onPopupAddFilterDnlnvlIsShowing = () => {
                const onAddFilterDnlnvlValueChange = (value) => {
                    // print("value: " + value.value)
                    // print("data: " + str(value.data))
                    setCurrentSelectedAddFilterDnlnvl(value.value);
                };
                return (
                    <div>
                        <SelectBox
                            searchEnabled={true}
                            onValueChanged={onAddFilterDnlnvlValueChange}
                            acceptCustomValue={true}
                            dataSource={selectBoxPartNumberDataSource}
                            displayExpr={"name"}
                            valueExpr={"partNumberId"}
                            value={currentSelectedAddFilterDnlnvl}
                            placeholder='-- Lựa Chọn --'
                        />
                    </div>
                );
            };

            const onAddFilterDnlnvl = () => {
                setIsPopupFilterDnlnvlVisible(true);
            };

            const onAddFilterInListFilterDnlnvl = () => {
                if (currentSelectedAddFilterDnlnvl === undefined) {
                    toastError("Hãy chọn part");
                }
                let partNumberFilter: PartNumberFilter[] = mainParts.filter((value, index) => {
                    return value.partNumberId === currentSelectedAddFilterDnlnvl;
                });
                let result = copy(partNumberFilter[0]);
                result.id = uuid();
                result.userData4 = "";
                result.userData5 = "";
                result.rankAp = "";
                result.rankMau = "";
                result.rankQuang = "";
                result.quantity = 0;
                const tempMainParts = copy(mainParts);
                tempMainParts.push(result);
                setMainParts(tempMainParts);
                setIsPopupFilterDnlnvlVisible(false);
            };

            const renderQuantityCell = (e) => {
                return e.value === 0 ? "Tự động" : e.value;
            };

            return (
                <div id='scrollview-demo'>
                    <ScrollView
                        id={"scrollview"}
                        // useNative={true}
                        showScrollbar={"always"}
                        // showScrollbar="always"
                    >
                        <Popup
                            // fullScreen={true}
                            width={"40%"}
                            height={"30%"}
                            showTitle={true}
                            title={"Chọn Part"}
                            dragEnabled={true}
                            hideOnOutsideClick={true}
                            visible={isPopupFilterDnlnvlVisible}
                            onHiding={() => {
                                setIsPopupFilterDnlnvlVisible(false);
                            }}
                            contentRender={onPopupAddFilterDnlnvlIsShowing}>
                            {/**/}
                            <ToolbarItem
                                widget='dxButton'
                                toolbar='bottom'
                                location='after'
                                options={{
                                    text: "Hủy",
                                    stylingMode: "outlined",
                                    onClick: () => {
                                        setIsPopupFilterDnlnvlVisible(false);
                                    },
                                }}
                            />
                            <ToolbarItem
                                widget='dxButton'
                                toolbar='bottom'
                                location='after'
                                options={{
                                    text: "Lưu",
                                    type: "default",
                                    onClick: onAddFilterInListFilterDnlnvl,
                                }}
                            />
                        </Popup>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <h2>Danh sách các part chính</h2>
                                <ScrollView style={{ display: "container" }} useNative={true} showScrollbar='always'>
                                    <DataGrid
                                        allowColumnResizing={true}
                                        keyExpr='id'
                                        key='id'
                                        dataSource={mainParts}
                                        onRowUpdating={onEditFilterPartNumber}
                                        hoverStateEnabled={true}
                                        selectedRowKeys={gridBoxValue}
                                        onSelectionChanged={dataGridOnSelectionChanged}
                                        noDataText='Không có dữ liệu để hiển thị'>
                                        <Toolbar>
                                            <DatagridToolbarItem>
                                                <Button hint='Refresh' icon='refresh' onClick={() => setMainParts(mainParts)}></Button>
                                            </DatagridToolbarItem>
                                            <DatagridToolbarItem>
                                                <Button hint='Add' icon='add' onClick={onAddFilterDnlnvl}></Button>
                                            </DatagridToolbarItem>
                                            <DatagridToolbarItem name='saveButton' />
                                            <DatagridToolbarItem name='revertButton' />
                                        </Toolbar>
                                        <Selection mode='multiple' />
                                        {/*<Scrolling mode="virtual"/>*/}
                                        <Paging enabled={true} pageSize={10} />
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
                                        <Editing mode='batch' allowUpdating={true} />
                                        <Column dataField='partNumberId' width={70} allowEditing={false} />
                                        <Column dataField='partNumberCode' allowEditing={false} />
                                        <Column dataField='name' allowEditing={false} />
                                        <Column dataField='rankAp' />
                                        <Column dataField='rankQuang' />
                                        <Column dataField='rankMau' />
                                        <Column dataField='userData4' />
                                        <Column dataField='userData5' />
                                        <Column dataField='quantity' cellRender={renderQuantityCell} />
                                    </DataGrid>
                                </ScrollView>
                            </div>
                        </div>
                    </ScrollView>
                </div>
            );
        };

        const lineName = getLineName(currentWorkOrder?.line);

        const onPopupAvailableMaterialOpen = () => {
            setIsPopupAvailableMaterialVisible(true);
        };

        const onPopupAvailableMaterialClose = () => {
            setIsPopupAvailableMaterialVisible(false);
        };

        const renderVisibleCell = (e) => {
            return selectLineOrLot === 1;
        };

        const calculatePercent = () => {
            let stillNeed = 0;
            let estTotalQty = 0;
            currentDnlnvlDetails?.forEach((item) => {
                stillNeed += item.stillNeed;
                estTotalQty += item.estTotalQty;
            });
            if (stillNeed === 0) {
                return 0;
            }
            return Math.round(((estTotalQty - stillNeed) / estTotalQty) * 100);
        };

        return (
            <ScrollView height='100%' useNative={true} showScrollbar='always'>
                <div id='#dnlnvl' style={{ height: "100%" }}>
                    <LoadPanel
                        shadingColor='rgba(0,0,0,0.4)'
                        position={{ of: "#dnlnvl" }}
                        // onHiding={}
                        visible={isLoading}
                        showIndicator={true}
                        shading={true}
                        showPane={true}
                        hideOnOutsideClick={false}
                        message='Đang tải...'
                    />
                    <div>
                        {currentWorkOrder ? (
                            <>
                                <div
                                    style={{
                                        backgroundColor: "white",
                                    }}>
                                    <div
                                        style={{
                                            height: "100%",
                                            border: "1px solid rgba(0, 0, 0, 0.3)",
                                            padding: "8px 16px",
                                            marginTop: "8px",
                                            borderRadius: "16px",
                                            position: "relative",
                                        }}>
                                        <span
                                            style={{
                                                background: "#fff",
                                                position: "absolute",
                                                top: -10,
                                                left: 30,
                                                padding: "0 8px",
                                            }}>
                                            <b>Thông tin đề nghị lĩnh</b>
                                        </span>
                                        <Form colCount={3} colCountByScreen={3} alignItemLabels={true}>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"WO"} data={currentWorkOrder.woId} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"Mã sản phẩm"} data={currentWorkOrder.productCode} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"Profile"} data={currentWorkOrder.profileId?.profileCode} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"Số LOT"} data={currentWorkOrder.lotNumber} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"Tên sản phẩm"} data={currentWorkOrder.productName} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"Profile name"} data={currentWorkOrder.profileId?.name} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}>
                                                <InfoRow2 label={"Dây chuyền"} data={lineName} />
                                            </SimpleItem>
                                            <SimpleItem colSpan={1}></SimpleItem>
                                            <SimpleItem colSpan={1}></SimpleItem>
                                            <SimpleItem colSpan={3}>
                                                <InfoRow3
                                                    label={"Location"}
                                                    data={
                                                        <DropDownBox
                                                            width={"100%"}
                                                            // value={locationListSelected}
                                                            valueExpr='id'
                                                            inputAttr={ownerLabel}
                                                            deferRendering={false}
                                                            displayExpr='name'
                                                            placeholder={locationValue}
                                                            // showClearButton={true}
                                                            dataSource={location}
                                                            onValueChanged={syncDataGridSelection}
                                                            contentRender={dataGridLocationRender}
                                                        />
                                                    }></InfoRow3>
                                            </SimpleItem>

                                            <SimpleItem colSpan={3}>
                                                <Button
                                                    style={{ marginTop: 30 }}
                                                    className='button-info'
                                                    text='Các nguyên vật liệu khả dụng '
                                                    onClick={onPopupAvailableMaterialOpen}
                                                />
                                                <Popup
                                                    onHiding={onPopupAvailableMaterialClose}
                                                    // width={550}
                                                    // height={350}
                                                    title={"Danh sách các nguyên vật liệu khả dụng"}
                                                    visible={isPopupAvailableMaterialVisible}
                                                    showTitle={true}>
                                                    <DnlnvlPopupShowMaterialAvailble
                                                        partNunbers={selectBoxPartNumberDataSource}
                                                        planningWorkOrder={planningWorkOrder}
                                                    />
                                                </Popup>
                                            </SimpleItem>
                                        </Form>
                                    </div>
                                    <br />
                                    <br />
                                    <Form colCount={5}>
                                        <SimpleItem colSpan={5}>
                                            <div
                                                style={{
                                                    height: "100%",
                                                    border: "1px solid rgba(0, 0, 0, 0.3)",
                                                    padding: "8px 16px",
                                                    marginTop: "8px",
                                                    borderRadius: "16px",
                                                    position: "relative",
                                                }}>
                                                <span
                                                    style={{
                                                        background: "#fff",
                                                        position: "absolute",
                                                        top: -10,
                                                        left: 30,
                                                        padding: "0 8px",
                                                    }}>
                                                    <b>Điều kiện tạo đề nghị lĩnh</b>
                                                </span>
                                                {/*TODO sửa lại WO*/}
                                                <div style={{ display: "flex", width: "100%" }}>
                                                    <table style={{ marginRight: 100 }} width={400}>
                                                        <InfoTableRow
                                                            label={"Reserve theo"}
                                                            data={
                                                                <RadioGroup
                                                                    style={{ minWidth: 200 }}
                                                                    className='dx-field-label'
                                                                    items={programmingOrBomVersionFilter}
                                                                    displayExpr='text'
                                                                    valueExpr='id'
                                                                    value={selectLineOrLot}
                                                                    onValueChanged={onRadioGroupLineOrLot}
                                                                />
                                                            }
                                                        />
                                                        <InfoTableRow
                                                            label={"Tỉ lệ tiêu hao"}
                                                            data={
                                                                <NumberBox
                                                                    placeholder={"Tỉ lệ tiêu hao"}
                                                                    value={tiLeTieuHaoFilter}
                                                                    onValueChanged={onTiLeTieuHaoChange}
                                                                />
                                                            }
                                                        />
                                                        <InfoTableRow
                                                            label='Mốc'
                                                            data={
                                                                <TagBox
                                                                    style={{ minWidth: 200 }}
                                                                    dataSource={listDate}
                                                                    value={dateFilter}
                                                                    displayExpr='name'
                                                                    placeholder='Chọn cách tạo khuyến nghị '
                                                                    valueExpr='ID'
                                                                    onSelectionChanged={onTagChange}
                                                                    itemRender={tagBoxItemRender}
                                                                />
                                                            }
                                                        />
                                                        <InfoTableRow
                                                            label={"Part number"}
                                                            data={
                                                                <DropDownBox
                                                                    width={900}
                                                                    value={gridBoxValue}
                                                                    valueExpr='id'
                                                                    deferRendering={false}
                                                                    displayExpr='name'
                                                                    inputAttr={ownerLabel}
                                                                    placeholder='Hãy chọn một giá trị'
                                                                    showClearButton={true}
                                                                    dataSource={mainParts}
                                                                    onValueChanged={syncDataGridSelection}
                                                                    contentRender={dataGridRender}
                                                                />
                                                            }
                                                        />
                                                        <tr style={{ border: "10", padding: 10 }}>
                                                            <div style={{ padding: 10 }}>
                                                                <Button
                                                                    style={{ padding: 10, width: 100 }}
                                                                    type={"success"}
                                                                    onClick={createDnlnvl}>
                                                                    Áp dụng
                                                                </Button>
                                                            </div>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </SimpleItem>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <br />
                        <br />
                    </div>
                    {/*{selectLineOrLot === 0 ?*/}
                    <div
                        style={{
                            height: "100%",
                            border: "1px solid rgba(0, 0, 0, 0.3)",
                            padding: "8px 16px",
                            marginTop: "8px",
                            borderRadius: "16px",
                            position: "relative",
                        }}>
                        <DataGrid
                            keyExpr='id'
                            showColumnLines={true}
                            showRowLines={true}
                            columnAutoWidth={true}
                            repaintChangesOnly={true}
                            onRowUpdating={onEditDnlnvl1}
                            showBorders={true}
                            width={"100%"}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            dataSource={currentDnlnvlDetails}
                            noDataText='Không có dữ liệu để hiển thị'>
                            <Toolbar>
                                <ToolbarItemDataGrid location={"after"}>
                                    <div style={{ marginRight: "24px", paddingTop: "12px" }}>
                                        <h5>Tỉ lệ % NVL theo tổng khuyến nghị : {calculatePercent()} %</h5>
                                    </div>
                                </ToolbarItemDataGrid>
                                <ToolbarItemDataGrid location='after'>
                                    <Button hint='Refresh' onClick={refresh} icon='refresh' />
                                </ToolbarItemDataGrid>
                            </Toolbar>
                            <Export enabled={true} formats={["xlsx"]} allowExportSelectedData={true} />
                            <Paging enabled={true} defaultPageSize={10} />
                            <Pager
                                visible={true}
                                displayMode={"full"}
                                showInfo={true}
                                showNavigationButtons={true}
                                allowedPageSizes={[5, 10]}
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />
                            {/*<Column dataField="id" caption={"ID"}/>*/}
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
                            <Column dataField='lane' caption={"Lane"} cellRender={renderLaneCell} />
                            <Column dataField={"slot"} />
                            <Column dataField={"locationFrontRear"} caption={"Location Front Rear"} />
                            <Column dataField={"locationLeftRight"} caption={"Location Left Right"} />
                            <Column dataField={"qrFeeder.qrFeederCode"} caption={"Feeder Code"} />
                            {/*<Column dataField="partNumberCode" caption="Part" cellRender={renderPartNumberCell} />*/}
                            <Column dataField='partNumber' caption='Part Name' cellRender={renderPartNumberCell} />
                            <Column dataField={"estReqdQty"} caption={"Tổng số lượng cần"} alignment='left' />
                            <Column dataField={"bufferQty"} caption={"Số lượng dự phòng tiêu hao"} alignment='left' />
                            <Column dataField={"estTotalQty"} caption={"Tổng số lượng khuyến nghị"} alignment='left' />
                            <Column dataField={"stillNeed"} caption={"Số lượng cần thêm"} alignment='left' />
                            <Column dataField={"machine"} caption={"Machine"} cellRender={renderMachineCell} />
                            <Column
                                allowEditing={false}
                                dataField={"machine.machineName"}
                                // groupCellRender={renderMachineCell}
                                cellRender={renderMachineCell}
                                caption='Máy/ Công đoạn'
                                groupIndex={0}
                            />
                            <GroupPanel visible={true} allowColumnDragging={true} />
                            <Grouping autoExpandAll={true} />
                            <MasterDetail enabled={true} component={DnlnvlDetailView} />
                        </DataGrid>
                    </div>
                    <div
                        style={{
                            position: "relative",
                            marginTop: "16px",
                            border: "1px solid rgba(0, 0, 0, 0.3)",
                            borderRadius: "16px",
                            padding: "16px",
                            display: "grid",
                            gridTemplateColumns: "auto auto auto auto",
                            gridTemplateRows: "auto auto",
                            justifyContent: "space-between",
                            rowGap: "20px",
                        }}>
                        <span
                            style={{
                                background: "#fff",
                                position: "absolute",
                                top: -10,
                                left: 30,
                                padding: "0 8px",
                            }}>
                            <b>Chọn thông tin gửi</b>
                        </span>
                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Chọn kho duyệt
                            </div>
                            <SelectBox
                                displayExpr={"whsName"}
                                placeholder={"-- Lựa chọn --"}
                                valueExpr={"whsName"}
                                value={warehouseSelectedValue}
                                dataSource={listWarehouses}
                                onSelectionChanged={(data) => {
                                    setWarehouseApprove(data.selectedItem);
                                    setWarehouseSelectedValue(data.selectedItem.whsName);
                                }}
                                searchEnabled={true}
                                searchExpr={["whsName"]}
                                searchMode={"contains"}
                                disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Chọn người duyệt
                            </div>

                            <SelectBox
                                displayExpr={"username"}
                                placeholder={"-- Lựa chọn --"}
                                valueExpr={"username"}
                                dataSource={listUsers}
                                value={userSelectedUsername}
                                onSelectionChanged={(data) => {
                                    setUser(data.selectedItem);
                                    setUserSelectedUsername(data.selectedItem.username);
                                }}
                                searchEnabled={true}
                                searchExpr={["whsName"]}
                                searchMode={"contains"}
                                disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Chọn người quản lý kho
                            </div>

                            <SelectBox
                                displayExpr={"username"}
                                placeholder={"-- Lựa chọn --"}
                                valueExpr={"username"}
                                dataSource={listUsers}
                                value={warehouseApproverSelectedValue}
                                onSelectionChanged={(data) => {
                                    setWarehouseApprover(data.selectedItem);
                                    setWarehouseApproverSelectedValue(data.selectedItem.username);
                                }}
                                searchEnabled={true}
                                searchExpr={["whsName"]}
                                searchMode={"contains"}
                                disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Chọn hệ thống nhận
                            </div>
                            <div
                                style={{
                                    marginTop: 4,
                                }}>
                                <CheckBox
                                    text={"Gửi SAP"}
                                    disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                                    value={canSendSAP}
                                    onValueChange={() => {
                                        setCanSendSAP((prevState) => {
                                            return !prevState;
                                        });
                                    }}
                                />
                                <CheckBox
                                    text={"Gửi MES"}
                                    value={canSendMES}
                                    disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                                    onValueChange={() => {
                                        setCanSendMES((prevState) => {
                                            return !prevState;
                                        });
                                    }}
                                    style={{
                                        marginLeft: 30,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/*: ""}*/}
                    {/*{dnlnvlDetail && selectLineOrLot === 1 ? <DataGrid*/}
                    {/*  keyExpr="id"*/}
                    {/*  showColumnLines={true}*/}
                    {/*  showRowLines={true}*/}
                    {/*  columnAutoWidth={true}*/}
                    {/*  repaintChangesOnly={true}*/}
                    {/*  onRowUpdating={onEditDnlnvl1}*/}
                    {/*  showBorders={true}*/}
                    {/*  allowColumnResizing={true}*/}
                    {/*  allowColumnReordering={true}*/}
                    {/*  focusedRowEnabled={true}*/}
                    {/*  dataSource={dnlnvlDetail}*/}
                    {/*>*/}
                    {/*  <Toolbar>*/}
                    {/*    <DatagridToolbarItem*/}
                    {/*      name="groupPanel" location="before"*/}
                    {/*    />*/}
                    {/*    <ToolbarItem location="center">*/}
                    {/*      <div className="informer">*/}
                    {/*        <h5>*/}
                    {/*          DANH SÁCH PART ĐANG ĐƯỢC SỬ DỤNG*/}
                    {/*        </h5>*/}
                    {/*      </div>*/}
                    {/*    </ToolbarItem>*/}
                    {/*  </Toolbar>*/}
                    {/*  <Paging enabled={true} defaultPageSize={10}/>*/}
                    {/*  <Pager*/}
                    {/*    visible={true}*/}
                    {/*    displayMode={"full"}*/}
                    {/*    showInfo={true}*/}
                    {/*    showNavigationButtons={true}*/}
                    {/*    allowedPageSizes={[5, 10]}*/}
                    {/*    infoText="Trang số {0} trên {1} ({2} bản ghi)"*/}
                    {/*  />*/}
                    {/*  <GroupPanel visible={true} allowColumnDragging={true}/>*/}
                    {/*  <Grouping autoExpandAll={true}/>*/}
                    {/*  <Editing*/}
                    {/*    mode={"cell"}*/}
                    {/*    allowUpdating={true}*/}
                    {/*    useIcons={true}*/}
                    {/*  />*/}
                    {/*  <Column allowEditing={false} dataField="partNumber" caption="Part" cellRender={renderPartNumberCell}/>*/}
                    {/*  <Column allowEditing={false} dataField="estReqdQty" caption={"Tổng số lượng cần"}/>*/}

                    {/*  /!*<Column allowEditing={true} dataField={"tiLeTieuHao"} type={"number"} caption="Tỉ lệ tiêu hao"/>*!/*/}
                    {/*  <Column allowEditing={false} dataField={"tiLeTieuHao"} caption={"Số lượng dự phòng tiêu hao"}*/}
                    {/*          cellRender={renderSoLuongDuPhongTieuHaoCell}*/}
                    {/*  />*/}
                    {/*  <Column allowEditing={false} dataField={"estTotalQty"} caption={"Tổng số lượng khuyến nghị"}*/}
                    {/*          cellRender={renderTonSoLuongKhuyenNghiCell}/>*/}

                    {/*  <Column allowEditing={false}*/}
                    {/*          caption={"Số lượng cần thêm"}*/}
                    {/*          cellRender={renderstillNeedCell}*/}
                    {/*  />*/}
                    {/*  <MasterDetail*/}
                    {/*    enabled={true}*/}
                    {/*    component={DnlnvlDetailView}*/}
                    {/*    autoExpandAll={true}*/}
                    {/*  />*/}
                    {/*</DataGrid> : ""}*/}
                    {currentDnlnvlDetail ? (
                        <DnlnvlPopupEditMaterial
                            dnlnvlDetail={currentDnlnvlDetail}
                            popupIsOpen={popupModifyMaterialIsOpen}
                            setPopUpIsOpen={setPopupModifyMaterialIsOpen}
                            updateStillNeed={onUpdateStillNeed}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </ScrollView>
        );
    };

    const popUpContentRender = () => {
        // @ts-ignore
        if (currentWorkOrder) {
            return popUpContentRenderProgramming();
        } else return <div>Chưa load được Work Order</div>;
    };

    const onInsertDnlnvlSap = async () => {
        // @ts-ignore
        await axios
            .put(PLANNING_API_URL + "/services/api/dnlnvl/sendsap/" + currentDnlnvl.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then((res) => {
                toastSuccess("Xác nhận thành công");
            })
            .catch((res) => {
                toastError("Gửi thất bại");
            });
        setPopUpClose();
    };

    const loadLocationList = async () => {
        let headers = {
            Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
            "content-type": "application/json",
        };
        axios.get(PLANNING_API_URL + "/services/api/location", { headers }).then((res) => {
            dispatch(setLocationSlice(res.data));
        });
        return;
    };
    const onRollBack = async () => {
        const id = currentDnlnvl && currentDnlnvl.id !== undefined ? currentDnlnvl.id : "";
        if (id === "") return;
        await axios
            .delete(PLANNING_API_URL + "/rest/entities/Dnlnvl/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then(function (response) {
                axios
                    .post(
                        PLANNING_API_URL + "/services/api/dnlnvl/release-material/" + id,
                        {},
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                            },
                        },
                    )
                    .then(function (response) {
                        toastSuccess("Xóa thành công");
                        dispatch(fetchDnlnvlList());
                        setPopUpClose();
                    })
                    .catch(function (error) {
                        toastSuccess("Xóa thất bại");
                    });
            })
            .catch(function (error) {});
    };

    async function onSaveDnlnvl() {
        const requestBodyData: DnlnvlSenderAndApprover = {
            sender: mainStore.userName,
            approver: user,
            warehouseApprover: warehouseApprover,
        };
        await axios
            .put(PLANNING_API_URL + "/services/api/dnlnvl/save-dnlnvl/" + currentDnlnvl?.id, requestBodyData, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
                params: {
                    owhCode: warehouseApprove ? (warehouseApprove as any).whsCode : null,
                    owhName: warehouseApprove ? (warehouseApprove as any).whsName : null,
                    canSendMES: canSendMES,
                    canSendSAP: canSendSAP,
                },
            })
            .then((res) => {
                toastSuccess("Lưu thành công");
                dispatch(fetchDnlnvlList());
                setPopUpClose();
            })
            .catch((error) => {
                toastError("Lưu thất bại");
            });
    }

    async function onSendDnlnvl() {
        if (!warehouseApprove) {
            toastError("Vui lòng chọn kho");
            return;
        }
        if (!user) {
            toastError("Vui lòng chọn người duyệt");
            return;
        }
        if (!warehouseApprover) {
            toastError("Vui lòng chọn người duyệt kho");
            return;
        }
        const promntPromise = custom({
            title: "Xác nhận gửi đi",
            messageHtml: "Bạn có chắc chắn muốn gửi sang Quản lý đối chiếu?",
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Phê duyệt",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        const canSend = await promntPromise.show();
        console.log("canSend", canSend);
        if (canSend) {
            const requestBodyData: DnlnvlSenderAndApprover = {
                sender: mainStore.userName,
                approver: user,
                warehouseApprover: warehouseApprover,
            };
            await axios
                .put(PLANNING_API_URL + "/services/api/dnlnvl/send-dnlnvl/" + currentDnlnvl?.id, requestBodyData, {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                    params: {
                        owhCode: (warehouseApprove as any).whsCode,
                        owhName: (warehouseApprove as any).whsName,
                        canSendMES: canSendMES,
                        canSendSAP: canSendSAP,
                    },
                })
                .then((res) => {
                    dispatch(fetchDnlnvlList());
                    setPopUpClose();
                    toastSuccess("Xác nhận thành công");
                })
                .catch((res) => {
                    toastError("Gửi thất bại");
                });
        }
    }

    const loadMainPart = async (lineOrLot) => {
        setIsLoading(true);
        // Viết 1 cái hàm để lấy main part
        // Load theo programming, load theo bom version
        let headers = {
            Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
            "content-type": "application/json",
        };
        const type = lineOrLot === 1 ? "BOMVERSION" : "PROGRAMMING";
        const param = type === "PROGRAMMING" ? planningWorkOrder?.profileId?.programming?.id : planningWorkOrder?.woId;
        if (planningWorkOrder && planningWorkOrder.woId && planningWorkOrder.productCode)
            axios
                .get(PLANNING_API_URL + "/services/api/work-order/getMainParts?woId=" + param + "&type=" + type, { headers })
                .then((res) => {
                    let selectedPartNumberRow: number[] = [];
                    let selectedRowDetails: PartNumberFilter[] = [];
                    let tempSelectBoxPartNumberDataSource: LitePartNumber[] = [];
                    res.data = res.data.map((value) => {
                        const selectedRowDetail: PartNumberFilter = {
                            id: uuid(),
                            partNumberId: value.id,
                            partNumberCode: value.partNumberCode,
                            name: value.name,
                            rankAp: "",
                            rankQuang: "",
                            rankMau: "",
                            userData4: "",
                            userData5: "",
                            quantity: 0,
                        };
                        selectedPartNumberRow.push(selectedRowDetail.id);
                        selectedRowDetails.push(selectedRowDetail);
                        return selectedRowDetail;
                    });
                    tempSelectBoxPartNumberDataSource = res.data.map((value) => {
                        return {
                            partNumberId: value.partNumberId,
                            partNumberCode: value.partNumberCode,
                            name: value.name,
                        };
                    });
                    setSelectBoxPartNumberDataSource(tempSelectBoxPartNumberDataSource);
                    setMainParts(res.data);
                    setGridBoxValue(selectedPartNumberRow);
                    // toastSuccess(`Load Part theo ${type} thành công`)
                    setIsLoading(false);
                })
                .catch((err) => {
                    setMainParts([]);
                    setGridBoxValue([]);
                    setIsLoading(false);
                    // print(err)
                });
    };

    useEffect(() => {
        onButtonSendClick();
        loadLine();
    }, [planningWorkOrder]);

    useEffect(() => {
        loadMainPart(selectLineOrLot);
    }, [planningWorkOrder]);

    useEffect(() => {
        if (location.length === 0) loadLocationList();
    }, []);

    return (
        <div id='data-grid-demo'>
            <Popup
                visible={popupIsOpen}
                onHiding={setPopUpClose}
                title='Thêm mới đề nghị lĩnh nguyên vật liệu R2'
                // titleComponent={() => { return <div>Thêm mới đề nghị lĩnh  nguyên vật liệu R2</div> }}
                showTitle={true}
                fullScreen={false}
                contentRender={popUpContentRender}
                dragEnabled={false}
                hideOnOutsideClick={true}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        onClick: setPopUpClose,
                        stylingMode: "outlined",
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Bỏ áp dụng",
                        onClick: onRollBack,
                        type: "danger",
                    }}
                    disabled={!currentDnlnvl}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Lưu",
                        onClick: onSaveDnlnvl,
                        type: "default",
                    }}
                    disabled={!currentDnlnvl}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Gửi",
                        onClick: onSendDnlnvl,
                        type: "success",
                    }}
                    disabled={!currentDnlnvl}
                />
            </Popup>
        </div>
    );
};

export default DnlnvlPanelManager;
