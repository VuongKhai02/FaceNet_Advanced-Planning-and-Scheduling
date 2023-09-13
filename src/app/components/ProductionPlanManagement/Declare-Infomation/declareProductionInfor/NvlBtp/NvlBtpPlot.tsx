import React, { useContext, useEffect, useState } from "react";
import { TextBox } from "devextreme-react";
import { Button } from "antd"
import { observer } from "mobx-react";
import ConfirmInformation from "../confirmInformation/ConfirmInformation";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"

type NvlBtpPlot = {
    isOpen: boolean,
    setClose?: () => void;
    production_id: string,
    production_cardName: string,
    machine_name: string,
    worker_name: string
    isNVL: boolean
};


const fakeNvlBtpPlot = [{
    id: "",
    plotName: "",
    quantity: ""
}]


const fakeNvlBtpPlot_barcode = [{
    id_box: "",
    stage: "",
    quantity_box: ""
}]

export const NvlBtpPlot: React.FC<NvlBtpPlot> = observer(({
    isOpen = false, setClose, production_id = "", production_cardName = "", machine_name = "", worker_name = "", isNVL }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [nvlBtpPlot, setnvlBtpPlot] = useState(fakeNvlBtpPlot);
    const [nvlBtpPlot_barcode, setnvlBtpPlot_barcode] = useState(fakeNvlBtpPlot_barcode);
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);


    const checkedInfo = () => {
        console.log("Chấm công");
    }

    const refresh = () => {
        nvlBtpPlot[0].id = "";
        nvlBtpPlot[0].plotName = "";
        nvlBtpPlot[0].quantity = "";
        let newObj = JSON.parse(JSON.stringify(nvlBtpPlot))
        setnvlBtpPlot(newObj);

        infoMapped[0].plot_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
        document.getElementById("inputHide")?.focus();
    }
    const handleValueChange = (e) => {
        let input = e.target.value;
        let productionObj = JSON.parse(input);
        if (input.includes("plotName")) {
            nvlBtpPlot[0].id = infoMapped[0].plot_id = productionObj.id;
            nvlBtpPlot[0].plotName = productionObj.plotName;
            nvlBtpPlot[0].quantity = productionObj.quantity;

            let newMachineObj = JSON.parse(JSON.stringify(nvlBtpPlot))
            setnvlBtpPlot(newMachineObj);

            let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
            setInfoMapped(newInfoMpaped);

            setTimeout(() => {
                e.target.value = "";
            }, 1000);
        }

        if (input.includes("id_box")) {
            nvlBtpPlot_barcode[0].id_box = infoMapped[0].plot_id = productionObj.id_box;
            nvlBtpPlot_barcode[0].stage = productionObj.stage;
            nvlBtpPlot_barcode[0].quantity_box = productionObj.quantity_box;

            let newMachineObj = JSON.parse(JSON.stringify(nvlBtpPlot_barcode))
            setnvlBtpPlot_barcode(newMachineObj);

            let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
            setInfoMapped(newInfoMpaped);

            setTimeout(() => {
                e.target.value = "";
            }, 1000);
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])


    return (
        <>
            {isDeclareInfo ? <ConfirmInformation

                isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)}
                production_id={production_id}
                production_cardName={production_cardName}
                machine_name={machine_name}
                worker_name={worker_name}
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
                                    <div className="qr_container">
                                        <h4 className="qr_container_head">Hướng camera về phía mã QR</h4>
                                        <img src="assets/images/qrCode.svg" width={200} height={200} alt="" />
                                        <div>
                                            <div>
                                                <input type="text" className="" name="a" id="inputHide" autoFocus onInput={handleValueChange} />
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
                                        <h3 className="info_head">Thông tin lô NVL/BTP</h3>
                                        <div>
                                            <TextBox className="textbox" value={nvlBtpPlot[0].id} disabled   >
                                                <p className="textbox_label" >Mã nguyên vật liệu</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={nvlBtpPlot[0].plotName} disabled   >
                                                <p className="textbox_label" >Tên nguyên vật liệu</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={nvlBtpPlot[0].quantity} disabled   >
                                                <p className="textbox_label" >Số lượng</p>
                                            </TextBox>
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
                                                hint="Khai báo công nhân"
                                            />
                                            <Button
                                                className="btn_continue"
                                                text="Tiếp theo"
                                                width={120}
                                                height={30}
                                                onClick={() => { setisDeclareInfo(true) }}
                                                hint="Xác nhận thông tin"
                                            />
                                            <Button
                                                text="Chấm công  "
                                                onClick={checkedInfo}
                                                height={30}
                                                width={140}
                                                className="btn_continue"
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                    <div className="qr_container">
                                        <h2 className="qr_container_head">Hướng camera về phía mã QR</h2>
                                        <img src="assets/images/barcode.svg" width={200} height={200} alt="" />
                                        <div>
                                            <Button onClick={refresh} className="btn_back">Quét lại</Button>
                                            {/* 
                                            <Button
                                                text="Quét lại"
                                                onClick={refresh}
                                                height={30}
                                                width={80}
                                                render={(buttonData) =>
                                                    <p style={{ color: 'rgba(255, 255, 255, 1)', background: 'rgba(189, 189, 189, 1)', margin: "1rem auto", padding: "1rem" }}>{buttonData.text}</p>
                                                }
                                            /> */}
                                        </div>
                                    </div>

                                    <div className="dx-fieldset">
                                        <h3 className="info_head">Thông tin lô NVL/BTP</h3>
                                        <div>
                                            <TextBox className="textbox" value={nvlBtpPlot_barcode[0].id_box} disabled   >
                                                <p className="textbox_label" >Mã hộp</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={nvlBtpPlot_barcode[0].stage} disabled   >
                                                <p className="textbox_label" >Tên công đoạn</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={nvlBtpPlot_barcode[0].quantity_box} disabled   >
                                                <p className="textbox_label" >Số lượng</p>
                                            </TextBox>
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
                                                hint="Khai báo công nhân"
                                            />
                                            <Button
                                                text="Tiếp theo"
                                                width={100}
                                                height={30}
                                                onClick={() => { setisDeclareInfo(true) }}
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
                                            /> */}
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