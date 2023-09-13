import React, { useContext, useEffect, useState } from "react";
import { Popup, TextBox } from "devextreme-react";
import { Button } from "antd"
import { observer } from "mobx-react";
import { MachineID } from "../MachineID/MachineID";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"

type ProductionID = {
    isOpen: boolean,
    setClose?: () => void;
    status: string,
    production_id: string,
    production_cardName: string,
};

const fakeProductionID = [{
    id: "",
    cardName: "",
    status: "",
    quantity: ""
}]

export const ProductionID: React.FC<ProductionID> = observer(({
    isOpen = false, setClose, production_id = "", production_cardName = "", status }) => {
    const [popupVisible, setPopupVisible] = React.useState<boolean>(false);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [productionId, setproductionId] = useState(fakeProductionID);
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);

    const handleChang = () => {
        setisDeclareInfo(true);
        setPopupVisible(false);
    }

    const togglePopup = () => {
        setPopupVisible(!popupVisible)
    }

    const checkedInfo = () => {
        alert("Chấm công");
    }

    const refresh = () => {
        productionId[0].id = "";
        productionId[0].cardName = "";
        productionId[0].status = "";
        productionId[0].quantity = "";
        let newObj = JSON.parse(JSON.stringify(productionId))
        setproductionId(newObj);

        infoMapped[0].pro_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
        document.getElementById("inputHide")?.focus();
    }

    const handleValueChange = (e) => {
        let input = e.target.value;
        if (input.includes("{")) {
            let productionObj = JSON.parse(input);
            productionId[0].id = infoMapped[0].pro_id = productionObj.id;
            productionId[0].cardName = productionObj.cardName;
            productionId[0].status = productionObj.status;
            productionId[0].quantity = productionObj.quantity;

            let newMachineObj = JSON.parse(JSON.stringify(productionId))
            setproductionId(newMachineObj);

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

    const renderPopUpContent = () => {
        return (
            <>
                <div style={{ padding: "1rem" }}>
                    <div style={{ textAlign: "center" }}>
                        <img src="assets/icons/warning.svg" alt="" />
                        <h4 style={{ color: "rgba(255, 122, 0, 1)" }}>Xác nhận thực hiện sản xuất?</h4>
                    </div>
                    <h5 style={{ paddingTop: "1.5rem" }}>Hiện tại WO này chưa đc tổ trưởng cho phép tiến hành sản xuất. <br />
                        Bạn có chắc muốn tiếp tục thực hiện không?
                    </h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "40%", margin: "auto", paddingTop: "2rem", gap: "10px" }}>
                        <Button onClick={setClose} className="btn_back">Hủy bỏ</Button>
                        <Button onClick={handleChang} className="btn_continue">Xác nhận</Button>
                        {/* <Button
                            onClick={setClose}
                            text="Hủy bỏ"
                            height={30}
                            width={100}
                            render={(buttonData) =>
                                <p style={{ fontSize: "18px", color: '#fff', background: '#ccc', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                            }
                            hint="Khai báo lệnh sản xuất"
                        />

                        <Button
                            onClick={handleChang}
                            text="Xác nhận"
                            width={100}
                            height={30}
                            render={(buttonData) =>
                                <p style={{ fontSize: "18px", color: '#fff', background: 'rgba(255, 122, 0, 1)', margin: "1rem auto", padding: "1.9rem" }}>{buttonData.text}</p>
                            }
                            hint="Khai báo máy"

                        /> */}
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            {isDeclareInfo ? <MachineID isOpen={isDeclareInfo} setClose={() => setisDeclareInfo(false)}
                production_id={production_id}
                production_cardName={production_cardName}
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
                            }}>Khai báo mã sản xuất</h2>

                            <Popup
                                visible={popupVisible}
                                hideOnOutsideClick={true}
                                onHiding={togglePopup}
                                contentRender={renderPopUpContent}
                                height={windowWidth < 600 ? '30vh' : '33vh'}
                                showTitle={false}
                                width={windowWidth < 600 ? '80vw' : '28vw'}
                            />
                            <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                                <div className="qr_container">
                                    <h2 className="qr_container_head">Hướng camera về phía mã QR</h2>
                                    <img src="assets/images/qrCode.svg" width={200} height={200} alt="" />
                                    <div>
                                        <div>
                                            <input type="text" className="" name="a" id="inputHide" autoFocus onInput={handleValueChange} />
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
                                    <h3 className="info_head">Thông tin mã sản xuất</h3>
                                    <div>
                                        <TextBox className="textbox" value={productionId[0].id} disabled  >
                                            <p className="textbox_label">Mã sản xuất</p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox className="textbox" value={productionId[0].cardName} disabled  >
                                            <p className="textbox_label">Tên thẻ</p>
                                            <p className="underTextbox">
                                                {productionId[0].cardName}
                                            </p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox className="textbox" value={productionId[0].status} disabled  >
                                            <p className="textbox_label">Trạng thái</p>
                                        </TextBox>
                                    </div>
                                    <div>
                                        <TextBox className="textbox" value={productionId[0].quantity} disabled  >
                                            <p className="textbox_label">Số lượng</p>
                                        </TextBox>
                                    </div>
                                    <div className="btn_container">
                                        <Button onClick={setClose} className="btn_back">Trở lại</Button>
                                        <Button onClick={status === "Chưa phát lệnh sản xuất" ? togglePopup : () => { setisDeclareInfo(true) }} className="btn_continue">Tiếp theo</Button>
                                        <Button onClick={checkedInfo} className="btn_continue">Chấm công</Button>
                                        {/* <Button
                                            className="btn_back"
                                            text="Trở lại"
                                            onClick={setClose}
                                            height={30}
                                            width={90}
                                            hint="Khai báo lệnh sản xuất"
                                        />
                                        <Button
                                            className="btn_continue"
                                            text="Tiếp theo"
                                            width={120}
                                            height={30}
                                            onClick={status === "Chưa phát lệnh sản xuất" ? togglePopup : () => { setisDeclareInfo(true) }}
                                        />
                                        <Button
                                            text="Chấm công"
                                            className="btn_continue"
                                            onClick={checkedInfo}
                                            height={30}
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


export default ProductionID;




