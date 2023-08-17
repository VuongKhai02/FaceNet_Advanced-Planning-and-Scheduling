import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import "devextreme-react/text-area";

import DnlnvlApproveRedundantView from "./dnlnvlView/DnlnvlApproveRedundantView";

const ROUTING_PATH = "/dnlnvlApproveRedundantManager ";

const DnlnvlApproveRedundantManager = observer(() => {
    return (
        <div id='data-grid-demo'>
            <DnlnvlApproveRedundantView />
        </div>
    );
});

export default DnlnvlApproveRedundantManager;

registerScreen({
    component: DnlnvlApproveRedundantManager,
    caption: "Quản lý phê duyệt NVL dư thừa",
    screenId: "screen.DnlnvlApproveRedundantManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
