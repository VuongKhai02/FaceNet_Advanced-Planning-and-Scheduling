import React, { useEffect } from "react";
import { DataGrid, TextArea, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import "./TechFormUpdate.css";
import TechnologyProcedureUpdate from "./TechnologyProcedureUpdate/TechnologyProcedureUpdate";
import { PLANNING_API_URL } from "../../../../utils/config";
import httpRequests from "../../../../utils/httpRequests";
import { Button } from "antd";

type TechFormUpdateProps = {
    id: any;
    isOpen: boolean;
    setClose?: () => void;
};

export const TechFormUpdate: React.FC<TechFormUpdateProps> = observer(({ isOpen = false, setClose, id }) => {
    const [isVisibleTechProcedureUpdate, setIsVisibleTechProcedureUpdate] = React.useState<boolean>(false);
    const [techFormData, setTechFormData] = React.useState<any>({});

    const loadTechFormData = (id: any) => {
        if (id > 0) {
            httpRequests.get(PLANNING_API_URL + "/api/techforms/" + id).then((response) => {
                if (response.status === 200) {
                    let techForm = response.data.data;
                    console.log(techForm)
                    if (techForm.prePressPcToPlate.back.length === 0 && techForm.prePressPcToPlate.front.length === 0) {
                        techForm.prePressPcToPlate.back.push({})
                        techForm.prePressPcToPlate.front.push({})
                    }

                    if (techForm.printingTech.front.length === 0 && techForm.printingTech.back.length === 0) {
                        techForm.printingTech.front.push({ step: 1 })
                    }
                    if (techForm.lamination.steps.length === 0) {
                        techForm.lamination.steps.push({ step: 1 })
                    }
                    if (techForm.processing.processingInfos.length === 0) {
                        techForm.processing.processingInfos.push({ no: 1 })
                    }
                    if (techForm.cutting.cuttingInfos.length === 0) {
                        techForm.cutting.cuttingInfos.push({ no: 1 })
                    }
                    if (techForm.hostamping.hostampingInfos.length === 0) {
                        techForm.hostamping.hostampingInfos.push({ step: 1 })
                    }
                    setTechFormData(techForm);



                }
            });
        }
    };

    const customRenderSize = (cellInfo: any) => {
        const texts = cellInfo.value.split(";");
        return (
            <p>
                {texts[0]}
                <br></br>
                {texts[1]}
            </p>
        );
    };

    const onChangeProductSpec = (key: any, value: any) => {
        console.log(key, value)
        // if (key.startsWith('size')) {
        //     let type = key.substring(4, key.length);

        // }
        let productSpec = {};
        if (techFormData.productSpec !== null) {
            productSpec = techFormData.productSpec;
        }
        setTechFormData({
            ...techFormData,
            productSpec: {
                ...productSpec,
                [key]: value
            }

        })
    }

    useEffect(() => {
        loadTechFormData(id);
    }, [id]);

    console.log(techFormData);
    return (
        <>
            {isVisibleTechProcedureUpdate ? (
                <TechnologyProcedureUpdate
                    techFormData={techFormData}
                    setTechFormData={setTechFormData}
                    isOpen={isVisibleTechProcedureUpdate}
                    setClose={() => setIsVisibleTechProcedureUpdate(false)}
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
                            <h6
                                style={{
                                    fontSize: 15,
                                    textAlign: "right",
                                    fontWeight: "normal",
                                }}>
                                Tổng số lô: {"1"}
                            </h6>
                            <h6
                                style={{
                                    fontSize: 15,
                                    textAlign: "right",
                                    fontWeight: "normal",
                                }}>
                                Số lô: {"1"}
                            </h6>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <TechFormGeneralInfo dataGeneral={techFormData.productionRequirement} />
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 20
                                }}>
                                <h5 style={{ marginTop: 30 }}>Mức độ ưu tiên: {techFormData.priority}</h5>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginTop: 30,
                                    }}>
                                    Quy cách sản phẩm/Product Spec
                                </h5>
                            </div>
                            <DataGrid dataSource={[techFormData.productSpec]} showBorders={true} showRowLines={true} showColumnLines={true}>
                                <Column
                                    dataField='sizeType'
                                    caption='Khổ thẻ/Size'
                                    cellRender={(cellIfo) => <TextBox
                                        onValueChange={(e) => {
                                            onChangeProductSpec("sizeType", e)
                                        }} placeholder='Nhập' value={cellIfo.value} key={"sizeType"} />}
                                />
                                <Column
                                    alignment='left'
                                    dataField='thickness'
                                    caption='Độ dày/Thickness(mm)'
                                    cellRender={(cellIfo) => <TextBox
                                        onValueChange={(e) => {
                                            onChangeProductSpec("thickness", e)
                                        }} placeholder='Nhập' value={cellIfo.value} key={"thickness"} />}
                                />
                                <Column
                                    dataField='size'
                                    caption='Kích thước/Size, Dài/Length * Rộng/Width(mm)'
                                    cellRender={(cellIfo) => (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            {" "}
                                            <div className='textbox-row'>
                                                <label>Width(W)</label>
                                                <TextBox
                                                    style={{ width: "100%" }}
                                                    placeholder='Nhập'
                                                    value={cellIfo.value?.split(";")[0].replace("Width(W):", "").trim()}
                                                    onValueChange={(e) => {
                                                        // let newValue = "Width(W): " + e + ";" + cellIfo.value?.split(";")[1];
                                                        console.log(e)
                                                        // onChangeProductSpec('size', newValue)
                                                    }}
                                                    key={"size"}
                                                />
                                            </div>{" "}
                                            <div className='textbox-row'>
                                                {" "}
                                                <label>Height(H)</label>
                                                <TextBox
                                                    style={{ width: "100%" }}
                                                    placeholder='Nhập'
                                                    value={cellIfo.value?.split(";")[1].replace("Height(H):", "").trim()}
                                                    key={"size"}
                                                />
                                            </div>{" "}
                                        </div>
                                    )}
                                />
                                <Column
                                    dataField='other'
                                    caption='Khác/other'
                                    cellRender={(cellIfo) => <TextArea onValueChange={(e) => {
                                        onChangeProductSpec("other", e)
                                    }} placeholder='Nhập' value={cellIfo.value} key={"other"} />}
                                />
                            </DataGrid>
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
                                    Thiết kế - Card design
                                </h5>
                            </div>
                            <div className='outer-rectangle'>
                                <div className='inner-rectangle'>
                                    <div className='text'>Chú ý: -Màu theo tờ mẫu đã làm T05/2020</div>
                                </div>

                                <div className='image-container'>
                                    <img
                                        src='https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png'
                                        alt='Credit Card'
                                        className='credit-card-image'
                                    />
                                </div>
                            </div>
                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 10,
                                    // float: "right",
                                    display: "flex",
                                    justifyContent: 'flex-end',
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    onClick={setClose}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: "gray", width: 100 }}
                                >Trở lại</Button>
                                <Button
                                    onClick={() => {
                                        setIsVisibleTechProcedureUpdate(true);
                                    }}
                                    style={{ marginRight: "20px", color: "#fff", backgroundColor: "#FF7A00" }}
                                >Tiếp theo</Button>
                                <Button
                                    disabled
                                    onClick={() => { }}
                                    style={{ marginRight: "20px", width: 100 }}
                                >Ký lập</Button>
                                <Button
                                    disabled
                                    onClick={() => { }}
                                >Gửi duyệt</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
});

export default TechFormUpdate;


export const TechFormGeneralInfo = (dataGeneral: any) => {

    return (
        <div className="wrapper">
            <div className="row">
                <div className="title">Mã sx/Production Code</div>
                <div className="value">{dataGeneral?.dataGeneral?.productionCode}</div>
                <div className="title">Người gửi/Sender</div>
                <div className="value">{dataGeneral?.dataGeneral?.sender}</div>
            </div>
            <div className="row">
                <div className="title">Tên khách hàng/Customer</div>
                <div className="value">{dataGeneral?.dataGeneral?.customer}</div>
                <div className="title">Số lượng thẻ/Q'ty</div>
                <div className="value">{dataGeneral?.dataGeneral?.quantityRequirement}</div>
            </div>
            <div className="row">
                <div className="title">Tên thẻ/Card name</div>
                <div className="value">{dataGeneral?.dataGeneral?.cardName}</div>
                <div className="title">SL thẻ đã tính bù hao</div>
                <div className="value">{dataGeneral?.dataGeneral?.quantityCompensation}</div>
            </div>
            <div className="row">
                <div className="title">Số HĐ/P.O</div>
                <div className="value">{dataGeneral?.dataGeneral?.poNumber}</div>
                <div className="title">Kết thúc sx/Finish</div>
                <div className="value">{dataGeneral?.dataGeneral?.endDate}</div>
            </div>
            <div className="row">
                <div className="title">Bắt đầu sx/ Start</div>
                <div className="value">{dataGeneral?.dataGeneral?.startDate}</div>
                <div className="title">Giao hàng/ Delivery date</div>
                <div className="value">{dataGeneral?.dataGeneral?.deliveryDate}</div>
            </div>
        </div>
    )
}
