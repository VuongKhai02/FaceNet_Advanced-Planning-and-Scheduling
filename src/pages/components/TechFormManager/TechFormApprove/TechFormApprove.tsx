import React, { useEffect, useState } from "react";
import { DataGrid, TextArea } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    Selection,
    ColumnChooser,
} from "devextreme-react/data-grid";
import { PLANNING_API_URL } from "../../../../utils/config";
import { customizeColor } from "../../../../utils/utils";
import { Button, Tag } from "antd";
import notify from "devextreme/ui/notify";
import { OrderItem } from "../../../../fake_data/OrderItem";
import TechFormDetail from "../TechFormDetail/TechFormDetail";
import { Popup as PopupCofirm } from "devextreme-react/popup";
import "./TechFormApprove.css";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import httpRequests from "../../../../utils/httpRequests";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";


export const TechFormApprove = () => {
    const [, setContent] = useState<string>();
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(OrderItem?.length / pageSize);
    const dataPage = OrderItem?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

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

    const loadOrders = () => {

        httpRequests.get(PLANNING_API_URL + "/api/orders").then((response) => {
            if (response.status === 200) {
                setContent(response.data.data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const updateOrder = (e: any) => {
        console.log(e);
        let data = JSON.stringify(e.newData);
        httpRequests.put(PLANNING_API_URL + "/api/orders/" + e.oldData.saleOrderId, data).then((response) => {
            if (response.status === 200) {
                notify(
                    {
                        message: "Cập nhật thành công!",
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            } else {
                notify(
                    {
                        message: "Cập nhật thất bại!",
                        width: 450,
                    },
                    "error",
                    3000,
                );
            }
        });
    };
    const removeOrder = (e: any) => {

        httpRequests.delete(PLANNING_API_URL + "/api/orders/" + e.data.saleOrderId).then((response) => {
            if (response.status === 200) {
                notify(
                    {
                        message: "Xóa thành công đơn hàng!",
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            } else {
                notify(
                    {
                        message: "Xóa thất bại!",
                        width: 450,
                    },
                    "error",
                    3000,
                );
            }
        });
    };

    const onStatusPoRender = (rowInfo: any) => {
        let customColor: {
            color: string;
            backgroundColor: string;
        } = {
            color: "",
            backgroundColor: "",
        };
        let status = "";
        let border = "";

        const getColor = (value: any) => {
            switch (value) {
                case "new":
                    status = "Chờ sản xuất";
                    break;
                case "complete":
                    status = "Hoàn thành";
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành";
                    break;
                case "in_production":
                    status = "Đang sản xuất";
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm";
                    break;
                case "delay":
                    status = "Chậm tiến độ";
                    break;
                case "unknown":
                    status = "Chưa xác định";
                    break;
                case "wait_production":
                    status = "Chờ sản xuất";
                    break;
                case "stop":
                    status = "Ngưng sản xuất";
                    break;
                default:
                    status = "Chưa xác định";
                    break;
            }
        };

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status);
        border = "1px solid " + customColor.color;
        return (
            <Tag
                style={{
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    color: customColor.color,
                    backgroundColor: customColor.backgroundColor,
                    borderRadius: "4px",
                    border: border,
                }}>
                {status}
            </Tag>
        );
    };

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
                            onRowUpdating={updateOrder}
                            onRowRemoving={removeOrder}
                            noDataText='Không có dữ liệu để hiển thị'
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

                            <FilterRow visible={true} />
                            <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />

                            <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                            {/* <Selection mode='multiple' /> */}
                            <Column dataField='productCode' caption='Mã phiếu công nghệ'></Column>
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
                                caption={"Mức độ ưu tiên"}
                                renderAsync={true}></Column>
                            <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
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
                            pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: OrderItem?.length }}
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
