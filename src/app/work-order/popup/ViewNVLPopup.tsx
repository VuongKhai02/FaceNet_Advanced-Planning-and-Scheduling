import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "devextreme-react/popup";
import { StoreView } from "../helper/StoreView";

export const ViewNVLPopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("ViewNVLPopup render popup")
        // console.log(props.bomVersionProps)
        return <StoreView row={props.bomVersionProps.currentRow} bomVersion={props.bomVersionProps.bomVersion} />;
    };

    return (
        <Popup
            // fullScreen={true}
            width={"70%"}
            height={"80%"}
            showTitle={true}
            title={"Xem nguyên vật liệu"}
            dragEnabled={true}
            closeOnOutsideClick={true}
            visible={props.bomVersionProps.popupVisible}
            onHiding={() => props.bomVersionProps.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
