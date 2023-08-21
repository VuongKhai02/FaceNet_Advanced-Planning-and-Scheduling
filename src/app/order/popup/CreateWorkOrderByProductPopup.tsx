import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "devextreme-react/popup";
import CreateWorkOrderByPO from "../helper/CreateWorkOrderByPO";
import CreateWorkOrderByProduct from "../helper/CreateWorkOrderByProduct";

export const CreateWorkOrderByProductPopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("CreateWorkOrderByPOPopup render popup")
        return (
            <CreateWorkOrderByProduct
                row={props.createWOByProdObj.currentRow}
                closePopup={() => props.createWOByProdObj.setPopupVisible(false)}
                productOrder={props.createWOByProdObj.productOrder}
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
            visible={props.createWOByProdObj.popupVisible}
            onHiding={() => props.createWOByProdObj.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
