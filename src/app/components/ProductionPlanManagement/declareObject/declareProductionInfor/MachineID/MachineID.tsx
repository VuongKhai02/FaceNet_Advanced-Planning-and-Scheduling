import React, { useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"
import { NvlBtpPlot } from "../NvlBtp/NvlBtpPlot";

type MachineID = {
    isOpen: boolean,
    setClose?: () => void;
};

export const MachineID: React.FC<MachineID> = observer(({
    isOpen = false, setClose }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);

    const fakeMachineID = [{
        id: "M001",
        machineName: "Máy 01",
        machineType: "Máy đồn dập",
    }]

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const handleChangeScreen = () => {
        setisDeclareInfo(true);
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
                            }}>Khai báo máy</h2>

                            <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                <div style={{ textAlign: "center", margin: "2rem" }}>
                                    <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                    <img src={qr_img} width={200} height={200} alt="" />
                                </div>
                                <div className="dx-fieldset">
                                    <h4 style={{ margin: "1rem 0" }}>Thông tin máy</h4>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Mã máy</div>
                                        <div className="dx-field-value">
                                            <TextBox defaultValue={fakeMachineID[0].id}  > </TextBox>
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Tên máy</div>
                                        <div className="dx-field-value">
                                            <TextBox defaultValue={fakeMachineID[0].machineName} />
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Loại máy</div>
                                        <div className="dx-field-value">
                                            <TextBox defaultValue={fakeMachineID[0].machineType} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem" }}>
                                        <Button
                                            text="Tiếp theo"
                                            width={80}
                                            height={30}
                                            onClick={handleChangeScreen}
                                            render={(buttonData) =>
                                                <p style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                            }
                                        />
                                        <Button
                                            text="Quét lại"
                                            onClick={setClose}
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


export default MachineID;