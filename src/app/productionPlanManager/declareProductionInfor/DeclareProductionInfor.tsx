import React, { useEffect, useState } from "react";
import myImg from "../images/qrCode.jpg";
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


const ROUTING_PATH = "/declareProductionInfor";

export const DeclareProductionInfor = () => {
    return (
        <>
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

                        <div style={{ width: "40%", margin: "auto" }}>

                            <div style={{ textAlign: "center", margin: "2rem" }}>
                                <h4 style={{ margin: "1rem" }}>Hướng camera về phía mã QR</h4>
                                <img src={myImg} width={100} height={100} alt="" />

                            </div>


                            <div className="dx-fieldset">
                                <h4 style={{ margin: "1rem 0" }}>Thông tin WO</h4>

                                <div className="dx-field">
                                    <div className="dx-field-label">Mã WO</div>
                                    <div className="dx-field-value">
                                        <TextBox defaultValue="John Smith" />
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