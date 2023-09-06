import React from "react";
import { observer } from "mobx-react";
import InfoRow from "../../../../../shared/components/InfoRow/InfoRow";
import Steps from "antd/lib/steps";
import ProgressWODetailJob from "./ProgressWODetailJob/ProgressWODetailJob";
import { Button } from "antd";

const { Step } = Steps;
const items = [
    {
        title: "In offset",
        description: "Sản lượng kế hoạch: 100. Sản lượng đã sản xuất: 105",
    },
    {
        title: "In lưới",
        description: "Sản lượng kế hoạch: 100. Sản lượng đã sản xuất: 50",
    },
    {
        title: "Ép",
        description: "Sản lượng kế hoạch: 100. Sản lượng đã sản xuất: 0",
    },
    {
        title: "Cắt",
        description: "Sản lượng kế hoạch: 100. Sản lượng đã sản xuất: 0",
    },
];

type ProgressMonitoringWODetailProps = {
    isOpen: boolean;
    setClose?: () => void;
};

export const ProgressMonitoringWODetail: React.FC<ProgressMonitoringWODetailProps> = observer(({ isOpen = false, setClose }) => {
    const [isVisibleProgressWODetailJob, setIsVisibleProgressWODetailJob] = React.useState<boolean>(false);
    return (
        <>
            {isVisibleProgressWODetailJob ? (
                <ProgressWODetailJob
                    isOpen={isVisibleProgressWODetailJob}
                    setClose={() => {
                        setIsVisibleProgressWODetailJob(false);
                    }}
                />
            ) : (
                <div className='box__shadow-table-responsive'>
                    <div className='table-responsive'>
                        <div
                            className='informer'
                            style={{
                                background: "#fff",
                                textAlign: "left",
                                paddingTop: 12,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    border: "1px solid #bebebe",
                                }}>
                                Thông tin chi tiết - WO_2543_01
                            </h5>
                        </div>
                        <div>
                            <table style={{ display: "flex", justifyContent: "space-around" }}>
                                <td>
                                    <InfoRow label='Mã đơn hàng' data='SO_2543' />
                                    <InfoRow label='Tên khách hàng' data='Công ty ABC' />
                                    <InfoRow label='Thời gian bắt đầu' data='11/7/2023 15:08:50' />
                                    <InfoRow label='Thời gian kết thúc' data='11/7/2023 15:08:50' />
                                    <InfoRow label='Trạng thái' data='Đang thực hiện' />
                                </td>
                                <td>
                                    <InfoRow label='Mã sản xuất' data='15010623' />
                                    <InfoRow label='Mã WO' data='KHSX-T5' />
                                    <InfoRow label='Tên thẻ' data='Phôi thẻ Visa Credit Classic, TP Bank, T8/2022' />
                                    <InfoRow label='Sản lượng kế hoạch' data='20000' />
                                    <InfoRow label='Số lượng thực tế' data='15000' />
                                    <InfoRow label='Tỷ lệ hoàn thành' data='38%' />
                                </td>
                            </table>
                        </div>
                        <div>
                            <div>
                                <Steps
                                    current={1}
                                    size='small'
                                    labelPlacement='vertical'
                                    style={{ width: "60%", marginLeft: 300, marginTop: 40 }}>
                                    {items.map((item, index) => (
                                        <Step key={index} title={item.title} description={item.description} />
                                    ))}
                                </Steps>
                            </div>
                            <div>
                                <div style={{ border: "1px solid #004C98", borderRadius: 5, marginTop: 30, width: "35%", marginLeft: 20 }}>
                                    <h3>
                                        <p>Chi tiết công đoạn</p>
                                    </h3>
                                    <table>
                                        <td>
                                            <InfoRow label='Mã công đoạn' data='CĐ01' />
                                            <InfoRow label='Tên công đoạn' data='In offset' />
                                            <InfoRow label='Thời gian bắt đầu' data='11/7/2023 15:08:50' />
                                            <InfoRow label='Thời gian kết thúc dự kiến' data='11/7/2023 15:08:50' />
                                            <InfoRow label='Thời gian kết thúc thực tế' data='11/7/2023 15:08:50' />
                                            <InfoRow label='Trạng thái' data='Hoàn thành' />
                                            <InfoRow label='Sản lượng kế hoạch' data='105' />
                                            <InfoRow label='Sản lượng hoàn thành' data='105' />
                                            <InfoRow label='Sản lượng lỗi' data='8' />
                                            <InfoRow label='Tỉ lệ lỗi' data='9% ' />
                                        </td>
                                    </table>
                                    <Button
                                        style={{
                                            marginLeft: 250,
                                            backgroundColor: "#FF7A00",
                                            color: "#fff",
                                            width: 120,
                                            marginBottom: 30,
                                            marginTop: 30,
                                        }}
                                        onClick={() => setIsVisibleProgressWODetailJob(true)}
                                    >Xem chi tiết</Button>
                                </div>
                            </div>
                        </div>
                        <div
                            className='toolbar'
                            style={{
                                marginTop: 10,
                                float: "right",
                                // background: "#ffffff",
                                padding: "8px",
                                borderRadius: "4px",
                            }}>
                            <Button
                                onClick={setClose}
                                style={{ marginRight: "8px", backgroundColor: "gray", color: "#fff", width: 120 }}
                            >Trở lại</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default ProgressMonitoringWODetail;
