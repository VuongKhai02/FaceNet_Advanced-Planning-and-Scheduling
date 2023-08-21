import React from "react";
import { Button, DataGrid, Template } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechnologyPocudure from "./TechnologyProcedure/TechnologyProcedure";
import "./TechFormDetail.css";
type TechFormDetailProps = {
    isOpen: boolean;
    setClose?: () => void;
};

export const TechFormDetail: React.FC<TechFormDetailProps> = observer(({ isOpen = false, setClose }) => {
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const data1 = [
        { title1: "Mã sx/Production", data1: "1500928", title2: "Người gửi/Sender", data2: "Nguyễn Thị A" },
        { title1: "Tên khách hàng/Customer", data1: "Ngân hang A", title2: "Số lượng thẻ/Quantity", data2: "15000" },
        { title1: "Tên thẻ/Card name", data1: "Thẻ VP-Bank", title2: "Số lượng đã tính bù hao", data2: "16000" },
        { title1: "Số HĐ/PO", data1: "PO0001", title2: "Kết thúc sx/Finish", data2: "30/7/2023" },
        { title1: "Bắt đầu sx/Start", data1: "30/6/2023", title2: "Giao hàng/Delivery date", data2: "1/8/2023" },
    ];

    const data2 = [
        {
            Id: 1,
            MatTruocNoiDung: "Nội dung Mặt trước 1",
            MatTruocSoLuong: 10,
            MatTruocKichThuocBan: "A4",
            MatSauNoiDung: "Nội dung Mặt sau 1",
            MatSauSoLuong: 5,
            MatSauKichThuocBan: "A4",
        },
    ];

    const handleTechnologyPocudure = () => {
        setIsAddNewTechForm(true);
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechnologyPocudure isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
                <div>
                    <div className='table-responsive'>
                        <div
                            className='informer'
                            style={{
                                textAlign: "left",
                                paddingTop: 12,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                }}>
                                Xem chi tiết phiếu công nghệ
                            </h5>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    textAlign: "center",
                                }}>
                                PHIẾU CÔNG NGHỆ - TECH FORM
                            </h5>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    textAlign: "center",
                                }}>
                                (Phôi thẻ - Body card)
                            </h5>
                            <h6
                                style={{
                                    fontSize: 15,
                                    textAlign: "right",
                                    fontWeight: "normal",
                                }}>
                                Tổng số lô: {"1"}
                            </h6>
                            <h6
                                style={{
                                    fontSize: 15,
                                    textAlign: "right",
                                    fontWeight: "normal",
                                }}>
                                Số lô: {"1"}
                            </h6>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <DataGrid
                                dataSource={data1}
                                showBorders={true}
                                columnAutoWidth={true}
                                showColumnHeaders={false}
                                showRowLines={true}
                                showColumnLines={true}>
                                <Column dataField='title1' alignment={"left"} cssClass={"highlightColumn"}>
                                    <Template name='title1'>
                                        {(rowData) => (
                                            <span className='alkoji' style={{ fontWeight: "bold" }}>
                                                {rowData.title1}
                                            </span>
                                        )}
                                    </Template>
                                </Column>
                                <Column dataField='data1' caption='Data 1' alignment={"left"}>
                                    <Template name={"abc"}>{(rowData) => <span>{rowData.data1}</span>}</Template>
                                </Column>
                                <Column dataField='title2' alignment={"left"} cssClass={"highlightColumn"}>
                                    <Template name='title1'>
                                        {(rowData) => <span style={{ fontWeight: "bold" }}>{rowData.title2}</span>}
                                    </Template>
                                </Column>
                                <Column dataField='data2' caption='Data 2' alignment={"left"}>
                                    <Template name='abcd'>{(rowData) => <span>{rowData.title2}</span>}</Template>
                                </Column>
                            </DataGrid>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 20
                                }}>
                                <h5 style={{ marginTop: 30 }}>Mức độ ưu tiên: {"1"}</h5>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginTop: 30,
                                    }}>
                                    Quy cách sản phẩm/Product Spee
                                </h5>
                            </div>
                            <DataGrid dataSource={data2} showBorders={true} showRowLines={true} showColumnLines={true}>
                                <Column dataField='MatTruocNoiDung' caption='Khổ thẻ/Size' />
                                <Column
                                    alignment='left'
                                    dataField='MatTruocSoLuong'
                                    caption='Kích thước/Size, Dài/Length * Rộng/Width(mm)'
                                />
                                <Column dataField='MatTruocKichThuocBan' caption='Kích thước/size' />
                                <Column dataField='MatTruocKichThuocBan' caption='Khác/other' />
                            </DataGrid>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 15
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                    }}>
                                    Thiết kế - Card design
                                </h5>
                            </div>
                            <div className='outer-rectangle'>
                                <div className='inner-rectangle'>
                                    <div className='text'>
                                        Chú ý: -Màu theo tờ mẫu đã làm T05/2020 Khách hàng khó tính, các công đoạn làm chuẩn theo mẫu -CTH
                                        in Barcode MS thẻ từ VCCP227002 Dán lable LP2 Xuất tồn kho 900 thẻ
                                    </div>
                                </div>

                                <div className='image-container'>
                                    <img
                                        src='https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png'
                                        alt='Credit Card'
                                        className='credit-card-image'
                                    />
                                </div>
                            </div>
                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 10,
                                    float: "right",
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    className='border-none'
                                    icon='back'
                                    onClick={setClose}
                                    style={{ marginRight: "20px", color: "#333" }}
                                />
                                <Button
                                    className='border-none'
                                    icon='chevronright'
                                    onClick={handleTechnologyPocudure}
                                    style={{ color: "#fff" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default TechFormDetail;
