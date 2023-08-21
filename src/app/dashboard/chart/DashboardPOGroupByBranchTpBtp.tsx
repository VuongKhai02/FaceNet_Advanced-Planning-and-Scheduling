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

export const DashboardPOGroupByBranchTpBtp = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const mainStore = useMainStore();

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
        <Chart title='Sản lượng sản xuất theo nhóm hàng hóa' dataSource={chartData} palette='Harmony Light' id='chart'>
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
            <Series name='Số lượng thành phẩm' valueField='sumTp' axis='frequency' type='bar' color='#6b71c3' label={{ visible: true }} />
            <Series name='Số lượng BTP' valueField='sumBtp' axis='frequency' type='bar' color='#75BDE0' label={{ visible: true }} />
            {/*<Series*/}
            {/*  name="Năng lực sản xuất"*/}
            {/*  valueField="scadaQuantityOut"*/}
            {/*  axis="frequency"*/}
            {/*  type="spline"*/}
            {/*  color="#F8BC9B"*/}
            {/*  label={{ visible: true}}*/}
            {/*/>*/}
            {/*<Series*/}
            {/*  name="Tổng sản lượng kế hoạch"*/}
            {/*  valueField="sumQuantity"*/}
            {/*  axis="frequency"*/}
            {/*  type="spline"*/}
            {/*  color="#6b71c3"*/}
            {/*  label={{ visible: true}}*/}
            {/*/>*/}

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
