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
    Toolbar, ColumnChooser
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import ProgressMonitoringOrderDetailProgress from "./ProgressMonitoringOrderDetailProgress/ProgressMonitoringOrderDetailProgress";


const ROUTING_PATH = "/progressMonitoringOrder";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

const data = [
    { soCode: '1345643', customerCode: 'KH001', customerName: 'TPBank', finishRatio: '2%', errorRatio: '2%', startDate: '09/08/2023', endDate: '19/08/2023', priorityLevel: '3', status: 'Đang sản xuất' },
    { soCode: '1345644', customerCode: 'KH001', customerName: 'TPBank', finishRatio: '2%', errorRatio: '2%', startDate: '09/08/2023', endDate: '19/08/2023', priorityLevel: '2', status: 'Hoàn thành' },
    { soCode: '1345645', customerCode: 'KH001', customerName: 'TPBank', finishRatio: '2%', errorRatio: '2%', startDate: '09/08/2023', endDate: '19/08/2023', priorityLevel: '2', status: 'Hoàn thành' },
    { soCode: '1345646', customerCode: 'KH001', customerName: 'TPBank', finishRatio: '2%', errorRatio: '2%', startDate: '09/08/2023', endDate: '19/08/2023', priorityLevel: '1', status: 'Đang sản xuất' }
]
export const ProgressMonitoringOrder = () => {
    const [isVisibleDetailProgress, setIsVisibleDetailProgress] = React.useState<boolean>(false);
    return (
        <>
            {isVisibleDetailProgress ?
                <ProgressMonitoringOrderDetailProgress
                    isOpen={isVisibleDetailProgress}
                    setClose={() => setIsVisibleDetailProgress(false)}
                />
                :
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
                            }}>Giám sát tiến độ đơn hàng</h5>
                        </div>
                        <div className="informer" style={{
                            backgroundColor: "#ffffff",
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
                            key={'soCode'}
                            keyExpr={"soCode"}
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
                                    <SvgIcon onClick={() => { }} text="Xuất Excel" tooltipTitle="Xuất Excel" sizeIcon={17} textSize={17} icon="assets/icons/ExportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                </ToolbarItem>
                                <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                <ToolbarItem name="searchPanel" location="before" />
                            </Toolbar>
                            <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} />
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
                            <SearchPanel visible={true} placeholder={"Tìm kiếm..."} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                            <Column caption={"Mã SO"} dataField={"soCode"} />
                            <Column caption={"Mã khách hàng"} dataField={"customerCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"customerName"} />
                            <Column caption={"Tỷ lệ hoàn thành "} dataField={"finishRatio"} />
                            <Column caption={"Tỷ lệ lỗi"} dataField={"errorRatio"} />
                            <Column dataField="startDate"
                                caption="Ngày bắt đầu"
                                format={"dd/MM/yyyy"}
                                dataType="datetime"
                            />
                            <Column dataField="endDate"
                                caption="Ngày kết thúc"
                                format={"dd/MM/yyyy"}
                                dataType="datetime"
                            />
                            <Column caption={"Mức độ ưu tiên"} dataField={"priorityLevel"} />
                            <Column caption={"Trạng thái"} dataField="status" />
                            <Column type={"buttons"} caption={"Thao tác"} alignment="left" cellRender={() =>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                    <SvgIcon onClick={() => setIsVisibleDetailProgress(true)} tooltipTitle="Tiến độ chi tiết đơn hàng" sizeIcon={17} textSize={17} icon="assets/icons/EyeOpen.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    <SvgIcon onClick={() => { }} tooltipTitle="Xóa" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" />
                                </div>
                            }>
                            </Column>
                        </DataGrid>
                    </div>
                </div>
            }
        </>
    )

}

registerScreen({
    caption: "Giám sát tiến độ đơn hàng",
    component: ProgressMonitoringOrder,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "progressMonitoringOrder"
});

export default ProgressMonitoringOrder;