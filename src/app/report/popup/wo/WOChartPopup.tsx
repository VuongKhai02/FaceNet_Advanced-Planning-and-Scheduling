import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "devextreme-react/popup";
import { WOResponsiveGrid } from "./WOResponsiveGrid";
import { ScrollView } from "devextreme-react";

export const WOChartPopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("CreateWorkOrderByPOPopup render popup")
        return (
            <ScrollView height='100%' width='100%'>
                <WOResponsiveGrid
                    closePopup={() => props.reportWODetailObject.setPopupVisible(false)}
                    popupVisible={props.reportWODetailObject.popupVisible}
                />
            </ScrollView>
        );
    };

    return (
        <Popup
            fullScreen={true}
            height={"auto"}
            showTitle={true}
            title={"Biểu đồ"}
            // dragEnabled={true}
            // closeOnOutsideClick={true}
            visible={props.reportWODetailObject.popupVisible}
            onHiding={() => props.reportWODetailObject.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
