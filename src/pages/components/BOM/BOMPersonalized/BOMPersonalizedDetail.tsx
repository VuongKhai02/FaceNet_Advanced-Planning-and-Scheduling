import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import DataGrid, {
    Column,
    FilterRow,
    Toolbar,
    Item as TItem,
    OperationDescriptions,
    ColumnChooser,
} from "devextreme-react/data-grid";
import PopupSendSAP from "../../../../shared/components/PopupSendSAP/PopupSendSAP";
import { WarningOutlined } from "@ant-design/icons";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import PopupBOM from "../../../../shared/components/PopupBOM/PopupBOM";
import { Button } from "antd";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";

import styles from "./BOMPersonalizedDetail.module.css";
import classNames from "classnames/bind";
import { Status } from "../BOMBodyCard/ListProduct/ListProduct";
import NotificationManager from "../../../../utils/NotificationManager";

const cx = classNames.bind(styles);
const data = [
    {
        id: 1,
        value: 0,
        cardCode: "SP091",
        cardName: "Sản phẩm 09.1",
        bomVersion: "1.1",
        notice: "VT001",
        note: "Vật tư 01",
        status: "Hoạt động",
    },
    {
        id: 2,
        value: 1,
        cardCode: "SP092",
        cardName: "Sản phẩm 09.2",
        bomVersion: "1.2",
        notice: "VT002",
        note: "Vật tư 02",
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

export const BOMPersonalizedDetail = React.memo((props: any) => {
    const [isModalVisibleSendSAP, setIsModalVisibleSendSAP] = React.useState<boolean>(false);
    const [isChangeState, setIsChangeState] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isDetailBOMTemplate, setIsDetailBOMTemplate] = React.useState<boolean>(false);
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);
    const { t } = useTranslation("common");
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    const loadProductOrderItem = () => { };
    const loadProduct = () => { };

    useEffect(() => {
        loadProduct();
        loadProductOrderItem();
        loadBranchGroup();
    }, []);

    const onEdit = async () => { };
    const onDelete = () => { };
    const onInsert = async () => { };
    const loadBranchGroup = () => { };

    const handleHideModalSendSAP = () => {
        setIsModalVisibleSendSAP(false);
    };

    const handleConfirmSendSAP = () => {
        setIsModalVisibleSendSAP(false);
    };

    const handleCustomFooter = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}></div>
        </div>,
    ];
    const Notification = () => {
        NotificationManager.success(t("Xóa dữ liệu thành công!"))
    }
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

    return (
        <div>
            <DataGrid
                id='gridContainer'
                dataSource={dataPage}
                keyExpr='id'
                height={"auto"}
                onRowUpdating={onEdit}
                onRowInserting={onInsert}
                onRowRemoving={onDelete}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText={t("common.noData-text")}>

                <PopupBOM
                    isVisible={isDetailBOMTemplate}
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
                                                <InfoRow label='Mã thẻ' data='TH001' />
                                                <InfoRow label='Bom version' data='1.1' />
                                            </td>
                                            <td>
                                                <InfoRow label='Tên thẻ' data='Thẻ visa TP Bank' />
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
                            <SvgIcon sizeIcon={25} icon='assets/icons/Announcement.svg' textColor='#FF7A00' style={{ marginRight: 17 }} />
                            Xem chi tiết BOM sản phẩm
                        </div>
                    }
                    width={1300}
                    onCancel={() => setIsDetailBOMTemplate(false)}
                    onSubmit={() => { }}
                    customFooter={handleCustomFooter}
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
                                            <TItem location='before'>
                                                <div>
                                                    <p style={{ fontSize: 20, fontWeight: 500 }}>Danh sách vật tư</p>
                                                </div>
                                            </TItem>
                                            <TItem>
                                                <SvgIcon
                                                    sizeIcon={25}
                                                    text='Thêm mới'
                                                    tooltipTitle='Thêm vật tư thay thế cho vật tư(Sau khi ấn link sang hệ thống MDM)'
                                                    icon='assets/icons/CircleAdd.svg'
                                                    textColor='#FF7A00'
                                                />
                                            </TItem>
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
                        <div style={{ fontSize: 18, fontWeight: "bold" }}>Danh sách sản phẩm</div>
                    </TItem>
                    <TItem>
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
                    </TItem>
                    <TItem name='columnChooserButton' />
                </Toolbar>

                <ColumnChooser enabled={true} mode="select" allowSearch={true} />
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
                <Column caption={"Mã thẻ"} dataField={"cardCode"} alignment='left' width={100} />
                <Column caption={"Tên thẻ"} dataField={"cardName"} />
                <Column caption={"BOM version"} dataField={"bomVersion"} />
                <Column caption={"Lưu ý"} dataField={"notice"} />
                <Column caption={"Ghi chú"} dataField={"note"} />
                <Column caption={"Trạng thái"} dataField='status' cellRender={(cellInfo) => {
                    return <Status value={cellInfo.data.value} />
                }} />
                <Column
                    fixed={true}
                    type={"buttons"}
                    caption={"Thao tác"}
                    alignment='center'
                    cellRender={() => (
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
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
                <PopupSendSAP
                    isVisible={isModalVisibleSendSAP}
                    onCancel={handleHideModalSendSAP}
                    onSubmit={handleConfirmSendSAP}
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
                                Xác nhận gửi SAP
                            </h3>
                        </div>
                    }
                    modalContent={
                        <div>
                            <h4 style={{ fontWeight: 400 }}>Bạn chắc chắn muốn gửi thông tin phiếu công nghệ sang SAP?</h4>
                            <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e", borderRadius: 5 }}>
                                <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                    <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                    Lưu ý:
                                </h3>
                                <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                    Tất cả các thông tin của phiếu công nghệ sẽ được gửi lên SAP và không được chỉnh sửa !
                                </p>
                            </div>
                        </div>
                    }
                    width={600}
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
    );
});
export default BOMPersonalizedDetail;
