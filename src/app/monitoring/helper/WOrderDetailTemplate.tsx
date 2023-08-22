import React from "react";
import { DataGrid, Column, Editing, Popup, Paging, Lookup, Form } from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import { PlanningWorkOrder } from "../../../jmix/entities/PlanningWorkOrder";
import { collection, data, instance, MayHaveId, WithId } from "@haulmont/jmix-react-core";
import { PlanningWorkOrderAssignment } from "../../../jmix/entities/PlanningWorkOrderAssignment";
import { observer } from "mobx-react";
import { ProgressBar } from "devextreme-react/progress-bar";

@observer
class WOrderDetailTemplateGrid extends React.Component<{ data }, {}> {
    key: string = this.props.data.key;
    woAssignmentDataCollectionStore = collection<PlanningWorkOrderAssignment>(PlanningWorkOrderAssignment.NAME, {
        view: "with-line",
        sort: "id",
        loadImmediately: true,
        filter: {
            conditions: [{ property: "planningWorkOrder", operator: "=", value: this.key }],
        },
    });
    dataInstance = instance<PlanningWorkOrderAssignment>(PlanningWorkOrderAssignment.NAME, {
        view: "with-line",
        loadImmediately: false,
    });
    positions = [
        { id: "active", text: "ACTIVE" },
        { id: "inactive", text: "INACTIVE" },
    ];
    positionEditorOptions = {
        items: this.positions,
        searchEnabled: true,
        displayExpr: "text",
        valueExpr: "id",
    };

    constructor(props) {
        super(props);
        // console.log(props.data)
    }

    onEdit = (data) => {
        // console.log(data);
        let workorder = data.newData;
        workorder.id = data.key;
        this.dataInstance.setItem(workorder);
        this.dataInstance.commit();
    };

    onInsert = (data) => {
        // console.log(data);
        let workorder = data.data;
        workorder.planningWorkOrder = this.props.data.data;
        this.dataInstance.setItem(workorder);
        this.dataInstance.commit();
    };

    render() {
        // console.log("xxx")
        // this.woAssignmentDataCollectionStore.items.map(item => console.log(item));
        let { productName } = this.props.data.data;

        return (
            <React.Fragment>
                <div className='master-detail-caption'>{`${productName}`}</div>
                <DataGrid
                    dataSource={this.woAssignmentDataCollectionStore.items}
                    showBorders={true}
                    columnAutoWidth={true}
                    onRowUpdating={this.onEdit}
                    onRowInserting={this.onInsert}
                    keyExpr={"id"}>
                    <Editing mode='popup' allowUpdating={true} allowAdding={true} allowDeleting={true}>
                        <Popup title='Planning WorkOrder Assignment' showTitle={true} width={700} height={525} fullScreen={true} />
                        <Form>
                            <Item itemType='group' colCount={2} colSpan={2}>
                                <Item dataField='productName' />
                                <Item dataField='batch' />
                                <Item dataField='bomVersion' />

                                <Item dataField='exptected' />
                                <Item dataField='line' />
                                <Item dataField='machine' />
                                <Item dataField='planning' />
                                <Item dataField='sapBatchCode' />
                                <Item dataField='sapBranchGroupCode' />
                                <Item dataField='sapWorkOrder' />
                                <Item dataField='status' editorType='dxSelectBox' editorOptions={this.positionEditorOptions} key={"id"} />
                                <Item dataField='state' />
                            </Item>

                            <Item itemType='group' caption='Lịch trình' colCount={2} colSpan={2}>
                                <Item dataField='startTime' />
                                <Item dataField='endTime' />
                            </Item>
                            {/*<Item itemType="group" caption="Home Address" colCount={2} colSpan={2}>*/}
                            {/*  <DataGrid/>*/}
                            {/*</Item>*/}
                        </Form>
                    </Editing>
                    <Column dataField='productName' dataType='string' width={240} caption='Sản phẩm/BTP' />
                    <Column dataField='startTime' dataType='datetime' width={240} caption='Ngày bắt đầu' />
                    <Column dataField='endTime' dataType='datetime' width={240} caption='Ngày kết thúc' />
                    <Column dataField='planningWo' dataType='string' width={240} caption='WO Assignment ID' />
                    <Column dataField='batch' dataType='string' caption='Lô' />
                    <Column caption='Dây chuyền' dataType='string' width={240} cellRender={this.lineNameCellRender} />
                    <Column dataField='batch' dataType='string' caption='Lô' />
                    <Column caption='Đã nhập kho' width={240} cellRender={this.processCellRender} />
                </DataGrid>
            </React.Fragment>
        );
    }

    lineNameCellRender(rowInfo) {
        if (rowInfo.data.line) {
            return <div>{rowInfo.data.line.lineName}</div>;
        } else {
            return <div></div>;
        }
    }

    processCellRender(rowInfo) {
        return <ProgressBar id='progress-bar-status' width='90%' min={0} max={rowInfo.data.actual} value={rowInfo.data.planning} />;
    }
}

export default WOrderDetailTemplateGrid;
