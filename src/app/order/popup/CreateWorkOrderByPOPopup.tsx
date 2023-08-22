import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "devextreme-react/popup";
import CreateWorkOrderByPO from "../helper/CreateWorkOrderByPO";

export const CreateWorkOrderByPOPopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("CreateWorkOrderByPOPopup render popup")
        return (
            <CreateWorkOrderByPO
                row={props.createWOByPoObj.currentRow}
                productOrderItems={props.createWOByPoObj.productItems}
                closePopup={() => props.createWOByPoObj.setPopupVisible(false)}
            />
        );
    };

    return (
        <Popup
            // fullScreen={true}
            width={"85%"}
            height={"auto"}
            showTitle={true}
            title={"Thông tin Work Order"}
            dragEnabled={true}
            hideOnOutsideClick={true}
            visible={props.createWOByPoObj.popupVisible}
            onHiding={() => props.createWOByPoObj.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
