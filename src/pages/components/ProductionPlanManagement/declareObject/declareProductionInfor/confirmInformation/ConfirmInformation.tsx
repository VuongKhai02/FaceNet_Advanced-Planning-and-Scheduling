import React, { useEffect, useState } from "react";
import { Button, TextBox } from "devextreme-react";
import { observer } from "mobx-react";

type ConfirmInformation = {
    isOpen: boolean;
    setClose?: () => void;
    p_id: string;
    p_cardName: string;
    m_name: string;
    w_name: string;
    nvl_id: string;
    nvl_name: string;
    nvl_quantity: string;
};

const fakeNvlBtpPlot = [
    {
        plotNumber: "WO_123",
        quantity: "10,000",
    },
];

export const ConfirmInformation: React.FC<ConfirmInformation> = observer(
    ({ isOpen = false, setClose, p_id, p_cardName, m_name = "", w_name = "", nvl_id, nvl_name, nvl_quantity }) => {
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

        const handStart = () => {
            alert("Bắt đầu");
        };

        const refresh = () => {
            nvlBtpPlot[0].plotNumber = "";
            nvlBtpPlot[0].quantity = "";
            let newObj = JSON.parse(JSON.stringify(nvlBtpPlot));
            setnvlBtpPlot(newObj);
            console.log(newObj);
        };
        let a = "";
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
                        nvl_id=''
                        nvl_name=''
                        nvl_quantity=''
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
                                    Bước 3: Xác nhận thông tin
                                </h2>
                                <div style={{ width: windowWidth < 600 ? "100%" : "40%", margin: "auto" }}>
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
                                    <div className='dx-fieldset'>
                                        <div>
                                            <h4 style={{ margin: "1rem 0" }}>Thông tin lệnh sản xuất</h4>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Mã sản xuất</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={p_id}> </TextBox>
                                                </div>
                                            </div>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Tên thẻ</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={p_cardName}> </TextBox>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ margin: "1rem 0" }}>Thông tin máy</h4>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Tên máy</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={m_name}> </TextBox>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ margin: "1rem 0" }}>Thông tin công nhân</h4>
                                            <div className='dx-field'>
                                                <div className='dx-field-label'>Tên công nhân</div>
                                                <div className='dx-field-value'>
                                                    <TextBox value={w_name}> </TextBox>
                                                </div>
                                            </div>
                                        </div>
                                        {p_id === "12345" ? (
                                            <div>
                                                <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                                <div className='dx-field'>
                                                    <div className='dx-field-label'>Mã NVL</div>
                                                    <div className='dx-field-value'>
                                                        <TextBox value={nvl_id}> </TextBox>
                                                    </div>
                                                </div>
                                                <div className='dx-field'>
                                                    <div className='dx-field-label'>Tên NVL</div>
                                                    <div className='dx-field-value'>
                                                        <TextBox value={nvl_name}> </TextBox>
                                                    </div>
                                                </div>
                                                <div className='dx-field'>
                                                    <div className='dx-field-label'>Số lượng</div>
                                                    <div className='dx-field-value'>
                                                        <TextBox value={nvl_quantity}> </TextBox>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 style={{ margin: "1rem 0" }}>Thông tin lô NVL/BTP</h4>
                                                <div className='dx-field'>
                                                    <div className='dx-field-label'>Mã hộp</div>
                                                    <div className='dx-field-value'>
                                                        <TextBox value='Công đoạn 2'> </TextBox>
                                                    </div>
                                                </div>
                                                <div className='dx-field'>
                                                    <div className='dx-field-label'>Công đoạn</div>
                                                    <div className='dx-field-value'>
                                                        <TextBox value='Công đoạn 2'> </TextBox>
                                                    </div>
                                                </div>
                                                <div className='dx-field'>
                                                    <div className='dx-field-label'>Số lượng</div>
                                                    <div className='dx-field-value'>
                                                        <TextBox value='Công đoạn 2'> </TextBox>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ display: "flex", gap: "10px", flexDirection: "row-reverse", padding: "2rem 0" }}>
                                            <Button
                                                text='Xác nhận'
                                                width={80}
                                                height={30}
                                                onClick={handStart}
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
                                                text='Trở lại'
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
                                        </div>
                                    </div>
                                </div>
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

export default ConfirmInformation;
