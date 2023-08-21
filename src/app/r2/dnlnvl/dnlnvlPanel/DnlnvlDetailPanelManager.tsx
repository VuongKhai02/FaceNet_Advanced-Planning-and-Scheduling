import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import {
    Column,
    DataGrid,
    FilterRow,
    OperationDescriptions,
    Pager,
    Paging,
    Scrolling,
    Selection,
    Toolbar,
} from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusFalse } from "../popupSlice";
import { copy, print } from "../../../../utils/utils";
import ScrollView from "devextreme-react/scroll-view";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError } from "../../../../utils/ToastifyManager";
import { useMainStore } from "@haulmont/jmix-react-core";
import DnlnvlPopupEditMaterial from "../dnlnvlPopUpEditMaterial";
import { DnlnvlDetail } from "../../../../jmix/entities/DnlnvlDetail";
// import FeederDropDownBoxComponent from "./FeederDropDownBoxComponent";

const DnlnvlDetailPanelManager = observer((props) => {
    const mainStore = useMainStore();
    const dataMaterialRef = useRef<DataGrid>(null);
    const [popupModifyMaterialIsOpen, setPopupModifyMaterialIsOpen] = useState<boolean>(false);

    const mainData = props.data.data;
    const [currentDnlnvlDetail, setCurrentDnlnvlDetail] = useState<DnlnvlDetail | undefined>(undefined);
    // @ts-ignore
    const dnlnvl = useSelector((state) => state.dnlnvl);
    const dnlnvlDetail = dnlnvl?.dnlnvl?.dnlnvlDetails?.filter((value, index) => {
        if (value.id == mainData.id) return value;
    })[0];
    // @ts-ignore
    const popup = useSelector((state) => state.popup);
    const dispatch = useDispatch();
    const popupIsOpen = mainData.id in popup.popUpList ? popup.popUpList[mainData.id] : false;

    const gridColumns = ["location"];
    const selectionFilter = ["isBelongToDnlnvlDetail", "=", "1"];

    const [gridBoxValue, setGridBoxValue] = useState([3]);
    const [listMaterialAvailable, setListMaterialAvailable] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    const [listChooseMaterial, setListChooseMaterial] = useState<DnlnvlDetailDetail[] | undefined>();
    const [listChooseMaterialKeys, setListChooseMaterialKeys] = useState<number[] | undefined>();
    const [stillNeed, setStillNeed] = useState<number | undefined>(mainData.stillNeed);
    const [estTotalQty, setEstTotalQty] = useState<number | undefined>(mainData.estTotalQty);

    const syncDataGridSelection = (e) => {
        setGridBoxValue(e.value || []);
    };

    const dataGridOnSelectionChanged = (e) => {
        setGridBoxValue((e.selectedRowKeys.length && e.selectedRowKeys) || []);
    };

    const setPopUpModifyDnlnvlClose = () => {
        dispatch(changeStatusFalse(mainData.id));
    };

    const renderPartNumberCell = (data) => {
        return <div>{data.value?.partNumberCode}</div>;
    };

    const onInsertDnlnvlDetail = async () => {
        await axios
            .post(PLANNING_API_URL + "/services/api/dnlnvl/modify-material/" + mainData.id, listChooseMaterial, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then((res) => {
                // print(res.data);
            })
            .catch((res) => {
                toastError("Gửi thất bại");
            });
    };

    const renderPartNumberNameCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const onShowingActive = async (e) => {
        // alert(mainData.id)
        await axios
            .get(PLANNING_API_URL + "/services/api/dnlnvl/get-available-material/" + mainData.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                },
            })
            .then((res) => {
                const listDnlnvlDetailMaterialExist: DnlnvlDetailDetail[] | undefined = copy(res.data).filter(
                    (value) => value.isBelongToDnlnvlDetail == 1,
                );
                const listDnlnvlDetailMaterialExistKeys: number[] | undefined = listDnlnvlDetailMaterialExist?.map((value) =>
                    value.id ? parseInt(value.id) : 0,
                );
                setListChooseMaterialKeys(listDnlnvlDetailMaterialExistKeys);
                setListChooseMaterial(listDnlnvlDetailMaterialExist);
                setListMaterialAvailable(res.data);
                setStillNeed(mainData.stillNeed);
                setEstTotalQty(mainData.estTotalQty);
            })
            .catch((res) => {
                toastError("Gửi thất bại");
            });
    };

    return (
        <div id='data-grid-demo'>
            {/*{currentDnlnvlDetail ?*/}
            {/*  <DnlnvlPopupEditMaterial*/}
            {/*    dnlnvlDetail={currentDnlnvlDetail}*/}
            {/*    popupIsOpen={popupModifyMaterialIsOpen}*/}
            {/*    setPopUpIsOpen={setPopupModifyMaterialIsOpen}*/}
            {/*    updateStillNeed={onUpdateStillNeed}*/}
            {/*  /> : ""}*/}

            {dnlnvlDetail?.dnlnvlDetailDetailList ? (
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
                    dataSource={dnlnvlDetail?.dnlnvlDetailDetailList}>
                    <Toolbar></Toolbar>
                    <Paging enabled={true} defaultPageSize={10} />
                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[5, 10]}
                        infoText='Trang số {0} trên {1} ({2} bản ghi)'
                    />
                    <Column dataField='material' caption='Material Id' />
                    <Column dataField='materialName' caption='Material Name' />
                    <Column dataField='partNumber' caption='Part Code' cellRender={renderPartNumberCell} />
                    <Column dataField='partNumber' caption='Part Name' cellRender={renderPartNumberNameCell} />
                    <Column dataField='rankAp' caption='rankAp' />
                    <Column dataField='rankMau' caption='rankMau' />
                    <Column dataField='rankQuang' caption='rankQuang' dataType='string' />
                    <Column dataField='userData4' caption='userData4' dataType='string' />
                    <Column dataField='userData5' caption='userData5' />
                    <Column dataField='reserveQty' caption='Reserve Qty' />
                    <Column dataField='stillNeed' caption='Still Need' />
                    <Column dataField='materialState' caption='Material State' />
                    <Column dataField='locationType' caption='Location (Type)' />
                    <Column dataField='status' caption='Status' />
                </DataGrid>
            ) : (
                ""
            )}
        </div>
    );
});

export default DnlnvlDetailPanelManager;
