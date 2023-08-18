import React, { useState } from "react";
import { Button, DataGrid, TextBox } from "devextreme-react";
import { Column, Button as ButtonIcon } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormDetailHostamping from "../TechFormDetailHostamping/TechFormDetailHostamping";

type TechFormUpdateProcedureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { id: 1, item: 'Nền nhũ', method: 'Lưới', colour: 'K', note: 'Tal 211 100%, 200 line/cm' },
    { id: 2, item: 'UV', method: 'offset', colour: 'H', note: '' },
    { id: 3, item: 'In sensor', method: 'Lưới', colour: 'T', note: '' }
];

const data1 = [
    { id: 1, contens: 'Ép: Ép sản phẩm hoàn chỉnh', classify: 'BÓNG', lamination: 'Theo từng thông số máy ép', other: '' },
];

const data2 = [
    { id: 1, process: 'Hostamping: Hots Hologram', content: 'DCK Visa', rmcode: '1C04HOLGRAM050', typehots: 'Visa holagram màu bạc', position: 'Theo LP/Thẻ mẫu', machine: '', other: '' },
];



export const TechFormDetailProcedure: React.FC<TechFormUpdateProcedureProps> = observer(({
    isOpen = false, setClose }) => {

    const [isVisibleTechFormDetailHostamping, setIsVisibleTechFormDetailHostamping] = React.useState<boolean>(false);


    return (
        <>
            {
                isVisibleTechFormDetailHostamping
                    ?
                    <TechFormDetailHostamping
                        isOpen={isVisibleTechFormDetailHostamping}
                        setClose={() => setIsVisibleTechFormDetailHostamping(false)} />
                    :
                    <div>
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
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>In/Printing : </h6>
                                <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ 09/08/2022 đến 19/08/2022</h6>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <DataGrid
                                    key={'id'}
                                    keyExpr={'id'}
                                    dataSource={data}
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}
                                >
                                    <Column alignment="left" caption="Công nghệ In/Printing Technology" fixed>
                                        <Column alignment="left" caption="Nội dung In/Printing Contents" fixed >
                                            <Column dataField="id" alignment="center" caption="Bước/Step" width={100} >
                                                {/* <Column>
                                    <Column dataField="" caption="Front" width={50} />
                                    <Column dataField="" caption="Back" width={50} />
                                </Column> */}
                                                {/* <Column dataField="id" width={50} alignment="left" caption="" /> */}
                                            </Column>
                                            <Column dataField="item" caption="Nội dung/Item"
                                            />
                                            <Column dataField="method" caption="Phương pháp/Method"
                                            />
                                        </Column>
                                    </Column>
                                    <Column
                                        alignment="left"
                                        headerCellRender={() => {
                                            return (
                                                <div className="checkbox">
                                                    <div>
                                                        <input type="checkbox" id="In" checked={true} />
                                                        <label htmlFor="In" className="checkBoxStyle">In trở Nó</label>
                                                    </div>
                                                    <div style={{ marginLeft: 120 }}>
                                                        <input type="checkbox" id="In" />
                                                        <label htmlFor="In" className="checkBoxStyle">In trở Khác</label>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    >
                                        <Column alignment="center" caption="File" fixed>
                                            <Column dataField="colour" caption="Màu/Colour" />
                                            <Column dataField="note" caption="Ghi chú/Note" />
                                        </Column>
                                    </Column>

                                </DataGrid>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <div >
                                    <div className="subtile" style={{ marginBottom: 15 }}>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ép/Lamination : </h6>
                                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ 09/08/2022 đến 19/08/2022</h6>
                                    </div>

                                    <DataGrid
                                        key={'id'}
                                        dataSource={data1}
                                        keyExpr="id"
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}
                                    >
                                        <Column dataField="id" caption="Bước" alignment="left" width={100} />
                                        <Column dataField="contens" caption="Nội dung ép/Contens" />
                                        <Column dataField="classify" caption="Phân loại/Classify" />
                                        <Column dataField="lamination" caption="Thông số máy/Lamination Parameter" width={270} />
                                        <Column dataField="other" caption="Khác/Other"
                                        >
                                        </Column>
                                        <Column dataField="structure" caption="Cấu trúc/Structure" />

                                    </DataGrid>

                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <div className="subtile" style={{ marginBottom: 15 }}>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Gia công/Processing : </h6>
                                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ 09/08/2022 đến 19/08/2022</h6>
                                    </div>
                                    <DataGrid
                                        key={'id'}
                                        dataSource={data1}
                                        keyExpr="id"
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}
                                    >
                                        <Column dataField="id" caption="No." alignment="left" width={100} />
                                        <Column dataField="lnk" caption="Mực/Lnk" cellRender={() => <TextBox placeholder="Nhập" key={'lnk'} />}>
                                        </Column>
                                        <Column dataField="nilon" caption="Nilon" cellRender={() => <TextBox placeholder="Nhập" key={'nilon'} />} />
                                        <Column dataField="cut" caption="Cắt" cellRender={() => <TextBox placeholder="Nhập" key={'cut'} />} />
                                        <Column dataField="be" caption="Bế"
                                            cellRender={() => <TextBox placeholder="Nhập" key={'be'} />} >
                                        </Column>
                                        <Column dataField="dun" caption="Đùn" cellRender={() => <TextBox placeholder="Nhập" key={'dun'} />} />
                                        <Column dataField="other" caption="Khác/Other" cellRender={() => <TextBox placeholder="Nhập" key={'other'} />} />
                                        <Column caption="" dataField="" alignment="center" cellRender={() =>
                                            <div>
                                                <Button icon="add" style={{ marginRight: 10, border: 'none' }} />
                                                <Button icon="trash" style={{ border: 'none' }} />
                                            </div>
                                        } />
                                    </DataGrid>

                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <div className="subtile" style={{ marginBottom: 15 }}>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Cut/Cutting : </h6>
                                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ 09/08/2022 đến 19/08/2022</h6>
                                    </div>
                                    <DataGrid
                                        key={'id'}
                                        dataSource={data1}
                                        keyExpr="id"
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}
                                    >
                                        <Column dataField="id" caption="No." alignment="left" width={100} />
                                        <Column dataField="content" caption="Nội dung/Content" cellRender={() => <TextBox placeholder="Nhập" key={'content'} />} />
                                        <Column dataField="machine" caption="Máy/Machine" cellRender={() => <TextBox placeholder="Nhập" key={'machine'} />} />
                                    </DataGrid>

                                </div>
                                <div >
                                    <div className="subtile" style={{ marginBottom: 15 }}>
                                        <h6 style={{ fontSize: 15, fontWeight: 500 }}>Hostamping: </h6>
                                        <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>Thời gian từ 09/08/2022 đến 19/08/2022</h6>
                                    </div>
                                    <DataGrid
                                        key={'id'}
                                        dataSource={data2}
                                        keyExpr="id"
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}
                                    >
                                        <Column dataField="id" caption="Bước" alignment="center" width={100} />
                                        <Column dataField="process" caption="Công đoạn/Process" />
                                        <Column dataField="content" alignment="center" caption="Nội dung hots/Content" />
                                        <Column dataField="rmcode" alignment="center" caption="Mã vật liệu/RMcode" />
                                        <Column dataField="typehots" alignment="center" caption="Loại phôi hots/Type" />
                                        <Column dataField="position" alignment="center" caption="Vị trí"
                                        >
                                        </Column>
                                        <Column dataField="machine" alignment="center" caption="Máy/Machine" />
                                        <Column dataField="other" alignment="center" caption="Khác/Other" />
                                    </DataGrid>

                                </div>
                                <div
                                    className="toolbar"
                                    style={{
                                        marginTop: 10,
                                        float: "right",
                                        background: "#ffffff",
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
                                        onClick={() => { setIsVisibleTechFormDetailHostamping(true) }}
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

export default TechFormDetailProcedure;