import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, Column, Scrolling, Selection, Format } from "devextreme-react/data-grid";
import { collection, DataCollectionStore } from "@haulmont/jmix-react-core";
import { Citt1 } from "../../../jmix/entities/Citt1";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { BomVersionButton } from "../../product/BomversionButton";
import { Oitw } from "../../../jmix/entities/Oitw";
import List from "devextreme-react/list";
import Form, { SimpleItem, GroupItem, Label } from "devextreme-react/form";
import "../WorkOrderManager.css";
import { TotalCellRender } from "./TotalCommit";

const collectionStore: DataCollectionStore<Oitw> = collection<Oitw>(Oitw.NAME, {
    view: "_base",
    sort: "-isCommited",
    loadImmediately: false,
});

export const StoreView = (props) => {
    let tmp: any[] = [];
    const [isRender, setIsRender] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>({});
    const [data, setData] = useState<any[]>([]);
    const [storeList, setStoreList] = useState(tmp);
    const [popupVisible, setPopupVisible] = useState(false);

    const bomVersion = props && props.bomVersion ? props.bomVersion : null;

    const rowData = props && props.row ? props.row : null;

    const listBomVersionDs: DataCollectionStore<Citt1> = collection<Citt1>(Citt1.NAME, {
        view: "_base",
        sort: "id.docEntry",
        loadImmediately: false,
    });

    const loadBomVersion = () => {
        if (bomVersion) {
            listBomVersionDs.filter = {
                conditions: [
                    { property: "id.docEntry", operator: "=", value: bomVersion.id },
                    { property: "uItemcode", operator: "notEmpty", value: "" },
                ],
            };
            listBomVersionDs.load().then((res) => {
                setData(listBomVersionDs.items);
            });
        }
    };

    useEffect(() => {
        loadBomVersion();
    }, [props]);

    const showInfo = (productItems) => {
        // console.log("productItems")
        // console.log(productItems.data)

        collectionStore.filter = {
            conditions: [
                {
                    property: "id.itemCode",
                    operator: "=",
                    value: productItems.data.uItemcode,
                },
            ],
        };

        collectionStore.load().then((res) => {
            // console.log("showInfo this.collectionStore.item")
            // console.log(collectionStore.items)
            setCurrentItem(productItems.data);
            setStoreList(collectionStore.items);
            setPopupVisible(true);
        });
    };

    const cellRender = (rowInfo) => {
        return <TotalCellRender data={rowInfo} />;
    };

    const hideInfo = () => {
        setPopupVisible(false);
    };

    const popupRender = () => {
        // console.log("this.state.storeList")
        // console.log(storeList)
        return storeList && storeList.length ? (
            <div>
                <List
                    dataSource={storeList}
                    height='400'
                    itemRender={(item) => {
                        return (
                            <div className='product'>
                                <div style={{ fontWeight: "bold" }}>Kho {item.id.whsCode}:</div>
                                <div className='price'>{item.onHand}</div>
                            </div>
                        );
                    }}
                />
            </div>
        ) : (
            <div>NODATA</div>
        );
    };

    const buttonCellRender = (row) => {
        return <BomVersionButton icon={"hierarchy"} row={row} showBomversionView={showInfo} />;
    };

    if (!bomVersion) {
        return <div>NODATA</div>;
    }

    return (
        <React.Fragment>
            <Form formData={bomVersion}>
                <GroupItem colCount={2} cssClass={"first-group"}>
                    <SimpleItem dataField={"Mã hàng hóa"}>{bomVersion.uProno}</SimpleItem>
                    <SimpleItem dataField={"Tên SP"}>{bomVersion.uPronam}</SimpleItem>
                    <SimpleItem dataField={"Version BOM"}>{bomVersion.uVersions}</SimpleItem>
                    <SimpleItem dataField={"Remark"}>{bomVersion.uRemark}</SimpleItem>
                    <SimpleItem dataField={"Speciality"}>{bomVersion.uSpec}</SimpleItem>
                </GroupItem>
            </Form>
            <div className='second-group'>Danh sách nguyên vật liệu của SP: {bomVersion.uPronam}</div>
            {data ? (
                <DataGrid
                    rowAlternationEnabled={false}
                    dataSource={data}
                    showBorders={true}
                    columnAutoWidth={true}
                    keyExpr={"id"}
                    height={"70%"}
                    className={"second-group"}
                    wordWrapEnabled={false}
                    showRowLines={true}>
                    <Scrolling mode='infinite' />
                    {/*<Selection mode="single"/>*/}
                    <Column dataField='uItemcode' width={140} caption='Mã hàng hóa'></Column>
                    <Column dataField='uItemname' caption='Tên hàng hóa'></Column>
                    <Column dataField='uQuantity' caption='Định mức cơ bản' width={100}></Column>
                    <Column dataField='uItmtech' caption='Thông tin kỹ thuật' width={300}></Column>
                    <Column dataField='uVendor' caption='Nhà cung cấp' width={140}></Column>
                    <Column
                        width={100}
                        caption='Tổng số lượng'
                        cellRender={(data) => <div>{data.data.uQuantity * rowData.quantityPlan}</div>}
                        renderAsync={true}>
                        <Format type='fixedPoint' precision={0} />
                    </Column>

                    <Column width={100} caption='Tổng tồn kho' cellRender={cellRender} renderAsync={true}>
                        <Format type='fixedPoint' precision={0} />
                    </Column>
                    <Column
                        cellRender={(row) => {
                            return <BomVersionButton icon={"aligncenter"} row={row} showBomversionView={showInfo} />;
                        }}
                        caption='Xem NVL'
                        alignment={"center"}></Column>
                </DataGrid>
            ) : (
                ""
            )}

            {popupVisible ? (
                <Popup
                    visible={popupVisible}
                    onHiding={hideInfo}
                    dragEnabled={false}
                    hideOnOutsideClick={true}
                    showCloseButton={false}
                    showTitle={true}
                    title='Số lượng có trong kho'
                    container='.dx-viewport'
                    width={300}
                    height={"auto"}
                    maxHeight={600}
                    contentRender={popupRender}></Popup>
            ) : (
                ""
            )}
        </React.Fragment>
    );
};
