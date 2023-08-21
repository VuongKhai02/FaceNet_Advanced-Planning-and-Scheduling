import React from "react";
import EmployeeEditor from "./EmployeeEditor";
import EmployeeList from "./EmployeeList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "Employee";
const ROUTING_PATH = "/employeeMasterDetail";

const EmployeeMasterDetail = observer(() => {
    return <MasterDetailManager editor={<EmployeeEditor />} browser={<EmployeeList />} />;
});

registerEntityList({
    component: EmployeeMasterDetail,
    caption: "screen.EmployeeMasterDetail",
    screenId: "EmployeeMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default EmployeeMasterDetail;
