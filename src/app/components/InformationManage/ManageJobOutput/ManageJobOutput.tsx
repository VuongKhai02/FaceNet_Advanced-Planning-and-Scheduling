import React from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    Button as ButtonIcon,
    ColumnChooser,
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import InfoJobOutputDetail from "./InfoJobOutputDetail/InfoJobOutputDetail";

const data = [
    {
        jobOutputCode: "J03",
        jobOutPutName: "WO-123-CĐ01-01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        quantity: "100",
        status: "Chuyển công đoạn",
    },
    {
        jobOutputCode: "J04",
        jobOutPutName: "WO-123-CĐ01-01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        quantity: "100",
        status: "Công đoạn hiện tại",
    },
    {
        jobOutputCode: "J05",
        jobOutPutName: "WO-123-CĐ01-01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        quantity: "100",
        status: "Chuyển công đoạn",
    },
];
const ROUTING_PATH = "/manageJobOutput";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, "all"];
export const ManageJobOutput = () => {
    const [isVisibleJobOutputDetail, setIsVisibleJobOutputDetail] = React.useState<boolean>(false);
    const [isVisibleDelJobOutput, setIsVisibleDelJobOutput] = React.useState<boolean>(false);

    return (
        <>
            {isVisibleJobOutputDetail ? (
                <InfoJobOutputDetail
                    isOpen={isVisibleJobOutputDetail}
                    setClose={() => {
                        setIsVisibleJobOutputDetail(false);
                    }}
                />
            ) : (
                <div>
                    <div className='table-responsive'>
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
                                Danh sách Job output
                            </h5>
                        </div>
                        <div
                            className='informer'
                            style={{
                                backgroundColor: "#ffffff",
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
                            key={"jobOutputCode"}
                            keyExpr={"jobOutputCode"}
                            dataSource={data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}>
                            <PopupConfirmDelete
                                isVisible={isVisibleDelJobOutput}
                                onCancel={() => setIsVisibleDelJobOutput(false)}
                                onSubmit={() => {}}
                                modalTitle={
                                    <div>
                                        <h3
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#ff794e",
                                                fontWeight: 500,
                                            }}>
                                            Xóa Job output
                                        </h3>
                                        <h5 style={{ fontWeight: 400, marginTop: 30 }}>{"Bạn có chắc chắn muốn xóa Job out này không?"}</h5>
                                    </div>
                                }
                                modalContent={
                                    <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e" }}>
                                        <h3 style={{ color: "#ff794e" }}>
                                            <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                            Lưu ý:
                                        </h3>
                                        <p style={{ marginLeft: 20, fontSize: 15 }}>
                                            {"Nếu bạn xóa Job output thì mọi dữ liệu liên quan đến Job output này đều sẽ biến mất!"}
                                        </p>
                                    </div>
                                }
                                width={600}
                            />
                            <Toolbar>
                                <ToolbarItem name='columnChooserButton' />
                                <ToolbarItem name='searchPanel' location='before' />
                            </Toolbar>
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                                allowSearch={true}
                            />
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} />
                            <SearchPanel visible={true} placeholder={"Tìm kiếm"} width={300} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />

                            <Column caption={"Mã Job Output"} dataField={"jobOutputCode"} />
                            <Column caption={"Tên Job Output"} dataField={"jobOutPutName"} />
                            <Column caption={"Mã Job"} dataField={"jobCode"} />
                            <Column caption={"Tên Job"} dataField={"jobName"} />
                            <Column caption={"Số lượng thẻ"} dataField={"quantity"} />
                            <Column caption={"Trạng thái"} dataField={"status"} />
                            <Column type={"buttons"} caption={"Thao tác"} alignment='center'>
                                <ButtonIcon icon='info' onClick={() => setIsVisibleJobOutputDetail(true)} />
                                <ButtonIcon icon='trash' onClick={() => setIsVisibleDelJobOutput(true)} />
                            </Column>
                        </DataGrid>
                    </div>
                </div>
            )}
        </>
    );
};

registerScreen({
    caption: "Quản lý Job output",
    component: ManageJobOutput,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
    screenId: "manageJobOutput",
});

export default ManageJobOutput;
