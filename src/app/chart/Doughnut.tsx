import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import PieChart, { Legend, Series, Tooltip, Format, Label, Connector, Export } from "devextreme-react/pie-chart";

import { populationByRegions } from "./data.js";

const ROUTING_PATH = "/doughnut";

class Doughnut extends React.Component {
    render() {
        return (
            <PieChart
                id='pie'
                type='doughnut'
                title='The Population of Continents and Regions'
                palette='Soft Pastel'
                dataSource={populationByRegions}>
                <Series argumentField='region'>
                    <Label visible={true} format='millions'>
                        <Connector visible={true} />
                    </Label>
                </Series>
                <Export enabled={true} />
                <Legend margin={0} horizontalAlignment='right' verticalAlignment='top' />
                <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
                    <Format type='millions' />
                </Tooltip>
            </PieChart>
        );
    }

    customizeTooltip(arg) {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }
}

export default Doughnut;

registerScreen({
    component: Doughnut,
    caption: "screen.Doughnut",
    screenId: "screen.Doughnut",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
