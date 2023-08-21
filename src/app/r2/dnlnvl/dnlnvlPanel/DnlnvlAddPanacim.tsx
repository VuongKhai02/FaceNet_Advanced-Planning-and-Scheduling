import React, { useEffect, useState } from "react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    Editing,
    Grouping,
    GroupPanel,
    HeaderFilter,
    Item as DatagridToolbarItem,
    Pager,
    Paging,
    Toolbar,
} from "devextreme-react/data-grid";
import { Form, SimpleItem } from "devextreme-react/form";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Button } from "devextreme-react/button";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import InfoRow from "../../../../utils/InfoRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { LoadPanel } from "devextreme-react/load-panel";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { TextBox } from "devextreme-react";
import { useMainStore } from "@haulmont/jmix-react-core";

import { useAppDispatch } from "../../../../hooks";
import { fetchDnlnvlList } from "../dnlnvlListSlice";

type DnlnvlDetailDetailPanacim = {
    id: number;
    dnlnvlDetailDetail: DnlnvlDetailDetail;
};

const DnlnvlAddPanacim = ({ planningWorkOrder, popupIsOpen, setPopUpIsOpen }) => {
    const mainStore = useMainStore();
    const dispatch = useAppDispatch();
    const [dnlnvlPanacimDetailDetails, setDnlnvlPanacimDetailDetails] = useState<DnlnvlDetailDetailPanacim[]>([]);
    const [woPanacim, setWoPanacim] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setPopUpClose = () => {
        setPopUpIsOpen(false);
    };

    const loadDnlnvlPanacimDetailDetails = () => {
        setIsLoading(true);
        if (!woPanacim) {
            toastError("Vui lòng nhập mã WO PANACIMMC");
            return;
        }
        axios
            .post(`${PLANNING_API_URL}/services/api/dnlnvl/get-material-is-pick-pana`, planningWorkOrder, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
                params: {
                    woNamePana: woPanacim,
                },
            })
            .then((res) => {
                setDnlnvlPanacimDetailDetails(res.data);
                toastSuccess("Tải thành công nguyên vật liệu");
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                toastError(error);
            });
    };

    const onWoPanacimChange = (e) => {
        setWoPanacim(e);
    };

    const onInsertDnlnvlSap = async () => {
        setIsLoading(true);
        axios
            .post(
                `${PLANNING_API_URL}/services/api/dnlnvl/create-dnlnvl-pana`,
                {
                    woNamePana: woPanacim,
                    planningWorkOrder: planningWorkOrder,
                    listDnlnvl: dnlnvlPanacimDetailDetails,
                },
                {
                    headers: {
                        Authorization: "Bearer " + mainStore.authToken,
                    },
                },
            )
            .then((res) => {
                setIsLoading(false);
                dispatch(fetchDnlnvlList());
                toastSuccess("Tạo ĐNL PANACIMMC thành công");
                setPopUpClose();
            })
            .catch((error) => {
                setIsLoading(false);
                // console.log("error", error.response.data.message);
                toastError(error.response.data.message);
            });
    };

    const popUpContentRender = () => {
        return (
            <ScrollView height='100%' useNative={true} showScrollbar='always'>
                <div id='#dnlnvl' style={{ height: "100%" }}>
                    <LoadPanel
                        shadingColor='rgba(0,0,0,0.4)'
                        position={{ of: "#dnlnvl" }}
                        visible={isLoading}
                        showIndicator={true}
                        shading={true}
                        showPane={true}
                        closeOnOutsideClick={false}
                        message='Đang tải...'
                    />
                    <div>
                        {planningWorkOrder ? (
                            <>
                                <div
                                    style={{
                                        backgroundColor: "white",
                                    }}>
                                    <Form colCount={3} alignItemLabels={true}>
                                        <SimpleItem colSpan={3}>
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
                                                    <b>Thông tin Work Order</b>
                                                </span>
                                                <table width={"100%"}>
                                                    <td>
                                                        <InfoRow label={"Loại"} data={"Panacim"} />
                                                        <InfoRow label={"WO"} data={planningWorkOrder.woId} />
                                                        <InfoRow label={"Số LOT"} data={planningWorkOrder.lotNumber} />
                                                    </td>
                                                    <td>
                                                        <InfoRow label={"Mã sản phẩm"} data={planningWorkOrder.productCode} />
                                                        <InfoRow label={"Tên sản phẩm"} data={planningWorkOrder.productName} />
                                                        <InfoRow label={"Dây chuyền"} data={planningWorkOrder.line} />
                                                    </td>
                                                    <td>
                                                        <InfoRow label={"Profile"} data={planningWorkOrder.profileId?.profileCode} />
                                                        <InfoRow label={"Profile name"} data={planningWorkOrder.profileId?.name} />
                                                    </td>
                                                </table>
                                            </div>
                                        </SimpleItem>
                                    </Form>
                                    <br />
                                    <br />
                                    <div
                                        style={{
                                            display: "flex",
                                        }}>
                                        <Button
                                            style={{
                                                marginRight: 48,
                                                width: 232,
                                                height: 44,
                                                padding: "10px 24px",
                                                background: "#06BE18",
                                                color: "#FFFFFF",
                                                border: "1px solid #FFFFFF",
                                                borderRadius: "10px",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={loadDnlnvlPanacimDetailDetails}>
                                            Tạo đề nghị lĩnh
                                        </Button>
                                        <TextBox
                                            placeholder={"Nhập mã Work Order PANACIMMC"}
                                            value={woPanacim}
                                            onValueChange={onWoPanacimChange}
                                            width={320}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <br />
                        <br />
                    </div>
                    <DataGrid
                        keyExpr='id'
                        showColumnLines={true}
                        showRowLines={true}
                        columnAutoWidth={true}
                        repaintChangesOnly={true}
                        showBorders={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        focusedRowEnabled={true}
                        dataSource={dnlnvlPanacimDetailDetails}
                        noDataText='Không có dữ liệu để hiển thị'>
                        <Toolbar visible={true}>
                            <DatagridToolbarItem location={"center"}>
                                <div>
                                    <h5>Danh sách NVL tổng hợp</h5>
                                </div>
                            </DatagridToolbarItem>
                            <DatagridToolbarItem location={"after"}>
                                <Button icon={"refresh"} visible={true} onClick={loadDnlnvlPanacimDetailDetails} />
                            </DatagridToolbarItem>
                        </Toolbar>
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
                        <Editing mode={"cell"} allowUpdating={true} useIcons={true} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.material"} caption={"Material ID"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.materialName"} caption={"Material Name"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.partNumber.partNumberCode"} caption='Part Code' />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.partNumber.name"} caption='Part Name' />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.rankAp"} caption={"rankAp"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.rankQuang"} caption={"rankQuang"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.rankMau"} caption={"rankMau"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.userData4"} caption={"userData4"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.userData5"} caption={"userData5"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.reserveQty"} caption={"Số lượng"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.materialState"} caption={"Material State"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.locationType"} caption={"Location"} />
                        <Column allowEditing={false} dataField={"dnlnvlDetailDetail.status"} caption={"Status"} />
                    </DataGrid>
                </div>
            </ScrollView>
        );
    };

    return (
        <div id='data-grid-demo'>
            <Popup
                visible={popupIsOpen}
                onHiding={setPopUpClose}
                title='Thêm mới đề nghị lĩnh nguyên vật liệu Panacim'
                // titleComponent={() => { return <div>Thêm mới đề nghị lĩnh nguyên vật liệu Panacim</div> }}
                showTitle={true}
                fullScreen={false}
                contentRender={popUpContentRender}
                dragEnabled={false}
                closeOnOutsideClick={true}>
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
                        text: "Lưu",
                        onClick: onInsertDnlnvlSap,
                        type: "default",
                    }}
                />
            </Popup>
        </div>
    );
};

export default DnlnvlAddPanacim;
