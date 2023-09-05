import React from "react";
import { DataGrid } from "devextreme-react";
import { Column, FilterRow, Item as ToolbarItem, Pager, Paging, SearchPanel, Toolbar, ColumnChooser } from "devextreme-react/data-grid";
import ProgressMonitoringWODetail from "./ProgressMonitoringWODetail/ProgressMonitoringWODetail";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { WarningOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";

const ROUTING_PATH = "/progressMonitoringManufacture";
const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];

const data = [
    {
        woCode: "WO-T82023",
        soCode: "SO-001",
        productionCode: "15010623",
        customer: "TP Bank",
        cardName: "Visa TPBank",
        hopeQuantity: "3000",
        finishQuantity: "2000",
        finishRatio: "2%",
        errorRatio: "2%",
        status: "Đang sản xuất",
    },
    {
        woCode: "WO-T82024",
        soCode: "SO-001",
        productionCode: "15010623",
        customer: "TP Bank",
        cardName: "Visa TPBank",
        hopeQuantity: "3000",
        finishQuantity: "2000",
        finishRatio: "2%",
        errorRatio: "2%",
        status: "Hoàn thành",
    },
    {
        woCode: "WO-T82025",
        soCode: "SO-001",
        productionCode: "15010623",
        customer: "TP Bank",
        cardName: "Visa TPBank",
        hopeQuantity: "3000",
        finishQuantity: "2000",
        finishRatio: "2%",
        errorRatio: "2%",
        status: "Đang sản xuất",
    },
];
export const ProgressMonitoringManufacture = () => {
    const [isVisibleWODetail, setIsVisibleWODetail] = React.useState<boolean>(false);
    const [isVisibleConfirmDelete, setIsVisibleConfirmDelete] = React.useState<boolean>(false);

    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "progress-monitoring",
                        title: "Giám sát tiến độ",
                    },
                    {
                        key: "progress-monitoring-manufacture",
                        title: "Giám sát tiến độ sản xuất",
                    }
                ]
            })
        }
    }, []);
    return (
        <>
            {isVisibleWODetail ? (
                <ProgressMonitoringWODetail isOpen={isVisibleWODetail} setClose={() => setIsVisibleWODetail(false)} />
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
                                Giám sát tiến độ sản xuất
                            </h5>
                        </div>
                        <DataGrid
                            key={"woCode"}
                            keyExpr={"woCode"}
                            dataSource={data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}>
                            <PopupConfirmDelete
                                isVisible={isVisibleConfirmDelete}
                                onCancel={() => setIsVisibleConfirmDelete(false)}
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
                                            Xóa dữ liệu
                                        </h3>
                                    </div>
                                }
                                modalContent={
                                    <div>
                                        <h4 style={{ fontWeight: 400 }}>
                                            Bạn có chắc chắn muốn xóa <b>Dữ liệu hiện tại</b>?
                                        </h4>
                                        <div
                                            style={{
                                                backgroundColor: "#ffe0c2",
                                                borderLeft: "4px solid #ff794e",
                                                height: 100,
                                                borderRadius: 5,
                                            }}>
                                            <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                                <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                                Lưu ý:
                                            </h3>
                                            <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                                Nếu bạn xóa <b>Dữ liệu hiện tại </b> thì các thông tin liên quan đều bị mất
                                            </p>
                                        </div>
                                    </div>
                                }
                                width={600}
                            />
                            <Toolbar>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        onClick={() => { }}
                                        text='Xuất Excel'
                                        tooltipTitle='Xuất Excel'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/ExportFile.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
                                <ToolbarItem name='searchPanel' location='before' />
                            </Toolbar>
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
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

                            <Column caption={"Mã WO"} dataField={"woCode"} alignment='left' width={100} />
                            <Column caption={"Mã SO"} dataField={"soCode"} />
                            <Column caption={"Mã sản xuất"} dataField={"productionCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"customer"} />
                            <Column caption={"Tên thẻ "} dataField={"cardName"} />
                            <Column caption={"Sản lượng dự kiến"} dataField={"hopeQuantity"} />
                            <Column caption={"Sản lượng hoàn thành"} dataField={"finishQuantity"} />
                            <Column caption={"Tỉ lệ hoàn thành"} dataField={"finishRatio"} />
                            <Column caption={"Tỉ lệ lỗi"} dataField={"errorRatio"} />
                            <Column caption={"Trạng thái"} dataField='status' />
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            onClick={() => setIsVisibleWODetail(true)}
                                            tooltipTitle='Thông tin chi tiết - WO'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/EyeOpen.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => setIsVisibleConfirmDelete(true)}
                                            tooltipTitle='Xóa'
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


export default ProgressMonitoringManufacture;
