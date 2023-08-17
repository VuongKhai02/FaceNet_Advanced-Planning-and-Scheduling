import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    ColumnChooser,
    Export,
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
import { Button } from "devextreme-react/button";
import { ReturnMaterialStatuses } from "../../enum/statusEnum";
import DnlnvlGivebackRedundantPopup from "./DnlnvlGivebackRedundantPopup";
import DnlnvlHistoryGivebackRedundant from "./DnlnvlHistoryGivebackRedundant";
import { LoadPanel, ScrollView } from "devextreme-react";
import { locale, loadMessages } from "devextreme/localization";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
};
const DnlnvlGivebackRedundantView: React.FC<DnlnvlViewProps> = observer(({ planningWorkOrder = undefined }) => {
    const workOrderCollection =
        planningWorkOrder !== undefined && planningWorkOrder.parentWorkOrderId !== undefined
            ? useCollection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
                  view: "with-profile-programming",
                  loadImmediately: false,
                  sort: "-createdAt",

                  filter: {
                      conditions: [
                          {
                              group: "AND",
                              conditions: [{ property: "parentWorkOrderId", operator: "=", value: planningWorkOrder.parentWorkOrderId }],
                          },
                      ],
                  },
              })
            : useCollection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
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

    const headerFilterStatus = [
        {
            text: "Bản thảo",
            value: ReturnMaterialStatuses["Bản thảo"],
        },
    ];

    const [workOrderList, setWorkOrderList] = useState<PlanningWorkOrder[] | undefined>(undefined);
    const [popupDetailIsOpen, setPopupDetailIsOpen] = useState(false);
    const [currentWorkOrder, setCurrentWorkOrder] = useState<PlanningWorkOrder | undefined>(undefined);
    const [historyGivebackRedundant, setHistoryGivebackRedundant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPlanningWorkOrder();
    }, [planningWorkOrder]);

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
        },
    });

    const loadPlanningWorkOrder = async () => {
        setIsLoading(true);
        await workOrderCollection.current.load().then((res) => {
            if (workOrderCollection.current.items) {
                setWorkOrderList(workOrderCollection.current.items);
                setIsLoading(false);
            }
        });
    };

    const setPopUpDetailClose = () => {
        setPopupDetailIsOpen(false);
    };

    const onButtonDetailClick = (e) => {
        if (e.rowType === "data") {
            setCurrentWorkOrder(e.row.data);
            setPopupDetailIsOpen(true);
        }
    };
    const onButtonHistoryGivebackRedundantClick = () => {
        setHistoryGivebackRedundant(true);
    };

    const onStatusRender = (data) => {
        let status = "";
        const getStyle = (value) => {
            let style = {};
            switch (value) {
                case 0:
                    status = "Đang trả NVL";
                    style = {
                        background: "rgba(0, 0, 0, 0.05)",
                        padding: "4px 16px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        color: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "3px",
                        minWidth: "90px",
                        margin: "auto",
                    };
                    break;
                case 1:
                    status = "Bản thảo";
                    style = {
                        background: "rgba(0, 0, 0, 0.05)",
                        padding: "4px 16px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        color: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "3px",
                        width: "85px",
                        margin: "auto",
                    };
                    break;
                case 2:
                    status = "Bị từ chối";
                    style = {
                        background: "rgba(229, 28, 15, 0.1)",
                        padding: "4px 16px",
                        border: "1px solid rgba(229, 28, 15, 0.5)",
                        color: "#E51C0F",
                        borderRadius: "3px",
                        width: "90px",
                        margin: "auto",
                    };
                    break;
                case 3:
                    status = "Chờ duyệt trả kho";
                    style = {
                        background: "rgba(228, 184, 25, 0.1)",
                        padding: "4px 16px",
                        border: "1px solid rgba(228, 184, 25, 0.5)",
                        color: "#E4B819",
                        borderRadius: "3px",
                        margin: "auto",
                    };
                    break;
                case 4:
                    status = "Đã gửi SAP";
                    style = {
                        background: "rgba(17, 168, 32, 0.1)",
                        padding: "4px 16px",
                        border: "1px solid rgba(0, 151, 15, 0.5)",
                        color: "rgba(0, 151, 15, 0.9)",
                        borderRadius: "3px",
                        margin: "auto",
                    };
                    break;
                case 5:
                    status = "Đã gửi MES";
                    style = {
                        background: "rgba(17, 168, 32, 0.1)",
                        padding: "4px 16px",
                        border: "1px solid rgba(0, 151, 15, 0.5)",
                        color: "rgba(0, 151, 15, 0.9)",
                        borderRadius: "3px",
                        margin: "auto",
                    };
                    break;
                case 6:
                    status = "Đã gửi SAP, MES";
                    style = {
                        background: "rgba(17, 168, 32, 0.1)",
                        padding: "4px 16px",
                        border: "1px solid rgba(0, 151, 15, 0.5)",
                        color: "rgba(0, 151, 15, 0.9)",
                        borderRadius: "3px",
                        margin: "auto",
                    };
                    break;
                default:
                    status = "Bản thảo";
                    style = {
                        background: "rgba(0, 0, 0, 0.05)",
                        padding: "4px 16px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        color: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "3px",
                        width: "85px",
                        margin: "auto",
                    };
            }
            return style;
        };
        return <div style={getStyle(data?.value)}>{status}</div>;
    };

    const refresh = () => {
        loadPlanningWorkOrder();
    };

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

    return (
        <>
            {historyGivebackRedundant ? (
                <DnlnvlHistoryGivebackRedundant
                    isOpen={historyGivebackRedundant}
                    setClose={() => setHistoryGivebackRedundant(false)}
                    planningWorkOrder={planningWorkOrder}
                />
            ) : (
                <div id='dnlnvl-giveback-redundant-view'>
                    {popupDetailIsOpen && currentWorkOrder ? (
                        <DnlnvlGivebackRedundantPopup
                            visible={popupDetailIsOpen}
                            currentPlanningWorkOrder={currentWorkOrder}
                            setClose={() => {
                                setPopUpDetailClose();
                            }}
                            refresh={refresh}
                        />
                    ) : null}
                    <LoadPanel
                        message='Đang tải...'
                        shadingColor='rgba(0,0,0,0.4)'
                        // position={{ of: "#dnlnvl-giveback-redundant-view" }}
                        visible={isLoading}
                        showIndicator={true}
                        showPane={true}
                        shading={true}
                        hideOnOutsideClick={false}
                        onHiding={() => setIsLoading(false)}
                    />
                    <ScrollView>
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
                                Danh sách Work Order chứa nguyên vật liệu dư thừa
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
                            dataSource={workOrderList}
                            onCellClick={onButtonDetailClick}
                            noDataText='Không có dữ liệu để hiển thị'>
                            <ColumnChooser enabled={true} />
                            <Toolbar>
                                {/*<ToolbarItem1 location="center">*/}
                                {/*  <div className="informer">*/}
                                {/*    <h5 className="name">Danh sách Work order chứa nguyên vật liệu dư thừa</h5>*/}
                                {/*  </div>*/}
                                {/*</ToolbarItem1>*/}
                                {/* <ToolbarItem1 location="after">
                <Button hint="Refresh" onClick={refresh} icon="refresh" />
              </ToolbarItem1> */}
                                <ToolbarItem1 location={"after"}>
                                    <Button icon='refresh' hint='Làm mới' onClick={() => loadPlanningWorkOrder()} />
                                </ToolbarItem1>
                                <ToolbarItem1 location='after'>
                                    <Button hint='Lịch sử dư thừa' onClick={onButtonHistoryGivebackRedundantClick} icon='history' />
                                </ToolbarItem1>
                                <ToolbarItem1 name='searchPanel' location='before' />
                                {/* <ToolbarItem1 name="columnChooserButton" location={"after"}></ToolbarItem1>
              <ToolbarItem1 name="exportButton" location="after" /> */}
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
                            <Column caption='Tùy chọn' type='buttons' cellRender={buttonCellRender}></Column>
                            <Column
                                alignment={"center"}
                                dataField='statusReturnMaterial'
                                caption='Trạng thái'
                                allowEditing={false}
                                cellRender={onStatusRender}>
                                <HeaderFilter dataSource={headerFilterStatus} />
                            </Column>
                            {/* <Column dataField="id" caption={"Id"} alignment="left" /> */}
                            <Column dataField='productOrder' caption={"PO"} alignment='left' />
                            <Column dataField='parentWorkOrderId' caption={"Mã WO"} alignment='left' />
                            <Column dataField='woId' caption={"KBSX"} alignment='left' />
                            <Column
                                // dataField="Line"
                                dataField='line'
                                caption={"Dây chuyền"}
                                alignment='left'
                            />
                            <Column dataField='sapWo' caption='SAP WO' />
                            <Column dataField='lotNumber' width={100} caption='Số LOT' />
                            <Column dataField='productCode' caption='Mã sản phẩm' />
                            <Column dataField='productName' caption='Tên sản phẩm' />
                            <Column alignment={"left"} dataField={"numOfReturnMaterial"} caption={"Số lần trả NVL"} />
                            <Column
                                dataField='startTime'
                                caption='Thời gian bắt đầu'
                                dataType='datetime'
                                format='dd/MM/yyyy hh:mm:ss'
                                allowEditing={false}
                            />
                            <Column
                                dataField='endTime'
                                caption='Thời gian kết thúc'
                                dataType='datetime'
                                format='dd/MM/yyyy hh:mm:ss'
                                allowEditing={false}
                            />
                        </DataGrid>
                    </ScrollView>
                </div>
            )}
        </>
    );
});

export default DnlnvlGivebackRedundantView;
