import React, { } from "react";
import { Button } from "devextreme-react";
import { observer } from "mobx-react";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import { Progress } from 'antd';

type ProgressWODetailProps = {
    isOpen: boolean,
    setClose?: () => void;

};

export const ProgressWODetailJob: React.FC<ProgressWODetailProps> = observer(({
    isOpen = false, setClose }) => {
    return (
        <>
            {
                <div>
                    <div className="table-responsive">
                        <div>
                            <table >
                                <td>
                                    <InfoRow label='Mã công đoạn' data='CĐ01' />
                                    <InfoRow label='Tên công đoạn' data='In offset' />
                                    <InfoRow label='Trạng thái' data='Đang sản xuất ' />
                                </td>
                            </table>
                            <table style={{ marginTop: 30, marginLeft: 20 }}>
                                <td style={{ border: '1px solid gray' }} >
                                    <p style={{ display: "flex", justifyContent: "center" }}><h4>In offset: In UV</h4></p>
                                    <InfoRow label='Mã công nhân' data='CĐ01' />
                                    <InfoRow label='Tên công nhân' data='Luis' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Sản lượng sản xuất dự kiến' data='2000' />
                                    <InfoRow label='Sản lượng sản xuất thức tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={90} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} />
                                    </div>
                                </td>
                                <td style={{ border: '1px solid gray' }}>
                                    <p style={{ display: "flex", justifyContent: "center" }}><h4>In offset: Ra bản</h4></p>
                                    <InfoRow label='Mã công nhân' data='CĐ01' />
                                    <InfoRow label='Tên công nhân' data='Luis' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Sản lượng sản xuất dự kiến' data='2000' />
                                    <InfoRow label='Sản lượng sản xuất thức tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={70} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} strokeColor={'orange'} />
                                    </div>
                                </td>
                                <td style={{ border: '1px solid gray' }}>
                                    <p style={{ display: "flex", justifyContent: "center", marginTop: 30 }}><h4>In offset: Ra film + Chụp bản</h4></p>
                                    <InfoRow label='Mã công nhân' data='CĐ01' />
                                    <InfoRow label='Tên công nhân' data='Luis' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Sản lượng sản xuất dự kiến' data='2000' />
                                    <InfoRow label='Sản lượng sản xuất thức tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={10} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} strokeColor={'red'} />
                                    </div>
                                </td>
                            </table>
                        </div>
                        <div
                            className="toolbar"
                            style={{
                                marginTop: 10,
                                float: "right",
                                // background: "#ffffff",
                                padding: "8px",
                                borderRadius: "4px",
                            }}
                        >
                            <Button
                                text="Trở lại"
                                onClick={setClose}
                                style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333", width: 120 }}
                            />
                        </div>
                    </div>
                </div >
            }
        </>
    )
})

export default ProgressWODetailJob;