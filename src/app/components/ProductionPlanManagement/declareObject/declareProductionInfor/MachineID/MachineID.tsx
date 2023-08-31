import React, { useCallback, useContext, useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg"
import { NvlBtpPlot } from "../NvlBtp/NvlBtpPlot";
import { WorkerID } from "../WorkerID/WorkerID";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"
import qrTextbox from "../../images/qrTextBox.jpg"

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

const stringTestQr = '{"machineCode":"M02","machineName":"Máy in offset Roland 500","machineType":"Máy in"}'

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

        infoMapped[0].machine_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
    }

    const handleValueChange = (e) => {
        // let input = e.event.target.value;
        // if (input.includes("{")) {
        //     let machineObj = JSON.parse(input);
        //     machineID[0].id = infoMapped[0].machine_id = machineObj.machineCode;
        //     machineID[0].machineName = machineObj.machineName;;
        //     machineID[0].machineType = machineObj.machineType;;

        //     let newMachineObj = JSON.parse(JSON.stringify(machineID))
        //     setmachineID(newMachineObj);

        //     let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        //     setInfoMapped(newInfoMpaped);

        //     setTimeout(() => {
        //         e.event.target.value = ""
        //     }, 1000);
        // }
        let input = e.target.value;
        if (input.includes("{")) {
            let machineObj = JSON.parse(input);
            machineID[0].id = infoMapped[0].machine_id = machineObj.machineCode;
            machineID[0].machineName = machineObj.machineName;;
            machineID[0].machineType = machineObj.machineType;;

            let newMachineObj = JSON.parse(JSON.stringify(machineID))
            setmachineID(newMachineObj);

            let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
            setInfoMapped(newInfoMpaped);

            setTimeout(() => {
                e.target.value = ""
            }, 1000);
        }
        console.log("e", e.target.value)
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
                            background: "rgba(242, 242, 242, 1)",
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
                                        <div>

                                            <input type="text" className="test" name="a" id="a" autoFocus onInput={handleValueChange} />
                                        </div>
                                        <TextBox disabled placeholder="Scan chuỗi dạng json" onInput={handleValueChange} style={{ background: `url(${qrTextbox}) no-repeat scroll 5px 4px`, padding: "0 0 0 2rem", }} />
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
                                    <div>
                                        <TextBox value={fakeMachineID[0].id} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 12rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}>
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã máy</p>
                                        </TextBox>
                                    </div>
                                    <div className="textbox">
                                        <TextBox value={fakeMachineID[0].machineName} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 12rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}>
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên máy</p>
                                            <p className="underTextbox">
                                                {fakeMachineID[0].machineName}
                                            </p>
                                        </TextBox>
                                    </div>
                                    <div className="textbox">
                                        <TextBox value={fakeMachineID[0].machineType} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 12rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}>
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Loại máy</p>
                                            <p className="underTextbox">
                                                {fakeMachineID[0].machineType}
                                            </p>
                                        </TextBox>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Test chuỗi dạng json</div>
                                        <div className="dx-field-value">
                                            <TextBox value={stringTestQr} />
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