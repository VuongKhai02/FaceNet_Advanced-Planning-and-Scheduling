import React, { useState, useEffect } from "react";
import { collection, DataCollectionStore } from "@haulmont/jmix-react-core";
import { Oitw } from "../../../jmix/entities/Oitw";

const collectionStore: DataCollectionStore<Oitw> = collection<Oitw>(Oitw.NAME, {
    view: "_base",
    sort: "-isCommited",
    loadImmediately: false,
});

export const TotalCellRender = (props) => {
    const [totalState, setTotalState] = useState(0);

    useEffect(() => {
        if (props.data.data.uItemcode) {
            collectionStore.filter = {
                conditions: [
                    {
                        property: "id.itemCode",
                        operator: "=",
                        value: props.data.data.uItemcode,
                    },
                ],
            };

            collectionStore.load().then((res) => {
                if (collectionStore.items) {
                    let total = 0;
                    collectionStore.items.forEach((item) => {
                        total += item.onHand;
                    });
                    setTotalState(total);
                }
            });
        }
    }, [props]);

    return <div>{totalState}</div>;
};
