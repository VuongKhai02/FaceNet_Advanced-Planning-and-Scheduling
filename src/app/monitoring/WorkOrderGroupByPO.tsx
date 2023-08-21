import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    FilterRow,
    HeaderFilter,
    Paging,
    SearchPanel,
    MasterDetail,
} from "devextreme-react/data-grid";
import CheckBox from "devextreme-react/check-box";
import { collection, data } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import { PlanningWorkOrderAssignment } from "../../jmix/entities/PlanningWorkOrderAssignment";
import { ProgressBar } from "devextreme-react/progress-bar";
import { Tag } from "antd";
import WOrderDetailTemplate from "./helper/WOrderDetailTemplate";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";

const ROUTING_PATH = "/workOrderGroupByPO";

@observer
class WorkOrderGroupByPOGrid extends React.Component<{}, { autoExpandAll: boolean; showHeaderFilter: boolean }> {
    woDataCollectionStore = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "wo-with-assignment",
        sort: "id",
        loadImmediately: true,
    });

    constructor(props) {
        super(props);

        this.state = {
            autoExpandAll: true,
            showHeaderFilter: true,
        };
        this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
    }

    orderHeaderFilter = (data) => {
        data.dataSource.postProcess = (results) => {
            results.push({
                text: "Weekends",
                value: "weekends",
            });
            return results;
        };
    };

    render() {
        if (this.woDataCollectionStore.status === "LOADING") return "Loading...";
        return (
            <div>
                <DataGrid
                    dataSource={this.woDataCollectionStore.items}
                    keyExpr='id'
                    id={"dataGridContainer"}
                    allowColumnResizing={true}
                    columnMinWidth={50}
                    rowAlternationEnabled={true}
                    allowColumnReordering={true}
                    showBorders={true}>
                    <GroupPanel visible={true} />
                    <SearchPanel visible={true} />
                    <Grouping autoExpandAll={this.state.autoExpandAll} />
                    <Paging defaultPageSize={10} />
                    <HeaderFilter visible={this.state.showHeaderFilter} />
                    {/*<Column dataField="planningWo" dataType="string" width={240} caption="Work Order"/>*/}
                    {/*<Column dataField="product" dataType="string" caption="Sản phẩm/BTP"/>*/}

                    {/*<Column caption="Trạng thái" width={240} cellRender={this.stateCellRender}/>*/}
                    {/*<Column caption="Đã nhập kho" width={240} cellRender={this.processCellRender}/>*/}
                    <Column dataField='productOrder' dataType='string' groupIndex={0} caption='Product Order' />
                    <Column dataField='planningWorkOrderId' width={100} caption='Mã WO'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='productName' caption='Tên Sản phẩm'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='quantityPlan' width={140} caption='Số lượng đặt hàng'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='quantityActual' width={140} caption='Số lượng sản xuất'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='createdDate' alignment='right' dataType='datetime' width={140} caption='Ngày tạo'>
                        <HeaderFilter dataSource={this.orderHeaderFilter} />
                    </Column>
                    <Column dataField='startTime' alignment='right' dataType='datetime' width={140} caption='Tg bắt đầu'>
                        <HeaderFilter dataSource={this.orderHeaderFilter} />
                    </Column>
                    <Column dataField='endTime' alignment='right' dataType='datetime' width={140} caption='Tg kết thúc'>
                        <HeaderFilter dataSource={this.orderHeaderFilter} />
                    </Column>
                    <Column dataField='bomVersion' width={100} caption='Bom Version'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='sapWo' width={200} caption='SAP WO'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='branchName' width={140} caption='Ngành'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='group_name' width={140} caption='Tổ'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column dataField='state' width={140} caption='Trạng thái'>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <MasterDetail enabled={true} component={WOrderDetailTemplate}></MasterDetail>
                </DataGrid>

                <div className='options'>
                    <div className='caption'>Options</div>
                    <div className='option'>
                        <CheckBox text='Expand All Groups' value={this.state.autoExpandAll} onValueChanged={this.onAutoExpandAllChanged} />
                    </div>
                </div>
            </div>
        );
    }

    stateCellRender(rowInfo) {
        let cl = "";

        if (rowInfo.data.state === "START") {
            cl = "processing";
        }
        if (rowInfo.data.state === "IN_PRODUCTION") {
            cl = "warning";
        }
        if (rowInfo.data.state === "COMPLETE") {
            cl = "success";
        }
        return <Tag color={cl}>{rowInfo.data.state}</Tag>;
    }

    processCellRender(rowInfo) {
        // return (<div>{rowInfo.data.actual}</div>);
        return (
            <ProgressBar
                id='progress-bar-status'
                // className={rowInfo.data.actual === rowInfo.data.planning ? 'complete' : '' }
                width='90%'
                min={0}
                max={rowInfo.data.quantityPlan}
                // statusFormat={this.statusFormat}
                value={rowInfo.data.quantityActual}
            />
        );
    }

    // statusFormat(value) {
    //   return `Hoàn thành: ${ value * 100 }%`;
    // }
    onAutoExpandAllChanged() {
        this.setState({
            autoExpandAll: !this.state.autoExpandAll,
        });
    }

    onShowHeaderFilterChanged(e) {
        this.setState({
            showHeaderFilter: e.value,
        });
    }
}

export const WorkOrderGroupByPO = () => (
    <div>
        <WorkOrderGroupByPOGrid />
    </div>
);

registerScreen({
    component: WorkOrderGroupByPO,
    caption: "screen.WorkOrderGroupByPO",
    screenId: "WorkOrderGroupByPO",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
