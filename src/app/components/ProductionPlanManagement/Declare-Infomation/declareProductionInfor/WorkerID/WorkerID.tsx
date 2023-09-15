import React, { useContext, useEffect, useState } from "react";
import { TextBox } from "devextreme-react";
import { Button } from "antd"
import { observer } from "mobx-react";
import { NvlBtpPlot } from "../NvlBtp/NvlBtpPlot";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"
import axios from "axios";

import { useMainStore } from "@haulmont/jmix-react-core";

type WorkerID = {
    isOpen: boolean,
    setClose?: () => void;
    production_id: string,
    production_cardName: string,
    machine_name: string,
};

const fakeWorkerID = [{
    id: "",
    workerName: "",
    group: "",
}]

const stringTestQr = 'FN001'

export const WorkerID: React.FC<WorkerID> = observer(({
    isOpen = false, setClose, production_id, production_cardName, machine_name = "" }) => {
    const mainStore = useMainStore();

    const [isNVL, setIsNVL] = React.useState<boolean>(true);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [workerID, setworkerID] = useState(fakeWorkerID)
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    // Kiểm tra xem khai báo NVL hay khai báo Hộp
    const checkIsNVL = (_isNVL) => {
        setIsNVL(_isNVL);
        console.log("NVL", isNVL);
        setisDeclareInfo(true);

    }

    const checkedInfo = () => {
        console.log("Chấm công");
    }

    const refresh = () => {
        workerID[0].id = "";
        workerID[0].workerName = "";
        workerID[0].group = "";
        let newObj = JSON.parse(JSON.stringify(workerID))
        setworkerID(newObj);

        infoMapped[0].worker_id = "";
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

            },
            "common": "",
            "sortProperty": "employeeCode",
            "sortOrder": "ASC"
        }
        axios.post("http://222.252.25.37:10068" + '/api/employee', request, { headers })
            .then(response => {
                if (response.status === 200) {
                    if (e.target.value.includes("F")) {
                        let workerObj = response.data.data.filter(x => x.employeeCode == e.target.value);
                        console.log(workerObj)
                        if (workerObj.length == 0) {
                            alert("Không tồn tại")
                        }
                        else {
                            workerID[0].id = infoMapped[0].worker_id = workerObj[0].employeeCode;
                            workerID[0].workerName = workerObj[0].employeeName;
                            workerID[0].group = workerObj[0].teamGroup;

                            let newMachineObj = JSON.parse(JSON.stringify(workerID))
                            setworkerID(newMachineObj);

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
            {isDeclareInfo ? <NvlBtpPlot isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)} production_id={production_id}
                production_cardName={production_cardName} machine_name={machine_name} worker_name={workerID[0].workerName} isNVL={isNVL} /> :
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
                            }}>Bước 2: Khai báo công nhân</h2>
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

                                        {/* <Button
                                            className="btn_again"
                                            text="Quét lại"
                                            onClick={refresh}
                                            height={30}
                                            width={105}
                                        /> */}
                                    </div>
                                </div>
                                <div className="dx-fieldset">
                                    <h3 className="info_head">Thông tin công nhân</h3>
                                    <div>
                                        <TextBox className="textbox" value={workerID[0].id} disabled >
                                            <p className="textbox_label">Mã công nhân</p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox className="textbox" value={workerID[0].workerName} disabled >
                                            <p className="textbox_label">Tên công nhân</p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox className="textbox" value={workerID[0].group} disabled >
                                            <p className="textbox_label">Nhóm/tổ</p>
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
                                        <Button onClick={() => { checkIsNVL(true) }} className="btn_continue">{windowWidth < 600 ? "Qr" : "Quét Qr"}</Button>
                                        <Button onClick={() => { checkIsNVL(false) }} className="btn_continue">{windowWidth < 600 ? "Barcode" : "Quét Bar code"}</Button>
                                        <Button onClick={checkedInfo} className="btn_continue">Chấm công</Button>
                                        {/* <Button
                                            className="btn_back"
                                            text="Trở lại"
                                            onClick={setClose}
                                            height={30}
                                            width={90}
                                            hint="Khai báo máy"
                                        />
                                        <Button
                                            className="btn_continue"
                                            height={30}
                                            text={windowWidth < 600 ? "Qr" : "Quét Qr"}
                                            width={windowWidth < 600 ? 80 : 110}
                                            onClick={() => { checkIsNVL(true) }}
                                            hint="Khai báo lô"
                                        />
                                        <Button
                                            className="btn_continue"
                                            text={windowWidth < 600 ? "Barcode" : "Quét Bar code"}
                                            width={windowWidth < 600 ? 80 : 160}
                                            height={30}
                                            onClick={() => { checkIsNVL(false) }}
                                            hint="Khai báo lô"
                                        />
                                        <Button
                                            text="Chấm công  "
                                            onClick={checkedInfo}
                                            className="btn_continue"
                                            height={30}
                                            width={140}
                                            hint="Khai báo thông tin"
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


export default WorkerID;