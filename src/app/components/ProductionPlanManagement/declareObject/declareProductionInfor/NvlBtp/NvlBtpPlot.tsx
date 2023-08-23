import React, { useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"

type NvlBtpPlot = {
    isOpen: boolean,
    setClose?: () => void;
};


const fakeNvlBtpPlot = [{
    plotNumber: "WO_123",
    quantity: "10,000"
}]

export const NvlBtpPlot: React.FC<NvlBtpPlot> = observer(({
    isOpen = false, setClose }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [nvlBtpPlot, setnvlBtpPlot] = useState(fakeNvlBtpPlot);


    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const handStart = () => {
        alert("Bắt đầu");
    }

    const refresh = () => {
        nvlBtpPlot[0].plotNumber = "";
        nvlBtpPlot[0].quantity = "";
        let newObj = JSON.parse(JSON.stringify(nvlBtpPlot))
        setnvlBtpPlot(newObj);
        console.log(newObj)
    }
    return (
        <>
            {isDeclareInfo ? <NvlBtpPlot isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)} /> :
                <div>
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h2 className="name" style={{
                                marginBottom: 0,
                                fontWeight: 700,
                                margin: "0 0 .6rem .5rem"
                            }}>Khai báo lô NVL/BTP</h2>
                            <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                <div style={{ textAlign: "center", margin: "2rem" }}>
                                    <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                    <img src={qr_img} width={200} height={200} alt="" />
                                </div>
                                <div className="dx-fieldset">
                                    <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Số lô</div>
                                        <div className="dx-field-value">
                                            <TextBox value={fakeNvlBtpPlot[0].plotNumber} > </TextBox>
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Số lượng</div>
                                        <div className="dx-field-value">
                                            <TextBox value={fakeNvlBtpPlot[0].quantity} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px", flexDirection: "row-reverse", padding: "2rem 0" }}>
                                        <Button
                                            text="Bắt đầu"
                                            width={80}
                                            height={30}
                                            onClick={handStart}
                                            render={(buttonData) =>
                                                <p style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                            }
                                        />
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


export default NvlBtpPlot;