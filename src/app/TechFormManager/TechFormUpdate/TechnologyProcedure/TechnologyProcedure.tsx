import React, { useState } from "react";
import { Button, DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import MaterialAndStructure from "../../TechFormList/TechFormNewAdd/MaterialAndStructure/MaterialAndStructure";
import TechFormUpdateMaterialAndStructure from "../TechFormUpdateMaterialAndStructure/TechFormUpdateMaterialAndStructure";


type TechnologyPocudureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { No: 1, CongDoan: 'In Offset', MaJob: 'JB01-001', TenJob: 'In Offset ra bản' },
    { No: 2, CongDoan: 'In Lưới', MaJob: 'JB01-002', TenJob: 'In lưới: Căng lưới + Chụp lưới' },
    { No: 3, CongDoan: 'Dải từ', MaJob: 'JB03-002', TenJob: 'In Offset: In màu CMYK,P' },
    { No: 4, CongDoan: 'Hostamping', MaJob: 'JB03-002', TenJob: 'QC chọn thẻ card body' },
    { No: 5, CongDoan: 'Gia công- Đóng gói', MaJob: 'JB03-002', TenJob: 'Gia công- Đóng gói : ĐG theo hộp nhỏ' }
];


export const TechnologyPocudure: React.FC<TechnologyPocudureProps> = observer(({
    isOpen = false, setClose }) => {

    const [rowData, setRowData] = useState(data);

    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);


    const HandleTechFormUpdateMaterialAndStructure = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {isAddNewTechForm ?
                <TechFormUpdateMaterialAndStructure
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
                            }}>Trình tự công nghệ/Technology procedure</h5>
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
                                <Column
                                    dataField="CongDoan"
                                    caption="Công đoạn">
                                    <Editing allowUpdating={true} />

                                </Column>
                                <Column dataField="MaJob" caption="Mã Job">
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
                                    className="border-none"
                                    icon="back"
                                    onClick={setClose}
                                    style={{ marginRight: "20px", color: "#333" }}
                                />
                                <Button
                                    className="border-none"
                                    icon="chevronright"
                                    onClick={HandleTechFormUpdateMaterialAndStructure}
                                    style={{ color: "#fff" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )

})

export default TechnologyPocudure;