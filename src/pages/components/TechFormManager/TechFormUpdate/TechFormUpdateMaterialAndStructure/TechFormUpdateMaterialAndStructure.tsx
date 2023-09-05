import React from "react";
import { Button, DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormUpdateProcedure from "../TechFormUpdateProcedure/TechFormUpdateProcedure";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";

type TechFormUpdateMaterialAndStructureProps = {
    techFormData: any;
    setTechFormData: any;
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
        structure: "",
    },
    {
        No: 2,
        materialCode: "1C01CBANK000021",
        materialName: "Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET",
        quantity: "19.430",
        note: "",
        structure: "",
    },
    {
        No: 3,
        materialCode: "1C01CBANK000021",
        materialName: "Chip vàng 6 chân S3D350AACS- 6GK6DEA(U - MA / VI / VC) load Visa Master VCCS - REVISED APPLET",
        quantity: "19.430",
        note: "",
        structure: "",
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

export const TechFormUpdateMaterialAndStructure: React.FC<TechFormUpdateMaterialAndStructureProps> = observer(
    ({ isOpen = false, setClose, techFormData, setTechFormData }) => {
        const [isVisibleTechFormUpdateProcedure, setIsVisibleTechFormUpdateProcedure] = React.useState<boolean>(false);

        const getMaterialFormTechForm = () => {
            const data: any[] = [];
            techFormData?.bomBodyCard?.bomBodyCardMaterials.forEach((material: any, index: any) => {
                data.push({
                    ...material,
                    no: index + 1,
                });
            });
            return data;
        };

        const getInfoPlate = () => {
            const data: any[] = [];
            const maxLength = Math.max(techFormData.prePressPcToPlate.front.length, techFormData.prePressPcToPlate.back.length);

            let front;
            let back;

            for (let i = 0; i < maxLength; ++i) {
                if (techFormData.prePressPcToPlate.front.length > i) {
                    front = techFormData.prePressPcToPlate.front[i];
                } else {
                    front = {};
                }

                if (techFormData.prePressPcToPlate.back.length > i) {
                    back = techFormData.prePressPcToPlate.back[i];
                } else {
                    back = {};
                }
                data.push({
                    no: i,
                    front: front,
                    back: back,
                });

                console.log(data)
            }

            return data;
        };

        const onRemoveRowPlate = (rowIndex: any) => {
            const newPlateInfosFront = techFormData.prePressPcToPlate.front
                .filter((step: any, index: any) => index !== rowIndex);
            const newPlateInfosBack = techFormData.prePressPcToPlate.back
                .filter((step: any, index: any) => index !== rowIndex);
            if (newPlateInfosFront.length === 0 && newPlateInfosBack.length === 0) {
                newPlateInfosFront.push({})
                newPlateInfosBack.push({})
            }
            setTechFormData({
                ...techFormData,
                prePressPcToPlate: {
                    ...techFormData.prePressPcToPlate,
                    front: newPlateInfosFront,
                    back: newPlateInfosBack
                },
            });
        }

        const onAddNewRowPlate = (currentIndex: any) => {
            console.log(currentIndex);
            const newPlateInfosFront = [
                ...techFormData.prePressPcToPlate.front.slice(0, currentIndex + 1),
                {},
                ...techFormData.prePressPcToPlate.front.slice(currentIndex + 1),
            ];
            const newPlateInfosBack = [
                ...techFormData.prePressPcToPlate.back.slice(0, currentIndex + 1),
                {},
                ...techFormData.prePressPcToPlate.back.slice(currentIndex + 1),
            ];
            setTechFormData({
                ...techFormData,
                prePressPcToPlate: {
                    ...techFormData.prePressPcToPlate,
                    front: newPlateInfosFront,
                    back: newPlateInfosBack
                },
            });
        }
        const onUpdatePlateInfo = (isFront: any, index: any, key: any, value: any) => {
            let side;
            let newData;
            if (isFront) {
                side = 'front';
                newData = techFormData.prePressPcToPlate.front;
            } else {
                side = 'back';
                newData = techFormData.prePressPcToPlate.back;
            }
            console.log("before", newData)
            newData[index] = {
                ...newData[index],
                [key]: value
            }

            console.log("after", newData)

            setTechFormData({
                ...techFormData,
                prePressPcToPlate: {
                    ...techFormData.prePressPcToPlate,
                    [side]: newData,
                },
            });

        }

        console.log(getMaterialFormTechForm());

        return (
            <>
                {isVisibleTechFormUpdateProcedure ? (
                    <TechFormUpdateProcedure
                        techFormData={techFormData}
                        setTechFormData={setTechFormData}
                        isOpen={isVisibleTechFormUpdateProcedure}
                        setClose={() => setIsVisibleTechFormUpdateProcedure(false)}
                    />
                ) : (
                    <div>
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
                                    Cập nhật phiếu công nghệ
                                </h5>
                            </div>
                            <div className='subtile'>
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>
                                    Vật liệu và cấu trúc/Material and Structure : Thời gian từ/from 09/08/2022 đến/to 19/08/2022{" "}
                                </h6>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <DataGrid
                                    key={"no"}
                                    dataSource={getMaterialFormTechForm()}
                                    keyExpr='no'
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column dataField='no' caption='No.' allowEditing={false} alignment='left' />
                                    <Column dataField='materialCode' caption='Mã vật tư/Material Code' />
                                    <Column dataField='materialName' caption='Tên vật tư/Material Name' width={500} />
                                    <Column dataField='quantity' caption="Số lượng/Q'ty" />
                                    <Column dataField='note' caption='Ghi chú/Remarks' />
                                    <Column dataField='structure' caption='Cấu trúc/Structure' />
                                </DataGrid>
                                <div className='container'>
                                    <div className='checkbox'>
                                        <label htmlFor='raPhim' style={{ fontWeight: 500 }}>
                                            Ra phim/Pre-press
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setTechFormData({
                                                    ...techFormData,
                                                    prePressPcToPlate: {
                                                        ...techFormData.prePressPcToPlate,
                                                        isPrePress: !techFormData.prePressPcToPlate.isPrePress,
                                                    },
                                                });
                                            }}
                                            type='checkbox'
                                            id='raPhim'
                                            checked={techFormData.prePressPcToPlate.isPrePress}
                                        />
                                    </div>
                                    <div className='checkbox'>
                                        <label htmlFor='raBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                                            Ra bản/PC to plate
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setTechFormData({
                                                    ...techFormData,
                                                    prePressPcToPlate: {
                                                        ...techFormData.prePressPcToPlate,
                                                        isPcToPlate: !techFormData.prePressPcToPlate.isPcToPlate,
                                                    },
                                                });
                                            }}
                                            type='checkbox'
                                            id='raBan'
                                            checked={techFormData.prePressPcToPlate.isPcToPlate}
                                        />
                                    </div>
                                    <div className='input'>
                                        <label htmlFor='tongSoBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                                            Tổng số bản: {techFormData.prePressPcToPlate.totalPlate}
                                        </label>
                                    </div>
                                </div>
                                <div style={{ paddingTop: 30 }}>
                                    <DataGrid
                                        key={"no"}
                                        keyExpr={"no"}
                                        dataSource={getInfoPlate()}
                                        showBorders={true}
                                        showRowLines={true}
                                        showColumnLines={true}>
                                        <Column dataField='Id' caption='Id' visible={false} />
                                        <Column alignment='center' caption='Mặt trước/Front' fixed>
                                            <Column
                                                dataField='front.item'
                                                caption='Nội dung/Item'
                                                cellRender={(cellIfo) => {
                                                    return (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdatePlateInfo(true, cellIfo.rowIndex, "item", e)
                                                        }} placeholder='Nhập' value={cellIfo.value} key={"front.item"} />)
                                                }}
                                            />
                                            <Column
                                                dataField='front.quantity'
                                                caption="Số lượng/Q'ty"
                                                alignment='left'
                                                cellRender={(cellIfo) => (
                                                    <TextBox onValueChange={(e) => {
                                                        onUpdatePlateInfo(true, cellIfo.rowIndex, "quantity", e)
                                                    }} placeholder='Nhập' value={cellIfo.value} key={"front.quantity"} />
                                                )}
                                            />
                                            <Column
                                                dataField='front.plateSize'
                                                caption='Kích thước bản/Plate size'
                                                cellRender={(cellIfo) => (
                                                    <TextBox onValueChange={(e) => {
                                                        onUpdatePlateInfo(true, cellIfo.rowIndex, "plateSize", e)
                                                    }} placeholder='Nhập' value={cellIfo.value} key={"front.plateSize"} />
                                                )}
                                            />
                                        </Column>
                                        <Column alignment='center' caption='Mặt sau/Back' fixed>
                                            <Column
                                                dataField='back.item'
                                                caption='Nội dung/Item'
                                                cellRender={(cellIfo) => (
                                                    <TextBox onValueChange={(e) => {
                                                        onUpdatePlateInfo(false, cellIfo.rowIndex, "item", e)
                                                    }} placeholder='Nhập' value={cellIfo.value} key={"back.item"} />
                                                )}
                                            />
                                            <Column
                                                dataField='back.quantity'
                                                caption="Số lượng/Q'ty"
                                                alignment='left'
                                                cellRender={(cellIfo) => (
                                                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                        onUpdatePlateInfo(false, cellIfo.rowIndex, "quantity", e)
                                                    }} value={cellIfo.value} key={"back.quantity"} />
                                                )}
                                            />
                                            <Column
                                                dataField='back.plateSize'
                                                caption='Kích thước bản/Plate size'
                                                cellRender={(cellIfo) => (
                                                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                        onUpdatePlateInfo(false, cellIfo.rowIndex, "plateSize", e)
                                                    }} value={cellIfo.value} key={"back.plateSiz"} />
                                                )}
                                            />
                                        </Column>
                                        <Column
                                            caption=''
                                            dataField=''
                                            alignment='center'
                                            width={80}
                                            cellRender={(cellInfo) => (
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: 'space-between' }}>
                                                    <SvgIcon
                                                        onClick={() => {
                                                            onAddNewRowPlate(cellInfo.rowIndex)
                                                        }}
                                                        tooltipTitle='Thêm mới'
                                                        sizeIcon={17}
                                                        textSize={17}
                                                        icon='assets/icons/Add.svg'
                                                        textColor='#FF7A00'
                                                        style={{ marginRight: 17 }}
                                                    />
                                                    <SvgIcon
                                                        onClick={() => {
                                                            // onRemoveRowProcessing(cellInfo.data.no);
                                                            // onRemoveRowHostamping(cellInfo.rowIndex)
                                                            onRemoveRowPlate(cellInfo.rowIndex)
                                                        }}
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

                                    <div
                                        className='toolbar'
                                        style={{
                                            marginTop: 10,
                                            display: "flex",
                                            justifyContent: 'flex-end',
                                            // background: "#ffffff",
                                            padding: "8px",
                                            borderRadius: "4px",
                                        }}>
                                        <Button
                                            text='Trở lại'
                                            onClick={setClose}
                                            style={{ marginRight: "20px", color: "#fff", backgroundColor: "#E5E5E5", width: 100 }}
                                        />
                                        <Button
                                            text='Tiếp theo'
                                            onClick={() => {
                                                setIsVisibleTechFormUpdateProcedure(true);
                                            }}
                                            style={{ marginRight: "20px", color: "#fff", backgroundColor: "#FF7A00" }}
                                        />
                                        <Button
                                            text='Ký lập'
                                            onClick={() => { }}
                                            style={{ marginRight: "20px", color: "#fff", backgroundColor: "gray", width: 100 }}
                                        />
                                        <Button
                                            text='Gửi duyệt'
                                            onClick={() => { }}
                                            style={{ marginRight: "20px", color: "#fff", backgroundColor: "gray" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    },
);

export default TechFormUpdateMaterialAndStructure;