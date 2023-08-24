import React, { useEffect, useState } from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"

import { MachineID } from "../MachineID/MachineID";
import { NvlBtpPlot } from "../NvlBtp/NvlBtpPlot";

type WorkerID = {
    isOpen: boolean,
    setClose?: () => void;
    p_id: string,
    p_cardName: string,
    m_name: string,
};

const fakeWorkerID = [{
    id: "12345",
    workerName: "Vương Tuấn A",
    group: "Tổ in",
}]


export const WorkerID: React.FC<WorkerID> = observer(({
    isOpen = false, setClose, p_id, p_cardName, m_name = "" }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [workerID, setworkerID] = useState(fakeWorkerID)


    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const checkedInfo = () => {
        console.log("Chấm công");
    }

    const handleChangeScreen = () => {
        setisDeclareInfo(true);
    }

    const refresh = () => {
        workerID[0].id = "";
        workerID[0].workerName = "";
        workerID[0].group = "";
        let newObj = JSON.parse(JSON.stringify(workerID))
        setworkerID(newObj);
        console.log(newObj)
    }

    return (
        <>
            {isDeclareInfo ? <NvlBtpPlot isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)} p_id={p_id}
                p_cardName={p_cardName} m_name={m_name} w_name={workerID[0].workerName} /> :
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
                            }}>Bước 2: Khai báo công nhân</h2>
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
                                    <h4 style={{ margin: "1rem 0" }}>Thông tin công nhân</h4>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Mã công nhân</div>
                                        <div className="dx-field-value">
                                            <TextBox value={fakeWorkerID[0].id} > </TextBox>
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Tên công nhân</div>
                                        <div className="dx-field-value">
                                            <TextBox value={fakeWorkerID[0].workerName} />
                                        </div>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Nhóm/tổ</div>
                                        <div className="dx-field-value">
                                            <TextBox value={fakeWorkerID[0].group} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem 0" }}>
                                        <Button
                                            text="Trở lại  "
                                            onClick={setClose}
                                            height={30}
                                            width={80}
                                            render={(buttonData) =>
                                                <p style={{ color: 'rgba(255, 255, 255, 1)', background: 'rgba(189, 189, 189, 1)', margin: "1rem auto", padding: "1.2rem" }}>{buttonData.text}</p>
                                            }
                                            hint="Khai báo máy"
                                        />
                                        <Button
                                            text="Tiếp theo"
                                            width={80}
                                            height={30}
                                            onClick={handleChangeScreen}
                                            render={(buttonData) =>
                                                <p style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                            }
                                            hint="Khai báo lô"

                                        />
                                        <Button
                                            text="Chấm công  "
                                            onClick={checkedInfo}
                                            height={30}
                                            width={80}
                                            render={(buttonData) =>
                                                <p style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1.2rem" }}>{buttonData.text}</p>
                                            }
                                            hint="Khai báo thông tin"
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


export default WorkerID;