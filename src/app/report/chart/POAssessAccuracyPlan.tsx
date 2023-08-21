import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Tooltip } from "devextreme-react/chart";
import service from "./data.js";

const dataSource = service.getPOData();

export const POAssessAccuracyPlan = () => {
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.valueText}`,
        };
    };

    function customizePercentageText({ valueText }) {
        return `${valueText}`;
    }

    return (
        <Chart id='chart' title='Đánh giá tính chính xác của kế hoạch' dataSource={dataSource}>
            <CommonSeriesSettings argumentField='state' type={"fullstackedbar"} />
            <Series
                valueField='arise'
                name='Phát sinh'
                color={"#4A8DB7"}
                label={{ visible: true, customizeText: customizePercentageText }}
            />
            <Series valueField='edit' name='Sửa' color={"orange"} label={{ visible: true, customizeText: customizePercentageText }} />
            <Series
                valueField='rightCustomer'
                name='Đúng KH'
                color={"gray"}
                label={{ visible: true, customizeText: customizePercentageText }}
            />
            <ValueAxis position='left'>{/* <Title text="Danh sách PO" /> */}</ValueAxis>
            <Legend verticalAlignment='bottom' horizontalAlignment='center' itemTextPosition='top' />
            <Tooltip enabled={true} location='edge' customizeTooltip={customizeTooltip} />
        </Chart>
    );
};
