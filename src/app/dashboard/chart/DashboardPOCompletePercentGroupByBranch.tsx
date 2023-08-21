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

export const DashboardPOCompletePercentGroupByBranch = (props) => {
    const mainStore = useMainStore();
    const [chartData, setChartData] = useState<any[]>([]);

    const visualRange = { length: 10 };
    useEffect(() => {
        setChartData(props.data);
    }, [props]);

    // useEffect(() => {
    //   let data = {
    //     startTime: "2023-01-01",
    //     endTime: "2024-01-01",
    //     productOrder: "",
    //     groupCode: ""
    //   }
    //   let dataa = JSON.stringify(data);
    //   ChartReportServices.getPoGroupByBranchDashboard(mainStore.authToken, dataa).then(res => {
    //     if (res && res.status == 200) {
    //       console.log(res)
    //       setChartData(res.data);
    //     }
    //   });
    // }, [props])

    function customizeTooltip(pointInfo) {
        return {
            html: `<div><div class="tooltip-header">${pointInfo.argumentText}</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: </div><div class="value-text"><span class='top-series-value'>${pointInfo.points[0].valueText}</span></div><div class="series-name"><span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: </div><div class="value-text"><span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% </div></div></div>`,
        };
    }

    function customizePercentageText({ valueText }) {
        return `${valueText}%`;
    }

    return (
        <Chart title='Tỷ lệ % hoàn thành các bộ phận sản xuất' dataSource={chartData} palette='Harmony Light' id='chart'>
            {/*<ZoomAndPan argumentAxis="pan" />*/}
            <ScrollBar visible={false} />
            <CommonSeriesSettings argumentField='branchCode'>
                <Label customizeText={customizePercentageText} visible={true} />
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series name='Tỷ lệ hoàn thành nhập kho' valueField='completePercent' axis='percentage' type='bar' color='#4A8DB7' />
            <ArgumentAxis defaultVisualRange={visualRange}>
                <Label overlappingBehavior='hide' />
            </ArgumentAxis>
            <ValueAxis name='percentage' position='left' tickInterval={20} showZero={true} valueMarginsEnabled={false}>
                <Label customizeText={customizePercentageText} />
            </ValueAxis>
            <ValueAxis name='percentage2' position='right' tickInterval={20} showZero={true} valueMarginsEnabled={false}>
                <Label customizeText={customizePercentageText} />
            </ValueAxis>
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
        </Chart>
    );
};
