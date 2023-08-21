import React, { useEffect, useState } from "react";
import { Autocomplete } from "devextreme-react";
import { collection } from "@haulmont/jmix-react-core";
import { Profile } from "../../../jmix/entities/Profile";
import { Batch } from "../../../jmix/entities/Batch";
import { Owor } from "../../../jmix/entities/Owor";
import WorkOrderService from "../../services/WorkOrderService";

export const SapWOAutocomplete = (props) => {
    const [data, setData] = useState<any[]>([]);
    const batchCollection = collection<Batch>(Batch.NAME, {
        view: "_base",
        sort: "name",
        loadImmediately: false,
    });

    useEffect(() => {
        console.log("props");
        console.log(props);
        WorkOrderService.getSapWO(props.data.data.productCode).then((res) => {
            if (res.status == 200) {
                setData(res.data);
            }
        });
    }, []);

    const itemRender = (e, index) => {
        console.log(e);
        return e.uproduction + ". " + e.code;
    };

    const onValueChanged = (e) => {
        props.data.setValue(e.value);
    };

    const onselectionChange = (e) => {
        console.log(e);
        props.data.setValue(e.selectedItem);
    };

    const onValueChanging = (e) => {
        console.log(e);
        props.data.setValue(e);
        // if (e &&  e.length >= 2) {
        //   batchCollection.filter = {
        //     conditions: [{property: 'uProduction', operator: "contains", value: e}]
        //   }
        //   batchCollection.load().then(res => {
        //     if (batchCollection.items && batchCollection.items.length > 0) {
        //       setData(batchCollection.items);
        //     } else {
        //       props.data.setValue(e);
        //     }
        //   });
        // }
    };

    const onChange = (e) => {
        console.log("onchange");
        console.log(e.component._changedValue);
        props.data.setValue(e.component._changedValue);
    };

    return (
        <Autocomplete
            dataSource={data}
            valueExpr='uproduction'
            // minSearchLength={2}
            onSelectionChanged={onselectionChange}
            defaultValue={props.data.value}
            // onValueChanged={onValueChanged}
            // onValueChange={onValueChanging}
            onChange={onChange}
            searchTimeout={500}
            placeholder='Type sap wo value...'
            // onEnterKey={onValueChanging}
            // applyValueMode={"useButtons"}
            itemRender={itemRender}
        />
    );
};
