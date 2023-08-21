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
    Title,
    Export,
    Border,
    CommonAxisSettings,
    Grid,
} from "devextreme-react/chart";

export const POItemQuantityReport = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);

    const visualRange = { length: 10 };

    useEffect(() => {
        setChartData(props.data);
    }, [props]);

    // function customizeTooltip(pointInfo) {
    //   return {
    //     html: `<div><div class="tooltip-header">${
    //       pointInfo.argumentText
    //     }</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${
    //       pointInfo.points[0].seriesName
    //     }</span>: </div><div class="value-text"><span class='top-series-value'>${
    //       pointInfo.points[0].valueText
    //     }</span></div><div class="series-name"><span class='bottom-series-name'>${
    //       pointInfo.points[1].seriesName
    //     }</span>: </div><div class="value-text"><span class='bottom-series-value'>${
    //       pointInfo.points[1].valueText
    //     }</span>% </div></div></div>`,
    //   };
    // }

    // function customizePercentageText({ valueText }) {
    //   return `${valueText}%`;
    // }
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.valueText}`,
        };
    };

    function done(e) {
        if (chartData.length > 8) {
            e.component.zoomArgument(chartData[0].poId, chartData[8].poId);
        }
    }

    function customizePercentageText({ valueText }) {
        return `${valueText}`;
    }

    return (
        <Chart
            title='Đánh giá tính chính xác của kế hoạch'
            dataSource={chartData}
            // palette="Harmony Light"
            id='chart'
            onDone={done}>
            <ZoomAndPan argumentAxis='both' valueAxis='both' />
            <ScrollBar visible={true} />
            <CommonSeriesSettings argumentField='poId' type='fullstackedbar'>
                <Label visible={false}>
                    <Format type='fixedPoint' precision={0} />
                </Label>
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series
                name='Phát sinh'
                valueField='numberOfItemsAdded'
                stack='number'
                color='#75BDE0'
                label={{ visible: true, customizeText: customizePercentageText }}
            />
            <Series
                name='Sửa'
                valueField='numberOfItemsEdited'
                stack='number'
                color='#F8BC9B'
                label={{ visible: true, customizeText: customizePercentageText }}
            />
            <Series
                name='Đúng kế hoạch'
                valueField='numberOfItemsMeetingPlan'
                stack='number'
                color='#6b71c3'
                label={{ visible: true, customizeText: customizePercentageText }}
            />

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
            <ValueAxis>
                position="left" tickInterval={300}
                <Title text='Số lượng' />
            </ValueAxis>
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
                <Border visible={true} />
            </Legend>
            {/*<Export enabled={true} />*/}
            <Tooltip enabled={true} location='edge' customizeTooltip={customizeTooltip} />
        </Chart>
    );
};
