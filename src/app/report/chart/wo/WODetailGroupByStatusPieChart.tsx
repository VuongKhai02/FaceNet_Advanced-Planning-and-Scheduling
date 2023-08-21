import { PieChart } from "devextreme-react";
import { Font, Legend, Title } from "devextreme-react/chart";
import { Connector, Label as LabelPieChart, Series } from "devextreme-react/pie-chart";
import React, { useEffect, useState } from "react";
import { getColor, print } from "../../../../utils/utils";

type WODetailGroupByStatusPieChartProps = {
    data: any;
};

type WODetailGroupByStatusWithPercent = {
    processStatus: string;
    percent: number;
};

function WODetailGroupByStatusPieChart({ data }: WODetailGroupByStatusPieChartProps) {
    const [chartData, setChartData] = useState<any[]>([]);
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

    function customizeLabel({ valueText, percentText, percent }) {
        print("sbhjdfdyusdhfhsfdhsfdhuisfdhuisdfhuisdfhuisdf");
        console.log(percentText);
        if (valueText) {
            if (valueText === "unknown") return "Chưa xác định";
            if (valueText === "wait_production") return "Chờ sản xuất";
            if (valueText === "not_complete") return "Không hoàn thành";
            if (valueText === "in_production") return "Đang sản xuất";
            if (valueText === "complete") return "Hoàn thành";
            if (valueText === "early_complete") return "Hoàn thành sớm";
            if (valueText === "delay") return "Chậm tiến độ";
            if (valueText === "stop") return "Ngưng sản xuất";
        }
        percentText = (percent * 100).toFixed(2).toString() + "%";
        return `${valueText} (${percentText})`;
    }

    function customizePoint(pointInfo) {
        console.log("point info");
        console.log(pointInfo);
        console.log(pointInfo.argument);
        let cl = getColor(pointInfo.argument);
        return {
            color: cl,
        };
    }

    useEffect(() => {
        if (data != null && data.length === 1) {
            let tmp = initData;
            tmp.shift();
            tmp.push(data[0]);
            setChartData(tmp);
        } else if (data == null || data.length === 0) {
            setChartData(initData);
        } else {
            setChartData(data);
        }
        // if (data != null && data.length > 0) {
        //   setChartData(data)
        // } else {
        //   setChartData(initData)
        // }
    }, [data]);
    return (
        <PieChart id='pie' dataSource={chartData} palette='Harmony Light' resolveLabelOverlapping='shift' customizePoint={customizePoint}>
            <Title text='Tình trạng sản xuất (%)' subtitle='Work Order' />
            <Series argumentField={"processStatus"} valueField={"countProduct"}>
                <LabelPieChart visible={true} customizeText={customizeLabel}>
                    {/*<Connector visible={true} width={1}/>*/}
                    <Font size={16} />
                    <Connector visible={true} width={0.5} />
                </LabelPieChart>
            </Series>
            <Legend horizontalAlignment='right' columnCount={1}>
                <Font size={18} weight={500} />
            </Legend>
            {/*<Legend verticalAlignment="bottom" horizontalAlignment="center">*/}
            {/*  <Font size={15} weight={500}/>*/}
            {/*</Legend>*/}
        </PieChart>
    );
}

export default WODetailGroupByStatusPieChart;
