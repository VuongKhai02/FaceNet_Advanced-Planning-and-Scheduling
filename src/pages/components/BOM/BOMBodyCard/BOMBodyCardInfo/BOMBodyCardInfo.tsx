import React, { useEffect, useState } from "react";
import styles from "./BOMBodyCardInfo.module.css";
import classNames from "classnames/bind";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import { DataGrid } from "devextreme-react";
import { Column, FilterRow } from "devextreme-react/data-grid";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import httpRequests from "../../../../../utils/httpRequests";

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

    const [bomInfo, setBomInfo] = useState<any>()

    const [bomId, setBomId] = useState<any>(props.bomId)

    const getBomById = (bomId) => {
        httpRequests.get(`http://localhost:6886/api/boms/${bomId}`)
        .then((response) =>{
            setBomInfo(response.data.data)
        })
    }

    useEffect(() => {
        console.log("hello212321312")
        if (bomId) {
            getBomById(bomId)
        }
        return () => {
            console.log("hello")
            setBomId(null)
        }
    }, [bomId])

    useEffect(() => {
        setBomId(props.bomId)
    }, [props])

    console.log("bom data: ", bomInfo)

    return (
        <>
        { bomInfo && (

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
                                    <InfoRow label='Mã loại thẻ' data={bomInfo!.productCode} />
                                    <InfoRow label='Bom version' data={bomInfo!.version} />
                                </td>
                                <td>
                                    <InfoRow label='Tên loại thẻ' data={bomInfo!.productName} />
                                    <InfoRow label='Trạng thái' data={bomInfo.status === 0 ? 'Hoạt động' : 'Không hoạt động'} />
                                </td>
                            </table>
                        </div>
                        <div style={{ marginTop: 40 }}>
                            <h4>Danh sách vật tư</h4>
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
                            <FilterRow visible={true} />
                            <Column caption={"Mã vật tư"} dataField={"materialCode"} />
                            <Column caption={"Tên vật tư"} dataField={"materialName"} />
                            <Column caption={"Version"} dataField={"version"} />
                            <Column caption={"Phân loại"} dataField={"classify"} />
                            <Column caption={"Định mức"} dataField={"quota"} />
                            <Column caption={"Đơn vị tính"} dataField={"unit"} />
                            <Column caption={"Mã vật tư thay thế"} dataField={"bomBodyCardReplaceMaterials[0].materialCode"} />
                            <Column
                                caption={"Mô tả vật tư thay thế"}
                                dataField={"bomBodyCardReplaceMaterials[0].materialName"}
                            />
                            <Column caption={"Số lượng tồn kho"} dataField={"inventoryQuantity"} />
                            <Column
                                fixed={true}
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div>
                                        <SvgIcon
                                            // onClick={() => setIsVisibleListMaterialReplacement(true)}
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