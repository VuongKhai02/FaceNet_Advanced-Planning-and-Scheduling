import React, { useContext, useEffect, useState } from "react";
import { TextBox } from "devextreme-react";
import { Button } from "antd"
import { observer } from "mobx-react";
import { ProductionID } from "../ProductionID/ProductionID";
import { GeneralInformation } from "../GeneralInformation/GeneralInformation";
import { infoMappedContext } from "../../DeclareProductionObject";
import "../../styleCommon.css"

type productionOrder = {
    isOpen: boolean,
    setClose?: () => void,
};

const fakeProductionInfo = [{
    id: "",
    cardName: "",
    status: "Chưa phát lệnh sản xuất",
    quantity: "",
    plot_number: "",
}]


export const DeclareProductionInfor: React.FC<productionOrder> = observer(({
    isOpen = false, setClose }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [productionInfo, setProductionInfo] = useState(fakeProductionInfo);
    const [infoMapped, setInfoMapped] = useContext(infoMappedContext);

    const refresh = () => {
        productionInfo[0].id = "";
        productionInfo[0].cardName = "";
        productionInfo[0].status = "";
        productionInfo[0].quantity = "";
        productionInfo[0].plot_number = "";
        let newObj = JSON.parse(JSON.stringify(productionInfo))
        setProductionInfo(newObj);
        infoMapped[0].pro_id = "";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
        document.getElementById("inputHide")?.focus();
    }

    // Function for update after qr again
    const updateDt = () => {
        productionInfo[0].id = "189";
        productionInfo[0].cardName = "Phôi mới";
        productionInfo[0].status = "Đã phát lệnh";
        productionInfo[0].quantity = "19,000";
        productionInfo[0].plot_number = "1";
        let newObj = JSON.parse(JSON.stringify(productionInfo))
        setProductionInfo(newObj);
        console.log(newObj)

        infoMapped[0].pro_id = "189";
        let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
        setInfoMapped(newInfoMpaped);
    }

    const checkedInfo = () => {
        console.log("Chấm công");
    }

    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const handleValueChange = (e) => {
        let input = e.target.value;
        if (input.includes("{")) {
            let productionObj = JSON.parse(input);
            productionInfo[0].id = infoMapped[0].pro_id = productionObj.id;
            productionInfo[0].cardName = productionObj.cardName;
            productionInfo[0].status = productionObj.status;
            productionInfo[0].quantity = productionObj.quantity;
            productionInfo[0].plot_number = productionObj.plot_number;

            let newMachineObj = JSON.parse(JSON.stringify(productionInfo))
            setProductionInfo(newMachineObj);

            let newInfoMpaped = JSON.parse(JSON.stringify(infoMapped))
            setInfoMapped(newInfoMpaped);

            setTimeout(() => {
                e.target.value = "";
            }, 1000);
        }
    }


    return (
        < >
            {isDeclareInfo ? <GeneralInformation isOpen={isDeclareInfo}
                setClose={() => setisDeclareInfo(false)}
                status={productionInfo[0].status}
                production_id={productionInfo[0].id}
                production_cardName={productionInfo[0].cardName}
            /> : <div >
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
                        }}>Khai báo lệnh sản xuất</h2>
                        <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>
                            <div className="qr_container">
                                <h2 className="qr_container_head" >Hướng camera về phía mã QR</h2>
                                <img src="assets/images/qrCode.svg" width={200} height={200} alt="" />
                                <div>
                                    <div>
                                        <input type="text" className="" name="a" id="inputHide" autoFocus onInput={handleValueChange} />
                                    </div>
                                    <Button onClick={refresh} className="btn_back">Quét lại</Button>
                                    <Button onClick={updateDt} className="btn_back">Update test</Button>
                                    {/* <Button
                                            className="btn_again"
                                            text="Quét lại"
                                            onClick={refresh}
                                            height={30}
                                            width={105}
                                        />
                                        <Button
                                            className="btn_again"
                                            text="Update test"
                                            onClick={updateDt}
                                            height={30}
                                            width={135}
                                        /> */}
                                </div>
                            </div>
                            <div className="dx-fieldset">
                                <h3 className="info_head">Thông tin lệnh sản xuất</h3>
                                <div>
                                    <TextBox className="textbox" value={productionInfo[0].id} disabled  >
                                        <p className="textbox_label" >Mã sản xuất</p>
                                    </TextBox>
                                </div>
                                <div >
                                    <TextBox className="textbox" value={productionInfo[0].cardName} disabled >
                                        <p className="textbox_label" >Tên thẻ</p>
                                        <p className="underTextbox">
                                            {productionInfo[0].cardName}
                                        </p>
                                    </TextBox>
                                </div>
                                <div>
                                    <TextBox className="textbox" value={productionInfo[0].status} disabled  >
                                        <p className="textbox_label"  >Trạng thái</p>
                                    </TextBox>
                                </div>
                                <div>
                                    <TextBox className="textbox" value={productionInfo[0].quantity} disabled  >
                                        <p className="textbox_label"  >Số lượng</p>
                                    </TextBox>
                                </div>
                                <div>
                                    <TextBox className="textbox" value={productionInfo[0].plot_number} disabled  >
                                        <p className="textbox_label"  >Số lô</p>
                                    </TextBox>
                                </div>
                                <div className="btn_container" >
                                    <Button onClick={setClose} className="btn_back">Trở lại</Button>
                                    <Button onClick={() => { setisDeclareInfo(true) }} className="btn_continue">Tiếp theo</Button>
                                    <Button onClick={checkedInfo} className="btn_continue">Chấm công</Button>
                                    {/* <Button
                                            className="btn_back"
                                            text="Trở lại"
                                            onClick={setClose}
                                            height={30}
                                            width={90}
                                            hint="Khai báo thông tin"
                                        />
                                        <Button
                                            text="Tiếp theo"
                                            onClick={() => { setisDeclareInfo(true) }}
                                            className="btn_continue"
                                            width={120}
                                            height={30}
                                            hint="Khai báo mã sản xuất"
                                        />
                                        <Button
                                            className="btn_continue"
                                            text="Chấm công"
                                            onClick={checkedInfo}
                                            height={30}
                                            width={140}
                                        /> */}
                                </div>
                            </div>
                        </div>

                    </div >
                    <div className="informer" style={{
                        backgroundColor: "#ffffff",
                        paddingLeft: 13
                    }}>
                    </div>
                </div >
            </div >
            }
        </>
    )
})

export default DeclareProductionInfor;