import React, { useEffect, useState } from "react";

import Chart, {
    ArgumentAxis,
    CommonSeriesSettings,
    Legend,
    Series,
    Tooltip,
    ValueAxis,
    ConstantLine,
    Format,
    Label,
    ScrollBar,
    ZoomAndPan,
    Font,
    Grid,
    CommonAxisSettings,
    VisualRange,
} from "devextreme-react/chart";
import "../ReportStyle.css";
import { useMainStore } from "@haulmont/jmix-react-core";

export const PODetailBarChart = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const visualRange = [5, 10];
    useEffect(() => {
        setChartData(props.data);
    }, [props]);

    // function customizeTooltip(pointInfo) {
    //   return {
    //     text: `${pointInfo.argumentText}<br/>${pointInfo.valueText}`,
    //   };
    // }

    function customizePercentageText({ valueText }) {
        return `${valueText}%`;
    }

    const onPointHoverChanged = (e) => {
        let point = e.target;
        if (!point.isHovered()) {
            point.hideTooltip();
        }
    };

    function done(e) {
        if (chartData.length > 8) {
            e.component.zoomArgument(chartData[0].poId, chartData[8].poId);
        }
    }

    return (
        <Chart
            title='Tiến độ sản xuất đơn hàng'
            dataSource={chartData}
            palette='Harmony Light'
            id='chart'
            // onPointHoverChanged={onPointHoverChanged}
            onDone={done}>
            {/*<ZoomAndPan argumentAxis="pan" allowMouseWheel={true}/>*/}\
            <ZoomAndPan argumentAxis='both' valueAxis='both' />
            <ScrollBar visible={true} />
            <CommonSeriesSettings argumentField='poId'>
                <Label visible={true}>
                    <Format type='fixedPoint' precision={0} />
                </Label>
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series
                name='Tổng sản lượng nhập kho'
                valueField='sumQuantityOut'
                axis='frequency'
                type='bar'
                color='#0AB68B'
                // label={{ visible: true}}
                // label={{visible: true}}
            />
            <Series
                name='Tổng sản lượng CĐ1'
                valueField='scadaQuantityOut'
                axis='frequency'
                type='bar'
                color='#FFE3B3'
                // label={{ visible: true}}
                // label={{visible: true}}
            />
            <Series
                name='Sản lượng đầu vào'
                valueField='sumQuantity'
                axis='frequency'
                type='spline'
                color='#6b71c3'
                // label={{ visible: true}}
                // label={{visible: true}}
            />
            <ArgumentAxis defaultVisualRange={visualRange}>
                <Label overlappingBehavior='hide' />
            </ArgumentAxis>
            {/*<ArgumentAxis defaultVisualRange={visualRange}>*/}
            {/*  <VisualRange startValue={1} endValue={10} />*/}
            {/*  <Label overlappingBehavior="hide"/>*/}
            {/*</ArgumentAxis>*/}
            <ValueAxis name='frequency' position='left' tickInterval={1000} />
            <ValueAxis name='percentage' position='right' tickInterval={20} showZero={true} valueMarginsEnabled={false}>
                {/*<Label customizeText={customizePercentageText} />*/}
                {/*<ConstantLine*/}
                {/*  value={80}*/}
                {/*  width={2}*/}
                {/*  color="#fc3535"*/}
                {/*  dashStyle="dash"*/}
                {/*>*/}
                {/*  <Label visible={false} />*/}
                {/*</ConstantLine>*/}
            </ValueAxis>
            <Tooltip enabled={true} />
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
        </Chart>
    );
};
