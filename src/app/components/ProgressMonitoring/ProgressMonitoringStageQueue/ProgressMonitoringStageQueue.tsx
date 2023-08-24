import React, { } from "react";
import { Button, SelectBox, TextBox } from "devextreme-react";
import "./ProgressMonitoringStageQueue.css";
import InfoRow from "../../../shared/components/InfoRow/InfoRow";
import Steps from "antd/lib/steps";
import { registerScreen } from "@haulmont/jmix-react-ui";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import PopupConfirmGeneral from "../../../shared/components/PopupConfirmGeneral/PopupConfirmGeneral";
const ROUTING_PATH = "/progressMonitoringStageQueue";
const { Step } = Steps;

const items = [
    { title: 'In offset', description: '' },
    { title: 'In lưới', description: '' },
    { title: 'Ép', description: '' },
    { title: 'Cắt', description: '' },
    { title: 'IC', description: '' },
    { title: 'Hostamping', description: '' }
];


export const ProgressMonitoringStageQueue = () => {
    const [isVisibleDefineStageQueue, setIsVisibleDefineStageQueue] = React.useState<boolean>(false);

    const handleCustomFooterButtonDefineStageQueue = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button
                    key="cancel"
                    style={{
                        marginRight: '30px',
                        backgroundColor: '#E5E5E5',
                        display: 'inline-block',
                        borderRadius: '4px',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    onClick={() => setIsVisibleDefineStageQueue(false)}
                >
                    Hủy bỏ
                </Button>
                <Button
                    style={{
                        borderRadius: '4px',
                        backgroundColor: '#ff794e',
                        color: '#ffff',
                        width: 100,
                        height: 40,
                        fontSize: 16,
                    }}
                    key="submit"
                    onClick={() => { }}
                    className="btn btn-save"
                >
                    Thiết lập
                </Button>
            </div>
        </div>
    ];
    return (
        <>
            {
                <div className="box__shadow-table-responsive">
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 20,
                                marginBottom: 0,
                            }}>Hàng chờ công đoạn</h5>
                        </div>
                        <div>
                            <Steps current={1} size="small" labelPlacement="vertical" style={{ width: '60%', marginLeft: 300, marginTop: 40 }} >
                                {items.map((item, index) => (
                                    <Step key={index} title={item.title} description={item.description} />
                                ))}
                            </Steps>
                        </div>
                        <div>
                            <div style={{ border: '1px solid #004C98', borderRadius: 5, marginTop: 30, width: '30%', marginLeft: 20 }}>
                                <h3><p>Danh sách lệnh sản xuất đang chờ</p></h3>
                                <div className="border__table-row"></div>
                                <table >
                                    <td>
                                        <InfoRow label='Mã sản xuất ' data='1234' />
                                        <InfoRow label='Số lượng yêu cầu' data='10000' />
                                        <div className="border__table-row"></div>
                                        <InfoRow label='Mã sản xuất ' data='2345' />
                                        <InfoRow label='Số lượng yêu cầu' data='5000' />
                                        <div className="border__table-row"></div>
                                        <InfoRow label='Mã sản xuất ' data='3456' />
                                        <InfoRow label='Số lượng yêu cầu' data='9000' />
                                        <div className="border__table-row"></div>
                                        <InfoRow label='Mã sản xuất ' data='5678' />
                                        <InfoRow label='Số lượng yêu cầu' data='69000' />
                                        <div className="border__table-row"></div>
                                        <InfoRow label='Tổng số lượng' data='96000' />
                                    </td>
                                </table>
                                <Button text="Bắt đầu công đoạn"
                                    style={{ marginLeft: 250, backgroundColor: "#FF7A00", color: "#fff", width: 180, marginBottom: 30, marginTop: 30 }}
                                    onClick={() => setIsVisibleDefineStageQueue(true)}
                                />
                                <PopupConfirmGeneral
                                    isVisible={isVisibleDefineStageQueue}
                                    modalContent={
                                        <div>
                                            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                                                <p style={{ marginBottom: 5, color: '#333', fontSize: 20 }}>Thiết lập hàng chờ công đoạn</p>
                                                <div style={{ marginTop: 20 }}>
                                                    <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <td style={{ width: 300 }}>
                                                            <div style={{ marginBottom: 20 }}>
                                                                <label htmlFor="inputMin" style={{ display: 'block', marginBottom: 5 }}>Input tối thiểu</label>
                                                                <TextBox id="inputMin" placeholder="Nhập số lượng" />
                                                            </div>
                                                            <div style={{ marginBottom: 20 }}>
                                                                <label htmlFor="stageCode" style={{ display: 'block', marginBottom: 5 }}>Mã công đoạn</label>
                                                                <SelectBox id="stageCode" placeholder="Chọn" />
                                                            </div>
                                                            <div style={{ marginBottom: 20 }}>
                                                                <label htmlFor="jobCode" style={{ display: 'block', marginBottom: 5 }}>Mã Job</label>
                                                                <SelectBox id="jobCode" placeholder="Chọn" />
                                                            </div>
                                                        </td>
                                                        <td style={{ width: 300 }}>
                                                            <div style={{ marginBottom: 20 }}>
                                                                <label htmlFor="stageName" style={{ display: 'block', marginBottom: 5 }}>Tên công đoạn</label>
                                                                <TextBox id="stageName" value="In offset" />
                                                            </div>
                                                            <div style={{ marginBottom: 20 }}>
                                                                <label htmlFor="jobName" style={{ display: 'block', marginBottom: 5 }}>Tên job</label>
                                                                <TextBox id="jobName" value="In offset: Ra bản" />
                                                            </div>
                                                        </td>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    modalTitle={<div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                                        Thiết lập hàng chờ công đoạn
                                    </div>}
                                    width={900}
                                    onCancel={() => { setIsVisibleDefineStageQueue(false) }}
                                    onSubmit={() => { }}
                                    customFooter={handleCustomFooterButtonDefineStageQueue}
                                />
                            </div>
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
                                onClick={() => { }}
                                style={{ marginRight: "8px", backgroundColor: "#E5E5E5", color: "#333", width: 120 }}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

registerScreen({
    caption: "Hàng chờ công đoạn",
    component: ProgressMonitoringStageQueue,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "progressMonitoringStageQueue"
});


export default ProgressMonitoringStageQueue;