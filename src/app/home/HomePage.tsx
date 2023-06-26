import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";

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
