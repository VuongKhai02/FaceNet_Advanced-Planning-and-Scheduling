import React, { useEffect, useState } from "react";
import { Button, DataGrid, DropDownBox, Popup } from "devextreme-react";
import DateBox from 'devextreme-react/date-box';
import "./MaterialAndStructure.css";
import {
    Column, Editing, GroupItem
} from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormNewAddProcedure from "../TechFormNewAddProcedure/TechFormNewAddProcedure";


type MaterialAndStructureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { No: 1, CongDoan: '', MaJob: '', TenJob: '' },
    { No: 2, CongDoan: '', MaJob: '', TenJob: '' },
    { No: 3, CongDoan: '', MaJob: '', TenJob: '' },
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


    const handleCongDoanChange = (e, rowKey) => {
        const newData = rowData.map((row) =>
            row.No === rowKey ? { ...row, CongDoan: e.value } : row
        );
        setRowData(newData);
    };

    const handleMaJobChange = (e, rowKey) => {
        const newData = rowData.map((row) =>
            row.No === rowKey ? { ...row, MaJob: e.value } : row
        );
        setRowData(newData);
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
                            <DataGrid
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
                                        <input
                                            className="inputRow"
                                            placeholder="--Nhập--"
                                        />
                                    )}>
                                </Column>
                                <Column dataField="structure" caption="Cấu trúc/Structure" />
                                <Editing allowDeleting={true} useIcons={true} />
                            </DataGrid>
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
                                    <input placeholder="--Nhập--" id="tongSoBan" style={{ width: 200, height: 33, marginLeft: 10, borderColor: "aliceblue" }} />
                                </div>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <DataGrid
                                    dataSource={data1}
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}
                                >
                                    <Column dataField="Id" caption="Id" visible={false} />
                                    <Column alignment="center" caption="Mặt trước/Front" fixed >
                                        <Column dataField="MatTruocNoiDung" caption="Nội dung/Item"
                                            cellRender={() => (
                                                <input
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}
                                        />
                                        <Column dataField="MatTruocSoLuong" caption="Số lượng/Q'ty"
                                            cellRender={() => (
                                                <input
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )} />
                                        <Column dataField="MatTruocKichThuocBan"
                                            caption="Kích thước bản/Plate size"
                                            cellRender={() => (
                                                <input
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}
                                        />
                                    </Column>
                                    <Column alignment="center" caption="Mặt sau/Back" fixed>
                                        <Column dataField="MatTruocNoiDung" caption="Nội dung/Item"
                                            cellRender={() => (
                                                <input
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}
                                        />
                                        <Column dataField="MatTruocSoLuong" caption="Số lượng/Q'ty"
                                            cellRender={() => (
                                                <input
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}
                                        />
                                        <Column dataField="MatTruocKichThuocBan" caption="Kích thước bản/Plate size"
                                            cellRender={() => (
                                                <input
                                                    className="inputRow"
                                                    placeholder="--Nhập--"
                                                />
                                            )}
                                        />
                                    </Column>
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
                                <Button text="Tiếp theo" onClick={handleAddFormTechProcedure} style={{ backgroundColor: "#FF7A00", color: "#fff" }} />
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )

})

export default MaterialAndStructure;