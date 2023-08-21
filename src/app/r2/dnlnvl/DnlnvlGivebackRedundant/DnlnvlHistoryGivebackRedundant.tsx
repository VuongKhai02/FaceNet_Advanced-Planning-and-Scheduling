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
import DnlnvlHistoryGivebackRedundantPopup from "./DnlnvlHistoryGivebackRedundantPopup";
import { ReturnMaterial } from "../../../../jmix/entities/ReturnMaterial";

type ReturnmaterialProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
    isOpen: boolean;
    setClose: () => void;
};
const DnlnvlHistoryGivebackRedundant: React.FC<ReturnmaterialProps> = observer(
    ({ planningWorkOrder = undefined, isOpen = false, setClose }) => {
        const returnMaterialCollection =
            planningWorkOrder != undefined && planningWorkOrder.woId != undefined
                ? useCollection<ReturnMaterial>(ReturnMaterial.NAME, {
                      view: "with-pwo",
                      loadImmediately: false,
                      sort: "-createdAt",
                      filter: {
                          conditions: [
                              {
                                  group: "AND",
                                  conditions: [
                                      { property: "planningWorkOrder.woId", operator: "=", value: planningWorkOrder.woId },
                                      {
                                          property: "returnMaterialStatus",
                                          operator: "in",
                                          value: [
                                              ReturnMaterialStatuses["Chờ duyệt trả kho"],
                                              ReturnMaterialStatuses["Hoàn thành"],
                                              ReturnMaterialStatuses["Bị từ chối"],
                                          ],
                                      },
                                  ],
                              },
                          ],
                      },
                  })
                : useCollection<ReturnMaterial>(ReturnMaterial.NAME, {
                      view: "with-pwo",
                      loadImmediately: false,
                      filter: {
                          conditions: [
                              {
                                  group: "AND",
                                  conditions: [
                                      {
                                          property: "returnMaterialStatus",
                                          operator: "in",
                                          value: [
                                              ReturnMaterialStatuses["Chờ duyệt trả kho"],
                                              ReturnMaterialStatuses["Đã gửi SAP"],
                                              ReturnMaterialStatuses["Đã gửi MES"],
                                              ReturnMaterialStatuses["Đã gửi SAP, MES"],
                                              ReturnMaterialStatuses["Bị từ chối"],
                                          ],
                                      },
                                  ],
                              },
                          ],
                      },
                  });

        const headerFilterStatus = [
            {
                text: "Chờ duyệt trả kho",
                value: ReturnMaterialStatuses["Chờ duyệt trả kho"],
            },
            {
                text: "Đã gửi SAP",
                value: ReturnMaterialStatuses["Đã gửi SAP"],
            },
            {
                text: "Đã gửi MES",
                value: ReturnMaterialStatuses["Đã gửi MES"],
            },
            {
                text: "Đã gửi SAP, MES",
                value: ReturnMaterialStatuses["Đã gửi SAP, MES"],
            },
            {
                text: "Bị từ chối",
                value: ReturnMaterialStatuses["Bị từ chối"],
            },
        ];

        const [returnMaterialList, setReturnMaterialList] = useState<ReturnMaterial[] | undefined>(undefined);
        const [popupDetailIsOpen, setPopupDetailIsOpen] = useState(false);
        const [currentReturnMaterial, setCurrentReturnMaterial] = useState<ReturnMaterial | undefined>(undefined);

        useEffect(() => {
            loadReturnMaterial();
        }, [planningWorkOrder]);

        const loadReturnMaterial = async () => {
            await returnMaterialCollection.current.load().then((res) => {
                if (returnMaterialCollection.current.items) {
                    setReturnMaterialList(returnMaterialCollection.current.items);
                }
            });
        };

        const setPopUpDetailClose = () => {
            setPopupDetailIsOpen(false);
        };

        const onButtonDetailClick = (e) => {
            if (e.rowType === "data") {
                setCurrentReturnMaterial(e.row.data);
                setPopupDetailIsOpen(true);
            }
        };

        const onStatusRender = (data) => {
            let status = "";
            const getStyle = (value) => {
                let style = {};
                switch (value) {
                    case 0:
                        status = "Bản thảo";
                        style = {
                            background: "rgba(0, 0, 0, 0.05)",
                            padding: "4px 16px",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                            color: "rgba(0, 0, 0, 0.6)",
                            borderRadius: "3px",
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
                            width: "143px",
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
                            width: "105px",
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
                            width: "105px",
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
                            width: "105px",
                        };
                        break;
                }
                return style;
            };

            return <div style={{ ...getStyle(data?.value), textAlign: "center" }}>{status}</div>;
        };

        const refresh = () => {
            loadReturnMaterial();
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
            <div id='dnlnvl-history-giveback-redundant-view'>
                {popupDetailIsOpen && currentReturnMaterial ? (
                    <DnlnvlHistoryGivebackRedundantPopup
                        visible={popupDetailIsOpen}
                        currentReturnMaterial={currentReturnMaterial}
                        setClose={() => setPopUpDetailClose()}
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
                            Lịch sử Work Order chứa NVL dư thừa đã trả kho
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
                        noDataText='Không có dữ liệu để hiển thị'
                        dataSource={returnMaterialList}
                        onCellClick={onButtonDetailClick}>
                        <ColumnChooser enabled={true} />
                        <Toolbar>
                            {/*<ToolbarItem1 location="center">*/}
                            {/*  <div className="informer">*/}
                            {/*    <h5 className="name">Lịch sử Work Order chứa NVL dư thừa đã trả kho</h5>*/}
                            {/*  </div>*/}
                            {/*</ToolbarItem1>*/}
                            <ToolbarItem1 location='after'>
                                <Button style={{ marginLeft: 20 }} icon='return' onClick={setClose} hint='Trở lại' />
                            </ToolbarItem1>
                            <ToolbarItem1 name='searchPanel' location='before' />
                            {/* <ToolbarItem1 name="columnChooserButton" location="after" />
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
                        <Column caption='Tùy chọn' type='buttons' cellRender={buttonCellRender} alignment={"center"}></Column>
                        <Column
                            minWidth={150}
                            alignment='left'
                            dataField='returnMaterialStatus'
                            caption='Trạng thái'
                            allowEditing={false}
                            cellRender={onStatusRender}>
                            <HeaderFilter dataSource={headerFilterStatus} />
                        </Column>

                        {/* <Column dataField="id" caption={"Id"} alignment="left" /> */}
                        <Column dataField='planningWorkOrder.productOrder' caption={"PO"} />
                        <Column dataField='planningWorkOrder.parentWorkOrderId' caption={"Mã WO"} />
                        <Column dataField='planningWorkOrder.woId' caption={"KBSX"} />
                        <Column dataField='planningWorkOrder.line' caption={"Dây chuyền"} alignment='left' />
                        <Column dataField='planningWorkOrder.sapWo' caption='SAP WO' />
                        <Column dataField='planningWorkOrder.lotNumber' width={100} caption='Số LOT' />
                        <Column dataField='planningWorkOrder.productCode' caption='Mã sản phẩm' />
                        <Column dataField='planningWorkOrder.productName' caption='Tên sản phẩm' />
                        <Column alignment='left' dataField='noReturn' width={200} caption='Số lần trả NVL' />
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
                    </DataGrid>
                </div>
            </div>
        );
    },
);

export default DnlnvlHistoryGivebackRedundant;
