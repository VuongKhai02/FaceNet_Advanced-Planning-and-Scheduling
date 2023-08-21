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
    Toolbar,
    Selection, ColumnChooser, Button as ButtonB
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import "./BOMBodyCard.css";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { InfoCircleOutlined } from "@ant-design/icons";
import BOMBodyCardAddInfo from "./BOMBodyCardAddInfo/BOMBodyCardAddInfo";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";


const data = [
    { productCode: 'SP01', productName: 'Sản phẩm 1', version: '1.1', productType: 'Thành phẩm', describe: 'Mô tả', note: 'Lưu ý', noted: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP02', productName: 'Sản phẩm 2', version: '1.2', productType: 'Thành phẩm', describe: 'Mô tả', note: 'Lưu ý', noted: 'Ghi chú', status: 'Hoạt động' },
    { productCode: 'SP03', productName: 'Sản phẩm 3', version: '1.3', productType: 'Thành phẩm', describe: 'Mô tả', note: 'Lưu ý', noted: 'Ghi chú', status: 'Ngừng hoạt động' },
    { productCode: 'SP04', productName: 'Sản phẩm 4', version: '1.4', productType: 'Thành phẩm', describe: 'Mô tả', note: 'Lưu ý', noted: 'Ghi chú', status: 'Hoạt động' }

];


const ROUTING_PATH = "/BOMBodyCard";

export const BOMBodyCard = () => {

    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

    const [isBOMCardAddInfo, setIsBOMCardAddInfo] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    }
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    }

    const handleBOMBodyCardAddInfo = () => {
        setIsBOMCardAddInfo(true);
    }

    return (
        <>
            {
                isBOMCardAddInfo ?
                    <BOMBodyCardAddInfo
                        isOpen={isBOMCardAddInfo}
                        setClose={() => { setIsBOMCardAddInfo(false) }}
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
                                }}>Quản lý BOM body card</h5>
                            </div>
                            <div className="informer" style={{
                                backgroundColor: "#ffffff",
                                paddingLeft: 13
                            }}>
                                <h5 className="name" style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 0,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550
                                }}>Tìm kiếm chung</h5>
                            </div>
                            <div>
                                <DataGrid
                                    key="productCode"
                                    keyExpr={"productCode"}
                                    dataSource={data}
                                    showBorders={true}
                                    columnAutoWidth={true}
                                    showRowLines={true}
                                    rowAlternationEnabled={true}
                                    allowColumnResizing={true}
                                    allowColumnReordering={true}
                                    focusedRowEnabled={true}

                                >
                                    <PopupImportFile visible={isVisibleImportFile} onCancel={() => setIsVisibleImportFile(false)} title={'Import file'} onSubmit={() => { }} width={900} />
                                    <PopupConfirmDelete
                                        isVisible={isConfirmDelete}
                                        onCancel={handleHideModalDel}
                                        onSubmit={() => console.log('ok')
                                        }
                                        modalTitle={
                                            <div>
                                                <InfoCircleOutlined style={{ color: '#ff794e', marginRight: '8px', display: "flex", justifyContent: "center", alignItems: "center", fontSize: 50 }} />
                                                <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500, marginTop: 20, fontSize: 30 }}>
                                                    Xác nhận xóa?
                                                </h3>
                                                <h5 style={{ fontWeight: 400, marginTop: 30, fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>Bạn có chắc chắn muốn thực hiện thao tác xóa không?</h5>
                                            </div>
                                        }
                                        modalContent={''}
                                        width={600} />
                                    <Toolbar>
                                        <ToolbarItem >
                                            <Button
                                                onClick={() => setIsVisibleImportFile(true)}
                                                icon="upload"
                                                text="Import file" />
                                        </ToolbarItem>
                                        <ToolbarItem >
                                            <Button
                                                icon="download"
                                                text="Xuất Excel" />
                                        </ToolbarItem>
                                        <ToolbarItem name="searchPanel" location="before" />
                                        <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                    </Toolbar>
                                    <HeaderFilter visible={true} texts={{
                                        cancel: "Hủy bỏ",
                                        ok: "Đồng ý",
                                        emptyValue: "Rỗng"

                                    }} allowSearch={true} />
                                    <FilterRow visible={true} />
                                    <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                                    <Paging defaultPageSize={10} />
                                    <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
                                    <Pager
                                        visible={true}
                                        allowedPageSizes={allowedPageSizes}
                                        displayMode={"compact"}
                                        showPageSizeSelector={true}
                                        showInfo={true}
                                        showNavigationButtons={true}
                                        infoText="Trang số {0} trên {1} ({2} bản ghi)" />
                                    <Column dataField="productCode"
                                        minWidth={140}
                                        caption="Mã sản phẩm"
                                    >
                                    </Column>
                                    <Column dataField="productName"
                                        caption="Tên sản phẩm"
                                        minWidth={200}
                                    >
                                    </Column>

                                    <Column dataField="version"
                                        minWidth={140}
                                        caption="Version"
                                        alignment="left"
                                    >
                                    </Column>

                                    <Column dataField="productType"
                                        caption="Phân loại sản phẩm"
                                        alignment={"left"}
                                        minWidth={140}
                                    >
                                    </Column>
                                    <Column dataField="describe" caption="Mô tả " />
                                    <Column dataField="note" caption="Lưu ý" />
                                    <Column
                                        dataField="note"
                                        alignment={"left"}
                                        caption={"Ghi chú"}
                                        width={140}
                                    >
                                    </Column>
                                    <Column caption={"Trạng thái"} dataField="status" />
                                    <Column type={'buttons'} caption={"Thao tác"} alignment="left" >
                                        <ButtonB icon="info" />
                                        <ButtonB icon='add' onClick={handleBOMBodyCardAddInfo} />
                                        <ButtonB icon='trash' onClick={handleShowModalDel} />
                                    </Column>
                                </DataGrid>
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