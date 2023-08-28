import React, { useContext, useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"
import { NvlBtpPlot } from "../NvlBtp/NvlBtpPlot";
import { WorkerID } from "../WorkerID/WorkerID";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"



type MachineID = {
    isOpen: boolean,
    setClose?: () => void,
    p_id: string,
    p_cardName: string,

};


const fakeMachineID = [{
    id: "M001",
    machineName: "Máy 01",
    machineType: "Máy đồn dập",
}]

export const MachineID: React.FC<MachineID> = observer(({
    isOpen = false, setClose, p_id = "", p_cardName = "" }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [machineID, setmachineID] = useState(fakeMachineID);
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);

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
        machineID[0].id = "";
        machineID[0].machineName = "";
        machineID[0].machineType = "";
        let newObj = JSON.parse(JSON.stringify(machineID))
        setmachineID(newObj);
        console.log(newObj)

        infoMapped[0].machine_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
    }

    return (
        <>
            {isDeclareInfo ? <WorkerID isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)}
                p_id={p_id}
                p_cardName={p_cardName}
                m_name={machineID[0].machineName}
            /> :
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
                            }}>Bước 1: Khai báo máy</h2>

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
                                    <h3 style={{ margin: "1rem 0" }}>Thông tin máy</h3>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Mã máy</div>
                                        <div className="dx-field-value">
                                            <TextBox disabled value={fakeMachineID[0].id}  > </TextBox>
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Tên máy</div>
                                        <div className="dx-field-value">
                                            <TextBox disabled value={fakeMachineID[0].machineName} />
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Loại máy</div>
                                        <div className="dx-field-value">
                                            <TextBox disabled value={fakeMachineID[0].machineType} />
                                        </div>
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
                                            hint="Khai báo mã sản xuất"
                                        />
                                        <Button
                                            text="Tiếp theo"
                                            width={100}
                                            height={30}
                                            onClick={() => { setisDeclareInfo(true) }}
                                            render={(buttonData) =>
                                                <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                            }
                                            hint="Khai báo công nhân"

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