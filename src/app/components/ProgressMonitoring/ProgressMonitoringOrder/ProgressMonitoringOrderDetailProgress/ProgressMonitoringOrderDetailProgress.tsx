import React from "react";
import { Button, DataGrid } from "devextreme-react";
import { observer } from "mobx-react";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import Steps from "antd/lib/steps";
import { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import SvgIcon from "../../../../icons/SvgIcon/SvgIcon";

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
                                    Đang sản xuất
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
                            <div style={{ marginBottom: 30, marginTop: 50 }}>
                                <h3 style={{ color: "#004C98", fontWeight: "600", marginLeft: 120 }}>Giám sát đơn hàng</h3>
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
                                <Column dataField='startTime' caption='Thời gian bắt đầu' format={"dd/MM/yyyy"} dataType='datetime' />
                                <Column dataField='endTime' caption='Thời gian kết thúc' format={"dd/MM/yyyy"} dataType='datetime' />
                                <Column
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={() => (
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon
                                                onClick={() => {}}
                                                tooltipTitle='Thông tin'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                        </div>
                                    )}></Column>
                            </DataGrid>
                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 10,
                                    float: "right",
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    text='Trở lại'
                                    onClick={setClose}
                                    style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333", width: 120 }}
                                />
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    },
);

export default ProgressMonitoringOrderDetailProgress;
