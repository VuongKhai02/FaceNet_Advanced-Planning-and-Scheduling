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
import ChartReportServices from "../../services/ChartReportServices";
import { useMainStore } from "@haulmont/jmix-react-core";

export const DashboardPOGroupByBranch = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const mainStore = useMainStore();

    const visualRange = { length: 10 };

    useEffect(() => {
        let dataTmp: any[] = [];
        let tmp = props.data;
        let branchList = props.groupBranchArray;
        for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < branchList.length; j++) {
                if (tmp[i].branchCode === branchList[j].branch) {
                    tmp[i].capacity = branchList[j].capacity;
                    tmp[i].target = branchList[j].target;
                }
            }
            dataTmp.push(tmp[i]);
        }
        setChartData(dataTmp);
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
        <Chart title='Kiểm soát kế hoạch sản xuất - nhập kho và mục tiêu' dataSource={chartData} palette='Harmony Light' id='chart'>
            <ZoomAndPan argumentAxis='both' valueAxis='both' />
            <ScrollBar visible={true} />
            <CommonSeriesSettings argumentField='branchCode'>
                <Label visible={false}>
                    <Format type='fixedPoint' precision={0} />
                </Label>
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series
                name='Tổng sản lượng kế hoạch'
                valueField='sumQuantity'
                axis='frequency'
                type='bar'
                color='#6b71c3'
                label={{ visible: true }}
            />
            <Series
                name='Tổng sản lương nhập kho'
                valueField='sumQuantityOut'
                axis='frequency'
                type='bar'
                color='#75BDE0'
                label={{ visible: true }}
            />
            <Series name='Năng lực sản xuất' valueField='capacity' axis='frequency' type='line' color='#F8BC9B' label={{ visible: true }} />
            <Series name='Sản lượng mục tiêu' valueField='target' axis='frequency' type='line' color='#FFCC00' label={{ visible: true }} />

            <ArgumentAxis defaultVisualRange={visualRange} visualRange='[10]'>
                <Label overlappingBehavior='hide' />
            </ArgumentAxis>
            <ValueAxis name='frequency2' position='right' tickInterval={20} showZero={true} valueMarginsEnabled={false}></ValueAxis>
            <ValueAxis name='frequency' position='left' tickInterval={300} />
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
            <Tooltip enabled={true}></Tooltip>
        </Chart>
    );
};
