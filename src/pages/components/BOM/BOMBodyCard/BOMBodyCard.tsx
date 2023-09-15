import React, { useCallback } from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    ColumnChooser,
    MasterDetail,
} from "devextreme-react/data-grid";
import styles from "./BOMBodyCard.module.css";
import classNames from "classnames/bind";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import BOMBodyCardAddInfo from "./BOMBodyCardAddInfo/BOMBodyCardAddInfo";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import ListProduct, { Status } from "./ListProduct/ListProduct";
import BOMBodyCardAddTemplate from "./BOMBodyCardAddTemplate/BOMBodyCardAddTemplate";
import PopupBOM from "../../../../shared/components/PopupBOM/PopupBOM";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import { Button } from "antd";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import httpRequests from "../../../../utils/httpRequests";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { BOMBodyCardInfo } from "./BOMBodyCardInfo/BOMBodyCardInfo";

const cx = classNames.bind(styles);
const data2 = [
    {
        codeMaterial: "VT0001",
        replaceMaterialName: "Mực 02",
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
        replaceMaterialName: "Mực 02",
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
        replaceMaterialName: "Mực 02",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        replaceMaterialCode: "VT002",
        replaceMaterialDescription: "Vật tư 01",
        inventoryQuantity: "Số lượng tồn kho",
    },
];

export const BOMBodyCard = () => {
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isBOMCardAddInfo, setIsBOMCardAddInfo] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const [isBOMCardAddTemplate, setIsBOMCardAddTemplate] = React.useState<boolean>(false);
    const [isDetailBOM, setIsDetailBOM] = React.useState<boolean>(false);
    const [isVisibleListMaterialReplacement, setIsVisibleListMaterialReplacement] = React.useState<boolean>(false);
    const [isChangeState, setIsChangeState] = React.useState<boolean>(false);
    const [bom, setBom] = React.useState<any>({});
    const [bomIdChoosed, setBomIdChoosed] = React.useState<number | null>(null);

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(bom?.data?.length / pageSize);
    // const dataPage = bom?.data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

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
                        key: "BOM-bodycard",
                        title: "Quản lý BOM body card",
                    }
                ]
            })
        }
    }, []);

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    };
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    };

    const handleBOMBodyCardAddInfo = (cellInfo: any) => {
        console.log(cellInfo);
        setBomIdChoosed(cellInfo.data.id);
        setIsBOMCardAddInfo(true);
    };

    const handleChangeStatus = (bomId) => {
        httpRequests.put(`/api/boms/${bomId}/status`)
        .then(response => {
            console.log(response);
            getBomTemplate();
        })
    }

    const getBomTemplate = () => {
        httpRequests.get("/api/boms/templates").then((response) => {
            if (response.status === 200 && response.data.responseCode === "00") {
                console.log(response)
                setBom(response.data.data);
            }
        });
    }

    React.useEffect(() => {
        getBomTemplate();   
    }, []);

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
                    onClick={() => { 
                        handleChangeStatus(bomIdChoosed);
                        setBomIdChoosed(null);
                        setIsChangeState(false);
                    }}
                >
                    Xác nhận
                </Button>
            </div>
        </div>
    ];

    const handleListProduct = useCallback(({data}) => {
        console.log(data)
        return <ListProduct bomTemplateId = {data.id}/>;
    }, [])

    return (
        <>
            {isBOMCardAddInfo ? (
                <BOMBodyCardAddInfo
                    requestId={null}
                    id={null}
                    bomTemplateId={bomIdChoosed}
                    isOpen={isBOMCardAddInfo}
                    setClose={() => {
                        setIsBOMCardAddInfo(false);
                        setBomIdChoosed(null);
                    }}
                />
            ) : isBOMCardAddTemplate ? (
                <BOMBodyCardAddTemplate
                    isOpen={isBOMCardAddTemplate}
                    setClose={() => {
                        setIsBOMCardAddTemplate(false);
                    }}
                />
            ) : (
                <div className="box__shadow-table-responsive">
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
                        <div>
                            <DataGrid
                                key='id'
                                keyExpr={"id"}
                                dataSource={bom.data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}
                                noDataText='Không có dữ liệu để hiển thị'
                            >
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
                                <PopupImportFile
                                    visible={isVisibleImportFile}
                                    onCancel={() => setIsVisibleImportFile(false)}
                                    title={"Import file"}
                                    onSubmit={() => { }}
                                    width={900}
                                />
                                <PopupBOM
                                    isVisible={isDetailBOM}
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
                                    onCancel={() => {setIsDetailBOM(false)
                                    setBomIdChoosed(null)}}
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
                                                        key={"replaceMaterialCode"}
                                                        keyExpr={"replaceMaterialCode"}
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
                                                                <div>
                                                                    <h4>Danh sách vật tư</h4>
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
                                <Toolbar>
                                    <ToolbarItem>
                                        <SvgIcon
                                            onClick={() => setIsBOMCardAddTemplate(true)}
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
                                    <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
                                </Toolbar>
                                <FilterRow visible={true} />
                                <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                                <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />

                                <Column fixed={true} dataField='productCode' minWidth={140} caption='Mã sản phẩm'></Column>
                                <Column dataField='productName' caption='Tên sản phẩm' minWidth={200}></Column>

                                <Column dataField='version' minWidth={140} caption='Version' alignment='left'></Column>
                                <Column dataField='notice' caption='Lưu ý' />
                                <Column dataField='note' alignment={"left"} caption={"Ghi chú"} width={140}></Column>
                                <Column caption={"Trạng thái"} dataField='status' cellRender={(cellInfo) => {
                                    return <Status value = {cellInfo.value}/>
                                }}/>
                                <Column
                                    fixed={true}
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={(cellInfo) => (
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon
                                                onClick={() => {
                                                    setIsDetailBOM(true)
                                                    setBomIdChoosed(cellInfo.key);
                                                }}
                                                tooltipTitle='Thông tin chi tiết BOM mẫu'
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
                                                tooltipTitle='Thêm mới BOM sản phẩm'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Add.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={() => {setIsChangeState(true)
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
                                                onClick={handleShowModalDel}
                                                tooltipTitle='Xóa'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Trash.svg'
                                                textColor='#FF7A00'
                                            />
                                        </div>
                                    )}></Column>
                                <MasterDetail  enabled={true} render={handleListProduct} />
                            </DataGrid>
                            <PaginationComponent
                                pageSizeOptions={[10, 20, 40]}
                                pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: bom?.data?.length }}
                                totalPages={totalPage}
                                pageIndex={pageIndex}
                                pageSize={pageSize}
                                onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                                onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
                            />
                        </div>
                    </div>
                    <div>
                        <PopupImportFile
                            visible={isVisibleImportFile}
                            onCancel={() => setIsVisibleImportFile(false)}
                            title={"Import file"}
                            onSubmit={() => { }}
                            width={900}
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
                    </div>
                </div>
            )}
        </>
    );
};



export default BOMBodyCard;
