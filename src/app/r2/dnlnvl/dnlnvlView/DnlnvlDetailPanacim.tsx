import React, { useEffect, useState } from "react";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";

import { Button, DataGrid, Form, Popup, ScrollView, SelectBox } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { Column, Pager, Paging, FilterRow, HeaderFilter, OperationDescriptions } from "devextreme-react/data-grid";

import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import InfoRow from "../../../../utils/InfoRow";
import { User } from "../../../../jmix/entities/User";
import { Roles, StatusApproveEnum } from "../../enum/statusEnum";
import UserService from "../../../../Keycloak";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";

interface DnlnvlPopupViewProps {
    visible: boolean;
    onHiding: () => void;
    setPopupClose: () => void;
    refreshDnlnvl: () => void;
    currentDnlnvl: Dnlnvl | undefined;
}

const DnlnvlDetailPanacim = ({
    visible = false,
    onHiding = () => {},
    setPopupClose = () => {},
    refreshDnlnvl = () => {},
    currentDnlnvl,
}: DnlnvlPopupViewProps) => {
    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });
    const [dnlnvlDetailDetails, setDnlnvlDetailDetails] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    const [listWarehouses, setListWarehouses] = useState<any[]>([]);
    const [listUsers, setListUsers] = useState<User[]>([]);
    const [warehouseApprove, setWarehouseApprove] = useState();
    const [warehouseSelectedValue, setWarehouseSelectedValue] = useState<string | null>(null);
    const [warehouseApprover, setWarehouseApprover] = useState<User | null>(null);
    const [warehouseApproverSelectedValue, setWarehouseApproverSelectedValue] = useState<string | null>(null);
    useEffect(() => {
        loadDnlnvlDetailDetails(currentDnlnvl?.id);
    }, []);

    const loadDnlnvlDetailDetails = (id) => {
        dnlnvlDetailDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvlDetail.dnlnvl.id", operator: "=", value: id }],
        };
        dnlnvlDetailDetailCollection.current.load().then((res) => {
            setDnlnvlDetailDetails(dnlnvlDetailDetailCollection.current.items);
        });
    };
    const setPopUpDetailClose = () => {
        setPopupClose();
    };
    const popUpDetailContentRender = () => {
        return (
            <ScrollView height='100%' useNative={true} showScrollbar='always'>
                <div style={{ height: "100%" }}>
                    {
                        <div>
                            {currentDnlnvl?.planningWorkOrder ? (
                                <>
                                    <div style={{ backgroundColor: "white" }}>
                                        <Form colCount={3} alignItemLabels={true}>
                                            <SimpleItem colSpan={3}>
                                                <div
                                                    style={{
                                                        height: "200px",
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
                                                    <table
                                                        width={"100%"}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                        }}>
                                                        <td>
                                                            <InfoRow label={"Loại"} data={"Panacim"} />
                                                            <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                                            <InfoRow label={"Số LOT"} data={currentDnlnvl?.planningWorkOrder.lotNumber} />
                                                        </td>
                                                        <td>
                                                            <InfoRow label={"WO panacim"} data={currentDnlnvl.woNamePana} />
                                                            <InfoRow
                                                                label={"Mã sản phẩm"}
                                                                data={currentDnlnvl?.planningWorkOrder.productCode}
                                                            />
                                                            <InfoRow
                                                                label={"Tên sản phẩm"}
                                                                data={currentDnlnvl?.planningWorkOrder.productName}
                                                            />
                                                        </td>
                                                        <td>
                                                            <InfoRow label={"Dây chuyền"} data={currentDnlnvl.planningWorkOrder.line} />
                                                            <InfoRow
                                                                label={"Profile"}
                                                                data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode}
                                                            />
                                                            <InfoRow
                                                                label={"Profile name"}
                                                                data={currentDnlnvl?.planningWorkOrder.profileId?.name}
                                                            />
                                                        </td>
                                                    </table>
                                                </div>
                                            </SimpleItem>
                                        </Form>
                                        <br />
                                        <br />
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            <DataGrid
                                style={{
                                    marginTop: 8,
                                }}
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
                                dataSource={dnlnvlDetailDetails}
                                noDataText='Không có dữ liệu để hiển thị'>
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
                                <Column allowEditing={false} dataField={"material"} caption={"Material ID"} alignment='left' />
                                <Column allowEditing={false} dataField={"materialName"} caption={"Material Name"} />
                                <Column allowEditing={false} dataField={"partNumber.partNumberCode"} caption='Part Code' />
                                <Column allowEditing={false} dataField={"partNumber.name"} caption='Part Name' />
                                <Column allowEditing={false} dataField={"rankAp"} caption={"rankAp"} />
                                <Column allowEditing={false} dataField={"rankQuang"} caption={"rankQuang"} />
                                <Column allowEditing={false} dataField={"rankMau"} caption={"rankMau"} />
                                <Column allowEditing={false} dataField={"userData4"} caption={"userData4"} />
                                <Column allowEditing={false} dataField={"userData5"} caption={"userData5"} />
                                <Column allowEditing={false} dataField={"reserveQty"} caption={"Số lượng"} alignment='left' />
                                <Column allowEditing={false} dataField={"materialState"} caption={"Material State"} />
                                <Column allowEditing={false} dataField={"locationType"} caption={"Location"} />
                                <Column allowEditing={false} dataField={"status"} caption={"Status"} alignment='left' />
                            </DataGrid>
                        </div>
                    }
                </div>
                <div
                    style={{
                        position: "relative",
                        marginTop: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "16px",
                        padding: "16px",
                        display: "grid",
                        gridTemplateColumns: "auto auto auto",
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
                        <b>Chọn thông tin gửi đi</b>
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
                </div>
            </ScrollView>
        );
    };
    return (
        <>
            <Popup
                visible={visible}
                onHiding={onHiding}
                // title={"Danh sách đề nghị lĩnh"}
                titleRender={() => {
                    return <div>Thông tin đề nghị lĩnh nguyên vật liệu Panacim</div>;
                }}
                showTitle={true}
                fullScreen={false}
                contentRender={popUpDetailContentRender}
                height={"90%"}
                dragEnabled={false}>
                {UserService.hasRole([Roles["admin"]]) || UserService.hasRole([Roles["qly_DNL"]]) ? (
                    <ToolbarItem
                        widget='dxButton'
                        toolbar='bottom'
                        location='after'
                        options={{
                            text: "Hủy",
                            stylingMode: "outlined",
                            onClick: setPopUpDetailClose,
                        }}
                    />
                ) : (
                    ""
                )}
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Lưu",
                        type: "default",
                    }}
                    disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Gửi",
                        type: "success",
                    }}
                    disabled={currentDnlnvl?.status !== StatusApproveEnum["Bản nháp"]}
                />
            </Popup>
        </>
    );
};

export default DnlnvlDetailPanacim;
