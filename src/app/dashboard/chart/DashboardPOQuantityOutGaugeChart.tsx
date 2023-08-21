import React, { useEffect, useState } from "react";
import PieChart, { Legend, Export, Series, Label, Font, Connector } from "devextreme-react/pie-chart";
import { getColor, print } from "../../../utils/utils";
import { Size, Title } from "devextreme-react/chart";
import ChartReportServices from "../../services/ChartReportServices";
import { useMainStore } from "@haulmont/jmix-react-core";
import { BarGauge } from "devextreme-react";
import { Geometry } from "devextreme-react/bar-gauge";

export const DashboardPOQuantityOutGaugeChart = (props) => {
    const mainStore = useMainStore();
    const [chartData, setChartData] = useState<any[]>([]);
    const [value, setValue] = useState<any>(0);
    const [endValue, setEndValue] = useState(0);
    // useEffect(() => {
    //   let data = {
    //     startTime: "2023-01-01",
    //     endTime: "2024-01-01",
    //     productOrder: "",
    //     groupCode: ""
    //   }
    //   let dataa = JSON.stringify(data);
    //   ChartReportServices.getPoGroupByStatusDashboard(mainStore.authToken, dataa).then(res => {
    //     if (res && res.status == 200) {
    //       console.log(res)
    //       setChartData(res.data);
    //     }
    //   });
    // }, [props])

    useEffect(() => {
        // setChartData(props.data)
        if (props.maxValue) {
            setEndValue(props.maxValue);
        } else {
            setEndValue(100000000);
        }
        if (props.data.length > 0) {
            setValue(props.data[0]?.sumQuantityOut);
            // setEndValue(props.data[0]?.sumQuantityOut)
        }
    }, [props]);
    const customizeText = (arg) => {
        return `${value / 1000}K`;
    };
    const customizeTooltip = (arg) => {
        return `Sản lượng nhập kho`;
    };

    function customizeLabel({ valueText, percentText, percent }) {
        console.log(valueText);
        if (valueText) {
            if (valueText === "wait_production") return "Chờ sản xuất";
            if (valueText === "unknown") return "Chưa xác định";
            if (valueText === "complete") return "Hoàn thành";
            if (valueText === "early_complete") return "Hoàn thành sớm";
            if (valueText === "delay") return "Chậm tiến độ";
            if (valueText === "stop") return "Ngưng sản xuất";
            if (valueText === "not_complete") return "Không hoàn thành";
            if (valueText === "in_production") return "Đang sản xuất";
        }
        percentText = (percent * 100).toFixed(2).toString() + "%";
        return `${valueText} (${percentText})`;
    }

    function customizePoint(pointInfo) {
        let cl = getColor(pointInfo.argument);
        return {
            color: cl,
        };
    }
    const values = [8000000];

    return (
        <BarGauge
            id='gauge'
            startValue={0}
            endValue={endValue}
            // defaultValues={values}
            values={value}
            title='Kế hoạch sản xuất và tiến độ nhập kho lũy kế'>
            {/*<Size height={500} width={500} />*/}

            {/*</Size>*/}
            <Geometry startAngle={180} endAngle={0} />
            <Label customizeText={customizeText}>
                <Font size={16} />
                <Connector visible={true} width={0.5} />
            </Label>
            {/*<Title text={"Kế hoạch sản xuất và tiến độ nhập kho lũy kế"}>*/}
            {/*  <Font size={20} />*/}
            {/*</Title>*/}
            <Legend visible={true} customizeText={customizeTooltip} verticalAlignment='bottom' horizontalAlignment='center' />
        </BarGauge>
    );
};
