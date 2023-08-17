import React from "react";
import ProgrammingDetailEditor from "./ProgrammingDetailEditor";
import ProgrammingDetailList from "./ProgrammingDetailList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "ProgrammingDetail";
const ROUTING_PATH = "/programmingDetailMasterDetail";

const ProgrammingDetailMasterDetail = observer(() => {
    return <MasterDetailManager editor={<ProgrammingDetailEditor />} browser={<ProgrammingDetailList />} />;
});

registerEntityList({
    component: ProgrammingDetailMasterDetail,
    caption: "screen.ProgrammingDetailMasterDetail",
    screenId: "ProgrammingDetailMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default ProgrammingDetailMasterDetail;
