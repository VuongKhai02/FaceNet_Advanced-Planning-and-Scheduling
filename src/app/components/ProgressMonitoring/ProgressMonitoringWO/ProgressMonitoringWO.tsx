import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import Scheduler, { Resource, View, Scrolling } from 'devextreme-react/scheduler';
import Form, {
    SimpleItem,
} from 'devextreme-react/form';
import TagBox from 'devextreme-react/tag-box';
import "./ProgressMonitoringWO.css"
import { Button } from "devextreme-react/button";
import { DateBox, SelectBox } from "devextreme-react";

const ROUTING_PATH = "/progressMonitoringWO";
const groups = ['line'];
const currentDate = new Date();
const views: Array<any> = ['timelineMonth', 'month'];

const data = [

];

const ProgressMonitoringWO = () => {

    return (
        <React.Fragment>
            <div className="options">
                <strong>Lựa chọn</strong>
                <Form colCount={2} className={"collapsible"}>
                    <SimpleItem dataField={"Lựa chọn dây chuyền"}>
                        <SelectBox
                            dataSource={data}
                            className={"combobox-grouping"}
                            displayExpr="text"
                            valueExpr="id"
                            showSelectionControls={true}
                            applyValueMode="useButtons"
                            searchEnabled={true}
                            onValueChanged={() => { }}
                            width={"90%"}
                            placeholder={'-- Lựa chọn --'}
                        />
                    </SimpleItem>
                    <SimpleItem dataField={"Lựa chọn sản phẩm"}>
                        <SelectBox
                            dataSource={data}
                            className={"combobox-grouping"}
                            displayExpr="uPronam"
                            valueExpr="uProno"
                            showSelectionControls={true}
                            applyValueMode="useButtons"
                            searchEnabled={true}
                            onValueChanged={() => { }}
                            width={"90%"}
                            placeholder={'-- Lựa chọn --'}
                        />
                    </SimpleItem>
                    <SimpleItem
                        dataField={'Lựa chọn thời gian'}
                    >
                        <DateBox placeholder={'-- Lựa chọn --'} width={"90%"} />
                    </SimpleItem>
                </Form>
            </div>
            <Scheduler
                timeZone="Asia/Ho_Chi_Minh"
                dataSource={data}
                views={views}
                defaultCurrentDate={currentDate}
                currentDate={currentDate}
                height={1000}
                // crossScrollingEnabled={true}
                // width={"100%"}
                maxAppointmentsPerCell={"unlimited"}
                groups={groups}
                defaultCurrentView="timelineMonth"
                textExpr={"productName"}
                startDateExpr={"startTime"}
                endDateExpr={"endTime"}
                showAllDayPanel={false}
            >
                <View
                    name="Vertical Grouping"
                    type="timelineMonth"
                    groupOrientation="vertical"
                />
                <View
                    type='month'
                    groupOrientation='horizontal'
                />
                <Resource

                    fieldExpr="line"
                    allowMultiple={false}
                    dataSource={data}
                    label="Line"
                    displayExpr={"lineName"}
                />
                <Resource
                    fieldExpr="state"
                    allowMultiple={false}
                    dataSource={data}
                    label="State"
                />
                <Scrolling
                    mode='virtual'
                />
            </Scheduler>

        </React.Fragment>
    );
}


export default ProgressMonitoringWO;


registerScreen({
    component: ProgressMonitoringWO,
    caption: "Giám sát tiến độ WO",
    screenId: "progressMonitoringWO",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});
