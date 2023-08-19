import React, { useEffect, useState } from "react";
import myImg from "../images/qrCode.jpg";
import warning_img from "../images/warning.svg";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    MasterDetail, Editing, Form
} from "devextreme-react/data-grid";
import axios from "axios";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { IWarning } from "../../shared/model/Warning.model";
import { PLANNING_API_URL } from "../../../config";
import { ImportOrder } from "../../import/ImportOrder";
import { customizeColor, getColor } from "../../../utils/utils";
// import TechFormListDetail from "./TechFormListDetail";
import { Tooltip } from "devextreme-react/tooltip";
import { Tag } from "antd";
import { Item } from "devextreme-react/form";
import notify from "devextreme/ui/notify";
// import TechProcedure from "./TechFormNewAdd/TechProcedure/TechProcedure";
import { ImportTechForm } from "../../import/ImportTechForm";
import { useRef } from 'react';


const ROUTING_PATH = "/declareProductionInfor";


export const DeclareProductionInfor = () => {


    const [popupVisible, setPopupVisible] = useState(false);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    // const windowWidth2 = useRef(window.innerWidth);
    const togglePopup = () => {
        setPopupVisible(!popupVisible)
    }
    const isAccpetPopup = () => {
        alert("Xác nhận");
        console.log("with", windowWidth);
        if (windowWidth < 890) {
            console.log("with nhỏ hơn ")
        }
    }

    console.log("with", windowWidth);


    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);

    }, [])

    const renderContent = () => {
        return (
            <>
                <div style={{ padding: "1rem" }}>
                    <div style={{ textAlign: "center" }}>
                        <img src={warning_img} alt="" />
                        <h4 style={{ color: "rgba(255, 122, 0, 1)" }}>Xác nhận thực hiện sản xuất?</h4>
                    </div>
                    <h5 style={{ paddingTop: "1.5rem" }}>Hiện tại WO này chưa đc tổ trưởng cho phép tiến hành sản xuất.
                        Bạn có chắc muốn tiếp tục thực hiện không?
                    </h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "40%", margin: "auto", paddingTop: "2rem" }}>
                        <Button
                            onClick={isAccpetPopup}
                            text="Xác nhận"
                            width={80}
                            height={30}
                            render={(buttonData) =>
                                <i style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', padding: '.5rem 2rem' }}>{buttonData.text}</i>
                            }
                        />
                        <Button
                            onClick={togglePopup}
                            text="Hủy bỏ"
                            height={30}
                            width={80}
                            render={(buttonData) =>
                                <i style={{ color: '#fff', background: '#ccc', padding: '.5rem 2rem' }}>{buttonData.text}</i>
                            }
                        />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {/* Khai báo WO */}
            <div>
                <div className="table-responsive">
                    <div className="informer" style={{
                        background: "#fff",
                        textAlign: "left",
                        paddingTop: 12
                    }}>
                        <h2 className="name" style={{
                            marginBottom: 0,
                            fontWeight: 700,
                            margin: "0 0 .6rem .5rem"
                        }}>Khai báo WO</h2>
                        <Popup
                            visible={popupVisible}
                            hideOnOutsideClick={true}
                            onHiding={togglePopup}
                            contentRender={renderContent}
                            height={windowWidth < 600 ? '30vh' : '30.5vh'}
                            showTitle={false}
                            width={windowWidth < 600 ? '80vw' : '28vw'}
                        />
                        <div style={{ width: windowWidth < 600 ? '100%' : '40%', margin: "auto" }}>

                            <div style={{ textAlign: "center", margin: "2rem" }}>
                                <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                <img src={myImg} width={100} height={100} alt="" />
                            </div>
                            <div className="dx-fieldset">
                                <h4 style={{ margin: "1rem 0" }}>Thông tin WO</h4>
                                <div className="dx-field">
                                    <div className="dx-field-label">Mã WO</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Mã sản xuất</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Tên thẻ</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Trạng thái</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Số lượng</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem" }}>
                                    <Button
                                        text="Tiếp theo"
                                        width={80}
                                        height={30}
                                        onClick={togglePopup}
                                        render={(buttonData) =>
                                            <i style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', padding: '.5rem 2rem' }}>{buttonData.text}</i>
                                        }
                                    />
                                    <Button
                                        text="Quét lại"
                                        height={30}
                                        width={80}
                                        render={(buttonData) =>
                                            <i style={{ color: '#fff', background: '#ccc', padding: '.5rem 2rem' }}>{buttonData.text}</i>
                                        }
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
            {/* End Khai báo WO */}
            {/* Khai báo công nhân */}
            {/* <div>
                <div className="table-responsive">
                    <div className="informer" style={{
                        background: "#fff",
                        textAlign: "left",
                        paddingTop: 12
                    }}>
                        <h2 className="name" style={{
                            marginBottom: 0,
                            fontWeight: 700,
                            margin: "0 0 .6rem .5rem"
                        }}>Khai báo công nhân</h2>
                        <Popup
                            visible={popupVisible}
                            hideOnOutsideClick={true}
                            onHiding={togglePopup}
                            contentRender={renderContent}
                            height="27vh"
                            showTitle={false}
                            width="28vw"
                        />
                        <div style={{ width: "40%", margin: "auto" }}>

                            <div style={{ textAlign: "center", margin: "2rem" }}>
                                <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                <img src={myImg} width={100} height={100} alt="" />
                            </div>
                            <div className="dx-fieldset">
                                <h4 style={{ margin: "1rem 0" }}>Thông tin công nhân</h4>
                                <div className="dx-field">
                                    <div className="dx-field-label">Mã công nhân</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Tên công nhân</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Nhóm/tổ</div>
                                    <div className="dx-field-value">
                                        <TextBox />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem" }}>
                                    <Button
                                        text="Tiếp theo"
                                        width={80}
                                        height={30}
                                        onClick={togglePopup}
                                        render={(buttonData) =>
                                            <i style={{ color: '#fff', background: 'rgba(255, 122, 0, 1)', padding: '.5rem 2rem' }}>{buttonData.text}</i>
                                        }
                                    />
                                    <Button
                                        text="Quét lại"
                                        height={30}
                                        width={80}
                                        render={(buttonData) =>
                                            <i style={{ color: '#fff', background: '#ccc', padding: '.5rem 2rem' }}>{buttonData.text}</i>
                                        }
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
            </div> */}
            {/* End Khai báo Công nhân */}
        </>
    )
}


registerScreen({
    caption: "Khai báo ",
    component: DeclareProductionInfor,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "declareProductionInfor"
});

export default DeclareProductionInfor;