import React, { useEffect, useState } from "react";
// import "./DeclareProductionObject.css"
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import { ProductionID } from "../ProductionID/ProductionID";
import qr_img from "../../images/qrCode.svg";

type productionOrder = {
    isOpen: boolean;
    setClose?: () => void;
};

const fakeProductionInfo = [
    {
        id: "12345",
        cardName: "Phôi Thẻ MC Tita cashback debit, VP Bank",
        status: "Chưa phát lệnh sản xuất",
        quantity: "15,000",
    },
];

export const DeclareProductionInfor: React.FC<productionOrder> = observer(({ isOpen = false, setClose }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [productionInfo, setProductionInfo] = useState(fakeProductionInfo);

    const handleChangeScreen = () => {
        setisDeclareInfo(true);
    };

    const refresh = () => {
        productionInfo[0].id = "";
        productionInfo[0].cardName = "";
        productionInfo[0].status = "";
        productionInfo[0].quantity = "";
        let newObj = JSON.parse(JSON.stringify(productionInfo));
        setProductionInfo(newObj);
        console.log(newObj);
    };

    // Function for update after qr again
    const updateDt = () => {
        productionInfo[0].id = "1";
        productionInfo[0].cardName = "a";
        productionInfo[0].status = "b";
        productionInfo[0].quantity = "2";
        let newObj = JSON.parse(JSON.stringify(productionInfo));
        setProductionInfo(newObj);
        console.log(newObj);
    };

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", updateDimension);
    }, []);

    return (
        <>
            {isDeclareInfo ? (
                <ProductionID isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)} status={fakeProductionInfo[0].status} />
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
                                Khai báo lệnh sản xuất
                            </h2>
                            <div style={{ width: windowWidth < 600 ? "100%" : "40%", margin: "auto" }}>
                                <div style={{ textAlign: "center", margin: "2rem" }}>
                                    <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                    <img src={qr_img} width={200} height={200} alt='' />
                                </div>
                                <div className='dx-fieldset'>
                                    <h4 style={{ margin: "1rem 0" }}>Thông tin lệnh sản xuất</h4>
                                    <div className='dx-field'>
                                        <div className='dx-field-label'>Mã sản xuất</div>
                                        <div className='dx-field-value'>
                                            <TextBox value={productionInfo[0].id}> </TextBox>
                                        </div>
                                    </div>
                                    <div className='dx-field'>
                                        <div className='dx-field-label'>Tên thẻ</div>
                                        <div className='dx-field-value'>
                                            <TextBox value={productionInfo[0].cardName}></TextBox>
                                        </div>
                                    </div>
                                    <div className='dx-field'>
                                        <div className='dx-field-label'>Trạng thái</div>
                                        <div className='dx-field-value'>
                                            <TextBox value={productionInfo[0].status} />
                                        </div>
                                    </div>
                                    <div className='dx-field'>
                                        <div className='dx-field-label'>Số lượng</div>
                                        <div className='dx-field-value'>
                                            <TextBox value={productionInfo[0].quantity} />
                                        </div>
                                    </div>
                                    <div style={{ gap: "10px", display: "flex", flexDirection: "row-reverse", padding: "2rem 0" }}>
                                        <Button
                                            text='Tiếp theo'
                                            onClick={handleChangeScreen}
                                            width={80}
                                            height={30}
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
                                        />
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
});

export default DeclareProductionInfor;
