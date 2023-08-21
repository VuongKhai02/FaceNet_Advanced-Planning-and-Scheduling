import React, { useState } from "react";
import { Button, DataGrid, Template, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { Table, Checkbox } from "antd";

type TechFormBodyCardProps = {
    isOpen: boolean;
    setClose?: () => void;
};
export const ViewDetailProductRequires: React.FC<TechFormBodyCardProps> = observer(({ isOpen = false, setClose }) => {
    const data1 = [
        { title1: "Mã sx/Production", data1: "1500928", title2: "Người gửi/Sender", data2: "Nguyễn Thị A" },
        { title1: "Tên khách hàng/Customer", data1: "Ngân hang A", title2: "Số lượng thẻ/Quantity", data2: "15000" },
        { title1: "Tên thẻ/Card name", data1: "Thẻ VP-Bank", title2: "Số lượng đã tính bù hao", data2: "16000" },
        { title1: "Số HĐ/PO", data1: "PO0001", title2: "Kết thúc sx/Finish", data2: "30/7/2023" },
        { title1: "Bắt đầu sx/Start", data1: "30/6/2023", title2: "Giao hàng/Delivery date", data2: "1/8/2023" },
    ];

    const data2 = [
        {
            key: "1",
            cardName: "Card 1",
            quantity: 10,
            quality: "High",
            content: "Lorem ipsum dolor sit amet",
            color: "Blue",
        },
        {
            key: "2",
            cardName: "Card 2",
            quantity: 5,
            quality: "Medium",
            content: "Consectetur adipiscing elit",
            color: "Green",
        },
    ];

    return (
        <>
            {
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
                                Xem chi tiết yêu cầu sản xuất
                            </h5>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    textAlign: "center",
                                }}>
                                PHIẾU YÊU CẦU SẢN XUẤT
                            </h5>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    textAlign: "center",
                                }}>
                                (Mã sản xuất: 09020523)
                            </h5>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <DataGrid
                                key={"title1"}
                                keyExpr={"title1"}
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
                            <div style={{ marginTop: 30 }}>
                                <Table dataSource={data2} rowKey='No' bordered pagination={false}>
                                    <Table.Column
                                        width={250}
                                        title='Tên thẻ'
                                        dataIndex='cardName'
                                        key='cardName'
                                        onCell={(item: any, index) => {
                                            return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 };
                                        }}
                                        render={() => (
                                            <div>
                                                <div>
                                                    <p>Tên thẻ:</p>
                                                    Phôi thẻ MC Tita Cashback debit, VP Bank, SL thẻ đã tính bù hao T6/2023, Slg 15k thẻ
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Loại thẻ:</p>
                                                    Thẻ Visa DI gắn chip D350 vàng
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Chất liệu:</p>
                                                    <div className='checkbox-row'>
                                                        PVC thường <Checkbox checked={true} style={{ marginLeft: 80 }} />
                                                    </div>
                                                    <div className='checkbox-row'>
                                                        PVC màu <Checkbox style={{ marginLeft: 98 }} />
                                                    </div>
                                                    <div className='checkbox-row'>
                                                        PVC transparent <Checkbox style={{ marginLeft: 55 }} />
                                                    </div>
                                                    <div className='checkbox-row'>
                                                        PVC kim loại <Checkbox style={{ marginLeft: 77 }} />
                                                    </div>
                                                    <div className='checkbox-row'>
                                                        PVC rainbow <Checkbox checked={true} style={{ marginLeft: 76 }} />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Kích thước:</p>
                                                    Cr 80 Độ dày theo chuẩn thẻ EMV dành cho bank
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <Table.Column
                                        width={200}
                                        title='Số lượng'
                                        dataIndex='quantity'
                                        key='quantity'
                                        onCell={(item: any, index: number) => {
                                            return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 };
                                        }}
                                        render={() => (
                                            <div>
                                                <p>3,000</p>
                                                <p>(Làm thêm 10 thẻ gắn chip Demo màu vàng)</p>
                                            </div>
                                        )}
                                    />
                                    <Table.Column
                                        width={300}
                                        title='Chất lượng'
                                        dataIndex='quality'
                                        key='quality'
                                        onCell={(item: any, index) => {
                                            return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 };
                                        }}
                                        render={() => (
                                            <div>
                                                <div>
                                                    <Checkbox style={{ marginRight: 20 }} checked={true} />
                                                    Đảm bảo độ dày cứng, không cong vênh, cắt phẳng, không có bavia, không bong tróc
                                                </div>
                                                <div style={{ marginTop: 20 }}>
                                                    <Checkbox style={{ marginRight: 20 }} checked={true} />
                                                    Overlay
                                                </div>
                                                <div style={{ marginTop: 20 }}>
                                                    <Checkbox style={{ marginRight: 20 }} checked={true} />
                                                    Yêu cầu khác:
                                                    <ul>
                                                        <li>Thẻ sản xuất xong dán LP2 file đính kèm</li>
                                                        <li> Seribarcode chạy từ: FDA000001 đến hết FDA0000</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <Table.Column
                                        width={1000}
                                        title='Nội dung'
                                        dataIndex='content'
                                        key='content'
                                        onCell={(item: any, index) => {
                                            return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 };
                                        }}
                                        render={() => (
                                            <div>
                                                <div>
                                                    <p>Công nghệ in:</p>
                                                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            In offset
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In nhiệt
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In phun
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Dải từ:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            HiCo
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            LoCo
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Hologram
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>Màu: bạc</div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Vị trí dải từ:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mặt trước
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mặt sau
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>In UV chìm</div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            Mặt trước
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mặt sau
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Kích thước dải từ:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            6.5
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            7.4
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            8.4
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            12.7
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Ẩn
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Bề mặt thẻ:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Bóng
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Bóng mờ
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mờ
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            Mờ bóng
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mờ sần
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Dải chữ ký:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Trắng đục
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Trắng trong
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In hiệu ứng
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Màu nhũ:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Bạc
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Vàng
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mẫu
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>Khác</div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Hostamping:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Chữ
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Logo
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Phủ cào
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            Hologram
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            DCK
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Màu Foil:</p>
                                                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Bạc thường
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Vàng thường
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Bạc rainbow
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            Vàng rainbow
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            Khác:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Chip:</p>
                                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Mifare
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Vicinity
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            UHF
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Proximity
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Felica
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            Khác:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Cá thể hóa:</p>
                                                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                        <div>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In ảnh
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} checked={true} />
                                                            In đen
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Indent
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In laser
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In phun
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Encode từ
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Encode chip
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            In tiêu đề thư
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Lồng gấp phong bì
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            CTH Pin
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Dập nổi
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Toper Bạc
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Toper vàng
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>
                                                            <Checkbox style={{ marginRight: 10 }} />
                                                            Phủ cào
                                                        </div>
                                                        <div style={{ marginLeft: 30 }}>Size phủ cào:</div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 30 }}>
                                                    <p>Đóng gói:</p>
                                                    <div>
                                                        <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                            <div>Túi: </div>
                                                            <div style={{ marginLeft: 50 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                100 thẻ
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                25 thẻ
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                50 thẻ
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                100 thẻ
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                Móc khóa
                                                            </div>
                                                        </div>
                                                        <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                            <div>Hộp: </div>
                                                            <div style={{ marginLeft: 42 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                100
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                200
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                250
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                400
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                500
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                Khác:
                                                            </div>
                                                        </div>
                                                        <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                            <div>Thùng: </div>
                                                            <div style={{ marginLeft: 29 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                1000
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                2000
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                2500
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                10000
                                                            </div>
                                                            <div style={{ marginLeft: 30 }}>
                                                                <Checkbox style={{ marginRight: 10 }} />
                                                                Khác:
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Các yêu cầu khác:</p>
                                                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                                                        <div>
                                                            1. Nội dung chuẩn LP, màu sắc hiệu ứng như mẫu gửi xuống, vật liệu PVC rainbow
                                                        </div>
                                                        <div>2. Hiệu ứng Rainbow và UV định vị “Cụm chữ” trên bề mặt thẻ</div>
                                                        <div>3. Hostamping bạc rainbow “Flash 2in1”. Metal sticker cụm logo “TPBank”</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <Table.Column
                                        width={200}
                                        title='Màu sắc'
                                        dataIndex='color'
                                        key='color'
                                        onCell={(item: any, index) => {
                                            return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 };
                                        }}
                                        render={() => (
                                            <div>
                                                <div>
                                                    <Checkbox style={{ marginRight: 20 }} checked={true} />
                                                    Theo bản in thử khách hàng đã ký duyệt gửi kèm
                                                </div>
                                                <div style={{ marginTop: 20 }}>
                                                    <Checkbox style={{ marginRight: 20 }} />
                                                    Theo thẻ mẫu đã phê duyệt gửi kèm
                                                </div>
                                                <div style={{ marginTop: 20 }}>
                                                    <p>Số màu in:</p>

                                                    <div>
                                                        <Checkbox style={{ marginRight: 20 }} checked={true} />
                                                        Mặt trước : -4
                                                    </div>
                                                    <div>
                                                        <Checkbox style={{ marginRight: 20 }} checked={true} />
                                                        Mặt sau : -4
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </Table>
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
                                    text='Trở lại'
                                    onClick={setClose}
                                    style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333" }}
                                />
                                {/* <Button
                                    text="Tiếp theo"
                                    style={{ backgroundColor: "#FF7A00", color: "#fff" }}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
});

export default ViewDetailProductRequires;
