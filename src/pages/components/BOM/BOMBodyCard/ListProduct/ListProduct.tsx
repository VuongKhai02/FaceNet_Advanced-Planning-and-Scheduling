import React, { useEffect, useState } from "react";
import DataGrid, {
    Column,
    FilterRow,
    SearchPanel,
    Selection,
    Toolbar,
    Item as TItem,
    OperationDescriptions,
    ColumnChooser,
    Lookup,
} from "devextreme-react/data-grid";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import PopupBOM from "../../../../../shared/components/PopupBOM/PopupBOM";
import { WarningOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PopupConfirmDelete from "../../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import PaginationComponent from "../../../../../shared/components/PaginationComponent/PaginationComponent";
import styles from "./ListProduct.module.css";
import classNames from "classnames/bind";
import httpRequests from "../../../../../utils/httpRequests";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);
const data = [
    { cardCode: "SP091", cardName: "Sản phẩm 09.1", bomversion: "1.1", notice: "VT001", note: "Vật tư 01", status: "Hoạt động" },
    { cardCode: "SP092", cardName: "Sản phẩm 09.2", bomversion: "1.1", notice: "VT001", note: "Vật tư 01", status: "Hoạt động" },
    { cardCode: "SP093", cardName: "Sản phẩm 09.3", bomversion: "1.1", notice: "VT001", note: "Vật tư 01", status: "Ngưng hoạt động" },
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
export const ListProduct = React.memo((props: any) => {
    const { t } = useTranslation(["common"]);
    const [isDetailBOMTemplate, setIsDetailBOMTemplate] = React.useState<boolean>(false);
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);
    const [isChangeState, setIsChangeState] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const [bomData, setBomData] = useState({})
    const [bomIdChoosed, setBomIdChoosed] = useState(null);


    useEffect(() => {
        if (props!.bomTemplateId) {
            getBOMsProduct(props.bomTemplateId)
        }
    }, [])



    const getBOMsProduct = (bomTemplateId: any) => {
        httpRequests.get(`/api/boms/templates/${bomTemplateId}/products?page=${pageIndex - 1}&size=${pageSize}`).then((response) => {
            if (response.status === 200) {
                console.log("hung: ", response)
                setBomData(response.data.data)
                // setBom(response.data.data);
            }
        });
    }


    const handleChangeStatus = (bomId: any) => {
        httpRequests.put(`/api/boms/${bomId}/status`)
            .then(response => {
                console.log(response);
                getBOMsProduct(props.bomTemplateId)
            })
    }

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
                    {t("common.cancel-button")}
                </Button>
                <Button
                    key='submit'
                    onClick={() => {
                        if (bomIdChoosed !== null) {
                            handleChangeStatus(bomIdChoosed);
                            setBomIdChoosed(null);
                            setIsChangeState(false);
                        }
                    }}
                    className={cx("btn-save")}>
                    {t("common.confirm-button")}
                </Button>
            </div>
        </div>
    ];

    return (
        <div>
            <DataGrid
                id='gridContainer'
                dataSource={bomData!.data}
                keyExpr='id'
                key={"id"}
                height={"auto"}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText={t("common.noData-text")}>
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
                                    <div style={{ marginTop: 40, fontSize: 20 }}>
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
                                        <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                                        <Column caption="Số lượng sẵn sàng" dataField="availableQuantity" />
                                        <Column caption="Phân loại" dataField="type" />
                                        <Column caption="Mặt trước" dataField="front" />
                                        <Column caption="Mặt sau" dataField="back" />

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
                            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
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
                                                    <p style={{ fontSize: 20 }}>Danh sách vật tư</p>
                                                </div>
                                            </TItem>
                                            <TItem>
                                                <SvgIcon
                                                    sizeIcon={25}
                                                    text={t("common.add-button")}
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
                    <TItem name='columnChooserButton' />
                </Toolbar>
                <ColumnChooser enabled={true} allowSearch={true} mode='select' />
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

                <Selection mode='single' />
                <Column caption='Mã thẻ' dataField={"productCode"} />
                <Column dataField='productName' caption='Tên thẻ'></Column>
                <Column dataField='version' caption='BOM version' />
                <Column dataField='notice' caption='Lưu ý'></Column>
                <Column dataField='note' caption='Ghi chú' />
                <Column caption={"Trạng thái"} dataField='status' alignment="left" cellRender={(cellInfo) => {
                    return <Status value={cellInfo.value} />
                }} ><Lookup dataSource={["Hoạt động", "Không hoạt động"]} /></Column>
                <Column
                    fixed={true}
                    type={"buttons"}
                    caption={"Thao tác"}
                    alignment='center'
                    cellRender={(cellInfo) => (
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
                                onClick={() => {
                                    setIsChangeState(true)
                                    setBomIdChoosed(cellInfo.key);
                                }}
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
                    )}
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
export default ListProduct;

export function Status({ value }) {
    console.log('value', value);

    return (<div className={cx('status', [value === 0 ? 'active' : 'inactive'])}>
        {
            value === 0 ? "Hoạt động" : "Không hoạt động"
        }
    </div>);
}

