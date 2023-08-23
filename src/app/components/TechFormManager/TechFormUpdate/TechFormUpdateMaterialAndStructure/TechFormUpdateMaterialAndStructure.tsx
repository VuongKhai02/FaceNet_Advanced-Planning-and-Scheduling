import React, { } from "react";
import { Button, DataGrid } from "devextreme-react";
import {
    Column
} from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormUpdateProcedure from "../TechFormUpdateProcedure/TechFormUpdateProcedure";

type TechFormUpdateMaterialAndStructureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    {
        No: 1, materialCode: '1C01CBANK000021', materialName: 'Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET', quantity: '19.430', note: '', structure: ''
    },
    {
        No: 2, materialCode: '1C01CBANK000021', materialName: 'Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET', quantity: '19.430', note: '', structure: ''
    },
    {
        No: 3, materialCode: '1C01CBANK000021', materialName: 'Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET', quantity: '19.430', note: '', structure: ''
    }
];

const data1 = [
    {
        Id: 1, contentFront: 'CMYK + K', quantityFront: '05 bản', sizeFront: '675x740x0.3', contentBack: 'K + K', quantityBack: 'Trở nó', sizeBack: '675x740x0.3'
    },
    {

        Id: 2, contentFront: 'Trắng offset', quantityFront: '', sizeFront: '675x740x0.5', contentBack: 'Lọng nhũ + Keo', quantityBack: '01 film cũ', sizeBack: ''
    },
];


export const TechFormUpdateMaterialAndStructure: React.FC<TechFormUpdateMaterialAndStructureProps> = observer(({
    isOpen = false, setClose }) => {

    const [isVisibleTechFormUpdateProcedure, setIsVisibleTechFormUpdateProcedure] = React.useState<boolean>(false);

    return (
        <>
            {isVisibleTechFormUpdateProcedure
                ?
                <TechFormUpdateProcedure
                    isOpen={isVisibleTechFormUpdateProcedure}
                    setClose={() => setIsVisibleTechFormUpdateProcedure(false)}
                />
                :
                <div className="box__shadow-table-responsive">
                    <div className="table-responsive">
                        <div className="informer" style={{
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Cập nhật phiếu công nghệ</h5>
                        </div>
                        <div className="subtile">
                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Vật liệu và cấu trúc/Material and Structure : Thời gian từ/from 09/08/2022 đến/to 19/08/2022  </h6>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <DataGrid
                                key={'No'}
                                dataSource={data}
                                keyExpr="No"
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}
                            >
                                <Column dataField="No" caption="No." allowEditing={false} alignment="left" />
                                <Column dataField="materialCode" caption="Mã vật tư/Material Code" />
                                <Column dataField="materialName" caption="Tên vật tư/Material Name" width={500} />
                                <Column dataField="quantity" caption="Số lượng/Q'ty" />
                                <Column dataField="note" caption="Ghi chú/Remarks" />
                                <Column dataField="structure" caption="Cấu trúc/Structure" />
                            </DataGrid>
                            <div className="container">
                                <div className="checkbox">
                                    <label htmlFor="raPhim" style={{ fontWeight: 500 }}>Ra phim/Pre-press</label>
                                    <input type="checkbox" id="raPhim" checked={true} />
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="raBan" style={{ fontWeight: 500, marginLeft: 50 }}>Ra bản/PC to plate</label>
                                    <input type="checkbox" id="raBan" checked={true} />
                                </div>
                                <div className="input">
                                    <label htmlFor="tongSoBan" style={{ fontWeight: 500, marginLeft: 50 }}>Tổng số bản: {'6'}</label>
                                </div>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <DataGrid
                                    key={'Id'}
                                    keyExpr={'Id'}
                                    dataSource={data1}
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}
                                >
                                    <Column dataField="Id" caption="Id" visible={false} />
                                    <Column alignment="center" caption="Mặt trước/Front" fixed >
                                        <Column dataField="contentFront" caption="Nội dung/Item" />
                                        <Column dataField="quantityFront" caption="Số lượng/Q'ty" alignment="left" />
                                        <Column dataField="sizeFront" caption="Kích thước bản/Plate size" />
                                    </Column>
                                    <Column alignment="center" caption="Mặt sau/Back" fixed>
                                        <Column dataField="contentFront" caption="Nội dung/Item" />
                                        <Column dataField="quantityFront" caption="Số lượng/Q'ty" alignment="left" />
                                        <Column dataField="sizeFront" caption="Kích thước bản/Plate size" />
                                    </Column>
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
                                    onClick={() => { setIsVisibleTechFormUpdateProcedure(true) }}
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

export default TechFormUpdateMaterialAndStructure;