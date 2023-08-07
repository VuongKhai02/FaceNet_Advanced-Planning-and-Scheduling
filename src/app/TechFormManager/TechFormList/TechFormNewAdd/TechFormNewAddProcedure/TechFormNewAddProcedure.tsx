import React, { useEffect, useState } from "react";
import { Button, DataGrid, DropDownBox, Popup } from "devextreme-react";
import DateBox from 'devextreme-react/date-box';
import "./TechFormNewAddProcedure.css";
import CustomGrid from './CustomGrid';
import { Column, Editing } from "devextreme-react/data-grid";
import { observer } from "mobx-react";

type TechFormNewAddProcedureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { id: 1, name: 'Item 1', isChecked: false },
    { id: 2, name: 'Item 2', isChecked: true },
];



export const TechFormNewAddProcedure: React.FC<TechFormNewAddProcedureProps> = observer(({
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


    const handleNextClick = () => {
        console.log("Tiếp theo");
    };

    const onCheckboxChanged = (e) => {
        const updatedData = [...rowData];
        updatedData[e.rowIndex].isChecked = e.value;
        setRowData(updatedData);
    };

    const checkboxTemplate = (cellData) => {
        return (
            <input
                type="checkbox"
                defaultChecked={cellData.data.isChecked}
                onChange={(e) => onCheckboxChanged({ rowIndex: cellData.rowIndex, value: e.target.checked })}
            />
        );
    };

    const renderCheckbox = (data) => {
        return <input type="checkbox" checked={data.value} />;
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
            <div className="subtile">
                <h6 style={{ fontSize: 15, fontWeight: 500 }}>In/Printing : </h6>
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
            <div style={{ marginTop: 30 }}>
                <DataGrid
                    dataSource={data}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                >
                    <Column alignment="left" caption="Công nghệ In/Printing Technology" fixed>
                        <Column alignment="left" caption="Nội dung In/Printing Contents" fixed >
                            <Column dataField="id" alignment="center" caption="Bước/Step" width={100} >
                                {/* <Column>
                                    <Column dataField="" caption="Front" width={50} />
                                    <Column dataField="" caption="Back" width={50} />
                                </Column> */}
                                {/* <Column dataField="id" width={50} alignment="left" caption="" /> */}
                            </Column>
                            <Column dataField="Item" caption="Nội dung/Item"
                                cellRender={() => (
                                    <input
                                        className="inputRow"
                                        placeholder="--Nhập--"
                                    />
                                )}
                            />
                            <Column dataField="method" caption="Phương pháp/Method"
                                cellRender={({ data, key }) => (
                                    <DropDownBox
                                        placeholder="--Chọn--"
                                        dataSource={data}
                                        valueExpr="value"
                                        displayExpr="label"
                                        value={data[key]?.CongDoan || '--Chọn--'}
                                        showClearButton={true}
                                    />
                                )} />

                        </Column>
                    </Column>
                    <Column
                        // caption="Chọn"
                        alignment="left"
                        // cellTemplate={checkboxTemplate}
                        headerCellRender={() => {
                            return (
                                <div className="checkbox">
                                    <div>
                                        <input type="checkbox" id="In" />
                                        <label htmlFor="In" className="checkBoxStyle">In trở Nó</label>
                                    </div>
                                    <div style={{ marginLeft: 120 }}>
                                        <input type="checkbox" id="In" />
                                        <label htmlFor="In" className="checkBoxStyle">In trở Khác</label>
                                    </div>
                                </div>
                            );
                        }}
                    >
                        <Column alignment="center" caption="File" fixed>
                            <Column dataField="colour"
                                caption="Màu/Colour"
                                cellRender={() => (
                                    <input
                                        className="inputRow"
                                        placeholder="--Nhập--"
                                    />
                                )}
                            />

                            <Column dataField="note" caption="Ghi chú/Note"
                                cellRender={() => (
                                    <input
                                        className="inputRow"
                                        placeholder="--Nhập--"
                                    />
                                )}
                            />
                        </Column>
                    </Column>
                    <Editing allowDeleting={true} useIcons={true} />
                </DataGrid>
            </div>

            {/* Trên làm sau */}


            <div style={{ marginTop: 30 }}>
                <div >
                    <div className="subtile" style={{ marginBottom: 15 }}>
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ép/Lamination : </h6>
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
                        <Column dataField="id" caption="Bước" alignment="left" width={100} />
                        <Column dataField="contens" caption="Nội dung ép/Contens" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="classify" caption="Phân loại/Classify" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="lamination" caption="Thông số máy/Lamination Parameter" width={270} cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="other" caption="Khác/Other"
                            cellRender={() => (
                                <input
                                    className="inputRow"
                                    placeholder="--Nhập--"
                                />
                            )}>
                        </Column>
                        <Column dataField="structure" caption="Cấu trúc/Structure" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Editing allowDeleting={true} useIcons={true} />
                    </DataGrid>

                </div>
                <div style={{ marginTop: 30 }}>
                    <div className="subtile" style={{ marginBottom: 15 }}>
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Gia công/Processing : </h6>
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
                        <Column dataField="id" caption="No." alignment="left" width={100} />
                        <Column dataField="lnk" caption="Mực/Lnk" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="nilon" caption="Nilon" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="cut" caption="Cắt" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="be" caption="Bế"
                            cellRender={() => (
                                <input
                                    className="inputRow"
                                    placeholder="--Nhập--"
                                />
                            )}>
                        </Column>
                        <Column dataField="dun" caption="Đùn" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="other" caption="Khác/Other" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Editing allowDeleting={true} useIcons={true} />
                    </DataGrid>

                </div>
                <div style={{ marginTop: 30 }}>
                    <div className="subtile" style={{ marginBottom: 15 }}>
                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Cut/Cutting : </h6>
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
                        <Column dataField="id" caption="No." alignment="left" width={100} />
                        <Column dataField="content" caption="Nội dung/Content" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Column dataField="machine" caption="Máy/Machine" cellRender={() => (
                            <input
                                className="inputRow"
                                placeholder="--Nhập--"
                            />
                        )} />
                        <Editing allowDeleting={true} useIcons={true} />
                    </DataGrid>

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
                        style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333" }}
                    />
                    <Button text="Tiếp theo" onClick={handleNextClick} style={{ backgroundColor: "#FF7A00", color: "#fff" }} />
                </div>
            </div>
        </div>
    </div>
})

export default TechFormNewAddProcedure;