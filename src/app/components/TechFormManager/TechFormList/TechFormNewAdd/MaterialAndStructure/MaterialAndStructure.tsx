import React, { useState } from "react";
import { Button, DataGrid, TextBox } from "devextreme-react";
import DateBox from 'devextreme-react/date-box';
import "./MaterialAndStructure.css";
import {
    Column, Button as ButtonIcon
} from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormNewAddProcedure from "../TechFormNewAddProcedure/TechFormNewAddProcedure";
import { Input, Table } from "antd";
import SvgIcon from "../../../../../icons/SvgIcon/SvgIcon";


type MaterialAndStructureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { No: 1, CongDoan: '', MaJob: '', TenJob: '', structure: 'a' },
    { No: 2, CongDoan: '', MaJob: '', TenJob: '', structure: 'b' },
    { No: 3, CongDoan: '', MaJob: '', TenJob: '', structure: 'c' },
];

const data1 = [
    {
        Id: 1, MatTruocNoiDung: 'Nội dung Mặt trước 1', MatTruocSoLuong: 10, MatTruocKichThuocBan: 'A4', MatSauNoiDung: 'Nội dung Mặt sau 1', MatSauSoLuong: 5, MatSauKichThuocBan: 'A4'
    },
    {

        Id: 2, MatTruocNoiDung: 'Nội dung Mặt trước 2', MatTruocSoLuong: 8, MatTruocKichThuocBan: 'A3', MatSauNoiDung: 'Nội dung Mặt sau 2', MatSauSoLuong: 3, MatSauKichThuocBan: 'A3'
    },
];


const selectBoxOptions = ['Làm việc', 'Nghỉ ngơi', 'Kiểm tra'];

export const MaterialAndStructure: React.FC<MaterialAndStructureProps> = observer(({
    isOpen = false, setClose }) => {

    const [rowData, setRowData] = useState(data);
    const [fromDateTime, setFromDateTime] = useState('');
    const [toDateTime, setToDateTime] = useState('');
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);


    const handleFromDateTimeChange = (e) => {
        setFromDateTime(e.value);
    };

    const handleToDateTimeChange = (e) => {
        setToDateTime(e.value);
    };


    const handleAddFormTechProcedure = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {isAddNewTechForm ?
                <TechFormNewAddProcedure
                    isOpen={isAddNewTechForm}
                    setClose={() => setIsAddNewTechForm(false)} />
                :
                <div className="box__shadow-table-responsive" >
                    <div className="table-responsive">
                        <div className="informer" style={{
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Thêm mới phiếu công nghệ</h5>
                        </div>
                        <div className="subtile">
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Vật liệu cấu trúc/ Material and Structure : </h6>
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ/from</h6>
                            <DateBox
                                placeholder="dd/mm/yyyy"
                                style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                                value={fromDateTime}
                                onValueChanged={handleFromDateTimeChange}
                                type="datetime"
                            // displayFormat="shortdatetime"
                            />
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}> đến/to</h6>
                            <DateBox
                                placeholder="dd/mm/yyyy"
                                style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                                value={toDateTime}
                                onValueChanged={handleToDateTimeChange}
                                type="datetime"
                            // displayFormat="shortdatetime"
                            />
                        </div>
                        <div style={{ marginTop: 30 }}>
                            {/* <DataGrid
                                dataSource={rowData}
                                keyExpr="No"
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}
                            >
                                <Column dataField="No" caption="No." allowEditing={false} alignment="left" />
                                <Column dataField="CongDoan" caption="Công đoạn" />
                                <Column dataField="MaterialCode" caption="Mã vật tư" />
                                <Column dataField="quantity" caption="Số lượng" />
                                <Column dataField="note" caption="Ghi chú/Remarks"
                                    cellRender={() => (
                                        <TextBox
                                            className="inputRow"
                                            placeholder="Nhập"
                                        />
                                    )}>
                                </Column>
                                <Column dataField="structure" caption="Cấu trúc/Structure" />
                            </DataGrid> */}
                            <Table
                                dataSource={data}
                                rowKey="No"
                                key='No'
                                bordered
                                pagination={false}
                            >
                                <Table.Column dataIndex="No" title="No." align="left" />
                                <Table.Column dataIndex="CongDoan" title="Công đoạn" />
                                <Table.Column dataIndex="MaterialCode" title="Mã vật tư" />
                                <Table.Column dataIndex="quantity" title="Số lượng" />
                                <Table.Column dataIndex="note" title="Ghi chú/Remarks" render={() => <TextBox placeholder="Nhập" key={'No'} />} />
                                <Table.Column
                                    onCell={(item: any, index) => {
                                        return index === 0 ? { rowSpan: 3 } : { rowSpan: 0 }
                                    }}
                                    dataIndex="structure" title="Cấu trúc/Structure" render={() => <div><img src="https://img3.thuthuatphanmem.vn/uploads/2019/07/05/anh-chan-dung-con-gai-toc-ngan_082837328.jpg" width={150} height={220}></img></div>} />
                            </Table>
                            <div className="container">
                                <div className="checkbox">
                                    <label htmlFor="raPhim" style={{ fontWeight: 500 }}>Ra phim/Pre-press</label>
                                    <input type="checkbox" id="raPhim" />
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="raBan" style={{ fontWeight: 500, marginLeft: 50 }}>Ra bản/PC to plate</label>
                                    <input type="checkbox" id="raBan" />
                                </div>
                                <div className="input">
                                    <label htmlFor="tongSoBan" style={{ fontWeight: 500, marginLeft: 50 }}>Tổng số bản:</label>
                                    <TextBox
                                        className="inputRow"
                                        placeholder="Nhập"
                                        id="id"
                                        style={{ width: 200, height: 33, marginLeft: 10 }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Table
                                    dataSource={data1}
                                    bordered
                                    rowKey="Id"
                                    pagination={false}
                                >
                                    <Table.ColumnGroup title="Mặt trước/Front" fixed="left">
                                        <Table.Column
                                            dataIndex="MatTruocNoiDung"
                                            title="Nội dung/Item"
                                            render={() => <Input className="inputRow" placeholder="Nhập" />}
                                        />
                                        <Table.Column
                                            dataIndex="MatTruocSoLuong"
                                            title="Số lượng/Q'ty"
                                            align="left"
                                            render={() => <Input className="inputRow" placeholder="Nhập" />}
                                        />
                                        <Table.Column
                                            dataIndex="MatTruocKichThuocBan"
                                            title="Kích thước bản/Plate size"
                                            render={() => <Input className="inputRow" placeholder="Nhập" />}
                                        />
                                    </Table.ColumnGroup>
                                    <Table.ColumnGroup title="Mặt sau/Back" fixed="left">
                                        <Table.Column
                                            dataIndex="MatTruocNoiDung"
                                            title="Nội dung/Item"
                                            render={() => <Input className="inputRow" placeholder="Nhập" />}
                                        />
                                        <Table.Column
                                            dataIndex="MatTruocSoLuong"
                                            title="Số lượng/Q'ty"
                                            align="left"
                                            render={() => <Input className="inputRow" placeholder="Nhập" />}
                                        />
                                        <Table.Column
                                            dataIndex="MatTruocKichThuocBan"
                                            title="Kích thước bản/Plate size"
                                            render={() => <Input className="inputRow" placeholder="Nhập" />}
                                        />
                                    </Table.ColumnGroup>
                                    <Table.Column
                                        title=""
                                        dataIndex="operation"
                                        align="center"
                                        width={80}
                                        render={() => <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon tooltipTitle="Thêm mới" sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                            <SvgIcon tooltipTitle="Xóa hàng" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        </div>}
                                    />
                                </Table>
                            </div>
                            <div
                                className="toolbar"
                                style={{
                                    marginTop: 10,
                                    float: "right",
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Button
                                    text="Trở lại"
                                    onClick={setClose}
                                    style={{ marginRight: "18px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                                />
                                <Button text="Tiếp theo" onClick={handleAddFormTechProcedure} style={{ marginRight: "18px", backgroundColor: "#FF7A00", color: "#fff" }} />
                                <Button text="Thêm mới" style={{ backgroundColor: "gray", color: "#fff" }} />
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )

})

export default MaterialAndStructure;