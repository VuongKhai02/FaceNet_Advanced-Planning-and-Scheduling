import React, { } from "react";
import { DataGrid } from "devextreme-react";
import "./TechFormDetailMaterialAndStructure.css";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormDetailProcedure from "../TechFormDetailProcedure/TechFormDetailProcedure";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

type TechFormDetailMaterialAndStructureProps = {
    isOpen: boolean;
    setClose?: () => void;
};

const data = [
    {
        No: 1,
        materialCode: "1C01CBANK000021",
        materialName: "Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET",
        quantity: "19.430",
        note: "",
        unit: "Cái",
    },
    {
        No: 2,
        materialCode: "1C01CBANK000021",
        materialName: "Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET",
        quantity: "19.430",
        note: "",
        unit: "Tấm",
    },
    {
        No: 3,
        materialCode: "1C01CBANK000021",
        materialName: "Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET",
        quantity: "19.430",
        note: "",
        unit: "Kg",
    },
];

const data1 = [
    {
        Id: 1,
        contentFront: "CMYK + K",
        quantityFront: "05 bản",
        sizeFront: "675x740x0.3",
        contentBack: "K + K",
        quantityBack: "Trở nó",
        sizeBack: "675x740x0.3",
    },
    {
        Id: 2,
        contentFront: "Trắng offset",
        quantityFront: "",
        sizeFront: "675x740x0.5",
        contentBack: "Lọng nhũ + Keo",
        quantityBack: "01 film cũ",
        sizeBack: "",
    },
];

const data2 = [
    { id: 1, CongDoan: "In Offset", MaJob: "JB01-001", TenJob: "In Offset ra bản" },
    { id: 2, CongDoan: "In Lưới", MaJob: "JB01-002", TenJob: "In lưới: Căng lưới + Chụp lưới" },
    { id: 3, CongDoan: "Dải từ", MaJob: "JB03-002", TenJob: "In Offset: In màu CMYK,P" },
    { id: 4, CongDoan: "Hostamping", MaJob: "JB03-002", TenJob: "QC chọn thẻ card body" },
    { id: 5, CongDoan: "Gia công- Đóng gói", MaJob: "JB03-002", TenJob: "Gia công- Đóng gói : ĐG theo hộp nhỏ" },
];

export const TechFormDetailMaterialAndStructure: React.FC<TechFormDetailMaterialAndStructureProps> = observer(
    ({ isOpen = false, setClose }) => {
        const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
        const { t } = useTranslation(["common"]);
        const handleTechFormDetailProcedure = () => {
            setIsAddNewTechForm(true);
        };

        return (
            <>
                {isAddNewTechForm ? (
                    <TechFormDetailProcedure isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
                ) : (
                    <div className=''>
                        <div className='table-responsive'>
                            <div style={{ marginTop: 30 }}>
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
                                            marginBottom: 30,
                                        }}>
                                        Trình tự công nghệ
                                    </h5>
                                </div>
                                <DataGrid
                                    key={"id"}
                                    dataSource={data2}
                                    keyExpr='id'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='id' caption='STT' allowEditing={false} alignment='left' />
                                    <Column dataField='CongDoan' caption='Công đoạn'>
                                    </Column>
                                    <Column dataField='MaJob' caption='Mã Job'>
                                    </Column>
                                    <Column dataField='TenJob' caption='Tên Job' />
                                </DataGrid>
                            </div>
                            <div className='subtile'>
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>
                                    Vật liệu và cấu trúc: Thời gian từ 09/08/2022 đến 19/08/2022{" "}
                                </h6>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <DataGrid
                                    key={"No"}
                                    dataSource={data}
                                    keyExpr='No'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='No' caption='STT' allowEditing={false} alignment='left' />
                                    <Column dataField='materialCode' caption='Mã vật tư' />
                                    <Column dataField='materialName' caption='Tên vật tư' width={500} />
                                    <Column dataField='quantity' caption="Số lượng" />
                                    <Column dataField='unit' caption='Đơn vị tính' />
                                    <Column dataField='note' caption='Ghi chú' />
                                </DataGrid>
                                <div className='container' style={{ marginTop: 10 }}>
                                    <div className='checkbox'>
                                        <label htmlFor='raPhim' style={{ fontWeight: 500 }}>
                                            Ra phim
                                        </label>
                                        <input type='checkbox' id='raPhim' checked={true} />
                                    </div>
                                    <div className='checkbox'>
                                        <label htmlFor='raBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                                            Ra bản
                                        </label>
                                        <input type='checkbox' id='raBan' checked={true} />
                                    </div>
                                    <div className='input'>
                                        <label htmlFor='tongSoBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                                            Tổng số bản: {"10"}
                                        </label>
                                    </div>
                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <DataGrid
                                        key={"Id"}
                                        keyExpr={"Id"}
                                        dataSource={data1}
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}>
                                        <Column dataField='Id' caption='Id' visible={false} />
                                        <Column alignment='center' caption='Mặt trước' fixed>
                                            <Column dataField='contentFront' caption='Nội dung' />
                                            <Column dataField='quantityFront' caption="Số lượng" alignment='left' />
                                            <Column dataField='sizeFront' caption='Kích thước bản' />
                                        </Column>
                                        <Column alignment='center' caption='Mặt sau' fixed>
                                            <Column dataField='contentFront' caption='Nội dung' />
                                            <Column dataField='quantityFront' caption="Số lượng" alignment='left' />
                                            <Column dataField='sizeFront' caption='Kích thước bản' />
                                        </Column>
                                    </DataGrid>
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
                                        onClick={handleTechFormDetailProcedure}
                                        style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                                    >{t("common.next-button")}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    },
);

export default TechFormDetailMaterialAndStructure;
