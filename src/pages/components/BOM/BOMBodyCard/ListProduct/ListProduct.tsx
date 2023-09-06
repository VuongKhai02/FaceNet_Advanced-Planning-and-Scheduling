import { locale, loadMessages } from "devextreme/localization";
import React from "react";
import DataGrid, {
    Column,
    FilterRow,
    SearchPanel,
    Selection,
    Toolbar,
    Item as TItem,
    Paging,
    Pager,
    OperationDescriptions,
    ColumnChooser,
} from "devextreme-react/data-grid";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import PopupBOM from "../../../../../shared/components/PopupBOM/PopupBOM";
import { WarningOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PopupConfirmDelete from "../../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";

const data = [
    { cardCode: "SP091", cardName: "Sản phẩm 09.1", bomversion: "1.1", notice: "VT001", note: "Vật tư 01", status: "Hoạt động" },
    { cardCode: "SP092", cardName: "Sản phẩm 09.2", bomversion: "1.1", notice: "VT001", note: "Vật tư 01", status: "Hoạt động" },
    { cardCode: "SP093", cardName: "Sản phẩm 09.3", bomversion: "1.1", notice: "VT001", note: "Vật tư 01", status: "Ngưng hoạt động" },
];

const data2 = [
    {
        codeMaterial: "VT0001",
        nameMaterial: "Chip vàng 6 chân",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
    {
        codeMaterial: "VT0002",
        nameMaterial: "Chip vàng 6 chân",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
    {
        codeMaterial: "VT0003",
        nameMaterial: "Chip vàng 6 chân",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
];
const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];
export const ListProduct = React.memo((props: any) => {

    const [isDetailBOMTemplate, setIsDetailBOMTemplate] = React.useState<boolean>(false);
    const [isChangeState, setIsChangeState] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);


    locale("en");
    loadMessages({
        en: {
            Yes: "Xóa",
            No: "Hủy bỏ",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
        },
    });

    const handleCustomFooter = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}></div>
        </div>,
    ];
    const handleCustomFooterButtonChangeState = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, marginBottom: 20 }}>
                <Button
                    key='cancel'
                    style={{
                        marginRight: 18,
                        backgroundColor: "#E5E5E5",
                        display: "inline-block",
                        borderRadius: "4px",
                        width: 100,
                        height: 40,
                        fontSize: 16,
                    }}
                    onClick={() => setIsChangeState(false)}>
                    Hủy bỏ
                </Button>
                <Button
                    style={{
                        borderRadius: "4px",
                        backgroundColor: "#ff794e",
                        color: "#ffff",
                        width: 100,
                        height: 40,
                        fontSize: 16,
                        marginRight: 8
                    }}
                    key='submit'
                    onClick={() => { }}
                    className='btn btn-save'>
                    Xác nhận
                </Button>
            </div>
        </div>
    ];

    return (
        <div>
            <DataGrid
                id='gridContainer'
                dataSource={data}
                keyExpr='cardCode'
                key={"cardCode"}
                height={"auto"}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText='Không có dữ liệu để hiển thị'>
                <PopupBOM
                    isVisible={isChangeState}
                    onCancel={() => setIsChangeState(false)}
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
                                Xác nhận chuyển trạng thái
                            </h3>
                        </div>
                    }
                    modalContent={
                        <div>
                            <h4 style={{ fontWeight: 400 }}>Bạn chắc chắn muốn chuyển trạng thái của BOM?</h4>
                            <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e", borderRadius: 5, height: 120 }}>
                                <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                    <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                    Lưu ý:
                                </h3>
                                <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                    Nếu bạn chuyển trạng thái của BOM mẫu, tất cả các sản phẩm thuộc BOM này cũng sẽ
                                    chuyển trạng thái theo BOM mẫu
                                </p>
                            </div>
                        </div>
                    }
                    width={600}
                    customFooter={handleCustomFooterButtonChangeState}
                />
                <PopupBOM
                    isVisible={isDetailBOMTemplate}
                    modalContent={
                        <div>
                            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                <div>
                                    <div>
                                        <table
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-arround",
                                            }}>
                                            <td>
                                                <InfoRow label='Mã thẻ' data='TH001' />
                                                <InfoRow label='Bom version' data='1.1' />
                                            </td>
                                            <td>
                                                <InfoRow label='Tên thẻ' data='Thẻ visa TP Bank' />
                                                <InfoRow label='Trạng thái' data='Hoạt động' />
                                            </td>
                                        </table>
                                    </div>
                                    <div style={{ marginTop: 40 }}>
                                        <h4>Danh sách vật tư</h4>
                                    </div>
                                    <DataGrid
                                        key={"codeMaterial"}
                                        keyExpr={"codeMaterial"}
                                        dataSource={data2}
                                        showBorders={true}
                                        columnAutoWidth={true}
                                        showRowLines={true}
                                        rowAlternationEnabled={true}
                                        allowColumnResizing={true}
                                        allowColumnReordering={true}
                                        focusedRowEnabled={true}>
                                        <FilterRow visible={true} />

                                        <Column caption={"Mã vật tư"} dataField={"codeMaterial"} />
                                        <Column caption={"Tên vật tư"} dataField={"nameMaterial"} />
                                        <Column caption={"Version"} dataField={"version"} />
                                        <Column caption={"Phân loại"} dataField={"classify"} />
                                        <Column caption={"Định mức"} dataField={"norm"} />
                                        <Column caption={"Đơn vị tính"} dataField={"unit"} />
                                        <Column caption={"Mã vật tư thay thế"} dataField={"replaceMaterialCode"} />
                                        <Column caption={"Mô tả vật tư thay thế"} dataField={"replaceMaterialDescription"} />
                                        <Column caption={"Số lượng tồn kho"} dataField={"inventoryQuantity"} />
                                        <Column
                                            fixed={true}
                                            type={"buttons"}
                                            caption={"Thao tác"}
                                            alignment='center'
                                            cellRender={() => (
                                                <div>
                                                    <SvgIcon
                                                        onClick={() => { }}
                                                        tooltipTitle='Danh sách vật tư thay thế'
                                                        sizeIcon={17}
                                                        icon='assets/icons/EyeOpen.svg'
                                                        textColor='#FF7A00'
                                                        style={{ marginLeft: 35 }}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </DataGrid>
                                </div>
                            </div>
                        </div>
                    }
                    modalTitle={
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <SvgIcon sizeIcon={25} icon='assets/icons/Announcement.svg' textColor='#FF7A00' style={{ marginRight: 17 }} />
                            Xem chi tiết BOM sản phẩm
                        </div>
                    }
                    width={1300}
                    onCancel={() => setIsDetailBOMTemplate(false)}
                    onSubmit={() => { }}
                    customFooter={handleCustomFooter}
                />
                <PopupConfirmDelete
                    isVisible={isConfirmDelete}
                    onCancel={() => setIsConfirmDelete(false)}
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
                    <TItem location={"before"}>
                        <div>Danh sách sản phẩm</div>
                    </TItem>
                    <TItem name='columnChooserButton' />
                </Toolbar>
                <ColumnChooser enabled={true} allowSearch={true} mode='select' />
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
                <SearchPanel visible={true} width={240} placeholder='Nhập thông tin và nhấn Enter để tìm kiếm' />

                <Selection mode='single' />
                <Column caption='Mã thẻ' dataField={"cardCode"} />
                <Column dataField='cardName' caption='Tên thẻ'></Column>
                <Column dataField='bomversion' caption='BOM version' />
                <Column dataField='notice' caption='Lưu ý'></Column>
                <Column dataField='note' caption='Ghi chú' />
                <Column caption={"Trạng thái"} dataField='status' />
                <Column
                    fixed={true}
                    type={"buttons"}
                    caption={"Thao tác"}
                    alignment='center'
                    cellRender={() => (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <SvgIcon
                                onClick={() => setIsDetailBOMTemplate(true)}
                                tooltipTitle='Thông tin chi tiết BOM sản phẩm'
                                sizeIcon={17}
                                textSize={17}
                                icon='assets/icons/InfoCircle.svg'
                                textColor='#FF7A00'
                                style={{ marginRight: 17 }}
                            />
                            <SvgIcon
                                onClick={() => setIsChangeState(true)}
                                tooltipTitle='Chuyển trạng thái'
                                sizeIcon={17}
                                textSize={17}
                                icon='assets/icons/StageChange.svg'
                                textColor='#FF7A00'
                                style={{ marginRight: 17 }}
                            />
                            <SvgIcon
                                onClick={() => setIsConfirmDelete(true)}
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
    );
});
export default ListProduct;
