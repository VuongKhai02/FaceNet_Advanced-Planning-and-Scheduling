import React from "react";
import { DataGrid, SelectBox, TextBox } from "devextreme-react";
import { Column, FilterRow, OperationDescriptions } from "devextreme-react/data-grid";
import "./BOMBodyCardAddInfo.css";
import { WarningOutlined } from "@ant-design/icons";
import PopupConfirmDelete from "../../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { observer } from "mobx-react";
import PopupBOMAddNewInfoMaterial from "../../../../../shared/components/PopupBOMAddNewInfoMaterial/PopupBOMAddNewInfoMaterial";
import PopupImportFile from "../../../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import { MDM_API_URL, PLANNING_API_URL } from "../../../../../utils/config";
import Loading from "../../../../../shared/components/Loading/Loading";
import httpRequests from "../../../../../utils/httpRequests";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import NotificationManager from "../../../../../utils/NotificationManager";
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

const convertToMaterialBOM = (value: any) => {
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
    const { t } = useTranslation(["common"]);

    const handleShowModalDel = (id: any) => {
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

    const onAddMatetialToBom = (id: any, value: any) => {

        let newbomBodyCardMaterials = bomData.bomBodyCardMaterials;
        newbomBodyCardMaterials = newbomBodyCardMaterials.map((data: any, index: number) => {
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

    const onAddMaterialReplace = (id: any, value: any) => {
        let updateMaterialBom = bomData.bomBodyCardMaterials.map((data: any) => {
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

    const addNewRowMaterial = (index: number) => {
        const newbomBodyCardMaterials = [...bomData.bomBodyCardMaterials.slice(0, index + 1), {
            id: bomData.bomBodyCardMaterials.length + 1
        }, ...bomData.bomBodyCardMaterials.slice(index + 1)]

        setBomData({
            ...bomData,
            bomBodyCardMaterials: newbomBodyCardMaterials,
        });
        NotificationManager.success(t("Thêm mới hàng thành công!"))
    }

    const removeRowMaterial = (id: any) => {
        let newData = bomData.bomBodyCardMaterials.filter((data: any) => data.id !== id)
            .map((data: any, index: any) => {
                return {
                    ...data,
                    id: index + 1
                }
            });
        if (newData.length === 0) {
            newData.push({ id: 1 })

        }
        setBomData({
            ...bomData,
            bomBodyCardMaterials: newData,
        });
        NotificationManager.success(t("Xóa hàng thành công!"))
    }


    const getAllMaterial = () => {
        const data = JSON.stringify({
            pageNumber: 0,
            pageSize: 9999,
            common: "",
            filter: {
            },
        });

        httpRequests({ method: "post", url: MDM_API_URL + "/api/products", data: data }).then((response: any) => {
            if (response.status === 200) {
                setMaterialList(response.data.data)
            }
        });
    }

    const handleCreateBOM = () => {
        setIsLoading(true)
        httpRequests.post("/api/boms", bomData)
            .then((response: any) => {
                if (response.data.message === 'Thành công') {
                    if (techFormId !== null) {
                        httpRequests.post(`/api/techforms/${techFormId}/boms`, response.data.data)
                            .then((response: any) => {
                            })
                    }
                }
            }).finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })
    }

    const onChangeMaterialCode = (e: any) => {
        if (materialDetail?.materialCode.trim() !== "") {
            const data = JSON.stringify({
                pageNumber: 0,
                pageSize: 100,
                common: "",
                filter: {
                    productCode: materialDetail?.materialCode,
                },
            });

            httpRequests({ method: "post", url: MDM_API_URL + "/api/products", data: data }).then((response: any) => {
                if (response.status === 200) {
                    const data = response.data.data.find((data: any) => data.productCode === materialDetail?.materialCode);
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
            httpRequests.get(PLANNING_API_URL + "/api/boms/" + id).then((response: any) => {
                if (response.status === 200) {
                    setBomData(response.data.data);
                }
            });
        } else {
            setBomData({
                productName: requestInfo?.cardName,
                quantity: requestInfo?.quantityCompensation,
                version: '1.0',
                bomBodyCardMaterials: [{ id: 1 }]
            })
        }
    }, [id, requestInfo, techFormId]);

    React.useEffect(() => {
        getAllMaterial();
    }, [])

    const test = () => {
        console.log('bomData 22', bomData)
    }
    console.log('bomData', bomData)


    console.log('bomData bomBodyCardMaterials', bomData.bomBodyCardMaterials);


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
                    onSubmit={() => { }}
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
                                Thêm mới thông tin BOM sản phẩm
                            </h5>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                <td style={{ marginLeft: 30 }}>
                                    <p>Tên thẻ</p>
                                    <TextBox value={bomData.productName} style={{ backgroud: 'black' }} disabled={requestInfo !== null} placeholder='SP001' width={300}></TextBox>
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
                                    }} placeholder='Nhập' width={300}></TextBox>
                                    <p style={{ marginTop: 30 }}>Tên loại thẻ mẫu</p>
                                    <TextBox value={bomData.notice} placeholder='Visa'></TextBox>
                                    <p style={{ marginTop: 30 }}>Chọn thẻ để sao chép BOM</p>
                                    <SelectBox placeholder='Chọn'></SelectBox>
                                </td>
                                <td style={{ marginRight: 30 }}>
                                    <p>Số lượng đã tính bù hao</p>
                                    <TextBox value={bomData.quantity} disabled={requestInfo !== null} placeholder='Nhập' width={300}></TextBox>
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
                            }}>
                            <h4
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginTop: 30,
                                    fontSize: 20,
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
                            focusedRowEnabled={true}
                            ref={gridRef}
                        >
                            <PopupImportFile
                                visible={isVisibleImportFile}
                                onCancel={() => setIsVisibleImportFile(false)}
                                title={"Import file"}
                                onSubmit={() => { }}
                                width={900}
                            />
                            <PopupConfirmDelete
                                isVisible={isConfirmDelete}
                                onCancel={handleHideModalDel}
                                onSubmit={() => { removeRowMaterial(idRemoveChoosed); handleHideModalDel() }}
                                modalTitle={
                                    <div>
                                        <h3
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#ff794e",
                                                fontWeight: 500,
                                            }}>
                                            Xóa dữ liệu
                                        </h3>
                                    </div>
                                }
                                modalContent={
                                    <div>
                                        <h4 style={{ fontWeight: 400 }}>
                                            Bạn có chắc chắn muốn xóa <b>Dữ liệu hiện tại</b>?
                                        </h4>
                                        <div
                                            style={{
                                                backgroundColor: "#ffe0c2",
                                                borderLeft: "4px solid #ff794e",
                                                height: 100,
                                                borderRadius: 5,
                                            }}>
                                            <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                                <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                                Lưu ý:
                                            </h3>
                                            <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                                Nếu bạn xóa <b>Dữ liệu hiện tại </b> thì các thông tin liên quan đều bị mất
                                            </p>
                                        </div>
                                    </div>
                                }
                                width={600}
                            />
                            <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                <OperationDescriptions
                                    startsWith={t("common.startsWith")}
                                    equal={t("common.equal")}
                                    endsWith={t("common.endsWith")}
                                    contains={t("common.contains")}
                                    notContains={t("common.notContains")}
                                    notEqual={t("common.notEqual")}
                                    lessThan={t("common.lessThan")}
                                    lessThanOrEqual={t("common.lessThanOrEqual")}
                                    greaterThan={t("common.greaterThan")}
                                    greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                    between={t("common.between")}
                                />
                            </FilterRow>

                            <Column fixed={true} width={120} dataField='productCode' caption='Mã vật tư' cellRender={(cellIfo) => (
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
                            {/* <Column fixed={true} width={120} dataField='materialCode' caption='Mã vật tư' /> */}
                            <Column dataField='materialName' caption='Mô tả vật tư'></Column>

                            {/* <Column dataField='materialTechName' caption='Tên kỹ thuật' alignment='left'></Column> */}

                            <Column dataField='version' caption='Version' alignment={"left"}></Column>
                            <Column dataField='classify' caption='Phân loại' alignment={"left"}></Column>
                            <Column dataField='quota' caption='Định mức' />
                            <Column dataField='quantity' caption='Số lượng' alignment="left" />
                            <Column dataField="UoMCode" caption="UoM code" />
                            <Column dataField='unit' caption='Đơn vị tính' />
                            <Column caption={"Mã kho"} dataField='' cellRender={(cellIfo) => (
                                <SelectBox
                                    dataSource={materialList}
                                    searchExpr={"productCode"}
                                    valueExpr={"productCode"}
                                    displayExpr={"productCode"}
                                    onSelectionChanged={(e) => {
                                        onAddMaterialReplace(cellIfo.data.id, e.selectedItem)
                                    }}
                                    placeholder='Nhập' searchEnabled={true} key={"productCode"} />
                            )} />
                            {/* <Column caption={"Mã vật tư thay thế"} dataField='replaceMaterialCode' /> */}
                            {/* <Column caption={"Mô tả vật tư thay thế"} dataField='replaceMaterialName' /> */}
                            <Column caption={"Số lượng tồn kho"} dataField='inventoryQuantity' />
                            <Column caption="Số lượng sẵn sàng" dataField="availableQuantity" />
                            <Column caption="Loại" dataField="type" cellRender={() => <SelectBox placeholder="Chọn" />} />
                            <Column caption="Mặt trước" dataField="front" cellRender={() => <SelectBox placeholder="Chọn" />} />
                            <Column caption="Mặt sau" dataField="back" cellRender={() => <SelectBox placeholder="Chọn" />} />
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                fixed={true}
                                cellRender={(cellInfo) => {
                                    return (
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
                                            />
                                        </div>
                                    )
                                }}></Column>
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
                                style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                            >Hủy bỏ</Button>
                            <Button
                                onClick={handleCreateBOM}
                                style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }} >Thêm mới</Button>
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
