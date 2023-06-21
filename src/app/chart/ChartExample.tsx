import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import Doughnut from "./Doughnut";
import BarChart from "./BarChart";
import Spline from "./Spline";

const ROUTING_PATH = "/chartExample";

export const ChartExample = () =>
  <>
  <div><Doughnut/></div>;
    <div><BarChart/></div>;
    <div><Spline/></div>;
  </>
registerScreen({
  component: ChartExample,
  caption: "screen.ChartExample",
  screenId: "ChartExample",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
