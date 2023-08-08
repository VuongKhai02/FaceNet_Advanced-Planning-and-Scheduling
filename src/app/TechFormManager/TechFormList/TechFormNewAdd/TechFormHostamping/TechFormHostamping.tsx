import React, { useEffect, useState } from "react";
import { Button, DataGrid, DropDownBox, Popup, TextBox } from "devextreme-react";
import DateBox from 'devextreme-react/date-box';
import "./TechFormHostamping.css";
import { Column, Editing } from "devextreme-react/data-grid";
import { observer } from "mobx-react";

type TechFormHostampingProps = {
    isOpen: boolean,
    setClose?: () => void;

};
const data = [
    { id: 1, name: 'Item 1', isChecked: false },
    { id: 2, name: 'Item 2', isChecked: true },
];

const data1 = [
    { TrinhTu: 1, ChungLoai: 'A', SoLuong: 10, MaChip: 'ABC123', OS: 'Windows', Other: 'Lorem ipsum' },
    { TrinhTu: 2, ChungLoai: 'B', SoLuong: 5, MaChip: 'DEF456', OS: 'Linux', Other: 'Dolor sit amet' },
    // Thêm dữ liệu cho các bước khác nếu cần
];

const titles = [
    { title: 'Chủng loại', key: 'ChungLoai' },
    { title: 'Số lượng', key: 'SoLuong' },
    { title: 'Mã chip', key: 'MaChip' },
    { title: 'OS', key: 'OS' },
    { title: 'Other', key: 'Other' },
];

const subtitles = [
    { subtitle: 'Step 1', key: 'Step1' },
    { subtitle: 'Step 2', key: 'Step2' },
    { subtitle: 'Step 3', key: 'Step3' },
    { subtitle: 'Step 4', key: 'Step4' },
    // Thêm các bước khác nếu cần
];


export const TechFormHostamping: React.FC<TechFormHostampingProps> = observer(({
    isOpen = false, setClose }) => {

    const [rowData, setRowData] = useState(data);
    const [fromDateTime, setFromDateTime] = useState('');
    const [toDateTime, setToDateTime] = useState('');
    const [currentTitle, setCurrentTitle] = useState('TrinhTu');

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
                        <Column dataField="id" caption="Bước" alignment="center" width={100} />
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
                        <Editing allowDeleting={true} useIcons={true} />
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
                        dataSource={rowData}
                        keyExpr="id"
                        showBorders={true}
                        showRowLines={true}
                        showColumnLines={true}
                    >
                        <Column dataField="id" caption="Trình tự/Step" alignment="left" width={100} />
                        <Column dataField="icType" caption="Chủng loại/IC Type" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="quantity" caption="Số lượng/Quantity" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="icCode" caption="Mã chip/IC Code" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="os" caption="OS/Version"
                            cellRender={() => (
                                <TextBox
                                    className="inputRow"
                                    placeholder="--Nhập--"
                                />
                            )}>
                        </Column>
                        <Column dataField="other" caption="Other/Khác" cellRender={() => (
                            <TextBox
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Editing allowDeleting={true} useIcons={true} />
                    </DataGrid>

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
                        dataSource={rowData}
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
                        <Editing allowDeleting={true} useIcons={true} />
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
                        background: "#f2f2f2",
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