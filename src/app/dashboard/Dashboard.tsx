import React, { useEffect, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import WOBranchChart from "../chart/WOBranchChart";
import { ResponsiveGrid } from "./ResponsiveGrid";
import ResponsiveBox, { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import { PODetailBarChart } from "../report/chart/PODetailBarChart";
import { POCompletePercentBarChart } from "../report/chart/POCompletePercentBarChart";
import { PODetailGroupByBranchBarChart } from "../report/chart/PODetailGroupByBranchBarChart";
import { POCompletePercentGroupByBranchBarChart } from "../report/chart/POCompletePercentGroupByBranchBarChart";
import { PODetailGroupByGroupBarChart } from "../report/chart/PODetailGroupByGroupBarChart";
import { PODetailGroupByReasonBarChart } from "../report/chart/PODetailGroupByReasonBarChart";
import { POGroupByStatusPieChart } from "../report/chart/POGroupByStatusPieChart";
import { POItemQuantityReport } from "../report/chart/POItemQuantityReport";
import { POGroupByStatusReasonBarChart } from "../report/chart/POGroupByStatusReasonBarChart";
import { PODetailGroupByProductBarChart } from "../report/chart/PODetailGroupByProductBarChart";
import { DashboardPOStatus } from "./chart/DashboardPOStatus";
import { DashBoardPOReason } from "./chart/DashBoardPOReason";
import { DateBox, Popup, SelectBox, TextBox } from "devextreme-react";
import { DashboardWOGroupByBranch } from "./chart/DashboardWOGroupByBranch";
import { DashboardWOCompletePercentGroupByGroup } from "./chart/DashboardWOCompletePercentGroupByGroup";
import { DashboardPOGroupByBranch } from "./chart/DashboardPOGroupByBranch";
import { DashboardPOCompletePercentGroupByBranch } from "./chart/DashboardPOCompletePercentGroupByBranch";
import ChartReportServices from "../services/ChartReportServices";
import { useMainStore } from "@haulmont/jmix-react-core";
import WOChartReportServices from "../services/WOChartReportServices";
import { DashboardWOQuantityOut } from "./chart/DashboardWOQuantityOut";
import { DashboardPOGroupByBranchTpBtp } from "./chart/DashboardPOGroupByBranchTpBtp";
import { DashboardPOReasonPiechart } from "./chart/DashboardPOReasonPiechart";
import { DashboardPOQuantityOutGaugeChart } from "./chart/DashboardPOQuantityOutGaugeChart";
import { Button } from "devextreme-react/button";
import { PopupConfigDashboard } from "./PopupConfigDashboard";
import { DashboardPOQuantityGroupById } from "./chart/DashboardPOQuantityGroupById";

const ROUTING_PATH = "/dashboard";
const screen = (width) => {
    return width < 900 ? "sm" : "lg";
};
const simpleProducts = ["HD Video Player", "SuperHD Video Player", "SuperPlasma 50", "SuperLED 50", "SuperLED 42"];

export const Dashboard = () => {
    const mainStore = useMainStore();
    const [branchList, setBranchList] = useState<any[]>([]);
    const [dataPOReason, setDataPOReason] = useState<any[]>([]);
    const [dataPOStatus, setDataPOStatus] = useState<any[]>([]);
    const [dataWOCompletePercent, setDataWOCompletePercent] = useState<any[]>([]);
    const [dataWOGroupByBranch, setDataWOGroupByBranch] = useState<any[]>([]);
    const [dataPOCompletePercent, setDataPOCompletePercent] = useState<any[]>([]);
    const [dataPOGroupByBranch, setDataPOGroupByBranch] = useState<any[]>([]);
    const [dataWOGroupByGroup, setDataWOGroupByGroup] = useState<any[]>([]);
    const [dataPOGroupByTpBtp, setDataPOGroupByTpBtp] = useState<any[]>([]);
    const [dataQuantityTp, setDataQuantityTp] = useState<any[]>([]);
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const [popupVisible, setPopupVisible] = useState(false);
    const [quantityTarget, setQuantityTarget] = useState<any>();
    const [quantityByBranch, setQuantityByBranch] = useState<any[]>([]);
    const [dataPOGroupByPoId, setDataPOGroupByPoId] = useState<any[]>([]);

    const [filterData, setFilterData] = useState<any>({
        startTime: "2023-01-01",
        endTime: "2024-01-01",
        // endTime: new Date(),
        productOrder: "",
        groupCode: "",
    });

    const onchangeValue = (name, value) => {
        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            [name]: value,
        }));
    };
    useEffect(() => {
        loadData();
    }, [filterData]);

    useEffect(() => {
        console.log(quantityTarget);
    }, [quantityTarget]);

    useEffect(() => {
        ChartReportServices.getAllBranch(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                setBranchList(res.data);
            }
        });
    }, []);
    useEffect(() => {
        let tmp: any[] = [];
        for (let i = 0; i < branchList.length; i++) {
            let obj = {
                branch: branchList[i],
                target: 0,
                capacity: 0,
            };
            tmp.push(obj);
        }
        console.log(tmp);
        setQuantityByBranch(tmp);
    }, [branchList]);

    const loadData = () => {
        ChartReportServices.getPoGroupByBranchDashboard(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                console.log(res);
                setDataPOGroupByBranch(res.data);
            }
        });
        WOChartReportServices.getWODetailDataGroupByBranchDashboard(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                setDataWOGroupByBranch(res.data);
            }
        });
        ChartReportServices.getPoGroupByStatusDashboard(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                console.log(res);
                setDataPOStatus(res.data);
            }
        });
        ChartReportServices.getPoGroupByReasonDashboard(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                console.log(res);
                setDataPOReason(res.data);
            }
        });
        WOChartReportServices.getWODetailDataGroupByGroupCodeDashboard(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                setDataWOGroupByGroup(res.data);
            }
        });

        ChartReportServices.getPoGroupByBranchTPBTPDashboard(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                console.log(res);
                setDataPOGroupByTpBtp(res.data);
            }
        });
        ChartReportServices.getPoGroupByTp(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                console.log(res);
                setDataQuantityTp(res.data);
            }
        });

        ChartReportServices.getPoGroupByPoId(mainStore.authToken, filterData).then((res) => {
            if (res && res.status == 200) {
                setDataPOGroupByPoId(res.data);
            }
        });
    };
    const hideInfo = () => {
        setPopupVisible(false);
    };

    const showInfo = () => {
        setPopupVisible(true);
    };

    return (
        <>
            <div
                className='text'
                style={{
                    color: "#03a9f4",
                    fontWeight: "400",
                    fontSize: "20px",
                    paddingBottom: "30px",
                    display: "flex",
                    justifyContent: "center",
                }}>
                Dashboard - Planning
            </div>
            {/*<div><WOBranchChart/></div>*/}
            <div className='my-grid-container'>
                <div className='my-large-column'>
                    <div className='my-grid-item'>
                        <div>
                            <h5>Thời gian bắt đầu</h5>
                        </div>
                        <div>
                            <DateBox
                                defaultValue={new Date()}
                                value={filterData.startTime}
                                onValueChanged={(e) => onchangeValue("startTime", e.value)}
                                // inputAttr={dateTimeLabel}
                                type='datetime'
                            />
                        </div>
                    </div>
                    <div className='my-grid-item'>
                        <div>
                            <h5>Thời gian kết thúc</h5>
                        </div>
                        <div>
                            <DateBox
                                defaultValue={new Date()}
                                value={filterData.endTime}
                                onValueChanged={(e) => onchangeValue("endTime", e.value)}
                                // inputAttr={dateTimeLabel}
                                type='datetime'
                            />
                        </div>
                    </div>
                    <div className='my-grid-item'>
                        <div>
                            <h5>Chọn mã đơn hàng</h5>
                        </div>
                        <div>
                            <TextBox
                                placeholder='Chọn mã đơn hàng...'
                                value={filterData.productOrder}
                                onValueChanged={(e) => onchangeValue("productOrder", e.value)}
                            />
                        </div>
                    </div>
                    <div className='my-grid-item'>
                        <div>
                            <h5>Chọn bộ phận sản xuất</h5>
                        </div>
                        <div>
                            <SelectBox
                                items={branchList}
                                placeholder='Chọn bộ phận sx'
                                value={filterData.groupCode}
                                onValueChanged={(e) => onchangeValue("groupCode", e.value)}
                                // inputAttr={productWithPlaceholderLabel}
                                showClearButton={true}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-grid-item button-config'>
                    <Button icon='check' type='success' text='Config' onClick={showInfo} />
                </div>
            </div>
            <div className='my-grid-container'>
                <h5>Tổng số đơn hàng yêu cầu sản xuất</h5>
            </div>
            <div id='page'>
                <Popup
                    visible={popupVisible}
                    onHiding={hideInfo}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title='Config dashboard'
                    // container=".dx-viewport"
                    width={"60%"}
                    height={"auto"}
                    // contentRender={renderPopupImport}
                >
                    <PopupConfigDashboard
                        quantityGroupByBranch={quantityByBranch}
                        quantityTarget={quantityTarget}
                        setQuantityGroupByBranch={setQuantityByBranch}
                        setQuantityTarget={setQuantityTarget}
                        branchList={branchList}
                        hidePopup={hideInfo}
                    />
                </Popup>
                <div className='grid-container'>
                    <div className='grid-item'>
                        <DashboardPOQuantityOutGaugeChart data={dataQuantityTp} maxValue={quantityTarget} />
                    </div>
                    <div className='grid-item'>
                        <DashboardPOGroupByBranch data={dataPOGroupByBranch} groupBranchArray={quantityByBranch} />
                    </div>
                    <div className='grid-item'>
                        <DashboardWOQuantityOut data={dataWOGroupByBranch} />
                    </div>

                    <div className='grid-item'>
                        <DashboardPOStatus data={dataPOStatus} />
                    </div>
                    <div className='grid-item'>
                        <DashboardPOCompletePercentGroupByBranch data={dataPOGroupByBranch} />
                    </div>
                    <div className='grid-item'>
                        <DashboardWOGroupByBranch data={dataWOGroupByBranch} />
                    </div>

                    <div className='grid-item'>
                        <DashboardPOGroupByBranchTpBtp data={dataPOGroupByTpBtp} />
                    </div>
                    <div className='grid-item'>
                        <DashBoardPOReason data={dataPOReason} />
                    </div>
                    <div className='grid-item'>
                        <DashboardPOQuantityGroupById data={dataPOGroupByPoId} />
                    </div>

                    <div className='grid-item'>Biểu đồ 10</div>
                    <div className='grid-item'>
                        <DashboardPOReasonPiechart data={dataPOReason} />
                    </div>
                    <div className='grid-item'>
                        <DashboardWOCompletePercentGroupByGroup data={dataWOGroupByGroup} />
                    </div>
                </div>
            </div>
            {/*<div><ResponsiveGrid/></div>*/}
        </>
    );
};
registerScreen({
    component: Dashboard,
    caption: "screen.Dashboard",
    screenId: "Dashboard",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
