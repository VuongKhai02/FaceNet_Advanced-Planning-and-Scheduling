import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import "devextreme-react/text-area";

import DnlnvlWarehouseView from "./dnlnvlWarehouse/DnlnvlWarehouseView";

const ROUTING_PATH = "/dnlnvlWarehouseManager";

const DnlnvlWarehouseManager = observer(() => {
    return (
        <div id='data-grid-demo'>
            <DnlnvlWarehouseView />
        </div>
    );
});

export default DnlnvlWarehouseManager;

registerScreen({
    component: DnlnvlWarehouseManager,
    caption: "Quản lý đối chiếu NVL",
    screenId: "screen.DnlnvlWarehouseManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
