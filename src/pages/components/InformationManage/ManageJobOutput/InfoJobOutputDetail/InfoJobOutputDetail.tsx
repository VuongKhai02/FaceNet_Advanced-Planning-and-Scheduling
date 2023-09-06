import React from "react";
import { SelectBox, TextBox } from "devextreme-react";
import { observer } from "mobx-react";
import { Button } from "antd";

type InfoJobOutputDetailProps = {
    isOpen: boolean;
    setClose?: () => void;
};
export const InfoJobOutputDetail: React.FC<InfoJobOutputDetailProps> = observer(({ isOpen = false, setClose }) => {
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
                            Thông tin chi tiết Job output
                        </h5>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <table style={{ display: "flex", justifyContent: "space-between" }}>
                            <td style={{ marginLeft: 30 }}>
                                <p>Mã Job output</p>
                                <TextBox value='J01' key={"jobOutputCode"} id='jobOutputCode' width={300}></TextBox>
                                <p style={{ marginTop: 30 }}>Mã Job</p>
                                <TextBox value='J01-001' key={"jobCode"} id='jobCode'></TextBox>
                                <p style={{ marginTop: 30 }}>Trạng thái</p>
                                <SelectBox placeholder='Chọn' value={"Chuyển công đoạn"} key={"forwardStage"} id='forwardStage'></SelectBox>
                            </td>
                            <td>
                                <p>Tên Job output</p>
                                <TextBox value='WO-123' key={"jobOutputName"} id='jobOutputName' width={300}></TextBox>
                                <p style={{ marginTop: 30 }}>Tên Job</p>
                                <TextBox value='In offset : Ra bản' key={"jobName"} id='jobName'></TextBox>
                                <p style={{ marginTop: 30 }}>Mã công đoạn</p>
                                <TextBox value='CĐ02' key={"stageCode"} id='stageCode'></TextBox>
                            </td>
                            <td style={{ marginRight: 30 }}>
                                <p>Số lượng thẻ</p>
                                <TextBox value='100' width={300} key={"cardQuantity"} id='cardQuantity'></TextBox>
                                <p style={{ marginTop: 30 }}>Mã hộp</p>
                                <SelectBox value={"H02"} id='boxCode' key={"boxCode"} placeholder='Chọn'></SelectBox>
                                <p style={{ marginTop: 30 }}>In lưới</p>
                                <TextBox value={"In lưới"}></TextBox>
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
                            style={{ backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                        >Hủy bỏ</Button>
                        {/* <Button onClick={() => { }} style={{ backgroundColor: "#FF7A00", color: "#fff" }} >Cập nhật</Button> */}
                    </div>
                </div>
            </div>
        </>
    );
});

export default InfoJobOutputDetail;
