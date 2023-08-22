import React, { useEffect, useState } from "react";
import { locale, loadMessages } from "devextreme/localization";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    ColumnChooser,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem1,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import { Button } from "devextreme-react/button";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { Roles, StatusApproveEnum } from "../../enum/statusEnum";
import { LoadPanel } from "devextreme-react/load-panel";
import DnlnvlPopupView from "./DnlnvlPopupView";
import DnlnvlPopupPick from "./DnlnvlPopupPick";
import UserService from "../../../../Keycloak";
import DnlnvlDetailPanacim from "./DnlnvlDetailPanacim";
import { custom } from "devextreme/ui/dialog";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

import { selectDnlnvlListFilter, fetchDnlnvlList, selectDnlnvlListStatus } from "./../dnlnvlListSlice";
import { str } from "../../../../utils/utils";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
    data?: any;
};

const DnlnvlView: React.FC<DnlnvlViewProps> = ({ planningWorkOrder = undefined, data }) => {
    const dnlnvlCollection = useCollection<Dnlnvl>(Dnlnvl.NAME, {
        view: "with-work-order",
        loadImmediately: false,
        sort: "+status,-createdAt",
    });
    const mainStore = useMainStore();
    dnlnvlCollection.current.filter = data?.data
        ? {
              conditions: [{ property: "planningWorkOrder.woId", operator: "=", value: data?.data.woId }],
          }
        : null;

    const [popupPickIsOpen, setPopupPickIsOpen] = useState(false);
    const [currentDnlnvl, setCurrentDnlnvl] = useState<Dnlnvl | undefined>(undefined);
    const [detailR2, setDetailR2] = useState<boolean>(false);
    const [detailPanacim, setDetailPanacim] = useState<boolean>(false);

    const dnlnvls: Dnlnvl[] = useAppSelector(selectDnlnvlListFilter);
    const isLoading = useAppSelector(selectDnlnvlListStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchDnlnvlList());
    }, [planningWorkOrder]);

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
        },
    });

    // const onWoIdCellRender = (data) => {

    //   return <div>{data.value?.woId}</div>
    // }

    // const onWorkOrderTypeCellRender = (data) => {

    //   return <div>{data.value?.workOrderType}</div>
    // }

    const onButtonDetailClick = (e) => {
        setCurrentDnlnvl(e.row.data);
        if (e.row.data.dnlnvlType === "R2") {
            setDetailR2(true);
        } else {
            setDetailPanacim(true);
        }
    };

    const onPickDsClick = (e) => {
        setCurrentDnlnvl(e.row.data);
        setPopupPickIsOpen(true);
    };

    const setPopUpPickClose = () => {
        setPopupPickIsOpen(false);
    };

    const refresh = () => {
        dispatch(fetchDnlnvlList());
    };

    // const maxLengthSearch = (e: any) => {
    //   if (e.parentType === "searchPanel" || e.parentType === "filterRow") {
    //     e.editorOptions.onValueChanged = function (args) {
    //       if (args.value.length > 5) {
    //         e.component.searchByText(args.value);
    //         e.errorText = 'Bạn chỉ được nhập tối đa 256 ký tự';
    //         toastError(e.errorText);
    //       }
    //     }
    //     // e.editorOptions.maxLength = 256;
    //   }
    // }

    const maxLengthSearch = (e: any) => {
        if (e.parentType === "searchPanel" || e.parentType === "filterRow") {
            e.editorOptions.maxLength = 256;
        }
    };

    const onRollBack = (e) => {
        if (e.row.data.status !== StatusApproveEnum["Bản nháp"]) {
            toastError("Đề nghị lĩnh đã được xác nhận");
            return;
        }
        const id = e.row.data.id;
        if (id === "") return;
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                title: "Xác nhận xóa dữ liệu",
                messageHtml: "Bạn có chắc chắn muốn xóa ?",
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
                    axios
                        .delete(PLANNING_API_URL + "/services/api/dnlnvl/" + id, {
                            headers: {
                                Authorization: "Bearer " + mainStore.authToken,
                            },
                        })
                        .then(function (response) {
                            axios
                                .post(
                                    PLANNING_API_URL + "/services/api/dnlnvl/release-material/" + id,
                                    {},
                                    {
                                        headers: {
                                            Authorization: "Bearer " + mainStore.authToken,
                                        },
                                    },
                                )
                                .then(function (response) {
                                    toastSuccess("Xóa thành công");
                                    dispatch(fetchDnlnvlList());
                                })
                                .catch(function (error) {
                                    toastError("Xóa thất bại");
                                })
                                .finally(() => {});
                        })
                        .catch(function (error) {
                            // TODO document why this function is empty
                        });
                }
            });
        });
        // e.cancel = isCanceled
    };

    const headerFilterStatus = [
        {
            text: "Bản nháp",
            value: StatusApproveEnum["Bản nháp"],
        },
        {
            text: "Chờ duyệt ĐNL",
            value: StatusApproveEnum["Chờ duyệt ĐNL"],
        },
        {
            text: "Chờ gửi đối chiếu NVL",
            value: StatusApproveEnum["Chờ gửi đối chiếu NVL"],
        },
        {
            text: "Đã gửi SAP",
            value: StatusApproveEnum["Đã gửi SAP"],
        },
        {
            text: "Bị từ chối",
            value: StatusApproveEnum["Bị từ chối"],
        },
        {
            text: "Đã gửi SAP, MES",
            value: StatusApproveEnum["Đã gửi SAP, MES"],
        },
        {
            text: "Đã gửi MES",
            value: StatusApproveEnum["Đã gửi MES"],
        },
    ];

    const onStatusRender = (data: { value: any }) => {
        // console.log("Data color,", data?.value)
        let status = "";
        let backgroundColor = "";
        let padding = "";
        let borderRadius = "";
        let width = "";
        let border = "";
        const getColor = (value) => {
            let color = "";
            switch (value) {
                case "0":
                    status = "Bản nháp";
                    color = "rgba(0, 0, 0, 0.6)";
                    backgroundColor = "rgba(0, 0, 0, 0.05)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    width = "85px";
                    border = "1px solid rgba(0, 0, 0, 0.5)";

                    break;
                case "1":
                    status = "Chờ duyệt ĐNL";
                    color = "rgba(228, 184, 25, 1)";
                    backgroundColor = "rgba(228, 184, 25, 0.1)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    width = "125px";
                    border = "1px solid rgba(228, 184, 25, 0.5)";
                    break;
                case "2":
                    status = "Chờ gửi đối chiếu NVL";
                    color = "rgba(175, 25, 228, 1)";
                    backgroundColor = "rgba(175, 25, 228, 0.1)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    border = "1px solid rgba(175, 25, 228, 0.5)";
                    width = "173px";
                    break;
                case "3":
                    status = "Đã gửi SAP";
                    color = "rgba(0, 151, 15, 1)";
                    backgroundColor = "rgba(17, 168, 32, 0.1)";
                    padding = "3px 18px";
                    borderRadius = "4px";
                    border = "1px solid rgba(0, 151, 15, 0.5)";
                    width = "105px";
                    break;
                case "4":
                    status = "Bị từ chối";
                    color = "rgba(229, 28, 15, 1)";
                    backgroundColor = "rgba(229, 28, 15, 0.1)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    width = "90px";
                    border = "1px solid rgba(229, 28, 15, 0.5)";
                    break;
                case "5":
                    status = "Đã gửi SAP, MES";
                    color = "rgba(0, 151, 15, 1)";
                    backgroundColor = "rgba(17, 168, 32, 0.1)";
                    padding = "3px 18px";
                    borderRadius = "4px";
                    break;
                case "6":
                    status = "Đã gửi MES";
                    color = "rgba(0, 151, 15, 1)";
                    backgroundColor = "rgba(17, 168, 32, 0.1)";
                    padding = "3px 18px";
                    borderRadius = "4px";
                    break;
            }
            return color;
        };

        const color = getColor(data?.value);
        return (
            <div
                style={{
                    color: color,
                    backgroundColor: backgroundColor,
                    padding: padding,
                    borderRadius: borderRadius,
                    width: width,
                    border: border,
                }}>
                {status}
            </div>
        );
    };

    const setClosePanacim = () => {
        setDetailPanacim(false);
    };
    const setCloseR2 = () => {
        setDetailR2(false);
    };
    const buttonCellRender = (data) => {
        // console.log("cell render", data);
        return (
            <div style={{ display: "flex" }}>
                {UserService.hasRole([Roles["admin"]]) || UserService.hasRole([Roles["qly_DNL"]]) ? (
                    <div id={"DnlnvlViewRollback" + data.data.id} style={{ margin: 2 }}>
                        <Button
                            disabled={data.data.status !== StatusApproveEnum["Bản nháp"]}
                            onClick={() => onRollBack(data)}
                            icon={"trash"}
                            visible={true}
                            hint='Xóa'
                        />

                        {/* <Tooltip
          target={"#DnlnvlViewRollback" + data.data.id}
          showEvent="dxhoverstart"
          hideEvent="dxhoverend"
          contentRender={() => {
            return (
              <p>Rollback</p>
            )
          }}
          closeOnOutsideClick={false}
        /> */}
                    </div>
                ) : (
                    ""
                )}

                <div id={"DnlnvlViewDetail" + data.data.id} style={{ margin: 2 }}>
                    <Button
                        // onClick={() => onButtonDetailClick(data)}
                        onClick={() => onButtonDetailClick(data)}
                        icon={"folder"}
                        visible={true}
                        hint='Chi tiết'
                    />
                    {/* <Tooltip
          target={"#DnlnvlViewDetail" + data.data.id}
          showEvent="dxhoverstart"
          hideEvent="dxhoverend"
          contentRender={() => {
            return (
              <p>Detail</p>
            )
          }}
          closeOnOutsideClick={false}
        /> */}
                </div>
                {UserService.hasRole([Roles["admin"]]) || UserService.hasRole([Roles["qly_DNL"]]) ? (
                    <div id={"DnlnvlViewExport" + data.data.id} style={{ margin: 2 }}>
                        <Button onClick={() => onPickDsClick(data)} icon='export' visible={true} hint='Export' />
                        {/* <Tooltip
          target={"#DnlnvlViewExport" + data.data.id}
          showEvent="dxhoverstart"
          hideEvent="dxhoverend"
          contentRender={() => {
            return <p>Export</p>;
          }}
          closeOnOutsideClick={false}
        /> */}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    };
    return (
        <>
            <LoadPanel visible={isLoading === "loading"} showIndicator={true} showPane={true} message='Đang tải...' />
            <div id='dnlnvl-view'>
                {detailR2 ? (
                    <DnlnvlPopupView
                        visible={detailR2}
                        onHiding={setCloseR2}
                        setPopupClose={setCloseR2}
                        currentDnlnvl={currentDnlnvl}
                        refreshDnlnvl={refresh}
                    />
                ) : (
                    ""
                )}
                {detailPanacim ? (
                    <DnlnvlDetailPanacim
                        visible={detailPanacim}
                        onHiding={setClosePanacim}
                        setPopupClose={setClosePanacim}
                        currentDnlnvl={currentDnlnvl}
                        refreshDnlnvl={refresh}
                    />
                ) : (
                    ""
                )}
                {popupPickIsOpen && (
                    <DnlnvlPopupPick
                        currentDnlnvl={currentDnlnvl}
                        popupIsOpen={popupPickIsOpen}
                        setPopupClose={() => setPopUpPickClose()}
                    />
                )}
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
                            Danh sách đề nghị lĩnh nguyên vật liệu <div></div>
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

                    {/*<div>*/}
                    {/*  {str(planningWorkOrder)}*/}
                    {/*</div>*/}
                    <DataGrid
                        keyExpr='id'
                        showColumnLines={true}
                        showRowLines={true}
                        rowAlternationEnabled={true}
                        columnAutoWidth={true}
                        repaintChangesOnly={true}
                        showBorders={true}
                        cacheEnabled={false}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        focusedRowEnabled={true}
                        dataSource={dnlnvls}
                        onEditorPreparing={maxLengthSearch}
                        noDataText='Không có dữ liệu để hiển thị'>
                        <ColumnChooser enabled={true} />
                        <Toolbar>
                            {/*<ToolbarItem1 location="center">*/}
                            {/*  <div className="informer" >*/}
                            {/*    <h5 className="name">Danh sách đề nghị lĩnh nguyên vật liệu</h5>*/}
                            {/*  </div>*/}
                            {/*</ToolbarItem1>*/}
                            <ToolbarItem1 location='after'>
                                <Button hint='Refresh' onClick={refresh} icon='refresh' />
                            </ToolbarItem1>
                            <ToolbarItem1 name='addRowButton' />
                            <ToolbarItem1 name='revertButton' />
                            <ToolbarItem1 name='saveButton' />
                            <ToolbarItem1 name='searchPanel' location='before' />
                            <ToolbarItem1 name='columnChooserButton'></ToolbarItem1>
                        </Toolbar>

                        <HeaderFilter
                            visible={true}
                            texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng",
                            }}
                        />
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
                        <Paging enabled={true} defaultPageSize={10} />
                        <Pager
                            visible={true}
                            displayMode={"full"}
                            showInfo={true}
                            showNavigationButtons={true}
                            allowedPageSizes={[5, 10]}
                            infoText='Trang số {0} trên {1} ({2} bản ghi)'
                        />
                        <Column type='buttons' cellRender={buttonCellRender} width={145} caption={"Tùy chọn"} alignment='center' />
                        <Column dataField='status' caption='Trạng thái' cellRender={onStatusRender}>
                            <HeaderFilter dataSource={headerFilterStatus} />
                        </Column>
                        <Column dataField={"dnlnvlType"} caption={"Loại"} width={120} />
                        <Column dataField='id' caption={"Id"} alignment='left' />
                        <Column
                            dataField='planningWorkOrder.woId'
                            // cellRender={onWoIdCellRender}
                            caption='Mã WO'
                        />
                        <Column
                            dataField='planningWorkOrder.workOrderType'
                            width={200}
                            // cellRender={onWorkOrderTypeCellRender}
                            caption='Work Order Type'
                        />
                        <Column dataField='type' caption='Type' />
                        <Column dataField='sentBy' caption='Người gửi' />
                        <Column dataField='approver' caption='Người duyệt' />
                        <Column alignment={"left"} dataField={"approveDate"} caption={"Thời gian duyệt"} />
                        <Column
                            dataField='createdAt'
                            caption='Ngày tạo'
                            dataType='datetime'
                            format='dd/MM/yyyy hh:mm:ss'
                            allowEditing={false}
                        />
                        <Column dataField='createdBy' caption='Người tạo' allowEditing={false} />
                        <Column alignment='left' dataField='numOfReq' caption='Số lần khuyến nghị' />
                    </DataGrid>
                    <button onClick={() => console.log(process.env)}>Click me!</button>
                </div>
            </div>
        </>
    );
};

export default DnlnvlView;
