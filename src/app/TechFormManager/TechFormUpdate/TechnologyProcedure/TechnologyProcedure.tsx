import React, { useState } from "react";
import { Button, DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormUpdateMaterialAndStructure from "../TechFormUpdateMaterialAndStructure/TechFormUpdateMaterialAndStructure";
import { Input, Table } from "antd";
import "./TechnologyProcedure.css";

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

const data1 = [
    {
        step1: 'NVL', step2: 'Ra bản', step3: 'Inlay D350 trở nó', step4: 'Nền Nhũ',
        step5: 'In Artwork MT+ MS + UV', step6: 'In nền keo 2 mặt tờ in',
        step7: 'Ép TP', step8: 'Cắt', step9: 'Hots + IC',
        step10: 'Loadkey', step11: 'CTH', step12: 'Đóng gói'
    }
];

const data2 = [
    { no: '1', materialName: 'Overlay (Front)', supplier: 'CPPC', thickNess: '0.05', quantity: '850', note: '', structure: '' },
    { no: '2', materialName: 'PVC (Front)', supplier: 'JHNM', thickNess: '0.15', quantity: '850', note: '', structure: '' },
    { no: '3', materialName: 'Inlay ÉP lần 1', supplier: 'JHNM', thickNess: '0.15 * 3', quantity: '850', note: '', structure: '' },
    { no: '', materialName: '', supplier: 'JHNM', thickNess: '', quantity: '', note: '', structure: '' },
    { no: '', materialName: '', supplier: 'JHNM', thickNess: '', quantity: '', note: '', structure: '' },
    { no: '', materialName: '', supplier: 'JHNM', thickNess: '', quantity: '', note: '', structure: '' },
    { no: '4', materialName: 'PVC (Back)', supplier: 'JHNM', thickNess: '0.15', quantity: '850', note: '', structure: '' },
    { no: '5', materialName: 'Overlay (Back)', supplier: 'CPPC', thickNess: '0.05', quantity: '850', note: '', structure: '' },
    { no: '6', materialName: 'Dải từ', supplier: '', thickNess: '', quantity: 'HI-co đen 12.7', note: '', structure: '' }
]



export const TechnologyPocudure: React.FC<TechnologyPocudureProps> = observer(({
    isOpen = false, setClose }) => {

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
                            }}>1. Trình tự công nghệ/Technology procedure</h5>
                        </div>

                        <div style={{ marginTop: 30 }}>
                            <div>
                                <Table
                                    dataSource={data1}
                                    rowKey="step1"
                                    bordered
                                    pagination={false}
                                >
                                    <Table.Column title="Step1" dataIndex="step1" key="step1" align="left" width={130} />
                                    <Table.Column title="Step2" dataIndex="step2" key="step2" align="center" />
                                    <Table.Column title="Step3" dataIndex="step3" key="step3" align="center" />
                                    <Table.Column title="Step4" dataIndex="step4" key="step4" align="center" />
                                    <Table.Column title="Step5" dataIndex="step5" key="step5" align="center" />
                                    <Table.Column title="Step6" dataIndex="step6" key="step6" align="center" />
                                    <Table.Column title="Step7" dataIndex='step7' key="step7" align="center" />
                                    <Table.Column title="Step8" dataIndex='step8' key="step8" align="center" />
                                    <Table.Column title="Step9" dataIndex='step9' key="step9" align="center" />
                                    <Table.Column title="Step10" dataIndex='step10' key="step10" align="center" />
                                    <Table.Column title="Step11" dataIndex='step11' key="step11" align="center" />
                                    <Table.Column title="Step12" dataIndex='step12' key="step12" align="center" />
                                </Table>
                                <Table
                                    dataSource={data2}
                                    rowKey="no"
                                    bordered
                                    pagination={false}
                                >
                                    <Table.Column title="No." dataIndex="no" key="no" align="left" width={130} />
                                    <Table.Column title="Tên vật liệu/Materials Name" dataIndex="materialName" key="materialName" align="center" />
                                    <Table.Column title="Xuất xứ/Supplier" dataIndex="supplier" key="supplier" align="center" />
                                    <Table.Column title="Độ dày/Thickness(mm)" dataIndex="thickNess" key="thickNess" align="center" />
                                    <Table.Column title="Số lượng/Q'ty(tấm)" dataIndex="quantity" key="quantity" align="center" />
                                    <Table.Column title="Ghi chú/Remark" dataIndex="remark" key="remark" align="center" />
                                    <Table.Column
                                        title="Cấu trúc/Structure"
                                        dataIndex='structure'
                                        key="structure"
                                        align="center"
                                        className="no-border-column"
                                    />
                                </Table>

                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div className="informer" style={{
                                    textAlign: "left",
                                    paddingTop: 12
                                }}>
                                    <h5 className="name" style={{
                                        fontSize: 18,
                                        marginBottom: 30
                                    }}>Trình tự công nghệ/Technology procedure</h5>
                                </div>
                                <DataGrid
                                    dataSource={data}
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