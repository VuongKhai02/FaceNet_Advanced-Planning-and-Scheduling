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
import WOChartReportServices from "../../services/WOChartReportServices";
import { useMainStore } from "@haulmont/jmix-react-core";

export const DashboardWOCompletePercentGroupByGroup = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const mainStore = useMainStore();

    const visualRange = { length: 10 };

    useEffect(() => {
        setChartData(props.data);
    }, [props]);

    function customizeTooltip(pointInfo) {
        return {
            html: `<div><div class="tooltip-header">${pointInfo.argumentText}</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: </div><div class="value-text"><span class='top-series-value'>${pointInfo.points[0].valueText}</span></div><div class="series-name"><span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: </div><div class="value-text"><span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% </div></div></div>`,
        };
    }

    function customizePercentageText({ valueText }) {
        return `${valueText}%`;
    }

    // useEffect(() => {
    //   let data = {
    //     startTime: "2023-01-01",
    //     endTime: "2024-01-01",
    //     productOrder: "",
    //     groupCode: ""
    //   }
    //   let dataa = JSON.stringify(data);
    //   WOChartReportServices.getWODetailDataGroupByGroupCodeDashboard(mainStore.authToken, dataa).then(res => {
    //     if (res && res.status == 200) {
    //       setChartData(res.data);
    //     }
    //   });
    // }, [props])

    return (
        <Chart title='Tỷ lệ hoàn thành nhập kho tổ sản xuất' dataSource={chartData} palette='Harmony Light' id='chart'>
            <ZoomAndPan argumentAxis='pan' />
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
                name='Tỷ lệ hoàn thành nhập kho tổ'
                valueField='completePercent'
                axis='percentage'
                type='bar'
                color='#64ACAB'
                label={{ visible: true }}
            />
            <Series
                name='Tỷ lệ hoàn thành công đoạn 1 tổ sx'
                valueField='scadaCompletePercent'
                axis='percentage'
                type='bar'
                color='#FCD783'
                label={{ visible: true }}
            />

            <ArgumentAxis defaultVisualRange={visualRange}>
                <Label overlappingBehavior='hide' />
            </ArgumentAxis>
            <ValueAxis name='percentage' position='left' tickInterval={20} showZero={true} valueMarginsEnabled={false}>
                <Label customizeText={customizePercentageText} />
            </ValueAxis>
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
        </Chart>
    );
};
