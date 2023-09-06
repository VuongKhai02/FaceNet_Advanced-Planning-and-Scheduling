import React, { useEffect, useState } from "react";
import "./DeclareProductionObject.css";
import { Button, DataGrid, SelectBox, TextBox } from "devextreme-react";
import {
    Export,
    Column,
    FilterRow,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    ColumnChooser,
} from "devextreme-react/data-grid";
import { PLANNING_API_URL } from "../../../../utils/config";
import { customizeColor } from "../../../../utils/utils";
import { Tag } from "antd";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import qrTextbox from "./images/qrTextBox.jpg";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import DeclareProductionInfor from "./declareProductionInfor/ProductionOder/DeclareProductionInfor";
import ProgressMonitoringWODetail from "../../ProgressMonitoring/ProgressMonitoringManufacture/ProgressMonitoringWODetail/ProgressMonitoringWODetail";
import httpRequests from "../../../../utils/httpRequests";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";

const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];

const stage_name = ["In offset", "In lưới", "Ép", "Cắt"];

const job_name = ["Ra film", "Ra film + Chụp bản", "In màu", "In trắng"];

export const DeclareProductionObject = () => {
    const [content, setContent] = useState<string>();
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [isVisibleProgressWODetailJob, setisVisibleProgressWODetailJob] = React.useState<boolean>(false);
    const [dataSelected, setDataSelected] = useState([
        {
            id: "0",
            production_id: "0",
            so_id: "0",
        },
    ]);

    const fakeDtselect = [
        {
            id: "1",
            production_id: "123",
            so_id: "321",
        },
        {
            id: "2",
            production_id: "567",
            so_id: "765",
        },
        {
            id: "3",
            production_id: "456",
            so_id: "654",
        },
    ];

    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "product-plan-management",
                        title: "Quản lý kế hoạch sản xuất",
                    },
                    {
                        key: "declare-production-object",
                        title: "Khai báo thông tin sản xuất",
                    }
                ]
            })
        }
    }, []);

    const handleChangeScreen = () => {
        setisDeclareInfo(true);
    };
    const loadOrders = () => {

        httpRequests.get(PLANNING_API_URL + "/api/orders").then((response) => {
            if (response.status === 200) {
                setContent(response.data.data);
            }
        });
    };

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth);
        };
        loadOrders();
        window.addEventListener("resize", updateDimension);
    }, []);

    const onStatusPoRender = (rowInfo: any) => {
        let customColor: {
            color: string;
            backgroundColor: string;
        } = {
            color: "",
            backgroundColor: "",
        };
        let status = "";
        let border = "";

        const getColor = (value: any) => {
            // let color = ""
            switch (value) {
                case "new":
                    status = "Chờ sản xuất";
                    break;
                case "complete":
                    status = "Hoàn thành";
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành";
                    break;
                case "in_production":
                    status = "Đang sản xuất";
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm";
                    break;
                case "delay":
                    status = "Chậm tiến độ";
                    break;
                case "unknown":
                    status = "Chưa xác định";
                    break;
                case "wait_production":
                    status = "Chờ sản xuất";
                    break;
                case "stop":
                    status = "Ngưng sản xuất";
                    break;
                default:
                    status = "Chưa xác định";
                    break;
            }
        };

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status);
        border = "1px solid " + customColor.color;
        // const color = getColor(rowInfo.data.data.processStatus)
        // return <Tag color={color}>{status}</Tag>
        return (
            <Tag
                style={{
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    color: customColor.color,
                    backgroundColor: customColor.backgroundColor,
                    // "padding": padding,
                    borderRadius: "4px",
                    // "width": width,
                    border: border,
                }}>
                {status}
            </Tag>
        );
    };

    // getItemSelected
    const onValueChanged = (e: any) => {
        setDataSelected(fakeDtselect.filter((data) => data.id == e.value));
    };

    const onExporting = (e: any) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Main sheet");

        exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx");
            });
        });
        e.cancel = true;
    };
    return (
        <>
            {isVisibleProgressWODetailJob == true ? (
                <ProgressMonitoringWODetail isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)} />
            ) : isDeclareInfo ? (
                <DeclareProductionInfor isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)} />
            ) : (
                <div>
                    <div>
                        <div className='table-responsive'>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "center",
                                    paddingTop: 12,
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                    }}>
                                    Danh sách khai báo người/máy/lô sản xuất
                                </h5>
                            </div>
                        </div>
                    </div>
                    <DataGrid
                        className='table-responsive'
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
                            {/* <ToolbarItem location="after">
                            <SvgIcon tooltipTitle="Xuất Excel" text="Xuất Excel" onClick={() => setIsVisibleAdd(true)} sizeIcon={17} textSize={17} icon="assets/icons/ExportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                        </ToolbarItem> */}
                            <ToolbarItem name='exportButton' html='Xuất excel' location='after'></ToolbarItem>
                            <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
                            <ToolbarItem name='searchPanel' location='before' />
                        </Toolbar>
                        <FilterRow visible={true} />
                        <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                        <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                        <Paging defaultPageSize={10} />
                        <Pager
                            visible={true}
                            allowedPageSizes={allowedPageSizes}
                            displayMode={"compact"}
                            showPageSizeSelector={true}
                            showInfo={true}
                            showNavigationButtons={true}
                            infoText='Trang số {0} trên {1} ({2} bản ghi)'
                        />
                        <Column caption={"Mã WO"} dataField={"saleOrderId"} alignment='left' />
                        <Column caption={"Mã sản xuất"} dataField={"customer"} alignment='right' />
                        <Column caption={"Mã công nhân"} dataField={"customer"} />
                        <Column caption={"Số lô NVL/BTP đầu vào"} dataField={"customer"} alignment='left' />
                        <Column caption={"Số lô NVL/BTP đầu ra"} dataField={"customer"} alignment='left' />
                        <Column caption={"Thời gian bắt đầu"} dataType='datetime' dataField={"startTime"} format='dd/MM/yyyy hh:mm:ss' />
                        <Column caption={"Thời gian kết thúc"} dataType='datetime' dataField={"startTime"} format='dd/MM/yyyy hh:mm:ss' />
                        <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                        <Column
                            fixed={true}
                            type='buttons'
                            width={110}
                            caption='Thao tác'
                            cellRender={() => (
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                    <SvgIcon
                                        tooltipTitle='Giám sát tiến độ theo công đoạn'
                                        onClick={() => {
                                            setisVisibleProgressWODetailJob(true);
                                        }}
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/InfoCircle.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </div>
                            )}></Column>
                        <Export enabled={true} allowExportSelectedData={true} />
                    </DataGrid>
                    <div>
                        <div className='table-responsive'>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 12,
                                }}>
                                <h2
                                    className='name'
                                    style={{
                                        marginBottom: 0,
                                        fontWeight: 700,
                                        // margin: "0 0 .6rem .5rem",
                                    }}>
                                    Khai báo thông tin
                                </h2>
                                <div
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "6px",
                                        // margin: "0.5rem",
                                        padding: windowWidth < 600 ? "0" : "0 3rem",
                                    }}>
                                    <div
                                        className='content'
                                        style={{
                                            display: "flex",
                                            height: "45vh",
                                            width: "100%",
                                            justifyContent: "space-between",
                                            margin: ".5rem",
                                            flexWrap: "wrap",
                                        }}>
                                        {/* <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "23%", margin: "0 1rem 1rem 0" }}>
                                                <p>Mã sản xuất</p>
                                                <SelectBox placeholder="-- Chọn mã sản xuất --"
                                                    dataSource={fakeDtselect}
                                                    displayExpr="production_id"
                                                    valueExpr="id"
                                                    onValueChanged={onValueChanged}
                                                />
                                            </div>
                                            <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "22%", margin: "0 1rem 1rem 0" }}>
                                                <p>Mã SO</p>
                                                <TextBox value={dataSelected[0].so_id} style={{ backgroundColor: "#CCC" }} disabled ></TextBox>
                                            </div> */}
                                        <div
                                            className='col-4'
                                            style={{ width: windowWidth < 600 ? "100%" : "47%", margin: "0 1rem 1rem 0" }}>
                                            <p>Tên công đoạn</p>
                                            <SelectBox
                                                style={{ width: windowWidth < 600 ? "100%" : "47%" }}
                                                placeholder='-- Chọn công đoạn --'
                                                items={stage_name}
                                            />
                                        </div>
                                        <div
                                            className='col-4'
                                            style={{ width: windowWidth < 600 ? "100%" : "47%", margin: "0 1rem 1rem 0" }}>
                                            <p>Tên Job</p>
                                            <SelectBox
                                                style={{ width: windowWidth < 600 ? "100%" : "47%" }}
                                                placeholder='-- Chọn job --'
                                                items={job_name}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className='content'
                                        style={{
                                            display: windowWidth < 600 ? "none" : "flex",
                                            justifyContent: "space-between",
                                            margin: ".5rem",
                                            padding: "1rem 0.3rem",
                                            borderRadius: "4px",
                                        }}>
                                        <div className='col-4' style={{ width: "47%", margin: "0.2rem" }}>
                                            <p>Mã sản xuất</p>
                                            <TextBox
                                                disabled
                                                style={{
                                                    background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                                    width: "90%",
                                                    padding: "0 0 0 2rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid rgba(0, 0, 0, 0.4)",
                                                    marginBottom: "1rem",
                                                }}
                                                placeholder='Quét mã trên Zebra  '>
                                                {" "}
                                            </TextBox>

                                            <p>Mã máy</p>
                                            <TextBox
                                                disabled
                                                style={{
                                                    background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                                    width: "90%",
                                                    padding: "0 0 0 2rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid rgba(0, 0, 0, 0.4)",
                                                    marginBottom: "1rem",
                                                }}
                                                placeholder='Quét mã trên Zebra  '>
                                                {" "}
                                            </TextBox>
                                        </div>
                                        <div className='col-4' style={{ width: "47%", margin: "0.2rem" }}>
                                            <p>Mã công nhân</p>
                                            <TextBox
                                                disabled
                                                style={{
                                                    background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                                    width: "90%",
                                                    padding: "0 0 0 2rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid rgba(0, 0, 0, 0.4)",
                                                    marginBottom: "1rem",
                                                }}
                                                placeholder='Quét mã trên Zebra  '>
                                                {" "}
                                            </TextBox>

                                            <p>Mã lô NVL/BTP</p>
                                            <TextBox
                                                disabled
                                                style={{
                                                    background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                                    width: "90%",
                                                    padding: "0 0 0 2rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid rgba(0, 0, 0, 0.4)",
                                                    marginBottom: "1rem",
                                                }}
                                                placeholder='Quét mã trên Zebra  '>
                                                {" "}
                                            </TextBox>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row-reverse", padding: "1rem" }}>
                                        <Button
                                            style={{ backgroundColor: "rgba(255, 122, 0, 1)", color: "#fff" }}
                                            text={"Khai báo thông tin sản xuất"}
                                            height={35}
                                            width={250}
                                            onClick={handleChangeScreen}
                                        />
                                    </div>
                                </div>
                                <div className='col-4' style={{ width: windowWidth < 600 ? "100%" : "22%", margin: "0 1rem 1rem 0" }}>
                                    <p>Mã SO</p>
                                    <TextBox
                                        value={dataSelected[0].so_id}
                                        style={{ backgroundColor: "#CCC" }}
                                        disabled
                                    ></TextBox>
                                </div>
                                <div className='col-4' style={{ width: windowWidth < 600 ? "100%" : "22%", margin: "0 1rem 1rem 0" }}>
                                    <p>Tên công đoạn</p>
                                    <SelectBox placeholder='-- Chọn tên công đoạn --' items={stage_name} />
                                </div>
                                <div className='col-4' style={{ width: windowWidth < 600 ? "100%" : "22%", margin: "0 1rem 1rem 0" }}>
                                    <p>Tên Job</p>
                                    <SelectBox placeholder='-- Chọn job --' items={job_name} />
                                </div>
                            </div>

                            <div
                                className='content'
                                style={{
                                    display: windowWidth < 600 ? "none" : "flex",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    justifyContent: "space-between",
                                    margin: ".5rem",
                                    padding: "1rem 0.3rem",
                                    borderRadius: "4px",
                                }}>
                                <div className='col-4' style={{ width: "47%", margin: "0.2rem" }}>
                                    <p>Mã sản xuất</p>
                                    <TextBox
                                        disabled
                                        style={{
                                            background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                            width: "70%",
                                            padding: "0 0 0 2rem",
                                            borderRadius: "4px",
                                            border: "1px solid rgba(0, 0, 0, 0.4)",
                                            marginBottom: "1rem",
                                        }}
                                        placeholder='Quét mã trên ứng dụng mobile  '>
                                        {" "}
                                    </TextBox>

                                    <p>Mã máy</p>
                                    <TextBox
                                        disabled
                                        style={{
                                            background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                            width: "70%",
                                            padding: "0 0 0 2rem",
                                            borderRadius: "4px",
                                            border: "1px solid rgba(0, 0, 0, 0.4)",
                                            marginBottom: "1rem",
                                        }}
                                        placeholder='Quét mã trên ứng dụng mobile  '>
                                        {" "}
                                    </TextBox>
                                </div>
                                <div className='col-4' style={{ width: "47%", margin: "0.2rem" }}>
                                    <p>Mã công nhân</p>
                                    <TextBox
                                        disabled
                                        style={{
                                            background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                            width: "70%",
                                            padding: "0 0 0 2rem",
                                            borderRadius: "4px",
                                            border: "1px solid rgba(0, 0, 0, 0.4)",
                                            marginBottom: "1rem",
                                        }}
                                        placeholder='Quét mã trên ứng dụng mobile  '>
                                        {" "}
                                    </TextBox>

                                    <p>Mã lô NVL/BTP</p>
                                    <TextBox
                                        disabled
                                        style={{
                                            background: `url(${qrTextbox}) no-repeat scroll 5px 4px`,
                                            width: "70%",
                                            padding: "0 0 0 2rem",
                                            borderRadius: "4px",
                                            border: "1px solid rgba(0, 0, 0, 0.4)",
                                            marginBottom: "1rem",
                                        }}
                                        placeholder='Quét mã trên ứng dụng mobile  '>
                                        {" "}
                                    </TextBox>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row-reverse", padding: "1rem" }}>
                                <Button
                                    style={{ backgroundColor: "rgba(255, 122, 0, 1)", color: "#fff" }}
                                    text={windowWidth < 600 ? "Quét Qr" : "Khai báo thông tin sản xuất"}
                                    height={35}
                                    width={250}
                                    onClick={handleChangeScreen}
                                />
                            </div>
                            <div
                                className='informer'
                                style={{
                                    backgroundColor: "#ffffff",
                                    paddingLeft: 13,
                                }}></div>
                        </div>
                    </div>
                    <div
                        className='informer'
                        style={{
                            backgroundColor: "#ffffff",
                            paddingLeft: 13,
                        }}></div>
                </div>
            )}
        </>
    );
};

export default DeclareProductionObject;
