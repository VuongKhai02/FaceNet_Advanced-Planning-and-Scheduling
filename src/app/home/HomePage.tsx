import React from "react";
import { FormattedMessage } from "react-intl";
import { registerScreen } from "@haulmont/jmix-react-ui";
import Doughnut from "../chart/Doughnut";
import BarChart from "../chart/BarChart";
import {ChartExample} from "../chart/ChartExample";
import {Dashboard} from "../dashboard/Dashboard";
import SSOMenu from "../dashboard/SSOMenu";

const ROUTING_PATH = "/";

export const HomePage = () => (
  <div>
    <h1>MK APS FRONTEND</h1>
    {/*<Dashboard/>*/}
  </div>
);

registerScreen({
  component: HomePage,
  caption: "screen.home",
  screenId: "HomePage",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
