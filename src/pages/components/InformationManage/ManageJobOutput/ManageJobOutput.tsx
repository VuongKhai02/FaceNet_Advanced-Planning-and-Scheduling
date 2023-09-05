import React from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    ColumnChooser,
} from "devextreme-react/data-grid";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import InfoJobOutputDetail from "./InfoJobOutputDetail/InfoJobOutputDetail";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";

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
const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];
export const ManageJobOutput = () => {
    const [isVisibleJobOutputDetail, setIsVisibleJobOutputDetail] = React.useState<boolean>(false);
    const [isVisibleDelJobOutput, setIsVisibleDelJobOutput] = React.useState<boolean>(false);

    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "info-manage",
                        title: "Quản lý thông tin",
                    },
                    {
                        key: "manage-job-output",
                        title: "Quản lý Job output",
                    }
                ]
            })
        }
    }, []);

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
                <div className='box__shadow-table-responsive'>
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
                                onSubmit={() => { }}
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
                                    </div>
                                }
                                modalContent={
                                    <div
                                        style={{
                                            backgroundColor: "#ffe0c2",
                                            borderLeft: "4px solid #ff794e",
                                            marginLeft: 20,
                                            marginRight: 20,
                                        }}>
                                        <h5 style={{ fontWeight: 500, marginTop: 20, marginLeft: 20, fontSize: 20 }}>
                                            {"Bạn có chắc chắn muốn xóa Job out này không?"}
                                        </h5>
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
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} />
                            <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                            <Paging defaultPageSize={10} />
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
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            onClick={() => setIsVisibleJobOutputDetail(true)}
                                            tooltipTitle='Thông tin chi tiết Job output'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/InfoCircle.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => setIsVisibleDelJobOutput(true)}
                                            tooltipTitle='Xóa Job output'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                        />
                                    </div>
                                )}></Column>
                        </DataGrid>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageJobOutput;
