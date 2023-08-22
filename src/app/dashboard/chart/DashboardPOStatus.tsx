import React, { useEffect, useState } from "react";
import PieChart, { Legend, Export, Series, Label, Font, Connector } from "devextreme-react/pie-chart";
import { getColor, print } from "../../../utils/utils";
import { Title } from "devextreme-react/chart";
import ChartReportServices from "../../services/ChartReportServices";
import { useMainStore } from "@haulmont/jmix-react-core";

export const DashboardPOStatus = (props) => {
    let temp = [
        {
            processStatus: "Chờ sản xuất",
            countProduct: 0,
        },
        {
            processStatus: "Chưa xác định",
            countProduct: 0,
        },
        {
            processStatus: "Hoàn thành",
            countProduct: 0,
        },
        {
            processStatus: "Hoàn thành sớm",
            countProduct: 0,
        },
        {
            processStatus: "Chậm tiến độ",
            countProduct: 0,
        },
        {
            processStatus: "Ngưng sản xuất",
            countProduct: 0,
        },
        {
            processStatus: "Đang sản xuất",
            countProduct: 0,
        },
        {
            processStatus: "Không hoàn thành",
            countProduct: 0,
        },
    ];
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
        if (props.data != null && props.data.length === 1) {
            let tmp = temp;
            tmp.shift();
            tmp.push(props.data[0]);
            setChartData(tmp);
        } else if (props.data == null || props.data.length === 0) {
            setChartData(temp);
        } else {
            setChartData(props.data);
        }
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
            title='Thống kê trạng thái theo PO'
            resolveLabelOverlapping='shift'
            customizePoint={customizePoint}>
            {/*<Legend*/}
            {/*  orientation="horizontal"*/}
            {/*  itemTextPosition="right"*/}
            {/*  horizontalAlignment="center"*/}
            {/*  verticalAlignment="bottom"*/}
            {/*  columnCount={4}*/}
            {/*/>*/}
            <Series argumentField='processStatus' valueField='countProduct'>
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
