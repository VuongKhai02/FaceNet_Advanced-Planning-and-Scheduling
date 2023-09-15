import React, { useContext, useEffect, useState } from "react";
import { DataGrid, TabPanel, TextArea, TextBox } from "devextreme-react";
import classNames from "classnames/bind";
import { Column } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import TechnologyProcedureUpdate from "./TechnologyProcedureUpdate/TechnologyProcedureUpdate";
import { PLANNING_API_URL } from "../../../../utils/config";
import httpRequests from "../../../../utils/httpRequests";
import { Button } from "antd";

import styles from "./TechFormUpdate.module.css";
import ProductSpec from "../../../../components/TechFormComponent/ProductSpec";
import TechFormDesTab from "../../../../components/TechFormComponent/TechFormDesTab";
import ProductDesign from "../../../../components/TechFormComponent/ProductDesign";
import TechFormProvider, { TechFormContext } from "../../../../contexts/TechFormContext";
import Loading from "../../../../shared/components/Loading/Loading";

const cx = classNames.bind(styles);

type TechFormUpdateProps = {
    id: any;
    isOpen: boolean;
    setClose?: () => void;
};

export const TechFormUpdate: React.FC<TechFormUpdateProps> = observer(({ isOpen = false, setClose, id }) => {
    const [isVisibleTechProcedureUpdate, setIsVisibleTechProcedureUpdate] = React.useState<boolean>(false);
    const [techFormData, setTechFormData] = React.useState<any>();
    const [generalInfo, setGeneralInfo] = useState<any>();
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadTechFormData = (id: any) => {
        if (id > 0) {
            httpRequests.get(PLANNING_API_URL + "/api/techforms/" + id).then((response) => {
                if (response.status === 200) {
                    let techForm = response.data.data;
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

    useEffect(() => {
        console.log(techFormData);
        
        if (techFormData !== undefined) {
            let quantity = 0;
            let totalQuantity = 0;
            if (techFormData.productionRequirements.length === 1) {
                quantity = techFormData.productionRequirements[0].quantityRequirement
                totalQuantity = techFormData.productionRequirements[0].totalQuantity
            } else {
                quantity = techFormData.productionRequirements.reduce((pre, next) => {
                    if (next !== undefined && next !== null ) {
                        return pre.quantityRequirement + next.quantityRequirement
                    } else {
                        return pre.quantityRequirement
                    }
                })
                totalQuantity = techFormData.productionRequirements.reduce((pre, next) => {
                    if (next !== undefined && next !== null ) {
                        return pre.totalQuantity + next.totalQuantity
                    } else {
                        return pre.totalQuantity
                    }
                })
            }
            setGeneralInfo({
                productionCode:[... new Set(techFormData.productionRequirements
                    .map(pr => {return {
                                        code: pr.productionCode,
                                        quantity: pr.quantityRequirement
                                        }}))],
                customer: [... new Set(techFormData.productionRequirements.map(pr => pr.customer))],
                sender: [...new Set(techFormData.productionRequirements.map(pr => pr.sender))],
                quantity: quantity,
                totalQuantity: totalQuantity,
                cardName: [...new Set(techFormData.productionRequirements.map(pr => pr.cardName))],
                poNumber: [...new Set(techFormData.productionRequirements.map(pr => pr.poNumber))],
                startDate: (new Date(techFormData.startDate)).toLocaleDateString(),
                endDate: (new Date(techFormData.endDate)).toLocaleDateString()
            })
        }
    }, [techFormData])

    return (
        techFormData ? 
        <TechFormProvider techFormState={techFormData}>
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
                            <TechFormGeneralInfo dataGeneral={generalInfo} />
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
                            <TechFormDesTab data = {techFormData.productionRequirements} component={ProductSpec} />
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
                            {/* <div className={cx('outer-rectangle')}>
                                <div className={cx('inner-rectangle')}>
                                    <div className={cx('text')}>Chú ý: -Màu theo tờ mẫu đã làm T05/2020</div>
                                </div>

                                <div className={cx('image-container')}>
                                    <img
                                        src='https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png'
                                        alt='Credit Card'
                                        className={cx('credit-card-image')}
                                    />
                                </div>
                            </div> */}
                            <TechFormDesTab data = {techFormData.productionRequirements} component={ProductDesign} />
                            <div className={cx('toolbar')}>
                                <Button
                                    onClick={setClose}
                                    className={cx("btn-back")}
                                >Trở lại</Button>
                                <Button
                                    onClick={() => {
                                        setIsVisibleTechProcedureUpdate(true);
                                    }}
                                    className={cx("btn-next")}
                                >Tiếp theo</Button>
                                <Button
                                    disabled
                                    onClick={() => { }}
                                    className={cx("btn-sign")}
                                >Ký lập</Button>
                                <Button
                                    disabled
                                    onClick={() => { }}
                                    className={cx("btn-send")}
                                >Gửi duyệt</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </TechFormProvider> : <Loading  />
    );
});

export default TechFormUpdate;


export const TechFormGeneralInfo = (dataGeneral: any) => {

    console.log(dataGeneral)
    const renderProductionCodes = () => {
        return (
            <div>
                {
                    dataGeneral?.dataGeneral?.productionCode.map((code) => {
                        return <div className={cx('production_codes')}><div className={cx('code')}>{code.code}</div><div className={cx('quantity')}>- {code.quantity}c</div></div>;
                    })
                }
            </div>
        )
    }
    const renderValue = (values) => {
        console.log(values);
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    values.map((value, index) => {
                            return <div key={index} style={{maxWidth: '100%', textOverflow: 'ellipsis', overflow:'hidden', whiteSpace: 'nowrap'}} className={cx()}>{value}</div>
                    })
                }
            </div>
        )
    }

    return (
        dataGeneral?.dataGeneral !== undefined && 
        <div className={cx("wrapper")}>
            <div className={cx("row")}>
                <div className={cx("title")}>Mã sx/Production Code:</div>
                <div className={cx("value")}>{renderProductionCodes()}</div>
                <div className={cx("title")}>Người gửi/Sender:</div>
                <div className={cx("value")}>{renderValue(dataGeneral?.dataGeneral?.sender)}</div>
            </div>
            <div className={cx("row")}>
                <div className={cx("title")}>Tên khách hàng/Customer:</div>
                <div className={cx("value")}>{renderValue(dataGeneral?.dataGeneral?.customer)}</div>
                <div className={cx("title")}>Số lượng thẻ/Q'ty:</div>
                <div className={cx("value")}>{dataGeneral?.dataGeneral?.quantity}</div>
            </div>
            <div className={cx("row")}>
                <div className={cx("title")}>Tên thẻ/Card name:</div>
                <div className={cx("value")}>{renderValue(dataGeneral?.dataGeneral?.cardName)}</div>
                <div className={cx("title")}>SL thẻ đã tính bù hao:</div>
                <div className={cx("value")}>{dataGeneral?.dataGeneral?.totalQuantity}</div>
            </div>
            <div className={cx("row")}>
                <div className={cx("title")}>Số HĐ/P.O:</div>
                <div className={cx("value")}>{renderValue(dataGeneral?.dataGeneral?.poNumber)}</div>
                <div className={cx("title")}>Kết thúc sx/Finish:</div>
                <div className={cx("value")}>{dataGeneral?.dataGeneral?.endDate}</div>
            </div>
            <div className={cx("row")}>
                <div className={cx("title")}>Bắt đầu sx/ Start:</div>
                <div className={cx("value")}>{dataGeneral?.dataGeneral?.startDate}</div>
                <div className={cx("title")}>Giao hàng/ Delivery date:</div>
                <div className={cx("value")}>{dataGeneral?.dataGeneral?.deliveryDate}</div>
            </div>
        </div>
    )
}

export function useTechFormContext() {
    const context = useContext(TechFormContext);
    if (context === undefined || context === null) {
        throw new Error(
            "useTechFormContext must be used within a TechFormProvider"
        )
    }
    return context;
}
