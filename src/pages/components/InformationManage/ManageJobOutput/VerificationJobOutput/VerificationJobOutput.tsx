import React from "react";
import { SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

type VerificationJobOutputProps = {
    isOpen: boolean;
    setClose?: () => void;
};
export const VerificationJobOutput: React.FC<VerificationJobOutputProps> = observer(({ isOpen = false, setClose }) => {
    const { t } = useTranslation("common");
    return (
        <>
            <div className='box__shadow-table-responsive'>
                <div className='table-responsive'>
                    <div
                        className='informer'
                        style={{
                            background: "#fff",
                            textAlign: "center",
                            paddingTop: 12,
                        }}>
                        <h5
                            className='name'
                            style={{
                                fontSize: 18,
                                marginBottom: 0,
                            }}>
                            Xác minh Job output
                        </h5>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <table style={{ display: "flex", justifyContent: "space-between" }}>
                            <td style={{ marginLeft: 30 }}>
                                <p>Trạng thái</p>
                                <TextBox value='Công đoạn cắt' key={"status"} id='status' width={300}></TextBox>
                                <p style={{ marginTop: 30 }}>Tên Job</p>
                                <TextBox value='In offset: Ra bản' key={"jobName"} id='jobName'></TextBox>
                                <p style={{ marginTop: 30 }}>Mã Job output</p>
                                <TextBox value={"J01"} key={"joboutputCode"} id='joboutputCode'></TextBox>
                            </td>
                            <td>
                                <p >Mã công đoạn</p>
                                <TextBox value='CĐ02' key={"stageCode"} id='stageCode'></TextBox>
                                <p style={{ marginTop: 30 }}>Mã hộp</p>
                                <TextBox value={"H02"} id='boxCode' key={"boxCode"} placeholder='Chọn'></TextBox>
                                <p style={{ marginTop: 30 }}>Tên Job output</p>
                                <TextBox value='WO-123' key={"jobOutputName"} id='jobOutputName' width={300}></TextBox>
                            </td>
                            <td style={{ marginRight: 30 }}>
                                <p>Mã Job</p>
                                <TextBox value={"J01-001"} key={'jobCode'} id={'jobCode'}></TextBox>
                                <p style={{ marginTop: 30 }}>Tên hộp</p>
                                <TextBox value='Hộp đựng BTP' width={300} key={"boxName"} id='boxName'></TextBox>
                                <p style={{ marginTop: 30 }}>Số lượng thẻ</p>
                                <TextBox value='100' width={300} key={"cardQuantity"} id='cardQuantity'></TextBox>
                            </td>
                        </table>
                    </div>
                    <div
                        className='toolbar'
                        style={{
                            marginTop: 35,
                            paddingBottom: 35,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            // background: "#ffffff",
                            borderRadius: "4px",
                            marginRight: 30,
                        }}>
                        <Button
                            onClick={setClose}
                            style={{ marginRight: "15px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                        >{t("common.cancel-button")}</Button>
                        <Button onClick={() => { }} style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }} >Cập nhật</Button>
                    </div>
                </div>
            </div>
        </>
    );
});

export default VerificationJobOutput;
