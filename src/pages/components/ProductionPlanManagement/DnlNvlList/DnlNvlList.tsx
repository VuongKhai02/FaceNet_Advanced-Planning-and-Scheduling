import React from "react";
import { Button, DataGrid, Popup } from "devextreme-react";
import { Column, FilterRow, Item as ToolbarItem, Pager, Paging, SearchPanel, Toolbar, ColumnChooser } from "devextreme-react/data-grid";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";

const ROUTING_PATH = "/DnlNvlList";
const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];

const data = [
    {
        soCode: "312324",
        manufactureCode: "MSX-123",
        customerName: "TP Bank",
        cardName: "Visa TPBank",
        numberReProduction: "15,000",
        reasonReProduction: "Khách hàng thay đổi yêu cầu",
        status: "Đang chờ phê duyệt",
    },
    {
        soCode: "312325",
        manufactureCode: "MSX-123",
        customerName: "TP Bank",
        cardName: "Visa TPBank",
        numberReProduction: "15,000",
        reasonReProduction: "Khách hàng thay đổi yêu cầu",
        status: "Đang chờ phê duyệt",
    },
    {
        soCode: "312326",
        manufactureCode: "MSX-123",
        customerName: "TP Bank",
        cardName: "Visa TPBank",
        numberReProduction: "15,000",
        reasonReProduction: "Khách hàng thay đổi yêu cầu",
        status: "Đang chờ phê duyệt",
    },
];
export const DnlNvlList = () => {
    const [isViewMaterial, setIsViewMaterial] = React.useState<boolean>(false);

    return (
        <>
            {
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
                                Danh sách yêu cầu sản xuất lại
                            </h5>
                        </div>
                        <div>
                            <DataGrid
                                key={"soCode"}
                                keyExpr={"soCode"}
                                dataSource={data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}>
                                <Toolbar>
                                    <ToolbarItem location='after'>
                                        <SvgIcon
                                            tooltipTitle='Xuất Excel'
                                            text='Xuất Excel'
                                            onClick={() => { }}
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

                                <Column caption={"Mã SO"} dataField={"soCode"} alignment='left' width={100} />
                                <Column caption={"Mã sản xuất"} dataField={"manufactureCode"} />
                                <Column caption={"Tên khách hàng"} dataField={"customerName"} />
                                <Column caption={"Tên thẻ "} dataField={"cardName"} />
                                <Column caption={"Số lượng sản xuất lại"} dataField={"numberReProduction"} />
                                <Column caption={"Lý do sản xuất lại"} dataField={"reasonReProduction"} />
                                <Column caption={"Trạng thái"} dataField='status' />
                                <Column
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={() => (
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon
                                                tooltipTitle='Thông tin'
                                                onClick={() => {
                                                    setIsViewMaterial(true);
                                                }}
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                tooltipTitle='Xóa'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Trash.svg'
                                                textColor='#FF7A00'
                                            />
                                        </div>
                                    )}
                                />
                            </DataGrid>
                        </div>

                        {/* Xem nguyên vật liệu */}

                        <Popup
                            visible={isViewMaterial}
                            title='Xem danh sách nguyên vật liệu cần lĩnh'
                            onHiding={() => {
                                setIsViewMaterial(false);
                            }}
                            width={1000}
                            height={800}>
                            <div>
                                <div>
                                    <table
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-arround",
                                        }}>
                                        <td>
                                            <InfoRow label='Tên thẻ/Card Name' data='Phôi thẻ Visa Credit Classic, TP Bank, T8/2022' />
                                            <InfoRow label='Bom version' data='1.1' />
                                        </td>
                                        <td>
                                            <InfoRow label='Mã PCN' data='PCN-123' />
                                            <InfoRow label='Mã SO' data='SO-T82023' />
                                        </td>
                                    </table>
                                </div>
                                <div style={{ marginTop: 40 }}>
                                    <h4>Danh sách nguyên vật liệu cần lĩnh</h4>
                                </div>
                            </div>
                            <DataGrid
                                key={"soCode"}
                                keyExpr={"soCode"}
                                dataSource={data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}>
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
                                <FilterRow visible={true} />
                                <Paging defaultPageSize={10} />
                                <Column caption={"No."} dataField={"no"} alignment='left' width={100} />
                                <Column caption={"Mã vật tư"} dataField={"codeMaterial"} />
                                <Column caption={"Tên vật tư"} dataField={"nameMaterial"} />
                                <Column caption={"Số lượng"} dataField={"quantity"} />
                                <Column caption={"Đơn vị tính"} dataField={"unit"} />
                            </DataGrid>
                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 15,
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "center",
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    text='Hủy bỏ'
                                    style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                                />
                                <Button text='Gửi đề nghị lĩnh' style={{ backgroundColor: "#FF7A00", color: "#fff" }} />
                            </div>
                        </Popup>
                    </div>
                </div>
            }
        </>
    );
};

export default DnlNvlList;
