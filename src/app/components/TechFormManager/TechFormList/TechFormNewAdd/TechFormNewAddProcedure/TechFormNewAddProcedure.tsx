import React, { useEffect, useState } from "react";
import { Button, DataGrid, DropDownBox, Popup, TextBox } from "devextreme-react";
import DateBox from 'devextreme-react/date-box';
import "./TechFormNewAddProcedure.css";
import { Column, Editing, Button as ButtonIcon } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormHostamping from "../TechFormHostamping/TechFormHostamping";

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

    const handleAddFormTechHostamping = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {
                isAddNewTechForm
                    ?
                    <TechFormHostamping
                        isOpen={isAddNewTechForm}
                        setClose={() => setIsAddNewTechForm(false)} />
                    :
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
                                    key={'id'}
                                    keyExpr={'id'}
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
                                                    <TextBox
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
                                                        <input type="checkbox" id="In" checked={true} />
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
                                                    <TextBox
                                                        className="inputRow"
                                                        placeholder="--Nhập--"
                                                    />
                                                )}
                                            />

                                            <Column dataField="note" caption="Ghi chú/Note"
                                                cellRender={() => (
                                                    <TextBox
                                                        className="inputRow"
                                                        placeholder="--Nhập--"
                                                    />
                                                )}
                                            />
                                        </Column>
                                    </Column>
                                    <Column type={'buttons'} caption={""} alignment="center" >
                                        <ButtonIcon icon='add' />
                                        <ButtonIcon icon='trash' />
                                    </Column>
                                </DataGrid>
                            </div>
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
                                        key={'id'}
                                        dataSource={data}
                                        keyExpr="id"
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}
                                    >
                                        <Column dataField="id" caption="Bước" alignment="left" width={100} />
                                        <Column dataField="contens" caption="Nội dung ép/Contens" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="classify" caption="Phân loại/Classify" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="lamination" caption="Thông số máy/Lamination Parameter" width={270} cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="other" caption="Khác/Other"
                                            cellRender={() => (
                                                <TextBox
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}>
                                        </Column>
                                        <Column dataField="structure" caption="Cấu trúc/Structure" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column type={'buttons'} caption={""} alignment="center" >
                                            <ButtonIcon icon='add' />
                                            <ButtonIcon icon='trash' />
                                        </Column>
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
                                        key={'id'}
                                        dataSource={rowData}
                                        keyExpr="id"
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}
                                    >
                                        <Column dataField="id" caption="No." alignment="left" width={100} />
                                        <Column dataField="lnk" caption="Mực/Lnk" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="nilon" caption="Nilon" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="cut" caption="Cắt" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="be" caption="Bế"
                                            cellRender={() => (
                                                <TextBox
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}>
                                        </Column>
                                        <Column dataField="dun" caption="Đùn" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="other" caption="Khác/Other" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column type={'buttons'} caption={""} alignment="center" >
                                            <ButtonIcon icon='add' />
                                            <ButtonIcon icon='trash' />
                                        </Column>
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
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column dataField="machine" caption="Máy/Machine" cellRender={() => (
                                            <TextBox
                                                className="inputRow"
                                                placeholder="--Nhập--"
                                            />
                                        )} />
                                        <Column type={'buttons'} caption={""} alignment="center" >
                                            <ButtonIcon icon='add' />
                                            <ButtonIcon icon='trash' />
                                        </Column>
                                    </DataGrid>

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
                                        style={{ marginRight: "18px", backgroundColor: "#E5E5E5", color: "#333" }}
                                    />
                                    <Button text="Tiếp theo" onClick={handleAddFormTechHostamping} style={{ marginRight: "18px", backgroundColor: "#FF7A00", color: "#fff" }} />
                                    <Button text="Thêm mới" style={{ backgroundColor: "gray", color: "#fff" }} />
                                </div>
                            </div>
                        </div>
                    </div>

            }
        </>
    )

})

export default TechFormNewAddProcedure;