import React from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { Column, FilterRow, HeaderFilter, Item as ToolbarItem, Toolbar, Button as ButtonB } from "devextreme-react/data-grid";
import "./BOMBodyCardAddInfo.css";
import { InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { observer } from "mobx-react";
import PopupBOMAddNewInfoMaterial from "../../../../shared/components/PopupBOMAddNewInfoMaterial/PopupBOMAddNewInfoMaterial";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../../icons/SvgIcon/SvgIcon";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { MDM_API_URL, PLANNING_API_URL } from "../../../../../config";

type BOMBodyCardAddInfoProps = {
    id: Number | null;
    isOpen: boolean;
    setClose?: () => void;
};

type MaterialDetail = {
    materialCode: string | undefined;
    materialDescription: string | undefined;
    materialName: string | undefined;
    version: string | undefined;
    classify: string | undefined;
    quota: string | undefined;
    unit: string | undefined;
    supplier: string | undefined;
    warehouse: string | undefined;
    quantityStock: string | undefined;
};

const data = [
    {
        materialCode: "HH01",
        materialDescript: "Vật tư 1",
        technicalName: "Vật tư 1",
        version: "1.1",
        classify: "NVL",
        norm: "1",
        unit: "Cái",
        supplier: "NCC01",
        warehouse: "03,05",
        materialCodeChange: "HH04",
        materialDescriptChange: "Vật tư 04",
        inventoryQuantity: "1000",
    },
];
export const BOMBodyCardAddInfo: React.FC<BOMBodyCardAddInfoProps> = observer(({ isOpen = false, setClose, id }) => {
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isVisiblePopupAddInfoMaterial, setIsVisiblePopupAddInfoMaterial] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const [bomData, setBomData] = React.useState<any>({});

    const [materialDetail, setMaterialDetail] = React.useState<MaterialDetail | null | any>();
    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    };
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
    };

    const handleAddNewInfoMaterial = () => {
        setIsVisiblePopupAddInfoMaterial(true);
    };

    const [materialCodes, setMaterialCodes] = React.useState<any>([]);

    const mainStore = useMainStore();

    const onAddMatetialToBom = () => {
        setBomData({
            ...bomData,
            bomBodyCardMaterials: [...bomData.bomBodyCardMaterials, materialDetail],
        });
        setMaterialDetail({});
        setIsVisiblePopupAddInfoMaterial(false);
    };

    const onChangeMaterialCode = (e) => {
        if (materialDetail?.materialCode.trim() !== "") {
            const data = JSON.stringify({
                pageNumber: 0,
                pageSize: 100,
                common: "",
                filter: {
                    productCode: materialDetail?.materialCode,
                },
            });
            const headers = {
                Authorization: "Bearer " + mainStore.authToken,
                "content-type": "application/json",
            };
            axios({ method: "post", url: MDM_API_URL + "/api/products", headers: headers, data: data }).then((response) => {
                if (response.status === 200) {
                    console.log(response.data.data);
                    const data = response.data.data.find((data) => data.productCode === materialDetail?.materialCode);
                    if (data) {
                        setMaterialDetail({
                            materialCode: data.productCode,
                            materialDescription: data.proName,
                            materialName: data.techName,
                            unit: data.unit,
                            version: data.version,
                            quantityStock: data.quantity | 0,
                        });
                    } else {
                        setMaterialDetail({
                            materialCode: materialDetail?.materialCode,
                            materialDescription: "",
                            materialName: "",
                            unit: "",
                            version: "",
                        });
                    }

                    // setBomData(response.data.data)
                }
            });
        }
    };

    React.useEffect(() => {
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        axios.get(PLANNING_API_URL + "/api/boms/" + id, { headers }).then((response) => {
            if (response.status === 200) {
                console.log(response.data.data);
                setBomData(response.data.data);
            }
        });
    }, [id]);

    return (
        <>
            {isVisiblePopupAddInfoMaterial ? (
                <PopupBOMAddNewInfoMaterial
                    isVisible={isVisiblePopupAddInfoMaterial}
                    modalContent={
                        <div style={{ marginTop: 30, marginBottom: 50 }}>
                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                <td style={{ marginLeft: 30 }}>
                                    <p>Mã vật tư</p>
                                    <TextBox
                                        onValueChanged={(e) => {
                                            setMaterialDetail({
                                                ...materialDetail,
                                                materialCode: e.value,
                                            });
                                        }}
                                        value={materialDetail?.materialCode}
                                        onChange={(e) => {
                                            onChangeMaterialCode(e);
                                            // setMaterialCode(e.target.value)
                                        }}
                                        id='codeMaterial'
                                        key={"codeMaterial"}
                                        placeholder='Nhập mã vật tư'
                                        width={300}></TextBox>
                                    <p style={{ marginTop: 30 }}>Tên kỹ thuật</p>
                                    <TextBox
                                        value={materialDetail?.materialName}
                                        id='technicalName'
                                        key={"technicalName"}
                                        placeholder='Nhập tên kỹ thuật'></TextBox>
                                    <p style={{ marginTop: 30 }}>Phân loại</p>
                                    <TextBox id='classify' key={"classify"} placeholder='Nhập tên khác'></TextBox>
                                    <p style={{ marginTop: 30 }}>Đơn vị tính</p>
                                    <TextBox value={materialDetail?.unit} id='unit' key={"unit"}></TextBox>
                                    <p style={{ marginTop: 30 }}>Kho hàng</p>
                                    <SelectBox
                                        value={materialDetail?.warehouse}
                                        id='warehouse'
                                        key={"warehouse"}
                                        placeholder='--Chọn--'></SelectBox>
                                    <p style={{ marginTop: 30 }}>Mã vật tư thay thế</p>
                                    <TextBox
                                        id='materialCodeChange'
                                        key={"materialCodeChange"}
                                        placeholder='Nhập mã vật tư thay thế'></TextBox>
                                </td>
                                <td style={{ marginRight: 30 }}>
                                    <p>Mô tả vật tư</p>
                                    <TextBox
                                        value={materialDetail?.materialDescription}
                                        id='materialDescript'
                                        key={"materialDescript"}
                                        placeholder='Nhập mô tả vật tư'
                                        width={300}></TextBox>
                                    <p style={{ marginTop: 30 }}>Verion</p>
                                    <TextBox value={materialDetail?.version} id='version' key={"version"} placeholder='Nhập'></TextBox>
                                    <p style={{ marginTop: 30 }}>Định mức</p>
                                    <SelectBox id='norm' key={"norm"} placeholder='Chọn'></SelectBox>
                                    <p style={{ marginTop: 30 }}>Nhà cung cấp</p>
                                    <TextBox id='supplier' key={"supplier"} placeholder='Nhập mã nhà cung cấp'></TextBox>
                                    <p style={{ marginTop: 30 }}>Số lượng tồn kho</p>
                                    <TextBox
                                        value={materialDetail?.quantityStock?.toString()}
                                        id='inventoryQuantity'
                                        key={"inventoryQuantity"}
                                        placeholder=''></TextBox>
                                    <p style={{ marginTop: 30 }}>Mô tả vật tư thay thế</p>
                                    <TextBox
                                        id='inventoryDescription'
                                        key={"inventoryDescription"}
                                        placeholder='Nhập mô tả vật tư thay thế'></TextBox>
                                </td>
                            </table>
                        </div>
                    }
                    modalTitle={
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <SvgIcon sizeIcon={25} icon='assets/icons/Announcement.svg' textColor='#FF7A00' style={{ marginRight: 17 }} />
                            Thêm mới thông tin vật tư
                        </div>
                    }
                    onCancel={() => {
                        setIsVisiblePopupAddInfoMaterial(false);
                        setMaterialDetail({});
                    }}
                    onSubmit={() => onAddMatetialToBom()}
                    // onCancel={() => setIsVisiblePopupAddInfoMaterial(false)}
                    // onSubmit={() => console.log("ok")}
                    width={800}
                />
            ) : (
                <div className='box__shadow-table-responsive'>
                    <div className='table-responsive'>
                        <div
                            className='informer'
                            style={{
                                background: "#fff",
                                textAlign: "center",
                                paddingTop: 12,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                }}>
                                Thêm mới thông tin BOM body card
                            </h5>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                <td style={{ marginLeft: 30 }}>
                                    <p>Mã sản phẩm</p>
                                    <TextBox value={bomData.productCode} placeholder='SP001' width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Số lượng</p>
                                    <TextBox placeholder='15000'></TextBox>
                                    <p style={{ marginTop: 30 }}>Chọn thẻ để sao chép BOM</p>
                                    <SelectBox placeholder='Chọn'></SelectBox>
                                </td>
                                <td>
                                    <p>Mô tả sản phẩm</p>
                                    <TextBox value={bomData.productName} placeholder='Phôi thẻ MC ' width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Lưu ý</p>
                                    <TextBox value={bomData.notice} placeholder=''></TextBox>
                                    <p style={{ marginTop: 30 }}>BOM version thẻ sao chép</p>
                                    <TextBox placeholder=''></TextBox>
                                </td>
                                <td style={{ marginRight: 30 }}>
                                    <p>Version</p>
                                    <TextBox value={bomData.version} placeholder='1.1' width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Ghi chú</p>
                                    <TextBox value={bomData.note} placeholder=''></TextBox>
                                </td>
                            </table>
                        </div>
                        <div
                            className='informer'
                            style={{
                                backgroundColor: "#ffffff",
                                paddingLeft: 13,
                            }}>
                            <h4
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginTop: 30,
                                    fontSize: 25,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                }}>
                                Danh sách vật tư
                            </h4>
                        </div>

                        <DataGrid
                            key='materialCode'
                            keyExpr={"materialCode"}
                            dataSource={bomData.bomBodyCardMaterials}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}>
                            <PopupImportFile
                                visible={isVisibleImportFile}
                                onCancel={() => setIsVisibleImportFile(false)}
                                title={"Import file"}
                                onSubmit={() => {}}
                                width={900}
                            />
                            <PopupConfirmDelete
                                isVisible={isConfirmDelete}
                                onCancel={handleHideModalDel}
                                onSubmit={() => console.log("ok")}
                                modalTitle={
                                    <div>
                                        <h3
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#ff794e",
                                                fontWeight: 500,
                                                fontSize: 25,
                                            }}>
                                            <InfoCircleOutlined
                                                style={{
                                                    color: "#ff794e",
                                                    marginRight: "8px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontSize: 30,
                                                }}
                                            />
                                            Xác nhận xóa?
                                        </h3>
                                    </div>
                                }
                                modalContent={
                                    <div>
                                        <h5
                                            style={{
                                                height: 80,
                                                fontWeight: 400,
                                                marginTop: 30,
                                                fontSize: 20,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}>
                                            Bạn có chắc chắn muốn thực hiện thao tác xóa không?
                                        </h5>
                                    </div>
                                }
                                width={600}
                            />
                            <Toolbar>
                                <ToolbarItem>
                                    <SvgIcon
                                        onClick={handleAddNewInfoMaterial}
                                        text='Thêm vật tư'
                                        tooltipTitle='Thêm vật tư'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/Add.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem>
                                    <SvgIcon
                                        onClick={() => setIsVisibleImportFile(true)}
                                        text='Import file'
                                        tooltipTitle='Import file'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/ImportFile.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                            </Toolbar>
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                                allowSearch={true}
                            />
                            <FilterRow visible={true} />

                            <Column dataField='materialCode' caption='Mã vật tư'></Column>
                            <Column dataField='materialDescription' caption='Mô tả vật tư'></Column>

                            <Column dataField='materialName' caption='Tên kỹ thuật' alignment='left'></Column>

                            <Column dataField='version' caption='Version' alignment={"left"}></Column>
                            <Column dataField='classify' caption='Phân loại' alignment={"left"}></Column>
                            <Column dataField='norm' caption='Định mức' />
                            <Column dataField='unit' caption='Đơn vị tính' />
                            <Column dataField='supplier' alignment={"left"} caption={"Nhà cung cấp"}></Column>
                            <Column caption={"Kho hàng"} dataField='warehouse' />
                            <Column caption={"Mã vật tư thay thế"} dataField='materialCodeChange' />
                            <Column caption={"Mô tả vật tư thay thế"} dataField='materialDescriptChange' />
                            <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                            <Column dataField='supplier' alignment={"left"} caption={"Nhà cung cấp"}></Column>
                            <Column caption={"Kho hàng"} dataField='warehouse' />
                            <Column caption={"Mã vật tư thay thế"} dataField='replaceMaterialCode' />
                            <Column caption={"Mô tả vật tư thay thế"} dataField='materialDescriptChange' />
                            <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <SvgIcon
                                            onClick={handleShowModalDel}
                                            tooltipTitle='Xóa'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                    </div>
                                )}></Column>
                        </DataGrid>
                        <div
                            className='toolbar'
                            style={{
                                marginTop: 15,
                                paddingBottom: 15,
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center",
                                // background: "#ffffff",
                                borderRadius: "4px",
                            }}>
                            <Button
                                onClick={setClose}
                                text='Hủy bỏ'
                                style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                            />
                            <Button text='Thêm mới' style={{ backgroundColor: "#FF7A00", color: "#fff" }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default BOMBodyCardAddInfo;
