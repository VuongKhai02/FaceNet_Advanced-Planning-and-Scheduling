import React, { useEffect, useState } from "react";
import myImg from "../images/qrCode.jpg";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    MasterDetail, Editing, Form
} from "devextreme-react/data-grid";
import axios from "axios";
import { Link, useMainStore } from "@haulmont/jmix-react-core";
import { MenuItem, registerScreen } from "@haulmont/jmix-react-ui";
import { IWarning } from "../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../config";
import { ImportOrder } from "../../import/ImportOrder";
import { customizeColor, getColor } from "../../../utils/utils";
// import TechFormListDetail from "./TechFormListDetail";
import { Tooltip } from "devextreme-react/tooltip";
import { Tag } from "antd";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
// import TechProcedure from "./TechFormNewAdd/TechProcedure/TechProcedure";
import { ImportTechForm } from "../../import/ImportTechForm";


const ROUTING_PATH = "/declareProductionObject";

export const DeclareProductionObject = () => {
    const mainStore = useMainStore();
    const [content, setContent] = useState<string>();
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);



    const loadOrders = () => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        axios.get(PLANNING_API_URL + '/api/orders', { headers })
            .then(response => {
                if (response.status === 200) {
                    // console.log(response.data)
                    setContent(response.data.data)
                }
            }
            );
    }

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        loadOrders();
        window.addEventListener('resize', updateDimension);
    }, [])

    const handleAddFormTech = () => {
    }


    const showInfo = () => {
    }


    const onStatusPoRender = (rowInfo) => {
        // console.log("Data color,", data?.value)
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
        // let backgroundColor = "";
        let padding = "";
        let borderRadius = "";
        let width = "";
        let border = "";

        // let value = rowInfo.data.data.processStatus;
        const getColor = (value) => {
            // let color = ""
            switch (value) {
                case "new":
                    status = "Chờ sản xuất"
                    break;
                case "complete":
                    status = "Hoàn thành"
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành"
                    break
                case "in_production":
                    status = "Đang sản xuất"
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm"
                    break;
                case "delay":
                    status = "Chậm tiến độ"
                    break;
                case "unknown":
                    status = "Chưa xác định"
                    break;
                case "wait_production":
                    status = "Chờ sản xuất"
                    break;
                case "stop":
                    status = "Ngưng sản xuất"
                    break;
                default:
                    status = "Chưa xác định"
                    break;
            }
        }

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status)
        border = "1px solid " + customColor.color;
        // const color = getColor(rowInfo.data.data.processStatus)
        // return <Tag color={color}>{status}</Tag>
        return <Tag style={{
            "fontWeight": "bold",
            "width": "100%",
            "textAlign": "center",
            "color": customColor.color,
            "backgroundColor": customColor.backgroundColor,
            // "padding": padding,
            "borderRadius": "4px",
            // "width": width,
            "border": border
        }}>{status}</Tag>
    }


    const saveOrder = (data) => {
    }


    const getProductOrderItemTemplate = row => {
    };


    const selectionModes = ['none', 'single', 'multiple', 'all'];
    return (
        <>
            <div>
                <div className="table-responsive">
                    <div className="informer" style={{
                        background: "#fff",
                        textAlign: "center",
                        paddingTop: 12
                    }}>
                        <h5 className="name" style={{
                            fontSize: 18,
                            marginBottom: 0
                        }}>Khai báo thông tin</h5>
                    </div>
                    <div className="informer" style={{
                        backgroundColor: "#ffffff",
                        paddingLeft: 13
                    }}>
                        <h5 className="name" style={{
                            color: "rgba(0, 0, 0, 0.7)",
                            marginBottom: 0,
                            fontSize: 15,
                            boxSizing: "border-box",
                            fontWeight: 550
                        }}>Tìm kiếm chung</h5>
                    </div>
                </div>
            </div>


            <DataGrid
                keyExpr={"saleOrderId"}
                dataSource={content}
                showBorders={true}
                columnAutoWidth={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                focusedRowEnabled={true}
            // onSelectionChanged={onSelectedRowKeysChange}
            // onRowClick={onSelectedRowKeysChange}
            // onRowUpdating={updateOrder}
            // onRowRemoving={removeOrder}
            >
                <Toolbar>
                    <ToolbarItem location="after">
                        <Button style={{ color: "rgba(255, 122, 0, 1)" }} text="Xuất Excel" hint="Xuất Excel" icon="download" />
                    </ToolbarItem>
                    <ToolbarItem location="after">
                        <Button hint="Column to display" icon="columnchooser" />
                    </ToolbarItem>

                    <ToolbarItem name="searchPanel" location="before" />

                </Toolbar>
                <HeaderFilter visible={true} texts={{
                    cancel: "Hủy bỏ",
                    ok: "Đồng ý",
                    emptyValue: "Rỗng"

                }} />
                <FilterRow visible={true} />
                <SearchPanel visible={true} placeholder={"Tìm kiếm"} />
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    displayMode={"full"}
                    showInfo={true}
                    showNavigationButtons={true}
                    allowedPageSizes={[5, 10]}
                    infoText="Trang số {0} trên {1} ({2} bản ghi)"
                />

                <Column caption={"Mã WO"} dataField={"saleOrderId"} alignment="left" />
                <Column caption={"Mã sản xuất"} dataField={"customer"} alignment="right" />
                <Column caption={"Mã công nhân"} />
                <Column caption={"Số lô NVL/BTP đầu vào"} alignment="left" />
                <Column caption={"Số lô NVL/BTP đầu ra"} alignment="left" />
                <Column caption={"Thời gian bắt đầu"} dataType="datetime" format="dd/MM/yyyy hh:mm:ss" />
                <Column caption={"Thời gian kết thúc"} dataType="datetime" dataField={"startTime"} format="dd/MM/yyyy hh:mm:ss" />
                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                <Column type="buttons" width={110} caption="Thao tác">
                    <Button hint="Clone" icon="copy" />
                </Column>
                <Editing mode="popup" useIcons={true} allowUpdating={true} allowDeleting={true}
                    texts={{
                        cancelRowChanges: "Hủy bỏ",
                        saveRowChanges: "Lưu lại",
                        confirmDeleteTitle: 'Xác nhận xóa bản ghi',
                        confirmDeleteMessage: 'Bạn chắc chắn muốn xóa bản ghi này?',
                        deleteRow: "Xóa",
                        editRow: "Sửa",
                        addRow: "Thêm"
                    }}
                >
                    <Popup
                        title="Thông tin chi tiết đơn hàng"
                        showTitle={true}
                        width={"80%"}
                        height={"auto"}
                    />
                    <Form labelLocation="top" onEditorEnterKey={saveOrder} >
                        <Item
                            itemType="group"
                            colCount={2}
                            colSpan={2}
                            caption="Thông tin chi tiết đơn hàng"
                        >
                            <Item dataField="saleOrderId" disabled={true} caption="Mã sx/Production Code" />
                            <Item dataField="productionCode" disabled={true} caption="Mã sx/Production Code" />
                            <Item dataField="customer" caption="Tên khách hàng" />
                            <Item dataField="cardName" caption="Tên thẻ" />
                            <Item dataField="quantity" caption="Số lượng" />
                            <Item dataField="totalQuantity" caption="SL thẻ đã tính bù hao" />
                            <Item dataField="contractNumber" caption="Số HD/PO" />
                            <Item dataField="startTime" caption="Ngày bắt đầu" />
                            <Item dataField="finishTime" caption="Ngày kết thúc" />
                            <Item dataField="deliveryDate" caption="Ngày giao hàng" />
                        </Item>
                    </Form>
                </Editing>


            </DataGrid>

            <div>
                <div className="table-responsive">
                    <div className="informer" style={{
                        background: "#fff",
                        textAlign: "left",
                        paddingTop: 12
                    }}>
                        <h2 className="name" style={{
                            marginBottom: 0,
                            fontWeight: 700,
                            margin: "0 0 .6rem .5rem"
                        }}>Khai báo thông tin</h2>
                        <div style={{ border: '1px solid #ccc', borderRadius: '6px', margin: '0.5rem' }}>
                            <div className="content" style={{ display: "flex", height: "45vh", width: "100%", justifyContent: "space-between", margin: ".5rem", flexWrap: "wrap" }}>
                                <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "23%", margin: "0 1rem 1rem 0" }}>
                                    <p>Mã sản xuất</p>
                                    <SelectBox placeholder="-- Chọn WO --" >
                                        items={selectionModes}
                                    </SelectBox>
                                </div>
                                <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "24%", margin: "0 1rem 1rem 0" }}>
                                    <p>Mã SO</p>
                                    <TextBox style={{ backgroundColor: "#CCC" }} disabled ></TextBox>
                                </div>
                                <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "24%", margin: "0 1rem 1rem 0" }}>
                                    <p>Tên công đoạn</p>
                                    <SelectBox placeholder="-- Chọn công đoạn --">
                                        items={selectionModes}
                                    </SelectBox>
                                </div>
                                <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "24%", margin: "0 1rem 1rem 0" }}>
                                    <p>Tên Job</p>
                                    <SelectBox placeholder="-- Chọn Job --">
                                        items={selectionModes}
                                    </SelectBox>
                                </div>

                            </div>

                            <div className="content" style={{ display: windowWidth < 600 ? "none" : "flex", backgroundColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-between", margin: ".5rem", padding: "1rem 0.3rem", borderRadius: "4px" }}>
                                <div className="col-4" style={{ width: "47%", margin: "0.2rem" }}>
                                    <p>Mã sản xuất</p>
                                    <TextBox style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0 0 0 2rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }} placeholder="Quét mã trên ứng dụng mobile  " > </TextBox>
                                    {/* <input style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0.5rem 0.5rem 0.5rem 3rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }} type="text" name="" id="" placeholder="Quét mã trên ứng dụng mobile  " /> */}

                                    <p>Mã máy</p>
                                    <TextBox style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0 0 0 2rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }} placeholder="Quét mã trên ứng dụng mobile  " > </TextBox>
                                    {/* <input style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0.5rem 0.5rem 0.5rem 3rem", borderRadius: "4px", border: "1px solid #ccc" }} type="text" name="" id="" placeholder="Quét mã trên ứng dụng mobile  " /> */}
                                </div>
                                <div className="col-4" style={{ width: "47%", margin: "0.2rem" }}>
                                    <p>Mã công nhân</p>
                                    <TextBox style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0 0 0 2rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }} placeholder="Quét mã trên ứng dụng mobile  " > </TextBox>
                                    {/* <input style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0.5rem 0.5rem 0.5rem 3rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }} type="text" name="" id="" placeholder="Quét mã trên ứng dụng mobile  " /> */}

                                    <p>Mã lô NVL/BTP</p>
                                    <TextBox style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0 0 0 2rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }} placeholder="Quét mã trên ứng dụng mobile  " > </TextBox>
                                    {/* <input style={{ background: `url(${myImg}) no-repeat scroll 5px 4px`, width: "70%", padding: "0.5rem 0.5rem 0.5rem 3rem", borderRadius: "4px", border: "1px solid #ccc" }} type="text" name="" id="" placeholder="Quét mã trên ứng dụng mobile  " /> */}
                                </div>

                            </div>
                            <div style={{ display: 'flex', flexDirection: "row-reverse", padding: "1rem" }}>
                                <Button
                                    style={{ backgroundColor: "rgba(255, 122, 0, 1)", color: "#fff" }}
                                    text={windowWidth < 600 ? "Quét Qr" : "Khai báo thông tin sản xuất"}
                                    height={35}
                                    width={250}

                                // render={(buttonData) =>
                                //     <p style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{windowWidth < 600 ? "Quét Qr" : "Khai báo thông tin sản xuất"}</p>
                                // }
                                />


                            </div>



                        </div>

                    </div>
                    <div className="informer" style={{
                        backgroundColor: "#ffffff",
                        paddingLeft: 13
                    }}>
                    </div>
                </div>
            </div>



        </>
    )
}


registerScreen({
    caption: "Khai báo người/máy/lô sản xuất",
    component: DeclareProductionObject,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "declareProductionObject"
});

export default DeclareProductionObject;