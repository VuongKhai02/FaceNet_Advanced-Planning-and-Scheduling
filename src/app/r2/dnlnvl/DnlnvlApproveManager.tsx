import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import "devextreme-react/text-area";

import DnlnvlApproveView from "./dnlnvlApprover/DnlnvlApproveView";

const ROUTING_PATH = "/dnlnvlApproveManager";

const DnlnvlApproveManager = observer(() => {
    return (
        <div id='data-grid-demo'>
            <DnlnvlApproveView />
        </div>
    );
});

export default DnlnvlApproveManager;

registerScreen({
    component: DnlnvlApproveManager,
    caption: "Quản lý phê duyệt NVL",
    screenId: "screen.DnlnvlApproveManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
