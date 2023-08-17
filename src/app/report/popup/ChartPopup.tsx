import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "devextreme-react/popup";
import { ResponsiveGrid } from "./ResponsiveGrid";
import { ScrollView } from "devextreme-react";

export const ChartPopup = observer((props: any) => {
    const renderPopup = () => {
        // console.log("CreateWorkOrderByPOPopup render popup")
        return (
            <ScrollView height='100%' width='100%'>
                <ResponsiveGrid
                    closePopup={() => props.reportPODetailObject.setPopupVisible(false)}
                    popupVisible={props.reportPODetailObject.popupVisible}
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
            visible={props.reportPODetailObject.popupVisible}
            onHiding={() => props.reportPODetailObject.setPopupVisible(false)}
            contentRender={renderPopup}
        />
    );
});
