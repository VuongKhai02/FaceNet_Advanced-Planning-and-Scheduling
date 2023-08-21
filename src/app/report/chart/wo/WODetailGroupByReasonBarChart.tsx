import { Chart } from "devextreme-react";
import {
    ArgumentAxis,
    CommonAxisSettings,
    CommonSeriesSettings,
    Grid,
    Label,
    Legend,
    Series,
    Title,
    ValueAxis,
} from "devextreme-react/chart";
import React, { useEffect, useState } from "react";

type WODetailGroupByReasonBarChartProps = {
    data: any;
};

type WODetailGroupByReasonWithPercent = {
    reason: string;
    countProduct: number;
    percent: number;
};

const WODetailGroupByReasonBarChart = ({ data }: WODetailGroupByReasonBarChartProps) => {
    const [dataChart, setDataChart] = useState<WODetailGroupByReasonWithPercent[]>([]);
    const initData: WODetailGroupByReasonWithPercent[] = [
        {
            reason: "Tiến độ vật tư",
            countProduct: 0,
            percent: 0,
        },
        {
            reason: "Chất lượng vật tư",
            countProduct: 0,
            percent: 0,
        },
    ];
    useEffect(() => {
        console.log("Phân tích nguyên nhân: ", data);
        if (data && data.length > 0) {
            const totalProduct = data.reduce((total: number, item: any) => {
                return total + item.countProduct;
            }, 0);
            setDataChart(
                data.map((item: any): WODetailGroupByReasonWithPercent => {
                    return {
                        reason: item.reason,
                        countProduct: item.countProduct,
                        percent: Math.round((item.countProduct / totalProduct) * 100),
                    };
                }),
            );
        } else {
            setDataChart(initData);
        }
    }, [data]);

    function customizePercentageText({ valueText }) {
        return `${valueText}%`;
    }

    return (
        <Chart dataSource={dataChart} id='chart' palette='Harmony Light'>
            <Title text={"Phân tích nguyên nhân"} subtitle={"Work order"} />
            <CommonSeriesSettings argumentField='reason'>
                <Label visible={true} />
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series name={"Số lượng"} valueField={"countProduct"} type={"bar"} axis={"count"} />
            <Series name={"Tỉ lệ"} valueField={"percent"} type={"spline"} axis={"percentage"} />
            <ArgumentAxis>
                <Label overlappingBehavior='stagger' />
            </ArgumentAxis>
            <ValueAxis name='count' position='left' showZero={true} />
            <ValueAxis name='percentage' position='right' tickInterval={20} valueMarginsEnabled={false} />
            <Label customizeText={customizePercentageText} />
            <Legend verticalAlignment='bottom' horizontalAlignment='center' />
        </Chart>
    );
};

export default WODetailGroupByReasonBarChart;
