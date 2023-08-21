import React, { useEffect, useState } from "react";

import Chart, {
    ArgumentAxis,
    CommonSeriesSettings,
    Legend,
    Series,
    Tooltip,
    ValueAxis,
    ConstantLine,
    Label,
    ScrollBar,
    ZoomAndPan,
    Format,
    Font,
    Grid,
    CommonAxisSettings,
} from "devextreme-react/chart";
import { ZoomLevel } from "devextreme-react/diagram";

export const PODetailGroupByGroupBarChart = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);

    const visualRange = { length: 10 };

    useEffect(() => {
        let res: any[] = [];
        let newItem = {
            groupCode: "OTHER",
            sumQuantity: 0,
            sumQuantityOut: 0,
            scadaQuantityOut: 0,
        };
        if (props.data && props.data.length > 0) {
            props.data.forEach((item) => {
                if (item.groupCode != null && (item.groupCode === "OTHER" || item.groupCode === "0.0")) {
                    newItem.sumQuantity += item.sumQuantity;
                    newItem.sumQuantityOut += item.sumQuantityOut;
                    newItem.scadaQuantityOut += item.scadaQuantityOut;
                } else {
                    res.push(item);
                }
            });
        }
        res.push(newItem);
        setChartData(res);
    }, [props]);

    function customizeTooltip(pointInfo) {
        return {
            html: `<div><div class="tooltip-header">${pointInfo.argumentText}</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: </div><div class="value-text"><span class='top-series-value'>${pointInfo.points[0].valueText}</span></div><div class="series-name"><span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: </div><div class="value-text"><span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% </div></div></div>`,
        };
    }

    function customizePercentageText({ valueText }) {
        return `${valueText}%`;
    }

    return (
        <Chart title='Tổng tiến độ sản xuất theo tổ' dataSource={chartData} palette='Harmony Light' id='chart' barGroupPadding={0.2}>
            <ZoomAndPan argumentAxis='both' valueAxis='both' />
            <ScrollBar visible={true} />
            <CommonSeriesSettings argumentField='groupCode'>
                <Label visible={false}>
                    <Format type='fixedPoint' precision={0} />
                </Label>
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series
                name='Tổng sản lương nhập kho'
                valueField='sumQuantityOut'
                axis='frequency'
                type='bar'
                color='#75BDE0'
                label={{ visible: true }}
            />
            <Series
                name='Tổng sản lượng công đoạn 1'
                valueField='scadaQuantityOut'
                axis='frequency'
                type='bar'
                color='#F8BC9B'
                label={{ visible: true }}
            />
            <Series
                name='Tổng sản lượng cần sản xuất'
                valueField='sumQuantity'
                axis='frequency'
                type='spline'
                color='#6b71c3'
                label={{ visible: true }}
            />

            <ArgumentAxis defaultVisualRange={visualRange}>
                <Label overlappingBehavior='hide' />
            </ArgumentAxis>
            <ValueAxis name='frequency2' position='right' tickInterval={20} showZero={true} valueMarginsEnabled={false}></ValueAxis>
            <ValueAxis name='frequency' position='left' tickInterval={300} />
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
        </Chart>
    );
};
