import React, { useEffect, useState } from "react";
import { collection, injectMainStore, instance, MainStoreInjected, useMainStore } from "@haulmont/jmix-react-core";
import TreeList, { Column, Editing, Lookup, Scrolling } from "devextreme-react/tree-list";
import { PlanningWorkOrder } from "../../../jmix/entities/PlanningWorkOrder";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import axios from "axios";
import { StateEnum } from "../../../jmix/enums/enums";
import { BranchGroup } from "../../../jmix/entities/BranchGroup";
import { Coitt } from "../../../jmix/entities/Coitt";
import { PLANNING_API_URL } from "../../../config";
import { currentDateTime } from "../../../utils/utils";

type liteBranch = {
    id: string;
    text: string;
};

const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
    view: "_base",
    sort: "code",
    loadImmediately: false,
});

let groupArray: any[] = [];
const productOrderItemDs = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
    view: "_base",
    sort: "productOrder",
    loadImmediately: false,
});
const bomVersionDs = collection<Coitt>(Coitt.NAME, {
    view: "_base",
    loadImmediately: false,
});
const dataInstance = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, { view: "_base", loadImmediately: false });

const CreateWorkOrderByProduct = React.memo((props: any) => {
    // { row, closePopup, productOrder, mainStore? }
    const [branchArray, setBranchArray] = useState<liteBranch[]>([]);
    const [workOrderArrays, setWorkOrderArrays] = useState<PlanningWorkOrder[]>([]);
    const mainStore = useMainStore();
    useEffect(() => {
        // console.log("useEffect");
        sapBranchGroupCollection.load().then((res) => {
            let tempBranchArray: liteBranch[] = [];
            sapBranchGroupCollection.items.map((item) => {
                let { uBranchcode, uBranchname, uGroupcode, uGroupname } = item;
                if (uBranchcode && uBranchname && uGroupcode && uGroupname) {
                    if (
                        !tempBranchArray.find((childItem) => {
                            return uBranchcode === childItem.id;
                        })
                    ) {
                        tempBranchArray.push({ id: uBranchcode, text: uBranchname });
                    }
                    groupArray.push({ branchCode: uBranchcode, id: uGroupcode, text: uGroupname });
                }
            });
            setBranchArray(tempBranchArray);
        });
    }, []);

    useEffect(() => {
        let tmpworkOrderArrays: PlanningWorkOrder[] = [];
        //tao ra 1 danh sach cac wo tư product order item
        let item = props.row;

        let i = 1;
        let workorderItem: PlanningWorkOrder = new PlanningWorkOrder();
        workorderItem.bomVersion = item.bomVersion;
        workorderItem.productCode = item.productCode;
        workorderItem.productName = item.productName;
        workorderItem.quantityPlan = item.quantity;
        workorderItem.branchCode = item.branchCode;
        workorderItem.groupCode = item.groupCode;
        workorderItem.startTime = item.startDate ? item.startDate : props.productOrder.orderDate;
        workorderItem.endTime = item.endDate ? item.endDate : props.productOrder.completeDate;
        workorderItem.productOrder = item.productOrder;
        workorderItem.createTime = currentDateTime();
        workorderItem.workOrderType = "WO";
        workorderItem.note = item.note;
        workorderItem.state = StateEnum.NEW;
        workorderItem.isNew = 1;
        workorderItem.workOrderTypeName = "Kịch bản sản xuất -WO";
        workorderItem.woId = i + "";

        let lineWorkorderItem: PlanningWorkOrder = new PlanningWorkOrder();
        lineWorkorderItem.bomVersion = item.bomVersion;
        lineWorkorderItem.productCode = item.productCode;
        lineWorkorderItem.productName = item.productName;
        lineWorkorderItem.quantityPlan = item.quantity;
        lineWorkorderItem.branchCode = item.branchCode;
        lineWorkorderItem.groupCode = item.groupCode;
        lineWorkorderItem.startTime = item.startDate ? item.startDate : props.productOrder.orderDate;
        lineWorkorderItem.endTime = item.endDate ? item.endDate : props.productOrder.completeDate;
        lineWorkorderItem.productOrder = item.productOrder;
        lineWorkorderItem.createTime = currentDateTime();
        lineWorkorderItem.isNew = 1;
        lineWorkorderItem.parentWorkOrderId = i + "";
        i = i + 1;
        // console.log("i=" + i);
        lineWorkorderItem.workOrderType = "LINE";
        lineWorkorderItem.state = StateEnum.NEW;
        lineWorkorderItem.workOrderTypeName = "Kịch bản sản xuất - LINE";
        lineWorkorderItem.woId = i + "";
        tmpworkOrderArrays.push(workorderItem, lineWorkorderItem);
        i = i + 1;
        setWorkOrderArrays(tmpworkOrderArrays);
        // console.log('workOrderArrays')
        // console.log(workOrderArrays)
    }, [props]);

    const onEditorPreparing = (e) => {
        // console.log('onEditorPreparing')
        if (e.dataField === "bomVersion" && e.parentType === "dataRow") {
            const defaultValueChangeHandler = e.editorOptions.onValueChanged;
            let valueE = e.value;
            // console.log('bomVersion onEditPreparing')
            // console.log(e)
            bomVersionDs.filter = {
                conditions: [{ property: "uProno", operator: "=", value: e.row.data.productCode }],
            };
            let uVersionList: { id: string; name: string }[] = [];
            bomVersionDs.load().then((res) => {
                if (bomVersionDs.items) {
                    bomVersionDs.items.map((item) => {
                        if (item.uVersions) uVersionList.push({ id: item.uVersions, name: item.uVersions });
                    });
                }
            });
            let uVersionEditorOptions = {
                items: uVersionList,
                searchEnabled: true,
                displayExpr: "name",
                valueExpr: "id",
            };
            e.editorOptions = uVersionEditorOptions;
            e.editorOptions.onValueChanged = function (args) {
                // Override the default handler
                defaultValueChangeHandler(args);
            };
            console.log(e);
        }
    };

    const getFilteredBranches = (options): any => {
        return {
            store: groupArray,
            filter: options.data ? ["branchCode", "=", options.data.branchCode] : null,
        };
    };

    const setBranchValue = (rowData, value) => {
        rowData.groupCode = null;
        rowData.branchCode = value;
        // @ts-ignore
        // this.defaultSetCellValue(rowData, value);
    };

    const onClick = () => {
        // console.log(workOrderArrays)
        if (workOrderArrays.length > 0) {
            // console.log(`authToken ${mainStore.authToken}`)
            const headers = {
                Authorization: "Bearer " + mainStore.authToken,
                "content-type": "application/json",
            };
            axios.post(PLANNING_API_URL + "/services/api/workorder/saveList", workOrderArrays, { headers }).then((response) => {
                if (response.status === 200 && response.data === "SUCCESS") {
                    props.row.status = "created_wo";
                    notify(
                        {
                            message: "Tạo WO thành công!",
                            width: 450,
                        },
                        "SUCCESS",
                        3000,
                    );
                    props.closePopup();
                } else {
                    notify("Tạo WO thất bại!", "error", 3000);
                }
            });
        } else {
            console.log("xxx");
        }
    };
    return (
        <div>
            <h3>{props.row.productName}</h3>
            <TreeList
                id='gridContainer'
                dataSource={workOrderArrays}
                keyExpr='woId'
                parentIdExpr={"parentWorkOrderId"}
                showBorders={true}
                height={"auto"}
                rowAlternationEnabled={true}
                autoExpandAll={true}
                onEditorPreparing={onEditorPreparing}>
                <Scrolling mode='standard' rowRenderingMode='standard' columnRenderingMode='standard' />
                <Column dataField='workOrderTypeName' allowEditing={false} caption='Loại KBSX'></Column>
                <Column
                    dataField='productName'
                    allowEditing={false}
                    caption='Sản phẩm '
                    // groupIndex={0}
                ></Column>
                <Column dataField='quantityPlan' width={140} caption='Số lượng mục tiêu'></Column>
                <Column dataField='bomVersion' width={140} visible={false} caption='Version BOM'></Column>
                <Column
                    dataField='startTime'
                    alignment='right'
                    format={"dd/MM/yyyy hh:mm:ss"}
                    dataType='datetime'
                    caption={"Thời gian bắt đầu"}
                    width={200}
                />
                <Column
                    dataField='endTime'
                    alignment='right'
                    format={"dd/MM/yyyy hh:mm:ss"}
                    dataType='datetime'
                    caption={"Thời gian kết thúc"}
                    width={200}
                />
                <Column dataField='branchCode' caption={"Ngành"} width={160} setCellValue={setBranchValue}>
                    <Lookup dataSource={branchArray} displayExpr='text' valueExpr='id' />
                </Column>
                <Column dataField='groupCode' caption={"Tổ"} width={120}>
                    <Lookup dataSource={getFilteredBranches} displayExpr='text' valueExpr='id' />
                </Column>
                <Column type={"buttons"} caption='Tùy chọn' />

                <Editing
                    mode='row'
                    refreshMode='reshape'
                    allowUpdating={true}
                    // allowDeleting={true}
                    // confirmDelete={false}
                    useIcons={true}
                    texts={{
                        cancelRowChanges: "Hoàn tác",
                        saveRowChanges: "Lưu lại",
                        editRow: "Sửa",
                    }}></Editing>
            </TreeList>
            <Button className='button' text='Tạo kịch bản sản xuất' type='success' onClick={onClick} />
        </div>
    );
});

export default CreateWorkOrderByProduct;
