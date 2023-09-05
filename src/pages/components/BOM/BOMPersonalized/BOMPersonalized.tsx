import React, { useState } from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    MasterDetail,
    ColumnChooser,
} from "devextreme-react/data-grid";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import BOMPersonalizedDetail from "./BOMPersonalizedDetail";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";

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

const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];
export const BOMPersonalized = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);

    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "BOM-manage",
                        title: "Quản lý BOM",
                    },
                    {
                        key: "BOM-personalized",
                        title: "Quản lý BOM cá thể hóa",
                    }
                ]
            })
        }
    }, []);

    const handleShowUploadImport = () => {
        setPopupVisible(true);
    };

    const getProductOrderItemTemplate = (row: any) => {
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
                        <PopupImportFile
                            visible={popupVisible}
                            onCancel={() => setPopupVisible(false)}
                            title={"Import file"}
                            onSubmit={() => { }}
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
                                        icon='assets/icons/CircleAdd.svg'
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
                                <ToolbarItem name='searchPanel' location='before' />
                                <ToolbarItem name='columnChooserButton' />
                            </Toolbar>
                            <FilterRow visible={true} />
                            <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
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
                                            onClick={() => { }}
                                            tooltipTitle='Thông tin'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/InfoCircle.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => { }}
                                            tooltipTitle='Thêm mới'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Add.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => { }}
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

export default BOMPersonalized;