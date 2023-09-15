import React from "react";
import { DataGrid } from "devextreme-react";
import "./TechFormDetailHostamping.css";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";

type TechFormDetailHostampingProps = {
    isOpen: boolean;
    setClose?: () => void;
};
const data = [{ id: 1, boxType: "Hộp 500", quantity: "40", from: "10", to: "40" }];
const data1 = [
    {
        id: 1,
        step: "Công đoạn/Process",
        icType: "Chip SLJ32PDA016X2 CoM8.4-6-1( 6 pins Gold) load both Visa and Master applet",
        quantity: "19,430.00",
        icCode: "IC01CBANK000021",
    },
];

const data2 = [
    { position: "Kích thước/Size", type: "Item 1", machine: false, temp: "" },
    { position: "Loại/Type", type: "Item 1", machine: false, temp: "" },
    { position: "Máy/Machine", type: "Item 1", machine: false, temp: "" },
    { position: "Nhiệt độ/Temp", type: "Item 1", machine: false, temp: "" },
];

const data3 = [
    {
        id: 1,
        process: "Hostamping: Hots Hologram",
        content: "DCK Visa",
        rmcode: "1C04HOLGRAM050",
        typehots: "Visa holagram màu bạc",
        position: "Theo LP/Thẻ mẫu",
        machine: "",
        other: "",
    },
];

export const TechFormDetailHostamping: React.FC<TechFormDetailHostampingProps> = observer(({ isOpen = false, setClose }) => {
    const { t } = useTranslation(["common"]);
    const handleNextClick = () => {
        console.log("Tiếp theo");
    };

    return (
        <div className=''>
            <div className='table-responsive'>
                <div style={{ marginTop: 30 }}>
                    <div>
                        <div className='subtile' style={{ marginBottom: 10 }}>
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Hostamping: </h6>
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                Thời gian từ 09/08/2022 đến 19/08/2022
                            </h6>
                        </div>
                        <DataGrid
                            key={"id"}
                            dataSource={data3}
                            keyExpr='id'
                            showBorders={true}
                            showRowLines={true}
                            showColumnLines={true}>
                            <Column dataField='id' caption='Bước' alignment='center' width={100} />
                            <Column dataField='process' caption='Công đoạn' />
                            <Column dataField='content' alignment='center' caption='Nội dung hots' />
                            <Column dataField='rmcode' alignment='center' caption='Mã vật liệu' />
                            <Column dataField='typehots' alignment='center' caption='Loại phôi hots' />
                            <Column dataField='position' alignment='center' caption='Vị trí'></Column>
                            <Column dataField='machine' alignment='center' caption='Máy' />
                            <Column dataField='other' alignment='center' caption='Khác' />
                        </DataGrid>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div className='subtile' style={{ marginBottom: 15 }}>
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>IC: </h6>
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                Thời gian từ 09/08/2022 đến 19/08/2022
                            </h6>
                        </div>
                        <div>
                            <div>
                                <Table dataSource={data1} rowKey='id' bordered={false} pagination={false}>
                                    <Table.Column title='Trình tự' dataIndex='id' key='id' align='left' width={130} />
                                    <Table.Column title='Chủng loại' dataIndex='icType' key='icType' align='center' />
                                    <Table.Column title='Số lượng' dataIndex='quantity' key='quantity' align='center' />
                                    <Table.Column title='Mã chip' dataIndex='icCode' key='icCode' align='center' />
                                    <Table.Column title='OS' dataIndex='version' key='version' align='center' />
                                    <Table.Column title='Other' dataIndex='other' key='other' align='center' />
                                </Table>

                                <Table dataSource={data1} rowKey='id' bordered={false} pagination={false}>
                                    <Table.Column title='Trình tự' dataIndex='step' key='id' align='left' width={130} />
                                    <Table.Column title='Bước 1' dataIndex='icType' key='step1' align='center' />
                                    <Table.Column title='Bước 2' dataIndex='icType' key='step2' align='center' />
                                    <Table.Column title='Bước 3' dataIndex='icType' key='step3' align='center' />
                                    <Table.Column title='Bước 4' dataIndex='icType' key='step4' align='center' />
                                </Table>
                                <Table key={"type"} id='type' dataSource={data2} rowKey='position' bordered={false} pagination={false}>
                                    <Table.Column title='Vị trí' dataIndex='position' key='position' width={130} />
                                    <Table.ColumnGroup title='Lỗ ngoài'>
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 8 } : { colSpan: 1 };
                                            }}
                                            title='Dài'
                                            dataIndex='length'
                                            key='length'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return index !== 2 ? (
                                                    [1, 3].includes(index) ? (
                                                        ''
                                                        // <Input
                                                        //     style={{ width: 250, float: "left" }}
                                                        //     className='inputRow'
                                                        //     placeholder='Nhập'
                                                        // />
                                                    ) : (
                                                        ''
                                                        // <Input className='inputRow' placeholder='Nhập' />
                                                    )
                                                ) : (
                                                    ''
                                                    // <SelectBox style={{ width: 250, float: "left" }} placeholder='Lựa chọn' />
                                                );
                                            }}
                                        />
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='Rộng'
                                            dataIndex='width'
                                            key='width'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='Sâu'
                                            dataIndex='depth'
                                            key='depth'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='DK'
                                            dataIndex='diameter'
                                            key='diameter'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                    </Table.ColumnGroup>
                                    <Table.ColumnGroup title='Lỗ trong'>
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='Dài'
                                            dataIndex='length'
                                            key='length'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='Rộng'
                                            dataIndex='width'
                                            key='width'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='Sâu'
                                            dataIndex='depth'
                                            key='depth'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                        <Table.Column
                                            onCell={(item: any) => {
                                                return item.position !== "Kích thước" ? { colSpan: 0 } : { colSpan: 1 };
                                            }}
                                            title='DK'
                                            dataIndex='diameter'
                                            key='diameter'
                                            align='center'
                                            render={(value, record: any, index) => {
                                                return record.position === "Kích thước" ? (
                                                    ''
                                                    // <Input className='inputRow' placeholder='Nhập' />
                                                ) : null;
                                            }}
                                        />
                                    </Table.ColumnGroup>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div className='subtile' style={{ marginBottom: 15 }}>
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Đóng gói: </h6>
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                Thời gian từ 09/08/2022 đến 19/08/2022
                            </h6>
                        </div>
                        <DataGrid key={"id"} dataSource={data} keyExpr='id' showBorders={true} showRowLines={true} showColumnLines={true}>
                            <Column dataField='id' caption='STT' alignment='center' width={100} />
                            <Column dataField='boxType' alignment='center' caption='Loại hộp' width={300} />
                            <Column dataField='productLabel' alignment='center' caption='Temp sản phẩm'>
                                <Column dataField='quantity' alignment='center' caption="Số lượng" />
                                <Column dataField='from' alignment='center' caption='Từ' />
                                <Column dataField='to' alignment='center' caption='Đến' />
                            </Column>
                        </DataGrid>
                    </div>
                    <div className='noteRemark'>
                        <div className='note'>
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ghi chú: </h6>
                        </div>
                        <div className='rectangle-container'>
                            <div className='text-section'>
                                <div className='text'>Phê duyệt</div>
                                <div className='date'>Ngày/tháng/năm</div>
                            </div>
                            <div className='text-section'>
                                <div className='text'>Kiểm tra</div>
                                <div className='date'>Ngày/tháng/năm</div>
                            </div>
                            <div className='text-section' >
                                <div className='text'>Người lập biểu</div>
                                <div>
                                    <img
                                        src='assets/images/Signature.png'
                                        width={60}
                                        height={30}
                                    />
                                </div>

                                <div className='date'>28/11/2023</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='toolbar'
                        style={{
                            marginTop: 20,
                            paddingBottom: 30,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            // background: "#ffffff"
                            borderRadius: "4px",
                        }}>
                        <Button
                            onClick={setClose}
                            style={{ marginRight: "10px", backgroundColor: "gray", color: "#fff", width: 100 }}
                        >{t("common.back-button")}</Button>
                        <Button
                            onClick={handleNextClick}
                            style={{ backgroundColor: "#737070", color: "#fff", width: 100, marginRight: "10px" }}
                        >Từ chối</Button>
                        <Button style={{ width: 100 }} onClick={handleNextClick} className='buttons' >Ký duyệt</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TechFormDetailHostamping;
