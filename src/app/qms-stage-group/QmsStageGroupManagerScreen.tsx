import React, { useEffect, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { QmsStageGroupMappingManager } from "./QmsStageGroupMappingManager";
import { QmsStageGroupManager } from "./QmsStageGroupManager";
import Button from "devextreme-react/button";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";

export const QmsStageGroupManagerScreen = (props) => {
    const [popupVisible, setPopupVisible] = useState(false);

    const hideInfo = () => {
        setPopupVisible(false);
    };

    const showInfo = () => {
        setPopupVisible(true);
    };

    return (
        <div>
            <Button className='button-info' text='Details' onClick={showInfo} />
            <QmsStageGroupMappingManager showInfo={showInfo} />
            <Popup
                visible={popupVisible}
                onHiding={hideInfo}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showCloseButton={true}
                showTitle={true}
                title='Nhóm công đoạn'
                // container=".dx-viewport"
                width={600}
                height={500}>
                <QmsStageGroupManager />
            </Popup>
        </div>
    );
};

const ROUTING_PATH = "/qmsStageGroupMappingManager";

registerScreen({
    component: QmsStageGroupManagerScreen,
    caption: "Quản lý nhóm công đoạn QMS",
    screenId: "QmsStageGroupMappingManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
