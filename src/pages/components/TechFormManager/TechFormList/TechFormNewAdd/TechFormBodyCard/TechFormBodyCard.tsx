import React, { createContext } from "react";
import { SelectBox } from "devextreme-react";
import TechProcedure from "../../../TechFormList/TechFormNewAdd/TechProcedure/TechProcedure";
import { observer } from "mobx-react";
import { Button, Input, Table, Upload } from "antd";
import SvgIcon from "../../../../../../shared/components/SvgIcon/SvgIcon";
import TextArea from "antd/lib/input/TextArea";

import { TechFormGeneralInfo } from "../../../TechFormUpdate/TechFormUpdate";
import { PLANNING_API_URL } from "../../../../../../utils/config";
import httpRequests from "../../../../../../utils/httpRequests";
import { useTranslation } from "react-i18next";

type TechFormBodyCardProps = {
    prInfo: any;
    isOpen: boolean;
    setClose?: () => void;

};

const initTechForm = {
    priority: 1,
    status: "Bản nháp",
    prePressPcToPlate: {
        isPrePress: false,
        isPcToPlate: false,
        totalPlate: 0,
        front: [
            {}
        ],
        back: [
            {}
        ]
    },
    printingTech: {
        printingTechnology: 0,
        front: [
            {}
        ],
        back: [
            {}
        ]
    },
    productSpec: {
        sizeType: "",
        thickness: "",
        size: "Width(W): ;Height(H): ",
        other: ""
    },
    procedure: {
        tfJobProcedures: [
            {}
        ]
    },
    lamination: {
        startDate: "2023-08-29",
        endDate: "2023-08-29",
        steps: [
            {}
        ]
    },
    processing: {
        startDate: "2023-08-29",
        endDate: "2023-08-29",
        processingInfos: [
            {}
        ]
    },
    cutting: {
        startDate: "2023-08-29",
        endDate: "2023-08-29",
        cuttingInfos: [
            {}
        ]
    },
    hostamping: {
        startDate: "2023-08-29",
        endDate: "2023-08-29",
        hostampingInfos: [
            {}
        ]
    },
    tfIcInfo: {
        outsideHoleLength: "",
        outsideHoleWidth: "",
        outsideHoleDepth: "",
        outsideHoleDiameter: "",
        insideHoleLength: "",
        insideHoleWidth: "",
        insideHoleDepth: "",
        insideHoleDiameter: "",
        type: "",
        machine: "",
        temp: ""
    },
    packing: {
        startDate: "2023-08-29",
        endDate: "2023-08-29",
        boxType: "",
        packingLabelQuantity: 0,
        packingLabelFrom: 0,
        packingLabelTo: 0
    }
}

export const TechFormContext = createContext<any>(null)
export const TechFormBodyCard: React.FC<TechFormBodyCardProps> = observer(({ isOpen = false, setClose, prInfo }) => {
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const [techFormData, setTechFormData] = React.useState<any>(initTechForm);
    const { t } = useTranslation(["common"]);


    const data4 = [
        { no: '1', materialName: 'Overlay (Front)', supplier: 'CPPC', thickNess: '0.05', quantity: '850', note: '', structure: '' },
        { no: '2', materialName: 'PVC (Front)', supplier: 'JHNM', thickNess: '0.15', quantity: '850', note: '', structure: '' },
        { no: '3', materialName: 'Inlay ÉP lần 1', supplier: 'JHNM', thickNess: '0.15 * 3', quantity: '850', note: '', structure: '' },
        { no: '4', materialName: 'PVC (Back)', supplier: 'JHNM', thickNess: '0.15', quantity: '850', note: '', structure: '' },
        { no: '5', materialName: 'Overlay (Back)', supplier: 'CPPC', thickNess: '0.05', quantity: '850', note: '', structure: '' },
        { no: '6', materialName: 'Dải từ', supplier: '', thickNess: '', quantity: 'HI-co đen 12.7', note: '', structure: '' }
    ]

    const handleAddFormTechProcedure = () => {
        setIsAddNewTechForm(true);
    }

    const save = () => {

        httpRequests({ method: "post", url: PLANNING_API_URL + `/api/production_requirements/${prInfo.id}/techforms`, data: techFormData })
            .then(response => {
                console.log(response);
            })
    }

    const onChangeValueSpec = (key: any, value: any) => {
        setTechFormData({
            ...techFormData,
            productSpec: {
                ...techFormData.productSpec,
                [key]: value
            }
        })
    }

    console.log(techFormData);

    return (
        <>
            <TechFormContext.Provider value={[techFormData, setTechFormData, save]}>
                {isAddNewTechForm ? (
                    <TechProcedure isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
                ) : (
                    <div className=''>
                        <div className='table-responsive'>
                            <div
                                className='informer'
                                style={{
                                    textAlign: "left",
                                    paddingTop: 12,
                                }}>
                                {/* <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                    }}>
                                    Thêm mới phiếu công nghệ
                                </h5> */}
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                        textAlign: "center",
                                    }}>
                                    PHIẾU CÔNG NGHỆ - TECH FORM
                                </h5>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                        textAlign: "center",
                                    }}>
                                    (Phôi thẻ - Body card)
                                </h5>
                            </div>


                            <div style={{ marginTop: 10 }}>
                                <TechFormGeneralInfo dataGeneral={prInfo} />
                                <div
                                    className='informer'
                                    style={{
                                        background: "#fff",
                                        textAlign: "left",
                                        paddingTop: 15,
                                        paddingBottom: 10,
                                        // marginTop: 20
                                    }}>
                                    <h5
                                        className='name'
                                        style={{
                                            fontSize: 18,
                                            marginBottom: 0,
                                        }}>
                                        Quy cách sản phẩm
                                    </h5>
                                </div>
                                <Table dataSource={[techFormData.productSpec]} bordered={false} rowKey='Id' pagination={false}>
                                    <Table.Column
                                        title='Khổ thẻ/Size'
                                        dataIndex='sizeType'
                                        key='sizeType'
                                        render={(value, record) => {
                                            return <Input value={value} onChange={e => {
                                                onChangeValueSpec('sizeType', e.target.value)
                                            }} className='inputRow' placeholder='Nhập' />

                                        }}
                                    />
                                    <Table.Column
                                        title='Độ dày'
                                        dataIndex='thickness'
                                        key='thickness'
                                        render={(value) => <Input value={value} onChange={e => {
                                            onChangeValueSpec('thickness', e.target.value)
                                        }} className='inputRow' placeholder='Nhập' />}
                                    />
                                    <Table.Column
                                        title='Kích thước, Dài * Rộng'
                                        dataIndex='size'
                                        key='size'
                                        render={(value) => <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            {" "}
                                            <div className='textbox-row'>
                                                <label>Width(W)</label>
                                                <Input
                                                    className="inputRow"
                                                    style={{ width: "100%" }}
                                                    placeholder='Nhập'
                                                    value={value?.split(";")[0]?.replace("Width(W):", "").trim()}
                                                    key={"size"}
                                                    onChange={e => {
                                                        let newValue = "Width(W): " + e.target.value + ";" + value?.split(";")[1];
                                                        console.log(newValue)
                                                        onChangeValueSpec('size', newValue)
                                                    }}
                                                />
                                            </div>{" "}
                                            <div className='textbox-row'>
                                                {" "}
                                                <label>Height(H)</label>
                                                <Input
                                                    className="inputRow"
                                                    style={{ width: "100%" }}
                                                    placeholder='Nhập'
                                                    value={value?.split(";")[1]?.replace("Height(H):", "").trim()}
                                                    key={"size"}
                                                    onChange={e => {
                                                        let newValue = value?.split(";")[0] + "; Height(H): " + e.target.value;
                                                        onChangeValueSpec('size', newValue)
                                                    }}
                                                />
                                            </div>{" "}
                                        </div>}
                                    />
                                    <Table.Column
                                        title='Khác/other'
                                        dataIndex='other'
                                        key='other'
                                        render={(value) => <Input value={value} onChange={e => {
                                            onChangeValueSpec('other', e.target.value)
                                        }} className='inputRow' placeholder='Nhập' />}
                                    />
                                </Table>
                                <div className="informer" style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 15
                                }}>
                                    <h5 className="name" style={{
                                        fontSize: 18,
                                    }}>Thiết kế</h5>
                                    <div style={{
                                        border: "1px solid #ddd", padding: 15
                                    }}>
                                        <div className="mt-24" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div><TextArea placeholder="Nhập ghi chú" rows={8} cols={70} style={{ resize: "horizontal" }} /></div>
                                            <div style={{ borderRight: "1px solid #ddd" }}></div>
                                            <Upload.Dragger
                                                style={{ width: 550 }}
                                                multiple={false}
                                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="48" viewBox="0 0 50 48" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0.559998C20.8758 0.572932 16.8921 2.06058 13.7688 4.75419C11.375 6.81692 9.64062 9.5047 9.19375 12.2019C3.95625 13.3582 0 17.9212 0 23.4312C0 29.8319 5.3375 34.9387 11.8156 34.9387H23.4375V18.3963L16.7313 25.1064C16.4379 25.3998 16.0399 25.5646 15.625 25.5646C15.2101 25.5646 14.8121 25.3998 14.5187 25.1064C14.2254 24.8129 14.0605 24.415 14.0605 24C14.0605 23.585 14.2254 23.1871 14.5187 22.8936L23.8937 13.5176C24.0389 13.3721 24.2113 13.2566 24.4011 13.1779C24.591 13.0991 24.7945 13.0585 25 13.0585C25.2055 13.0585 25.409 13.0991 25.5989 13.1779C25.7887 13.2566 25.9611 13.3721 26.1063 13.5176L35.4813 22.8936C35.7746 23.1871 35.9395 23.585 35.9395 24C35.9395 24.415 35.7746 24.8129 35.4813 25.1064C35.1879 25.3998 34.7899 25.5646 34.375 25.5646C33.9601 25.5646 33.5621 25.3998 33.2687 25.1064L26.5625 18.3963V34.9387H39.65C45.3187 34.9387 50 30.4694 50 24.8532C50 19.7402 46.1188 15.5741 41.1438 14.8709C40.3844 6.80754 33.4062 0.559998 25 0.559998ZM23.4375 45.8773V34.9387H26.5625V45.8773C26.5625 46.2918 26.3979 46.6892 26.1049 46.9823C25.8118 47.2754 25.4144 47.44 25 47.44C24.5856 47.44 24.1882 47.2754 23.8951 46.9823C23.6021 46.6892 23.4375 46.2918 23.4375 45.8773Z" fill="#FF7A00" />
                                                    </svg>
                                                </p>
                                                <p className="ant-upload-text">Kéo thả file hoặc <a style={{ color: '#FF7A00' }} >Chọn file</a> để tải lên</p>
                                                <p className="ant-upload-hint">Chỉ cho phép file dạng .jpg, .png và dung lượng không quá 1Mb.</p>
                                            </Upload.Dragger>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="informer" style={{
                                        textAlign: "left",
                                        paddingTop: 12
                                    }}>
                                        <h5 className="name" style={{
                                            fontSize: 18,
                                            marginBottom: 0,
                                        }}>1. Trình tự công nghệ</h5>
                                    </div>
                                    <div>
                                        <Table
                                            dataSource={data4}
                                            key={'no'}
                                            rowKey="no"
                                            bordered={false}
                                            pagination={false}
                                        >
                                            <Table.Column title="Nội dung" dataIndex="content" key="content" align="center" render={() => <SelectBox dataSource={["NVL", "Ra bản", "Ép", "Cắt", "Host", "IC", "Đóng gói"]} searchEnabled={true} placeholder="Chọn" key="content" />}
                                            />
                                            <Table.Column title="Bước" dataIndex="step" key="step" align="center" render={() => <SelectBox dataSource={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} searchEnabled={true} placeholder="Chọn" />} />
                                            <Table.Column width={90} title='Thao tác' align="center" render={() => <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                                                <SvgIcon tooltipTitle={t("common.add-button")} sizeIcon={17} textSize={17} icon="assets/icons/Add.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                                <SvgIcon tooltipTitle="Xóa hàng" sizeIcon={17} textSize={17} icon="assets/icons/Trash.svg" textColor="#FF7A00" />
                                            </div>} />
                                        </Table>

                                    </div>
                                </div>

                                <div
                                    className="toolbar"
                                    style={{
                                        marginTop: 20,
                                        paddingBottom: 30,
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        // background: "#ffffff"
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Button
                                        onClick={setClose}
                                        style={{ marginRight: "10px", backgroundColor: "gray", color: "#fff", width: 100 }}
                                    >{t("common.back-button")}</Button>
                                    <Button
                                        onClick={handleAddFormTechProcedure}
                                        style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                                    >{t("common.next-button")}</Button>
                                    {/* <Button
                                        style={{ width: 100 }}
                                        disabled
                                    >{t("common.add-button")}</Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </TechFormContext.Provider>
        </>
    );
});


export default TechFormBodyCard;