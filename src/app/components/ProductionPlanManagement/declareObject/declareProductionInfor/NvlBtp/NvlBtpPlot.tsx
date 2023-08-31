import React, { useContext, useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"
import barcode_img from "../../images/barcode.svg"
import ConfirmInformation from "../confirmInformation/ConfirmInformation";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"


type NvlBtpPlot = {
    isOpen: boolean,
    setClose?: () => void;
    p_id: string,
    p_cardName: string,
    m_name: string,
    w_name: string
    isNVL: boolean
};


const fakeNvlBtpPlot = [{
    id: "WO_123_L01",
    plotName: "WO_123",
    quantity: "10,000"
}]

export const NvlBtpPlot: React.FC<NvlBtpPlot> = observer(({
    isOpen = false, setClose, p_id = "", p_cardName = "", m_name = "", w_name = "", isNVL }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [nvlBtpPlot, setnvlBtpPlot] = useState(fakeNvlBtpPlot);
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);

    console.log("NVL bên nvl", isNVL)
    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const checkedInfo = () => {
        console.log("Chấm công");
    }

    const refresh = () => {
        nvlBtpPlot[0].id = "";
        nvlBtpPlot[0].plotName = "";
        nvlBtpPlot[0].quantity = "";
        let newObj = JSON.parse(JSON.stringify(nvlBtpPlot))
        setnvlBtpPlot(newObj);
        console.log(newObj)

        infoMapped[0].plot_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
    }
    return (
        <>
            {isDeclareInfo ? <ConfirmInformation

                isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)}
                p_id={p_id}
                p_cardName={p_cardName}
                m_name={m_name}
                w_name={w_name}
                nvl_id={nvlBtpPlot[0].id}
                nvl_name={nvlBtpPlot[0].plotName}
                nvl_quantity={nvlBtpPlot[0].quantity}
                isNVL={isNVL}
            />

                :
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
                            }}>Bước 3: Khai báo lô NVL/BTP</h2>

                            {isNVL == true ?
                                <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                    <div style={{ textAlign: "center", margin: "2rem" }}>
                                        <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
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
                                        <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                        <div>
                                            <TextBox value={fakeNvlBtpPlot[0].id} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã nguyên vật liệu</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={fakeNvlBtpPlot[0].plotName} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên nguyên vật liệu</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={fakeNvlBtpPlot[0].quantity} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
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
                                                hint="Khai báo công nhân"
                                            />
                                            <Button
                                                text="Tiếp theo"
                                                width={100}
                                                height={30}
                                                onClick={() => { setisDeclareInfo(true) }}
                                                render={(buttonData) =>
                                                    <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                                }
                                                hint="Xác nhận thông tin"
                                            />
                                            <Button
                                                text="Chấm công  "
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
                                :
                                <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                    <div style={{ textAlign: "center", margin: "2rem" }}>
                                        <h2 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h2>
                                        <img src={barcode_img} width={200} height={200} alt="" />
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
                                        <h3 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h3>
                                        <div>
                                            <TextBox value={fakeNvlBtpPlot[0].id} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã nguyên vật liệu</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={fakeNvlBtpPlot[0].plotName} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên nguyên vật liệu</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={fakeNvlBtpPlot[0].quantity} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
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
                                                hint="Khai báo công nhân"
                                            />
                                            <Button
                                                text="Tiếp theo"
                                                width={100}
                                                height={30}
                                                onClick={() => { setisDeclareInfo(true) }}
                                                render={(buttonData) =>
                                                    <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                                }
                                                hint="Xác nhận thông tin"
                                            />
                                            <Button
                                                text="Chấm công  "
                                                onClick={checkedInfo}
                                                height={30}
                                                width={100}
                                                render={(buttonData) =>
                                                    <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1.2rem" }}>{buttonData.text}</p>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>}
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


export default NvlBtpPlot;