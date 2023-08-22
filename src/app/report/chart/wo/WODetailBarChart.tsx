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
} from "devextreme-react/chart";
import "../ReportStyle.css";
import { useMainStore } from "@haulmont/jmix-react-core";

export const WODetailBarChart = (props) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const visualRange = { length: 5 };
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

    return (
        <Chart
            title='Tổng tiến độ nhập kho các bộ phận sản xuất'
            dataSource={chartData}
            palette='Harmony Light'
            id='chart'
            onPointHoverChanged={onPointHoverChanged}>
            <ZoomAndPan argumentAxis='pan' allowMouseWheel={true} />
            <ScrollBar visible={true} />
            <CommonSeriesSettings argumentField='poId'>
                <Label visible={false}>
                    <Format type='fixedPoint' precision={0} />
                </Label>
            </CommonSeriesSettings>
            <CommonAxisSettings>
                <Grid visible={false}></Grid>
            </CommonAxisSettings>
            <Series name='Tổng sản lượng nhập kho' valueField='sumQuantityOut' axis='frequency' type='bar' color='#0AB68B' />
            <Series name='Tổng sản lượng CĐ1' valueField='scadaQuantityOut' axis='frequency' type='bar' color='#FFE3B3' />
            <Series name='Sản lượng đầu vào' valueField='sumQuantity' axis='frequency' type='spline' color='#6b71c3' />

            <ArgumentAxis defaultVisualRange={visualRange}>
                <Label overlappingBehavior='stagger' />
            </ArgumentAxis>

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
