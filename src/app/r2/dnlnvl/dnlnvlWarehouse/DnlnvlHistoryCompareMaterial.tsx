import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem1,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { useCollection } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import { Button } from "devextreme-react/button";
import { StatusApproveEnum } from "../../enum/statusEnum";
import { locale, loadMessages } from "devextreme/localization";
import DnlnvlHistoryCompareMaterialPopup from "./DnlnvlHistoryCompareMaterialPopup";
import { useWindowDimensions } from "../../../../hooks";

type DnlnvlHistoryMaterialViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
    isOpen: boolean;
    setClose?: () => void;
};

const DnlnvlHistoryCompareMaterial: React.FC<DnlnvlHistoryMaterialViewProps> = observer(
    ({ planningWorkOrder = undefined, isOpen = false, setClose }) => {
        const dnlnvlCollection =
            planningWorkOrder != undefined && planningWorkOrder.woId != undefined
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
                      sort: "-createdAt",
                      filter: {
                          conditions: [
                              {
                                  group: "OR",
                                  conditions: [
                                      {
                                          property: "status",
                                          operator: "in",
                                          value: [
                                              // StatusApproveEnum["waiting approve"],
                                              // StatusApproveEnum.rejected,
                                              StatusApproveEnum["Đã gửi SAP"],
                                              StatusApproveEnum["Đã gửi SAP, MES"],
                                          ],
                                      },
                                      {
                                          property: "stopDnlnvl",
                                          operator: "=",
                                          value: "true",
                                      },
                                  ],
                              },
                          ],
                      },
                  });
        const [dnlnvlList, setDnlnvlList] = useState<Dnlnvl[] | undefined>(undefined);
        const [popupDetailIsOpen, setPopupDetailIsOpen] = useState(false);
        const [currentDnlnvl, setCurrentDnlnvl] = useState<Dnlnvl | undefined>(undefined);
        const { width, height } = useWindowDimensions();

        useEffect(() => {
            loadDnlnvl();
        }, [planningWorkOrder]);

        const loadDnlnvl = async () => {
            await dnlnvlCollection.current.load().then((res) => {
                if (dnlnvlCollection.current.items) {
                    setDnlnvlList(dnlnvlCollection.current.items);
                }
            });
        };

        const setPopUpDetailClose = () => {
            setPopupDetailIsOpen(false);
        };

        const onButtonDetailClick = (e) => {
            if (e.rowType === "data") {
                setCurrentDnlnvl(e.row.data);
                setPopupDetailIsOpen(true);
            }
        };

        const onStatusRender = (data: { value: any }) => {
            // console.log("Data color,", data?.value)
            console.log("Data color,", data);
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
                        status = "Đã dừng đối chiếu NVL";
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
                        width = "106px";
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

        const refresh = () => {
            loadDnlnvl();
        };

        locale("en");
        loadMessages({
            en: {
                OK: "Đồng ý",
                Cancel: "Hủy bỏ",
                "dxCalendar-todayButtonText": "Hôm nay",
                Loading: "Đang tải...",
            },
        });

        const buttonCellRender = (e) => {
            // print(e)
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

        const headerFilterStatus = [
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

        return (
            <div id='dnlnvl-history-compare-material-view'>
                {popupDetailIsOpen && currentDnlnvl ? (
                    <DnlnvlHistoryCompareMaterialPopup
                        currentDnlnvl={currentDnlnvl}
                        visible={popupDetailIsOpen}
                        setClose={() => setPopUpDetailClose()}
                        refreshDnlnvl={refresh}
                    />
                ) : null}
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
                            Lịch sử đề nghị lĩnh đã đối chiếu NVL
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
                        visible={isOpen}
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
                        <Toolbar>
                            {/* <ToolbarItem1 location="after">
                        <Button hint="Refresh" onClick={refresh} icon="refresh" />
                </ToolbarItem1> */}
                            <ToolbarItem1 location='after'>
                                <Button style={{ marginLeft: 20 }} icon='return' onClick={setClose} hint='Trở lại' />
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
                        <SearchPanel visible={true} placeholder='VD: KH' />
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
                        {width > 600 && (
                            <Column caption='Tùy chọn' type='buttons' cellRender={buttonCellRender} alignment={"center"}></Column>
                        )}
                        {width > 600 && (
                            <Column minWidth={140} dataField='status' caption='Trạng thái' allowEditing={false} cellRender={onStatusRender}>
                                <HeaderFilter dataSource={headerFilterStatus} />
                            </Column>
                        )}
                        <Column dataField='id' caption={"Id"} alignment='left' />
                        <Column dataField='planningWorkOrder.sapWo' caption='SAP WO' />
                        <Column dataField='planningWorkOrder.parentWorkOrderId' caption={"Mã WO"} alignment='left' />
                        <Column dataField='planningWorkOrder.woId' caption={"Wo id"} alignment='left' />
                        <Column dataField='planningWorkOrder.lotNumber' width={150} caption='Số LOT' />
                        <Column dataField='planningWorkOrder.productCode' caption='Mã sản phẩm' />
                        <Column dataField='planningWorkOrder.productName' caption='Tên sản phẩm' />
                        {width > 600 && <Column dataField='planningWorkOrder.productOrder' caption={"PO"} alignment='left' />}
                        {width > 600 && (
                            <Column
                                // dataField="Line"
                                dataField='planningWorkOrder.line'
                                caption={"Dây chuyền"}
                                alignment='left'
                            />
                        )}
                        {width > 600 && (
                            <Column
                                // dataField="numOfReqWo"
                                alignment='left'
                                dataField='numOfReq'
                                width={200}
                                headerCellRender={() => {
                                    return <div>Số lần khuyến nghị theo Wo</div>;
                                }}
                            />
                        )}
                        {width > 600 && (
                            <Column dataField='sentDate' caption='Thời gian gửi duyệt' dataType='datetime' format='dd/MM/yyyy, hh:mm a' />
                        )}
                        {width > 600 && (
                            <Column
                                // dataField="CompleteDate"
                                dataField={"approveDate"}
                                caption='Thời gian duyệt'
                                dataType='datetime'
                                format='dd/MM/yyyy, hh:mm a'
                            />
                        )}
                        {width > 600 && (
                            <Column
                                // dataField="sentBy"
                                dataField={"createdBy"}
                                caption='Người gửi duyệt'
                            />
                        )}
                        {width > 600 && (
                            <Column
                                // dataField="Completer"
                                dataField={"planningWorkOrder.profileId.updatedBy"}
                                caption='Người phê duyệt'
                            />
                        )}
                        {width > 600 && (
                            <Column
                                dataField='planningWorkOrder.startTime'
                                caption='Thời gian bắt đầu'
                                dataType='datetime'
                                format='dd/MM/yyyy hh:mm:ss'
                                allowEditing={false}
                            />
                        )}
                        {width > 600 && (
                            <Column
                                dataField='planningWorkOrder.endTime'
                                caption='Thời gian kết thúc'
                                dataType='datetime'
                                format='dd/MM/yyyy hh:mm:ss'
                                allowEditing={false}
                            />
                        )}
                    </DataGrid>
                </div>
            </div>
        );
    },
);

export default DnlnvlHistoryCompareMaterial;

// const ROUTING_PATH = "/dnlnvlHistoryCompareMaterial";

// registerScreen({
//   component: DnlnvlHistoryCompareMaterial,
//   caption: "Lịch sử đối chiếu NVL ",
//   screenId: "screen.DnlnvlHistoryCompareMaterial",
//   menuOptions: {
//     pathPattern: ROUTING_PATH,
//     menuLink: ROUTING_PATH
//   }
// });
