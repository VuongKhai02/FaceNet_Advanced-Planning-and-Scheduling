import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import WOBranchChart from "../chart/WOBranchChart";
import {ResponsiveGrid} from "./ResponsiveGrid";


const ROUTING_PATH = "/dashboard";

export const Dashboard = () =>
  <>
    <div className="text"
         style={{ color: "#03a9f4", fontWeight: "400", fontSize: "60px" ,paddingBottom: "30px", display: "flex", justifyContent:"center"
    }}>
      Giám sát kế hoạch sản xuất</div>
    <div><WOBranchChart/></div>
    {/*<div><ResponsiveGrid/></div>*/}
  </>
registerScreen({
  component: Dashboard,
  caption: "screen.Dashboard",
  screenId: "Dashboard",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});