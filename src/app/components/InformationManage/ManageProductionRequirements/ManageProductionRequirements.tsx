import React, { } from "react";
import { Button, DataGrid, SelectBox, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    Selection, ColumnChooser, Button as ButtonB
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import "./ManageProductionRequirements.css";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { InfoCircleOutlined } from "@ant-design/icons";
import PopupDetailProductionRequire from "../../../shared/components/PopupDetailProductionRequire/PopupDetailProductionRequire";
import ViewDetailProductRequires from "./ViewDetailProductRequires/ViewDetailProductRequires";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";


const data = [
    {
        productCode: '15010623', someContracts: '1001456', customerName: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', cardName: 'Phôi thẻ MC Tita Cashback debit, VP Bank', quantity: '15,000', startDate: '20/07/2023', endDate: '30/07/2023', status: 'Đã phê duyệt'
    },
    {
        productCode: '15010624', someContracts: '1001456', customerName: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', cardName: 'Phôi thẻ MC Tita Cashback debit, VP Bank', quantity: '15,000', startDate: '21/07/2023', endDate: '31/07/2023', status: 'Đã phê duyệt'
    },
    {
        productCode: '15010625', someContracts: '1001456', customerName: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', cardName: 'Phôi thẻ MC Tita Cashback debit, VP Bank', quantity: '15,000', startDate: '22/07/2023', endDate: '29/07/2023', status: 'Đã phê duyệt'
    }
];


const ROUTING_PATH = "/manageProductionRequirements";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];
export const ManageProductionRequirements = () => {

    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isVisibleDetailProductionRequire, setIsVisibleDetailProductionRequire] = React.useState<boolean>(false);
    const [isViewDetailProductRequire, setIsViewDetailProductRequire] = React.useState<boolean>(false);

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    }
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    }

    return (
        <>
            {
                isViewDetailProductRequire ?
                    <ViewDetailProductRequires
                        isOpen={isViewDetailProductRequire}
                        setClose={() => { setIsViewDetailProductRequire(false) }}
                    /> :
                    <div className="box__shadow-table-responsive">
                        <div className="table-responsive">
                            <div className="informer" style={{
                                background: "#fff",
                                textAlign: "center",
                                paddingTop: 12
                            }}>
                                <h5 className="name" style={{
                                    fontSize: 18,
                                    marginBottom: 0
                                }}>Danh sách yêu cầu sản xuất</h5>
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
                            <div>
                                <DataGrid
                                    key="productCode"
                                    keyExpr={"productCode"}
                                    dataSource={data}
                                    showBorders={true}
                                    columnAutoWidth={true}
                                    showRowLines={true}
                                    rowAlternationEnabled={true}
                                    allowColumnResizing={true}
                                    allowColumnReordering={true}
                                    focusedRowEnabled={true}

                                >
                                    <PopupDetailProductionRequire
                                        isVisible={isVisibleDetailProductionRequire}
                                        modalContent={
                                            <div style={{ marginTop: 30, marginBottom: 50 }}>
                                                <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <td style={{ marginLeft: 30 }}>
                                                        <p>Mã sx/Production Code </p>
                                                        <TextBox id="productionCode" key={'productionCode'} value="09020523" width={300} className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Tên khách hàng/Customer</p>
                                                        <TextBox id="customer" key={'customer'} value="Chi nhánh Công Ty Cổ Phần Thông Minh MK" className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Tên thẻ/Card name  </p>
                                                        <TextBox id="cardName" key={'cardName'} value="Phôi thẻ Visa Cam 1, TPBank, T5/2023, Slg 3k " className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Số HĐ/P.O</p>
                                                        <TextBox id="someContracts" key={'someContracts'} value="1245886" className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Bắt đầu sx/Start </p>
                                                        <TextBox id="start" key={'start'} value="16/06/2023" className="colorTextBox"></TextBox>

                                                    </td>
                                                    <td style={{ marginRight: 30 }}>
                                                        <p>Người gửi/Sender</p>
                                                        <TextBox id="sender" key={'sender'} value="Bùi Thanh Quang" width={300} className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Số lượng thẻ/Q'ty</p>
                                                        <TextBox id="quantity" key={'quantity'} value="3,000" className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>SL thẻ đã tính bù hao</p>
                                                        <TextBox id="lossCard" key={'lossCard'} value="3,000" className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Kết thúc sx/Finish</p>
                                                        <TextBox id="finish" key={'finish'} value="30/06/2023" className="colorTextBox"></TextBox>
                                                        <p style={{ marginTop: 30 }}>Giao hàng/ Delivery Date</p>
                                                        <TextBox id="deliveryDate" key={'deliveryDate'} value="30/06/2023" className="colorTextBox"></TextBox>

                                                    </td>
                                                </table>
                                            </div>
                                        }
                                        modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            Thông tin chi tiết yêu cầu sản xuất
                                        </div>}
                                        width={800}
                                        onCancel={() => setIsVisibleDetailProductionRequire(false)}
                                        onSubmit={() => { }}
                                    />
                                    <PopupConfirmDelete
                                        isVisible={isConfirmDelete}
                                        onCancel={handleHideModalDel}
                                        onSubmit={() => console.log('ok')
                                        }
                                        modalTitle={
                                            <div>
                                                <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500, fontSize: 25 }}>
                                                    <InfoCircleOutlined style={{ color: '#ff794e', marginRight: '8px', display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30 }} />
                                                    Xác nhận xóa?
                                                </h3>
                                            </div>
                                        }
                                        modalContent={<div><h5 style={{ height: 80, fontWeight: 400, marginTop: 30, fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>Bạn có chắc chắn muốn thực hiện thao tác xóa không?</h5></div>}
                                        width={600} />
                                    <Toolbar>
                                        <ToolbarItem name="searchPanel" location="before" />
                                        <ToolbarItem name="columnChooserButton" location="after"></ToolbarItem>
                                    </Toolbar>
                                    {/* <HeaderFilter visible={true} texts={{
                                        cancel: "Hủy bỏ",
                                        ok: "Đồng ý",
                                        emptyValue: "Rỗng"

                                    }} allowSearch={true} /> */}
                                    <FilterRow visible={true} />
                                    <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />
                                    <Paging defaultPageSize={10} />
                                    <ColumnChooser enabled={true} allowSearch={true} mode="select" title="Chọn cột" />
                                    <Pager
                                        visible={true}
                                        allowedPageSizes={allowedPageSizes}
                                        displayMode={"compact"}
                                        showPageSizeSelector={true}
                                        showInfo={true}
                                        showNavigationButtons={true}
                                        infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                                    <Column
                                        dataField="productCode"
                                        caption="Mã sản xuất"
                                    />
                                    <Column
                                        dataField="someContracts"
                                        caption="Số hợp đồng"
                                    />

                                    <Column dataField="customerName"
                                        caption="Tên khách hàng"
                                        alignment="left"
                                    />

                                    <Column
                                        dataField="cardName"
                                        caption="Tên thẻ"
                                        alignment={"left"}
                                    />
                                    <Column dataField="quantity" caption="Số lượng" />
                                    <Column caption={"Ngày bắt đầu"} dataType="datetime" dataField={"startDate"}
                                        format="dd/MM/yyyy hh:mm:ss" />
                                    <Column
                                        dataField="endDate"
                                        dataType="datetime"
                                        format="dd/MM/yyyy hh:mm:ss"
                                        alignment={"left"}
                                        caption={"Ngày kết thúc"}
                                    />
                                    <Column caption={"Trạng thái"} dataField="status" />
                                    <Column type={'buttons'} caption={"Thao tác"} alignment="left"
                                        cellRender={() =>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <SvgIcon onClick={() => { setIsViewDetailProductRequire(true) }} tooltipTitle="Xem chi tiết yêu cầu sản xuất" sizeIcon={17} textSize={17} icon="assets/icons/InfoCircle.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                                <SvgIcon onClick={() => { setIsVisibleDetailProductionRequire(true) }} tooltipTitle="Thêm phiếu công nghệ" sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                                <SvgIcon onClick={handleShowModalDel} tooltipTitle="Xóa" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" />
                                            </div>
                                        }
                                    >
                                    </Column>
                                </DataGrid>
                            </div>
                        </div>
                    </div>
            }
        </>
    )

}

registerScreen({
    caption: "Quản lý yêu cầu sản xuất",
    component: ManageProductionRequirements,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "manageProductionRequirements"
});

export default ManageProductionRequirements;