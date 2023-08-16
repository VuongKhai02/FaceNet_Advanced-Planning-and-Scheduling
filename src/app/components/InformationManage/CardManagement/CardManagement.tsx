import React, { } from "react";
import { Button, DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    MasterDetail, Button as ButtonIcon, ColumnChooser
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { Item } from "devextreme-react/form";
import JobOutPutDetail from "./JobOutputDetail";


const data = [
    { boxCode: 'HO1', stageCode: 'CD01', jobCode: 'J01-001', jobName: 'In offset : Ra bản', jobOutputCode: 'J01', jobOutPutName: 'WO-123-CĐ01-01' }
];
const ROUTING_PATH = "/techFormList";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];
export const CardManagement = () => {

    const getProductOrderItemTemplate = row => {
        return (
            <JobOutPutDetail
                data={row.data}
            />
        );
    };

    return (
        <>
            {
                <div>
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "center",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Danh sách hộp chứa thẻ</h5>
                        </div>
                        <div className="informer" style={{
                            backgroundColor: "#ffffff",
                            paddingLeft: 13
                        }}>
                            <h5 className="name" style={{
                                color: "rgba(0, 0, 0, 0.7)",
                                marginBottom: 0,
                                fontSize: 15,
                                boxSizing: "border-box",
                                fontWeight: 550
                            }}>Tìm kiếm chung</h5>
                        </div>


                        <DataGrid
                            key={'boxCode'}
                            keyExpr={"boxCode"}
                            dataSource={data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}

                        >
                            <Toolbar>
                                <ToolbarItem location="after">
                                    <Button hint="Thêm mới" icon="add" text="Thêm mới" />
                                </ToolbarItem>
                                <ToolbarItem >
                                    <Button icon='print' text="In mã" />
                                </ToolbarItem>
                                <ToolbarItem name="columnChooserButton" />
                                <ToolbarItem name="searchPanel" location="before" />
                            </Toolbar>
                            <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} />
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} />
                            <SearchPanel visible={true} placeholder={"VD: PO"} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                            <Column caption={"Mã hộp"} dataField={"boxCode"} alignment="left" width={100} />
                            <Column caption={"Mã công đoạn"} dataField={"stageCode"} />
                            <Column caption={"Mã Job"} dataField={"jobCode"} />
                            <Column caption={"Tên Job"} dataField={"jobName"} />
                            <Column caption={"Mã Job Output"} dataField={"jobOutputCode"} />
                            <Column caption={"Tên Job Output"} dataField={"jobOutPutName"} />
                            <Column type={"buttons"} caption={"Thao tác"} alignment="center" >
                                <ButtonIcon icon="info" />
                                <ButtonIcon icon="add" />
                                <ButtonIcon icon="trash" />
                            </Column>
                            <MasterDetail
                                enabled={true}
                                component={getProductOrderItemTemplate}
                            />
                        </DataGrid>
                    </div>
                </div>
            }
        </>
    )

}


registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: CardManagement,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "cardManagement"
});

export default CardManagement;