import React, { useState } from "react";
import { Button, DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { Table, Upload } from "antd";
import TechFormUpdateMaterialAndStructure from "../TechFormUpdateMaterialAndStructure/TechFormUpdateMaterialAndStructure";

type TechnologyProcedureUpdateProps = {
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
    { no: '4', materialName: 'PVC (Back)', supplier: 'JHNM', thickNess: '0.15', quantity: '850', note: '', structure: '' },
    { no: '5', materialName: 'Overlay (Back)', supplier: 'CPPC', thickNess: '0.05', quantity: '850', note: '', structure: '' },
    { no: '6', materialName: 'Dải từ', supplier: '', thickNess: '', quantity: 'HI-co đen 12.7', note: '', structure: '' }
]

export const TechnologyProcedureUpdate: React.FC<TechnologyProcedureUpdateProps> = observer(({
    isOpen = false, setClose }) => {

    const [isVisibleTechFormUpdateMaterialAndStructure, setIsVisibleTechFormUpdateMaterialAndStructure] = React.useState<boolean>(false);


    return (
        <>
            {isVisibleTechFormUpdateMaterialAndStructure ?
                <TechFormUpdateMaterialAndStructure
                    isOpen={isVisibleTechFormUpdateMaterialAndStructure}
                    setClose={() => setIsVisibleTechFormUpdateMaterialAndStructure(false)}
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
                                    <Table.Column onCell={(item, index) => {
                                        return index === 2 ? { rowSpan: 2 } : index === 3 ? { rowSpan: 0 } : { rowSpan: 1 }
                                    }} title="Tên vật liệu/Materials Name" dataIndex="materialName" key="materialName" align="center" />
                                    <Table.Column title="Xuất xứ/Supplier" dataIndex="supplier" key="supplier" align="center" />
                                    <Table.Column title="Độ dày/Thickness(mm)" dataIndex="thickNess" key="thickNess" align="center" onCell={(item, index: any) => {
                                        return index === 2 ? { rowSpan: 3 } : [3, 4].includes(index) ? { rowSpan: 0 } : { rowSpan: 1 }
                                    }} />
                                    <Table.Column onCell={(item, index: any) => {
                                        return index === 2 ? { rowSpan: 3 } : [3, 4].includes(index) ? { rowSpan: 0 } : { rowSpan: 1 }
                                    }} title="Số lượng/Q'ty(tấm)" dataIndex="quantity" key="quantity" align="center" />
                                    <Table.Column title="Ghi chú/Remark" dataIndex="remark" key="remark" align="center" />
                                    <Table.Column
                                        onCell={(item, index: any) => {
                                            return index === 0 ? { rowSpan: 9 } : { rowSpan: 0 }
                                        }}
                                        title="Cấu trúc/Structure"
                                        dataIndex='structure'
                                        key="structure"
                                        align="center"
                                        className="no-border-column"
                                        render={() => <div><img src="https://img3.thuthuatphanmem.vn/uploads/2019/07/05/anh-chan-dung-con-gai-toc-ngan_082837328.jpg" width={150} height={220}></img></div>}
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
                                <div className="mt-24" style={{ marginBottom: 30, width: '100%', display: "flex", justifyContent: "center" }}>
                                    <Upload.Dragger
                                        multiple={false}
                                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="48" viewBox="0 0 50 48" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0.559998C20.8758 0.572932 16.8921 2.06058 13.7688 4.75419C11.375 6.81692 9.64062 9.5047 9.19375 12.2019C3.95625 13.3582 0 17.9212 0 23.4312C0 29.8319 5.3375 34.9387 11.8156 34.9387H23.4375V18.3963L16.7313 25.1064C16.4379 25.3998 16.0399 25.5646 15.625 25.5646C15.2101 25.5646 14.8121 25.3998 14.5187 25.1064C14.2254 24.8129 14.0605 24.415 14.0605 24C14.0605 23.585 14.2254 23.1871 14.5187 22.8936L23.8937 13.5176C24.0389 13.3721 24.2113 13.2566 24.4011 13.1779C24.591 13.0991 24.7945 13.0585 25 13.0585C25.2055 13.0585 25.409 13.0991 25.5989 13.1779C25.7887 13.2566 25.9611 13.3721 26.1063 13.5176L35.4813 22.8936C35.7746 23.1871 35.9395 23.585 35.9395 24C35.9395 24.415 35.7746 24.8129 35.4813 25.1064C35.1879 25.3998 34.7899 25.5646 34.375 25.5646C33.9601 25.5646 33.5621 25.3998 33.2687 25.1064L26.5625 18.3963V34.9387H39.65C45.3187 34.9387 50 30.4694 50 24.8532C50 19.7402 46.1188 15.5741 41.1438 14.8709C40.3844 6.80754 33.4062 0.559998 25 0.559998ZM23.4375 45.8773V34.9387H26.5625V45.8773C26.5625 46.2918 26.3979 46.6892 26.1049 46.9823C25.8118 47.2754 25.4144 47.44 25 47.44C24.5856 47.44 24.1882 47.2754 23.8951 46.9823C23.6021 46.6892 23.4375 46.2918 23.4375 45.8773Z" fill="#FF7A00" />
                                            </svg>
                                        </p>
                                        <p className="ant-upload-text">Kéo thả file hoặc <a style={{ color: '#FF7A00' }} >Chọn file</a> để tải lên</p>
                                        <p className="ant-upload-hint">Chỉ cho phép file dạng .xls, .xlsx và dung lượng không quá 1MB</p>
                                    </Upload.Dragger>
                                </div>
                                <DataGrid
                                    key={'No'}
                                    dataSource={data}
                                    keyExpr="No"
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}
                                >
                                    <Column dataField="" caption="No." allowEditing={false} alignment="left" />
                                    <Column
                                        dataField=""
                                        caption="Công đoạn">
                                        <Editing allowUpdating={true} />

                                    </Column>
                                    <Column dataField="" caption="Mã Job">
                                        <Editing allowUpdating={true} />
                                    </Column>
                                    <Column dataField="" caption="Tên Job" />

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
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: '#E5E5E5', width: 100 }}
                                />
                                <Button
                                    text="Tiếp theo"
                                    onClick={() => { setIsVisibleTechFormUpdateMaterialAndStructure(true) }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: '#FF7A00' }}
                                />
                                <Button
                                    text="Ký lập"
                                    onClick={() => { }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: 'gray', width: 100 }}
                                />
                                <Button
                                    text="Gửi duyệt"
                                    onClick={() => { }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: 'gray' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )

})

export default TechnologyProcedureUpdate;