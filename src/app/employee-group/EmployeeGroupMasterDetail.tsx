import React from "react";
import EmployeeGroupEditor from "./EmployeeGroupEditor";
import EmployeeGroupList from "./EmployeeGroupList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "EmployeeGroup";
const ROUTING_PATH = "/employeeGroupMasterDetail";

const EmployeeGroupMasterDetail = observer(() => {
    return <MasterDetailManager editor={<EmployeeGroupEditor />} browser={<EmployeeGroupList />} />;
});

registerEntityList({
    component: EmployeeGroupMasterDetail,
    caption: "screen.EmployeeGroupMasterDetail",
    screenId: "EmployeeGroupMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default EmployeeGroupMasterDetail;
