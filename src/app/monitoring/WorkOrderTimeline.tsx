import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import Scheduler, { Resource, View, Scrolling } from "devextreme-react/scheduler";
import { collection, instance } from "@haulmont/jmix-react-core";
import { PlanningWorkOrderAssignment } from "../../jmix/entities/PlanningWorkOrderAssignment";
import { observer } from "mobx-react";
import { Line } from "../../jmix/entities/Line";
import { WorkOrderTooltip } from "./helper/WorkOrderTooltip";
import { WOTemplate } from "./helper/WOTemplate";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { StateEnum } from "../../jmix/enums/enums";
import RadioGroup from "devextreme-react/radio-group";
import notify from "devextreme/ui/notify";
import { confirm } from "devextreme/ui/dialog";
import { Coitt } from "../../jmix/entities/Coitt";
import SelectBox from "devextreme-react/select-box";
import Form, { SimpleItem, GroupItem, Label } from "devextreme-react/form";
import TagBox from "devextreme-react/tag-box";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./monitoring.css";
import { Button } from "devextreme-react/button";

const { Panel } = Collapse;
const ROUTING_PATH = "/workOrderTimeline";
const groups = ["line"];
const currentDate = new Date();
const views: Array<any> = ["timelineMonth", "month"];
const colorsGroup = ["Dây chuyền", "Trạng thái"];

@observer
class WorkOrderTimelineComponent extends React.Component<{}, { radioGroupValue; render; lineArrays: any[] }> {
    lineFullArrays: any[];
    productFullArrays: any[];
    workOrderCollection = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        sort: "woId",

        loadImmediately: false,
    });
    instanceDs = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    lineDatasource = collection<Line>(Line.NAME, {
        view: "_base",
        sort: "lineName",
        loadImmediately: false,
    });
    coittDatasource = collection<Coitt>(Coitt.NAME, {
        view: "_base",
        sort: "uPronam",
        loadImmediately: false,
        limit: 10,
    });
    stateList = [
        {
            id: "NEW",
            text: "Tạo mới",
            color: "#0984e3",
        },
        {
            id: "WAITING",
            text: "Đợi NVL",
            color: "#81ecec",
        },
        {
            id: "SEND_SCADA_OK",
            text: "Đã gửi sang SCADA",
            color: "#fab1a0",
        },
        {
            id: "COMPLETE",
            text: "Hoàn thành",
            color: "#7b49d3",
        },
    ];
    workOrderLineArrays: {}[] = [];

    constructor(props) {
        super(props);
        this.state = {
            radioGroupValue: colorsGroup[0],
            render: false,
            lineArrays: [],
        };
        this.lineFullArrays = [];
        this.productFullArrays = [];
        this.onRadioGroupValueChanged = this.onRadioGroupValueChanged.bind(this);
        this.onAppointmentUpdated = this.onAppointmentUpdated.bind(this);
        this.groupChanged = this.groupChanged.bind(this);
        this.groupProductNameChanged = this.groupProductNameChanged.bind(this);
    }

    async componentDidMount() {
        this.lineDatasource.filter = null;
        let tmp: any[] = [];
        await this.lineDatasource.load().then((res) => {
            this.lineFullArrays = [];
            this.lineDatasource.items.map((item) => {
                let { lineName, lineCode } = item;
                if (lineName) {
                    this.lineFullArrays.push({ id: lineName, text: lineName });
                }
                if (lineCode && lineName) {
                    tmp.push({ id: lineCode, lineName: lineName });
                }
            });
            this.setState({ lineArrays: tmp });
        });

        this.workOrderCollection.filter = {
            conditions: [
                { property: "workOrderType", operator: "=", value: "LINE" },
                { property: "startTime", operator: "notEmpty", value: "" },
                { property: "endTime", operator: "notEmpty", value: "" },
            ],
        };

        await this.workOrderCollection.load().then((res) => {
            this.productFullArrays = [];
            this.workOrderCollection.items.map((item) => {
                let { productCode, productName } = item;
                if (productCode && productName) {
                    if (
                        !this.productFullArrays.find((item) => {
                            return item.uProno === productCode;
                        })
                    ) {
                        this.productFullArrays.push({ uProno: productCode, uPronam: productName });
                    }
                }
            });

            this.lineDatasource.load().then((res) => {
                this.lineFullArrays = [];
                this.lineDatasource.items.map((item) => {
                    let { lineName } = item;
                    if (lineName) {
                        this.lineFullArrays.push({ id: lineName, text: lineName });
                    }
                });
            });
        });
    }

    render() {
        // if (this.workOrderCollection.status === 'LOADING') return <div>Loading ...</div>;
        // console.log(this.workOrderCollection.items)
        this.workOrderLineArrays = [];
        this.workOrderCollection.items.map((item) => {
            this.workOrderLineArrays.push({
                id: item.id,
                text: item.productName,
                line: item.line,
                startTime: item.startTime,
                endTime: item.endTime,
                state: item.state,
                woId: item.woId,
                productOrder: item.productOrder,
            });
        });
        return (
            <React.Fragment>
                <div className='options'>
                    <strong>Lựa chọn</strong>
                    <Button className={"collap_button"} stylingMode={"text"} icon={"chevrondown"} onClick={this.collapseBtn}></Button>
                    <Form colCount={2} className={"collapsible"}>
                        <SimpleItem dataField={"Lựa chọn dây chuyền"}>
                            <TagBox
                                dataSource={this.lineFullArrays}
                                className={"combobox-grouping"}
                                displayExpr='text'
                                valueExpr='id'
                                showSelectionControls={true}
                                maxDisplayedTags={3}
                                showMultiTagOnly={false}
                                applyValueMode='useButtons'
                                searchEnabled={true}
                                onValueChanged={this.groupChanged}
                                width={"90%"}
                                placeholder={"-- Lựa chọn --"}
                            />
                            {/*<SelectBox*/}
                            {/*  width="225"*/}
                            {/*  showClearButton={true}*/}
                            {/*  items={this.lineFullArrays}*/}

                            {/*  displayExpr="text"*/}
                            {/*  valueExpr="id"*/}
                            {/*  className={"combobox-grouping"}*/}
                            {/*  searchEnabled={true}*/}
                            {/*  onValueChanged={this.groupChanged}*/}
                            {/*/>*/}
                        </SimpleItem>
                        <SimpleItem dataField={"Lựa chọn sản phẩm"}>
                            <TagBox
                                dataSource={this.productFullArrays}
                                className={"combobox-grouping"}
                                displayExpr='uPronam'
                                valueExpr='uProno'
                                showSelectionControls={true}
                                maxDisplayedTags={3}
                                showMultiTagOnly={false}
                                applyValueMode='useButtons'
                                searchEnabled={true}
                                onValueChanged={this.groupProductNameChanged}
                                width={"90%"}
                                placeholder={"-- Lựa chọn --"}
                            />
                        </SimpleItem>
                        <SimpleItem dataField={"Sử dụng màu sắc"}>
                            <div className='option'>
                                <RadioGroup
                                    items={colorsGroup}
                                    value={this.state.radioGroupValue}
                                    layout='horizontal'
                                    onValueChanged={this.onRadioGroupValueChanged}
                                />
                            </div>
                        </SimpleItem>
                    </Form>
                </div>
                <Scheduler
                    timeZone='Asia/Ho_Chi_Minh'
                    /*@ts-ignore*/
                    dataSource={this.workOrderCollection.items}
                    views={views}
                    defaultCurrentDate={currentDate}
                    currentDate={currentDate}
                    height={1000}
                    // crossScrollingEnabled={true}
                    // width={"100%"}
                    maxAppointmentsPerCell={"unlimited"}
                    groups={groups}
                    defaultCurrentView='timelineMonth'
                    // cellDuration={60}
                    textExpr={"productName"}
                    startDateExpr={"startTime"}
                    endDateExpr={"endTime"}
                    // onCurrentViewChange={valie => console.log(valie)}
                    appointmentTooltipComponent={WorkOrderTooltip}
                    appointmentComponent={WOTemplate}
                    onAppointmentUpdated={this.onAppointmentUpdated}
                    showAllDayPanel={false}>
                    <View name='Vertical Grouping' type='timelineMonth' groupOrientation='vertical' />
                    <View type='month' groupOrientation='horizontal' />
                    <Resource
                        fieldExpr='line'
                        allowMultiple={false}
                        dataSource={this.state.lineArrays}
                        label='Line'
                        displayExpr={"lineName"}
                        useColorAsDefault={this.state.radioGroupValue === "Dây chuyền"}
                    />
                    <Resource
                        fieldExpr='state'
                        allowMultiple={false}
                        dataSource={this.stateList}
                        label='State'
                        useColorAsDefault={this.state.radioGroupValue === "Trạng thái"}
                    />
                    <Scrolling mode='virtual' />
                </Scheduler>
            </React.Fragment>
        );
    }

    groupChanged(e) {
        const lineName = e.value;
        if (lineName && lineName.length > 0) {
            this.lineDatasource.filter = {
                conditions: [{ property: "lineName", operator: "in", value: lineName }],
            };
        } else {
            this.lineDatasource.filter = null;
        }

        this.lineDatasource.load().then((res) => {
            // this.setState((previewState, props) => ({
            //   radioGroupValue: previewState.radioGroupValue,
            //   render: true
            // }))
        });
    }

    groupProductNameChanged(e) {
        const productCode = e.value;

        if (productCode && productCode.length > 0) {
            this.workOrderCollection.filter = {
                conditions: [
                    { property: "productCode", operator: "=", value: productCode },
                    { property: "workOrderType", operator: "=", value: "LINE" },
                    { property: "startTime", operator: "notEmpty", value: "" },
                    { property: "endTime", operator: "notEmpty", value: "" },
                ],
            };
        } else {
            this.workOrderCollection.filter = null;
        }

        this.workOrderCollection.load().then((res) => {});
    }

    onRadioGroupValueChanged(args) {
        this.setState({
            radioGroupValue: args.value,
        });
    }

    onAppointmentUpdated(e) {
        // console.log('onAppointmentUpdated')
        // console.log(e.appointmentData)
        let result = confirm(
            "<i>Bạn muốn cập nhật dữ liệu của Work Order " + e.appointmentData.woId + " không?</i>",
            e.appointmentData.woId,
        );
        result.then((dialogResult) => {
            if (dialogResult) {
                this.instanceDs.setItem(e.appointmentData);
                this.instanceDs.commit().then((res) => {
                    notify(
                        {
                            message: "Cập nhật thành công!",
                            width: 450,
                        },
                        "SUCCESS",
                        3000,
                    );
                });
            }
        });
    }

    collapseBtn() {
        let content = document.getElementsByClassName("options");
        if (content) {
            // @ts-ignore
            content.item(0).classList.toggle("hidden");
        }
        let button = document.getElementsByClassName("collap_button");
        if (button) {
            // @ts-ignore
            button.item(0).classList.toggle("collap_button_active");
        }
    }
}

export const WorkOrderTimeline = () => (
    <>
        <WorkOrderTimelineComponent />
    </>
);

registerScreen({
    component: WorkOrderTimeline,
    caption: "screen.WorkOrderTimeline",
    screenId: "WorkOrderTimeline",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
