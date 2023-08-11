import React, { useState } from "react";
import { Button, DataGrid, Template, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import TechProcedure from "../../../TechFormList/TechFormNewAdd/TechProcedure/TechProcedure";
import { observer } from "mobx-react";
import { ImportTechForm } from "../../../../import/ImportTechForm";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type TechFormBodyCardProps = {
    isOpen: boolean,
    setClose?: () => void;

};
export const TechFormBodyCard: React.FC<TechFormBodyCardProps> = observer(({
    isOpen = false, setClose }) => {

    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);

    const data1 = [
        { title1: 'Mã sx/Production', data1: '1500928', title2: 'Người gửi/Sender', data2: 'Nguyễn Thị A' },
        { title1: 'Tên khách hàng/Customer', data1: 'Ngân hang A', title2: 'Số lượng thẻ/Quantity', data2: '15000' },
        { title1: 'Tên thẻ/Card name', data1: 'Thẻ VP-Bank', title2: 'Số lượng đã tính bù hao', data2: '16000' },
        { title1: 'Số HĐ/PO', data1: 'PO0001', title2: 'Kết thúc sx/Finish', data2: '30/7/2023' },
        { title1: 'Bắt đầu sx/Start', data1: '30/6/2023', title2: 'Giao hàng/Delivery date', data2: '1/8/2023' },
    ];

    const data2 = [
        {
            Id: 1, MatTruocNoiDung: 'Nội dung Mặt trước 1', MatTruocSoLuong: 10, MatTruocKichThuocBan: 'A4', MatSauNoiDung: 'Nội dung Mặt sau 1', MatSauSoLuong: 5, MatSauKichThuocBan: 'A4'
        }
    ];

    const handleAddFormTechProcedure = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {isAddNewTechForm ?
                <TechProcedure
                    isOpen={isAddNewTechForm}
                    setClose={() => setIsAddNewTechForm(false)}
                /> :
                <div>
                    <div className="table-responsive">
                        <div className="informer" style={{
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Thêm mới phiếu công nghệ</h5>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0,
                                textAlign: "center"
                            }}>PHIẾU CÔNG NGHỆ - TECH FORM</h5>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0,
                                textAlign: "center"
                            }}>(Phôi thẻ - Body card)</h5>
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <DataGrid dataSource={data1} showBorders={true} columnAutoWidth={true} showColumnHeaders={false}
                                showRowLines={true} showColumnLines={true}
                            >
                                <Column dataField="title1" alignment={"left"} cssClass={"highlightColumn"}>
                                    <Template name="title1">
                                        {(rowData) => <span className="alkoji" style={{ fontWeight: "bold" }}>{rowData.title1}</span>}
                                    </Template>
                                </Column>
                                <Column dataField="data1" caption="Data 1" alignment={"left"}>
                                    <Template name={"abc"}>
                                        {(rowData) => <span>{rowData.data1}</span>}
                                    </Template>
                                </Column>
                                <Column dataField="title2" alignment={"left"} cssClass={"highlightColumn"}>
                                    <Template name="title1">
                                        {(rowData) => <span style={{ fontWeight: 'bold' }}>{rowData.title2}</span>}
                                    </Template>
                                </Column>
                                <Column dataField="data2" caption="Data 2" alignment={"left"}>
                                    <Template name="abcd">
                                        {(rowData) => <span>{rowData.title2}</span>}
                                    </Template>
                                </Column>
                            </DataGrid>
                            <div className="informer" style={{
                                background: "#fff",
                                textAlign: "left",
                                paddingTop: 15,
                                paddingBottom: 10,
                                // marginTop: 20
                            }}>
                                <h5 className="name" style={{
                                    fontSize: 18,
                                    marginBottom: 0
                                }}>Quy cách sản phẩm/Product Spec</h5>

                            </div>
                            <DataGrid
                                dataSource={data2}
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}
                            >
                                <Column dataField="MatTruocNoiDung" caption="Khổ thẻ/Size"
                                    cellRender={() => (
                                        <TextBox
                                            className="inputRow"
                                            placeholder="--Nhập--"
                                        />
                                    )}
                                />
                                <Column alignment="left"
                                    dataField="MatTruocSoLuong"
                                    caption="Kích thước/Size, Dài/Length * Rộng/Width(mm)"
                                    cellRender={() => (
                                        <TextBox
                                            className="inputRow"
                                            placeholder="--Nhập--"
                                        />
                                    )} />
                                <Column dataField="MatTruocKichThuocBan"
                                    caption="Kích thước/size"
                                    cellRender={() => (
                                        <TextBox
                                            className="inputRow"
                                            placeholder="--Nhập--"
                                        />
                                    )}
                                />
                                <Column dataField="MatTruocKichThuocBan"
                                    caption="Khác/other"
                                    cellRender={() => (
                                        <TextBox
                                            className="inputRow"
                                            placeholder="--Nhập--"
                                        />
                                    )}
                                />
                            </DataGrid>
                            <div className="informer" style={{
                                background: "#fff",
                                textAlign: "left",
                                paddingTop: 15,
                                paddingBottom: 10,
                                // marginTop: 15
                            }}>
                                <h5 className="name" style={{
                                    fontSize: 18,
                                }}>Thiết kế/Card design</h5>
                                {/* <ImportTechForm /> */}
                                <div className="mt-24">
                                    <Upload.Dragger
                                        multiple={false}
                                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="48" viewBox="0 0 50 48" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0.559998C20.8758 0.572932 16.8921 2.06058 13.7688 4.75419C11.375 6.81692 9.64062 9.5047 9.19375 12.2019C3.95625 13.3582 0 17.9212 0 23.4312C0 29.8319 5.3375 34.9387 11.8156 34.9387H23.4375V18.3963L16.7313 25.1064C16.4379 25.3998 16.0399 25.5646 15.625 25.5646C15.2101 25.5646 14.8121 25.3998 14.5187 25.1064C14.2254 24.8129 14.0605 24.415 14.0605 24C14.0605 23.585 14.2254 23.1871 14.5187 22.8936L23.8937 13.5176C24.0389 13.3721 24.2113 13.2566 24.4011 13.1779C24.591 13.0991 24.7945 13.0585 25 13.0585C25.2055 13.0585 25.409 13.0991 25.5989 13.1779C25.7887 13.2566 25.9611 13.3721 26.1063 13.5176L35.4813 22.8936C35.7746 23.1871 35.9395 23.585 35.9395 24C35.9395 24.415 35.7746 24.8129 35.4813 25.1064C35.1879 25.3998 34.7899 25.5646 34.375 25.5646C33.9601 25.5646 33.5621 25.3998 33.2687 25.1064L26.5625 18.3963V34.9387H39.65C45.3187 34.9387 50 30.4694 50 24.8532C50 19.7402 46.1188 15.5741 41.1438 14.8709C40.3844 6.80754 33.4062 0.559998 25 0.559998ZM23.4375 45.8773V34.9387H26.5625V45.8773C26.5625 46.2918 26.3979 46.6892 26.1049 46.9823C25.8118 47.2754 25.4144 47.44 25 47.44C24.5856 47.44 24.1882 47.2754 23.8951 46.9823C23.6021 46.6892 23.4375 46.2918 23.4375 45.8773Z" fill="#FF7A00" />
                                            </svg>
                                        </p>
                                        <p className="ant-upload-text">Kéo thả file hoặc <a style={{ color: '#FF7A00' }} >Chọn file</a> để tải lên</p>
                                        <p className="ant-upload-hint">Chỉ cho phép file dạng .xls, .xlsx và dung lượng không quá 1MB</p>
                                    </Upload.Dragger>
                                </div>
                            </div>
                            <div
                                className="toolbar"
                                style={{
                                    marginTop: 10,
                                    float: "right",
                                    background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Button
                                    text="Trở lại"
                                    onClick={setClose}
                                    style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333" }}
                                />
                                <Button
                                    text="Tiếp theo"
                                    onClick={handleAddFormTechProcedure}
                                    style={{ backgroundColor: "#FF7A00", color: "#fff" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
})

export default TechFormBodyCard;