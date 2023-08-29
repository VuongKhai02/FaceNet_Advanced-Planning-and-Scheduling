import React, { createContext, useState } from "react";
import { Button, DataGrid, Template, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import TechProcedure from "../../../TechFormList/TechFormNewAdd/TechProcedure/TechProcedure";
import { observer } from "mobx-react";
import { Input, Table, Upload } from "antd";
import SvgIcon from "../../../../../icons/SvgIcon/SvgIcon";
import { TechFormGeneralInfo } from "../../../TechFormUpdate/TechFormUpdate";
import axios from "axios"
import { useMainStore } from "@haulmont/jmix-react-core";
import { PLANNING_API_URL } from "../../../../../../config";

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
    const [techFormData, setTechFormData] = React.useState<any>(initTechForm)
    const mainStore = useMainStore()

    const data1 = [
        { title1: "Mã sx/Production", data1: "1500928", title2: "Người gửi/Sender", data2: "Nguyễn Thị A" },
        { title1: "Tên khách hàng/Customer", data1: "Ngân hang A", title2: "Số lượng thẻ/Quantity", data2: "15000" },
        { title1: "Tên thẻ/Card name", data1: "Thẻ VP-Bank", title2: "Số lượng đã tính bù hao", data2: "16000" },
        { title1: "Số HĐ/PO", data1: "PO0001", title2: "Kết thúc sx/Finish", data2: "30/7/2023" },
        { title1: "Bắt đầu sx/Start", data1: "30/6/2023", title2: "Giao hàng/Delivery date", data2: "1/8/2023" },
    ];

    const data2 = [
        {
            step1: "NVL",
            step2: "Ra bản",
            step3: "Inlay D350 trở nó",
            step4: "Nền Nhũ",
            step5: "In Artwork MT+ MS + UV",
            step6: "In nền keo 2 mặt tờ in",
            step7: "Ép TP",
            step8: "Cắt",
            step9: "Hots + IC",
            step10: "Loadkey",
            step11: "CTH",
            step12: "Đóng gói",
        },
    ];

    const data3 = [{ Id: 1, size: "jhgfhjdh" }];

    const data4 = [
        { no: "1", materialName: "Overlay (Front)", supplier: "CPPC", thickNess: "0.05", quantity: "850", note: "", structure: "" },
        { no: "2", materialName: "PVC (Front)", supplier: "JHNM", thickNess: "0.15", quantity: "850", note: "", structure: "" },
        { no: "3", materialName: "Inlay ÉP lần 1", supplier: "JHNM", thickNess: "0.15 * 3", quantity: "850", note: "", structure: "" },
        { no: "4", materialName: "PVC (Back)", supplier: "JHNM", thickNess: "0.15", quantity: "850", note: "", structure: "" },
        { no: "5", materialName: "Overlay (Back)", supplier: "CPPC", thickNess: "0.05", quantity: "850", note: "", structure: "" },
        { no: "6", materialName: "Dải từ", supplier: "", thickNess: "", quantity: "HI-co đen 12.7", note: "", structure: "" },
    ];

    const handleAddFormTechProcedure = () => {
        setIsAddNewTechForm(true);
    };

    const save = () => {
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        }; 
        axios({ method: "post", url: PLANNING_API_URL+ `/api/production_requirements/${prInfo.id}/techforms`, headers: headers, data: techFormData })
        .then(response => {
            console.log(response);
        })
    }

    const onChangeValueSpec = (key, value) => {
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
                <div className='box__shadow-table-responsive'>
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
                                Thêm mới phiếu công nghệ
                            </h5>
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
                            <TechFormGeneralInfo dataGeneral={prInfo}/>
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
                                    Quy cách sản phẩm/Product Spec
                                </h5>
                            </div>
                            <Table dataSource={[techFormData.productSpec]} bordered rowKey='Id' pagination={false}>
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
                                    title='Độ dày/Thickness(mm)'
                                    dataIndex='thickness'
                                    key='thickness'
                                    render={(value) => <Input value={value} onChange={e => {
                                        onChangeValueSpec('thickness', e.target.value)
                                    }} className='inputRow' placeholder='Nhập' />}
                                />
                                <Table.Column
                                    title='Kích thước/Size, Dài/Length * Rộng/Width(mm)'
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
                                                let newValue = value?.split(";")[0] +  "; Height(H): " + e.target.value ;
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
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 15
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                    }}>
                                    Thiết kế/Card design
                                </h5>
                                {/* <ImportTechForm /> */}
                                <div className='mt-24'>
                                    <Upload.Dragger
                                        multiple={false}
                                        accept='.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                                        <p className='ant-upload-drag-icon'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='50' height='48' viewBox='0 0 50 48' fill='none'>
                                                <path
                                                    fill-rule='evenodd'
                                                    clip-rule='evenodd'
                                                    d='M25 0.559998C20.8758 0.572932 16.8921 2.06058 13.7688 4.75419C11.375 6.81692 9.64062 9.5047 9.19375 12.2019C3.95625 13.3582 0 17.9212 0 23.4312C0 29.8319 5.3375 34.9387 11.8156 34.9387H23.4375V18.3963L16.7313 25.1064C16.4379 25.3998 16.0399 25.5646 15.625 25.5646C15.2101 25.5646 14.8121 25.3998 14.5187 25.1064C14.2254 24.8129 14.0605 24.415 14.0605 24C14.0605 23.585 14.2254 23.1871 14.5187 22.8936L23.8937 13.5176C24.0389 13.3721 24.2113 13.2566 24.4011 13.1779C24.591 13.0991 24.7945 13.0585 25 13.0585C25.2055 13.0585 25.409 13.0991 25.5989 13.1779C25.7887 13.2566 25.9611 13.3721 26.1063 13.5176L35.4813 22.8936C35.7746 23.1871 35.9395 23.585 35.9395 24C35.9395 24.415 35.7746 24.8129 35.4813 25.1064C35.1879 25.3998 34.7899 25.5646 34.375 25.5646C33.9601 25.5646 33.5621 25.3998 33.2687 25.1064L26.5625 18.3963V34.9387H39.65C45.3187 34.9387 50 30.4694 50 24.8532C50 19.7402 46.1188 15.5741 41.1438 14.8709C40.3844 6.80754 33.4062 0.559998 25 0.559998ZM23.4375 45.8773V34.9387H26.5625V45.8773C26.5625 46.2918 26.3979 46.6892 26.1049 46.9823C25.8118 47.2754 25.4144 47.44 25 47.44C24.5856 47.44 24.1882 47.2754 23.8951 46.9823C23.6021 46.6892 23.4375 46.2918 23.4375 45.8773Z'
                                                    fill='#FF7A00'
                                                />
                                            </svg>
                                        </p>
                                        <p className='ant-upload-text'>
                                            Kéo thả file hoặc <a style={{ color: "#FF7A00" }}>Chọn file</a> để tải lên
                                        </p>
                                        <p className='ant-upload-hint'>Chỉ cho phép file dạng .xls, .xlsx và dung lượng không quá 1MB</p>
                                    </Upload.Dragger>
                                </div>
                            </div>
                            <div>
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
                                        1. Trình tự công nghệ/Technology procedure
                                    </h5>
                                </div>
                                <div>
                                    <Table key={"step1"} dataSource={data2} rowKey='step1' bordered pagination={false}>
                                        <Table.Column
                                            title='Step1'
                                            dataIndex='step1'
                                            key='step1'
                                            align='left'
                                            render={(e) => {
                                                return (
                                                    <TextBox placeholder='Nhập' key='step1' />
                                                )}}
                                        />
                                        <Table.Column
                                            title='Step2'
                                            dataIndex='step2'
                                            key='step2'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step2' />}
                                        />
                                        <Table.Column
                                            title='Step3'
                                            dataIndex='step3'
                                            key='step3'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step3' />}
                                        />
                                        <Table.Column
                                            title='Step4'
                                            dataIndex='step4'
                                            key='step4'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step4' />}
                                        />
                                        <Table.Column
                                            title='Step5'
                                            dataIndex='step5'
                                            key='step5'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step5' />}
                                        />
                                        <Table.Column
                                            title='Step6'
                                            dataIndex='step6'
                                            key='step6'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step6' />}
                                        />
                                        <Table.Column
                                            title='Step7'
                                            dataIndex='step7'
                                            key='step7'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step7' />}
                                        />
                                        <Table.Column
                                            title='Step8'
                                            dataIndex='step8'
                                            key='step8'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step8' />}
                                        />
                                        <Table.Column
                                            title='Step9'
                                            dataIndex='step9'
                                            key='step9'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step9' />}
                                        />
                                        <Table.Column
                                            title='Step10'
                                            dataIndex='step10'
                                            key='step10'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step10' />}
                                        />
                                        <Table.Column
                                            title='Step11'
                                            dataIndex='step11'
                                            key='step11'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step11' />}
                                        />
                                        <Table.Column
                                            title='Step12'
                                            dataIndex='step12'
                                            key='step12'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step12' />}
                                        />
                                        <Table.Column
                                            title=''
                                            align='center'
                                            render={() => (
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <SvgIcon
                                                        tooltipTitle='Thêm mới'
                                                        sizeIcon={17}
                                                        textSize={17}
                                                        icon='assets/icons/Add.svg'
                                                        textColor='#FF7A00'
                                                        style={{ marginRight: 17 }}
                                                    />
                                                    <SvgIcon
                                                        tooltipTitle='Xóa hàng'
                                                        sizeIcon={17}
                                                        textSize={17}
                                                        icon='assets/icons/Trash.svg'
                                                        textColor='#FF7A00'
                                                        style={{ marginRight: 17 }}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Table>
                                    <Table dataSource={data4} key={"no"} rowKey='no' bordered pagination={false}>
                                        <Table.Column title='No.' dataIndex='no' key='no' align='left' width={130} />
                                        <Table.Column
                                            onCell={(item, index: any) => {
                                                return index === 2
                                                    ? { rowSpan: 3 }
                                                    : [3, 4].includes(index)
                                                    ? { rowSpan: 0 }
                                                    : { rowSpan: 1 };
                                            }}
                                            title='Tên vật liệu/Materials Name'
                                            dataIndex=''
                                            key='materialName'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step8' />}
                                        />
                                        <Table.Column
                                            title='Xuất xứ/Supplier'
                                            dataIndex=''
                                            key='supplier'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step8' />}
                                        />
                                        <Table.Column
                                            title='Độ dày/Thickness(mm)'
                                            dataIndex=''
                                            key='thickNess'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step8' />}
                                        />
                                        <Table.Column
                                            title="Số lượng/Q'ty(tấm)"
                                            dataIndex=''
                                            key='quantity'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step8' />}
                                        />
                                        <Table.Column
                                            title='Ghi chú/Remark'
                                            dataIndex=''
                                            key='remark'
                                            align='center'
                                            render={() => <TextBox placeholder='Nhập' key='step8' />}
                                        />
                                        <Table.Column
                                            onCell={(item, index: any) => {
                                                return index === 0 ? { rowSpan: 9 } : { rowSpan: 0 };
                                            }}
                                            title='Cấu trúc/Structure'
                                            dataIndex=''
                                            key='structure'
                                            align='center'
                                            className='no-border-column'
                                            render={() => (
                                                <div>
                                                    {" "}
                                                    <Upload.Dragger
                                                        multiple={false}
                                                        accept='.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                                                        <p className='ant-upload-drag-icon'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='50'
                                                                height='48'
                                                                viewBox='0 0 50 48'
                                                                fill='none'>
                                                                <path
                                                                    fill-rule='evenodd'
                                                                    clip-rule='evenodd'
                                                                    d='M25 0.559998C20.8758 0.572932 16.8921 2.06058 13.7688 4.75419C11.375 6.81692 9.64062 9.5047 9.19375 12.2019C3.95625 13.3582 0 17.9212 0 23.4312C0 29.8319 5.3375 34.9387 11.8156 34.9387H23.4375V18.3963L16.7313 25.1064C16.4379 25.3998 16.0399 25.5646 15.625 25.5646C15.2101 25.5646 14.8121 25.3998 14.5187 25.1064C14.2254 24.8129 14.0605 24.415 14.0605 24C14.0605 23.585 14.2254 23.1871 14.5187 22.8936L23.8937 13.5176C24.0389 13.3721 24.2113 13.2566 24.4011 13.1779C24.591 13.0991 24.7945 13.0585 25 13.0585C25.2055 13.0585 25.409 13.0991 25.5989 13.1779C25.7887 13.2566 25.9611 13.3721 26.1063 13.5176L35.4813 22.8936C35.7746 23.1871 35.9395 23.585 35.9395 24C35.9395 24.415 35.7746 24.8129 35.4813 25.1064C35.1879 25.3998 34.7899 25.5646 34.375 25.5646C33.9601 25.5646 33.5621 25.3998 33.2687 25.1064L26.5625 18.3963V34.9387H39.65C45.3187 34.9387 50 30.4694 50 24.8532C50 19.7402 46.1188 15.5741 41.1438 14.8709C40.3844 6.80754 33.4062 0.559998 25 0.559998ZM23.4375 45.8773V34.9387H26.5625V45.8773C26.5625 46.2918 26.3979 46.6892 26.1049 46.9823C25.8118 47.2754 25.4144 47.44 25 47.44C24.5856 47.44 24.1882 47.2754 23.8951 46.9823C23.6021 46.6892 23.4375 46.2918 23.4375 45.8773Z'
                                                                    fill='#FF7A00'
                                                                />
                                                            </svg>
                                                        </p>
                                                        <p className='ant-upload-text'>
                                                            Kéo thả file hoặc <a style={{ color: "#FF7A00" }}>Chọn file</a> để tải lên
                                                        </p>
                                                        <p className='ant-upload-hint'>
                                                            Chỉ cho phép file dạng .xls, .xlsx và dung lượng không quá 1MB
                                                        </p>
                                                    </Upload.Dragger>
                                                </div>
                                            )}
                                        />
                                        <Table.Column
                                            title=''
                                            align='center'
                                            render={() => (
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <SvgIcon
                                                        tooltipTitle='Thêm mới'
                                                        sizeIcon={17}
                                                        textSize={17}
                                                        icon='assets/icons/Add.svg'
                                                        textColor='#FF7A00'
                                                        style={{ marginRight: 17 }}
                                                    />
                                                    <SvgIcon
                                                        tooltipTitle='Xóa hàng'
                                                        sizeIcon={17}
                                                        textSize={17}
                                                        icon='assets/icons/Trash.svg'
                                                        textColor='#FF7A00'
                                                        style={{ marginRight: 17 }}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Table>
                                </div>
                            </div>

                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 10,
                                    float: "right",
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    text='Trở lại'
                                    onClick={setClose}
                                    style={{ marginRight: "18px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                                />
                                <Button
                                    text='Tiếp theo'
                                    onClick={handleAddFormTechProcedure}
                                    style={{ marginRight: "18px", backgroundColor: "#FF7A00", color: "#fff" }}
                                />
                                <Button text='Thêm mới' style={{ backgroundColor: "gray", color: "#fff" }} />
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
