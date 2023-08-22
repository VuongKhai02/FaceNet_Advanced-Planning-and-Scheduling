import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import "devextreme-react/text-area";

import DnlnvlGivebackRedundantView from "./DnlnvlGivebackRedundant/DnlnvlGivebackRedundantView";

const ROUTING_PATH = "/dnlnvlGivebackRedundantManager";

const DnlnvlGivebackRedundantManager = observer(() => {
    return (
        <div id='data-grid-demo'>
            <DnlnvlGivebackRedundantView />
        </div>
    );
});

export default DnlnvlGivebackRedundantManager;

registerScreen({
    component: DnlnvlGivebackRedundantManager,
    caption: "Quản lý trả NVL dư thừa",
    screenId: "screen.DnlnvlGivebackRedundantManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
