import React, { useEffect, useState } from "react";

import Chart, {
    ArgumentAxis,
    CommonSeriesSettings,
    Legend,
    Series,
    Tooltip,
    ValueAxis,
    Label,
    ScrollBar,
    Font,
    Title,
    Grid,
    CommonAxisSettings,
} from "devextreme-react/chart";

export const POGroupByStatusReasonBarChart = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);

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

    return (
        <Chart title='Biểu đồ nguyên nhân theo PO' dataSource={chartData} palette='Harmony Light' id='chart'>
            {/*<ZoomAndPan argumentAxis="pan"  />*/}
            <ScrollBar visible={false} />
            <CommonSeriesSettings argumentField='reason'>
                <Label visible={true} />
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>

            <Series name='Số lượng sản phẩm' valueField='countProduct' axis='frequency' type='fullstackedbar' color='#4A8DB7' />

            <Series
                name='Tỷ lệ % nguyên nhân'
                valueField='completePercent'
                axis='frequency'
                type='line'
                color='orange'
                label={{ visible: true, customizeText: customizePercentageText }}></Series>

            <ArgumentAxis defaultVisualRange={visualRange}>
                <Label overlappingBehavior='hide' />
            </ArgumentAxis>
            <ValueAxis name='percentageAxis' position='right' tickInterval={20} showZero={true} valueMarginsEnabled={false}>
                <Title text='Tỉ lệ % nguyên nhân' />
                {/*<Grid visible={true} />*/}
                {/* <Label customizeText={customizePercentageText} visible={true}
          position="columns"/> */}
            </ValueAxis>
            <ValueAxis
                name='frequency'
                // position="left"
                // tickInterval={300}
            />
            <Legend verticalAlignment='bottom' horizontalAlignment='center' columnCount={2}>
                <Font size={15} weight={500} />
            </Legend>
        </Chart>
    );
};
