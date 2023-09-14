import React, { useState } from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    MasterDetail,
    ColumnChooser,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import BOMPersonalizedDetail from "./BOMPersonalizedDetail";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { WarningOutlined } from "@ant-design/icons";
import PopupBOM from "../../../../shared/components/PopupBOM/PopupBOM";
import { Button, Tag } from "antd";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import BOMPersonalizedAddInfoProduct from "./BOMPersonalizedAddInfoProduct/BOMPersonalizedAddInfoProduct";
import BOMPersonalizedAddInfoTemplate from "./BOMPersonalizedAddInfoTemplate/BOMPersonalizedAddInfoTemplate";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import styles from "./BOMPersonalized.module.css";
import classNames from "classnames/bind";
import { customizeColor } from "../../../../utils/utils";
import { Status } from "../BOMBodyCard/ListProduct/ListProduct";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
const data = [
    {
        value: 0,
        customerCode: "TH01",
        customerName: "Sản phẩm 1",
        version: "1.1",
        notice: "Lưu ý",
        note: "Ghi chú",
        status: "Hoạt động",
    },
    {
        value: 1,
        customerCode: "TH02",
        customerName: "Sản phẩm 2",
        version: "1.2",
        notice: "Lưu ý",
        note: "Ghi chú",
        status: "Ngừng hoạt động",
    },
];

const data2 = [
    {
        id: 1,
        codeMaterial: "VT0001",
        nameMaterial: "Chip vàng 6 chân",
        materialNameReplace: "Mực 02",
        materialCodeReplace: "VT0001",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        warehouseCode: "KH01",
        inventoryQuantity: "1000",
        availableQuantity: "500",
        front: "Yes",
        back: "No",
        type: "By unit"
    },
    {
        id: 2,
        codeMaterial: "VT0001",
        nameMaterial: "Chip vàng 6 chân",
        version: "1.2",
        materialNameReplace: "Mực 02",
        materialCodeReplace: "VT0001",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        warehouseCode: "KH01",
        inventoryQuantity: "1000",
        availableQuantity: "500",
        front: "Yes",
        back: "No",
        type: "By unit"
    },
    {
        id: 3,
        codeMaterial: "VT0001",
        nameMaterial: "Chip vàng 6 chân",
        version: "1.3",
        materialNameReplace: "Mực 02",
        materialCodeReplace: "VT0001",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        warehouseCode: "KH01",
        inventoryQuantity: "1000",
        availableQuantity: "500",
        front: "Yes",
        back: "No",
        type: "By unit"
    },
];

export const BOMPersonalized = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isChangeState, setIsChangeState] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isBOMPersonalizedAddInfoProduct, setIsBOMPersonalizedAddInfoProduct] = React.useState<boolean>(false);
    const [isBOMPersonalizedAddTemplate, setIsBOMPersonalizedAddTemplate] = React.useState<boolean>(false);
    const [isDetailBOM, setIsDetailBOM] = React.useState<boolean>(false);
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const breadcrumbContext = useBreadcrumb();
    const { t } = useTranslation(["common"]);
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


    const handleGotoBOMPersonalizedDetail = (row: any) => {
        return <BOMPersonalizedDetail data={row.data} />;
    };

    const handleCustomFooter = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}></div>
        </div>
    ];

    const handleCustomFooterButtonChangeState = [
        <div>
            <div className={cx("footer-container")}>
                <Button
                    key='cancel'
                    className={cx("btn-cancel")}
                    onClick={() => setIsChangeState(false)}>
                    Hủy bỏ
                </Button>
                <Button
                    className={cx("btn-save")}
                    key='submit'
                    onClick={() => { }}
                >
                    Xác nhận
                </Button>
            </div>
        </div>
    ];

    const onStatusRender = (value: any) => {
        return data.map((item) => {
            console.log('item status', item.value);
            const customColor = customizeColor(item.status);
            return (
                <Tag
                    key={item.value}
                    style={{
                        fontSize: '14px',
                        padding: '7px',
                        width: '100%',
                        textAlign: 'center',
                        color: customColor.color,
                        backgroundColor: customColor.backgroundColor,
                        borderRadius: '4px',
                        border: 'none',
                        fontWeight: customColor.fontWeight,
                    }}
                >
                    {item.status}
                </Tag>
            );
        });
    };


    return (
        <>
            {isBOMPersonalizedAddInfoProduct ? (
                <BOMPersonalizedAddInfoProduct
                    requestInfo={{}}
                    techFormId={null}
                    id={2}
                    isOpen={isBOMPersonalizedAddInfoProduct}
                    setClose={() => {
                        setIsBOMPersonalizedAddInfoProduct(false);
                    }}
                />
            ) : isBOMPersonalizedAddTemplate ? (
                <BOMPersonalizedAddInfoTemplate
                    isOpen={isBOMPersonalizedAddTemplate}
                    setClose={() => {
                        setIsBOMPersonalizedAddTemplate(false);
                    }}
                />
            ) :
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
                        <PopupBOM
                            isVisible={isVisibleListMaterialReplacement}
                            modalContent={
                                <div>
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <div>
                                            <div>
                                                <table
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-arround",
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
                                            <DataGrid
                                                key={"id"}
                                                keyExpr={"id"}
                                                dataSource={data2}
                                                showBorders={true}
                                                columnAutoWidth={true}
                                                showRowLines={true}
                                                rowAlternationEnabled={true}
                                                allowColumnResizing={true}
                                                allowColumnReordering={true}
                                                focusedRowEnabled={true}>
                                                <Toolbar>
                                                    <ToolbarItem location='before'>
                                                        <div style={{ fontSize: 20, fontWeight: 500 }}>
                                                            <p>Danh sách vật tư</p>
                                                        </div>
                                                    </ToolbarItem>
                                                    <ToolbarItem>
                                                        <SvgIcon
                                                            sizeIcon={25}
                                                            text='Thêm mới'
                                                            tooltipTitle='Thêm vật tư thay thế cho vật tư(Sau khi ấn link sang hệ thống MDM)'
                                                            icon='assets/icons/CircleAdd.svg'
                                                            textColor='#FF7A00'
                                                        />
                                                    </ToolbarItem>
                                                </Toolbar>
                                                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                                    <OperationDescriptions
                                                        startsWith={t("common.startsWith")}
                                                        equal={t("common.equal")}
                                                        endsWith={t("common.endsWith")}
                                                        contains={t("common.contains")}
                                                        notContains={t("common.notContains")}
                                                        notEqual={t("common.notEqual")}
                                                        lessThan={t("common.lessThan")}
                                                        lessThanOrEqual={t("common.lessThanOrEqual")}
                                                        greaterThan={t("common.greaterThan")}
                                                        greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                                        between={t("common.between")}
                                                    />
                                                </FilterRow>
                                                <Column caption={"Mã vật tư thay thế"} dataField={"materialCodeReplace"} />
                                                <Column caption={"Tên vật tư thay thế"} dataField={"materialNameReplace"} />
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
                            modalTitle={
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <SvgIcon
                                        sizeIcon={25}
                                        icon='assets/icons/Announcement.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                    Danh sách vật tư thay thế
                                </div>
                            }
                            width={1300}
                            onCancel={() => setIsVisibleListMaterialReplacement(false)}
                            onSubmit={() => { }}
                            customFooter={handleCustomFooter}
                        />
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
                            isVisible={isDetailBOM}
                            modalContent={
                                <div>
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <div>
                                            <div>
                                                <table
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-arround",
                                                    }}>
                                                    <td>
                                                        <InfoRow label='Mã khách hàng' data='TH001' />
                                                        <InfoRow label='Bom version' data='1.1' />
                                                    </td>
                                                    <td>
                                                        <InfoRow label='Tên khách hàng' data='TP Bank' />
                                                        <InfoRow label='Trạng thái' data='Hoạt động' />
                                                    </td>
                                                </table>
                                            </div>
                                            <div style={{ marginTop: 40, fontSize: 20, fontWeight: 500 }}>
                                                <p>Danh sách vật tư</p>
                                            </div>
                                            <DataGrid
                                                key={"id"}
                                                keyExpr={"id"}
                                                dataSource={data2}
                                                showBorders={true}
                                                columnAutoWidth={true}
                                                showRowLines={true}
                                                rowAlternationEnabled={true}
                                                allowColumnResizing={true}
                                                allowColumnReordering={true}
                                                focusedRowEnabled={true}>
                                                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                                    <OperationDescriptions
                                                        startsWith={t("common.startsWith")}
                                                        equal={t("common.equal")}
                                                        endsWith={t("common.endsWith")}
                                                        contains={t("common.contains")}
                                                        notContains={t("common.notContains")}
                                                        notEqual={t("common.notEqual")}
                                                        lessThan={t("common.lessThan")}
                                                        lessThanOrEqual={t("common.lessThanOrEqual")}
                                                        greaterThan={t("common.greaterThan")}
                                                        greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                                        between={t("common.between")}
                                                    />
                                                </FilterRow>
                                                <Column caption={"Mã vật tư"} dataField={"codeMaterial"} />
                                                <Column caption={"Tên vật tư"} dataField={"nameMaterial"} />
                                                <Column caption={"Version"} dataField={"version"} />
                                                <Column caption={"Phân loại"} dataField={"classify"} />
                                                <Column caption={"Định mức"} dataField={"norm"} />
                                                <Column caption={"Đơn vị tính"} dataField={"unit"} />
                                                <Column caption="Mã kho" dataField="warehouseCode" />
                                                <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                                                <Column caption="Số lượng sẵn sàng" dataField="availableQuantity" />
                                                <Column caption="Phân loại" dataField="type" />
                                                <Column
                                                    fixed={true}
                                                    type={"buttons"}
                                                    caption={"Thao tác"}
                                                    alignment='center'
                                                    cellRender={() => (
                                                        <div>
                                                            <SvgIcon
                                                                onClick={() => setIsVisibleListMaterialReplacement(true)}
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
                                    <SvgIcon
                                        sizeIcon={25}
                                        icon='assets/icons/Announcement.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                    Xem chi tiết BOM mẫu
                                </div>
                            }
                            width={1300}
                            onCancel={() => setIsDetailBOM(false)}
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
                        <DataGrid
                            key={"customerCode"}
                            keyExpr={"customerCode"}
                            dataSource={dataPage}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            noDataText={t("common.noData-text")}
                        >
                            <Toolbar>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        onClick={() => setIsBOMPersonalizedAddTemplate(true)}
                                        text='Thêm mới'
                                        tooltipTitle='Thêm mới thông tin BOM mẫu'
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
                            <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                <OperationDescriptions
                                    startsWith={t("common.startsWith")}
                                    equal={t("common.equal")}
                                    endsWith={t("common.endsWith")}
                                    contains={t("common.contains")}
                                    notContains={t("common.notContains")}
                                    notEqual={t("common.notEqual")}
                                    lessThan={t("common.lessThan")}
                                    lessThanOrEqual={t("common.lessThanOrEqual")}
                                    greaterThan={t("common.greaterThan")}
                                    greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                    between={t("common.between")}
                                />
                            </FilterRow>
                            <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />
                            <ColumnChooser enabled={true} allowSearch={true} mode='select' />

                            <Column caption={"Mã khách hàng"} dataField={"customerCode"} alignment='left' />
                            <Column caption={"Tên khách hàng"} dataField={"customerName"} />
                            <Column caption={"Version"} dataField={"version"} />
                            <Column caption={"Lưu ý"} dataField={"notice"} />
                            <Column caption={"Ghi chú"} dataField={"note"} />
                            <Column caption={"Trạng thái"} dataField='status' alignment={'left'} cellRender={(cellInfo) => {
                                return <Status value={cellInfo.data.value} />

                            }} />
                            <Column
                                fixed={true}
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon
                                            onClick={() => setIsDetailBOM(true)}
                                            tooltipTitle='Thông tin chi tiết BOM mẫu'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/InfoCircle.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => setIsBOMPersonalizedAddInfoProduct(true)}
                                            tooltipTitle='Thêm mới BOM sản phẩm'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Add.svg'
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
                                        // style={{ marginRight: 17 }}
                                        />
                                        {/* <SvgIcon
                                            onClick={() => setIsConfirmDelete(true)}
                                            tooltipTitle='Xóa'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                        /> */}
                                    </div>
                                )}></Column>

                            <MasterDetail
                                enabled={true}
                                render={handleGotoBOMPersonalizedDetail}
                            />
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
            }
        </>
    );
};

export default BOMPersonalized;
