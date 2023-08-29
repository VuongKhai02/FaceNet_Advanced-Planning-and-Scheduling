import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { custom } from "devextreme/ui/dialog";
import { locale, loadMessages } from "devextreme/localization";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    ColumnChooser,
    Export,
    FilterRow,
    Grouping,
    GroupPanel,
    HeaderFilter,
    Item as ToolbarItem1,
    ToolbarItem as ToolbarDataGrid,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { Form, SimpleItem } from "devextreme-react/form";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import InfoRow from "../../../../utils/InfoRow";
import { Button } from "devextreme-react/button";
import { Line } from "../../../../jmix/entities/Line";
import axios from "axios";
import { LoadPanel } from "devextreme-react/load-panel";
import { saveAs } from "file-saver-es";

import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { StatusApproveEnum } from "../../enum/statusEnum";
import { print } from "../../../../utils/utils";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
};
const DnlnvlApproveView: React.FC<DnlnvlViewProps> = observer(({ planningWorkOrder = undefined }) => {
    const dnlnvlCollection =
        planningWorkOrder !== undefined && planningWorkOrder.woId !== undefined
            ? useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  loadImmediately: false,
                  sort: "-createdAt",
                  filter: {
                      conditions: [{ property: "planningWorkOrder.woId", operator: "=", value: planningWorkOrder.woId }],
                  },
              })
            : useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  loadImmediately: false,
                  sort: "+status,-createdAt",
                  filter: {
                      conditions: [
                          {
                              property: "status",
                              operator: "in",
                              value: [
                                  StatusApproveEnum["Chờ duyệt ĐNL"],
                                  StatusApproveEnum["Chờ gửi đối chiếu NVL"],
                                  StatusApproveEnum["Bị từ chối"],
                                  StatusApproveEnum["Đã gửi SAP"],
                                  StatusApproveEnum["Đã gửi SAP, MES"],
                                  StatusApproveEnum["Đã gửi MES"],
                              ],
                          },
                      ],
                  },
              });

    const headerFilterStatus = [
        {
            text: "Chờ duyệt ĐNL",
            value: StatusApproveEnum["Chờ duyệt ĐNL"],
        },
        {
            text: "Chờ gửi đối chiếu NVL",
            value: StatusApproveEnum["Chờ gửi đối chiếu NVL"],
        },
        {
            text: "Bị từ chối",
            value: StatusApproveEnum["Bị từ chối"],
        },
        {
            text: "Đã gửi SAP",
            value: StatusApproveEnum["Đã gửi SAP"],
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
    const mainStore = useMainStore();
    const lineStateCollection = useCollection<Line>(Line.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });

    const [dnlnvlList, setDnlnvlList] = useState<Dnlnvl[] | undefined>(undefined);
    const [currentDnlnvlDetails, setCurrentDnlnvlDetails] = useState<[] | undefined>(undefined);
    const [currentDnlnvlDetailDetails, setCurrentDnlnvlDetailDetails] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    const [popupIsOpen, setPopUpIsOpen] = useState(false);
    const [popupDetailIsOpen, setPopupDetailIsOpen] = useState(false);
    const [isPopupMaterial, setIsPopupMaterial] = useState<boolean>(false);
    const [popupPickIsOpen, setPopupPickIsOpen] = useState(false);
    const [currentDnlnvl, setCurrentDnlnvl] = useState<Dnlnvl | undefined>(undefined);
    const [lines, setLines] = useState<Line[] | undefined>(undefined);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);

    useEffect(() => {
        loadDnlnvl();
        loadLine();
    }, [planningWorkOrder]);

    useEffect(() => {
        loadDnlnvlDetail(currentDnlnvl?.id);
    }, [currentDnlnvl]);

    useEffect(() => {
        loadDnlnvlDetailDetail(currentDnlnvl?.id);
    }, [currentDnlnvl]);

    const dataGridDnlnvlDetailDetailsRef = useRef<DataGrid>(null);

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    const loadDnlnvl = async () => {
        await dnlnvlCollection.current.load().then((res) => {
            if (dnlnvlCollection.current.items) {
                setDnlnvlList(dnlnvlCollection.current.items);
            }
        });
    };

    const loadLine = async () => {
        await lineStateCollection.current.load().then((res) => {
            setLines(lineStateCollection.current.items);
        });
    };
    const loadDnlnvlDetail = async (id) => {
        await axios
            .get(PLANNING_API_URL + "/services/api/dnlnvl/approved/detail/" + currentDnlnvl?.id, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((res) => {
                setCurrentDnlnvlDetails(res.data);
                // console.log("dataaa", res.data);
            })
            .catch((res) => {
                console.log("error", res);
            });
    };
    const loadDnlnvlDetailDetail = async (id) => {
        dnlnvlDetailDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvlDetail.dnlnvl.id", operator: "=", value: id }],
        };
        await dnlnvlDetailDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailDetailCollection.current.items) {
                setCurrentDnlnvlDetailDetails(dnlnvlDetailDetailCollection.current.items);
            }
        });
    };

    const onSetApproveDnlnvl = async () => {
        if (currentDnlnvl?.status !== StatusApproveEnum["Chờ duyệt ĐNL"]) {
            toastError("Đề nghị lĩnh đã xác nhận");
            return;
        }
        // const promptPromise = confirm(
        //   "Bạn có chắc chắn muốn gửi sang Quản lý đối chiếu?",
        //   "Xác nhận gửi đi"
        // );

        const promptPromise = custom({
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
                    text: "Xác nhận",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });

        let isConfirmApprove = false;
        await promptPromise.show().then((result) => {
            isConfirmApprove = result;
        });
        if (isConfirmApprove) {
            // 2 trạng thái waiting approve
            await axios
                .put(
                    PLANNING_API_URL +
                        "/services/api/dnlnvl/approve/" +
                        StatusApproveEnum["Chờ gửi đối chiếu NVL"] +
                        "/" +
                        currentDnlnvl?.id,
                    {
                        headers: {
                            Authorization: "Bearer" + mainStore.authToken,
                        },
                    },
                )
                .then((res) => {
                    toastSuccess("Gửi sang kho thành công");
                })
                .catch((res) => {
                    toastError("Gửi sang kho thất bại");
                });
            // console.log(currentDnlnvl?.id)

            refresh();
            setPopupDetailIsOpen(false);
        }
    };

    const onSetRejectDnlnvl = async () => {
        if (currentDnlnvl?.status !== StatusApproveEnum["Chờ duyệt ĐNL"]) {
            toastError("Đề nghị lĩnh đã xác nhận");
            return;
        }

        const promptPromise = custom({
            title: "Xác nhận từ chối",
            // messageHtml: "Bạn có thể cho biết lý do từ chối không?",
            messageHtml:
                "Bạn có thể cho biết lý do từ chối không? </br><div div style='margin-top : 30px;margin-left : 3px' > <textarea rows='4' cols='50' placeholder='Hãy nhập lý do từ chối...' ></textarea></div > ",
            dragEnabled: false,
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Từ chối",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        let isConfirmReject = false;
        await promptPromise.show().then((result) => {
            isConfirmReject = result;
        });
        if (isConfirmReject) {
            //4 là tranng thái rejected

            await axios
                .put(PLANNING_API_URL + "/services/api/dnlnvl/approve/" + StatusApproveEnum["Bị từ chối"] + "/" + currentDnlnvl?.id, {
                    headers: {
                        Authorization: "Bearer" + mainStore.authToken,
                    },
                })

                .then((res) => {
                    toastSuccess("Từ chối thành công");
                    refresh();
                })
                .catch((res) => {
                    toastError("Từ chối thất bại");
                });
            // console.log(currentDnlnvl?.id)
            setPopupDetailIsOpen(false);
        }
    };

    const onExport = () => {
        const workbook = new Workbook();
        const workSheet = workbook.addWorksheet("Danh sách NVL");
        const datagrid = dataGridDnlnvlDetailDetailsRef.current?.instance;

        exportDataGrid({
            component: datagrid,
            worksheet: workSheet,
            topLeftCell: { row: 4, column: 1 },
        })
            .then((cellRange) => {
                const headerRow = workSheet.getRow(2);
                headerRow.height = 30;
                const startCol = 1;
                const endCol = datagrid?.columnCount();
                workSheet.mergeCells(2, startCol, 2, endCol ? endCol : 8);

                headerRow.getCell(1).value = `Chi tiết NVL của đề nghị lĩnh ${currentDnlnvl?.id}`;
                headerRow.getCell(1).font = { name: "Segoe UI Light", size: 22 };
                headerRow.getCell(1).alignment = { horizontal: "center" };

                // @ts-ignore
                const footerRowIndex = cellRange.to.row + 2;
                const footerRow = workSheet.getRow(footerRowIndex);
                workSheet.mergeCells(footerRowIndex, startCol, footerRowIndex, endCol ? endCol : 8);

                footerRow.getCell(1).value = "https://rangdong.com.vn";
                footerRow.getCell(1).font = { color: { argb: "BFBFBF" }, italic: true };
                footerRow.getCell(1).alignment = { horizontal: "center" };
            })
            .then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        `Danh sach NVL cua de nghi linh ${currentDnlnvl?.id}.xlsx`,
                    );
                    toastSuccess(`Xuất file Excel chi tiết NVL của đề nghị lĩnh ${currentDnlnvl?.id}`);
                });
            });
    };

    const setPopUpDetailClose = () => {
        setPopupDetailIsOpen(false);
    };

    const setPopUpClose = () => {
        setPopUpIsOpen(false);
    };

    const onButtonDetailClick = (e) => {
        if (e.rowType === "data") {
            setCurrentDnlnvl(e.row.data);
            setPopupDetailIsOpen(true);
        }
    };

    // const renderLaneCell = (data) => {
    //   return <div>{data.value?.laneName}</div>
    // }
    const onPopupMaterialOpen = () => {
        setIsPopupMaterial(true);
        loadDnlnvlDetailDetail(currentDnlnvl?.id);
        // console.log("currentDnlnvlDetailDetails", currentDnlnvlDetailDetails)
    };

    const onPopupMaterialClose = () => {
        setIsPopupMaterial(false);
    };

    const onStatusRender = (data) => {
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
                    status = "Bản thảo";
                    color = "rgba(0, 0, 0, 0.6)";
                    backgroundColor = "rgba(0, 0, 0, 0.05)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    border = "1px solid rgba(0, 0, 0, 0.5)";
                    break;
                case "1":
                    status = "Chờ duyệt ĐNL";
                    color = "rgba(228, 184, 25, 1)";
                    backgroundColor = "rgba(228, 184, 25, 0.1)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    border = "1px solid rgba(228, 184, 25, 0.5)";
                    break;
                case "2":
                    status = "Chờ gửi đối chiếu NVL";
                    color = "rgba(175, 25, 228, 1)";
                    backgroundColor = "rgba(175, 25, 228, 0.1)";
                    padding = "3px 15px";
                    borderRadius = "4px";
                    border = "1px solid rgba(175, 25, 228, 0.5)";
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

    // const onWoIdCellRender = (data) => {

    //   return <div>{data.value?.woId}</div>
    // }

    const popUpDetailContentRender = () => {
        return (
            <ScrollView height='100%' useNative={true} showScrollbar='always'>
                <div style={{ height: "100%" }}>
                    {/*{console.log("currentDnlnvl?.planningWorkOrder", currentDnlnvl?.planningWorkOrder)}*/}
                    <div>
                        {currentDnlnvl?.planningWorkOrder ? (
                            <>
                                <div
                                    style={{
                                        backgroundColor: "white",
                                    }}>
                                    <Form colCount={3} alignItemLabels={true}>
                                        <SimpleItem colSpan={3}>
                                            <table
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}>
                                                <td>
                                                    <InfoRow label={"Loại"} data={currentDnlnvl.dnlnvlType} />
                                                    <InfoRow label={"PO"} data={currentDnlnvl?.planningWorkOrder.productOrder} />
                                                    <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                                    <InfoRow
                                                        label={"Profile"}
                                                        data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode}
                                                    />
                                                </td>

                                                <td>
                                                    <InfoRow label={"Mã sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productCode} />
                                                    <InfoRow label={"Tên sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productName} />
                                                    <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />
                                                </td>
                                                <td>
                                                    <InfoRow label={"SL kế hoạch"} data={currentDnlnvl?.planningWorkOrder.quantityPlan} />
                                                    <InfoRow
                                                        label={"Ngày bắt đầu"}
                                                        data={
                                                            currentDnlnvl?.planningWorkOrder.startTime
                                                                ? new Date(currentDnlnvl?.planningWorkOrder.startTime).toLocaleString(
                                                                      "en-GB",
                                                                  )
                                                                : ""
                                                        }
                                                    />
                                                    <InfoRow
                                                        label={"Ngày kết thúc"}
                                                        data={
                                                            currentDnlnvl?.planningWorkOrder.endTime
                                                                ? new Date(currentDnlnvl?.planningWorkOrder.endTime).toLocaleString("en-GB")
                                                                : ""
                                                        }
                                                    />
                                                </td>
                                            </table>
                                        </SimpleItem>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <Button
                            style={{
                                width: 220,
                                height: 47,
                                color: "#FFFFFF",
                                backgroundColor: "#1F6EE5",
                                marginTop: 30,
                                fontSize: 15,
                            }}
                            onClick={onPopupMaterialOpen}>
                            Xem thông tin chi tiết NVL
                        </Button>
                        <Popup
                            onHiding={onPopupMaterialClose}
                            title={"Danh sách các nguyên vật liệu"}
                            // titleComponent={() => { return <div>Danh sách các nguyên vật liệu</div> }}
                            visible={isPopupMaterial}
                            showTitle={true}
                            closeOnOutsideClick={true}
                            showCloseButton={true}
                            dragEnabled={false}>
                            <ToolbarItem
                                widget='dxButton'
                                toolbar='bottom'
                                location='after'
                                options={{
                                    text: "Hủy",
                                    onClick: onPopupMaterialClose,
                                    stylingMode: "outlined",
                                }}
                            />
                            <>
                                <div>
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
                                        dataSource={currentDnlnvlDetailDetails}
                                        noDataText='Không có dữ liệu để hiển thị'
                                        ref={dataGridDnlnvlDetailDetailsRef}>
                                        <Toolbar>
                                            <ToolbarItem1 name={"searchPanel"} location={"before"} />
                                            <ToolbarItem1 location={"after"}>
                                                <Button onClick={onExport} icon='xlsxfile' hint='Xuất file xlsx' />
                                            </ToolbarItem1>
                                        </Toolbar>
                                        <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                                        <Paging enabled={true} defaultPageSize={10} />
                                        <Pager
                                            visible={true}
                                            displayMode={"full"}
                                            showInfo={true}
                                            showNavigationButtons={true}
                                            allowedPageSizes={[5, 10]}
                                            showPageSizeSelector={true}
                                            infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                        />
                                        <HeaderFilter
                                            visible={true}
                                            texts={{
                                                cancel: "Hủy bỏ",
                                                ok: "Đồng ý",
                                                emptyValue: "Rỗng",
                                            }}
                                        />
                                        <Column dataField='material' caption='Material Id' alignment={"left"} />
                                        <Column dataField='materialName' caption='Material Name' />
                                        <Column dataField='partNumber.name' caption='Part Number Name' />
                                        <Column dataField='rankAp' caption='RankAp' />
                                        <Column dataField='rankMau' caption='RankMau' />
                                        <Column dataField='rankQuang' caption='RankQuang' />
                                        <Column dataField='userData4' caption='UserData4' />
                                        <Column dataField='userData5' caption='UserData5' />
                                        <Column dataField='reserveQty' caption='Reserve Qty' alignment={"left"} />
                                        <Column dataField='stillNeed' caption='Still Need' alignment={"left"} />
                                        <Column dataField='materialState' caption='Material State' />
                                        <Column dataField='locationType' caption='Location(Type)' />
                                        <Column dataField='status' caption='Status' alignment={"left"} />
                                        <Export enabled={true} allowExportSelectedData={true} formats={["xlsx"]} />
                                    </DataGrid>
                                </div>
                            </>

                            {/*<DnlnvlPopupShowMaterialAvailble partNunbers={selectBoxPartNumberDataSource}/>*/}
                        </Popup>
                        <DataGrid
                            keyExpr='userData4'
                            showColumnLines={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            repaintChangesOnly={true}
                            showBorders={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            dataSource={currentDnlnvlDetails}
                            noDataText='Không có dữ liệu để hiển thị'>
                            <Toolbar>
                                <ToolbarItem1 location='after'>
                                    <Button hint='Refresh' onClick={refresh2} icon='refresh' />
                                </ToolbarItem1>
                            </Toolbar>
                            <Paging enabled={true} defaultPageSize={10} />
                            <Pager
                                visible={true}
                                displayMode={"full"}
                                showInfo={true}
                                showNavigationButtons={true}
                                allowedPageSizes={[5, 10]}
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                            />

                            <Column dataField='machine' caption={"Machine"} />
                            <Column dataField='partNumber' caption='PartNumber' />
                            <Column dataField='quantity' caption={"Quantity"} alignment={"left"} />
                            <Column dataField='userData4' caption={"User Data 4"} />
                            <GroupPanel visible={true} allowColumnDragging={true} />
                            <Grouping autoExpandAll={true} />
                            {/* <MasterDetail
                enabled={true}
                // component={DnlnvlDetailView}
              /> */}
                        </DataGrid>
                    </div>
                </div>
            </ScrollView>
        );
    };

    const refresh2 = () => {
        loadDnlnvlDetail(currentDnlnvl?.id);
    };

    const setPopUpPickClose = () => {
        setPopupPickIsOpen(false);
    };

    const refresh = () => {
        loadDnlnvl();
        loadLine();
    };

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
            Loading: "Đang tải...",
        },
    });

    const buttonCellRender = (e) => {
        print(e);
        return (
            <div style={{ display: "flex" }}>
                <div id={"DnlnvlViewDetail" + e.row.data.id} style={{ marginLeft: 25 }}>
                    <Button onClick={() => onButtonDetailClick(e)} icon={"folder"} visible={true} hint='Chi tiết' />
                    {/* <Tooltip
            target={"#DnlnvlViewDetail" + e.row.data.id}
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
            </div>
        );
    };

    return (
        <div id='dnlnvl-approve-view'>
            {/* {currentDnlnvlDetail ? (
          <DnlnvlPopupEditMaterial
            dnlnvlDetail={currentDnlnvlDetail}
            popupIsOpen={popupModifyMaterialIsOpen}
            setPopUpIsOpen={setPopupModifyMaterialIsOpen}
          />
        ) : (
          ""
        )} */}
            <Popup
                visible={popupIsOpen}
                onHiding={setPopUpClose}
                title='Danh sách quản lý phê duyệt'
                showTitle={true}
                fullScreen={false}
                // contentRender={popUpContentRender}
            ></Popup>
            <Popup
                visible={popupDetailIsOpen}
                onHiding={setPopUpDetailClose}
                title='Chi tiết đề nghị lĩnh'
                // titleComponent={() => { return <div>Chi tiết phê duyệt đề nghị lĩnh</div> }}
                showTitle={true}
                fullScreen={false}
                contentRender={popUpDetailContentRender}
                dragEnabled={false}
                resizeEnabled={true}
                closeOnOutsideClick={true}
                showCloseButton={true}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        onClick: setPopUpDetailClose,
                        stylingMode: "outlined",
                    }}
                />

                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Từ chối",
                        type: "danger",
                        onClick: onSetRejectDnlnvl,
                        disabled: currentDnlnvl?.status !== StatusApproveEnum["Chờ duyệt ĐNL"],
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Phê duyệt",
                        type: "default",
                        onClick: onSetApproveDnlnvl,
                        disabled: currentDnlnvl?.status !== StatusApproveEnum["Chờ duyệt ĐNL"],
                    }}
                />
            </Popup>
            <Popup
                visible={popupPickIsOpen}
                onHiding={setPopUpPickClose}
                dragEnabled={false}
                showTitle={true}
                showCloseButton={true}
                fullScreen={false}></Popup>
            <div>
                <div
                    className='informer'
                    style={{
                        paddingTop: 12,
                        background: "#fff",
                    }}>
                    <h5
                        className='name'
                        style={{
                            marginBottom: 0,
                            textAlign: "center",
                            fontSize: 18,
                        }}>
                        Danh sách quản lý phê duyệt
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
                    // id="gridContainer"
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
                    dataSource={dnlnvlList}
                    onCellClick={onButtonDetailClick}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <ColumnChooser enabled={true} />
                    <Toolbar>
                        {/*<ToolbarItem1 location="center">*/}
                        {/*  <div className="informer">*/}
                        {/*    <h5 className="name">Danh sách quản lý phê duyệt</h5>*/}
                        {/*  </div>*/}
                        {/*</ToolbarItem1>*/}
                        <ToolbarItem1 location='after'>
                            <Button hint='Refresh' onClick={refresh} icon='refresh' />
                        </ToolbarItem1>
                        <ToolbarItem1 name='searchPanel' location='before' />
                        <ToolbarItem1 name='columnChooserButton'></ToolbarItem1>
                    </Toolbar>

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
                    <SearchPanel visible={true} placeholder='VD: R2' />
                    <HeaderFilter
                        visible={true}
                        texts={{
                            cancel: "Hủy bỏ",
                            ok: "Đồng ý",
                            emptyValue: "Rỗng",
                        }}
                    />
                    <Paging enabled={true} defaultPageSize={10} />
                    <Export enabled={true} allowExportSelectedData={true} />

                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[5, 10]}
                        infoText='Trang số {0} trên {1} ({2} bản ghi)'
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
                    <Column caption='Tùy chọn' type='buttons' cellRender={buttonCellRender} alignment={"center"}></Column>
                    <Column
                        // allowHeaderFiltering={true}
                        // filterOperations={['startswith', 'endswith']}
                        // sortOrder="asc"
                        minWidth={144}
                        dataField='status'
                        caption='Trạng thái'
                        allowEditing={false}
                        cellRender={onStatusRender}
                        alignment={"left"}>
                        <HeaderFilter dataSource={headerFilterStatus} />
                    </Column>
                    <Column dataField={"dnlnvlType"} caption={"Loại"} />
                    <Column dataField={"id"} caption={"Id"} alignment='left' />
                    <Column dataField='planningWorkOrder.productOrder' caption={"PO"} alignment='left' />
                    <Column dataField='planningWorkOrder.parentWorkOrderId' caption={"Mã WO"} alignment='left' />
                    <Column dataField='planningWorkOrder.woId' caption={"KBSX"} alignment='left' />
                    <Column dataField='planningWorkOrder.line' caption={"Dây chuyền"} alignment='left' />
                    <Column dataField='planningWorkOrder.sapWo' caption='sap WO' />
                    <Column dataField='planningWorkOrder.lotNumber' width={100} caption='Số LOT' />
                    <Column
                        // dataField="numOfReqWo"
                        alignment='left'
                        dataField='numOfReq'
                        width={200}
                        caption='Số lần khuyến nghị theo Wo'
                    />

                    <Column dataField='planningWorkOrder.productCode' caption='Mã sản phẩm' />
                    <Column dataField='planningWorkOrder.productName' caption='Tên sản phẩm' />
                    <Column dataField='sentDate' caption='Thời gian gửi duyệt' dataType='datetime' />
                    <Column dataField='approveDate' caption='Thời gian duyệt' dataType='datetime' />
                    <Column dataField='sentBy' caption='Người gửi duyệt' />
                    <Column dataField='approver' caption='Người phê duyệt' />
                    <Column
                        dataField='planningWorkOrder.startTime'
                        caption='Thời gian bắt đầu'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column
                        dataField='planningWorkOrder.endTime'
                        caption='Thời gian kết thúc'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column caption={"Lý do từ chối"} dataField='reject' />
                </DataGrid>
            </div>
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={"center"}
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={true}
                message='Đang tải...'
            />
        </div>
    );
});

export default DnlnvlApproveView;
