import { locale, loadMessages } from "devextreme/localization";
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
import { BOMBodyCardInfo } from "../BOMBodyCardInfo/BOMBodyCardInfo";
import NotificationManager from "../../../../../utils/NotificationManager";

const cx = classNames.bind(styles);
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
export const ListProduct = React.memo((props: any) => {

    const [isDetailBOMProduct, setIsDetailBOMProduct] = React.useState<boolean>(false);
    const [isChangeState, setIsChangeState] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [totalPage, setTotalPage] = React.useState<number>(10);
    const [bomData, setBomData] = useState({})
    const [bomIdChoosed, setBomIdChoosed] = useState(null);

    useEffect(() => {
        if (props!.bomTemplateId){
            getBOMsProduct(props.bomTemplateId)
        }
    }, [pageSize, pageIndex])



    const getBOMsProduct = (bomTemplateId) => {
        httpRequests.get(`/api/boms/templates/${bomTemplateId}/products?page=${pageIndex -1}&size=${pageSize}`).then((response) => {
            if (response.status === 200) {
                console.log("hung: ", response)
                setBomData(response.data.data)
                setTotalPage(Math.ceil(response.data.data.totalItems / pageSize))
                // setBom(response.data.data);
            }
        });
    }

    const updatePageSize = (newPageSize) => {
        setPageIndex(1);
        setPageSize(newPageSize)
    }


    const handleChangeStatus = (bomId) => {
        httpRequests.put(`http://localhost:6886/api/boms/${bomId}/status`)
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                NotificationManager.success("Thay đổi trạng thái bom thành công")
                getBOMsProduct(props.bomTemplateId)
            }
        })
    }

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
            <div className={cx("footer-container")}>
                <Button
                    key='cancel'
                    className={cx("btn-cancel")}
                    onClick={() => setIsChangeState(false)}>
                    Hủy bỏ
                </Button>
                <Button
                    key='submit'
                    onClick={() => { if (bomIdChoosed !== null) {
                        handleChangeStatus(bomIdChoosed);
                        setBomIdChoosed(null);
                        setIsChangeState(false);
                    } }}
                    className={cx("btn-save")}>
                    Xác nhận
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
                noDataText='Không có dữ liệu để hiển thị'>
                <PopupBOM
                    isVisible={isChangeState}
                    onCancel={() => setIsChangeState(false)}
                    onSubmit={() => {}}
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
                    isVisible={isDetailBOMProduct}
                    modalContent={
                        <BOMBodyCardInfo bomId = {bomIdChoosed} />
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
                    onCancel={() => {
                        console.log("hdjdhsfjd")
                        setIsDetailBOMProduct(false)
                    setBomIdChoosed(null)}}
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
                <Column caption='Mã thẻ' dataField={"productCode"} />
                <Column dataField='productName' caption='Tên thẻ'></Column>
                <Column dataField='version' caption='BOM version' />
                <Column dataField='notice' caption='Lưu ý'></Column>
                <Column dataField='note' caption='Ghi chú' />
                <Column caption={"Trạng thái"} dataField='status' cellRender={(cellInfo) => {
                    return <Status value = {cellInfo.value}/>
                }} />
                <Column
                    fixed={true}
                    type={"buttons"}
                    caption={"Thao tác"}
                    alignment='center'
                    cellRender={(cellInfo) => (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <SvgIcon
                                onClick={() =>{
                                    setBomIdChoosed(cellInfo.key)
                                    setIsDetailBOMProduct(true)}}
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
            <PaginationComponent
                pageSizeOptions={[5, 10, 20]}
                pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: bomData?.totalItems }}
                totalPages={totalPage}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                onPageSizeChanged={(newPageSize) => updatePageSize(newPageSize)}
            />
        </div>
    );
});
export default ListProduct;

export function Status({value}) {
    return ( <div className={cx('status', [value === 0 ? 'active' : 'inactive'])}>
        {
            value === 0 ? "Hoạt động" : "Không hoạt động"
        }
    </div> );
}

