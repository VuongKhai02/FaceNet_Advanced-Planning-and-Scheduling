import React, { useState } from "react";
import { Button, DataGrid, DropDownBox, TextBox } from "devextreme-react";
import DateBox from 'devextreme-react/date-box';
import "./TechFormHostamping.css";
import { Column, Button as ButtonIcon } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { Input, Table, Button as ButtonAnt } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";

type TechFormHostampingProps = {
    isOpen: boolean,
    setClose?: () => void;

};
const data = [
    { id: 1, process: 'Công đoạn/Process', isChecked: false },
];

const data1 = [
    { position: 'Kích thước/Size', type: 'Item 1', machine: false, temp: '' },
    { position: 'Loại/Type', type: 'Item 1', machine: false, temp: '' },
    { position: 'Máy/Machine', type: 'Item 1', machine: false, temp: '' },
    { position: 'Nhiệt độ/Temp', type: 'Item 1', machine: false, temp: '' }
];


export const TechFormHostamping: React.FC<TechFormHostampingProps> = observer(({
    isOpen = false, setClose }) => {

    const [fromDateTime, setFromDateTime] = useState('');
    const [toDateTime, setToDateTime] = useState('');

    const handleFromDateTimeChange = (e) => {
        setFromDateTime(e.value);
    };

    const handleToDateTimeChange = (e) => {
        setToDateTime(e.value);
    };

    const handleNextClick = () => {
        console.log("Tiếp theo");
    };

    return <div>
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
            <div style={{ marginTop: 30 }}>
                <div >
                    <div className="subtile" style={{ marginBottom: 15 }}>
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Hostamping: </h6>
                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ</h6>
                        <DateBox
                            placeholder="dd/mm/yyyy"
                            style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                            value={fromDateTime}
                            onValueChanged={handleFromDateTimeChange}
                            type="datetime"
                        // displayFormat="shortdatetime"
                        />
                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}> đến</h6>
                        <DateBox
                            placeholder="dd/mm/yyyy"
                            style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                            value={toDateTime}
                            onValueChanged={handleToDateTimeChange}
                            type="datetime"
                        // displayFormat="shortdatetime"
                        />
                    </div>

                    <DataGrid
                        dataSource={data}
                        keyExpr="id"
                        showBorders={true}
                        showRowLines={true}
                        showColumnLines={true}
                    >
                        <Column dataField="" caption="Bước/Step" alignment="center" width={100} />
                        <Column dataField="process" caption="Công đoạn/Process" cellRender={({ data, key }) => (
                            <DropDownBox
                                placeholder="--Chọn--"
                                dataSource={data}
                                valueExpr="value"
                                displayExpr="label"
                                value={'--Chọn--'}
                                showClearButton={true}
                            />
                        )} />
                        <Column dataField="content" alignment="center" caption="Nội dung hots/Content" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="rmcode" alignment="center" caption="Mã vật liệu/RMcode" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="typehots" alignment="center" caption="Loại phôi hots/Type" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="position" alignment="center" caption="Vị trí"
                            cellRender={() => (
                                <TextBox
                                    className="inputRow"
                                    placeholder="--Nhập--"
                                />
                            )}>
                        </Column>
                        <Column dataField="machine" alignment="center" caption="Máy/Machine" cellRender={({ data, key }) => (
                            <DropDownBox
                                placeholder="--Chọn--"
                                dataSource={data}
                                valueExpr="value"
                                displayExpr="label"
                                value={'--Chọn--'}
                                showClearButton={true}
                            />
                        )} />
                        <Column dataField="other" alignment="center" caption="Khác/Other" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column type={'buttons'} caption={""} alignment="center" >
                            <ButtonIcon icon='add' />
                        </Column>
                    </DataGrid>

                </div>
                <div style={{ marginTop: 30 }}>
                    <div className="subtile" style={{ marginBottom: 15 }}>
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>IC: </h6>
                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ</h6>
                        <DateBox
                            placeholder="dd/mm/yyyy"
                            style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                            value={fromDateTime}
                            onValueChanged={handleFromDateTimeChange}
                            type="datetime"
                        />
                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}> đến</h6>
                        <DateBox
                            placeholder="dd/mm/yyyy"
                            style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                            value={toDateTime}
                            onValueChanged={handleToDateTimeChange}
                            type="datetime"
                        />
                    </div>
                    <div>
                        <Table
                            dataSource={data}
                            rowKey="id"
                            bordered
                            pagination={false}
                        >
                            <Table.Column title="Trình tự/Step" dataIndex="" key="id" align="left" width={130} />
                            <Table.Column
                                title="Chủng loại/IC Type"
                                dataIndex="icType"
                                key="icType"
                                align="center"

                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="Số lượng/Quantity"
                                dataIndex="quantity"
                                key="quantity"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="Mã chip/IC Code"
                                dataIndex="icCode"
                                key="icCode"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="OS/Version"
                                dataIndex="version"
                                key="version"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="Other/Khác"
                                dataIndex="other"
                                key="other"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title=""
                                key="actions"
                                align="center"
                                render={() => (
                                    <ButtonAnt icon={<PlusOutlined />} style={{ border: 'none' }} />
                                )}
                            />
                        </Table>

                        <Table
                            dataSource={data}
                            rowKey="id"
                            bordered
                            pagination={false}
                        >
                            <Table.Column title="Trình tự/Step" dataIndex="process" key="id" align="left" width={130} />
                            <Table.Column
                                title="Step 1"
                                dataIndex="icType"
                                key="step1"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="Step 2"
                                dataIndex="icType"
                                key="step2"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="Step 3"
                                dataIndex="icType"
                                key="step3"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                            <Table.Column
                                title="Step 4"
                                dataIndex="icType"
                                key="step4"
                                align="center"
                                render={() => (
                                    <Input className="inputRow" placeholder="--Nhập--" />
                                )}
                            />
                        </Table>

                        <Table
                            dataSource={data1}
                            rowKey="position"
                            bordered
                            pagination={false}
                        >
                            <Table.Column title="Vị trí/Position" dataIndex="position" key="position" width={130} />
                            <Table.ColumnGroup title="Lỗ ngoài/Outside Hole">
                                <Table.Column title="Dài/Length" dataIndex="length" key="length" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                                <Table.Column title="Rộng/Width" dataIndex="width" key="width" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                                <Table.Column title="Sâu/Depth" dataIndex="depth" key="depth" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                                <Table.Column title="DK/Diameter" dataIndex="diameter" key="diameter" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                            </Table.ColumnGroup>
                            <Table.ColumnGroup title="Lỗ trong/Inside Hole">
                                <Table.Column title="Dài/Length" dataIndex="length" key="length" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                                <Table.Column title="Rộng/Width" dataIndex="width" key="width" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                                <Table.Column title="Sâu/Depth" dataIndex="depth" key="depth" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                                <Table.Column title="DK/Diameter" dataIndex="diameter" key="diameter" align="center" render={() => <Input className="inputRow" placeholder="--Nhập--" />} />
                            </Table.ColumnGroup>
                        </Table>
                    </div>

                </div>
                <div style={{ marginTop: 30 }}>
                    <div className="subtile" style={{ marginBottom: 15 }}>
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Đóng gói/Package: </h6>
                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ</h6>
                        <DateBox
                            placeholder="dd/mm/yyyy"
                            style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                            value={fromDateTime}
                            onValueChanged={handleFromDateTimeChange}
                            type="datetime"
                        // displayFormat="shortdatetime"
                        />
                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}> đến</h6>
                        <DateBox
                            placeholder="dd/mm/yyyy"
                            style={{ width: 200, marginTop: -10, marginLeft: 10 }}
                            value={toDateTime}
                            onValueChanged={handleToDateTimeChange}
                            type="datetime"
                        // displayFormat="shortdatetime"
                        />
                    </div>
                    <DataGrid
                        dataSource={data}
                        keyExpr="id"
                        showBorders={true}
                        showRowLines={true}
                        showColumnLines={true}
                    >
                        <Column dataField="id" caption="No." alignment="center" width={100} />
                        <Column dataField="boxtype" alignment="center" caption="Loại hộp/Box Type" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} width={300} />
                        <Column dataField="productLabel" alignment="center" caption="Temp sản phẩm/Product Label" >
                            <Column
                                dataField="quantity"
                                alignment="center"
                                caption="Số lượng/Q'ty"
                                cellRender={() => (
                                    <TextBox
                                        className="inputRow"
                                        placeholder="--Nhập--"
                                    />
                                )}
                            />
                            <Column dataField="from" alignment="center" caption="Từ/From" cellRender={() => (
                                <TextBox
                                    className="inputRow"
                                    placeholder="--Nhập--"
                                />
                            )} />
                            <Column dataField="to" alignment="center" caption="Đến/To" cellRender={() => (
                                <TextBox
                                    className="inputRow"
                                    placeholder="--Nhập--"
                                />
                            )} />
                        </Column>
                        <Column type={'buttons'} caption={""} alignment="center" >
                            <ButtonIcon icon='add' />
                        </Column>
                    </DataGrid>
                </div>
                <div className="noteRemark">
                    <div className="note">
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ghi chú/Remark: </h6>
                        <TextBox
                            className="inputRow"
                            placeholder="--Nhập--"
                            id="id"
                            style={{ width: 200, height: 33, marginLeft: 10 }}
                        />
                    </div>
                    <div className="rectangle-container">
                        <div className="text-section">
                            <div className="text">Phê duyệt/Approved By</div>
                            <div className="date">Ngày/tháng/năm</div>
                        </div>
                        <div className="text-section">
                            <div className="text">Kiểm tra/Checked By</div>
                            <div className="date">Ngày/tháng/năm</div>
                        </div>
                        <div className="text-section">
                            <div className="text">Người lập biểu/Created By</div>
                            <div className="date">Ngày/tháng/năm</div>
                        </div>
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
                        style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                    />
                    <Button text="Tiếp theo" onClick={handleNextClick} style={{ backgroundColor: "#737070", color: "#fff", width: 100, marginRight: "8px" }} />
                    <Button text="Ký lập" onClick={handleNextClick} className="buttons" />
                    <Button text="Gửi duyệt" onClick={handleNextClick} className="buttons" />
                    <Button text="In" onClick={handleNextClick} className="buttons" />
                </div>
            </div>
        </div>
    </div>
})

export default TechFormHostamping;