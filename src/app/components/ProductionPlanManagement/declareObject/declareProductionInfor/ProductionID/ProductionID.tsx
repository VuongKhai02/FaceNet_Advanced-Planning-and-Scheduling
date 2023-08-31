import React, { useContext, useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"
import warning_img from "../../images/warning.svg"
import { WorkerID } from "../WorkerID/WorkerID";
import { MachineID } from "../MachineID/MachineID";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"


type ProductionID = {
    isOpen: boolean,
    setClose?: () => void;
    status: string,
    p_id: string,
    p_cardName: string,
};

const fakeProductionID = [{
    id: "12345",
    cardName: "Phôi Thẻ MC Tita cashback debit, VP Bank",
    status: "Chưa phát lệnh sản xuất",
    quantity: "15,000"
}]

export const ProductionID: React.FC<ProductionID> = observer(({
    isOpen = false, setClose, p_id = "", p_cardName = "", status }) => {
    const [popupVisible, setPopupVisible] = React.useState<boolean>(false);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [productionId, setproductionId] = useState(fakeProductionID);
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);

    console.log("pop", popupVisible)
    console.log("is op", isOpen)

    const handleChang = () => {
        setisDeclareInfo(true);
        setPopupVisible(false);
    }

    const togglePopup = () => {
        setPopupVisible(!popupVisible)
    }
    const checkedInfo = () => {
        console.log("Chấm công");
    }

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const renderPopUpContent = () => {
        return (
            <>
                <div style={{ padding: "1rem" }}>
                    <div style={{ textAlign: "center" }}>
                        {/* <SvgIcon icon="assets/icons/InfoCircle.svg" ></SvgIcon> */}
                        <img src={warning_img} alt="" />
                        <h4 style={{ color: "rgba(255, 122, 0, 1)" }}>Xác nhận thực hiện sản xuất?</h4>
                    </div>
                    <h5 style={{ paddingTop: "1.5rem" }}>Hiện tại WO này chưa đc tổ trưởng cho phép tiến hành sản xuất. <br />
                        Bạn có chắc muốn tiếp tục thực hiện không?
                    </h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "40%", margin: "auto", paddingTop: "2rem", gap: "10px" }}>

                        <Button
                            onClick={setClose}
                            text="Hủy bỏ"
                            height={30}
                            width={100}
                            render={(buttonData) =>
                                <p style={{ fontSize: "18px", color: '#fff', background: '#ccc', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                            }
                            hint="Khai báo lệnh sản xuất"
                        />

                        <Button
                            onClick={handleChang}
                            text="Xác nhận"
                            width={100}
                            height={30}
                            render={(buttonData) =>
                                <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                            }
                            hint="Khai báo máy"

                        />
                    </div>
                </div>
            </>
        )
    }

    const refresh = () => {
        productionId[0].id = "";
        productionId[0].cardName = "";
        productionId[0].status = "";
        productionId[0].quantity = "";
        let newObj = JSON.parse(JSON.stringify(productionId))
        setproductionId(newObj);

        infoMapped[0].pro_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
    }
    return (
        <>
            {isDeclareInfo ? <MachineID isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)}
                p_id={p_id}
                p_cardName={p_cardName}
            /> :
                <div>
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "rgba(242, 242, 242, 1)",
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h2 className="name" style={{
                                marginBottom: 0,
                                fontWeight: 700,
                                margin: "0 0 .6rem .5rem"
                            }}>Khai báo mã sản xuất</h2>

                            <Popup
                                visible={popupVisible}
                                hideOnOutsideClick={true}
                                onHiding={togglePopup}
                                contentRender={renderPopUpContent}
                                height={windowWidth < 600 ? '30vh' : '33vh'}
                                showTitle={false}
                                width={windowWidth < 600 ? '80vw' : '28vw'}
                            />
                            <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                <div style={{ textAlign: "center", margin: "2rem" }}>
                                    <h2 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h2>
                                    <img src={qr_img} width={200} height={200} alt="" />
                                    <div>
                                        <Button
                                            text="Quét lại"
                                            onClick={refresh}
                                            height={30}
                                            width={80}
                                            render={(buttonData) =>
                                                <p style={{ color: 'rgba(255, 255, 255, 1)', background: 'rgba(189, 189, 189, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="dx-fieldset">
                                    <h3 style={{ margin: "1rem 0" }}>Thông tin mã sản xuất</h3>
                                    <div>
                                        <TextBox value={fakeProductionID[0].id} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }} >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã sản xuất</p>
                                        </TextBox>
                                    </div>
                                    <div className="textbox">
                                        <TextBox value={fakeProductionID[0].cardName} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }} >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên thẻ</p>
                                            <p className="underTextbox">
                                                {fakeProductionID[0].cardName}
                                            </p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox value={fakeProductionID[0].status} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }} >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Trạng thái</p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox value={fakeProductionID[0].quantity} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }} >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Số lượng</p>
                                        </TextBox>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem 0" }}>
                                        <Button
                                            text="Trở lại  "
                                            onClick={setClose}
                                            height={30}
                                            width={100}
                                            render={(buttonData) =>
                                                <p style={{ fontSize: "18px", color: 'rgba(255, 255, 255, 1)', background: 'rgba(189, 189, 189, 1)', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                                            }
                                            hint="Khai báo lệnh sản xuất"
                                        />
                                        <Button
                                            text="Tiếp theo"
                                            width={100}
                                            height={30}
                                            onClick={status === "Chưa phát lệnh sản xuất" ? togglePopup : () => { setisDeclareInfo(true) }}
                                            render={(buttonData) =>
                                                <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                            }

                                        />
                                        <Button
                                            text="Chấm công"
                                            onClick={checkedInfo}
                                            height={30}
                                            width={100}
                                            render={(buttonData) =>
                                                <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1.2rem" }}>{buttonData.text}</p>
                                            }
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="informer" style={{
                            backgroundColor: "#ffffff",
                            paddingLeft: 13
                        }}>
                        </div>
                    </div>
                </div>
            }
        </>
    )
})


export default ProductionID;




