import React, { useEffect, useState } from "react";
import axios from "axios";
import DataGrid, {
    Column,
    FilterRow,
    Paging,
    Pager,
    MasterDetail,
} from 'devextreme-react/data-grid';
import { Tag } from "antd"
import { observer } from "mobx-react";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import { useMainStore } from "@haulmont/jmix-react-core";
import { PLANNING_API_URL } from "../../../../config";
import InfoRow from "../../../shared/components/InfoRow/InfoRow";
import ProgressWODetailJob from "../../ProgressMonitoring/ProgressMonitoringManufacture/ProgressMonitoringWODetail/ProgressWODetailJob/ProgressWODetailJob"
import { customizeColor } from "../../../../utils/utils";


type ProductionInfoDetail = {
    isOpen: boolean,
    setClose?: () => void;
    production_id: ""
};

const stage_value = [
    {
        id: 1,
        value: "In lưới"
    },
    {
        id: 2,
        value: "In offset"
    },
    {
        id: 3,
        value: "Cắt"
    },
]

const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

export const ProductionInfoDetail: React.FC<ProductionInfoDetail> = observer(({
    isOpen = false, setClose, production_id = "" }) => {
    const [content, setContent] = useState<string>();
    const [isVisibleProgressWODetailJob, setisVisibleProgressWODetailJob] = React.useState<boolean>(false);
    const mainStore = useMainStore();
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);

    useEffect(() => {
        loadOrders();
    }, [])

    const loadOrders = () => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        axios.get(PLANNING_API_URL + '/api/orders', { headers })
            .then(response => {
                if (response.status === 200) {
                    setContent(response.data.data)
                }
            }
            );
    }

    const onStatusPoRender = (rowInfo) => {
        // console.log("Data color,", data?.value)
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
        // let backgroundColor = "";
        let padding = "";
        let borderRadius = "";
        let width = "";
        let border = "";

        // let value = rowInfo.data.data.processStatus;
        const getColor = (value) => {
            // let color = ""
            switch (value) {
                case "new":
                    status = "Chờ sản xuất"
                    break;
                case "complete":
                    status = "Hoàn thành"
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành"
                    break
                case "in_production":
                    status = "Đang sản xuất"
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm"
                    break;
                case "delay":
                    status = "Chậm tiến độ"
                    break;
                case "unknown":
                    status = "Chưa xác định"
                    break;
                case "wait_production":
                    status = "Chờ sản xuất"
                    break;
                case "stop":
                    status = "Ngưng sản xuất"
                    break;
                default:
                    status = "Chưa xác định"
                    break;
            }
        }

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status)
        border = "1px solid " + customColor.color;
        // const color = getColor(rowInfo.data.data.processStatus)
        // return <Tag color={color}>{status}</Tag>
        return <Tag style={{
            "fontWeight": "bold",
            "width": "100%",
            "textAlign": "center",
            "color": customColor.color,
            "backgroundColor": customColor.backgroundColor,
            // "padding": padding,
            "borderRadius": "4px",
            // "width": width,
            "border": border
        }}>{status}</Tag>


    }

    // Master detail
    const detailData = () => {
        return (
            <DataGrid
                // showColumnHeaders={false}
                style={{ marginLeft: "0 .5rem" }}
                keyExpr={"saleOrderId"}
                dataSource={content}
                showBorders={true}
                columnAutoWidth={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                focusedRowEnabled={true}
            >
                <FilterRow visible={true} />
                <Column caption={"Mã Job"} dataField={"customer"} alignment="right" ></Column>
                <Column caption={"Tên công nhân"} dataField={"customer"} />
                <Column caption={"Nhóm/tổ"} dataField={"customer"} />
                <Column caption={"Ca sản xuất"} dataType="datetime" dataField={"customer"} />
                <Column caption={"Mã máy"} dataType="datetime" dataField={"customer"} />
                <Column caption={"Mã NVL/BTP đầu vào"} dataField={"customer"} />
                <Column caption={"Số lượng đầu vào"} dataField={"customer"} />

                <Column caption={"Ngày sản xuất"} dataType="datetime" dataField={"startTime"} format="dd/MM/yyyy hh:mm:ss" />
                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />

                <Column type="buttons" width={110} caption="Thao tác" cellRender={() =>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <SvgIcon tooltipTitle="Chi tiết" onClick={() => { setisVisibleProgressWODetailJob(true) }} sizeIcon={17} textSize={17} icon="assets/icons/InfoCircle.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                    </div>}>
                </Column>
            </DataGrid>
        )
    }

    return (
        <>
            {
                isVisibleProgressWODetailJob == true ? <ProgressWODetailJob isOpen={isDeclareInfo}
                    setClose={() => setisDeclareInfo(false)} /> :
                    <div>
                        <div>
                            <div className="table-responsive">
                                <div className="informer" style={{
                                    background: "#fff",
                                    textAlign: "center",
                                    paddingTop: 12
                                }}>
                                    <h5 className="name" style={{
                                        fontSize: 18,
                                        marginBottom: 0
                                    }}>Chi tiết thông tin sản xuất</h5>
                                </div>
                                <div className="informer" style={{
                                    backgroundColor: "#ffffff",
                                    paddingLeft: 13
                                }}>
                                </div>
                            </div>
                        </div>
                        <table
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "90%"
                            }}>
                            <td>
                                <InfoRow label='Mã đơn hàng' data={production_id} />
                                <InfoRow label='Tên thẻ' data='Visa TPBank' />
                                <InfoRow label='Số lượng' data='15,000' />
                                <InfoRow label='Thời gian bắt đầu' data='09/08/2023' />
                            </td>
                            <td>
                                <InfoRow label='Mã sản xuất' data='1321321' />
                                <InfoRow label='Tên khách hàng' data='TPBank' />
                                <InfoRow label='Trạng thái' data='Đang sản xuất' />
                                <InfoRow label='Thời gian kết thúc' data='19/08/2023' />
                            </td>
                        </table>
                        <DataGrid
                            style={{ marginLeft: "0 .5rem" }}
                            keyExpr={"id"}
                            dataSource={stage_value}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                        >
                            <Paging defaultPageSize={10} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"full"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                            <Column caption={"Mã Job"} dataField={"value"} />
                            <Column caption={"Tên công nhân"} />
                            <Column caption={"Nhóm/tổ"} />
                            <Column caption={"Ca sản xuất"} dataType="datetime" />
                            <Column caption={"Mã máy"} dataType="datetime" />
                            <Column caption={"Mã NVL/BTP đầu vào"} />
                            <Column caption={"Số lượng đầu vào"} />

                            <Column caption={"Ngày sản xuất"} dataType="datetime" />
                            <Column caption={"Trạng thái"} dataType="datetime" />
                            <MasterDetail
                                enabled={true}
                                render={detailData}
                            />
                        </DataGrid>
                    </div>
            }
        </>
    )
})


export default ProductionInfoDetail;




