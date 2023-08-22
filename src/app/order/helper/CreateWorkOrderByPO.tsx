import React from "react";
import { collection, injectMainStore, instance, MainStoreInjected } from "@haulmont/jmix-react-core";
import TreeList, { Column, Editing, Form, Lookup, Pager, Paging, Scrolling } from "devextreme-react/tree-list";
import { PlanningWorkOrder } from "../../../jmix/entities/PlanningWorkOrder";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import axios from "axios";
import { StateEnum } from "../../../jmix/enums/enums";
import { PLANNING_API_URL } from "../../../config";
import { observer } from "mobx-react";
import { BranchGroup } from "../../../jmix/entities/BranchGroup";
import { Item } from "devextreme-react/form";
import { Profile } from "../../../jmix/entities/Profile";
import { Line } from "../../../jmix/entities/Line";
import { currentDateTime } from "../../../utils/utils";

const allowedPageSizes = [5, 10, 20];

@injectMainStore
class CreateWorkOrderByPO extends React.PureComponent<
    { row; productOrderItems; closePopup; mainStore? },
    {
        profileArray: any[];
        lineArray: any[];
    },
    MainStoreInjected
> {
    sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
        view: "_base",
        sort: "code",
        loadImmediately: false,
    });
    profiles = collection<Profile>(Profile.NAME, {
        view: "_base",
        sort: "-id",
        loadImmediately: false,
    });

    // private profileArray: any[];
    lineDatasource = collection<Line>(Line.NAME, {
        view: "_base",
        sort: "lineName",
        loadImmediately: false,
    });
    bomversionList = [
        {
            ID: 1.1,
            Name: "1.1",
        },
        {
            ID: 1.2,
            Name: "1.2",
        },
        {
            ID: 2.1,
            Name: "2.1",
        },
    ];
    workOrderArrays: PlanningWorkOrder[] = [];
    productOrderItemDs = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        sort: "productOrder",
        loadImmediately: false,
    });
    dataInstance = instance<PlanningWorkOrder>(PlanningWorkOrder.NAME, { view: "_base", loadImmediately: false });
    private branchArray: any[];
    private groupArray: any[];

    constructor(props) {
        super(props);
        this.branchArray = [];
        this.groupArray = [];
        this.state = { profileArray: [], lineArray: [] };
        this.getFilteredBranches = this.getFilteredBranches.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    async componentDidMount() {
        // console.log("component đi mount")
        await this.sapBranchGroupCollection.load().then((res) => {
            this.sapBranchGroupCollection.items.map((item) => {
                let { uBranchcode, uBranchname, uGroupcode, uGroupname } = item;
                if (uBranchcode && uBranchname && uGroupcode && uGroupname) {
                    if (
                        !this.branchArray.find((childItem) => {
                            return uBranchcode === childItem.id;
                        })
                    ) {
                        this.branchArray.push({ id: uBranchcode, text: uBranchname });
                    }
                    this.groupArray.push({ branchCode: uBranchcode, id: uGroupcode, text: uGroupname });
                }
            });
        });

        await this.profiles.load().then((res) => {
            let profileArray: any[] = [];
            this.profiles.items.map((item) => {
                let { id, name } = item;
                if (id && name) {
                    profileArray.push({ id: id, name: name });
                }
            });
            this.setState({ profileArray: profileArray });
        });

        await this.lineDatasource.load().then((res) => {
            let lineArray: any = [];
            this.lineDatasource.items.map((item) => {
                let { id, lineName } = item;
                if (id && lineName) {
                    lineArray.push({ id: id, name: lineName });
                }
            });

            this.setState({ lineArray: lineArray });
        });
    }

    render = () => {
        if (!this.props.productOrderItems) {
            return <div>NO DATA</div>;
        }

        this.workOrderArrays = [];
        //tao ra 1 danh sach cac wo tư product order item
        let i = 1;
        let workorderItem: PlanningWorkOrder;
        this.props.productOrderItems.map((item) => {
            workorderItem = new PlanningWorkOrder();
            workorderItem.bomVersion = item.bomVersion;
            workorderItem.productCode = item.productCode;
            workorderItem.productName = item.productName;
            workorderItem.quantityPlan = item.quantity;
            workorderItem.branchCode = item.branchCode;
            workorderItem.groupCode = item.groupCode;
            workorderItem.startTime = item.startDate ? item.startDate : this.props.row.orderDate;
            workorderItem.endTime = item.endDate ? item.endDate : this.props.row.completeDate;
            workorderItem.productOrder = this.props.row.productOrderId;
            workorderItem.createTime = currentDateTime();
            workorderItem.isNew = 1;
            workorderItem.workOrderType = "WO";
            workorderItem.state = StateEnum.NEW;
            workorderItem.workOrderTypeName = "Kịch bản sản xuất - WO";
            workorderItem.note = item.note;
            workorderItem.woId = i + "";

            let lineWorkorderItem: PlanningWorkOrder = new PlanningWorkOrder();
            lineWorkorderItem.bomVersion = item.bomVersion;
            lineWorkorderItem.productCode = item.productCode;
            lineWorkorderItem.productName = item.productName;
            lineWorkorderItem.quantityPlan = item.quantity;
            lineWorkorderItem.branchCode = item.branchCode;
            lineWorkorderItem.groupCode = item.groupCode;
            lineWorkorderItem.startTime = item.startDate ? item.startDate : this.props.row.orderDate;
            lineWorkorderItem.endTime = item.endDate ? item.endDate : this.props.row.completeDate;
            lineWorkorderItem.productOrder = this.props.row.productOrderId;
            lineWorkorderItem.createTime = currentDateTime();
            lineWorkorderItem.isNew = 1;
            lineWorkorderItem.parentWorkOrderId = i + "";
            i = i + 1;
            lineWorkorderItem.workOrderType = "LINE";
            lineWorkorderItem.state = StateEnum.NEW;
            lineWorkorderItem.workOrderTypeName = "Kịch bản sản xuất - LINE";
            lineWorkorderItem.woId = i + "";
            this.workOrderArrays.push(workorderItem, lineWorkorderItem);
            i = i + 1;
        });

        return (
            <div>
                <h3>
                    {this.props.row.productOrderId}/{this.props.row.customerName}
                </h3>
                <TreeList
                    dataSource={this.workOrderArrays}
                    keyExpr='woId'
                    parentIdExpr={"parentWorkOrderId"}
                    showBorders={true}
                    height={"70%"}
                    rowAlternationEnabled={true}
                    autoExpandAll={true}
                    onRowUpdating={this.onEdit}
                    wordWrapEnabled={false}>
                    <Paging enabled={true} defaultPageSize={10} />
                    <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />

                    <Column dataField='workOrderTypeName' allowEditing={false} caption='Loại KBSX' width={240}></Column>
                    <Column
                        dataField='productName'
                        allowEditing={false}
                        caption='Sản phẩm '
                        // groupIndex={0}
                    ></Column>
                    <Column dataField='quantityPlan' width={140} caption='Số lượng'></Column>
                    <Column dataField='bomVersion' width={140} visible={false} caption='Version BOM'>
                        <Lookup dataSource={this.bomversionList} key={"ID"} displayExpr={"Name"} valueExpr={"ID"} />
                    </Column>
                    <Column
                        dataField='startTime'
                        alignment='right'
                        format={"dd/MM/yyyy hh:mm:ss"}
                        dataType='datetime'
                        caption={"Thời gian bắt đầu"}
                        width={200}></Column>
                    <Column
                        dataField='endTime'
                        alignment='right'
                        format={"dd/MM/yyyy hh:mm:ss"}
                        dataType='datetime'
                        caption={"Thời gian kết thúc"}
                        width={200}></Column>
                    <Column dataField='branchCode' caption={"Ngành"} width={140} setCellValue={this.setBranchValue}>
                        <Lookup dataSource={this.branchArray} displayExpr='text' valueExpr='id' key='id' />
                    </Column>
                    <Column dataField='groupCode' caption={"Tổ"} width={140}>
                        <Lookup dataSource={this.getFilteredBranches} displayExpr='text' valueExpr='id' />
                    </Column>
                    <Column dataField='profile' caption={"Profile"} width={140}>
                        <Lookup dataSource={this.state.profileArray} displayExpr='name' valueExpr='id' />
                    </Column>
                    <Column dataField='line' caption={"Dây chuyền"} width={140}>
                        <Lookup dataSource={this.state.lineArray} displayExpr='name' valueExpr='id' />
                    </Column>
                    <Column dataField='numberStaff' caption={"Số lượng nhân sự"} visible={false} allowEditing={true} width={140}></Column>

                    <Editing
                        mode='form'
                        refreshMode='reshape'
                        allowUpdating={true}
                        allowDeleting={true}
                        confirmDelete={false}
                        useIcons={true}
                        texts={{
                            cancelRowChanges: "Hoàn tác",
                            saveRowChanges: "Lưu lại",
                            editRow: "Sửa",
                        }}></Editing>
                </TreeList>
                <Button className='button' text='Tạo kịch bản sản xuất' type='success' onClick={this.onClick} />
            </div>
        );
    };

    onEdit = (data) => {
        if (data.oldData.workOrderType === "WO" && (data.newData.branchCode || data.newData.groupCode)) {
            // console.log("tim wo line de cap nhat")
            this.workOrderArrays.forEach((item) => {
                if (item.parentWorkOrderId === data.key) {
                    // console.log("cap nhat wo line branch code  + group code")
                    if (data.newData.branchCode) {
                        item.branchCode = data.newData.branchCode;
                    }
                    if (data.newData.groupCode) {
                        item.groupCode = data.newData.groupCode;
                    }
                }
            });
        }
        // this.forceUpdate();
    };

    allowEditBranchCode = (data) => {};

    getFilteredBranches(options): any {
        return {
            store: this.groupArray,
            filter: options.data ? ["branchCode", "=", options.data.branchCode] : null,
        };
    }

    setBranchValue(rowData, value) {
        rowData.groupCode = null;
        // @ts-ignore
        this.defaultSetCellValue(rowData, value);
    }

    onClick = () => {
        if (this.workOrderArrays.length > 0) {
            const headers = {
                Authorization: "Bearer " + this.props.mainStore.authToken,
                "content-type": "application/json",
            };
            axios.post(PLANNING_API_URL + "/services/api/workorder/saveList", this.workOrderArrays, { headers }).then((response) => {
                if (response.status === 200 && response.data === "SUCCESS") {
                    notify(
                        {
                            message: "Tạo WO thành công!",
                            width: 450,
                        },
                        "SUCCESS",
                        3000,
                    );
                    this.props.closePopup();
                } else {
                    notify("Tạo WO thất bại!", "error", 3000);
                }
            });
        } else {
            console.log("xxx");
        }
    };
}

export default CreateWorkOrderByPO;
