import React, { useContext, useState } from "react";
import { DataGrid, DropDownBox, SelectBox } from "devextreme-react";
import DateBox from "devextreme-react/date-box";
import "./TechFormHostamping.css";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { Button, Input, Table } from "antd";
import SvgIcon from "../../../../../../shared/components/SvgIcon/SvgIcon";
import { TechFormContext } from "../TechFormBodyCard/TechFormBodyCard";
import { useTranslation } from "react-i18next";

type TechFormHostampingProps = {
    isOpen: boolean;
    setClose?: () => void;
};
const data = [{ id: 1, process: "Công đoạn/Process", isChecked: false }];

const data1 = [
    { position: "Kích thước/Size", type: "Item 1", machine: false, temp: "" },
    { position: "Loại/Type", type: "Item 2", machine: false, temp: "" },
    { position: "Máy/Machine", type: "Item 3", machine: false, temp: "" },
    { position: "Nhiệt độ/Temp", type: "Item 4", machine: false, temp: "" },
];

export const TechFormHostamping: React.FC<TechFormHostampingProps> = observer(({ isOpen = false, setClose }) => {
    const [fromDateTime, setFromDateTime] = useState("");
    const [toDateTime, setToDateTime] = useState("");
    const { t } = useTranslation(["common"]);
    const handleFromDateTimeChange = (e: any) => {
        setFromDateTime(e.value);
    };

    const handleToDateTimeChange = (e: any) => {
        setToDateTime(e.value);
    };

    const [techFormData, setTechFormData, save] = useContext(TechFormContext)

    return (
        <div className=''>
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
                        Thêm mới phiếu công nghệ
                    </h5>
                </div>
                <div style={{ marginTop: 30 }}>
                    <div>
                        <div className='subtile'>
                            <div className="style-title">
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>Hostamping: </h6>
                                <h6 className="h6-time">Thời gian từ</h6>
                                <DateBox
                                    placeholder='dd/mm/yyyy'
                                    value={fromDateTime}
                                    onValueChanged={handleFromDateTimeChange}
                                    type='datetime'
                                />
                            </div>
                            <div className="style-title">
                                <h6 className="h6-time"> đến</h6>
                                <DateBox
                                    placeholder='dd/mm/yyyy'
                                    value={toDateTime}
                                    onValueChanged={handleToDateTimeChange}
                                    type='datetime'
                                />
                            </div>
                        </div>

                        <DataGrid key={"id"} dataSource={data} keyExpr='id' showBorders={true} showRowLines={true} showColumnLines={true}>
                            <Column dataField='' caption='Bước/Step' alignment='center' width={100} />
                            <Column
                                dataField='process'
                                caption='Công đoạn/Process'
                                cellRender={({ data, key }) => (
                                    <DropDownBox
                                        placeholder='Chọn'
                                        dataSource={data}
                                        valueExpr='value'
                                        displayExpr='label'
                                        value={"Chọn"}
                                        showClearButton={true}
                                    />
                                )}
                            />
                            <Column
                                dataField='content'
                                alignment='center'
                                caption='Nội dung hots/Content'
                                cellRender={() => <Input placeholder='Nhập' />}
                            />
                            <Column
                                dataField='rmcode'
                                alignment='center'
                                caption='Mã vật liệu/RMcode'
                                cellRender={() => <Input placeholder='Nhập' />}
                            />
                            <Column
                                dataField='typehots'
                                alignment='center'
                                caption='Loại phôi hots/Type'
                                cellRender={() => <Input placeholder='Nhập' />}
                            />
                            <Column
                                dataField='position'
                                alignment='center'
                                caption='Vị trí'
                                cellRender={() => <Input placeholder='Nhập' />}></Column>
                            <Column
                                dataField='machine'
                                alignment='center'
                                caption='Máy/Machine'
                                cellRender={({ data, key }) => (
                                    <DropDownBox
                                        placeholder='Chọn'
                                        dataSource={data}
                                        valueExpr='value'
                                        displayExpr='label'
                                        value={"Chọn"}
                                        showClearButton={true}
                                    />
                                )}
                            />
                            <Column
                                dataField='other'
                                alignment='center'
                                caption='Khác/Other'
                                cellRender={() => <Input placeholder='Nhập' />}
                            />
                            <Column
                                caption=''
                                alignment='center'
                                width={80}
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            tooltipTitle={t("common.add-button")}
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Add.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            tooltipTitle='Xóa hàng'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                        />
                                    </div>
                                )}
                            />
                        </DataGrid>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div className='subtile' style={{ marginBottom: 30 }}>
                            <div className="style-title">
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>IC: </h6>
                                <h6 className="h6-time">Thời gian từ</h6>
                                <DateBox
                                    placeholder='dd/mm/yyyy'
                                    value={fromDateTime}
                                    onValueChanged={handleFromDateTimeChange}
                                    type='datetime'
                                />
                            </div>
                            <div className="style-title">
                                <h6 className="h6-time">đến</h6>
                                <DateBox
                                    placeholder='dd/mm/yyyy'
                                    value={toDateTime}
                                    onValueChanged={handleToDateTimeChange}
                                    type='datetime'
                                />
                            </div>
                        </div>
                        <div>
                            <Table dataSource={data} rowKey='id' bordered={false} pagination={false}>
                                <Table.Column title='Trình tự/Step' dataIndex='' key='id' align='left' width={130} />
                                <Table.Column
                                    title='Chủng loại/IC Type'
                                    dataIndex='icType'
                                    key='icType'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Số lượng/Quantity'
                                    dataIndex='quantity'
                                    key='quantity'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Mã chip/IC Code'
                                    dataIndex='icCode'
                                    key='icCode'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='OS/Version'
                                    dataIndex='version'
                                    key='version'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Other/Khác'
                                    dataIndex='other'
                                    key='other'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title=''
                                    align='center'
                                    width={80}
                                    render={() => (
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon
                                                tooltipTitle={t("common.add-button")}
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Add.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                tooltipTitle='Xóa hàng'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Trash.svg'
                                                textColor='#FF7A00'
                                            />
                                        </div>
                                    )}
                                />
                            </Table>

                            <Table dataSource={data} rowKey='id' bordered={false} pagination={false}>
                                <Table.Column title='Trình tự/Step' dataIndex='process' key='id' align='left' width={130} />
                                <Table.Column
                                    title='Step 1'
                                    dataIndex='icType'
                                    key='step1'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Step 2'
                                    dataIndex='icType'
                                    key='step2'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Step 3'
                                    dataIndex='icType'
                                    key='step3'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Step 4'
                                    dataIndex='icType'
                                    key='step4'
                                    align='center'
                                    render={() => <Input placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title=''
                                    align='center'
                                    width={80}
                                    render={() => (
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon
                                                tooltipTitle={t("common.add-button")}
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Add.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                tooltipTitle='Xóa hàng'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Trash.svg'
                                                textColor='#FF7A00'
                                            />
                                        </div>
                                    )}
                                />
                            </Table>

                            <Table key={"type"} id='type' dataSource={data1} rowKey='position' bordered={false} pagination={false}>
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
                                                    <Input style={{ width: 250, float: "left" }} placeholder='Nhập' />
                                                ) : (
                                                    <Input placeholder='Nhập' />
                                                )
                                            ) : (
                                                <SelectBox width={250} placeholder='Lựa chọn' />
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
                                                <Input placeholder='Nhập' />
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
                                                <Input placeholder='Nhập' />
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
                                                <Input placeholder='Nhập' />
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
                                                <Input placeholder='Nhập' />
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
                                                <Input placeholder='Nhập' />
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
                                                <Input placeholder='Nhập' />
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
                                                <Input placeholder='Nhập' />
                                            ) : null;
                                        }}
                                    />
                                </Table.ColumnGroup>
                            </Table>
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div className='subtile'>
                            <div className="style-title">
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>Đóng gói/Package: </h6>
                                <h6 className="h6-time">Thời gian từ</h6>
                                <DateBox
                                    placeholder='dd/mm/yyyy'
                                    value={fromDateTime}
                                    onValueChanged={handleFromDateTimeChange}
                                    type='datetime'
                                />
                            </div>
                            <div className="style-title">
                                <h6 className="h6-time">đến</h6>
                                <DateBox
                                    placeholder='dd/mm/yyyy'
                                    value={toDateTime}
                                    onValueChanged={handleToDateTimeChange}
                                    type='datetime'
                                />
                            </div>
                        </div>
                        <DataGrid key={"id"} dataSource={data} keyExpr='id' showBorders={true} showRowLines={true} showColumnLines={true}>
                            <Column dataField='id' caption='No.' alignment='center' width={100} />
                            <Column
                                dataField='boxtype'
                                alignment='center'
                                caption='Loại hộp/Box Type'
                                cellRender={() => <Input placeholder='Nhập' />}
                                width={300}
                            />
                            <Column dataField='productLabel' alignment='center' caption='Temp sản phẩm/Product Label'>
                                <Column
                                    dataField='quantity'
                                    alignment='center'
                                    caption="Số lượng/Q'ty"
                                    cellRender={() => <Input placeholder='Nhập' />}
                                />
                                <Column
                                    dataField='from'
                                    alignment='center'
                                    caption='Từ/From'
                                    cellRender={() => <Input placeholder='Nhập' />}
                                />
                                <Column
                                    dataField='to'
                                    alignment='center'
                                    caption='Đến/To'
                                    cellRender={() => <Input placeholder='Nhập' />}
                                />
                            </Column>
                            <Column
                                caption=''
                                alignment='center'
                                width={80}
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            tooltipTitle={t("common.add-button")}
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Add.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            tooltipTitle='Xóa hàng'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                        />
                                    </div>
                                )}
                            />
                        </DataGrid>
                    </div>
                    <div className='noteRemark'>
                        <div className='note'>
                            <h6 style={{ fontSize: 15, fontWeight: 500, marginTop: 5 }}>Ghi chú/Remark: </h6>
                            <Input placeholder='Nhập' id='id' style={{ width: 200, height: 33, marginLeft: 10 }} />
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
                            <div className='text-section'>
                                <div className='text'>Người lập biểu/Created By</div>
                                <div className='date'>Ngày/tháng/năm</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='toolbar'
                        style={{
                            marginTop: 20,
                            paddingBottom: 30,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            // background: "#ffffff"
                            borderRadius: "4px",
                        }}>
                        <Button
                            onClick={setClose}
                            style={{ marginRight: "10px", backgroundColor: "gray", color: "#fff", width: 100 }}
                        >{t("common.back-button")}</Button>
                        <Button
                            disabled
                            onClick={() => { }}
                            style={{ marginRight: "10px", width: 100 }}
                        >{t("common.next-button")}</Button>
                        <Button
                            onClick={save}
                            style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                        >{t("common.add-button")}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TechFormHostamping;
