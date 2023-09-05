import React, { } from "react";
import { Button, DataGrid, SelectBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { Input, Table } from "antd";
import { PLANNING_API_URL } from "../../../../../utils/config";
import Loading from "../../../../../shared/components/Loading/Loading";
import httpRequests from "../../../../../utils/httpRequests";

type TechFormDetailHostampingProps = {
    techFormData: any;
    setTechFormData: any;
    isOpen: boolean;
    setClose?: () => void;
};
const data = [{ id: 1, boxType: "Hộp 500", quantity: "40", from: "10", to: "40" }];
const data1 = [
    {
        step: "Công đoạn/Process",
        icType: "Chip SLJ32PDA016X2 CoM8.4-6-1( 6 pins Gold) load both Visa and Master applet",
        quantity: "19,430.00",
        icCode: "IC01CBANK000021",
    },
];

const data2 = [
    { position: "Kích thước/Size", type: "Item 1", machine: false, temp: "" },
    { position: "Loại/Type", type: "Item 1", machine: false, temp: "" },
    { position: "Máy/Machine", type: "Item 1", machine: false, temp: "" },
    { position: "Nhiệt độ/Temp", type: "Item 1", machine: false, temp: "" },
];

export const TechFormUpdateHostamping: React.FC<TechFormDetailHostampingProps> = observer(
    ({ isOpen = false, setClose, techFormData, setTechFormData }) => {

        const [isLoading, setIsLoading] = React.useState(false);

        const handleSaveClick = () => {
            setIsLoading(true);
            httpRequests.put(PLANNING_API_URL + "/api/techforms/" + techFormData.id, techFormData).then((response) => {
                if (response.status === 200) {
                    console.log(response.data.data);
                }
                setTimeout(() => {
                    setIsLoading(false)
                }, 1500)
            }).catch(error => console.error(error));
        }

        const onChangeValueIc = (key: any, value: any) => {
            let tfIcInfo
            if (techFormData.tfIcInfo === null) {
                tfIcInfo = {}
            } else {
                tfIcInfo = techFormData.tfIcInfo
            }
            setTechFormData({
                ...techFormData,
                tfIcInfo: {
                    ...tfIcInfo,
                    [key]: value
                }
            })
        }

        return (
            <>
                <div>
                    <div className='table-responsive'>
                        <div
                            className='informer'
                            style={{
                                textAlign: "left",
                                paddingTop: 12,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                }}>
                                Cập nhật phiếu công nghệ
                            </h5>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <div style={{ marginTop: 30 }}>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>IC: </h6>
                                    <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                        Thời gian từ 09/08/2022 đến 19/08/2022
                                    </h6>
                                </div>
                                <div>
                                    <div>
                                        <Table dataSource={data1} rowKey='id' bordered pagination={false}>
                                            <Table.Column title='Trình tự/Step' dataIndex='' key='id' align='left' width={130} />
                                            <Table.Column title='Chủng loại/IC Type' dataIndex='icType' key='icType' align='center' />
                                            <Table.Column title='Số lượng/Quantity' dataIndex='quantity' key='quantity' align='center' />
                                            <Table.Column title='Mã chip/IC Code' dataIndex='icCode' key='icCode' align='center' />
                                            <Table.Column title='OS/Version' dataIndex='version' key='version' align='center' />
                                            <Table.Column title='Other/Khác' dataIndex='other' key='other' align='center' />
                                            <Table.Column title='' key='actions' align='center' />
                                        </Table>

                                        <Table dataSource={data1} rowKey='id' bordered pagination={false}>
                                            <Table.Column title='Trình tự/Step' dataIndex='step' key='id' align='left' width={130} />
                                            <Table.Column title='Step 1' dataIndex='icType' key='step1' align='center' />
                                            <Table.Column title='Step 2' dataIndex='icType' key='step2' align='center' />
                                            <Table.Column title='Step 3' dataIndex='icType' key='step3' align='center' />
                                            <Table.Column title='Step 4' dataIndex='icType' key='step4' align='center' />
                                        </Table>
                                        <Table key={"type"} id='type' dataSource={data2} rowKey='position' bordered pagination={false}>
                                            <Table.Column title='Vị trí/Position' dataIndex='position' key='position' width={130} />
                                            <Table.ColumnGroup title='Lỗ ngoài/Outside Hole'>
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 8 } : { colSpan: 1 };
                                                    }}
                                                    title='Dài/Length'
                                                    dataIndex='length'
                                                    key='length'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return index !== 2 ? (
                                                            [1, 3].includes(index) ? (
                                                                <Input
                                                                    value={index === 1 ? techFormData.tfIcInfo?.type : techFormData.tfIcInfo?.temp}
                                                                    style={{ width: 250, float: "left" }}
                                                                    className='inputRow'
                                                                    placeholder='--Nhập--'
                                                                    onChange={(e) => {
                                                                        if (index === 1) {
                                                                            onChangeValueIc("type", e.target.value)
                                                                        } else {
                                                                            onChangeValueIc("temp", e.target.value)
                                                                        }
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Input value={techFormData.tfIcInfo?.outsideHoleLength} onChange={(e) => {
                                                                    onChangeValueIc("outsideHoleLength", e.target.value)
                                                                }} className='inputRow' placeholder='--Nhập--' />
                                                            )
                                                        ) : (
                                                            <SelectBox value={techFormData.tfIcInfo?.machine} style={{ width: 250, float: "left" }} placeholder='--Lựa chọn--' />
                                                        );
                                                    }}
                                                />
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='Rộng/Width'
                                                    dataIndex='width'
                                                    key='width'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input value={techFormData.tfIcInfo?.outsideHoleWidth} className='inputRow' onChange={(e) => {
                                                                onChangeValueIc("outsideHoleWidth", e.target.value)
                                                            }} placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='Sâu/Depth'
                                                    dataIndex='depth'
                                                    key='depth'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input value={techFormData.tfIcInfo?.outsideHoleDepth} className='inputRow' onChange={(e) => {
                                                                onChangeValueIc("outsideHoleDepth", e.target.value)
                                                            }} placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='DK/Diameter'
                                                    dataIndex='diameter'
                                                    key='diameter'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input onChange={(e) => {
                                                                onChangeValueIc("outsideHoleDiameter", e.target.value)
                                                            }} value={techFormData.tfIcInfo?.outsideHoleDiameter} className='inputRow' placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                            </Table.ColumnGroup>
                                            <Table.ColumnGroup title='Lỗ trong/Inside Hole'>
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='Dài/Length'
                                                    dataIndex='length'
                                                    key='length'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input value={techFormData.tfIcInfo?.insideHoleLength}
                                                                onChange={(e) => {
                                                                    onChangeValueIc("insideHoleLength", e.target.value)
                                                                }} className='inputRow' placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='Rộng/Width'
                                                    dataIndex='width'
                                                    key='width'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input value={techFormData.tfIcInfo?.insideHoleWidth} className='inputRow' onChange={(e) => {
                                                                onChangeValueIc("insideHoleWidth", e.target.value)
                                                            }} placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='Sâu/Depth'
                                                    dataIndex='depth'
                                                    key='depth'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input value={techFormData.tfIcInfo?.insideHoleDepth} className='inputRow' onChange={(e) => {
                                                                onChangeValueIc("insideHoleDepth", e.target.value)
                                                            }} placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                                <Table.Column
                                                    onCell={(item: any) => {
                                                        return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                    }}
                                                    title='DK/Diameter'
                                                    dataIndex='diameter'
                                                    key='diameter'
                                                    align='center'
                                                    render={(value, record: any, index) => {
                                                        return record.position === "Kích thước/Size" ? (
                                                            <Input value={techFormData.tfIcInfo?.insideHoleDiameter} onChange={(e) => {
                                                                onChangeValueIc("insideHoleDiameter", e.target.value)
                                                            }} className='inputRow' placeholder='--Nhập--' />
                                                        ) : null;
                                                    }}
                                                />
                                            </Table.ColumnGroup>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>Đóng gói/Package: </h6>
                                    <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                        Thời gian từ 09/08/2022 đến 19/08/2022
                                    </h6>
                                </div>
                                <DataGrid
                                    key={"id"}
                                    dataSource={[{ ...techFormData.packing, id: 1 }]}
                                    keyExpr='id'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='id' caption='No.' alignment='center' width={100} />
                                    <Column dataField='boxType' alignment='center' caption='Loại hộp/Box Type' width={300} />
                                    <Column dataField='productLabel' alignment='center' caption='Temp sản phẩm/Product Label'>
                                        <Column dataField='packingLabelQuantity' alignment='center' caption="Số lượng/Q'ty" />
                                        <Column dataField='packingLabelFrom' alignment='center' caption='Từ/From' />
                                        <Column dataField='packingLabelToó' alignment='center' caption='Đến/To' />
                                    </Column>
                                </DataGrid>
                            </div>
                            <div className='noteRemark'>
                                <div className='note'>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ghi chú/Remark: 60 </h6>
                                </div>
                                <div className='rectangle-container'>
                                    <div className='text-section'>
                                        <div className='text'>Phê duyệt/Approved By</div>
                                        <div className='date'>Ngày/tháng/năm</div>
                                    </div>
                                    <div className='text-section'>
                                        <div className='text'>Kiểm tra/Checked By</div>
                                        <div className='date'>Ngày/tháng/năm</div>
                                    </div>
                                    <div className='text-section' style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div className='text'>Người lập biểu/Created By</div>
                                        <img
                                            src='https://img6.thuthuatphanmem.vn/uploads/2022/09/13/mau-chu-ky-tay-tuyet-dep_013426708.png'
                                            width={100}
                                            height={100}
                                        />
                                        <div className='date'>28/11/2023</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className='toolbar'
                                style={{
                                    paddingTop: 10,
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: 'flex-end'
                                }}>
                                <Button
                                    text='Trở lại'
                                    onClick={setClose}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: "#E5E5E5", width: 100 }}
                                />
                                <Button
                                    text='Lưu'
                                    onClick={() => { handleSaveClick() }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: "#FF7A00" }}
                                />
                                <Button
                                    text='Ký lập'
                                    onClick={() => { }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: "#FF7A00", width: 100 }}
                                />
                                <Button
                                    text='Gửi duyệt'
                                    onClick={() => { }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: "#FF7A00" }}
                                />
                            </div>
                            {/* <div
                                className='informer'
                                style={{
                                    textAlign: "left",
                                    paddingTop: 12,
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                    }}>
                                    Cập nhật phiếu công nghệ
                                </h5>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div style={{ marginTop: 30 }}>
                                    <div className='subtile' style={{ marginBottom: 15 }}>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>IC: </h6>
                                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                            Thời gian từ 09/08/2022 đến 19/08/2022
                                        </h6>
                                    </div>
                                    <div>
                                        <div>
                                            <Table dataSource={data1} rowKey='id' bordered pagination={false}>
                                                <Table.Column title='Trình tự/Step' dataIndex='' key='id' align='left' width={130} />
                                                <Table.Column title='Chủng loại/IC Type' dataIndex='icType' key='icType' align='center' />
                                                <Table.Column
                                                    title='Số lượng/Quantity'
                                                    dataIndex='quantity'
                                                    key='quantity'
                                                    align='center'
                                                />
                                                <Table.Column title='Mã chip/IC Code' dataIndex='icCode' key='icCode' align='center' />
                                                <Table.Column title='OS/Version' dataIndex='version' key='version' align='center' />
                                                <Table.Column title='Other/Khác' dataIndex='other' key='other' align='center' />
                                                <Table.Column title='' key='actions' align='center' />
                                            </Table>

                                            <Table dataSource={data1} rowKey='id' bordered pagination={false}>
                                                <Table.Column title='Trình tự/Step' dataIndex='step' key='id' align='left' width={130} />
                                                <Table.Column title='Step 1' dataIndex='icType' key='step1' align='center' />
                                                <Table.Column title='Step 2' dataIndex='icType' key='step2' align='center' />
                                                <Table.Column title='Step 3' dataIndex='icType' key='step3' align='center' />
                                                <Table.Column title='Step 4' dataIndex='icType' key='step4' align='center' />
                                            </Table>
                                            <Table key={"type"} id='type' dataSource={data2} rowKey='position' bordered pagination={false}>
                                                <Table.Column title='Vị trí/Position' dataIndex='position' key='position' width={130} />
                                                <Table.ColumnGroup title='Lỗ ngoài/Outside Hole'>
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 8 } : { colSpan: 1 };
                                                        }}
                                                        title='Dài/Length'
                                                        dataIndex='length'
                                                        key='length'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return index !== 2 ? (
                                                                [1, 3].includes(index) ? (
                                                                    <Input
                                                                        style={{ width: 250, float: "left" }}
                                                                        className='inputRow'
                                                                        placeholder='Nhập'
                                                                    />
                                                                ) : (
                                                                    <Input className='inputRow' placeholder='Nhập' />
                                                                )
                                                            ) : (
                                                                <SelectBox style={{ width: 250, float: "left" }} placeholder='Lựa chọn' />
                                                            );
                                                        }}
                                                    />
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='Rộng/Width'
                                                        dataIndex='width'
                                                        key='width'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='Sâu/Depth'
                                                        dataIndex='depth'
                                                        key='depth'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='DK/Diameter'
                                                        dataIndex='diameter'
                                                        key='diameter'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                </Table.ColumnGroup>
                                                <Table.ColumnGroup title='Lỗ trong/Inside Hole'>
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='Dài/Length'
                                                        dataIndex='length'
                                                        key='length'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='Rộng/Width'
                                                        dataIndex='width'
                                                        key='width'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='Sâu/Depth'
                                                        dataIndex='depth'
                                                        key='depth'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                    <Table.Column
                                                        onCell={(item: any) => {
                                                            return item.position !== "Kích thước/Size" ? { colSpan: 0 } : { colSpan: 1 };
                                                        }}
                                                        title='DK/Diameter'
                                                        dataIndex='diameter'
                                                        key='diameter'
                                                        align='center'
                                                        render={(value, record: any, index) => {
                                                            return record.position === "Kích thước/Size" ? (
                                                                <Input className='inputRow' placeholder='Nhập' />
                                                            ) : null;
                                                        }}
                                                    />
                                                </Table.ColumnGroup>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <div className='subtile' style={{ marginBottom: 15 }}>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Đóng gói/Package: </h6>
                                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                            Thời gian từ 09/08/2022 đến 19/08/2022
                                        </h6>
                                    </div>
                                    <DataGrid
                                        key={"id"}
                                        dataSource={data}
                                        keyExpr='id'
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}>
                                        <Column dataField='id' caption='No.' alignment='center' width={100} />
                                        <Column dataField='boxType' alignment='center' caption='Loại hộp/Box Type' width={300} />
                                        <Column dataField='productLabel' alignment='center' caption='Temp sản phẩm/Product Label'>
                                            <Column dataField='quantity' alignment='center' caption="Số lượng/Q'ty" />
                                            <Column dataField='from' alignment='center' caption='Từ/From' />
                                            <Column dataField='to' alignment='center' caption='Đến/To' />
                                        </Column>
                                    </DataGrid>
                                </div>
                                <div className='noteRemark'>
                                    <div className='note'>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ghi chú/Remark: 60 </h6>
                                    </div>
                                    <div className='rectangle-container'>
                                        <div className='text-section'>
                                            <div className='text'>Phê duyệt/Approved By</div>
                                            <div className='date'>Ngày/tháng/năm</div>
                                        </div>
                                        <div className='text-section'>
                                            <div className='text'>Kiểm tra/Checked By</div>
                                            <div className='date'>Ngày/tháng/năm</div>
                                        </div>
                                        <div className='text-section' style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <div className='text'>Người lập biểu/Created By</div>
                                            <img
                                                src='https://img6.thuthuatphanmem.vn/uploads/2022/09/13/mau-chu-ky-tay-tuyet-dep_013426708.png'
                                                width={100}
                                                height={100}
                                            />
                                            <div className='date'>28/11/2023</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div> */}
                        </div>
                    </div>
                </div>
                {
                    isLoading && <Loading isShow={true} />
                }
            </>
        );
    },
);

export default TechFormUpdateHostamping;