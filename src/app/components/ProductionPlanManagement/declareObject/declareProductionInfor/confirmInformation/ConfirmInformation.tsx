import React, { useEffect, useState } from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";

import { observer } from "mobx-react";

type ConfirmInformation = {
    isOpen: boolean,
    setClose?: () => void;
    p_id: string,
    p_cardName: string,
    m_name: string,
    w_name: string,
    nvl_id: string,
    nvl_name: string,
    nvl_quantity: string,
    isNVL: boolean
};


export const ConfirmInformation: React.FC<ConfirmInformation> = observer(({
    isOpen = false, setClose, p_id, p_cardName, m_name = "", w_name = "", nvl_id, nvl_name, nvl_quantity, isNVL }) => {
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
                            {/* <div style={{ textAlign: "center", margin: "2rem" }}>
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
                                </div> */}
                            <div className="dx-fieldset">
                                <div>
                                    <h4 style={{ margin: "1rem 0" }}>Thông tin lệnh sản xuất</h4>
                                    <div >
                                        <TextBox value={p_id} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã sản xuất</p>
                                        </TextBox>
                                    </div>
                                    <div className="textbox">
                                        <TextBox className="textbox" value={p_cardName} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên thẻ</p>
                                            <p className="underTextbox">
                                                {p_cardName}
                                            </p>
                                        </TextBox>

                                    </div>

                                </div>
                                <div>

                                    <h4 style={{ margin: "1rem 0" }}>Thông tin máy</h4>
                                    <div className="textbox">
                                        <TextBox value={m_name} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên máy</p>
                                            <p className="underTextbox">
                                                {m_name}
                                            </p>
                                        </TextBox>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ margin: "1rem 0" }}>Thông tin công nhân</h4>
                                    <div className="textbox">
                                        <TextBox value={w_name} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                            <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên công nhân</p>
                                            <p className="underTextbox">
                                                {w_name}
                                            </p>
                                        </TextBox>
                                    </div>
                                </div>
                                {isNVL == true ?
                                    <div>
                                        <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                        <div>
                                            <TextBox value={nvl_id} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã NVL</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={nvl_name} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Tên NVL</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={nvl_quantity} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Số lượng</p>
                                            </TextBox>
                                        </div>
                                    </div> :
                                    <div>
                                        <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                        <div>
                                            <TextBox value={w_name} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Mã hộp</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={nvl_name} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Công đoạn</p>
                                            </TextBox>
                                        </div>
                                        <div>
                                            <TextBox value={w_name} disabled style={{ fontSize: "18px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)", position: "relative", padding: ".2rem 0 .2rem 13rem", borderRadius: "10px", border: "none", marginBottom: "1rem" }}  >
                                                <p style={{ position: "absolute", color: "rgba(0, 90, 111, 1)", left: "9px", fontWeight: "500", top: "10px" }}>Số lượng</p>
                                            </TextBox>
                                        </div>
                                    </div>}



                                <div style={{ display: "flex", gap: "10px", flexDirection: "row-reverse", padding: "2rem 0" }}>
                                    <Button
                                        text="Xác nhận"
                                        width={100}
                                        height={30}
                                        onClick={handStart}
                                        render={(buttonData) =>
                                            <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                                        }
                                        hint="Xác nhận thông tin"
                                    />
                                    <Button
                                        text="Trở lại  "
                                        onClick={setClose}
                                        height={30}
                                        width={100}
                                        render={(buttonData) =>
                                            <p style={{ fontSize: "18px", color: 'rgba(255, 255, 255, 1)', background: 'rgba(189, 189, 189, 1)', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                                        }
                                        hint="Khai báo lô"
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

        </>
    )
})


export default ConfirmInformation;