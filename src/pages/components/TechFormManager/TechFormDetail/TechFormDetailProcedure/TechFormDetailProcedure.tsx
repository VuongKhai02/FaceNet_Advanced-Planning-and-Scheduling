import React, { } from "react";
import { DataGrid } from "devextreme-react";
import "./TechFormDetailProcedure.css";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormDetailHostamping from "../TechFormDetailHostamping/TechFormDetailHostamping";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

type TechFormDetailProcedureProps = {
    isOpen: boolean;
    setClose?: () => void;
};

const data = [
    { id: 1, item: "Nền nhũ", method: "Lưới", colour: "K", note: "Tal 211 100%, 200 line/cm" },
    { id: 2, item: "UV", method: "offset", colour: "H", note: "" },
    { id: 3, item: "In sensor", method: "Lưới", colour: "T", note: "" },
];

const data1 = [{ id: 1, contens: "Ép: Ép sản phẩm hoàn chỉnh", classify: "BÓNG", lamination: "Theo từng thông số máy ép", other: "" }];

const data2 = [
    {
        id: 1,
        process: "Hostamping: Hots Hologram",
        content: "DCK Visa",
        rmcode: "1C04HOLGRAM050",
        typehots: "Visa holagram màu bạc",
        position: "Theo LP/Thẻ mẫu",
        machine: "",
        other: "",
    },
];

export const TechFormDetailProcedure: React.FC<TechFormDetailProcedureProps> = observer(({ isOpen = false, setClose }) => {
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const { t } = useTranslation(["common"]);
    const handleTechFormDetailHostamping = () => {
        setIsAddNewTechForm(true);
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechFormDetailHostamping isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
                <div className=''>
                    <div className='table-responsive'>
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
                                Xem chi tiết phiếu công nghệ
                            </h5>
                        </div> */}
                        <div className='subtile'>
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>In: </h6>
                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                Thời gian từ 09/08/2022 đến 19/08/2022
                            </h6>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <DataGrid
                                key={"id"}
                                keyExpr={"id"}
                                dataSource={data}
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}>
                                <Column alignment='left' caption='Công nghệ In' fixed>
                                    <Column alignment='left' caption='Nội dung In' fixed>
                                        <Column dataField='id' alignment='center' caption='Bước' width={100}>
                                        </Column>
                                        <Column dataField='item' caption='Nội dung' />
                                        <Column dataField='method' caption='Phương pháp' />
                                    </Column>
                                </Column>
                                <Column
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
                                        <Column dataField='colour' caption='Màu' />
                                        <Column dataField='note' caption='Ghi chú' />
                                    </Column>
                                </Column>
                            </DataGrid>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <div>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ép: </h6>
                                    <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                        Thời gian từ 09/08/2022 đến 19/08/2022
                                    </h6>
                                </div>

                                <DataGrid
                                    key={"id"}
                                    dataSource={data1}
                                    keyExpr='id'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='id' caption='Bước' alignment='left' width={100} />
                                    <Column dataField='contens' caption='Nội dung ép' />
                                    <Column dataField='classify' caption='Phân loại' />
                                    <Column dataField='lamination' caption='Thông số máy' width={270} />
                                    <Column dataField='other' caption='Khác/Other'></Column>
                                    <Column dataField='structure' caption='Cấu trúc' />
                                </DataGrid>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>Gia công: </h6>
                                    <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                        Thời gian từ 09/08/2022 đến 19/08/2022
                                    </h6>
                                </div>
                                <DataGrid
                                    key={"id"}
                                    dataSource={data1}
                                    keyExpr='id'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='id' caption='STT' alignment='left' width={100} />
                                    <Column dataField='lnk' caption='Mực' />
                                    <Column dataField='nilon' caption='Nilon' />
                                    <Column dataField='cut' caption='Cắt' />
                                    <Column dataField='be' caption='Bế'></Column>
                                    <Column dataField='dun' caption='Đùn' />
                                    <Column dataField='other' caption='Khác' />
                                </DataGrid>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>Cắt: </h6>
                                    <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                        Thời gian từ 09/08/2022 đến 19/08/2022
                                    </h6>
                                </div>
                                <DataGrid
                                    key={"id"}
                                    dataSource={data1}
                                    keyExpr='id'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='id' caption='STT' alignment='left' width={100} />
                                    <Column dataField='content' caption='Nội dung' />
                                    <Column dataField='machine' caption='Máy' />
                                </DataGrid>
                            </div>
                            {/* <div>
                                <div className='subtile' style={{ marginBottom: 15 }}>
                                    <h6 style={{ fontSize: 15, fontWeight: 500 }}>Hostamping: </h6>
                                    <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                        Thời gian từ 09/08/2022 đến 19/08/2022
                                    </h6>
                                </div>
                                <DataGrid
                                    key={"id"}
                                    dataSource={data2}
                                    keyExpr='id'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='id' caption='Bước' alignment='center' width={100} />
                                    <Column dataField='process' caption='Công đoạn' />
                                    <Column dataField='content' alignment='center' caption='Nội dung hots' />
                                    <Column dataField='rmcode' alignment='center' caption='Mã vật liệu' />
                                    <Column dataField='typehots' alignment='center' caption='Loại phôi hots' />
                                    <Column dataField='position' alignment='center' caption='Vị trí'></Column>
                                    <Column dataField='machine' alignment='center' caption='Máy' />
                                    <Column dataField='other' alignment='center' caption='Khác' />
                                </DataGrid>
                            </div> */}
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
                                    onClick={handleTechFormDetailHostamping}
                                    style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                                >{t("common.next-button")}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default TechFormDetailProcedure;
