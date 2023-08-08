import React, { useEffect, useState } from "react";
import { Button, DataGrid, DropDownBox, Popup } from "devextreme-react";
import {
    Column, Editing
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { ImportOrder } from "../../../../import/ImportOrder";
import { observer } from "mobx-react";
import MaterialAndStructure from "../MaterialAndStructure/MaterialAndStructure";
import { ImportTechForm } from "../../../../import/ImportTechForm";


const ROUTING_PATH = "/TechProcedure";
type TechProcedureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { No: 1, CongDoan: '', MaJob: '', TenJob: '' },
    { No: 2, CongDoan: '', MaJob: '', TenJob: '' },
    { No: 3, CongDoan: '', MaJob: '', TenJob: '' },
];

const selectBoxOptions = ['Làm việc', 'Nghỉ ngơi', 'Kiểm tra'];

export const TechProcedure: React.FC<TechProcedureProps> = observer(({
    isOpen = false, setClose }) => {

    const [rowData, setRowData] = useState(data);

    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);

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

    const handleAddFormTechMaterialAndStructure = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {isAddNewTechForm ?
                <MaterialAndStructure
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
                        </div>
                        <ImportTechForm />

                        <div style={{ marginTop: 100 }}>
                            <DataGrid
                                dataSource={rowData}
                                keyExpr="No"
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}
                            >
                                <Column dataField="No" caption="No." allowEditing={false} alignment="left" />
                                <Column
                                    dataField="CongDoan"
                                    caption="Công đoạn" cellRender={({ data, key }) => (
                                        <DropDownBox
                                            placeholder="--Chọn--"
                                            dataSource={selectBoxOptions}
                                            valueExpr="value"
                                            displayExpr="label"
                                            value={data[key]?.CongDoan || '--Chọn--'}
                                            onValueChanged={(e) => handleCongDoanChange(e, key)}
                                            showClearButton={true}
                                        />
                                    )}>
                                    <Editing allowUpdating={true} />

                                </Column>
                                <Column dataField="MaJob" caption="Mã Job" cellRender={({ data, key }) => (
                                    <DropDownBox
                                        placeholder="--Chọn--"
                                        dataSource={selectBoxOptions}
                                        valueExpr="value"
                                        displayExpr="label"
                                        value={data[key]?.MaJob || '--Chọn--'}
                                        onValueChanged={(e) => handleMaJobChange(e, key)}
                                        showClearButton={true}
                                    />
                                )}>
                                    <Editing allowUpdating={true} />
                                </Column>
                                <Column dataField="TenJob" caption="Tên Job" />

                            </DataGrid>
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
                                <Button
                                    text="Tiếp theo"
                                    onClick={handleAddFormTechMaterialAndStructure}
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


registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: TechProcedure,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "techProcedure"
});

export default TechProcedure;