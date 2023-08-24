import React, { } from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Toolbar,
    Button as ButtonB
} from "devextreme-react/data-grid";
import "./BOMBodyCardAddInfo.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { observer } from "mobx-react";
import PopupBOMAddNewInfoMaterial from "../../../../shared/components/PopupBOMAddNewInfoMaterial/PopupBOMAddNewInfoMaterial";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../../icons/SvgIcon/SvgIcon";

type BOMBodyCardAddInfoProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { materialCode: 'HH01', materialDescript: 'Vật tư 1', technicalName: 'Vật tư 1', version: '1.1', classify: 'NVL', norm: '1', unit: 'Cái', supplier: 'NCC01', warehouse: '03,05', materialCodeChange: 'HH04', materialDescriptChange: 'Vật tư 04', inventoryQuantity: '1000' },
    { materialCode: 'HH02', materialDescript: 'Vật tư 1', technicalName: 'Vật tư 1', version: '1.1', classify: 'NVL', norm: '1', unit: 'Cái', supplier: 'NCC01', warehouse: '03,05', materialCodeChange: 'HH04', materialDescriptChange: 'Vật tư 04', inventoryQuantity: '1000' },
    { materialCode: 'HH03', materialDescript: 'Vật tư 1', technicalName: 'Vật tư 1', version: '1.1', classify: 'NVL', norm: '1', unit: 'Cái', supplier: 'NCC01', warehouse: '03,05', materialCodeChange: 'HH04', materialDescriptChange: 'Vật tư 04', inventoryQuantity: '1000' }
];
export const BOMBodyCardAddInfo: React.FC<BOMBodyCardAddInfoProps> = observer(({
    isOpen = false, setClose }) => {
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isVisiblePopupAddInfoMaterial, setIsVisiblePopupAddInfoMaterial] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    }
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    }

    const handleAddNewInfoMaterial = () => {
        setIsVisiblePopupAddInfoMaterial(true);
    }

    return (
        <>
            {isVisiblePopupAddInfoMaterial ?
                <PopupBOMAddNewInfoMaterial
                    isVisible={isVisiblePopupAddInfoMaterial}
                    modalContent={
                        <div style={{ marginTop: 30, marginBottom: 50 }}>
                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                <td style={{ marginLeft: 30 }}>
                                    <p>Mã vật tư</p>
                                    <TextBox id="codeMaterial" key={'codeMaterial'} placeholder="Nhập mã vật tư" width={300}></TextBox>
                                    <p style={{ marginTop: 30 }}>Tên kỹ thuật</p>
                                    <TextBox id="technicalName" key={'technicalName'} placeholder="Nhập tên kỹ thuật"></TextBox>
                                    <p style={{ marginTop: 30 }}>Phân loại</p>
                                    <TextBox id="classify" key={'classify'} placeholder="Nhập tên khác"></TextBox>
                                    <p style={{ marginTop: 30 }}>Đơn vị tính</p>
                                    <SelectBox id="unit" key={'unit'} placeholder="Chọn"></SelectBox>
                                    <p style={{ marginTop: 30 }}>Kho hàng</p>
                                    <SelectBox id="warehouse" key={'warehouse'} placeholder="Chọn"></SelectBox>
                                    <p style={{ marginTop: 30 }}>Mã vật tư thay thế</p>
                                    <TextBox id="materialCodeChange" key={'materialCodeChange'} placeholder="Nhập mã vật tư thay thế"></TextBox>
                                </td>
                                <td style={{ marginRight: 30 }}>
                                    <p>Mô tả vật tư</p>
                                    <TextBox id="materialDescript" key={'materialDescript'} placeholder="Nhập mô tả vật tư" width={300}></TextBox>
                                    <p style={{ marginTop: 30 }}>Verion</p>
                                    <TextBox id="version" key={'version'} placeholder="Nhập"></TextBox>
                                    <p style={{ marginTop: 30 }}>Định mức</p>
                                    <SelectBox id="norm" key={'norm'} placeholder="Chọn"></SelectBox>
                                    <p style={{ marginTop: 30 }}>Nhà cung cấp</p>
                                    <TextBox id="supplier" key={'supplier'} placeholder="Nhập mã nhà cung cấp"></TextBox>
                                    <p style={{ marginTop: 30 }}>Số lượng tồn kho</p>
                                    <TextBox id="inventoryQuantity" key={'inventoryQuantity'} placeholder=""></TextBox>
                                    <p style={{ marginTop: 30 }}>Mô tả vật tư thay thế</p>
                                    <TextBox id="inventoryQuantity" key={'inventoryQuantity'} placeholder="Nhập mô tả vật tư thay thế"></TextBox>
                                </td>
                            </table>
                        </div>
                    }
                    modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                        <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                        Thêm mới thông tin vật tư
                    </div>}
                    onCancel={() => setIsVisiblePopupAddInfoMaterial(false)}
                    onSubmit={() => console.log('ok')
                    }
                    width={800}
                />
                :
                <div className="box__shadow-table-responsive">
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "center",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Thêm mới thông tin BOM body card</h5>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                <td style={{ marginLeft: 30 }}>
                                    <p>Tên thẻ</p>
                                    <TextBox placeholder="Phôi Thẻ MC Tita cashback debit, VP Bank" width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Lưu ý</p>
                                    <TextBox placeholder="15000" disabled></TextBox>
                                    <p style={{ marginTop: 30 }}>Tổng số bản</p>
                                    <TextBox placeholder="Nhập"></TextBox>
                                </td>
                                <td>
                                    <p>Version</p>
                                    <TextBox placeholder="Nhập" width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Ghi chú</p>
                                    <TextBox placeholder="" disabled></TextBox>
                                    <p style={{ marginTop: 30 }}>Chọn thẻ để sao chép BOM</p>
                                    <SelectBox placeholder="Chọn"></SelectBox>
                                </td>
                                <td style={{ marginRight: 30 }}>
                                    <p>Số lượng</p>
                                    <TextBox placeholder="1.1" width={350} disabled></TextBox>
                                    <p style={{ marginTop: 30 }}>Phân loại sản phẩm</p>
                                    <SelectBox placeholder="Chọn"></SelectBox>
                                    <p style={{ marginTop: 30 }}>BOM version thẻ sao chép</p>
                                    <TextBox placeholder="1.1" disabled></TextBox>
                                </td>
                            </table>
                        </div>
                        <div className="informer" style={{
                            backgroundColor: "#ffffff",
                            paddingLeft: 13
                        }}>
                            <h4 className="name" style={{
                                color: "rgba(0, 0, 0, 0.7)",
                                marginTop: 30,
                                fontSize: 25,
                                boxSizing: "border-box",
                                fontWeight: 550
                            }}>Danh sách vật tư</h4>
                        </div>

                        <DataGrid
                            key="materialCode"
                            keyExpr={"materialCode"}
                            dataSource={data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                        >
                            <PopupImportFile visible={isVisibleImportFile} onCancel={() => setIsVisibleImportFile(false)} title={'Import file'} onSubmit={() => { }} width={900} />
                            <PopupConfirmDelete
                                isVisible={isConfirmDelete}
                                onCancel={handleHideModalDel}
                                onSubmit={() => console.log('ok')
                                }
                                modalTitle={
                                    <div>
                                        <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500, fontSize: 25 }}>
                                            <InfoCircleOutlined style={{ color: '#ff794e', marginRight: '8px', display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30 }} />
                                            Xác nhận xóa?
                                        </h3>
                                    </div>
                                }
                                modalContent={<div><h5 style={{ height: 80, fontWeight: 400, marginTop: 30, fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>Bạn có chắc chắn muốn thực hiện thao tác xóa không?</h5></div>}
                                width={600} />
                            {/* <Toolbar>
                                <ToolbarItem >
                                    <SvgIcon onClick={handleAddNewInfoMaterial} text="Thêm vật tư" tooltipTitle="Thêm vật tư" sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                </ToolbarItem>
                                <ToolbarItem >
                                    <SvgIcon onClick={() => setIsVisibleImportFile(true)} text="Import file" tooltipTitle="Import file" sizeIcon={17} textSize={17} icon="assets/icons/ImportFile.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                </ToolbarItem>
                            </Toolbar> */}
                            <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} />
                            <FilterRow visible={true} />

                            <Column dataField="materialCode"
                                caption="Mã vật tư"
                            >
                            </Column>
                            <Column dataField="materialDescript"
                                caption="Mô tả vật tư"
                            >
                            </Column>

                            <Column dataField="technicalName"
                                caption="Tên kỹ thuật"
                                alignment="left"
                            >
                            </Column>

                            <Column dataField="version"
                                caption="Version"
                                alignment={"left"}
                            >

                            </Column>
                            <Column dataField="classify"
                                caption="Phân loại"
                                alignment={"left"}
                            >
                            </Column>
                            <Column dataField="norm" caption="Định mức" />
                            <Column dataField="unit" caption="Đơn vị tính" />
                            <Column
                                dataField="supplier"
                                alignment={"left"}
                                caption={"Nhà cung cấp"}
                            >
                            </Column>
                            <Column caption={"Kho hàng"} dataField="warehouse" />
                            <Column caption={"Mã vật tư thay thế"} dataField="materialCodeChange" />
                            <Column caption={"Mô tả vật tư thay thế"} dataField="materialDescriptChange" />
                            <Column caption={"Số lượng tồn kho"} dataField="inventoryQuantity" />
                            <Column type={'buttons'} caption={"Thao tác"} alignment="center"
                                cellRender={() =>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <SvgIcon onClick={() => { }} tooltipTitle="Thêm vật tư" sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        <SvgIcon onClick={handleShowModalDel} tooltipTitle="Xóa" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" />
                                    </div>
                                }>
                            </Column>
                        </DataGrid>
                        <div
                            className="toolbar"
                            style={{
                                marginTop: 15,
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center",
                                // background: "#ffffff",
                                padding: "8px",
                                borderRadius: "4px",
                            }}
                        >
                            <Button
                                onClick={setClose}
                                text="Hủy bỏ"
                                style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                            />
                            <Button
                                text="Thêm mới"
                                style={{ backgroundColor: "#FF7A00", color: "#fff" }}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )

})

export default BOMBodyCardAddInfo;