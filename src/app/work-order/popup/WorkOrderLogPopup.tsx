import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreView } from "../helper/StoreView";
import Popup from "devextreme-react/popup";
import BusinessLogObject from "../../observables/BusinessLogObject";
import BusinessLogService from "../../services/BusinessLogService";
import { BusinessLogPopup } from "../../log/BusinessLogPopup";

export const WorkOrderLogPopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("WorkOrderLogPopup render popup")
        // console.log(props.businessLogObject)
        return <BusinessLogPopup woId={props.businessLogObject.woId} />;
    };

    return (
        <Popup
            // fullScreen={true}
            width={"70%"}
            height={"auto"}
            showTitle={true}
            title={"Lịch sử tác động"}
            dragEnabled={true}
            closeOnOutsideClick={true}
            visible={props.businessLogObject.popupVisible}
            onHiding={() => props.businessLogObject.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
