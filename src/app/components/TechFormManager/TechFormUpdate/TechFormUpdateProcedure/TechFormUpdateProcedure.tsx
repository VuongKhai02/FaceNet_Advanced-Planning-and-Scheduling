import React, { useState } from "react";
import { Button, DataGrid, TextBox } from "devextreme-react";
import { Column, Button as ButtonIcon } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechFormUpdateHostamping from "../TechFormUpdateHostamping/TechFormUpdateHostamping";
import SvgIcon from "../../../../icons/SvgIcon/SvgIcon";

type TechFormDetailProcedureProps = {
    techFormData: any;
    setTechFormData: any;
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

export const TechFormUpdateProcedure: React.FC<TechFormDetailProcedureProps> = observer(
    ({ isOpen = false, setClose, techFormData, setTechFormData }) => {
        const [isVisibleTechFormUpdateHostamping, setIsVisibleTechFormUpdateHostamping] = React.useState<boolean>(false);

        const onUpdateLaminationInfo = (index_, key, value) => {
            let newLaminationInfos = techFormData.lamination.steps.map((step, index) => {
                if (index !== index_) {
                    return step;
                } else {
                    return {
                        ...step,
                        [key]: value
                    }
                }
            })

            setTechFormData({
                ...techFormData,
                lamination: {
                    ...techFormData.lamination,
                    steps: newLaminationInfos
                }
            })
        }
        const onUpdateProcessingInfo = (index_, key, value) => {
            let newProcessingInfo = techFormData.processing.processingInfos.map((step, index) => {
                if (index !== index_) {
                    return step;
                } else {
                    return {
                        ...step,
                        [key]: value
                    }
                }
            })

            setTechFormData({
                ...techFormData,
                processing: {
                    ...techFormData.processing,
                    processingInfos: newProcessingInfo
                }
            })
        }

        const onUpdateCuttingInfo = (index_, key, value) => {
            let newCuttingInfo = techFormData.cutting.cuttingInfos.map((step, index) => {
                if (index !== index_) {
                    return step;
                } else {
                    return {
                        ...step,
                        [key]: value
                    }
                }
            })

            setTechFormData({
                ...techFormData,
                cutting: {
                    ...techFormData.cutting,
                    cuttingInfos: newCuttingInfo
                }
            })
        }

        const onUpdateHostamping = (index_, key, value) => {
            let newHostampingInfos = techFormData.hostamping.hostampingInfos.map((step, index) => {
                if (index !== index_) {
                    return step;
                } else {
                    return {
                        ...step,
                        [key]: value
                    }
                }
            })

            setTechFormData({
                ...techFormData,
                hostamping: {
                    ...techFormData.hostamping,
                    hostampingInfos: newHostampingInfos
                }
            })
        }

        const onChoosePrintingTechnology = (option) => {
            setTechFormData({
                ...techFormData,
                printingTech: {
                    ...techFormData.printingTech,
                    printingTechnology: option,
                },
            });
        };

        const onAddRowProcessing = (no) => {
            console.log(no);
            const newProcessingInfo = [
                ...techFormData.processing.processingInfos.slice(0, no),
                { no: no + 1 },
                ...techFormData.processing.processingInfos.slice(no).map((element, index) => {
                    return {
                        ...element,
                        no: element.no + 1,
                    };
                }),
            ];

            setTechFormData({
                ...techFormData,
                processing: {
                    ...techFormData.processing,
                    processingInfos: newProcessingInfo,
                },
            });
        };

        const onRemoveRowProcessing = (no) => {
            console.log(no);
            const newProcessingInfo = techFormData.processing.processingInfos
                .filter((process) => process.no !== no)
                .map((process, index) => {
                    return {
                        ...process,
                        no: index + 1,
                    };
                });

            if (newProcessingInfo.length === 0) {
                newProcessingInfo.push({ no: 1 });
            }

            setTechFormData({
                ...techFormData,
                processing: {
                    ...techFormData.processing,
                    processingInfos: newProcessingInfo,
                },
            });
        };

        const onAddNewRowLamination = (index) => {
            console.log(index);
            const newLaminationSteps = [
                ...techFormData.lamination.steps.slice(0, index + 1),
                { step: index + 2 },
                ...techFormData.lamination.steps.slice(index + 1),
            ].map((step, index) => {
                return {
                    ...step,
                    step: index + 1,
                };
            });
            setTechFormData({
                ...techFormData,
                lamination: {
                    ...techFormData.lamination,
                    steps: newLaminationSteps,
                },
            });
        };

        const onRemoveRowLamination = (rowIndex) => {
            const newLaminationSteps = techFormData.lamination.steps
                .filter((step, index) => index !== rowIndex)
                .map((step, index) => {
                    return {
                        ...step,
                        step: index + 1,
                    };
                });

            if (newLaminationSteps.length === 0) {
                newLaminationSteps.push({ step: 1 });
            }

            setTechFormData({
                ...techFormData,
                lamination: {
                    ...techFormData.lamination,
                    steps: newLaminationSteps,
                },
            });
        };

        const onAddRowCutting = (currentIndex) => {
            console.log(currentIndex);
            const newCuttingInfo = [
                ...techFormData.cutting.cuttingInfos.slice(0, currentIndex + 1),
                { no: currentIndex + 2 },
                ...techFormData.cutting.cuttingInfos.slice(currentIndex + 1),
            ].map((step, index) => {
                return {
                    ...step,
                    no: index + 1,
                };
            });
            setTechFormData({
                ...techFormData,
                cutting: {
                    ...techFormData.cutting,
                    cuttingInfos: newCuttingInfo,
                },
            });
        }

        const onRemoveRowCutting = (rowIndex) => {
            const newCuttingInfo = techFormData.cutting.cuttingInfos
                .filter((step, index) => index !== rowIndex)
                .map((step, index) => {
                    return {
                        ...step,
                        no: index + 1,
                    };
                });

            if (newCuttingInfo.length === 0) {
                newCuttingInfo.push({ no: 1 });
            }

            setTechFormData({
                ...techFormData,
                cutting: {
                    ...techFormData.lamination,
                    cuttingInfos: newCuttingInfo,
                },
            });
        }

        const onAddRowHostamping = (currentIndex) => {
            console.log(currentIndex);
            const newHostampingInfos = [
                ...techFormData.hostamping.hostampingInfos.slice(0, currentIndex + 1),
                { step: currentIndex + 2 },
                ...techFormData.hostamping.hostampingInfos.slice(currentIndex + 1),
            ].map((step, index) => {
                return {
                    ...step,
                    step: index + 1,
                };
            });
            setTechFormData({
                ...techFormData,
                hostamping: {
                    ...techFormData.hostamping,
                    hostampingInfos: newHostampingInfos,
                }
            });
        }

        const onRemoveRowHostamping = (rowIndex) => {
            const newHostampingInfos = techFormData.hostamping.hostampingInfos
                .filter((step, index) => index !== rowIndex)
                .map((step, index) => {
                    return {
                        ...step,
                        step: index + 1,
                    };
                });

            if (newHostampingInfos.length === 0) {
                newHostampingInfos.push({ step: 1 });
            }

            setTechFormData({
                ...techFormData,
                hostamping: {
                    ...techFormData.hostamping,
                    hostampingInfos: newHostampingInfos,
                }
            });
        }
        return (
            <>
                {isVisibleTechFormUpdateHostamping ? (
                    <TechFormUpdateHostamping
                        techFormData={techFormData}
                        setTechFormData={setTechFormData}
                        isOpen={isVisibleTechFormUpdateHostamping}
                        setClose={() => setIsVisibleTechFormUpdateHostamping(false)}
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
                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>In/Printing : </h6>
                                <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                    Thời gian từ 09/08/2022 đến 19/08/2022
                                </h6>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <DataGrid
                                    key={"step"}
                                    keyExpr={"step"}
                                    dataSource={[...techFormData.printingTech.front, ...techFormData.printingTech.back]}
                                    showBorders={true}
                                    showRowLines={true}
                                    showColumnLines={true}>
                                    <Column alignment='left' caption='Công nghệ In/Printing Technology' fixed>
                                        <Column alignment='left' caption='Nội dung In/Printing Contents' fixed>
                                            <Column
                                                dataField='step'
                                                alignment='center'
                                                caption='Bước/Step'
                                                width={100}
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' value={cellInfo.value} key={"step"} />
                                                )}>
                                                {/* <Column>
                                    <Column dataField="" caption="Front" width={50} />
                                    <Column dataField="" caption="Back" width={50} />
                                </Column> */}
                                                {/* <Column dataField="id" width={50} alignment="left" caption="" /> */}
                                            </Column>
                                            <Column
                                                dataField='item'
                                                caption='Nội dung/Item'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' value={cellInfo.value} key={"item"} />
                                                )}
                                            />
                                            <Column
                                                dataField='method'
                                                caption='Phương pháp/Method'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' value={cellInfo.value} key={"method"} />
                                                )}
                                            />
                                        </Column>
                                    </Column>
                                    <Column
                                        alignment='left'
                                        headerCellRender={() => {
                                            return (
                                                <div className='checkbox'>
                                                    <div>
                                                        <input
                                                            onChange={() => onChoosePrintingTechnology(0)}
                                                            type='checkbox'
                                                            id='In'
                                                            checked={techFormData.printingTech.printingTechnology === 0}
                                                        />
                                                        <label htmlFor='In' className='checkBoxStyle'>
                                                            In trở Nó
                                                        </label>
                                                    </div>
                                                    <div style={{ marginLeft: 120 }}>
                                                        <input
                                                            onChange={() => onChoosePrintingTechnology(1)}
                                                            type='checkbox'
                                                            id='In'
                                                            checked={techFormData.printingTech.printingTechnology === 1}
                                                        />
                                                        <label htmlFor='In' className='checkBoxStyle'>
                                                            In trở Khác
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }}>
                                        <Column alignment='center' caption='File' fixed>
                                            <Column
                                                dataField='colour'
                                                caption='Màu/Colour'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' value={cellInfo.value} key={"colour"} />
                                                )}
                                            />
                                            <Column
                                                dataField='note'
                                                caption='Ghi chú/Note'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' value={cellInfo.value} key={"note"} />
                                                )}
                                            />
                                        </Column>
                                    </Column>
                                </DataGrid>
                            </div>
                            <div style={{ marginTop: 30 }}>

                                <div style={{ marginTop: 30 }}>
                                    <div>
                                        <div className='subtile' style={{ marginBottom: 15 }}>
                                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Ép/Lamination : </h6>
                                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                                Thời gian từ 09/08/2022 đến 19/08/2022
                                            </h6>
                                        </div>

                                        <DataGrid
                                            key={"step"}
                                            dataSource={techFormData.lamination.steps}
                                            keyExpr='step'
                                            showBorders={true}
                                            showRowLines={true}
                                            showColumnLines={true}>
                                            <Column dataField='step' caption='Bước' alignment='left' width={100} />
                                            <Column
                                                dataField='contents'
                                                caption='Nội dung ép/Contens'
                                                cellRender={(cellInfo) => (
                                                    <TextBox onValueChange={(e) => {
                                                        onUpdateLaminationInfo(cellInfo.rowIndex, 'contents', e)
                                                    }} placeholder='Nhập' value={cellInfo.value} key={"contents"} />
                                                )}
                                            />
                                            <Column
                                                dataField='classify'
                                                caption='Phân loại/Classify'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập'
                                                        onValueChange={(e) => {
                                                            onUpdateLaminationInfo(cellInfo.rowIndex, 'classify', e)
                                                        }} value={cellInfo.value} key={"classify"} />
                                                )}
                                            />
                                            <Column
                                                dataField='parameter'
                                                caption='Thông số máy/Lamination Parameter'
                                                width={270}
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập'
                                                        onValueChange={(e) => {
                                                            onUpdateLaminationInfo(cellInfo.rowIndex, 'parameter', e)
                                                        }} value={cellInfo.value} key={"parameter"} />
                                                )}
                                            />
                                            <Column
                                                dataField='other'
                                                caption='Khác/Other'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập'
                                                        onValueChange={(e) => {
                                                            onUpdateLaminationInfo(cellInfo.rowIndex, 'other', e)
                                                        }} value={cellInfo.value} key={"other"} />
                                                )}></Column>
                                            <Column
                                                caption=''
                                                dataField=''
                                                alignment='center'
                                                cellRender={(cellInfo) => (
                                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                        <SvgIcon
                                                            onClick={() => {
                                                                onAddNewRowLamination(cellInfo.rowIndex);
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
                                                                onRemoveRowLamination(cellInfo.rowIndex);
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
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                        <div className='subtile' style={{ marginBottom: 15 }}>
                                            <h6 style={{ fontSize: 15, fontWeight: 500 }}>Gia công/Processing : </h6>
                                            <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                                Thời gian từ 09/08/2022 đến 19/08/2022
                                            </h6>
                                        </div>
                                        <DataGrid
                                            key={"no"}
                                            dataSource={techFormData.processing.processingInfos}
                                            keyExpr='no'
                                            showBorders={true}
                                            showRowLines={true}
                                            showColumnLines={true}>
                                            <Column dataField='no' caption='No.' alignment='left' width={100} />
                                            <Column
                                                dataField='ink'
                                                caption='Mực/Lnk'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                        onUpdateProcessingInfo(cellInfo.rowIndex, 'ink', e)
                                                    }} value={cellInfo.value} key={"lnk"} />
                                                )}></Column>
                                            <Column
                                                dataField='nilon'
                                                caption='Nilon'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                        onUpdateProcessingInfo(cellInfo.rowIndex, 'nilon', e)
                                                    }} value={cellInfo.value} key={"nilon"} />
                                                )}
                                            />
                                            <Column
                                                dataField='cut'
                                                caption='Cắt'
                                                cellRender={(cellInfo) => <TextBox placeholder='Nhập'
                                                    onValueChange={(e) => {
                                                        onUpdateProcessingInfo(cellInfo.rowIndex, 'cut', e)
                                                    }} value={cellInfo.value} key={"cut"} />}
                                            />
                                            <Column
                                                dataField='hold'
                                                caption='Bế'
                                                cellRender={(cellInfo) => (
                                                    <TextBox value={cellInfo.value} onValueChange={(e) => {
                                                        onUpdateProcessingInfo(cellInfo.rowIndex, 'hold', e)
                                                    }} placeholder='Nhập' key={"hold"} />
                                                )}></Column>
                                            <Column
                                                dataField='pull'
                                                caption='Đùn'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                        onUpdateProcessingInfo(cellInfo.rowIndex, 'pull', e)
                                                    }} value={cellInfo.value} key={"pull"} />
                                                )}
                                            />
                                            <Column
                                                dataField='other'
                                                caption='Khác/Other'
                                                cellRender={(cellInfo) => (
                                                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                        onUpdateProcessingInfo(cellInfo.rowIndex, 'other', e)
                                                    }} value={cellInfo.value} key={"other"} />
                                                )}
                                            />
                                            <Column
                                                caption=''
                                                dataField=''
                                                alignment='center'
                                                cellRender={(cellInfo) => (
                                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                        <SvgIcon
                                                            onClick={() => {
                                                                onAddRowProcessing(cellInfo.data.no);
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
                                                                onRemoveRowProcessing(cellInfo.data.no);
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
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                        <div style={{ marginTop: 30 }}>
                                            <div className='subtile' style={{ marginBottom: 15 }}>
                                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>Cut/Cutting : </h6>
                                                <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                                    Thời gian từ 09/08/2022 đến 19/08/2022
                                                </h6>
                                            </div>
                                            <DataGrid
                                                key={"no"}
                                                dataSource={techFormData.cutting.cuttingInfos}
                                                keyExpr='no'
                                                showBorders={true}
                                                showRowLines={true}
                                                showColumnLines={true}>
                                                <Column dataField='no' caption='No.' alignment='left' width={100} />
                                                <Column
                                                    dataField='content'
                                                    caption='Nội dung/Content'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                            onUpdateCuttingInfo(cellInfo.rowIndex, 'content', e)
                                                        }} value={cellInfo.value} key={"content"} />
                                                    )}
                                                />
                                                <Column
                                                    dataField='machine'
                                                    caption='Máy/Machine'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox placeholder='Nhập' onValueChange={(e) => {
                                                            onUpdateCuttingInfo(cellInfo.rowIndex, 'machine', e)
                                                        }} value={cellInfo.value} key={"machine"} />
                                                    )}
                                                />
                                                <Column
                                                    caption=''
                                                    dataField=''
                                                    alignment='center'
                                                    width={150}
                                                    cellRender={(cellInfo) => (
                                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: 'space-between' }}>
                                                            <SvgIcon
                                                                onClick={() => {
                                                                    // onAddRowProcessing(cellInfo.data.no);
                                                                    onAddRowCutting(cellInfo.rowIndex)
                                                                    // console.log(cellInfo);
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
                                                                    onRemoveRowCutting(cellInfo.rowIndex)
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
                                        </div>
                                        <div>
                                            <div className='subtile' style={{ marginBottom: 15 }}>
                                                <h6 style={{ fontSize: 15, fontWeight: 500 }}>Hostamping: </h6>
                                                <h6 style={{ fontSize: 14, fontStyle: "italic", fontWeight: 400, marginLeft: 10 }}>
                                                    Thời gian từ 09/08/2022 đến 19/08/2022
                                                </h6>
                                            </div>
                                            <DataGrid
                                                key={"step"}
                                                dataSource={techFormData.hostamping.hostampingInfos}
                                                keyExpr='step'
                                                showBorders={true}
                                                showRowLines={true}
                                                showColumnLines={true}>
                                                <Column dataField='step' caption='Bước' alignment='center' width={100} />
                                                <Column
                                                    dataField='process'
                                                    caption='Công đoạn/Process'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'process', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"process"} />
                                                    )}
                                                />
                                                <Column
                                                    dataField='content'
                                                    alignment='center'
                                                    caption='Nội dung hots/Content'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'content', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"content"} />
                                                    )}
                                                />
                                                <Column
                                                    dataField='rmCode'
                                                    alignment='center'
                                                    caption='Mã vật liệu/RMcode'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'rmCode', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"rmCode"} />
                                                    )}
                                                />
                                                <Column
                                                    dataField='type'
                                                    alignment='center'
                                                    caption='Loại phôi hots/Type'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'type', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"type"} />
                                                    )}
                                                />
                                                <Column
                                                    dataField='position'
                                                    alignment='center'
                                                    caption='Vị trí'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'position', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"position"} />
                                                    )}></Column>
                                                <Column
                                                    dataField='machine'
                                                    alignment='center'
                                                    caption='Máy/Machine'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'machine', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"machine"} />
                                                    )}
                                                />
                                                <Column
                                                    dataField='other'
                                                    alignment='center'
                                                    caption='Khác/Other'
                                                    cellRender={(cellInfo) => (
                                                        <TextBox onValueChange={(e) => {
                                                            onUpdateHostamping(cellInfo.rowIndex, 'other', e)
                                                        }} placeholder='Nhập' value={cellInfo.value} key={"other"} />
                                                    )}
                                                />
                                                <Column
                                                    caption=''
                                                    dataField=''
                                                    alignment='center'
                                                    width={80}
                                                    cellRender={(cellInfo) => (
                                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: 'space-between' }}>
                                                            <SvgIcon
                                                                onClick={() => {
                                                                    // onAddRowProcessing(cellInfo.data.no);
                                                                    onAddRowHostamping(cellInfo.rowIndex)
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
                                                                    onRemoveRowHostamping(cellInfo.rowIndex)
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
                                        </div>
                                        <div
                                            className='toolbar'
                                            style={{
                                                paddingTop: 10,
                                                // background: "#ffffff",
                                                padding: "8px",
                                                borderRadius: "4px",
                                                display: "flex",
                                                justifyContent: 'flex-end'
                                            }}
                                        // style={{ marginRight: "20px", color: "#fff", backgroundColor: "#FF7A00" }}
                                        >
                                            <Button
                                                text='Trở lại'
                                                onClick={setClose}
                                                style={{ marginRight: "20px", color: "#fff", backgroundColor: "#E5E5E5", width: 100 }}
                                            />
                                            <Button
                                                text='Tiếp theo'
                                                onClick={() => {
                                                    setIsVisibleTechFormUpdateHostamping(true);
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
                    </div>
                )}
            </>
        );
    },
);

export default TechFormUpdateProcedure;