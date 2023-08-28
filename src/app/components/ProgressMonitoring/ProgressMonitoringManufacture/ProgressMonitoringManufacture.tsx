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
    Toolbar, ColumnChooser, Button as ButtonIcon
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { Tooltip } from 'antd';
import ProgressMonitoringWODetail from "./ProgressMonitoringWODetail/ProgressMonitoringWODetail";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";


const ROUTING_PATH = "/progressMonitoringManufacture";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

const data = [
    { woCode: 'WO-T82023', soCode: 'SO-001', productionCode: '15010623', customer: 'TP Bank', cardName: 'Visa TPBank', hopeQuantity: '3000', finishQuantity: '2000', finishRatio: '2%', errorRatio: '2%', status: 'Đang sản xuất' },
    { woCode: 'WO-T82024', soCode: 'SO-001', productionCode: '15010623', customer: 'TP Bank', cardName: 'Visa TPBank', hopeQuantity: '3000', finishQuantity: '2000', finishRatio: '2%', errorRatio: '2%', status: 'Hoàn thành' },
    { woCode: 'WO-T82025', soCode: 'SO-001', productionCode: '15010623', customer: 'TP Bank', cardName: 'Visa TPBank', hopeQuantity: '3000', finishQuantity: '2000', finishRatio: '2%', errorRatio: '2%', status: 'Đang sản xuất' }
]
export const ProgressMonitoringManufacture = () => {
    const [isVisibleWODetail, setIsVisibleWODetail] = React.useState<boolean>(false);
    return (
        <>
            {isVisibleWODetail
                ?
                <ProgressMonitoringWODetail
                    isOpen={isVisibleWODetail}
                    setClose={() => setIsVisibleWODetail(false)}
                />
                :
                <div className="box__shadow-table-responsive">
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "center",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Giám sát tiến độ sản xuất</h5>
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
                            key={'woCode'}
                            keyExpr={"woCode"}
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
                            {/* <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} /> */}
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

                            <Column caption={"Mã WO"} dataField={"woCode"} alignment="left" width={100} />
                            <Column caption={"Mã SO"} dataField={"soCode"} />
                            <Column caption={"Mã sản xuất"} dataField={"productionCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"customer"} />
                            <Column caption={"Tên thẻ "} dataField={"cardName"} />
                            <Column caption={"Sản lượng dự kiến"} dataField={"hopeQuantity"} />
                            <Column caption={"Sản lượng hoàn thành"} dataField={"finishQuantity"} />
                            <Column caption={"Tỉ lệ hoàn thành"} dataField={"finishRatio"} />
                            <Column caption={"Tỉ lệ lỗi"} dataField={"errorRatio"} />
                            <Column caption={"Trạng thái"} dataField="status" />
                            <Column type={"buttons"} caption={"Thao tác"} alignment="left" cellRender={() =>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                    <SvgIcon onClick={() => setIsVisibleWODetail(true)} tooltipTitle="Thông tin chi tiết - WO" sizeIcon={17} textSize={17} icon="assets/icons/EyeOpen.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
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
    caption: "Giám sát tiến độ sản xuất",
    component: ProgressMonitoringManufacture,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "progressMonitoringManufacture"
});

export default ProgressMonitoringManufacture;