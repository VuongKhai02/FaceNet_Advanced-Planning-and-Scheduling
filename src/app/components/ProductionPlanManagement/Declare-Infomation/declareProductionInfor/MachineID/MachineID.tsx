import React, { useContext, useEffect, useState } from "react";
import { TextBox } from "devextreme-react";
import { Button } from "antd"
import { observer } from "mobx-react";
import { WorkerID } from "../WorkerID/WorkerID";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";


type MachineID = {
    isOpen: boolean,
    setClose?: () => void,
    production_id: string,
    production_cardName: string,
};

const fakeMachineID = [{
    id: "",
    machineName: "",
    machineType: "",
}]

const stringTestQr = 'M03'

export const MachineID: React.FC<MachineID> = observer(({
    isOpen = false, setClose, production_id = "", production_cardName = "" }) => {
    const mainStore = useMainStore();
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
        document.getElementById("inputHide")?.focus();
    }

    const handleValueChange = (e) => {
        const headers = {
            'Authorization': 'Bearer ' + mainStore.authToken,
            'content-type': 'application/json'
        };
        const request = {
            "pageNumber": 0,
            "pageSize": 0,
            "filter": {
                "machineType": {}
            },
            "common": "",
            "sortProperty": "machineCode",
            "sortOrder": "ASC"
        }
        // Gọi api của mdm, chỉ khi truy cập url Localhost mới chạy dc
        axios.post("http://222.252.25.37:10068" + '/api/machines', request, { headers })
            .then(response => {
                if (response.status === 200) {
                    if (e.target.value.includes("M")) {
                        let machineObj = response.data.data.filter(x => x.machineCode == e.target.value);
                        if (machineObj.length == 0) {
                            alert("Không tồn tại");
                        }
                        else {
                            machineID[0].id = infoMapped[0].machine_id = machineObj[0].machineCode;
                            machineID[0].machineName = machineObj[0].machineName;
                            machineID[0].machineType = machineObj[0].machineType?.machineTypeName;
                            console.log(machineID);

                            let newMachineObj = JSON.parse(JSON.stringify(machineID))
                            setmachineID(newMachineObj);

                            let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
                            setInfoMapped(newInfoMpaped);
                        }
                    }
                }
            }
            );
        setTimeout(() => {
            e.target.value = ""
        }, 1000);
    }

    return (
        <>
            {isDeclareInfo ? <WorkerID isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)}
                production_id={production_id}
                production_cardName={production_cardName}
                machine_name={machineID[0].machineName}
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
                                <div className="qr_container">
                                    <h2 className="qr_container_head">Hướng camera về phía mã QR</h2>
                                    <img src="assets/images/qrCode.svg" width={200} height={200} alt="" />
                                    <div>
                                        <div>
                                            <input type="text" className="inputHidden" id="inputHide" autoFocus onInput={handleValueChange} />
                                            <input type="text" className="" id="inputHide" autoFocus onInput={handleValueChange} />
                                        </div>
                                        <Button onClick={refresh} className="btn_back">Quét lại</Button>
                                        {/* 
                                        <Button
                                            className="btn_again"
                                            text="Quét lại"
                                            onClick={refresh}
                                            height={30}
                                            width={105}
                                        /> */}
                                    </div>
                                </div>
                                <div className="dx-fieldset">
                                    <h3 className="info_head">Thông tin máy</h3>
                                    <div>
                                        <TextBox className="textbox" value={machineID[0].id} disabled >
                                            <p className="textbox_label">Mã máy</p>
                                        </TextBox>
                                    </div>
                                    <div >
                                        <TextBox className="textbox" value={machineID[0].machineName} disabled >
                                            <p className="textbox_label">Tên máy</p>
                                            <p className="underTextbox">
                                                {machineID[0].machineName}
                                            </p>
                                        </TextBox>
                                    </div>
                                    <div >
                                        <TextBox className="textbox" value={machineID[0].machineType} disabled >
                                            <p className="textbox_label">Loại máy</p>
                                            <p className="underTextbox">
                                                {machineID[0].machineType}
                                            </p>
                                        </TextBox>
                                    </div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Test chuỗi dạng json</div>
                                        <div className="dx-field-value">
                                            <TextBox value={stringTestQr} />
                                        </div>
                                    </div>
                                    <div className="btn_container">
                                        <Button onClick={setClose} className="btn_back">Trở lại</Button>
                                        <Button onClick={() => { setisDeclareInfo(true) }} className="btn_continue">Tiếp theo</Button>
                                        <Button onClick={checkedInfo} className="btn_continue">Chấm công</Button>
                                        {/* <Button
                                            className="btn_back"
                                            text="Trở lại"
                                            onClick={setClose}
                                            height={30}
                                            width={90}
                                            hint="Khai báo mã sản xuất"
                                        />
                                        <Button
                                            onClick={() => { setisDeclareInfo(true) }}
                                            className="btn_continue"
                                            text="Tiếp theo"
                                            width={120}
                                            height={30}
                                            hint="Khai báo công nhân"

                                        />
                                        <Button
                                            text="Chấm công  "
                                            onClick={checkedInfo}
                                            height={30}
                                            className="btn_continue"
                                            width={140}
                                        /> */}

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