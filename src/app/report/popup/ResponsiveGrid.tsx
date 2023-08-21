import ResponsiveBox, { Row, Col, Item, Location } from "devextreme-react/responsive-box";
import React, { useEffect, useState } from "react";
import { PODetailBarChart } from "../chart/PODetailBarChart";
import { useMainStore } from "@haulmont/jmix-react-core";
import { PODetailGroupByBranchBarChart } from "../chart/PODetailGroupByBranchBarChart";
import ChartReportServices from "../../services/ChartReportServices";
import { POItemQuantityReport } from "../chart/POItemQuantityReport";
import { POCompletePercentBarChart } from "../chart/POCompletePercentBarChart";
import { POCompletePercentGroupByBranchBarChart } from "../chart/POCompletePercentGroupByBranchBarChart";
import { POGroupByStatusPieChart } from "../chart/POGroupByStatusPieChart";
import { PODetailGroupByProductBarChart } from "../chart/PODetailGroupByProductBarChart";
import { PODetailGroupByGroupBarChart } from "../chart/PODetailGroupByGroupBarChart";
import { PODetailGroupByReasonBarChart } from "../chart/PODetailGroupByReasonBarChart";
import { POGroupByStatusReasonBarChart } from "../chart/POGroupByStatusReasonBarChart";
import { POAssessAccuracyPlan } from "../chart/POAssessAccuracyPlan";

const screen = (width) => {
    return width < 900 ? "sm" : "lg";
};

export const ResponsiveGrid = (props: any) => {
    const mainStore = useMainStore();
    const [dataPOItemQuantity, setDataPOItemQuantity] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [dataGroupByBranch, setDataGroupByBranch] = useState<any[]>([]);
    const [dataGroupByGroupCode, setDataGroupByGroupCode] = useState<any[]>([]);
    const [dataGroupByProduct, setDataGroupByProduct] = useState<any[]>([]);
    const [dataGroupByReason, setDataGroupByReason] = useState<any[]>([]);
    const [dataGroupByStatus, setDataGroupByStatus] = useState<any[]>([]);

    useEffect(() => {
        if (props.popupVisible) {
            loadData();
        }
    }, [props]);

    const loadData = () => {
        ChartReportServices.getPoDetailData(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setData(res.data);
            }
        });

        ChartReportServices.getPoDetailDataGroupByBranch(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByBranch(res.data);
            }
        });

        ChartReportServices.getPoDetailDataGroupByGroupCode(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByGroupCode(res.data);
            }
        });

        ChartReportServices.getPoDetailDataGroupByProduct(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByProduct(res.data);
            }
        });

        ChartReportServices.getPoDetailDataGroupByReason(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByReason(res.data);
            }
        });
        ChartReportServices.getPOItemEditedReport(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataPOItemQuantity(res.data);
            }
        });

        ChartReportServices.getPoDetailDataGroupByStatus(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                console.log(res);
                setDataGroupByStatus(res.data);
            }
        });
    };
    return (
        <div id='page'>
            <ResponsiveBox singleColumnScreen='sm' screenByWidth={screen}>
                <Row ratio={1}></Row>
                <Row ratio={2}></Row>
                <Row ratio={1}></Row>
                <Row ratio={1}></Row>
                <Row ratio={1}></Row>
                <Row ratio={1}></Row>

                <Col ratio={1}></Col>
                <Col ratio={1}></Col>

                <Item>
                    <Location row={0} col={0} screen='lg'></Location>
                    <Location row={0} col={0} screen='sm'></Location>
                    <div>
                        <PODetailBarChart data={data} />
                    </div>
                </Item>
                <Item>
                    <Location row={0} col={1} screen='lg'></Location>
                    <Location row={1} col={0} colspan={2} screen='sm'></Location>
                    <div className='footer item'>
                        <POCompletePercentBarChart data={data} />
                    </div>
                </Item>
                <Item>
                    <Location row={1} col={0} screen='lg'></Location>
                    <Location row={2} col={0} screen='sm'></Location>
                    <div className='left-side-bar item'>
                        <PODetailGroupByBranchBarChart data={dataGroupByBranch} />
                    </div>
                </Item>
                <Item>
                    <Location row={1} col={1} screen='lg'></Location>
                    <Location row={2} col={1} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <POCompletePercentGroupByBranchBarChart data={dataGroupByBranch} />
                    </div>
                </Item>
                <Item>
                    <Location row={2} col={0} screen='lg'></Location>
                    <Location row={3} col={0} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <PODetailGroupByGroupBarChart data={dataGroupByGroupCode} />
                    </div>
                </Item>
                <Item>
                    <Location row={2} col={1} screen='lg'></Location>
                    <Location row={2} col={1} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <PODetailGroupByReasonBarChart data={dataGroupByReason} />
                    </div>
                </Item>

                <Item>
                    <Location row={3} col={0} screen='lg'></Location>
                    <Location row={3} col={1} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <POGroupByStatusPieChart data={dataGroupByStatus} />
                    </div>
                </Item>
                <Item>
                    <Location row={3} col={0} screen='lg'></Location>
                    <Location row={3} col={0} screen='sm'></Location>
                    <div className='footer item'>
                        <POItemQuantityReport data={dataPOItemQuantity} />
                    </div>
                </Item>
                <Item>
                    <Location row={3} col={1} colspan={3} screen='lg'></Location>
                    <Location row={3} col={1} colspan={2} screen='sm'></Location>
                    <Location row={3} col={1} screen='lg'></Location>
                    <Location row={3} col={0} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <POGroupByStatusReasonBarChart data={dataGroupByReason} />
                    </div>
                </Item>

                <Item>
                    <Location row={4} col={0} colspan={3} screen='lg'></Location>
                    <Location row={3} col={1} colspan={2} screen='sm'></Location>
                    <div className='footer item'>
                        <POItemQuantityReport data={dataPOItemQuantity} />
                    </div>
                </Item>

                <Item>
                    <Location row={5} col={0} colspan={3} screen='lg'></Location>
                    <Location row={4} col={0} colspan={2} screen='sm'></Location>
                    <div className='footer item'>
                        <PODetailGroupByProductBarChart data={dataGroupByProduct} />
                    </div>
                </Item>
            </ResponsiveBox>
        </div>
    );
};
