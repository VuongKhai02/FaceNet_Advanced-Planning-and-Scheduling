import React, { useEffect, useState } from "react";
import { Button, DataGrid, DateBox as DateSelect, Popup, SelectBox, TextArea, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar, ColumnChooser, Button as ButtonIcon
} from "devextreme-react/data-grid";
import DateBox from 'devextreme-react/date-box';
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { IWarning } from "../../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../../config";
import { customizeColor } from "../../../../utils/utils";
import { Modal, Tag } from "antd";
import notify from "devextreme/ui/notify";
import InfoRow from "../../../shared/components/InfoRow/InfoRow";
import CreateProductionPlan from "./CreateProductionPlan/CreateProductionPlan";
import PopupWO from "../../../shared/components/PopupWO/PopupWO";
import QRCode from "react-qr-code";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import PopupConfirmGeneral from "../../../shared/components/PopupConfirmGeneral/PopupConfirmGeneral";
import { InfoCircleOutlined } from "@ant-design/icons";

const ROUTING_PATH = "/ProductionPlanList";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];

const data = [
    { no: '1', codeMaterial: 'Mã vật tư 1', nameMaterial: 'Tên vật tư', norm: 'Định mức', supplierName: 'Tên nhà cung cấp', replaceMaterial: 'Vật tư thay thế', inventoryQuantity: 'Số lượng tồn kho' },
    { no: '2', codeMaterial: 'Mã vật tư 2', nameMaterial: 'Tên vật tư', norm: 'Định mức', supplierName: 'Tên nhà cung cấp', replaceMaterial: 'Vật tư thay thế', inventoryQuantity: 'Số lượng tồn kho' },
    { no: '2', codeMaterial: 'Mã vật tư 3', nameMaterial: 'Tên vật tư', norm: 'Định mức', supplierName: 'Tên nhà cung cấp', replaceMaterial: 'Vật tư thay thế', inventoryQuantity: 'Số lượng tồn kho' }
]
const data1 = [
    {
        soCode: '312324', manufactureCode: 'MSX-123', customerName: 'TP Bank', cardName: 'Visa TPBank', quantity: '15000', quantityLoss: '18000', qrCode: '', priority: '1', reasonClose: 'Khách hàng thay đổi yêu cầu'
    },
    {
        soCode: '312325', manufactureCode: 'MSX-123', customerName: 'TP Bank', cardName: 'Visa TPBank', quantity: '15000', quantityLoss: '18000', qrCode: '', priority: '1', reasonClose: 'Khách hàng thay đổi yêu cầu'
    },
    {
        soCode: '312326', manufactureCode: 'MSX-123', customerName: 'TP Bank', cardName: 'Visa TPBank', quantity: '15000', quantityLoss: '18000', qrCode: '', priority: '1', reasonClose: 'Khách hàng thay đổi yêu cầu'
    }
];
export const ProductionPlanList = () => {

    const [content, setContent] = useState<string>();
    const [currentWarning, setCurrentWarning] = useState<IWarning>()
    const mainStore = useMainStore();
    const [popupVisibleIcon, setPopupVisibleIcon] = React.useState<boolean>(false);
    const [isVisibleAdd, setIsVisibleAdd] = React.useState<boolean>(false);

    const [isViewMaterial, setIsViewMaterial] = React.useState<boolean>(false);
    const [isVisibleInventoryQuantity, setIsVisibleInventoryQuantity] = React.useState<boolean>(false);
    const [isVisibleQMSProcessResponsiblePerson, setIsVisibleQMSProcessResponsiblePerson] = React.useState<boolean>(false);
    const [isCreateProductionPlan, setIsCreateProductionPlan] = React.useState<boolean>(false);
    const [isVisibleUpdateInfoWO, setIsVisibleUpdateInfoWO] = React.useState<boolean>(false);
    const [isVisibleDetailQRCodeWO, setIsVisibleDetailQRCodeWO] = React.useState<boolean>(false);
    const [isVisibleAddQRCodeWO, setIsVisibleAddQRCodeWO] = React.useState<boolean>(false);
    const [isCloseWorkOrder, setIsCloseWorkOrder] = React.useState<boolean>(false);
    const [newButtons, setNewButtons] = React.useState<any>([]);

    const showPopupIcon = () => {
        setPopupVisibleIcon(true);
    };

    const hidePopupIcon = () => {
        setPopupVisibleIcon(false);
    };

    const handleCreateProductionPlan = () => {
        setIsCreateProductionPlan(true)
    }
    const handleAddNewButton = () => {
        setNewButtons([...newButtons, { text: 'Thêm mới button', width: 300 }]);
    };

    const popupContentIcon = (
        <div onClick={() => { hidePopupIcon() }}>
            <div style={{ border: '1px solid #dbdedf', height: 40, display: "flex", alignItems: "center", borderRadius: 5 }}>
                <SvgIcon onClick={() => setIsViewMaterial(true)} text="Xem nguyên vật liệu" tooltipTitle="Xem nguyên vật liệu" sizeIcon={17} textSize={17} icon="assets/icons/ViewMaterial.svg" textColor="#000" style={{ marginLeft: 17 }} />
            </div>
            <div style={{ marginTop: 20, border: '1px solid #dbdedf', height: 40, display: "flex", alignItems: "center", borderRadius: 5 }}>
                <SvgIcon text="Gửi lệnh sản xuất sang QMS" tooltipTitle="Gửi lệnh sản xuất sang QMS" sizeIcon={17} textSize={17} icon="assets/icons/DoubleRightChervon.svg" textColor="#000" style={{ marginLeft: 17 }} />
            </div>
            <div style={{ marginTop: 20, border: '1px solid #dbdedf', height: 40, display: "flex", alignItems: "center", borderRadius: 5 }}>
                <SvgIcon onClick={() => setIsVisibleAddQRCodeWO(true)} text="Thêm mới mã QR cho lệnh sản xuất" tooltipTitle="Thêm mới mã QR cho lệnh sản xuất" sizeIcon={17} textSize={17} icon="assets/icons/Folder.svg" textColor="#000" style={{ marginLeft: 17 }} />
            </div>
            <div style={{ marginTop: 20, border: '1px solid #dbdedf', height: 40, display: "flex", alignItems: "center", borderRadius: 5 }}>
                <SvgIcon onClick={handleAddNewButton} text="Thêm mới" tooltipTitle="Thêm mới" sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginLeft: 17 }} />

            </div>
            {newButtons.map((button, index) => (
                <div key={index} style={{ marginTop: 20, border: '1px solid #dbdedf', height: 40, display: "flex", alignItems: "center", borderRadius: 5 }}>
                    <SvgIcon text="Thêm mới button icon" tooltipTitle="Thêm mới" sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginLeft: 17 }} />
                </div>
            ))}
        </div>
    );
    const loadOrders = () => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        axios.get(PLANNING_API_URL + '/api/orders', { headers })
            .then(response => {
                if (response.status === 200) {
                    setContent(response.data.data)
                }
            }
            );
    }

    const onSelectedRowKeysChange = (e) => {
        if (e.data) {
            setCurrentWarning(e.data)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const updateOrder = (e) => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        console.log(e)
        let data = JSON.stringify(e.newData);
        axios.put(PLANNING_API_URL + '/api/orders/' + e.oldData.saleOrderId, data, { headers },)
            .then(response => {
                if (response.status === 200) {
                    notify({
                        message: 'Cập nhật thành công!',
                        width: 450
                    }, 'SUCCESS', 3000);
                } else {
                    notify({
                        message: 'Cập nhật thất bại!',
                        width: 450
                    }, 'error', 3000);
                }
            }
            );
    }
    const removeOrder = (e) => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        console.log(e)
        let data = JSON.stringify(e.newData);
        axios.delete(PLANNING_API_URL + '/api/orders/' + e.data.saleOrderId, { headers },)
            .then(response => {
                if (response.status === 200) {
                    notify({
                        message: 'Xóa thành công đơn hàng!',
                        width: 450
                    }, 'SUCCESS', 3000);
                } else {
                    notify({
                        message: 'Xóa thất bại!',
                        width: 450
                    }, 'error', 3000);
                }
            }
            );
    }

    const onStatusPoRender = (rowInfo) => {
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
        let border = "";

        const getColor = (value) => {
            switch (value) {
                case "new":
                    status = "Chờ sản xuất"
                    break;
                case "complete":
                    status = "Hoàn thành"
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành"
                    break
                case "in_production":
                    status = "Đang sản xuất"
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm"
                    break;
                case "delay":
                    status = "Chậm tiến độ"
                    break;
                case "unknown":
                    status = "Chưa xác định"
                    break;
                case "wait_production":
                    status = "Chờ sản xuất"
                    break;
                case "stop":
                    status = "Ngưng sản xuất"
                    break;
                default:
                    status = "Chưa xác định"
                    break;
            }
        }

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status)
        border = "1px solid " + customColor.color;
        return <Tag style={{
            "fontWeight": "bold",
            "width": "100%",
            "textAlign": "center",
            "color": customColor.color,
            "backgroundColor": customColor.backgroundColor,
            "borderRadius": "4px",
            "border": border
        }}>{status}</Tag>
    }

    const handleCustomFooterAddQRCodeWO = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button
                    key="cancel"
                    style={{
                        marginRight: '30px',
                        backgroundColor: '#E5E5E5',
                        display: 'inline-block',
                        borderRadius: '4px',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    onClick={() => setIsVisibleAddQRCodeWO(false)}
                >
                    Hủy bỏ
                </Button>
                <Button
                    style={{
                        borderRadius: '4px',
                        backgroundColor: '#ff794e',
                        color: '#ffff',
                        width: 100,
                        height: 40,
                        fontSize: 16,
                        marginRight: '30px',
                    }}
                    key="submit"
                    onClick={() => { }}
                    className="btn btn-save"
                >
                    Lưu lại
                </Button>
                <Button
                    style={{
                        borderRadius: '4px',
                        backgroundColor: '#ff794e',
                        color: '#ffff',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    key="submit"
                    onClick={() => { }}
                    className="btn btn-save"
                >
                    In mã
                </Button>
            </div>
        </div>
    ];
    const handleCustomFooterDetailQRCodeWO = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button
                    key="cancel"
                    style={{
                        marginRight: '30px',
                        backgroundColor: '#E5E5E5',
                        display: 'inline-block',
                        borderRadius: '4px',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    onClick={() => setIsVisibleDetailQRCodeWO(false)}
                >
                    Hủy bỏ
                </Button>
                <Button
                    style={{
                        borderRadius: '4px',
                        backgroundColor: '#ff794e',
                        color: '#ffff',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    key="submit"
                    onClick={() => { }}
                    className="btn btn-save"
                >
                    In mã
                </Button>
            </div>
        </div>
    ];


    return (
        <>
            {
                isCreateProductionPlan ?
                    <CreateProductionPlan
                        isOpen={isCreateProductionPlan}
                        setClose={() => { setIsCreateProductionPlan(false) }}
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
                                }}>Danh sách kế hoạch sản xuất</h5>
                            </div>
                            <div className="informer" style={{
                                backgroundColor: "#ffffff",
                            }}>
                                <h5 className="name" style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 0,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550
                                }}>Tìm kiếm chung</h5>
                            </div>
                            <PopupWO
                                isVisible={isVisibleUpdateInfoWO}
                                modalContent={
                                    <div>
                                        <div style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                                            <p style={{ marginBottom: 5, color: '#333', fontSize: 20 }}>Thông tin chung</p>
                                            <div>
                                                <table style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <td style={{ width: 300 }}>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="wo" style={{ display: 'block', marginBottom: 5 }}>WO-123</label>
                                                            <TextBox id="wo" placeholder="KHSX-T1" />
                                                        </div>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="quantity" style={{ display: 'block', marginBottom: 5 }}>Số lượng</label>
                                                            <TextBox id="quantity" value="20000" />
                                                        </div>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="startTime" style={{ display: 'block', marginBottom: 5 }}>Thời gian bắt đầu</label>
                                                            <DateBox id="startTime" value="08/09/2023" />
                                                        </div>
                                                    </td>
                                                    <td style={{ width: 300 }}>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="status" style={{ display: 'block', marginBottom: 5 }}>Trạng thái hoạt động</label>
                                                            <SelectBox id="status" placeholder="Hoạt động" />
                                                        </div>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="finishQuantity" style={{ display: 'block', marginBottom: 5 }}>Số lượng hoàn thành</label>
                                                            <TextBox id="finishQuantity" value="19000" />
                                                        </div>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="endTime" style={{ display: 'block', marginBottom: 5 }}>Thời gian kết thúc</label>
                                                            <DateBox id="endTime" value="08/09/2023" />
                                                        </div>
                                                    </td>
                                                </table>
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                            <p style={{ marginBottom: 5, color: '#333', fontSize: 20 }}>Thông tin sản phẩm</p>
                                            <div>
                                                <table style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <td style={{ width: 300 }}>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="orderCode" style={{ display: 'block', marginBottom: 5 }}>Mã đơn hàng</label>
                                                            <TextBox id="orderCode" placeholder="KHSX-T1" />
                                                        </div>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="cardName" style={{ display: 'block', marginBottom: 5 }}>Tên thẻ</label>
                                                            <TextBox id="cardName" value="Thẻ visa" />
                                                        </div>
                                                    </td>
                                                    <td style={{ width: 300 }}>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="manufactureCode" style={{ display: 'block', marginBottom: 5 }}>Mã sản xuất</label>
                                                            <SelectBox id="manufactureCode" placeholder="12345" />
                                                        </div>
                                                        <div style={{ marginBottom: 20 }}>
                                                            <label htmlFor="bomversion" style={{ display: 'block', marginBottom: 5 }}>Bom version</label>
                                                            <TextBox id="bomversion" value="1.1" />
                                                        </div>
                                                    </td>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                                modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                    <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    Cập nhật thông tin WO
                                </div>}
                                width={900}
                                onCancel={() => setIsVisibleUpdateInfoWO(false)}
                                onSubmit={() => { }}
                            />
                            <PopupWO
                                isVisible={isVisibleDetailQRCodeWO}
                                customFooter={handleCustomFooterDetailQRCodeWO}
                                modalContent={
                                    <div>
                                        <h3><p style={{ marginTop: 20 }}>Xem chi tiết QR code WO</p></h3>
                                        <div style={{ marginTop: 40, marginBottom: 30 }}>
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>

                                                <td style={{ marginLeft: 30 }}>
                                                    <p>Mã WO</p>
                                                    <TextBox id="woCode" key={'woCode'} value="WO_123" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên khách hàng</p>
                                                    <TextBox id="customerName" key={'customerName'} value="TP Bank" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng</p>
                                                    <TextBox id="quantity" key={'quantity'} value="20000" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Thời gian bắt đầu</p>
                                                    <TextBox id="startTime" key={'startTime'} value="08/09/2023" ></TextBox>
                                                </td>
                                                <td style={{ marginRight: 30 }}>
                                                    <p>Mã sản xuất</p>
                                                    <TextBox id="manufactureCode" key={'manufactureCode'} value="Phôi Thẻ MC Tita cashback debit, VP Bank" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên thẻ</p>
                                                    <TextBox id="cardName" key={'cardName'} value="In offset, In lưới" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Trạng thái</p>
                                                    <TextBox id="status" key={'status'} value="3,000" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Thời gian kết thúc</p>
                                                    <TextBox id="endTime" key={'endTime'} value="18/09/2023" ></TextBox>

                                                </td>
                                                <td>
                                                    <p>Mã QR</p>
                                                    <QRCode
                                                        size={200}
                                                        style={{ marginRight: 40 }}
                                                        value={'Sơn Minh'}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
                                            </table>
                                        </div>
                                    </div>
                                }
                                modalTitle={
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        Xem chi tiết QR code WO
                                    </div>}
                                width={1000}
                                onCancel={() => setIsVisibleDetailQRCodeWO(false)}
                                onSubmit={() => { }}
                            />
                            <PopupWO
                                isVisible={isVisibleAddQRCodeWO}
                                customFooter={handleCustomFooterAddQRCodeWO}
                                modalContent={
                                    <div>
                                        <h3><p style={{ marginTop: 20 }}>Thêm mới QR code cho WO</p></h3>
                                        <div style={{ marginTop: 40, marginBottom: 30 }}>
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>

                                                <td style={{ marginLeft: 30 }}>
                                                    <p>Mã WO</p>
                                                    <TextBox id="woCode" key={'woCode'} placeholder="Nhập" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên khách hàng</p>
                                                    <TextBox id="customerName" key={'customerName'} value="TP Bank" disabled></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng</p>
                                                    <TextBox id="quantity" key={'quantity'} value="20000" disabled></TextBox>
                                                    <p style={{ marginTop: 30 }}>Thời gian bắt đầu</p>
                                                    <TextBox id="startTime" key={'startTime'} value="08/09/2023" disabled></TextBox>
                                                </td>
                                                <td style={{ marginRight: 30 }}>
                                                    <p>Mã sản xuất</p>
                                                    <TextBox id="manufactureCode" key={'manufactureCode'} value="Phôi Thẻ MC Tita cashback debit, VP Bank" width={300} disabled></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên thẻ</p>
                                                    <TextBox id="cardName" key={'cardName'} value="In offset, In lưới" disabled></TextBox>
                                                    <p style={{ marginTop: 30 }}>Trạng thái</p>
                                                    <SelectBox id="status" key={'status'} placeholder="Chọn"></SelectBox>
                                                    <p style={{ marginTop: 30 }}>Thời gian kết thúc</p>
                                                    <TextBox id="endTime" key={'endTime'} value="18/09/2023" disabled></TextBox>
                                                </td>
                                                <td>
                                                    <p>Mã QR</p>
                                                    <QRCode
                                                        size={200}
                                                        style={{ marginRight: 40 }}
                                                        value={'Sơn Minh'}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </td>
                                            </table>
                                        </div>
                                    </div>
                                }
                                modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                    <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    Thêm mới QR code cho WO
                                </div>}
                                width={1000}
                                onCancel={() => setIsVisibleAddQRCodeWO(false)}
                                onSubmit={() => { }}
                            />
                            <Modal
                                visible={isVisibleAdd}
                                title={
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        Import phiếu công nghệ
                                    </div>
                                }
                                footer={[
                                    <Button key="cancel" onClick={() => { setIsVisibleAdd(false) }} style={{ fontSize: 17, width: 100, height: 40, marginRight: '20px', backgroundColor: '#C0C0C0', borderRadius: 5, color: '#333' }} >
                                        Hủy bỏ
                                    </Button>,
                                    <Button key="confirm" onClick={handleCreateProductionPlan} style={{ fontSize: 17, width: 100, height: 40, backgroundColor: '#FF7A00', color: "#fff", borderRadius: 5 }}>
                                        Tiếp theo
                                    </Button>,
                                ]}
                                onCancel={() => { setIsVisibleAdd(false) }}
                                width={900}
                            >
                                <p style={{ marginBottom: 5, color: '#333', fontSize: 20 }}>Chọn phiếu công nghệ</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <label htmlFor="techFormCode" style={{ display: 'block', marginBottom: 5 }}>Mã phiếu công nghệ</label>
                                        <SelectBox id="techFormCode" placeholder="--Chọn--" />
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label htmlFor="nameCard" style={{ display: 'block', marginBottom: 5 }}>Tên thẻ</label>
                                        <TextBox id="nameCard" placeholder="Visa TP Bank" />
                                    </div>
                                </div>
                            </Modal>
                            <PopupConfirmGeneral
                                isVisible={isCloseWorkOrder}
                                modalContent={
                                    <div>
                                        <div style={{ marginLeft: 20, marginTop: 20, marginBottom: 30, fontSize: 18, fontWeight: '500' }}>
                                            Lệnh sản xuất hiện tại đang ở trạng thái .... Nếu bạn đóng lệnh sản xuất, tất cả thông tin của lệnh sản xuất này sẽ bị hủy và cảnh báo về việc đóng sẽ được gửi đến các bộ phận liên quan. Bạn có chắc chắn muốn đóng lệnh sản xuất 13342?
                                        </div>
                                        <div className="reject-reason-container">
                                            <label style={{ marginLeft: 20, fontSize: 18 }}>Lý do đóng lệnh sản xuất<span className="required">*</span></label>
                                            <TextArea
                                                value={''}
                                                onValueChanged={() => { }}
                                                placeholder="Nhập lý do từ chối..."
                                                height={100}
                                                style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
                                            />
                                        </div>
                                    </div>
                                }
                                modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                    <SvgIcon sizeIcon={25} icon="assets/icons/Info.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    <span style={{ color: '#FF7A00', fontSize: 20 }}>Xác nhận đóng lệnh sản xuất?</span>
                                </div>}
                                width={600}
                                onCancel={() => setIsCloseWorkOrder(false)}
                                onSubmit={() => { }}
                            />

                            <DataGrid
                                key={'soCode'}
                                keyExpr={"soCode"}
                                dataSource={data1}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}
                                onSelectionChanged={onSelectedRowKeysChange}
                                onRowClick={onSelectedRowKeysChange}
                                onRowUpdating={updateOrder}
                                onRowRemoving={removeOrder}
                            >
                                <Toolbar>
                                    <ToolbarItem location="after">
                                        <SvgIcon tooltipTitle="Thêm mới" text="Thêm mới" onClick={() => setIsVisibleAdd(true)} sizeIcon={17} textSize={17} icon="assets/icons/CirclePlus.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    </ToolbarItem>
                                    <ToolbarItem location="after">
                                        <SvgIcon tooltipTitle="Xuất Excel" text="Xuất Excel" onClick={() => setIsVisibleAdd(true)} sizeIcon={17} textSize={17} icon="assets/icons/ExportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                    </ToolbarItem>
                                    <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                    <ToolbarItem name="searchPanel" location="before" />
                                </Toolbar>
                                <HeaderFilter visible={true} texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng"

                                }} allowSearch={true} />
                                <FilterRow visible={true} />
                                <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
                                <SearchPanel visible={true} placeholder={"Tìm kiếm..."} />
                                <Paging defaultPageSize={5} />
                                <Pager
                                    visible={true}
                                    allowedPageSizes={allowedPageSizes}
                                    displayMode={"full"}
                                    showPageSizeSelector={true}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                                <Column caption={"Mã SO"} dataField={"soCode"} alignment="left" width={100} />
                                <Column caption={"Mã sản xuất"} dataField={"manufactureCode"} />
                                <Column caption={"Tên khách hàng"} dataField={"customerName"} />
                                <Column caption={"Tên thẻ "} dataField={"cardName"} />
                                <Column caption={"Số lượng"} dataField={"quantity"} />
                                <Column caption={"Số lượng bù hao"} dataField={"quantityLoss"} />
                                <Column caption={"Mã QR"} dataField={"qrCode"} />
                                <Column caption={"Mức độ ưu tiên"} dataField={"priority"} />
                                <Column caption="Lý do đóng lệnh sản xuất" dataField="reasonClose" />
                                <Column caption={"Trạng thái"} cellComponent={onStatusPoRender} />
                                <Column type={"buttons"} caption={"Thao tác"} alignment="left"
                                    cellRender={() =>
                                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                                            <SvgIcon onClick={() => setIsVisibleUpdateInfoWO(true)} tooltipTitle="Cập nhật thông tin WO" sizeIcon={17} textSize={17} icon="assets/icons/InfoCircle.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            <SvgIcon onClick={() => setIsVisibleDetailQRCodeWO(true)} tooltipTitle="Xem chi tiết mã QR" sizeIcon={17} textSize={17} icon="assets/icons/QrCode.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            <SvgIcon tooltipTitle="Bắt đầu sản xuất" sizeIcon={17} textSize={17} icon="assets/icons/Send.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            <SvgIcon onClick={() => setIsCloseWorkOrder(true)} tooltipTitle="Đóng lệnh sản xuất" sizeIcon={17} textSize={17} icon="assets/icons/Stop.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            <SvgIcon onClick={showPopupIcon} tooltipTitle="Khác" sizeIcon={17} textSize={17} icon="assets/icons/More.svg" textColor="#FF7A00" />
                                        </div>
                                    }>
                                </Column>
                            </DataGrid>
                            <Popup
                                title="Các Icon thao tác"
                                visible={popupVisibleIcon}
                                onHiding={hidePopupIcon}
                                contentRender={() => popupContentIcon}
                                width={370}
                                height={350}
                                showCloseButton={false}
                                hideOnOutsideClick={true}

                            />
                            {/* Xem nguyên vật liệu */}

                            <Popup
                                visible={isViewMaterial}
                                title="Xem nguyên vật liệu"
                                onHiding={() => { setIsViewMaterial(false) }}
                                width={1300}
                                height={800}
                            >
                                <div>
                                    <div>
                                        <table
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-arround"
                                            }}>
                                            <td>
                                                <InfoRow label='Tên thẻ/Card Name' data='Phôi thẻ Visa Credit Classic, TP Bank, T8/2022' />
                                                <InfoRow label='Bom version' data='1.1' />
                                            </td>
                                            <td>
                                                <InfoRow label='Tên khách hàng' data='Chi nhánh Công ty Cổ phần Thông minh MK' />
                                                <InfoRow label='Remark' data='Phôi thẻ' />
                                            </td>
                                        </table>
                                    </div>
                                    <div style={{ marginTop: 40 }}><h4>Danh sách nguyên vật liệu</h4></div>
                                </div>
                                <DataGrid
                                    key={'no'}
                                    keyExpr={"no"}
                                    dataSource={data}
                                    showBorders={true}
                                    columnAutoWidth={true}
                                    showRowLines={true}
                                    rowAlternationEnabled={true}
                                    allowColumnResizing={true}
                                    allowColumnReordering={true}
                                    focusedRowEnabled={true}
                                >
                                    <HeaderFilter visible={true} texts={{
                                        cancel: "Hủy bỏ",
                                        ok: "Đồng ý",
                                        emptyValue: "Rỗng"

                                    }} allowSearch={true} />
                                    <FilterRow visible={true} />
                                    <Paging defaultPageSize={5} />
                                    <Column caption={"No."} dataField={"no"} alignment="left" width={100} />
                                    <Column caption={"Mã vật tư"} dataField={"codeMaterial"} />
                                    <Column caption={"Tên vật tư"} dataField={"nameMaterial"} />
                                    <Column caption={"Định mức"} dataField={"norm"} />
                                    <Column caption={"Tên nhà cung cấp"} dataField={"supplierName"} />
                                    <Column caption={"Vật tư thay thế"} dataField={"replaceMaterial"} />
                                    <Column caption={"Số lượng tồn kho"} dataField={"inventoryQuantity"} />
                                    <Column type={"buttons"} caption={"Thao tác"} alignment="center" >
                                        <ButtonIcon icon="eyeopen" onClick={() => { setIsVisibleInventoryQuantity(true) }} />
                                    </Column>
                                </DataGrid>
                                <Popup
                                    visible={isVisibleInventoryQuantity}
                                    title="Số lượng tồn trong kho"
                                    onHiding={() => { setIsVisibleInventoryQuantity(false) }}
                                    width={400}
                                    height={600}
                                >
                                    <DataGrid
                                        key={'no'}
                                        keyExpr={'no'}
                                        dataSource={data}
                                        showBorders={true}
                                        columnAutoWidth={true}
                                        showRowLines={true}
                                    >
                                        <Column caption="Mã kho" dataField="codeMaterial" />
                                        <Column caption="Tên kho" dataField="nameMaterial" />
                                        <Column caption="Số lượng" dataField="inventoryQuantity" />
                                    </DataGrid>
                                </Popup>
                            </Popup>

                            {/* Khai báo người phụ trách công đoạn QMS */}
                            <Popup
                                visible={isVisibleQMSProcessResponsiblePerson}
                                title="Khai báo người phụ trách công đoạn QMS"
                                onHiding={() => { setIsVisibleQMSProcessResponsiblePerson(false) }}
                                width={1300}
                                height={800}
                            >
                                <DataGrid
                                    key={'no'}
                                    keyExpr={'no'}
                                    dataSource={data}
                                    showBorders={true}
                                    columnAutoWidth={true}
                                    showRowLines={true}>
                                    <HeaderFilter visible={true} allowSearch={true} />
                                    <Column caption="Mã công đoạn" dataField="codeStage" />
                                    <Column caption="Tên công đoạn" dataField="nameStage" />
                                    <Column caption="Mã Job" dataField="codeJob" />
                                    <Column caption="Tên Job" dataField="nameJob" />
                                    <Column caption="Người phụ trách" dataField="responsiblePerson" />
                                </DataGrid>
                                <div style={{ marginTop: 30, float: "right" }}>
                                    <Button icon="" text="Hủy bỏ" style={{
                                        marginRight: 30, fontSize: 15, width: 100, height: 40, backgroundColor: '#E5E5E5', borderRadius: 5
                                    }} />
                                    <Button icon="" text="Gửi QMS" style={{ fontSize: 15, width: 100, height: 40, backgroundColor: '#FF7A00', color: "#fff", borderRadius: 5 }} />
                                </div>

                            </Popup>
                        </div>
                    </div>
            }
        </>
    )

}


registerScreen({
    caption: "Danh sách kế hoạch sản xuất",
    component: ProductionPlanList,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "productionPlanList"
});

export default ProductionPlanList;