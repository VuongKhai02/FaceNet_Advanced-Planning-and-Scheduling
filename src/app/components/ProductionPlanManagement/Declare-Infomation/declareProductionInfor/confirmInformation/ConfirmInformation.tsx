import React, { useEffect, useState } from "react";
import { TextBox } from "devextreme-react";
import { Button } from "antd"
import { observer } from "mobx-react";

type ConfirmInformation = {
    isOpen: boolean,
    setClose?: () => void;
    production_id: string,
    production_cardNames: string,
    machine_name: string,
    worker_name: string,
    nvl_id: string,
    nvl_name: string,
    nvl_quantity: string,
    box_id: string,
    stage: string,
    box_quantity: string
    isNVL: boolean
};


export const ConfirmInformation: React.FC<ConfirmInformation> = observer(({
    isOpen = false, setClose, production_id, production_cardNames, machine_name = "", worker_name = "", nvl_id, nvl_name, nvl_quantity, box_id, stage, box_quantity, isNVL }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const handStart = () => {
        alert("Bắt đầu");
    }

    return (
        <>
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
                        }}>Bước 3: Xác nhận thông tin</h2>
                        <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                            <div className="dx-fieldset">
                                <div>
                                    <h3 className="info_head">Thông tin lệnh sản xuất</h3>
                                    <div >
                                        <TextBox className="textbox" value={production_id} disabled   >
                                            <p className="textbox_label" >Mã sản xuất</p>
                                        </TextBox>
                                    </div>
                                    <div >
                                        <TextBox className="textbox" value={production_cardNames} disabled   >
                                            <p className="textbox_label" >Tên thẻ</p>
                                            <p className="underTextbox">
                                                {production_cardNames}
                                            </p>
                                        </TextBox>

                                    </div>

                                </div>
                                <div>

                                    <h3 className="info_head">Thông tin máy</h3>
                                    <div>
                                        <TextBox className="textbox" value={machine_name} disabled   >
                                            <p className="textbox_label" >Tên máy</p>
                                            <p className="underTextbox">
                                                {machine_name}
                                            </p>
                                        </TextBox>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="info_head">Thông tin công nhân</h3>
                                    <div >
                                        <TextBox className="textbox" value={worker_name} disabled   >
                                            <p className="textbox_label" >Tên công nhân</p>
                                            <p className="underTextbox">
                                                {worker_name}
                                            </p>
                                        </TextBox>
                                    </div>
                                </div>
                                {isNVL == true ?
                                    <div>
                                        <h3 className="info_head">Thông tin lô NVL/BTP</h3>
                                        <div>
                                            <TextBox className="textbox" value={nvl_id} disabled   >
                                                <p className="textbox_label" >Mã NVL</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={nvl_name} disabled   >
                                                <p className="textbox_label" >Tên NVL</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={nvl_quantity} disabled   >
                                                <p className="textbox_label" >Số lượng</p>
                                            </TextBox>
                                        </div>
                                    </div> :
                                    <div>
                                        <h3 className="info_head">Thông tin lô NVL/BTP</h3>
                                        <div>
                                            <TextBox className="textbox" value={box_id} disabled   >
                                                <p className="textbox_label" >Mã hộp</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={stage} disabled   >
                                                <p className="textbox_label" >Công đoạn</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox className="textbox" value={box_quantity} disabled   >
                                                <p className="textbox_label" >Số lượng</p>
                                            </TextBox>
                                        </div>
                                    </div>}



                                <div style={{ display: "flex", gap: "10px", flexDirection: "row-reverse", padding: "2rem 0" }}>
                                    <Button onClick={handStart} className="btn_continue">Tiếp theo</Button>
                                    <Button onClick={setClose} className="btn_back">Trở lại</Button>
                                    {/* <Button
                                        text="Xác nhận"
                                        className="btn_continue"
                                        width={140}
                                        height={30}
                                        onClick={handStart}
                                        hint="Xác nhận thông tin"
                                    />
                                    <Button
                                        className="btn_back"
                                        text="Trở lại"
                                        onClick={setClose}
                                        height={30}
                                        width={90}
                                        hint="Khai báo lô"
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

        </>
    )
})


export default ConfirmInformation;