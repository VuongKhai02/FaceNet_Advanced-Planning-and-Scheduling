// import React, {useEffect, useState} from 'react';
// import PieChart, {
//   Legend,
//   Series,
//   Tooltip,
//   Format,
//   Label,
//   Connector,
//   Export,
// } from 'devextreme-react/pie-chart';
// import { populationByRegions } from './data.js';

// export const POGroupByStatusPieChart = (props) => {
//   const customizeTooltip = (arg) => {
//     return {
//       text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
//     };
//   }
//   return (
//     <PieChart
//       id="pie"
//       type="doughnut"
//       title="Thống kê tình trạng"
//       palette="Soft Pastel"
//       dataSource={populationByRegions}
//     >
//       <Series argumentField="region">
//         <Label visible={true} format="millions">
//           <Connector visible={true} />
//         </Label>
//       </Series>
//       <Export enabled={true} />
//       <Legend
//         margin={0}
//         horizontalAlignment="right"
//         verticalAlignment="top"
//       />
//       <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
//         <Format type="millions" />
//       </Tooltip>
//     </PieChart>
//   );
// }

import React, { useEffect, useState } from "react";
import PieChart, { Legend, Export, Series, Label, Font, Connector } from "devextreme-react/pie-chart";
import { getColor, print } from "../../../utils/utils";
import { Title } from "devextreme-react/chart";

export const POGroupByStatusPieChart = (props) => {
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
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        if (props.data != null && props.data.length === 1) {
            let tmp = temp;
            tmp.shift();
            tmp.push(props.data[0]);
            console.log("temp 1 : " + tmp);
            setChartData(tmp);
        } else if (props.data == null || props.data.length === 0) {
            console.log("temp: " + temp);
            setChartData(temp);
        } else {
            print("Check chart chart");
            print(props.data);
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
            title='Biểu đồ trạng thái theo PO'
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
            {/*<Legend verticalAlignment="bottom" horizontalAlignment="center">*/}
            {/*  <Font size={15} weight={500} />*/}
            {/*</Legend>*/}
            <Legend horizontalAlignment='right' columnCount={1}>
                <Font size={17} weight={500} />
            </Legend>
        </PieChart>
    );
};
