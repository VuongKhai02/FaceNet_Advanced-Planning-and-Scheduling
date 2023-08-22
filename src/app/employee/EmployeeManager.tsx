import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import { locale, loadMessages } from "devextreme/localization";
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    SearchPanel,
    Editing,
    Popup,
    Selection,
    Lookup,
    Form,
    MasterDetail,
    LoadPanel,
    Item as TItem,
    Toolbar,
    ColumnChooser,
    Paging,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import { SCADA_URL, PLANNING_API_URL } from "../../config";
import { collection, injectMainStore, instance } from "@haulmont/jmix-react-core";
import { EmployeeGroup } from "../../jmix/entities/EmployeeGroup";
import { Employee } from "../../jmix/entities/Employee";
import "./EmployeeManager.css";
import { Button } from "devextreme-react/button";
import { PlanningProductionOrder } from "../../jmix/entities/PlanningProductionOrder";
import notify from "devextreme/ui/notify";

const ROUTING_PATH = "/employeeManager";

locale("en");
loadMessages({
    en: {
        Yes: "Xóa",
        No: "Hủy bỏ",
        OK: "Đồng ý",
        Cancel: "Hủy bỏ",
        "dxCalendar-todayButtonText": "Hôm nay",
        "dxList-selectAll": "Chọn tất cả",
        "dxList-pageLoadingText": "Đang tải...",
        Select: "-- Lựa chọn --",
    },
});

@injectMainStore
@observer
class EmployeeManagerComp extends React.Component<{}, { isRender: boolean }> {
    employeeGroups: EmployeeGroup[] = [];
    employees: Employee[] = [];
    groupEmployeeCollection = collection<EmployeeGroup>(EmployeeGroup.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });
    employeeCollection = collection<Employee>(Employee.NAME, {
        view: "_base",
        loadImmediately: false,
        // sort: 'order'
    });
    dataInstance = instance<Employee>(Employee.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    constructor(props) {
        super(props);
        this.onRefreshGrid = this.onRefreshGrid.bind(this);
        this.loadEmployee = this.loadEmployee.bind(this);
    }

    async componentDidMount() {
        await this.groupEmployeeCollection.load().then((res) => {
            let arr: EmployeeGroup[] = [];
            this.groupEmployeeCollection.items.map((item) => {
                arr.push(item);
            });
            this.employeeGroups = arr;
        });

        await this.employeeCollection.load().then((res) => {
            let arr: Employee[] = [];
            this.employeeCollection.items.map((item) => {
                arr.push(item);
            });
            this.employees = arr;
        });
    }

    onRefreshGrid() {
        this.loadEmployee();
    }

    async loadEmployee() {
        await this.employeeCollection.load().then((res) => {
            this.setState((previewState, props) => ({
                isRender: true,
            }));
        });
    }

    render() {
        return (
            <div>
                {this.employees ? (
                    <div>
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
                                Quản lý nhân viên
                            </h5>
                        </div>
                        <div
                            className='informer'
                            style={{
                                background: "#ffffff",
                                textAlign: "left",
                                paddingLeft: 13,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 0,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                }}>
                                Tìm kiếm chung
                            </h5>
                        </div>
                        <DataGrid
                            id='gridContainer'
                            // ref={(ref) => dataGrid = ref}
                            dataSource={this.employeeCollection.items}
                            keyExpr='id'
                            showBorders={true}
                            height={"auto"}
                            width={"100%"}
                            onRowUpdating={this.onEdit}
                            onRowRemoving={this.onDelete}
                            onRowInserting={this.onInsert}
                            allowColumnResizing={true}
                            columnMinWidth={50}
                            rowAlternationEnabled={true}
                            showColumnLines={true}
                            showRowLines={true}
                            noDataText={"Không có dữ liệu để hiển thị"}>
                            <Toolbar>
                                <TItem name='addRowButton' />
                                <TItem name='searchPanel' location={"before"} />
                                <TItem location='after' widget='dxButton'>
                                    <Button hint='Refresh' icon={"refresh"} onClick={this.onRefreshGrid} />
                                </TItem>
                                <TItem name='columnChooserButton' />
                            </Toolbar>
                            <Paging defaultPageSize={15} />
                            <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText='Đặt lại'>
                                <OperationDescriptions
                                    startsWith='Bắt đầu với'
                                    equal='Bằng'
                                    endsWith='Kết thúc với'
                                    contains='Chứa'
                                    notContains='Không chứa'
                                    notEqual='Không bằng'
                                    lessThan='Nhỏ hơn'
                                    lessThanOrEqual='Nhỏ hơn hoặc bằng'
                                    greaterThan='Lớn hơn'
                                    greaterThanOrEqual='Lớn hơn hoặc bằng'
                                    between='Nằm giữa'
                                />
                            </FilterRow>
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                            />
                            <SearchPanel visible={true} width={240} placeholder='VD: Lê Trung Sơn' />
                            <ColumnChooser enabled={true} />
                            <Selection mode='single' />
                            <Column
                                dataField='image'
                                width={200}
                                alignment={"center"}
                                cellRender={this.cellRender}
                                allowEditing={false}
                                caption='Avatar'
                                allowFiltering={false}></Column>

                            <Column dataField='fullName' caption='Tên nhân viên' width={180}></Column>
                            <Column dataField='employeeGroup' width={200} caption='Nhóm'>
                                <Lookup dataSource={this.employeeGroups} valueExpr={"userGroupCode"} displayExpr={"userGroupName"}></Lookup>
                            </Column>
                            <Column dataField='mail' width={200} caption='Email'></Column>
                            <Column dataField='phoneNumber' width={200} caption='Số điện thoại'></Column>
                            <Column dataField='userName' width={200} caption='User Name'></Column>
                            <Editing
                                mode='form'
                                useIcons={true}
                                allowAdding={true}
                                allowUpdating={true}
                                allowDeleting={true}
                                texts={{
                                    cancelRowChanges: "Hủy bỏ",
                                    saveRowChanges: "Lưu lại",
                                    confirmDeleteTitle: "Xác nhận xóa bản ghi",
                                    confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                                    deleteRow: "Xóa",
                                    editRow: "Sửa",
                                    addRow: "Thêm nhân viên",
                                }}></Editing>
                        </DataGrid>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }

    cellRender(data) {
        return <img src={data.value ? data.value : "/image/default-avatar.png"} />;
    }

    onEdit = (data) => {
        // console.log(data);
        let orderItem = data.newData;
        orderItem.id = data.key;
        this.dataInstance.setItem(orderItem);
        this.dataInstance.commit().then((res) =>
            notify(
                {
                    message: "Cập nhật thành công!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            ),
        );
    };

    onDelete = (data) => {
        // console.log("on delete");
        this.employeeCollection.delete(data.data).then((res) =>
            notify(
                {
                    message: "Xóa thành công!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            ),
        );
    };

    onInsert = (data) => {
        // console.log('oninsert')
        let orderItem = data.data;
        // orderItem.productOrder = this.props.data.productOrderId
        this.dataInstance.setItem(orderItem);
        this.dataInstance.commit().then((res) =>
            notify(
                {
                    message: "Thêm mới thành công!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            ),
        );
    };
}

export const EmployeeManager = () => <EmployeeManagerComp />;

registerScreen({
    component: EmployeeManager,
    caption: "Quản lý nhân viên",
    screenId: "EmployeeManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
