import React from "react";
import { observer } from "mobx-react";
import TechnologyPocudure from "./TechnologyProcedure/TechnologyProcedure";
import "./TechFormDetail.css";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
type TechFormDetailProps = {
    isOpen: boolean;
    setClose?: () => void;
};

export const TechFormDetail: React.FC<TechFormDetailProps> = observer(({ isOpen = false, setClose }) => {
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const { t } = useTranslation(["common"]);
    const data1 = [
        {
            step1: "NVL",
            step2: "Ra bản",
            step3: "Inlay D350 trở nó",
            step4: "Nền Nhũ",
            step5: "In Artwork MT+ MS + UV",
            step6: "In nền keo 2 mặt tờ in",
            step7: "Ép TP",
            step8: "Cắt",
            step9: "Hots + IC",
            step10: "Loadkey",
            step11: "CTH",
            step12: "Đóng gói",
        },
    ];
    const data2 = [
        {
            id: 1,
            cardSize: "ISO Size",
            thickness: 'Thickness : 0.08mm < T <0,84mm',
            size: "Width (W): 85.47 mm <W< 85.72 mm;Height(H): 53.92 < H < 54.03 mm",
            other: ""
        },
    ];
    const data3 = [
        { no: "1", materialName: "Overlay (Front)", supplier: "CPPC", thickNess: "0.05", quantity: "850", note: "", structure: "" },
        { no: "2", materialName: "PVC (Front)", supplier: "JHNM", thickNess: "0.15", quantity: "850", note: "", structure: "" },
        { no: "3", materialName: "Inlay ÉP lần 1", supplier: "JHNM", thickNess: "0.15 * 3", quantity: "850", note: "", structure: "" },
        { no: "", materialName: "", supplier: "JHNM", thickNess: "", quantity: "", note: "", structure: "" },
        { no: "", materialName: "", supplier: "JHNM", thickNess: "", quantity: "", note: "", structure: "" },
        { no: "", materialName: "", supplier: "JHNM", thickNess: "", quantity: "", note: "", structure: "" },
        { no: "4", materialName: "PVC (Back)", supplier: "JHNM", thickNess: "0.15", quantity: "850", note: "", structure: "" },
        { no: "5", materialName: "Overlay (Back)", supplier: "CPPC", thickNess: "0.05", quantity: "850", note: "", structure: "" },
        { no: "6", materialName: "Dải từ", supplier: "", thickNess: "", quantity: "HI-co đen 12.7", note: "", structure: "" },
    ];

    const handleTechnologyPocudure = () => {
        setIsAddNewTechForm(true);
    };

    return (
        <>
            {isAddNewTechForm ? (
                <TechnologyPocudure isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
                <div className=''>
                    <div className='table-responsive'>
                        <div
                            className='informer'
                            style={{
                                textAlign: "left",
                                paddingTop: 12,
                            }}>
                            {/* <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                }}>
                                Xem chi tiết phiếu công nghệ
                            </h5> */}
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    textAlign: "center",
                                }}>
                                PHIẾU CÔNG NGHỆ - TECH FORM
                            </h5>
                            <h5
                                className='name'
                                style={{
                                    fontSize: 18,
                                    marginBottom: 0,
                                    textAlign: "center",
                                }}>
                                (Phôi thẻ - Body card)
                            </h5>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <td>
                                    <InfoRow label={"Tổng số lô"} data={'1'} />
                                    <InfoRow label={'Mã sản xuất'} data={'SX0922621'} />
                                    <InfoRow label={'Tên khách hàng'} data={'Chi nhánh Công Ty Cổ Phần Thông Minh MK'} />
                                    <InfoRow label={'Tên thẻ'} data={'Phôi thẻ Visa Cam 1, TPBank, T5/2023, Slg 3k '} />
                                    <InfoRow label={'Số HĐ'} data={'35354'} />
                                    <InfoRow label={'Bắt đầu sản xuất'} data={'30/05/2023'} />
                                    <InfoRow label={'Ngày tạo'} data={'10/08/2023'} />
                                    <InfoRow label={'Người lập'} data={'Nguyễn Văn A'} />
                                    <InfoRow label={'Người duyệt'} data={'Trương Thị C'} />
                                </td>
                                <td>
                                    <InfoRow label={'Số lô'} data={'1'} />
                                    <InfoRow label={'Người gửi'} data={'Bùi Thanh Quang'} />
                                    <InfoRow label={'Số lượng thẻ'} data={'3,000'} />
                                    <InfoRow label={'SL thẻ đã tính bù hao'} data={'3,600'} />
                                    <InfoRow label={'Kết thúc sản xuất'} data={'28/08/2023'} />
                                    <InfoRow label={'Giao hàng'} data={'29/08/2023'} />
                                    <InfoRow label={'Ngày cập nhật'} data={'30/09/2023'} />
                                    <InfoRow label={'Người kiểm tra'} data={'Nguyễn Minh B'} />
                                </td>
                            </div>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 20
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginTop: 30,
                                    }}>
                                    Quy cách sản phẩm/Product Spee
                                </h5>
                            </div>
                            <Table dataSource={data2} key={'id'} pagination={false}>
                                <Table.Column title="Khổ thẻ" dataIndex={'cardSize'} />
                                <Table.Column title="Độ dày" dataIndex={'thickness'} />
                                <Table.Column title="Kích thước, Dài * Rộng" dataIndex={'size'} />
                                <Table.Column title="Khác" dataIndex={'other'} />
                            </Table>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "left",
                                    paddingTop: 15,
                                    paddingBottom: 10,
                                    // marginTop: 15
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                    }}>
                                    Thiết kế - Card design
                                </h5>
                            </div>
                            <div className='outer-rectangle'>
                                <div className='inner-rectangle'>
                                    <div className='text'>
                                        Chú ý: -Màu theo tờ mẫu đã làm T05/2020 Khách hàng khó tính, các công đoạn làm chuẩn theo mẫu -CTH
                                        in Barcode MS thẻ từ VCCP227002 Dán lable LP2 Xuất tồn kho 900 thẻ
                                    </div>
                                </div>

                                <div className='image-container'>
                                    <img
                                        src='https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png'
                                        alt='Credit Card'
                                        className='credit-card-image'
                                    />
                                </div>
                            </div>
                            <div
                                className='informer'
                                style={{
                                    textAlign: "left",
                                    paddingTop: 12,
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                    }}>
                                    Trình tự công nghệ
                                </h5>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Table dataSource={data1} rowKey='step1' bordered={false} pagination={false}>
                                    <Table.Column title='Step1' dataIndex='step1' key='step1' align='left' width={130} />
                                    <Table.Column title='Step2' dataIndex='step2' key='step2' align='center' />
                                    <Table.Column title='Step3' dataIndex='step3' key='step3' align='center' />
                                    <Table.Column title='Step4' dataIndex='step4' key='step4' align='center' />
                                    <Table.Column title='Step5' dataIndex='step5' key='step5' align='center' />
                                    <Table.Column title='Step6' dataIndex='step6' key='step6' align='center' />
                                    <Table.Column title='Step7' dataIndex='step7' key='step7' align='center' />
                                    <Table.Column title='Step8' dataIndex='step8' key='step8' align='center' />
                                    <Table.Column title='Step9' dataIndex='step9' key='step9' align='center' />
                                    <Table.Column title='Step10' dataIndex='step10' key='step10' align='center' />
                                    <Table.Column title='Step11' dataIndex='step11' key='step11' align='center' />
                                    <Table.Column title='Step12' dataIndex='step12' key='step12' align='center' />
                                </Table>
                                <Table dataSource={data3} rowKey='no' bordered={false} pagination={false}>
                                    <Table.Column
                                        onCell={(item, index) => {
                                            return index === 2 ? { rowSpan: 2 } : index === 3 ? { rowSpan: 0 } : { rowSpan: 1 };
                                        }}
                                        title='Tên vật liệu'
                                        dataIndex='materialName'
                                        key='materialName'
                                        align='center'
                                    />
                                    <Table.Column title='Xuất xứ' dataIndex='supplier' key='supplier' align='center' />
                                    <Table.Column
                                        onCell={(item, index: any) => {
                                            return index === 2 ? { rowSpan: 3 } : [3, 4].includes(index) ? { rowSpan: 0 } : { rowSpan: 1 };
                                        }}
                                        title='Độ dày'
                                        dataIndex='thickNess'
                                        key='thickNess'
                                        align='center'
                                    />
                                    <Table.Column
                                        onCell={(item, index: any) => {
                                            return index === 2 ? { rowSpan: 3 } : [3, 4].includes(index) ? { rowSpan: 0 } : { rowSpan: 1 };
                                        }}
                                        title="Số lượng"
                                        dataIndex='quantity'
                                        key='quantity'
                                        align='center'
                                    />
                                    <Table.Column title='Ghi chú' dataIndex='remark' key='remark' align='center' />
                                    <Table.Column
                                        onCell={(item, index: any) => {
                                            return index === 0 ? { rowSpan: 9 } : { rowSpan: 0 };
                                        }}
                                        title='Cấu trúc'
                                        dataIndex='structure'
                                        key='structure'
                                        align='center'
                                        className='no-border-column'
                                        render={() => (
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <img
                                                    src='https://img3.thuthuatphanmem.vn/uploads/2019/07/05/anh-chan-dung-con-gai-toc-ngan_082837328.jpg'
                                                    width={150}
                                                    height={220}></img>
                                            </div>
                                        )}
                                    />
                                </Table>
                            </div>
                            <div
                                className='toolbar'
                                style={{
                                    marginTop: 20,
                                    paddingBottom: 30,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    // background: "#ffffff"
                                    borderRadius: "4px",
                                }}>
                                <Button
                                    onClick={setClose}
                                    style={{ marginRight: "10px", backgroundColor: "gray", color: "#fff", width: 100 }}
                                >{t("common.back-button")}</Button>
                                <Button
                                    onClick={handleTechnologyPocudure}
                                    style={{ backgroundColor: "#FF7A00", color: "#fff", width: 100 }}
                                >{t("common.next-button")}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default TechFormDetail;
