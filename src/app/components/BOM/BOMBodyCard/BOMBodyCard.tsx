import React from "react";
import { Button, DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    Selection,
    ColumnChooser,
    Button as ButtonB,
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import "./BOMBodyCard.css";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import BOMBodyCardAddInfo from "./BOMBodyCardAddInfo/BOMBodyCardAddInfo";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
// import { Table } from "antd";
import { useMainStore } from "@haulmont/jmix-react-core";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";

const data = [
    {
        productCode: "SP01",
        productName: "Sản phẩm 1",
        version: "1.1",
        productType: "Thành phẩm",
        describe: "Mô tả",
        note: "Lưu ý",
        noted: "Ghi chú",
        status: "Hoạt động",
    },
    {
        productCode: "SP02",
        productName: "Sản phẩm 2",
        version: "1.2",
        productType: "Thành phẩm",
        describe: "Mô tả",
        note: "Lưu ý",
        noted: "Ghi chú",
        status: "Hoạt động",
    },
    {
        productCode: "SP03",
        productName: "Sản phẩm 3",
        version: "1.3",
        productType: "Thành phẩm",
        describe: "Mô tả",
        note: "Lưu ý",
        noted: "Ghi chú",
        status: "Ngừng hoạt động",
    },
    {
        productCode: "SP04",
        productName: "Sản phẩm 4",
        version: "1.4",
        productType: "Thành phẩm",
        describe: "Mô tả",
        note: "Lưu ý",
        noted: "Ghi chú",
        status: "Hoạt động",
    },
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
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, "all"];

    const [isBOMCardAddInfo, setIsBOMCardAddInfo] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const [isDetailBOM, setIsDetailBOM] = React.useState<boolean>(false);
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);

    const [bom, setBom] = React.useState<any>({});

    const [bomIdChoosed, setBomIdChoosed] = React.useState<Number | null>(null);

    const mainStore = useMainStore();

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    };
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    };

    const handleBOMBodyCardAddInfo = (cellInfo) => {
        console.log(cellInfo);
        setBomIdChoosed(cellInfo.data.id);
        setIsBOMCardAddInfo(true);
    };

    React.useEffect(() => {
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        axios.get(PLANNING_API_URL + "/api/boms", { headers }).then((response) => {
            if (response.status === 200) {
                setBom(response.data.data);
            }
        });
    }, []);

    return (
        <>
            {isBOMCardAddInfo ? (
                <BOMBodyCardAddInfo
                    id={bomIdChoosed}
                    isOpen={isBOMCardAddInfo}
                    setClose={() => {
                        setIsBOMCardAddInfo(false);
                        setBomIdChoosed(null);
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
                                Quản lý BOM body card
                            </h5>
                        </div>
                        <div
                            className='informer'
                            style={{
                                backgroundColor: "#ffffff",
                                display: "flex",
                                justifyContent: "space-between",
                            }}>
                            <h5
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 10,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                }}>
                                Tìm kiếm chung
                            </h5>
                        </div>
                        <div>
                            <DataGrid
                                key='productCode'
                                keyExpr={"productCode"}
                                dataSource={bom.data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}>
                                <PopupImportFile
                                    visible={isVisibleImportFile}
                                    onCancel={() => setIsVisibleImportFile(false)}
                                    title={"Import file"}
                                    onSubmit={() => {}}
                                    width={900}
                                />
                                <PopupConfirmDelete
                                    isVisible={isConfirmDelete}
                                    onCancel={handleHideModalDel}
                                    onSubmit={() => console.log("ok")}
                                    modalTitle={
                                        <div>
                                            <InfoCircleOutlined
                                                style={{
                                                    color: "#ff794e",
                                                    marginRight: "8px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontSize: 30,
                                                }}
                                            />
                                            <h3
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "#ff794e",
                                                    fontWeight: 500,
                                                    marginTop: 20,
                                                    fontSize: 25,
                                                }}>
                                                Xác nhận xóa?
                                            </h3>
                                        </div>
                                    }
                                    modalContent={
                                        <div>
                                            <h5
                                                style={{
                                                    height: 80,
                                                    fontWeight: 400,
                                                    marginTop: 30,
                                                    fontSize: 20,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                Bạn có chắc chắn muốn thực hiện thao tác xóa không?
                                            </h5>
                                        </div>
                                    }
                                    width={600}
                                />
                                <Toolbar>
                                    <ToolbarItem>
                                        <SvgIcon
                                            onClick={() => setIsVisibleImportFile(true)}
                                            text='Import file'
                                            tooltipTitle='Import file'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/ImportFile.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                    </ToolbarItem>
                                    <ToolbarItem>
                                        <SvgIcon
                                            onClick={() => {}}
                                            text='Xuất Excel'
                                            tooltipTitle='Xuất Excel'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/ExportFile.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                    </ToolbarItem>
                                    <ToolbarItem name='searchPanel' location='before' />
                                    <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
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
                                <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                                <Paging defaultPageSize={10} />
                                <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                                <Pager
                                    visible={true}
                                    allowedPageSizes={allowedPageSizes}
                                    displayMode={"compact"}
                                    showPageSizeSelector={true}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                />
                                <Column dataField='productCode' minWidth={140} caption='Mã sản phẩm'></Column>
                                <Column dataField='productName' caption='Tên sản phẩm' minWidth={200}></Column>

                                <Column dataField='version' minWidth={140} caption='Version' alignment='left'></Column>

                                <Column dataField='productClassify' caption='Phân loại sản phẩm' alignment={"left"} minWidth={140}></Column>
                                <Column dataField='describe' caption='Mô tả ' />
                                <Column dataField='notice' caption='Lưu ý' />
                                <Column dataField='note' alignment={"left"} caption={"Ghi chú"} width={140}></Column>
                                <Column caption={"Trạng thái"} dataField='status' />
                                <Column
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='left'
                                    cellRender={(cellInfo) => (
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon
                                                onClick={() => {}}
                                                tooltipTitle='Thông tin'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={() => {
                                                    handleBOMBodyCardAddInfo(cellInfo);
                                                }}
                                                tooltipTitle='Thêm mới thông tin BOM body card'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Add.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={handleShowModalDel}
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
                    <div>
                        <PopupImportFile
                            visible={isVisibleImportFile}
                            onCancel={() => setIsVisibleImportFile(false)}
                            title={"Import file"}
                            onSubmit={() => {}}
                            width={900}
                        />
                        <PopupConfirmDelete
                            isVisible={isConfirmDelete}
                            onCancel={handleHideModalDel}
                            onSubmit={() => console.log("ok")}
                            modalTitle={
                                <div>
                                    <h3
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#ff794e",
                                            fontWeight: 500,
                                            fontSize: 25,
                                        }}>
                                        <InfoCircleOutlined
                                            style={{
                                                color: "#ff794e",
                                                marginRight: "8px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontSize: 30,
                                            }}
                                        />
                                        Xác nhận xóa?
                                    </h3>
                                </div>
                            }
                            modalContent={
                                <div>
                                    <h5
                                        style={{
                                            height: 80,
                                            fontWeight: 400,
                                            marginTop: 30,
                                            fontSize: 20,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                        Bạn có chắc chắn muốn thực hiện thao tác xóa không?
                                    </h5>
                                </div>
                            }
                            width={600}
                        />
                        {/* <Table
                                dataSource={data}
                                rowKey='productCode'
                                size='small'
                                pagination={{ defaultPageSize: 10 }}
                                bordered
                                style={{ marginTop: 30 }}>
                                <Table.Column title='Mã sản phẩm' dataIndex='productCode' filterSearch={true} />
                                <Table.Column title='Tên sản phẩm' dataIndex='productName' filterSearch={true} />
                                <Table.Column title='Version' dataIndex='version' filterSearch={true} />
                                <Table.Column title='Phân loại sản phẩm' dataIndex='productType' />
                                <Table.Column title='Mô tả' dataIndex='describe' />
                                <Table.Column title='Lưu ý' dataIndex='note' />
                                <Table.Column title='Ghi chú' dataIndex='note' />
                                <Table.Column title='Trạng thái' dataIndex='status' />
                                <Table.Column
                                    title='Thao tác'
                                    align='center'
                                    render={() => (
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon
                                                onClick={() => {}}
                                                tooltipTitle='Thông tin'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={handleBOMBodyCardAddInfo}
                                                tooltipTitle='Thêm mới thông tin BOM body card'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Add.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={handleShowModalDel}
                                                tooltipTitle='Xóa'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Trash.svg'
                                                textColor='#FF7A00'
                                            />
                                        </div>
                                    )}
                                />
                            </Table> */}
                    </div>
                </div>
            )}
        </>
    );
};

registerScreen({
    caption: "Quản lý BOM body card",
    component: BOMBodyCard,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
    screenId: "bomBodyCard",
});

export default BOMBodyCard;
