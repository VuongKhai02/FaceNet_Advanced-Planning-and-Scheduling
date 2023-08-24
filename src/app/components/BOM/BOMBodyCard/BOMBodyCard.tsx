import React, { } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import "./BOMBodyCard.css";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import BOMBodyCardAddInfo from "./BOMBodyCardAddInfo/BOMBodyCardAddInfo";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import { Input, Table } from "antd";
import { Pagination } from 'antd';
import PopupBOM from "../../../shared/components/PopupBOM/PopupBOM";
import InfoRow from "../../../shared/components/InfoRow/InfoRow";
import DataGrid, { Column, FilterRow, HeaderFilter, Toolbar, Item as ToolbarItem, } from "devextreme-react/data-grid";

const data = [
    { productCode: 'SP01', productName: 'Sản phẩm 1', version: '1.1', productType: 'Thành phẩm', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP02', productName: 'Sản phẩm 2', version: '1.2', productType: 'Thành phẩm', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP03', productName: 'Sản phẩm 3', version: '1.3', productType: 'Nguyên vật liệu', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Ngừng hoạt động' },
    { productCode: 'SP04', productName: 'Sản phẩm 4', version: '1.4', productType: 'Nguyên vật liệu', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP05', productName: 'Sản phẩm 5', version: '1.5', productType: 'Nguyên vật liệu', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP06', productName: 'Sản phẩm 6', version: '1.6', productType: 'Thành phẩm', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP07', productName: 'Sản phẩm 7', version: '1.7', productType: 'Thành phẩm', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Ngừng hoạt động' },
    { productCode: 'SP08', productName: 'Sản phẩm 8', version: '1.8', productType: 'Thành phẩm', describe: 'Mô tả', notice: 'Lưu ý', note: 'Ghi chú', status: 'Hoạt động' }

];
const data1 = [
    { no: '1', codeMaterial: 'Mã vật tư 1', nameMaterial: 'Tên vật tư', version: '1.1', norm: 'Định mức', supplierName: 'Tên nhà cung cấp', replaceMaterial: 'Vật tư thay thế', inventoryQuantity: 'Số lượng tồn kho' },
    { no: '2', codeMaterial: 'Mã vật tư 2', nameMaterial: 'Tên vật tư', version: '1.1', norm: 'Định mức', supplierName: 'Tên nhà cung cấp', replaceMaterial: 'Vật tư thay thế', inventoryQuantity: 'Số lượng tồn kho' },
    { no: '2', codeMaterial: 'Mã vật tư 3', nameMaterial: 'Tên vật tư', version: '1.1', norm: 'Định mức', supplierName: 'Tên nhà cung cấp', replaceMaterial: 'Vật tư thay thế', inventoryQuantity: 'Số lượng tồn kho' }
];

const data2 = [
    { codeMaterial: 'VT0001', nameMaterial: 'Chip vàng 6 chân', version: '1.1', classify: 'NVL', norm: '1', unit: 'Cái', replaceMaterialCode: 'VT002', replaceMaterialDescription: 'Vật tư 01', inventoryQuantity: 'Số lượng tồn kho' },
    { codeMaterial: 'VT0002', nameMaterial: 'Chip vàng 6 chân', version: '1.1', classify: 'NVL', norm: '1', unit: 'Cái', replaceMaterialCode: 'VT002', replaceMaterialDescription: 'Vật tư 01', inventoryQuantity: 'Số lượng tồn kho' },
    { codeMaterial: 'VT0003', nameMaterial: 'Chip vàng 6 chân', version: '1.1', classify: 'NVL', norm: '1', unit: 'Cái', replaceMaterialCode: 'VT002', replaceMaterialDescription: 'Vật tư 01', inventoryQuantity: 'Số lượng tồn kho' }
];



const ROUTING_PATH = "/BOMBodyCard";

export const BOMBodyCard = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchText, setSearchText] = React.useState("");
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);

    const [isBOMCardAddInfo, setIsBOMCardAddInfo] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const [isDetailBOM, setIsDetailBOM] = React.useState<boolean>(false);
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPage = Math.ceil(data.length / itemsPerPage);
    // const currentPageData = data.slice(startIndex, endIndex);

    const customLocale = {
        items_per_page: '/ trang',
        jump_to: 'Đi tới trang',
        page: '',
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
    };

    const currentPageDatas = data.slice(startIndex, endIndex).filter(item =>
        item.productCode.includes(searchText) ||
        item.productName.includes(searchText) ||
        item.version.includes(searchText) ||
        item.productType.includes(searchText) ||
        item.describe.includes(searchText) ||
        item.note.includes(searchText) ||
        item.status.includes(searchText)
    );
    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    }
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    }

    const handleBOMBodyCardAddInfo = () => {
        setIsBOMCardAddInfo(true);
    }
    const handleCustomFooter = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            </div>
        </div>
    ];
    return (
        <>
            {
                isBOMCardAddInfo ?
                    <BOMBodyCardAddInfo
                        isOpen={isBOMCardAddInfo}
                        setClose={() => { setIsBOMCardAddInfo(false) }}
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
                                }}>Quản lý BOM body card</h5>
                            </div>
                            <div className="informer" style={{
                                backgroundColor: "#ffffff",
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <h5 className="name" style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 10,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                    marginTop: 50,
                                }}>Tìm kiếm chung</h5>

                            </div>
                            <Input placeholder="Nhập thông tin và nhấn Enter để tìm kiếm" prefix={<SearchOutlined />} onChange={handleSearchChange} />
                            <div style={{
                                display: "flex", flexDirection: "row", justifyContent: "space-between"
                            }}>
                                <h5 style={{ marginTop: 50 }}>Danh sách BOM</h5>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: 30 }}>
                                    <SvgIcon onClick={handleBOMBodyCardAddInfo} text="Thêm mới" tooltipTitle="Thêm mới thông tin BOM body card" sizeIcon={17} textSize={17} icon="assets/icons/CirclePlus.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    {/* <SvgIcon onClick={() => setIsVisibleImportFile(true)} text="Import file" tooltipTitle="Import file" sizeIcon={17} textSize={17} icon="assets/icons/ImportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} /> */}
                                    <SvgIcon onClick={() => { }} text="Xuất Excel" tooltipTitle="Xuất Excel" sizeIcon={17} textSize={17} icon="assets/icons/ExportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    <SvgIcon onClick={() => { }} tooltipTitle="Chọn cột" sizeIcon={18} textSize={17} icon="assets/icons/ColumnChooser.svg" textColor="#FF7A00" style={{ borderRadius: '4px', border: '1px solid rgba(255, 122, 0, 0.60) ', padding: '6px' }} />
                                </div>
                            </div>
                            <div>
                                <PopupBOM
                                    isVisible={isDetailBOM}
                                    modalContent={
                                        <div>
                                            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                                <div>
                                                    <div>
                                                        <table
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-arround"
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
                                                    <div style={{ marginTop: 40 }}><h4>Danh sách vật tư</h4></div>
                                                    <DataGrid
                                                        key={'codeMaterial'}
                                                        keyExpr={"codeMaterial"}
                                                        dataSource={data2}
                                                        showBorders={true}
                                                        columnAutoWidth={true}
                                                        showRowLines={true}
                                                        rowAlternationEnabled={true}
                                                        allowColumnResizing={true}
                                                        allowColumnReordering={true}
                                                        focusedRowEnabled={true}
                                                    >
                                                        <HeaderFilter visible={true} texts={{
                                                            cancel: "Hủy bỏ",
                                                            ok: "Đồng ý",
                                                            emptyValue: "Rỗng"

                                                        }} allowSearch={true} />
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
                                                        <Column type={"buttons"} caption={"Thao tác"} alignment="center" cellRender={() =>
                                                            <div>
                                                                <SvgIcon onClick={() => setIsVisibleListMaterialReplacement(true)} tooltipTitle="Danh sách vật tư thay thế" sizeIcon={17} icon="assets/icons/EyeOpen.svg" textColor="#FF7A00" style={{ marginLeft: 35 }} />
                                                            </div>} />

                                                    </DataGrid>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        Xem chi tiết BOM
                                    </div>}
                                    width={1300}
                                    onCancel={() => setIsDetailBOM(false)}
                                    onSubmit={() => { }}
                                    customFooter={handleCustomFooter}

                                />
                                <PopupBOM
                                    isVisible={isVisibleListMaterialReplacement}
                                    modalContent={
                                        <div>
                                            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                                <div>
                                                    <div>
                                                        <table
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-arround"
                                                            }}>
                                                            <td>
                                                                <InfoRow label='Mã vật tư' data='VT001' />
                                                                <InfoRow label='Bom version' data='1.1' />
                                                            </td>
                                                            <td>
                                                                <InfoRow label='Tên vật tư' data='Mực 01' />
                                                                <InfoRow label='Trạng thái' data='Hoạt động' />
                                                            </td>
                                                        </table>
                                                    </div>
                                                    <div style={{ marginTop: 40 }}><h4>Danh sách vật tư</h4></div>
                                                    <DataGrid
                                                        key={'replaceMaterialCode'}
                                                        keyExpr={"replaceMaterialCode"}
                                                        dataSource={data2}
                                                        showBorders={true}
                                                        columnAutoWidth={true}
                                                        showRowLines={true}
                                                        rowAlternationEnabled={true}
                                                        allowColumnResizing={true}
                                                        allowColumnReordering={true}
                                                        focusedRowEnabled={true}
                                                    >
                                                        <Toolbar >
                                                            <ToolbarItem >
                                                                <SvgIcon sizeIcon={25} text="Thêm mới" tooltipTitle='Thêm vật tư thay thế cho vật tư(Sau khi ấn link sang hệ thống MDM)' icon="assets/icons/CirclePlus.svg" textColor="#FF7A00" />
                                                            </ToolbarItem>
                                                        </Toolbar>
                                                        <HeaderFilter visible={true} texts={{
                                                            cancel: "Hủy bỏ",
                                                            ok: "Đồng ý",
                                                            emptyValue: "Rỗng"

                                                        }} allowSearch={true} />
                                                        <FilterRow visible={true} />
                                                        <Column caption={"Mã vật tư thay thế"} dataField={"replaceMaterialCode"} />
                                                        <Column caption={"Tên vật tư thay thế"} dataField={"replaceMaterialName"} />
                                                        <Column caption={"Version"} dataField={"version"} />
                                                        <Column caption={"Phân loại"} dataField={"classify"} />
                                                        <Column caption={"Định mức"} dataField={"norm"} />
                                                        <Column caption={"Đơn vị tính"} dataField={"unit"} />
                                                        <Column caption={"Số lượng tồn kho"} dataField={"inventoryQuantity"} />
                                                    </DataGrid>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        Danh sách vật tư thay thế
                                    </div>}
                                    width={1300}
                                    onCancel={() => setIsVisibleListMaterialReplacement(false)}
                                    onSubmit={() => { }}
                                    customFooter={handleCustomFooter}

                                />
                                <PopupImportFile visible={isVisibleImportFile} onCancel={() => setIsVisibleImportFile(false)} title={'Import file'} onSubmit={() => { }} width={900} />
                                <PopupConfirmDelete
                                    isVisible={isConfirmDelete}
                                    onCancel={handleHideModalDel}
                                    onSubmit={() => console.log('ok')}
                                    modalTitle={
                                        <div>
                                            <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500, fontSize: 25 }}>
                                                <InfoCircleOutlined style={{ color: '#ff794e', marginRight: '8px', display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30 }} />
                                                Xác nhận xóa?
                                            </h3>
                                        </div>
                                    }
                                    modalContent={<div><h5 style={{ height: 80, fontWeight: 400, marginTop: 30, fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>Bạn có chắc chắn muốn thực hiện thao tác xóa không?</h5></div>}
                                    width={600} />
                                <Table
                                    dataSource={currentPageDatas}
                                    rowKey="productCode"
                                    size="small"
                                    bordered
                                    style={{ marginTop: 30 }}
                                    pagination={false}
                                >
                                    <Table.Column title="Mã sản phẩm" dataIndex="productCode" sorter={true} />
                                    <Table.Column title="Tên sản phẩm" dataIndex="productName" sorter={true} />
                                    <Table.Column title="Version" dataIndex="version" sorter={true} />
                                    <Table.Column title="Phân loại sản phẩm" dataIndex="productType"
                                        filters={[
                                            {
                                                text: 'Thành phẩm',
                                                value: 'Thành phẩm',
                                            },
                                            {
                                                text: 'Nguyên vật liệu',
                                                value: 'Nguyên vật liệu',
                                            },
                                        ]}
                                        filterSearch={true}
                                        onFilter={(value, record: any) => record.productType.includes(value)}
                                        filterMode="tree"
                                        sorter={true}
                                    />
                                    <Table.Column title="Mô tả" dataIndex="describe" sorter={true} />
                                    <Table.Column title="Lưu ý" dataIndex="notice" sorter={true} />
                                    <Table.Column title="Ghi chú" dataIndex="note" sorter={true} />
                                    <Table.Column title="Trạng thái" dataIndex="status" sorter={true} />
                                    <Table.Column
                                        title="Thao tác"
                                        align="center"
                                        render={() =>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                <SvgIcon onClick={() => setIsDetailBOM(true)} tooltipTitle="Thông tin" sizeIcon={17} textSize={17} icon="assets/icons/InfoCircle.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                                <SvgIcon onClick={handleShowModalDel} tooltipTitle="Xóa" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" />
                                            </div>
                                        }
                                    />
                                </Table>
                                <Pagination
                                    className="custom-pagination"
                                    style={{ marginTop: 20, paddingBottom: 20 }}
                                    total={data.length}
                                    locale={customLocale}
                                    showSizeChanger
                                    showQuickJumper
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    onChange={(page) => setCurrentPage(page)}
                                    showTotal={(total) => `Trang số ${currentPage} của ${totalPage} (${total} bản ghi)`}
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    )

}

registerScreen({
    caption: "Quản lý BOM body card",
    component: BOMBodyCard,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "bomBodyCard"
});

export default BOMBodyCard;