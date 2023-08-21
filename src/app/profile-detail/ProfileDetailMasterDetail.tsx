import React from "react";
import ProfileDetailEditor from "./ProfileDetailEditor";
import ProfileDetailList from "./ProfileDetailList";
import { registerEntityList, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "ProfileDetail";
const ROUTING_PATH = "/profileDetailMasterDetail";

const ProfileDetailMasterDetail = observer(() => {
    return <MasterDetailManager editor={<ProfileDetailEditor />} browser={<ProfileDetailList />} />;
});

registerEntityList({
    component: ProfileDetailMasterDetail,
    caption: "screen.ProfileDetailMasterDetail",
    screenId: "ProfileDetailMasterDetail",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default ProfileDetailMasterDetail;
