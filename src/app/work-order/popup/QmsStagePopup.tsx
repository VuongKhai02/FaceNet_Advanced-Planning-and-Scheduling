import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "devextreme-react/popup";
import { WorkOrderStateMamager } from "../../work-order-stage/WorkOrdersStateManager";

export const QmsStagePopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("QmsStagePopup render popup")
        // console.log(props)
        return (
            <>
                <WorkOrderStateMamager
                    row={props.stageObject.currentRow}
                    workOrderStage={props.stageObject.workOrderStage}
                    ssoGroups={props.stageObject.ssoGroups}
                    ssoUsers={props.stageObject.ssoUsers}
                />
            </>
        );
    };

    return (
        <Popup
            maxWidth={"900px"}
            height={"auto"}
            showTitle={true}
            showCloseButton={true}
            title={"Khai báo công đoạn"}
            resizeEnabled={true}
            dragEnabled={true}
            closeOnOutsideClick={true}
            visible={props.stageObject.popupVisible}
            onHiding={() => props.stageObject.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
