import React, { useEffect, useState } from "react";
import "./DeclareProductionObject.css"
import { DataGrid, SelectBox, } from "devextreme-react";
import { Button, Tag } from "antd"
import {
    Export,
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar, ColumnChooser, Button as ButtonIcon, MasterDetail
} from "devextreme-react/data-grid";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { PLANNING_API_URL } from "../../../../config";
import { customizeColor } from "../../../../utils/utils";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import DeclareProductionInfor from "./declareProductionInfor/ProductionOder/DeclareProductionInfor";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import ProductionInfoDetail from "./ProductionInfoDetail"


const ROUTING_PATH = "/declareProductionObject";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];
const fakeInfoMapped = [{
    pro_id: "",
    machine_id: "",
    worker_id: "",
    plot_id: "",
}]

export const infoMappedContext = React.createContext<any | null>(null);

export const DeclareProductionObject = () => {
    const mainStore = useMainStore();
    const [content, setContent] = useState<string>();
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [isVisibleDetail, setisVisibleDetail] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);

    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    }

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    }

    const [infoMapped, setInfoMapped] = useState(fakeInfoMapped);

    const loadOrders = () => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        axios.get(PLANNING_API_URL + '/api/orders', { headers })
            .then(response => {
                if (response.status === 200) {
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

    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');

        exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
            });
        });
        e.cancel = true;
    }

    const cellRender = (e) => {
        return (
            windowWidth < 600 ? <SelectBox style={{ width: windowWidth < 600 ? "100%" : "47%" }} placeholder="-- Chọn công đoạn --" /> : <></>
        )
    }
    return (
        <infoMappedContext.Provider value={[infoMapped, setInfoMapped]}>
            <>
                {
                    isVisibleDetail == true ? <ProductionInfoDetail isOpen={isDeclareInfo}
                        setClose={() => setisDeclareInfo(false)} /> :
                        isDeclareInfo ? <DeclareProductionInfor
                            isOpen={isDeclareInfo}
                            setClose={() => setisDeclareInfo(false)} /> :
                            <div>
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
                                            }}>Danh sách khai báo thông tin sản xuất</h5>
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
                                                fontWeight: 550,
                                                marginLeft: ".5rem"
                                            }}>Tìm kiếm chung</h5>
                                        </div>
                                    </div>
                                </div>
                                <DataGrid
                                    style={{ marginLeft: "0 .5rem" }}
                                    keyExpr={"saleOrderId"}
                                    dataSource={content}
                                    showBorders={true}
                                    columnAutoWidth={true}
                                    showRowLines={true}
                                    rowAlternationEnabled={true}
                                    allowColumnResizing={true}
                                    allowColumnReordering={true}
                                    focusedRowEnabled={true}
                                    onExporting={onExporting}
                                >
                                    <Toolbar>
                                        <ToolbarItem name="exportButton" html="Xuất excel" location="after"></ToolbarItem>
                                        <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                        <ToolbarItem name="searchPanel" location="before" />
                                    </Toolbar>
                                    <HeaderFilter visible={true} texts={{
                                        cancel: "Hủy bỏ",
                                        ok: "Đồng ý",
                                        emptyValue: "Rỗng"
                                    }} />
                                    <FilterRow visible={true} />
                                    <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
                                    <SearchPanel visible={true} placeholder={"Tìm kiếm..."} width={300} />
                                    <Paging defaultPageSize={10} />
                                    <Pager
                                        visible={true}
                                        allowedPageSizes={allowedPageSizes}
                                        displayMode={"full"}
                                        showPageSizeSelector={true}
                                        showInfo={true}
                                        showNavigationButtons={true}
                                        infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                                    <Column caption={"Mã đơn hàng"} dataField={"saleOrderId"} alignment="left" allowFiltering={false} ></Column>
                                    <Column caption={"Mã sản xuất"} dataField={"customer"} alignment="right" />
                                    <Column caption={"Tên thẻ"} dataField={"customer"} />
                                    <Column caption={"Ngày bắt đầu"} dataType="datetime" dataField={"startTime"} format="dd/MM/yyyy hh:mm:ss" />
                                    <Column caption={"Ngày kết thúc"} dataType="datetime" dataField={"startTime"} cellRender={cellRender} format="dd/MM/yyyy hh:mm:ss" />
                                    <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                                    <Column type="buttons" width={110} caption="Thao tác" cellRender={() =>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon tooltipTitle="Chi tiết" onClick={() => { setisVisibleDetail(true) }} sizeIcon={17} textSize={17} icon="assets/icons/InfoCircle.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            <SvgIcon tooltipTitle="Xóa" onClick={handleShowModalDel} sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        </div>}>
                                    </Column>
                                    <Export enabled={true} allowExportSelectedData={true} />
                                </DataGrid>
                                <PopupConfirmDelete
                                    isVisible={isConfirmDelete}
                                    onCancel={handleHideModalDel}
                                    onSubmit={() => console.log('ok')
                                    }
                                    modalTitle={
                                        <div style={{ textAlign: "center" }}>
                                            <img src="assets/icons/warning.svg" alt="" />
                                            <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500, marginTop: 20, fontSize: 30 }}>
                                                Xác nhận xóa?
                                            </h3>
                                            <h5 style={{ fontWeight: 400, marginTop: 30, fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>Bạn có chắc chắn muốn thực hiện thao tác xóa không?</h5>
                                        </div>
                                    }
                                    modalContent={''}
                                    width={600} />
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
                                            <div style={{ border: '1px solid #ccc', borderRadius: '6px', margin: '0.5rem', padding: windowWidth < 600 ? "0" : "0 3rem" }}>
                                                {/* <div className="content" style={{ display: "flex", height: "24vh", width: "100%", justifyContent: "space-between", margin: ".5rem", flexWrap: "wrap" }}>
                                                    <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "47%", margin: "0 1rem 1rem 0" }}>
                                                        <p>Tên công đoạn</p>
                                                        <SelectBox style={{ width: windowWidth < 600 ? "100%" : "47%" }} placeholder="-- Chọn công đoạn --" items={stage_name} />

                                                    </div>
                                                    <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "47%", margin: "0 1rem 1rem 0" }}>
                                                        <p>Tên Job</p>
                                                        <SelectBox style={{ width: windowWidth < 600 ? "100%" : "47%" }} placeholder="-- Chọn job --" items={job_name} />
                                                    </div>
                                                </div>

                                                <div className="content" style={{ display: windowWidth < 600 ? "none" : "flex", justifyContent: "space-between", margin: ".5rem", padding: "1rem 0.3rem", borderRadius: "4px" }}>
                                                    <div className="col-4" style={{ width: "47%", margin: "0.2rem" }}>
                                                        <p>Mã sản xuất</p>
                                                        <TextBox value={infoMapped[0].pro_id} disabled style={{ background: infoMapped[0].pro_id == "" ? `url(assets/images/qrTextBox.jpg) no-repeat scroll 5px 4px` : "none", padding: infoMapped[0].pro_id == "" ? "0 0 0 1.5rem" : "0 .3rem", borderRadius: "4px", border: "1px solid rgba(0, 0, 0, 0.4)", marginBottom: "1rem" }} placeholder="Quét mã trên Zebra  " > </TextBox>

                                                        <p>Mã máy</p>
                                                        <TextBox value={infoMapped[0].machine_id} disabled style={{ background: infoMapped[0].machine_id == "" ? `url(assets/images/qrTextBox.jpg) no-repeat scroll 5px 4px` : "none", padding: infoMapped[0].machine_id == "" ? "0 0 0 1.5rem" : "0 .3rem", borderRadius: "4px", border: "1px solid rgba(0, 0, 0, 0.4)", marginBottom: "1rem" }} placeholder="Quét mã trên Zebra  " > </TextBox>
                                                    </div>
                                                    <div className="col-4" style={{ width: "47%", margin: "0.2rem" }}>
                                                        <p>Mã công nhân</p>
                                                        <TextBox value={infoMapped[0].worker_id} disabled style={{ background: infoMapped[0].worker_id == "" ? `url(assets/images/qrTextBox.jpg) no-repeat scroll 5px 4px` : "none", padding: infoMapped[0].worker_id == "" ? "0 0 0 1.5rem" : "0 .3rem", borderRadius: "4px", border: "1px solid rgba(0, 0, 0, 0.4)", marginBottom: "1rem" }} placeholder="Quét mã trên Zebra  " > </TextBox>

                                                        <p>Mã lô NVL/BTP</p>
                                                        <TextBox value={infoMapped[0].plot_id} disabled style={{ background: infoMapped[0].plot_id == "" ? `url(assets/images/qrTextBox.jpg) no-repeat scroll 5px 4px` : "none", padding: infoMapped[0].plot_id == "" ? "0 0 0 1.5rem" : "0 .3rem", borderRadius: "4px", border: "1px solid rgba(0, 0, 0, 0.4)", marginBottom: "1rem" }} placeholder="Quét mã trên Zebra  " > </TextBox>
                                                    </div>

                                                </div> */}
                                                <div style={{ display: 'flex', flexDirection: "row-reverse", padding: "1rem" }}>
                                                    <Button onClick={() => { setisDeclareInfo(true) }} className="btn_continue">{windowWidth > 600 ? "Chuyển sang giao diện công nhân" : "Khai báo thông tin"}</Button>
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
                            </div>




                }
            </>
        </infoMappedContext.Provider>
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