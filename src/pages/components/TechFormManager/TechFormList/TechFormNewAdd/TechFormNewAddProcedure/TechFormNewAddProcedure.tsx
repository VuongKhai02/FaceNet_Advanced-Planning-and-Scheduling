import React, { useState } from "react";
import { DataGrid, DropDownBox, SelectBox } from "devextreme-react";
import DateBox from "devextreme-react/date-box";
import "./TechFormNewAddProcedure.css";
import { observer } from "mobx-react";
import TechFormHostamping from "../TechFormHostamping/TechFormHostamping";
import SvgIcon from "../../../../../../shared/components/SvgIcon/SvgIcon";
import { Button, Input, Select, Table } from "antd";
import { Column } from "devextreme-react/data-grid";
import { useTranslation } from "react-i18next";

type TechFormNewAddProcedureProps = {
    isOpen: boolean;
    setClose?: () => void;
};

const data = [
    { id: 1, name: "Item 1", isChecked: false },
    { id: 2, name: "Item 2", isChecked: true },
];

const { Option } = Select;

export const TechFormNewAddProcedure: React.FC<TechFormNewAddProcedureProps> = observer(({ isOpen = false, setClose }) => {
    const [fromDateTime, setFromDateTime] = useState("");
    const [toDateTime, setToDateTime] = useState("");
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const { t } = useTranslation(["common"]);
    const handleFromDateTimeChange = (e: any) => {
        setFromDateTime(e.value);
    };

    const handleToDateTimeChange = (e: any) => {
        setToDateTime(e.value);
    };

    const handleAddFormTechHostamping = () => {
        setIsAddNewTechForm(true);
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechFormHostamping isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
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
                        <div className='subtile'>
                            <div className="style-title">
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>In/Printing : </h6>
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
                        <div style={{ marginTop: 30 }}>
                            <DataGrid
                                key={"id"}
                                keyExpr={"id"}
                                dataSource={data}
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}>
                                <Column alignment='left' caption='Công nghệ In/Printing Technology' fixed>
                                    <Column alignment='left' caption='Nội dung In/Printing Contents' fixed>
                                        <Column dataField='id' alignment='center' caption='Bước/Step' width={100}></Column>
                                        <Column
                                            dataField='Item'
                                            caption='Nội dung/Item'
                                            cellRender={() => <Input placeholder='Nhập' />}
                                        />
                                        <Column
                                            dataField='method'
                                            caption='Phương pháp/Method'
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
                                    </Column>
                                </Column>
                                <Column
                                    // caption="Chọn"
                                    alignment='left'
                                    headerCellRender={() => {
                                        return (
                                            <div className='checkbox'>
                                                <div>
                                                    <input type='checkbox' id='In' checked={true} />
                                                    <label htmlFor='In' className='checkBoxStyle'>
                                                        In trở Nó
                                                    </label>
                                                </div>
                                                <div style={{ marginLeft: 120 }}>
                                                    <input type='checkbox' id='In' />
                                                    <label htmlFor='In' className='checkBoxStyle'>
                                                        In trở Khác
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    }}>
                                    <Column alignment='center' caption='File'>
                                        <Column
                                            dataField='colour'
                                            caption='Màu/Colour'
                                            cellRender={() => <Input placeholder='Nhập' />}
                                        />

                                        <Column
                                            dataField='note'
                                            caption='Ghi chú/Note'
                                            cellRender={() => <Input placeholder='Nhập' />}
                                        />
                                    </Column>
                                </Column>
                                <Column
                                    caption=''
                                    alignment='center'
                                    width={80}
                                    cellRender={() => (
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
                            </DataGrid>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <div>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <div className="style-title">
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ép/Lamination : </h6>
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

                                <Table dataSource={data} bordered={false} rowKey='id' pagination={false}>
                                    <Table.Column title='Bước' dataIndex='id' align='left' width={100} />
                                    <Table.Column
                                        title='Nội dung ép/Contens'
                                        dataIndex='contens'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Phân loại/Classify'
                                        dataIndex='classify'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Thông số máy/Lamination Parameter'
                                        dataIndex='lamination'
                                        width={270}
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Khác/Other'
                                        dataIndex='other'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Cấu trúc/Structure'
                                        dataIndex='structure'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title=''
                                        dataIndex='operation'
                                        align='center'
                                        width={80}
                                        render={() => (
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
                                </Table>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <div className="style-title">
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Gia công/Processing : </h6>
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
                                <Table dataSource={data} bordered={false} rowKey='id' pagination={false}>
                                    <Table.Column title='No.' dataIndex='id' align='left' width={100} />
                                    <Table.Column
                                        title='Mực/Lnk'
                                        dataIndex='lnk'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Nilon'
                                        dataIndex='nilon'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Cắt'
                                        dataIndex='cut'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Bế'
                                        dataIndex='be'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Đùn'
                                        dataIndex='dun'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Khác/Other'
                                        dataIndex='other'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title=''
                                        dataIndex='operation'
                                        align='center'
                                        width={80}
                                        render={() => (
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
                                </Table>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <div className="style-title">
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Cut/Cutting: </h6>
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
                                <Table dataSource={data} bordered={false} rowKey='id' pagination={false}>
                                    <Table.Column title='No.' dataIndex='id' align='left' width={100} />
                                    <Table.Column
                                        title='Nội dung/Content'
                                        dataIndex='content'
                                        render={() => <Input placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Máy/Machine'
                                        dataIndex='machine'
                                        render={() => <SelectBox placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title=''
                                        dataIndex='operation'
                                        align='center'
                                        width={80}
                                        render={() => (
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
                                </Table>
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
                                    onClick={handleAddFormTechHostamping}
                                    style={{ marginRight: "10px", backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                                >{t("common.next-button")}</Button>
                                <Button style={{ width: 100 }} disabled>{t("common.add-button")}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default TechFormNewAddProcedure;
