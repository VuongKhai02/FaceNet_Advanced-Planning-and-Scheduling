import React from "react";
import InventoryEditor from "./InventoryEditor";
import InventoryList from "./InventoryList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "Inventory";
const ROUTING_PATH = "/inventoryMasterDetail";

const InventoryMasterDetail = observer(() => {
    return <MasterDetailManager editor={<InventoryEditor />} browser={<InventoryList />} />;
});

registerEntityList({
    component: InventoryMasterDetail,
    caption: "screen.InventoryMasterDetail",
    screenId: "InventoryMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default InventoryMasterDetail;
