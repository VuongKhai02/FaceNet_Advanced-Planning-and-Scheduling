import React from "react";
import PlanningWorkOrderEditor from "./PlanningWorkOrderEditor";
import PlanningWorkOrderList from "./PlanningWorkOrderList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "PlanningWorkOrder";
const ROUTING_PATH = "/planningWorkOrderMasterDetail";

const PlanningWorkOrderMasterDetail = observer(() => {
    return <MasterDetailManager editor={<PlanningWorkOrderEditor />} browser={<PlanningWorkOrderList />} />;
});

registerEntityList({
    component: PlanningWorkOrderMasterDetail,
    caption: "screen.PlanningWorkOrderMasterDetail",
    screenId: "PlanningWorkOrderMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default PlanningWorkOrderMasterDetail;
