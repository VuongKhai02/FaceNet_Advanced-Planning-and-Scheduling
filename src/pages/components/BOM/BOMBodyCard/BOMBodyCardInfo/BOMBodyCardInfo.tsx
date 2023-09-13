import React, { useEffect, useState } from "react";
import styles from "./BOMBodyCardInfo.module.css";
import classNames from "classnames/bind";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import { DataGrid } from "devextreme-react";
import {
    Item as ToolbarItem,
    Toolbar,
} from "devextreme-react/data-grid";
import { Column, FilterRow, OperationDescriptions } from "devextreme-react/data-grid";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import httpRequests from "../../../../../utils/httpRequests";
import { useTranslation } from "react-i18next";
import PopupBOM from "../../../../../shared/components/PopupBOM/PopupBOM";

const cx = classNames.bind(styles);

const data2 = [
    {
        codeMaterial: "VT0001",
        replaceMaterialName: "Mực 02",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
    {
        codeMaterial: "VT0002",
        replaceMaterialName: "Mực 02",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
    {
        codeMaterial: "VT0003",
        replaceMaterialName: "Mực 02",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
];

export const BOMBodyCardInfo = React.memo((props: any) => {
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);
    const [bomInfo, setBomInfo] = useState<any>()
    const { t } = useTranslation(["common"]);
    const getBomById = (bomId: any) => {
        httpRequests.get(`http://localhost:6886/api/boms/${bomId}`)
            .then((response) => {
                setBomInfo(response.data.data)
            })
    }

    useEffect(() => {
        if (props!.bomId) {
            getBomById(props.bomId)
        }
    }, [props!.bomId])

    console.log("bom data: ", bomInfo)

    const handleCustomFooter = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}></div>
        </div>
    ];

    return (
        <>
            {bomInfo && (

                <div>
                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                        <div>
                            <div>
                                <table
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-arround",
                                    }}>
                                    <td>
                                        <InfoRow label='Mã loại thẻ' data={bomInfo!.productCode} />
                                        <InfoRow label='Bom version' data={bomInfo!.version} />
                                    </td>
                                    <td>
                                        <InfoRow label='Tên loại thẻ' data={bomInfo!.productName} />
                                        <InfoRow label='Trạng thái' data={bomInfo.status === 0 ? 'Hoạt động' : 'Không hoạt động'} />
                                    </td>
                                </table>
                            </div>
                            <div style={{ marginTop: 40, fontSize: 20 }}>
                                <p>Danh sách vật tư</p>
                            </div>
                            <DataGrid
                                key={"id"}
                                keyExpr={"id"}
                                dataSource={bomInfo.bomBodyCardMaterials}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}>

                                <PopupBOM
                                    isVisible={isVisibleListMaterialReplacement}
                                    modalContent={
                                        <div>
                                            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                                <div>
                                                    <div>
                                                        <table
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-arround",
                                                            }}>
                                                            <td>
                                                                <InfoRow label='Mã vật tư' data='VT001' />
                                                                <InfoRow label='Bom version' data='1.1' />
                                                            </td>
                                                            <td>
                                                                <InfoRow label='Tên vật tư' data='Mực 01' />
                                                                <InfoRow label='Trạng thái' data='Hoạt động' />
                                                            </td>
                                                        </table>
                                                    </div>
                                                    <DataGrid
                                                        key={"replaceMaterialCode"}
                                                        keyExpr={"replaceMaterialCode"}
                                                        dataSource={data2}
                                                        showBorders={true}
                                                        columnAutoWidth={true}
                                                        showRowLines={true}
                                                        rowAlternationEnabled={true}
                                                        allowColumnResizing={true}
                                                        allowColumnReordering={true}
                                                        focusedRowEnabled={true}>
                                                        <Toolbar>
                                                            <ToolbarItem location='before'>
                                                                <div>
                                                                    <p style={{ fontSize: 20 }}>Danh sách vật tư</p>
                                                                </div>
                                                            </ToolbarItem>
                                                            <ToolbarItem>
                                                                <SvgIcon
                                                                    sizeIcon={25}
                                                                    text='Thêm mới'
                                                                    tooltipTitle='Thêm vật tư thay thế cho vật tư(Sau khi ấn link sang hệ thống MDM)'
                                                                    icon='assets/icons/CircleAdd.svg'
                                                                    textColor='#FF7A00'
                                                                />
                                                            </ToolbarItem>
                                                        </Toolbar>
                                                        <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                                            <OperationDescriptions
                                                                startsWith={t("common.startsWith")}
                                                                equal={t("common.equal")}
                                                                endsWith={t("common.endsWith")}
                                                                contains={t("common.contains")}
                                                                notContains={t("common.notContains")}
                                                                notEqual={t("common.notEqual")}
                                                                lessThan={t("common.lessThan")}
                                                                lessThanOrEqual={t("common.lessThanOrEqual")}
                                                                greaterThan={t("common.greaterThan")}
                                                                greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                                                between={t("common.between")}
                                                            />
                                                        </FilterRow>
                                                        <Column caption={"Mã vật tư thay thế"} dataField={"replaceMaterialCode"} />
                                                        <Column caption={"Tên vật tư thay thế"} dataField={"replaceMaterialName"} />
                                                        <Column caption={"Version"} dataField={"version"} />
                                                        <Column caption={"Phân loại"} dataField={"classify"} />
                                                        <Column caption={"Định mức"} dataField={"norm"} />
                                                        <Column caption={"Đơn vị tính"} dataField={"unit"} />
                                                        <Column caption={"Số lượng tồn kho"} dataField={"inventoryQuantity"} />
                                                    </DataGrid>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    modalTitle={
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon
                                                sizeIcon={25}
                                                icon='assets/icons/Announcement.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            Danh sách vật tư thay thế
                                        </div>
                                    }
                                    width={1300}
                                    onCancel={() => setIsVisibleListMaterialReplacement(false)}
                                    onSubmit={() => { }}
                                    customFooter={handleCustomFooter}
                                />
                                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                    <OperationDescriptions
                                        startsWith={t("common.startsWith")}
                                        equal={t("common.equal")}
                                        endsWith={t("common.endsWith")}
                                        contains={t("common.contains")}
                                        notContains={t("common.notContains")}
                                        notEqual={t("common.notEqual")}
                                        lessThan={t("common.lessThan")}
                                        lessThanOrEqual={t("common.lessThanOrEqual")}
                                        greaterThan={t("common.greaterThan")}
                                        greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                        between={t("common.between")}
                                    />
                                </FilterRow>
                                <Column caption={"Mã vật tư"} dataField={"materialCode"} />
                                <Column caption={"Tên vật tư"} dataField={"materialName"} />
                                <Column caption={"Version"} dataField={"version"} />
                                <Column caption={"Phân loại"} dataField={"classify"} />
                                <Column caption={"Định mức"} dataField={"quota"} />
                                <Column caption={"Đơn vị tính"} dataField={"unit"} />
                                {/* <Column caption={"Mã vật tư thay thế"} dataField={"bomBodyCardReplaceMaterials[0].materialCode"} />
                                <Column
                                    caption={"Mô tả vật tư thay thế"}
                                    dataField={"bomBodyCardReplaceMaterials[0].materialName"}
                                /> */}
                                <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                                <Column caption="Số lượng sẵn sàng" dataField="availableQuantity" />
                                <Column caption="Phân loại" dataField="type" />
                                <Column caption="Mặt trước" dataField="front" />
                                <Column caption="Mặt sau" dataField="back" />
                                <Column
                                    fixed={true}
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={() => (
                                        <div>
                                            <SvgIcon
                                                onClick={() => setIsVisibleListMaterialReplacement(true)}
                                                tooltipTitle='Danh sách vật tư thay thế'
                                                sizeIcon={17}
                                                icon='assets/icons/EyeOpen.svg'
                                                textColor='#FF7A00'
                                                style={{ marginLeft: 35 }}
                                            />
                                        </div>
                                    )}
                                />
                            </DataGrid>
                        </div>
                    </div>
                </div>
            )

            }
        </>
    )
})