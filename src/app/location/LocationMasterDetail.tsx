import React from "react";
import LocationEditor from "./LocationEditor";
import LocationList from "./LocationList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "Location";
const ROUTING_PATH = "/locationMasterDetail";

const LocationMasterDetail = observer(() => {
    return <MasterDetailManager editor={<LocationEditor />} browser={<LocationList />} />;
});

registerEntityList({
    component: LocationMasterDetail,
    caption: "screen.LocationMasterDetail",
    screenId: "LocationMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default LocationMasterDetail;
