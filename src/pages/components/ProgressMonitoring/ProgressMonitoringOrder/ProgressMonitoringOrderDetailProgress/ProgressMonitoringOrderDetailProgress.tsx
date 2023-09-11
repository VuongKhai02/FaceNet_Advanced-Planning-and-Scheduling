import React from "react";
import { DataGrid } from "devextreme-react";
import { observer } from "mobx-react";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import Steps from "antd/lib/steps";
import { Column, FilterRow } from "devextreme-react/data-grid";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import { Button } from "antd";

const data = [
    {
        manufactureCode: "134359",
        productionCode: "SP_001",
        cardName: "Visa TPBank",
        planQuantity: "105",
        finishName: "50",
        finishRatio: "38%",
        errorRatio: "5%",
        startTime: "09/08/2023",
        endTime: "19/08/2023",
    },
    {
        manufactureCode: "134352",
        productionCode: "SP_001",
        cardName: "Visa TPBank",
        planQuantity: "105",
        finishName: "50",
        finishRatio: "38%",
        errorRatio: "5%",
        startTime: "09/08/2023",
        endTime: "19/08/2023",
    },
    {
        manufactureCode: "134353",
        productionCode: "SP_001",
        cardName: "Visa TPBank",
        planQuantity: "105",
        finishName: "50",
        finishRatio: "38%",
        errorRatio: "5%",
        startTime: "09/08/2023",
        endTime: "19/08/2023",
    },
];
const { Step } = Steps;
const items = [
    {
        status: "Phê duyệt",
        time: "01/7/2023",
        color: "green",
    },
    {
        status: "Lập kế hoạch",
        time: "05/7/2023",
        color: "green",
    },
    {
        status: "Đang sản xuất",
        time: "10/07/2023",
        color: "gray",
    },
    {
        status: "Chờ nhập kho",
        time: "4",
        color: "pink",
    },
    {
        status: "Hoàn thành",
        time: "5",
        color: "pink",
    },
];

type ProgressMonitoringOrderDetailProgressProps = {
    isOpen: boolean;
    setClose?: () => void;
};

export const ProgressMonitoringOrderDetailProgress: React.FC<ProgressMonitoringOrderDetailProgressProps> = observer(
    ({ isOpen = false, setClose }) => {
        return (
            <>
                {
                    <div className='box__shadow-table-responsive'>
                        <div className='table-responsive'>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "center",
                                    paddingTop: 12,
                                }}>
                                <h4
                                    className='name'
                                    style={{
                                        fontSize: 25,
                                        marginBottom: 0,
                                        color: "#004C98",
                                    }}>
                                    Tiến độ chi tiết đơn hàng
                                </h4>
                            </div>
                            <div>
                                <table style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <td>
                                        <InfoRow label='Mã đơn hàng' data='SO_2543' />
                                        <InfoRow label='Thời gian bắt đầu' data='11/7/2023 15:08:50' />
                                        <InfoRow label='Thời gian kết thúc' data='11/7/2023 15:08:50' />
                                        <InfoRow label='Trạng thái' data='Đang sản xuất' />
                                    </td>
                                </table>
                            </div>
                            <div style={{ marginBottom: 30, marginTop: 50, borderTop: '1px solid gray' }}>
                                <Steps
                                    current={2}
                                    size='small'
                                    labelPlacement='vertical'
                                    style={{ width: "60%", marginLeft: 300, marginTop: 40 }}>
                                    {items.map((item, index) => (
                                        <Step
                                            key={index}
                                            title={
                                                <div className='custom-step' style={{ color: item.color }}>
                                                    {item.status}
                                                </div>
                                            }
                                            description={
                                                <div className='custom-step' style={{ color: item.color }}>
                                                    {item.time}
                                                </div>
                                            }
                                            style={{ color: item.color }}
                                        />
                                    ))}
                                </Steps>
                                <h4 style={{ color: "#004C98", fontWeight: "600" }}>Danh sách lệnh sản xuất</h4>
                            </div>
                            <DataGrid
                                key={"manufactureCode"}
                                keyExpr={"manufactureCode"}
                                dataSource={data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}>
                                <FilterRow visible={true} />
                                <Column caption={"Mã sản xuất"} dataField={"manufactureCode"} />
                                <Column caption={"Mã sản phẩm"} dataField={"productionCode"} />
                                <Column caption={"Tên thẻ"} dataField={"cardName"} />
                                <Column caption={"Sản lượng kế hoạch"} dataField={"planQuantity"} />
                                <Column caption={"Sản lượng hoàn thành"} dataField={"finishName"} />
                                <Column caption={"Tỷ lệ hoàn thành "} dataField={"finishRatio"} />
                                <Column caption={"Tỷ lệ lỗi"} dataField={"errorRatio"} />
                                <Column dataField='startTime' caption='Thời gian đặt hàng' format={"dd/MM/yyyy"} dataType='datetime' />
                                <Column dataField='endTime' caption='Thời gian trả hàng' format={"dd/MM/yyyy"} dataType='datetime' />
                                <Column
                                    fixed={true}
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={() => (
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon
                                                onClick={() => { }}
                                                tooltipTitle='Thông tin'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'

                                            />
                                        </div>
                                    )}></Column>
                            </DataGrid>
                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 20,
                                    paddingBottom: 20,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    // background: "#ffffff"
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    onClick={setClose}
                                    style={{ backgroundColor: "gray", color: "#fff", width: 120 }}
                                >Trở lại</Button>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    },
);

export default ProgressMonitoringOrderDetailProgress;
