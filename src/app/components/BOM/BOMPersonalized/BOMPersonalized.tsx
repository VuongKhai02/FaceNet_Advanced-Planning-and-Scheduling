import React, { useEffect, useState } from "react";
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
    MasterDetail,
    ColumnChooser,
    Button as ButtonIcon,
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";
import BOMPersonalizedDetail from "./BOMPersonalizedDetail";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";

const data = [
    {
        cardTypeCode: "TH01",
        cardTypeName: "Sản phẩm 1",
        version: "1.1",
        productClassify: "Thành phẩm",
        descript: "Mô tả",
        note: "Lưu ý",
        noted: "Ghi chú",
        status: "Hoạt động",
    },
    {
        cardTypeCode: "TH02",
        cardTypeName: "Sản phẩm 1",
        version: "1.1",
        productClassify: "Thành phẩm",
        descript: "Mô tả",
        note: "Lưu ý",
        noted: "Ghi chú",
        status: "Hoạt động",
    },
];

const ROUTING_PATH = "/BOMPersonalized";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, "all"];
export const BOMPersonalized = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);

    const handleShowUploadImport = () => {
        setPopupVisible(true);
    };

    const getProductOrderItemTemplate = (row) => {
        return <BOMPersonalizedDetail data={row.data} />;
    };

    const handleAddFormTech = () => {
        setIsAddNewTechForm(true);
    };

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
                                Quản lý BOM cá thể hóa
                            </h5>
                        </div>
                        <div
                            className='informer'
                            style={{
                                backgroundColor: "#ffffff",
                            }}>
                            <h5
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 0,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                }}>
                                Tìm kiếm chung
                            </h5>
                        </div>
                        <PopupImportFile
                            visible={popupVisible}
                            onCancel={() => setPopupVisible(false)}
                            title={"Import file"}
                            onSubmit={() => {}}
                            width={900}
                        />
                        <DataGrid
                            key={"cardTypeCode"}
                            keyExpr={"cardTypeCode"}
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
                                        onClick={handleAddFormTech}
                                        text='Thêm mới'
                                        tooltipTitle='Thêm mới'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/Add.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem>
                                    <SvgIcon
                                        onClick={() => setPopupVisible(true)}
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
                                <ToolbarItem name='columnChooserButton' />
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
                            <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={320} />
                            <ColumnChooser enabled={true} allowSearch={true} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />
                            <Column caption={"Mã loại thẻ"} dataField={"cardTypeCode"} alignment='left' width={100} />
                            <Column caption={"Tên loại thẻ"} dataField={"cardTypeName"} />
                            <Column caption={"Version"} dataField={"version"} />
                            <Column caption={"Phân loại sản phẩm"} dataField={"productClassify"} />
                            <Column caption={"Mô tả"} dataField={"descript"} />
                            <Column caption={"Lưu ý"} dataField={"note"} />
                            <Column caption={"Ghi chú"} dataField={"noted"} />
                            <Column caption={"Trạng thái"} dataField='status' />
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='left'
                                cellRender={() => (
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
                                            onClick={() => {}}
                                            tooltipTitle='Thêm mới'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Add.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => {}}
                                            tooltipTitle='Xóa'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                        />
                                    </div>
                                )}></Column>

                            <MasterDetail
                                enabled={true}
                                component={getProductOrderItemTemplate}
                                // autoExpandAll={true}
                            />
                        </DataGrid>
                    </div>
                </div>
            }
        </>
    );
};

registerScreen({
    caption: "Quản lý BOM cá thể hóa",
    component: BOMPersonalized,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
    screenId: "bomPersonalized",
});

export default BOMPersonalized;
