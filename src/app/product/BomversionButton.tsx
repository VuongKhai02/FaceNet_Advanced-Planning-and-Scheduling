import React from "react";
import { Button } from "devextreme-react/button";
import { confirm } from "devextreme/ui/dialog";

export const BomVersionButton = (props) => {
    let iconButton = "bookmark";
    let typeButton = "default";

    const showBomversionView = (row) => {
        props.showBomversionView(props.row);

        // const isCanceled = new Promise((resolve, reject) => {
        //   const promptPromise = confirm("Bạn chắc chắn chứ?", "Xác nhận thay đổi");
        //   promptPromise.then((dialogResult) => {
        //     if (dialogResult) {
        //       props.showBomversionView(props.row)
        //       resolve(false)
        //     } else {
        //       reject("")
        //     }
        //   })
        // });
    };

    if (props.icon) {
        iconButton = props.icon;
    }

    if (props.style === "success") {
        return (
            <Button
                id={props.key}
                type='success'
                icon={iconButton}
                height={"35px"}
                stylingMode='text'
                text={props.text}
                onClick={showBomversionView}
                disabled={props.disabled}
            />
        );
    }

    return (
        <>
            <Button
                id={props.key}
                type='default'
                icon={iconButton}
                height={"35px"}
                stylingMode='text'
                onClick={showBomversionView}
                disabled={props.disabled}
                text={props.text}
            />
        </>
    );
};
