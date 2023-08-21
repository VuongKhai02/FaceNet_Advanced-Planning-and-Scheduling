import React, { useEffect, useState } from "react";
import PieChart, { Legend, Export, Series, Label, Font, Connector } from "devextreme-react/pie-chart";
import { getColor, print } from "../../../utils/utils";
import { Title } from "devextreme-react/chart";
import ChartReportServices from "../../services/ChartReportServices";
import { useMainStore } from "@haulmont/jmix-react-core";

export const DashboardPOReasonPiechart = (props) => {
    const mainStore = useMainStore();
    const [chartData, setChartData] = useState<any[]>([]);
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
        setChartData(props.data);
    }, [props]);
    const customizeText = (arg) => {
        return `${arg.valueText} (${arg.percentText})`;
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

    return (
        <PieChart
            id='pie'
            palette='Harmony Light'
            dataSource={chartData}
            title='Tổng hợp nguyên nhân PO'
            resolveLabelOverlapping='shift'
            // customizePoint={customizePoint}
        >
            {/*<Legend*/}
            {/*  orientation="horizontal"*/}
            {/*  itemTextPosition="right"*/}
            {/*  horizontalAlignment="center"*/}
            {/*  verticalAlignment="bottom"*/}
            {/*  columnCount={4}*/}
            {/*/>*/}
            <Series argumentField='reason' valueField='countProduct'>
                <Label visible={true} position='columns' customizeText={customizeLabel}>
                    <Font size={16} />
                    <Connector visible={true} width={0.5} />
                </Label>
            </Series>
            <Legend verticalAlignment='bottom' horizontalAlignment='center'>
                <Font size={15} weight={500} />
            </Legend>
            {/*<Legend horizontalAlignment="right" columnCount={1} >*/}
            {/*  <Font size={17} weight={500} />*/}
            {/*</Legend>*/}
        </PieChart>
    );
};
