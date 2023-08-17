import { BomVersionButton } from "../../product/BomversionButton";
import React, { useEffect, useState } from "react";
import { collection } from "@haulmont/jmix-react-core";
import { Coitt } from "../../../jmix/entities/Coitt";

const bomVersionDs = collection<Coitt>(Coitt.NAME, {
    view: "_base",
    loadImmediately: false,
});

const docUrlClick = (row) => {
    window.open(row.data.sapUrl, "_blank");
    // bomVersionDs.filter = {
    //   conditions: [{property: 'uProno', operator: "=", value: row.data.productCode},
    //     {property: 'uVersions', operator: "=", value: row.data.bomVersion}]
    // };
    // bomVersionDs.load().then(res => {
    //   if (bomVersionDs.items) {
    //     let item = bomVersionDs.items.pop();
    //     if (item && item.uDocurl)
    //       window.open(item.uDocurl, '_blank');
    //   }
    // })
};

const docUrlClick2 = (row) => {
    window.open(row.data.sapUrl2, "_blank");
    // bomVersionDs.filter = {
    //   conditions: [{property: 'uProno', operator: "=", value: row.data.productCode},
    //     {property: 'uVersions', operator: "=", value: row.data.bomVersion}]
    // };
    // bomVersionDs.load().then(res => {
    //   if (bomVersionDs.items) {
    //     let item = bomVersionDs.items.pop();
    //     if (item && item.uDocurl2)
    //       window.open(item.uDocurl2, '_blank');
    //   }
    // })
};

export const ViewDocUrlButton = (props) => {
    const [isDisable, setIsDisable] = useState(true);
    const [isDisable2, setIsDisable2] = useState(true);
    useEffect(() => {
        bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: props.data.data.productCode },
                { property: "uVersions", operator: "=", value: props.data.data.bomVersion },
            ],
        };
        // bomVersionDs.load().then(res => {
        //   if (bomVersionDs.items) {
        //     let item = bomVersionDs.items.pop();
        //     if (item && item.uDocurl)
        //       setIsDisable(false)
        //     if(item && item.uDocurl2)
        //       setIsDisable2(false)
        //   }
        // })

        if (props.data.data.sapUrl && props.data.data.sapUrl.trim() != "") {
            setIsDisable(false);
        }
        if (props.data.data.sapUrl2 && props.data.data.sapUrl2.trim() != "") {
            setIsDisable2(false);
        }
    }, [props]);

    return (
        <div>
            <BomVersionButton row={props.data} showBomversionView={docUrlClick} icon={"folder"} disabled={isDisable} />
            <BomVersionButton row={props.data} showBomversionView={docUrlClick2} icon={"folder"} disabled={isDisable2} />
        </div>
    );
};
