import React from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { Column, FilterRow, HeaderFilter, Item as ToolbarItem, Toolbar, Button as ButtonB } from "devextreme-react/data-grid";
import "./BOMBodyCardAddInfo.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { observer } from "mobx-react";
import PopupBOMAddNewInfoMaterial from "../../../../shared/components/PopupBOMAddNewInfoMaterial/PopupBOMAddNewInfoMaterial";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../../icons/SvgIcon/SvgIcon";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { MDM_API_URL, PLANNING_API_URL } from "../../../../../config";
import Loading from "../../../../common/Loading";

type BOMBodyCardAddInfoProps = {
    id: Number | null;
    requestInfo: any;
    techFormId: any;
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

const convertToMaterialBOM = (value) => {
    let classify;
    switch (value.itemGroupCode) {
        case 101:
            classify = 'NVL'
            break;
        case 102:
            classify = 'BTP'
            break;
        case 103:
            classify = 'TP'
            break;
        default:
            classify = 'Không xác định'
            break;
    }
    return {
        materialCode: value.productCode,
        materialName: value.proName,
        materialTechName: value.techName,
        classify: classify,
        quantity: value.quantity,
        quota: value.quota ? value.quota : 1,
        unit: value.unit,
        version: value.version
    }
}

const classify = ['Thành phẩm', 'Bán thành phẩm', 'Nguyên vật liệu']


export const BOMBodyCardAddInfo: React.FC<BOMBodyCardAddInfoProps> = observer(({ isOpen = false, setClose, id, requestInfo, techFormId }) => {
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isVisiblePopupAddInfoMaterial, setIsVisiblePopupAddInfoMaterial] = React.useState<boolean>(false);
    const [isVisibleImportFile, setIsVisibleImportFile] = React.useState<boolean>(false);
    const [bomData, setBomData] = React.useState<any>({});
    const [materialDetail, setMaterialDetail] = React.useState<MaterialDetail | null | any>();
    const gridRef = React.useRef(null);
    const [idRemoveChoosed, setIdRemoveChoosed] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const handleShowModalDel = (id) => {
        setIdRemoveChoosed(id)
        setIsConfirmDelete(true);
    };
    const handleHideModalDel = () => {
        setIsConfirmDelete(false);
        setIdRemoveChoosed(null)
    };


    const handleAddNewInfoMaterial = () => {
        setIsVisiblePopupAddInfoMaterial(true);
    };

    const [materialList, setMaterialList] = React.useState<any>([]);

    const mainStore = useMainStore();

    const onAddMatetialToBom = (id, value) => {

        let newbomBodyCardMaterials = bomData.bomBodyCardMaterials;
        newbomBodyCardMaterials = newbomBodyCardMaterials.map((data, index) => {
            if (data.id === id) {
                return {
                    ...data,
                    ...convertToMaterialBOM(value),
                }
            } else {
                return data;
            }
        })
        setBomData({
            ...bomData,
            bomBodyCardMaterials: newbomBodyCardMaterials,
        });
    };

    const onAddMaterialReplace = (id, value) => {
        let updateMaterialBom = bomData.bomBodyCardMaterials.map((data) => {
            if (data.id === id) {
                return {
                    ...data,
                    replaceMaterialCode: value.productCode,
                    replaceMaterialName: value.proName
                }
            } else {
                return data
            }
        })

        setBomData({
            ...bomData,
            bomBodyCardMaterials: updateMaterialBom,
        });
    }

    const addNewRowMaterial = (index) => {
        const newbomBodyCardMaterials = [...bomData.bomBodyCardMaterials.slice(0, index + 1), {
            id: bomData.bomBodyCardMaterials.length + 1
        }, ...bomData.bomBodyCardMaterials.slice(index + 1)]

        setBomData({
            ...bomData,
            bomBodyCardMaterials: newbomBodyCardMaterials,
        });
    }

    const removeRowMaterial = (id) => {
        let newData = bomData.bomBodyCardMaterials.filter((data) => data.id !== id)
        .map((data, index) => {
            return {
                ...data,
                id: index + 1
            }
        });
        if (newData.length === 0) {
            newData.push({id: 1})
        }
        setBomData({
            ...bomData,
            bomBodyCardMaterials: newData,
        });
    }


    const getAllMaterial = () => {
        const data = JSON.stringify({
            pageNumber: 0,
            pageSize: 9999,
            common: "",
            filter: {
            },
        });
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        axios({ method: "post", url: MDM_API_URL + "/api/products", headers: headers, data: data }).then((response) => {
            if (response.status === 200) {
                setMaterialList(response.data.data)
            }
        });
    }

    const handleCreateBOM = () => {
        setIsLoading(true)
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        axios({ method: "post", url: PLANNING_API_URL+ "/api/boms", headers: headers, data: JSON.stringify(bomData) }).then((response) => {
            if (response.data.message === 'Thành công') {
                if (techFormId !== null) {
                    axios({ method: "post", url: PLANNING_API_URL+ `/api/techforms/${techFormId}/boms`, headers: headers, data: JSON.stringify(response.data.data) }).then(response => {
                    })
                }
            }
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        })
    }

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
        if (id !== null) {
            const headers = {
                Authorization: "Bearer " + mainStore.authToken,
                "content-type": "application/json",
            };
            axios.get(PLANNING_API_URL + "/api/boms/" + id, { headers }).then((response) => {
                if (response.status === 200) {
                    setBomData(response.data.data);
                }
            });
        } else {
            setBomData({
                productName: requestInfo?.cardName,
                quantity: requestInfo?.quantityCompensation,
                version: '1.0',
                bomBodyCardMaterials: [{id: 1}]})
        }
    }, [id, requestInfo, techFormId]);

    React.useEffect(() => {
        getAllMaterial();
    }, [])

    const test = () => {
        console.log('bomData 22' , bomData)
    }
    console.log('bomData', bomData)

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
                                    <TextBox defaultValue={materialDetail?.version} 
                                     id='version' key={"version"} placeholder='Nhập'></TextBox>
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
                    onSubmit={() => {}}
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
                                    <p>Tên thẻ</p>
                                    <TextBox value={bomData.productName} style={{backgroud: 'black'}} disabled={requestInfo!== null} placeholder='SP001' width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Mã loại thẻ mẫu</p>
                                    <SelectBox placeholder='Chọn'></SelectBox>
                                    <p style={{ marginTop: 30 }}>Tổng số bản</p>
                                    <TextBox placeholder='Nhập'></TextBox>
                                </td>
                                <td>
                                    <p>Version</p>
                                    <TextBox value={bomData.version} onValueChange={(e) => {
                                        setBomData({
                                            ...bomData,
                                            version: e
                                        })
                                    }} placeholder='Nhập' width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Tên loại thẻ mẫu</p>
                                    <TextBox value={bomData.notice} placeholder='Visa'></TextBox>
                                    <p style={{ marginTop: 30 }}>Chọn thẻ để sao chép BOM</p>
                                    <SelectBox placeholder='Chọn'></SelectBox>
                                </td>
                                <td style={{ marginRight: 30 }}>
                                    <p>Số lượng đã tính bù hao</p>
                                    <TextBox  value={bomData.quantity} disabled={requestInfo!== null} placeholder='Nhập' width={350}></TextBox>
                                    <p style={{ marginTop: 30 }}>Phân loại sản phẩm</p>
                                    <SelectBox onValueChange={e => {
                                        console.log(e)
                                        setBomData({
                                            ...bomData,
                                            productClassify: e
                                        })
                                    }} dataSource={classify} placeholder=''></SelectBox>
                                    <p style={{ marginTop: 30 }}>BOM version thẻ sao chép</p>
                                    <TextBox value={bomData.note} placeholder='1.1'></TextBox>
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
                            key='id'
                            keyExpr={"id"}
                            dataSource={bomData.bomBodyCardMaterials}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            ref={gridRef}
                            >
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
                                onSubmit={() => {removeRowMaterial(idRemoveChoosed); handleHideModalDel()}}
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

                            <Column fixed={true} width={250} dataField='productCode' caption='Chọn mã vật tư' cellRender={(cellIfo) => (
                                                    <SelectBox 
                                                        dataSource={materialList}
                                                        searchExpr={"productCode"}
                                                        valueExpr={"productCode"}
                                                        displayExpr={"productCode"}
                                                        // value={cellIfo.value}
                                                        // selectedItem={cellIfo.data}
                                                        onSelectionChanged={(e) => {
                                                            onAddMatetialToBom(cellIfo.data.id, e.selectedItem)
                                                        }}
                                                    placeholder='Nhập' searchEnabled={true} key={"productCode"} />
                                                )}></Column>
                            <Column fixed={true} width={250} dataField='materialCode' caption='Mã vật tư' />              
                            <Column dataField='materialName' caption='Mô tả vật tư'></Column>

                            <Column dataField='materialTechName' caption='Tên kỹ thuật' alignment='left'></Column>

                            <Column dataField='version' caption='Version' alignment={"left"}></Column>
                            <Column dataField='classify' caption='Phân loại' alignment={"left"}></Column>
                            <Column dataField='quota' caption='Định mức' />
                            <Column dataField='quantity' caption='Số lượng' />
                            <Column dataField='unit' caption='Đơn vị tính' />
                            <Column caption={"Chọn mã vật tư thay thế"} dataField='' cellRender={(cellIfo) => (
                                <SelectBox 
                                    dataSource={materialList}
                                    searchExpr={"productCode"}
                                    valueExpr={"productCode"}
                                    displayExpr={"productCode"}
                                    onSelectionChanged={(e) => {
                                        onAddMaterialReplace(cellIfo.data.id, e.selectedItem)
                                    }}
                                placeholder='Nhập' searchEnabled={true} key={"productCode"} />
                            )}/>
                            <Column caption={"Mã vật tư thay thế"} dataField='replaceMaterialCode' />
                            <Column caption={"Mô tả vật tư thay thế"} dataField='replaceMaterialName' />
                            <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                fixed={true}
                                cellRender={(cellInfo) => {
                                    return(
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <SvgIcon
                                            onClick={() => {
                                                addNewRowMaterial(cellInfo.rowIndex)
                                            }}
                                            tooltipTitle='Thêm mới'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Add.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => handleShowModalDel(cellInfo.data.id)}
                                            tooltipTitle='Xóa'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                    </div>
                                )}}></Column>
                        </DataGrid>
                        <div
                            className='toolbar'
                            style={{
                                marginTop: 15,
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center",
                                // background: "#ffffff",
                                padding: "8px",
                                borderRadius: "4px",
                            }}>
                            <Button
                                onClick={setClose}
                                text='Hủy bỏ'
                                style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                            />
                            <Button 
                                onClick={handleCreateBOM}
                            text='Thêm mới' style={{ backgroundColor: "#FF7A00", color: "#fff" }} />
                        </div>
                    </div>
                </div>
            )}
            {
                isLoading && <Loading />
            }
        </>
    );
});

export default BOMBodyCardAddInfo;
