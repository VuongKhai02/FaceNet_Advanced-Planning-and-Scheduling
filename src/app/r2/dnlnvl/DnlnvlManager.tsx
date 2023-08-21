import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

import "devextreme-react/text-area";
import DnlnvlView from "./dnlnvlView/DnlnvlView";
import WoDnlnvlManager from "./word-order-panel/WoDnlnvlManager";

const ROUTING_PATH = "/dnlnvlManager";

const DnlnvlManager = observer(() => {
    return (
        <div id='data-grid-demo'>
            <WoDnlnvlManager />
            <DnlnvlView />
        </div>
    );
});

export default DnlnvlManager;

registerScreen({
    component: DnlnvlManager,
    caption: "Quản lý DNL NVL",
    screenId: "screen.DnlnvlManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
