import React from "react";
import DemooooEditor from "./DemooooEditor";
import DemooooList from "./DemooooList";
import {
  registerEntityList,
  MasterDetailManager
} from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "Demoooo";
const ROUTING_PATH = "/demooooMasterDetail";

const DemooooMasterDetail = observer(() => {
  return (
    <MasterDetailManager editor={<DemooooEditor />} browser={<DemooooList />} />
  );
});

registerEntityList({
  component: DemooooMasterDetail,
  caption: "screen.DemooooMasterDetail",
  screenId: "DemooooMasterDetail",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default DemooooMasterDetail;
