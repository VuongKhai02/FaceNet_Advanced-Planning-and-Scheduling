import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    ColumnChooser,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem1,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    Export,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import { confirm } from "devextreme/ui/dialog";
import { useCollection } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../../../jmix/entities/PlanningWorkOrder";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import { Button } from "devextreme-react/button";
import { print } from "../../../../utils/utils";
import { Tooltip } from "devextreme-react/tooltip";
import { ReturnMaterialStatuses, StatusApproveEnum } from "../../enum/statusEnum";
import DnlnvlApproveRedundantPopupView from "./DnlnvlApproveReduntdantPopupView";
import { ReturnMaterial } from "../../../../jmix/entities/ReturnMaterial";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
    setClose?: () => void;
};
const DnlnvlApproveRedundantHistory: React.FC<DnlnvlViewProps> = ({ planningWorkOrder = undefined, setClose = () => {} }) => {
    const returnMaterialCollection = useCollection<ReturnMaterial>(ReturnMaterial.NAME, {
        view: "with-pwo",
        loadImmediately: false,
    });

    const headerFilterStatus = [
        {
            text: "Hoàn thành",
            value: ReturnMaterialStatuses["Hoàn thành"],
        },
        {
            text: "Bị từ chối",
            value: ReturnMaterialStatuses["Bị từ chối"],
        },
    ];
    const [returnMaterialList, setReturnMaterialList] = useState<ReturnMaterial[] | undefined>(undefined);
    const [currentReturnMaterial, setCurrentReturnMaterial] = useState<ReturnMaterial | undefined>(undefined);
    const [popupDetailOpen, setPopupDetailOpen] = useState<boolean>(false);

    useEffect(() => {
        if (planningWorkOrder != undefined && planningWorkOrder.woId != undefined) {
            returnMaterialCollection.current.filter = {
                conditions: [
                    {
                        group: "AND",
                        conditions: [
                            { property: "planningWorkOrder.woId", operator: "=", value: planningWorkOrder?.woId },
                            {
                                property: "returnMaterialStatus",
                                operator: "in",

                                value: [
                                    ReturnMaterialStatuses["Đã gửi MES"],
                                    ReturnMaterialStatuses["Đã gửi SAP"],
                                    ReturnMaterialStatuses["Đã gửi SAP, MES"],
                                    ReturnMaterialStatuses["Bị từ chối"],
                                ],
                            },
                        ],
                    },
                ],
            };
        } else {
            returnMaterialCollection.current.filter = {
                conditions: [
                    {
                        property: "returnMaterialStatus",
                        operator: "in",
                        value: [
                            ReturnMaterialStatuses["Đã gửi MES"],
                            ReturnMaterialStatuses["Đã gửi SAP"],
                            ReturnMaterialStatuses["Đã gửi SAP, MES"],
                            ReturnMaterialStatuses["Bị từ chối"],
                        ],
                    },
                ],
            };
        }
        loadDnlnvl();
    }, [planningWorkOrder]);

    const loadDnlnvl = async () => {
        await returnMaterialCollection.current.load().then((res) => {
            if (returnMaterialCollection.current.items) {
                setReturnMaterialList(returnMaterialCollection.current.items);
            }
        });
    };

    const onButtonDetailClick = (e) => {
        if (e.rowType === "data") {
            setCurrentReturnMaterial(e.row.data);
            setPopupDetailOpen(true);
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
        loadDnlnvl();
    };

    const buttonCellRender = (e) => {
        // print(e)
        return (
            <div style={{ display: "flex" }}>
                <div id={"DnlnvlViewDetail" + e.row.data.id} style={{ marginLeft: 25 }}>
                    <Button onClick={() => onButtonDetailClick(e)} icon={"folder"} visible={true} hint='Chi tiết' />
                    {/*<Tooltip*/}
                    {/*    target={"#DnlnvlViewDetail" + e.row.data.id}*/}
                    {/*    showEvent="dxhoverstart"*/}
                    {/*    hideEvent="dxhoverend"*/}
                    {/*    contentRender={() => {*/}
                    {/*        return (*/}
                    {/*            <p>Detail</p>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*    closeOnOutsideClick={false}*/}
                    {/*/>*/}
                </div>
            </div>
        );
    };

    return (
        <div id='dnlnvl-approve-redundant-history-view'>
            {popupDetailOpen && (
                <DnlnvlApproveRedundantPopupView
                    isOpen={popupDetailOpen}
                    currentReturnMaterial={currentReturnMaterial}
                    onClose={() => setPopupDetailOpen(false)}
                />
            )}
            <div>
                <div
                    className='informer'
                    style={{
                        background: "#fff",
                        paddingTop: 12,
                    }}>
                    <h5
                        className='name'
                        style={{
                            textAlign: "center",
                            fontSize: 18,
                            marginBottom: 0,
                        }}>
                        Lịch sử phê duyệt DNL nguyên vật liệu dư thừa{" "}
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
                    dataSource={returnMaterialList}
                    onCellClick={onButtonDetailClick}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <ColumnChooser enabled={true} />
                    <Toolbar>
                        {/*<ToolbarItem1 location="center">*/}
                        {/*  <div className="informer">*/}
                        {/*    <h5 className="name">Lịch sử phê duyệt DNL nguyên vật liệu dư thừa </h5>*/}
                        {/*  </div>*/}
                        {/*</ToolbarItem1>*/}
                        {/* <ToolbarItem1 location="after">
                            <Button hint="Refresh" onClick={refresh} icon="refresh" />
                        </ToolbarItem1> */}
                        <ToolbarItem1 name='addRowButton' location='after' />
                        <ToolbarItem1 location={"after"}>
                            <Button
                                icon='return'
                                hint='Trở về'
                                style={{
                                    marginLeft: 10,
                                }}
                                onClick={setClose}
                            />
                        </ToolbarItem1>
                        <ToolbarItem1 name='searchPanel' location='before' />
                        {/* <ToolbarItem1 name="columnChooserButton"></ToolbarItem1> */}
                        <ToolbarItem1 name='exportButton' location='after' />
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
                    <HeaderFilter
                        visible={true}
                        texts={{
                            cancel: "Hủy bỏ",
                            ok: "Đồng ý",
                            emptyValue: "Rỗng",
                        }}
                    />
                    <SearchPanel visible={true} placeholder='VD: WO' />
                    <Paging enabled={true} defaultPageSize={10} />
                    {/* <Export enabled={true} allowExportSelectedData={true} /> */}
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
                    <Column alignment={"center"} caption='Tùy chọn' type='buttons' cellRender={buttonCellRender}></Column>
                    <Column
                        minWidth={150}
                        dataField='returnMaterialStatus'
                        caption='Trạng thái'
                        allowEditing={false}
                        alignment={"left"}
                        cellRender={onStatusRender}>
                        <HeaderFilter dataSource={headerFilterStatus} />
                    </Column>

                    {/* <Column dataField="id" caption={"Id"} alignment="left" /> */}
                    <Column dataField='planningWorkOrder.productOrder' caption={"PO"} />
                    <Column dataField='planningWorkOrder.parentWorkOrderId' caption={"Mã WO"} />
                    <Column dataField='planningWorkOrder.woId' caption={"KBSX"} />
                    <Column
                        // dataField="Line"
                        dataField='planningWorkOrder.line'
                        caption={"Dây chuyền"}
                        alignment='left'
                    />
                    <Column dataField='planningWorkOrder.sapWo' caption='sap WO' />
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
};

export default DnlnvlApproveRedundantHistory;
