import React, { useEffect, useState } from "react";
import { Button, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import qr_img from "../../images/qrCode.svg";
import ConfirmInformation from "../confirmInformation/ConfirmInformation";

type NvlBtpPlot = {
    isOpen: boolean;
    setClose?: () => void;
    p_id: string;
    p_cardName: string;
    m_name: string;
    w_name: string;
};


const fakeNvlBtpPlot = [
    {
        id: "WO_123_L01",
        plotName: "WO_123",
        quantity: "10,000",
    },
];

export const NvlBtpPlot: React.FC<NvlBtpPlot> = observer(
    ({ isOpen = false, setClose, p_id = "", p_cardName = "", m_name = "", w_name = "" }) => {
        const [windowWidth, setwindowWidth] = useState(window.innerWidth);
        const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
        const [nvlBtpPlot, setnvlBtpPlot] = useState(fakeNvlBtpPlot);

        useEffect(() => {
            const updateDimension = () => {
                setwindowWidth(window.innerWidth);
            };
            window.addEventListener("resize", updateDimension);
        }, []);

        const checkedInfo = () => {
            console.log("Chấm công");
        };

        const handleChangeScreen = () => {
            setisDeclareInfo(true);
        };

        const refresh = () => {
            nvlBtpPlot[0].id = "";
            nvlBtpPlot[0].plotName = "";
            nvlBtpPlot[0].quantity = "";
            let newObj = JSON.parse(JSON.stringify(nvlBtpPlot));
            setnvlBtpPlot(newObj);
            console.log(newObj);
        };
        return (
            <>
                {isDeclareInfo ? (
                    <ConfirmInformation
                        isOpen={isDeclareInfo}
                        setClose={() => setisDeclareInfo(false)}
                        p_id={p_id}
                        p_cardName={p_cardName}
                        m_name={m_name}
                        w_name={w_name}
                        nvl_id={nvlBtpPlot[0].id}
                        nvl_name={nvlBtpPlot[0].plotName}
                        nvl_quantity={nvlBtpPlot[0].quantity}
                    />
                ) : (
                    <div>
                        <div className='table-responsive'>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 12,
                                }}>
                                <h2
                                    className='name'
                                    style={{
                                        marginBottom: 0,
                                        fontWeight: 700,
                                        margin: "0 0 .6rem .5rem",
                                    }}>
                                    Bước 3: Khai báo lô NVL/BTP
                                </h2>

                                {p_id === "12345" ? (
                                    <div style={{ width: windowWidth < 600 ? "100%" : "40%", margin: "auto" }}>
                                        <div style={{ textAlign: "center", margin: "2rem" }}>
                                            <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                            <img src={qr_img} width={200} height={200} alt='' />
                                            <div>
                                                <Button
                                                    text='Quét lại'
                                                    onClick={refresh}
                                                    height={30}
                                                    width={80}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "rgba(255, 255, 255, 1)",
                                                                background: "rgba(189, 189, 189, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className='dx-fieldset'>
                                            <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Mã nguyên vật liệu</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={fakeNvlBtpPlot[0].id}> </TextBox>
                                                </div>
                                            </div>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Tên nguyên vật liệu</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={fakeNvlBtpPlot[0].plotName}> </TextBox>
                                                </div>
                                            </div>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Số lượng</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={fakeNvlBtpPlot[0].quantity} />
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem 0" }}>
                                                <Button
                                                    text='Trở lại  '
                                                    onClick={setClose}
                                                    height={30}
                                                    width={80}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "rgba(255, 255, 255, 1)",
                                                                background: "rgba(189, 189, 189, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1.2rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                    hint='Khai báo công nhân'
                                                />
                                                <Button
                                                    text='Tiếp theo'
                                                    width={80}
                                                    height={30}
                                                    onClick={handleChangeScreen}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "#fff",
                                                                background: "rgba(255, 122, 0, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                    hint='Xác nhận thông tin'
                                                />
                                                <Button
                                                    text='Chấm công  '
                                                    onClick={checkedInfo}
                                                    height={30}
                                                    width={80}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "#fff",
                                                                background: "rgba(255, 122, 0, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1.2rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ width: windowWidth < 600 ? "100%" : "40%", margin: "auto" }}>
                                        <div style={{ textAlign: "center", margin: "2rem" }}>
                                            <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                            <img src={qr_img} width={200} height={200} alt='' />
                                            <div>
                                                <Button
                                                    text='Quét lại'
                                                    onClick={refresh}
                                                    height={30}
                                                    width={80}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "rgba(255, 255, 255, 1)",
                                                                background: "rgba(189, 189, 189, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className='dx-fieldset'>
                                            <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Mã hộp</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value='công đoạn 2'> </TextBox>
                                                </div>
                                            </div>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Số lượng</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value='công đoạn 2'> </TextBox>
                                                </div>
                                            </div>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Tên công đoạn</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value='công đoạn 2' />
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem 0" }}>
                                                <Button
                                                    text='Trở lại  '
                                                    onClick={setClose}
                                                    height={30}
                                                    width={80}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "rgba(255, 255, 255, 1)",
                                                                background: "rgba(189, 189, 189, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1.2rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                    hint='Khai báo công nhân'
                                                />
                                                <Button
                                                    text='Tiếp theo'
                                                    width={80}
                                                    height={30}
                                                    onClick={handleChangeScreen}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "#fff",
                                                                background: "rgba(255, 122, 0, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                    hint='Xác nhận thông tin'
                                                />
                                                <Button
                                                    text='Chấm công  '
                                                    onClick={checkedInfo}
                                                    height={30}
                                                    width={80}
                                                    render={(buttonData) => (
                                                        <p
                                                            style={{
                                                                color: "#fff",
                                                                background: "rgba(255, 122, 0, 1)",
                                                                margin: "1rem auto",
                                                                padding: "1.2rem",
                                                            }}>
                                                            {buttonData.text}
                                                        </p>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className='informer'
                                style={{
                                    backgroundColor: "#ffffff",
                                    paddingLeft: 13,
                                }}></div>
                        </div>
                    </div>
                )}
            </>
        );
    },
);

export default NvlBtpPlot;
