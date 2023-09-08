import React, { } from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    ColumnChooser,
} from "devextreme-react/data-grid";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import SvgIcon from "../../../shared/components/SvgIcon/SvgIcon";
import { useBreadcrumb } from "../../../contexts/BreadcrumbItems";
import PaginationComponent from "../../../shared/components/PaginationComponent/PaginationComponent";

const data = [
    {
        id: 1, section: 'In offset', Foreman: 'Anh bảy', Shift: 1, day: '10/08/2023', reasonRefuse: 'Số lượng đã sản xuất mặt trước thiếu', status: 'Xác nhận'
    },
    {
        id: 2, section: 'In offset', Foreman: 'Anh si', Shift: 2, day: '11/08/2023', reasonRefuse: 'Số lượng đã sản xuất mặt trước thiếu', status: 'Chưa xác nhận'
    },
    {
        id: 3, section: 'In offset', Foreman: 'Anh beck', Shift: 3, day: '12/08/2023', reasonRefuse: 'Số lượng đã sản xuất mặt trước thiếu', status: 'Xác nhận'
    },
    {
        id: 4, section: 'In offset', Foreman: 'Anh kane', Shift: 2, day: '13/08/2023', reasonRefuse: 'Số lượng đã sản xuất mặt trước thiếu', status: 'Chưa xác nhận'
    },
    {
        id: 5, section: 'In offset', Foreman: 'Anh bảy', Shift: 1, day: '10/08/2023', reasonRefuse: 'Số lượng đã sản xuất mặt trước thiếu', status: 'Xác nhận'
    }
];
export const DeclareQuantity = () => {

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const [isVisibleDelete, setIsVisibleDelete] = React.useState<boolean>(false);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "declare-quantity",
                        title: "Khai báo sản lượng"
                    }
                ]
            })
        }
    }, []);


    return (
        <>
            {
                (
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
                                    Danh sách báo cáo hằng ngày
                                </h5>
                            </div>

                            <DataGrid
                                key={"id"}
                                keyExpr={"id"}
                                dataSource={dataPage}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}
                                noDataText='Không có dữ liệu để hiển thị'
                            >
                                <PopupConfirmDelete
                                    isVisible={isVisibleDelete}
                                    onCancel={() => setIsVisibleDelete(false)}
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
                                                Xác nhận xóa
                                            </h3>
                                        </div>
                                    }
                                    modalContent={
                                        <div>
                                            <h4 style={{ fontWeight: 400 }}>{"Bạn có chắc chắn muốn xóa không?"}</h4>
                                            <div
                                                style={{
                                                    backgroundColor: "#ffe0c2",
                                                    borderLeft: "4px solid #ff794e",
                                                    borderRadius: 5,
                                                    height: 100,
                                                }}>
                                                <h3 style={{ color: "#ff794e" }}>
                                                    <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                                    Lưu ý:
                                                </h3>
                                                <p style={{ marginLeft: 20, fontSize: 15 }}>
                                                    {"Nếu bạn xóa thì mọi dữ liệu liên quan đều sẽ biến mất!"}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    width={600}
                                />
                                <Toolbar>
                                    <ToolbarItem>
                                        <SvgIcon
                                            sizeIcon={17}
                                            textSize={17}
                                            text='Thêm mới'
                                            tooltipTitle='Thêm mới'
                                            icon='assets/icons/CircleAdd.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                    </ToolbarItem>
                                    <ToolbarItem name='columnChooserButton' />
                                    <ToolbarItem name='searchPanel' location='before' />
                                </Toolbar>
                                <FilterRow visible={true} />
                                <ColumnChooser enabled={true} allowSearch={true} />
                                <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />

                                <Column caption={"STT"} dataField={"id"} alignment="left" />
                                <Column caption={"Bộ phận"} dataField={"section"} />
                                <Column caption={"Trưởng ca"} dataField={"Foreman"} />
                                <Column caption={"Ca"} dataField={"Shift"} alignment="left" />
                                <Column caption={"Ngày"} dataField={"day"} />
                                <Column caption={"Lý do từ chối"} dataField={"reasonRefuse"} />
                                <Column caption={"Trạng thái"} dataField={"status"} />
                                <Column
                                    fixed={true}
                                    fixedPosition="right"
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={() => (
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon
                                                onClick={() => { }}
                                                tooltipTitle='Thông tin chi tiết'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={() => setIsVisibleDelete(true)}
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

export default DeclareQuantity;
