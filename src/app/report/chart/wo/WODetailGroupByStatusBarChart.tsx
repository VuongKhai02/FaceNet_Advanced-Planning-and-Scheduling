import React, { useEffect, useState } from "react";

import Chart, {
    CommonAxisSettings,
    CommonSeriesSettings,
    Font,
    Grid,
    Label,
    Legend,
    ScrollBar,
    SeriesTemplate,
    Title,
} from "devextreme-react/chart";
import { getColor } from "../../../../utils/utils";

export const WODetailGroupByStatusBarChart = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [parentChartData, setParentChartData] = useState<any[]>([]);

    const initData = [
        {
            processStatus: "Chờ sản xuất",
            countProduct: 0,
        },
        {
            processStatus: "Hoàn thành",
            countProduct: 0,
        },
        {
            processStatus: "Chậm tiến độ",
            countProduct: 0,
        },
        {
            processStatus: "Đang sản xuất",
            countProduct: 0,
        },
        {
            processStatus: "Chưa xác định",
            countProduct: 0,
        },
        {
            processStatus: "Không hoàn thành",
            countProduct: 0,
        },
    ];
    const visualRange = { length: 10 };

    useEffect(() => {
        if (props.data != null && props.data.length === 1) {
            let tmp = initData;
            tmp.shift();
            tmp.push(props.data[0]);
            setChartData(tmp);
        } else if (props.data == null || props.data.length === 0) {
            setChartData(initData);
        } else {
            setChartData(props.data);
        }

        if (props.parentData != null && props.parentData.length === 1) {
            let tmp = initData;
            tmp.shift();
            tmp.push(props.data[0]);
            setParentChartData(tmp);
        } else if (props.parentData == null || props.parentData.length === 0) {
            setParentChartData(initData);
        } else {
            setParentChartData(props.parentData);
        }

        // if (props.data != null && props.data.length > 0) {
        //   setChartData(props.data)
        // } else {
        //   setChartData(initData)
        // }
        // console.log("Tình trạng sản xuất: ", props.data)
    }, [props]);

    function customizeTooltip(pointInfo) {
        return {
            html: `<div><div class="tooltip-header">${pointInfo.argumentText}</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: </div><div class="value-text"><span class='top-series-value'>${pointInfo.points[0].valueText}</span></div><div class="series-name"><span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: </div><div class="value-text"><span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% </div></div></div>`,
        };
    }

    function customizePercentageText({ valueText }) {
        return `${valueText}%`;
    }

    const customizeLabel = ({ valueText }) => {
        console.log(valueText);
        if (valueText) {
            if (valueText === "unknown") return "Chưa xác định";
            if (valueText === "not_complete") return "Không hoàn thành";
            if (valueText === "wait_production") return "Chờ sản xuất";
            if (valueText === "in_production") return "Đang sản xuất";
            if (valueText === "complete") return "Hoàn thành";
            if (valueText === "early_complete") return "Hoàn thành sớm";
            if (valueText === "delay") return "Chậm tiến độ";
            if (valueText === "stop") return "Ngưng sản xuất";
        }
        return valueText;
    };

    function customizePoint(pointInfo) {
        console.log("point info");
        console.log(pointInfo);
        console.log(pointInfo.argument);
        let cl = getColor(pointInfo.argument);
        return {
            color: cl,
        };
    }

    return (
        <Chart dataSource={chartData} palette='Harmony Light' id='chart' customizePoint={customizePoint}>
            {/*<ZoomAndPan argumentAxis="pan"  />*/}
            <ScrollBar visible={false} />
            <CommonSeriesSettings argumentField='processStatus' valueField='countProduct' type='bar' ignoreEmptyPoints={true}>
                <Label visible={true} />
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <SeriesTemplate nameField='processStatus'>
                <Label visible={true} customizeText={customizeLabel} />
            </SeriesTemplate>
            <Title text='Tình trạng sản xuất' subtitle='Work Order' />
            {/*<Series*/}
            {/*  name="Số lượng KBSX"*/}
            {/*  valueField="countProduct"*/}
            {/*  axis="frequency"*/}
            {/*  type="bar"*/}
            {/*  color="#75BDE0"*/}
            {/*/>*/}

            {/*<ArgumentAxis defaultVisualRange={visualRange}>*/}
            {/*  <Label overlappingBehavior="hide" />*/}
            {/*</ArgumentAxis>*/}
            {/*<ValueAxis*/}
            {/*  name="frequency2"*/}
            {/*  position="right"*/}
            {/*  tickInterval={20}*/}
            {/*  showZero={true}*/}
            {/*  valueMarginsEnabled={false}*/}
            {/*>*/}
            {/*</ValueAxis>*/}
            {/*<ValueAxis*/}
            {/*  name="frequency"*/}
            {/*  position="left"*/}
            {/*  tickInterval={300}*/}
            {/*/>*/}
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
        </Chart>
    );
};
