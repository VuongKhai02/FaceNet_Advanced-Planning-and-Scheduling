import React, { useState } from "react";
import { DataGrid, TextArea } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    ColumnChooser,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import { customizeColor, getColor } from "../../../../utils/utils";
import { Button, Tag } from "antd";
import TechFormDetail from "../TechFormDetail/TechFormDetail";
import { Popup as PopupCofirm } from "devextreme-react/popup";
import "./TechFormApprove.css";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { useTranslation } from "react-i18next";


const data = [
    {
        id: 1, orderCode: "22424", productCode: "MSX-1213", productName: "Visa TPBank", quantity: "20,000", startDate: "09/08/2023", endDate: "19/08/2023", createdBy: "Nguyễn Văn B", checkBy: "Nguyễn Văn A", priority: "1", refuseReason: "", status: "Đang chờ phê duyệt"
    },
    { id: 2, orderCode: "22424", productCode: "MSX-1213", productName: "Visa TPBank", quantity: "20,000", startDate: "09/08/2023", endDate: "19/08/2023", createdBy: "Nguyễn Văn B", checkBy: "Nguyễn Văn A", priority: "2", refuseReason: "", status: "Đang chờ phê duyệt" },
    { id: 3, orderCode: "22424", productCode: "MSX-1213", productName: "Visa TPBank", quantity: "20,000", startDate: "09/08/2023", endDate: "19/08/2023", createdBy: "Nguyễn Văn B", checkBy: "Nguyễn Văn A", priority: "3", refuseReason: "NVL thay thế khônghợp lệ", status: "Từ chối" },
    { id: 4, orderCode: "22424", productCode: "MSX-1213", productName: "Visa TPBank", quantity: "20,000", startDate: "09/08/2023", endDate: "19/08/2023", createdBy: "Nguyễn Văn B", checkBy: "Nguyễn Văn A", priority: "2", refuseReason: "", status: "Đã phê duyệt" }
];
export const TechFormApprove = () => {
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const { t } = useTranslation(["common"]);
    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "tech-form-manage",
                        title: "Quản lý phiếu công nghệ",
                    },
                    {
                        key: "tech-form-approve",
                        title: "Phê duyệt phiếu công nghệ",
                    }
                ]
            })
        }
    }, []);

    const onConfirmClick = () => {
        setShowPopup(false);
    };

    const onCancelClick = () => {
        setShowPopup(false);
    };

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    };
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    };


    const onStatusRender = () => {
        let customColor: {
            color: string,
            backgroundColor: string,
            fontWeight: string
        } = {
            color: "",
            backgroundColor: "",
            fontWeight: ""
        }
        let border = "";
        customColor = customizeColor(data[0]?.status)
        border = "1px solid " + customColor.color;
        return <Tag style={{
            fontSize: '14px',
            padding: '7px',
            "width": "100%",
            "textAlign": "center",
            "color": customColor.color,
            "backgroundColor": customColor.backgroundColor,
            "borderRadius": "4px",
            "border": "none",
            fontWeight: customColor.fontWeight
        }}>{data[0]?.status}</Tag>
    }

    const onPriorityRender = () => {
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
        let border = "";
        getColor(data[3]?.priority);
        customColor = customizeColor(status)
        border = "1px solid" + customColor.color;
        return <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Tag style={{
                    height: "20px",
                    "fontWeight": "bold",
                    "width": "30px",
                    "textAlign": "center",
                    "color": customColor.color,
                    "backgroundColor": customColor.backgroundColor,
                    "borderRadius": "100px",
                    "border": border
                }}>{data[3]?.priority}</Tag>
            </div>
        </>
    }
    const handleTechFormDetail = () => {
        setIsAddNewTechForm(true);
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechFormDetail isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
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
                                Phê duyệt phiếu công nghệ
                            </h5>
                        </div>
                        <DataGrid
                            key='id'
                            keyExpr={"id"}
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
                                <ToolbarItem>
                                    <SvgIcon
                                        tooltipTitle='Xuất Excel'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/ExportFile.svg'
                                        text='Xuất Excel'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem name='searchPanel' location='before' />
                                <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
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

                            <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                            {/* <Selection mode='multiple' /> */}
                            <Column dataField='orderCode' caption='Mã đơn hàng'></Column>
                            <Column dataField='productCode' caption='Mã sản xuất'></Column>
                            <Column dataField='productName' caption='Tên thẻ' ></Column>
                            <Column dataField='quantity' caption='Số lượng' alignment='left'></Column>
                            <Column
                                dataField='startDate'
                                caption='Ngày bắt đầu'
                                format={"dd/MM/yyyy"}
                                dataType='datetime'
                                alignment={"left"}></Column>
                            <Column
                                dataField='endDate'
                                caption='Ngày kết thúc'
                                dataType='datetime'
                                format={"dd/MM/yyyy"}
                                alignment={"left"}
                            ></Column>
                            <Column dataField='createdBy' caption='Người tạo' />
                            <Column dataField='checkBy' caption='Người kiểm tra' />
                            <Column
                                dataField='priority'
                                alignment={"left"}
                                cellRender={onPriorityRender}
                                caption={"Mức độ ưu tiên"}
                                renderAsync={true}></Column>
                            <Column caption="Lý do từ chối" dataField="refuseReason" />
                            <Column caption={"Trạng thái"} dataField="status" cellRender={onStatusRender} />
                            <Column
                                fixed={true}
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            tooltipTitle='Xem Phiếu công nghệ'
                                            onClick={handleTechFormDetail}
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/EyeOpen.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            tooltipTitle='Phê duyệt'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Check.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => setShowPopup(true)}
                                            tooltipTitle='Từ chối'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Close.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            tooltipTitle='Xóa'
                                            onClick={handleShowModalDel}
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                        />
                                    </div>
                                )}></Column>
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
                        <PopupCofirm
                            titleRender={() => (
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <SvgIcon
                                        sizeIcon={25}
                                        icon='assets/icons/Announcement.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                    Xác nhận từ chối
                                </div>
                            )}
                            visible={showPopup}
                            onHiding={() => setShowPopup(false)}
                            showCloseButton={false}
                            width={450}
                            height={325}>
                            <div>
                                <p>Bạn có chắc chắn muốn từ chối phiếu công nghệ này không?</p>
                                <div className='reject-reason-container'>
                                    <label>
                                        Lý do từ chối <span className='required'>*</span>
                                    </label>
                                    <TextArea
                                        value={rejectReason}
                                        onValueChanged={(e) => setRejectReason(e.value)}
                                        placeholder='Nhập lý do từ chối'
                                        height={100}
                                        style={{ marginTop: 10 }}
                                    />
                                </div>
                                <div className='button-container'>
                                    <Button
                                        onClick={onCancelClick}
                                        style={{ backgroundColor: "#E5E5E5", marginRight: 20, width: 100 }}
                                    >Hủy bỏ</Button>
                                    <Button
                                        onClick={onConfirmClick}
                                        style={{ backgroundColor: "#FF7A00", color: "#FFF" }}
                                    >Xác nhận</Button>
                                </div>
                            </div>
                        </PopupCofirm>
                    </div>
                </div>
            )}
        </>
    );
};

export default TechFormApprove;
