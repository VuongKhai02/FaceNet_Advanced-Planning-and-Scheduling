import React, { useState } from "react";
import { TextBox } from "devextreme-react";
import DateBox from "devextreme-react/date-box";
import "./MaterialAndStructure.css";
import { observer } from "mobx-react";
import TechFormNewAddProcedure from "../TechFormNewAddProcedure/TechFormNewAddProcedure";
import { Button, Input, Table } from "antd";
import SvgIcon from "../../../../../../shared/components/SvgIcon/SvgIcon";

type MaterialAndStructureProps = {
    isOpen: boolean;
    setClose?: () => void;
};

const data = [
    { No: 1, CongDoan: "", MaJob: "", TenJob: "", structure: "a" },
    { No: 2, CongDoan: "", MaJob: "", TenJob: "", structure: "b" },
    { No: 3, CongDoan: "", MaJob: "", TenJob: "", structure: "c" },
];

const data1 = [
    {
        Id: 1,
        MatTruocNoiDung: "Nội dung Mặt trước 1",
        MatTruocSoLuong: 10,
        MatTruocKichThuocBan: "A4",
        MatSauNoiDung: "Nội dung Mặt sau 1",
        MatSauSoLuong: 5,
        MatSauKichThuocBan: "A4",
    },
    {
        Id: 2,
        MatTruocNoiDung: "Nội dung Mặt trước 2",
        MatTruocSoLuong: 8,
        MatTruocKichThuocBan: "A3",
        MatSauNoiDung: "Nội dung Mặt sau 2",
        MatSauSoLuong: 3,
        MatSauKichThuocBan: "A3",
    },
];

export const MaterialAndStructure: React.FC<MaterialAndStructureProps> = observer(({ isOpen = false, setClose }) => {
    const [fromDateTime, setFromDateTime] = useState("");
    const [toDateTime, setToDateTime] = useState("");
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);

    const handleFromDateTimeChange = (e: any) => {
        setFromDateTime(e.value);
    };

    const handleToDateTimeChange = (e: any) => {
        setToDateTime(e.value);
    };

    const handleAddFormTechProcedure = () => {
        setIsAddNewTechForm(true);
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechFormNewAddProcedure isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
                <div className=''>
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
                                Thêm mới phiếu công nghệ
                            </h5>
                        </div>
                        <div className='subtile'>
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Vật liệu cấu trúc/ Material and Structure : </h6>
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ/from</h6>
                            <DateBox
                                placeholder='dd/mm/yyyy'
                                style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                                value={fromDateTime}
                                onValueChanged={handleFromDateTimeChange}
                                type='datetime'
                            />
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}> đến/to</h6>
                            <DateBox
                                placeholder='dd/mm/yyyy'
                                style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                                value={toDateTime}
                                onValueChanged={handleToDateTimeChange}
                                type='datetime'
                            />
                        </div>
                        <div style={{ marginTop: 30 }}>

                            <Table dataSource={data} rowKey='No' key='No' bordered={false} pagination={false}>
                                <Table.Column dataIndex='No' title='No.' align='left' />
                                <Table.Column dataIndex='CongDoan' title='Công đoạn' />
                                <Table.Column dataIndex='MaterialCode' title='Mã vật tư' />
                                <Table.Column dataIndex='quantity' title='Số lượng' />
                                <Table.Column
                                    dataIndex='note'
                                    title='Ghi chú/Remarks'
                                    render={() => <TextBox placeholder='Nhập' key={"No"} />}
                                />
                                <Table.Column
                                    onCell={(item: any, index) => {
                                        return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 };
                                    }}
                                    dataIndex='structure'
                                    title='Cấu trúc/Structure'
                                    render={() => (
                                        <div>
                                            <img
                                                src='https://img3.thuthuatphanmem.vn/uploads/2019/07/05/anh-chan-dung-con-gai-toc-ngan_082837328.jpg'
                                                width={150}
                                                height={220}></img>
                                        </div>
                                    )}
                                />
                            </Table>
                            <div className='container'>
                                <div className='checkbox'>
                                    <label htmlFor='raPhim' style={{ fontWeight: 500 }}>
                                        Ra phim/Pre-press
                                    </label>
                                    <input type='checkbox' id='raPhim' />
                                </div>
                                <div className='checkbox'>
                                    <label htmlFor='raBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                                        Ra bản/PC to plate
                                    </label>
                                    <input type='checkbox' id='raBan' />
                                </div>
                                <div className='input'>
                                    <label htmlFor='tongSoBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                                        Tổng số bản: &ensp;
                                    </label>
                                    <TextBox
                                        className='inputRow'
                                        placeholder='Nhập'
                                        id='id'
                                        style={{ width: 200, height: 33, marginLeft: 10 }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Table dataSource={data1} bordered={false} rowKey='Id' pagination={false}>
                                    <Table.ColumnGroup title='Mặt trước/Front' fixed='left'>
                                        <Table.Column
                                            dataIndex='MatTruocNoiDung'
                                            title='Nội dung/Item'
                                            render={() => <Input placeholder='Nhập' />}
                                        />
                                        <Table.Column
                                            dataIndex='MatTruocSoLuong'
                                            title="Số lượng/Q'ty"
                                            align='left'
                                            render={() => <Input placeholder='Nhập' />}
                                        />
                                        <Table.Column
                                            dataIndex='MatTruocKichThuocBan'
                                            title='Kích thước bản/Plate size'
                                            render={() => <Input placeholder='Nhập' />}
                                        />
                                    </Table.ColumnGroup>
                                    <Table.ColumnGroup title='Mặt sau/Back' fixed='left'>
                                        <Table.Column
                                            dataIndex='MatTruocNoiDung'
                                            title='Nội dung/Item'
                                            render={() => <Input placeholder='Nhập' />}
                                        />
                                        <Table.Column
                                            dataIndex='MatTruocSoLuong'
                                            title="Số lượng/Q'ty"
                                            align='left'
                                            render={() => <Input placeholder='Nhập' />}
                                        />
                                        <Table.Column
                                            dataIndex='MatTruocKichThuocBan'
                                            title='Kích thước bản/Plate size'
                                            render={() => <Input placeholder='Nhập' />}
                                        />
                                    </Table.ColumnGroup>
                                    <Table.Column
                                        title=''
                                        dataIndex='operation'
                                        align='center'
                                        width={80}
                                        render={() => (
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                <SvgIcon
                                                    tooltipTitle='Thêm mới'
                                                    sizeIcon={17}
                                                    textSize={17}
                                                    icon='assets/icons/Add.svg'
                                                    textColor='#FF7A00'
                                                    style={{ marginRight: 17 }}
                                                />
                                                <SvgIcon
                                                    tooltipTitle='Xóa hàng'
                                                    sizeIcon={17}
                                                    textSize={17}
                                                    icon='assets/icons/Trash.svg'
                                                    textColor='#FF7A00'
                                                />
                                            </div>
                                        )}
                                    />
                                </Table>
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
                                >Trở lại</Button>
                                <Button
                                    onClick={handleAddFormTechProcedure}
                                    style={{ marginRight: "10px", backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                                >Tiếp theo</Button>
                                <Button style={{ width: 100 }} disabled>Thêm mới</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default MaterialAndStructure;
