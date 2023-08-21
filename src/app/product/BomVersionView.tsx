import React, { useEffect, useState } from "react";
import { collection, DataCollectionStore, injectMainStore, MainStoreInjected } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { Coitt } from "../../jmix/entities/Coitt";
import { Citt1 } from "../../jmix/entities/Citt1";
import { observer } from "mobx-react";
import { DataGrid, Column, Scrolling, Popup, Paging, Lookup, Form } from "devextreme-react/data-grid";
import Form2, { SimpleItem, GroupItem, Label, Item } from "devextreme-react/form";

const listBomVersion = collection<Citt1>(Citt1.NAME, {
    view: "_base",
    sort: "id.docEntry",
    loadImmediately: false,
});

export const BomVersionView = React.memo((props: any) => {
    let tmpDataArr: Citt1[] = [];
    const [data, setData] = useState(tmpDataArr);
    const bomVersion = props.data.bomVersion;

    const process = () => {
        if (bomVersion && props.data.popupVisible == true) {
            listBomVersion.filter = {
                conditions: [
                    { property: "id.docEntry", operator: "=", value: bomVersion.id },
                    { property: "uItemcode", operator: "notEmpty", value: "" },
                ],
            };
            listBomVersion.load().then((res) => {
                if (listBomVersion.items) {
                    let listTmp: Citt1[] = [];
                    listBomVersion.items.map((item) => listTmp.push(item));
                    setData(listTmp);
                }
            });
        }
    };

    useEffect(() => {
        process();
    }, [props]);

    if (!bomVersion) return <div>Empty</div>;
    // console.log(data)
    return (
        <React.Fragment>
            <div className='dx-fieldset-header'>Thông tin Sản phẩm</div>
            <div className='form'>
                <div className='dx-fieldset'>
                    <div className='dx-field'>
                        <div className='dx-field-label'>Mã hàng hóa</div>
                        <div className='dx-field-value-static'>{bomVersion.uProno}</div>
                        <div className='dx-field-label'>Tên SP</div>
                        <div className='dx-field-value-static'>{bomVersion.uPronam}</div>
                        <div className='dx-field-label'>Version BOM</div>
                        <div className='dx-field-value-static'>{bomVersion.uVersions}</div>
                        <div className='dx-field-label'>Remark</div>
                        <div className='dx-field-value-static'>{bomVersion.uRemark ? bomVersion.uRemark : ":"}</div>
                        <div className='dx-field-label'>Speciality</div>
                        <div className='dx-field-value-static'>{bomVersion.uSpec ? bomVersion.uSpec : ":"}</div>
                    </div>
                </div>
            </div>
            <div className='dx-fieldset-header'>Danh sách hàng hóa</div>

            {data && data.length > 0 ? (
                <DataGrid keyExpr={"id"} columnAutoWidth={true} height={550} showBorders={true} dataSource={data}>
                    <Scrolling mode='infinite' />
                    <Column dataField='uItemcode' width={140} caption='Mã hàng hóa'></Column>
                    <Column dataField='uItemname' caption='Mô tả hàng hóa'></Column>
                    <Column dataField='uOthernam' width={140} caption='Tên khác'></Column>
                    <Column dataField='uCtrlevel' width={100} caption='Control Level'></Column>
                    <Column dataField='uPartnumber' width={150} caption='Part Number'></Column>
                    <Column dataField='uLocation' width={100} caption='Location'></Column>
                    <Column dataField='uQuantity' caption='SL Cơ bản'></Column>
                    <Column dataField='uWhscod' caption='Kho xuất vật tư'></Column>
                    <Column dataField='uVendor' caption='Nhà cung cấp'></Column>
                    <Column dataField='' caption='Vật tư thay thế'></Column>
                    <Column dataField='uVersions' caption='Version'></Column>
                    <Column dataField='uRemarks' caption='Remarks'></Column>
                </DataGrid>
            ) : (
                "Nothing"
            )}
        </React.Fragment>
    );
});
