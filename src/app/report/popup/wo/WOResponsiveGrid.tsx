import ResponsiveBox, { Row, Col, Item, Location } from "devextreme-react/responsive-box";
import React, { useEffect, useState } from "react";
import { useMainStore } from "@haulmont/jmix-react-core";
import WOChartReportServices from "../../../services/WOChartReportServices";
import { WODetailBarChart } from "../../chart/wo/WODetailBarChart";
import { WOCompletePercentBarChart } from "../../chart/wo/WOCompletePercentBarChart";
import { WODetailGroupByBranchBarChart } from "../../chart/wo/WODetailGroupByBranchBarChart";
import { WOCompletePercentGroupByBranchBarChart } from "../../chart/wo/WOCompletePercentGroupByBranchBarChart";
import { WOCompletePercentGroupByGroupBarChart } from "../../chart/wo/WOCompletePercentGroupByGroupBarChart";
import { WODetailGroupByStatusBarChart } from "../../chart/wo/WODetailGroupByStatusBarChart";
import { WODetailGroupByProductBarChart } from "../../chart/wo/WODetailGroupByProductBarChart";
import WODetailGroupByStatusPieChart from "../../chart/wo/WODetailGroupByStatusPieChart";
import WODetailGroupByReasonBarChart from "../../chart/wo/WODetailGroupByReasonBarChart";

const screen = (width) => {
    return width < 900 ? "sm" : "lg";
};

export const WOResponsiveGrid = (props: any) => {
    const mainStore = useMainStore();
    const [data, setData] = useState<any[]>([]);
    const [dataGroupByBranch, setDataGroupByBranch] = useState<any[]>([]);
    const [dataGroupByGroupCode, setDataGroupByGroupCode] = useState<any[]>([]);
    const [dataGroupByProduct, setDataGroupByProduct] = useState<any[]>([]);
    const [dataGroupByStatus, setDataGroupByStatus] = useState<any[]>([]);
    const [dataParentGroupByStatus, setDataParentGroupByStatus] = useState<any[]>([]);
    const [dataGroupByReason, setDataGroupByReason] = useState<any[]>([]);

    const loadData = () => {
        WOChartReportServices.getWODetailDataGroupByBranch(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByBranch(res.data);
            }
        });

        WOChartReportServices.getWODetailDataGroupByGroupCode(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByGroupCode(res.data);
            }
        });

        WOChartReportServices.getWODetailDataGroupByProduct(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByProduct(res.data);
            }
        });

        WOChartReportServices.getWODetailDataGroupByStatus(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByStatus(res.data);
            }
        });

        WOChartReportServices.getWOParentDetailDataGroupByStatus(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataParentGroupByStatus(res.data);
            }
        });

        WOChartReportServices.getWODetailDataGroupByReason(mainStore.authToken).then((res) => {
            if (res && res.status == 200) {
                setDataGroupByReason(res.data);
            }
        });
    };
    useEffect(() => {
        if (props.popupVisible) {
            loadData();
        }
    }, [props]);
    return (
        <div id='page'>
            <ResponsiveBox singleColumnScreen='sm' screenByWidth={screen}>
                <Row ratio={1}></Row>
                <Row ratio={2}></Row>
                <Row ratio={1}></Row>
                <Row ratio={1}></Row>

                <Col ratio={1}></Col>
                <Col ratio={1}></Col>
                <Item>
                    <Location row={0} col={0} screen='lg'></Location>
                    <Location row={0} col={0} screen='sm'></Location>
                    <div>
                        <WODetailGroupByBranchBarChart data={dataGroupByBranch} />
                    </div>
                </Item>
                <Item>
                    <Location row={0} col={1} screen='lg'></Location>
                    <Location row={1} col={0} colspan={2} screen='sm'></Location>
                    <div className='footer item'>
                        <WOCompletePercentGroupByBranchBarChart data={dataGroupByBranch} />
                    </div>
                </Item>
                {/*<Item>*/}
                {/*  <Location row={1} col={0} screen="lg"></Location>*/}
                {/*  <Location row={2} col={0} screen="sm"></Location>*/}
                {/*  <div className="left-side-bar item">*/}
                {/*    <WOCompletePercentGroupByGroupBarChart data = {dataGroupByGroupCode}/>*/}
                {/*  </div>*/}
                {/*</Item>*/}
                {/*<Item>*/}
                {/*  <Location row={1} col={1} screen="lg"></Location>*/}
                {/*  <Location row={2} col={1} screen="sm"></Location>*/}
                {/*  <div className="right-side-bar item">*/}
                {/*    <WODetailGroupByStatusBarChart data = {dataGroupByBranch}/>*/}
                {/*  </div>*/}
                {/*</Item>*/}
                <Item>
                    <Location row={1} col={0} screen='lg'></Location>
                    <Location row={2} col={0} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <WOCompletePercentGroupByGroupBarChart data={dataGroupByGroupCode} />
                    </div>
                </Item>
                <Item>
                    <Location row={1} col={1} screen='lg'></Location>
                    <Location row={3} col={0} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <WODetailGroupByStatusBarChart data={dataParentGroupByStatus} parentData={dataParentGroupByStatus} />
                    </div>
                </Item>
                <Item>
                    <Location row={2} col={0} screen='lg'></Location>
                    <Location row={4} col={0} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <WODetailGroupByStatusPieChart data={dataGroupByStatus} />
                    </div>
                </Item>
                <Item>
                    <Location row={2} col={1} screen='lg'></Location>
                    <Location row={4} col={0} screen='sm'></Location>
                    <div className='right-side-bar item'>
                        <WODetailGroupByReasonBarChart data={dataGroupByReason} />
                    </div>
                </Item>
                <Item>
                    <Location row={3} col={0} colspan={3} screen='lg'></Location>
                    <Location row={4} col={0} colspan={2} screen='sm'></Location>
                    <div className='footer item'>
                        <WODetailGroupByProductBarChart data={dataGroupByProduct} />
                    </div>
                </Item>
            </ResponsiveBox>
        </div>
    );
};
