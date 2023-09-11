import React from "react";
import { DataGrid } from "devextreme-react";
import { Column, FilterRow, Item as ToolbarItem, SearchPanel, Toolbar, ColumnChooser } from "devextreme-react/data-grid";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import ProgressMonitoringOrderDetailProgress from "./ProgressMonitoringOrderDetailProgress/ProgressMonitoringOrderDetailProgress";
import { WarningOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";

const data = [
    {
        soCode: "1345643",
        customerCode: "KH001",
        customerName: "TPBank",
        finishRatio: "2%",
        errorRatio: "2%",
        startDate: "09/08/2023",
        endDate: "19/08/2023",
        priorityLevel: "3",
        status: "Đang sản xuất",
    },
    {
        soCode: "1345644",
        customerCode: "KH001",
        customerName: "TPBank",
        finishRatio: "2%",
        errorRatio: "2%",
        startDate: "09/08/2023",
        endDate: "19/08/2023",
        priorityLevel: "2",
        status: "Hoàn thành",
    },
    {
        soCode: "1345645",
        customerCode: "KH001",
        customerName: "TPBank",
        finishRatio: "2%",
        errorRatio: "2%",
        startDate: "09/08/2023",
        endDate: "19/08/2023",
        priorityLevel: "2",
        status: "Hoàn thành",
    },
    {
        soCode: "1345646",
        customerCode: "KH001",
        customerName: "TPBank",
        finishRatio: "2%",
        errorRatio: "2%",
        startDate: "09/08/2023",
        endDate: "19/08/2023",
        priorityLevel: "1",
        status: "Đang sản xuất",
    },
];
export const ProgressMonitoringOrder = () => {
    const [isVisibleDetailProgress, setIsVisibleDetailProgress] = React.useState<boolean>(false);
    const [isVisibleConfirmDelete, setIsVisibleConfirmDelete] = React.useState<boolean>(false);

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

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
                        key: "progress-monitoring-order",
                        title: "Giám sát tiến độ đơn hàng",
                    }
                ]
            })
        }
    }, []);
    return (
        <>
            {isVisibleDetailProgress ? (
                <ProgressMonitoringOrderDetailProgress
                    isOpen={isVisibleDetailProgress}
                    setClose={() => setIsVisibleDetailProgress(false)}
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
                                Giám sát tiến độ đơn hàng
                            </h5>
                        </div>
                        <DataGrid
                            key={"soCode"}
                            keyExpr={"soCode"}
                            dataSource={dataPage}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            noDataText="Không có dữ liệu để hiển thị"
                        >
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


                            <Column caption={"Mã SO"} dataField={"soCode"} />
                            <Column caption={"Mã khách hàng"} dataField={"customerCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"customerName"} />
                            <Column caption={"Tỷ lệ hoàn thành "} dataField={"finishRatio"} />
                            <Column caption={"Tỷ lệ lỗi"} dataField={"errorRatio"} />
                            <Column dataField='startDate' caption='Ngày bắt đầu' format={"dd/MM/yyyy"} dataType='datetime' />
                            <Column dataField='endDate' caption='Ngày kết thúc' format={"dd/MM/yyyy"} dataType='datetime' />
                            <Column caption={"Mức độ ưu tiên"} dataField={"priorityLevel"} />
                            <Column caption={"Trạng thái"} dataField='status' />
                            <Column
                                fixed={true}
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            onClick={() => setIsVisibleDetailProgress(true)}
                                            tooltipTitle='Tiến độ chi tiết đơn hàng'
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
                        <PaginationComponent
                            pageSizeOptions={[10, 20, 40]}
                            pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: data?.length }}
                            totalPages={totalPage}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                            onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};


export default ProgressMonitoringOrder;
