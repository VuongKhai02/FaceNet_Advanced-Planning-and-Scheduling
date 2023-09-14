import React from "react";
import { observer } from "mobx-react";
import InfoRow from "../../../../../../shared/components/InfoRow/InfoRow";
import { Progress, Button } from "antd";
import { useTranslation } from "react-i18next";

type ProgressWODetailProps = {
    isOpen: boolean;
    setClose?: () => void;
};

export const ProgressWODetailJob: React.FC<ProgressWODetailProps> = observer(({ isOpen = false, setClose }) => {
    const { t } = useTranslation(["common"]);
    return (
        <>
            {
                <div className='box__shadow-table-responsive'>
                    <div className='table-responsive'>
                        <div>
                            <table>
                                <td>
                                    <InfoRow label='Mã công đoạn' data='CĐ01' />
                                    <InfoRow label='Tên công đoạn' data='In offset' />
                                    <InfoRow label='Trạng thái' data='Đang sản xuất ' />
                                </td>
                            </table>
                            <table style={{ marginTop: 30, paddingRight: 20 }}>
                                <td style={{ border: "1px solid gray" }}>
                                    <p style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                                        <h4>In offset: Ra bản</h4>
                                    </p>
                                    <InfoRow label='Tên công nhân' data='Anh bảy' />
                                    <InfoRow label='Nhóm/tổ' data='Tổ in' />
                                    <InfoRow label='Mã máy' data='M001' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Số lượng đầu vào' data='2000' />
                                    <InfoRow label='Số lượng sản xuất thực tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={90} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} />
                                    </div>
                                </td>
                                <td style={{ border: "1px solid gray" }}>
                                    <p style={{ display: "flex", justifyContent: "center" }}>
                                        <h4>In offset: Ra film + chụp bản</h4>
                                    </p>
                                    <InfoRow label='Tên công nhân' data='Anh bảy' />
                                    <InfoRow label='Nhóm/tổ' data='Tổ in' />
                                    <InfoRow label='Mã máy' data='M001' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Số lượng đầu vào' data='2000' />
                                    <InfoRow label='Số lượng sản xuất thực tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={50} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} />
                                    </div>
                                </td>
                                <td style={{ border: "1px solid gray" }}>
                                    <p style={{ display: "flex", justifyContent: "center" }}>
                                        <h4>In offset: In màu CMYK,P</h4>
                                    </p>
                                    <InfoRow label='Tên công nhân' data='Anh bảy' />
                                    <InfoRow label='Nhóm/tổ' data='Tổ in' />
                                    <InfoRow label='Mã máy' data='M001' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Số lượng đầu vào' data='2000' />
                                    <InfoRow label='Số lượng sản xuất thực tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={10} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} />
                                    </div>
                                </td>
                                <td style={{ border: "1px solid gray" }}>
                                    <p style={{ display: "flex", justifyContent: "center" }}>
                                        <h4>In offset: In UV</h4>
                                    </p>
                                    <InfoRow label='Tên công nhân' data='Anh bảy' />
                                    <InfoRow label='Nhóm/tổ' data='Tổ in' />
                                    <InfoRow label='Mã máy' data='M001' />
                                    <InfoRow label='Ca sản xuất' data='Ca 1' />
                                    <InfoRow label='Ngày sản xuất' data='15/08/2023' />
                                    <InfoRow label='Số lượng đầu vào' data='2000' />
                                    <InfoRow label='Số lượng sản xuất thực tế' data='1500' />
                                    <div style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Progress percent={0} strokeWidth={20} style={{ marginTop: 20, marginBottom: 20 }} />
                                    </div>
                                </td>
                            </table>
                        </div>
                        <div
                            className='toolbar'
                            style={{
                                marginTop: 20,
                                paddingBottom: 20,
                                display: "flex",
                                justifyContent: "flex-end",
                                borderRadius: "4px",
                            }}>
                            <Button
                                onClick={setClose}
                                style={{ backgroundColor: "gray", color: "#fff", width: 100 }}
                            >{t("common.back-button")}</Button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
});

export default ProgressWODetailJob;
