import classNames from "classnames/bind";
import styles from './TechFormProcedureDraft.module.css'
import { Table } from "antd";

const cx = classNames.bind(styles);

const data2 = [
    { no: "1", materialName: "Overlay (Front)", supplier: "CPPC", thickNess: "0.05", quantity: "850", note: "", structure: "" },
    { no: "2", materialName: "PVC (Front)", supplier: "JHNM", thickNess: "0.15", quantity: "850", note: "", structure: "" },
    { no: "3", materialName: "Inlay ÉP lần 1", supplier: "JHNM", thickNess: "0.15 * 3", quantity: "850", note: "", structure: "" },
    { no: "4", materialName: "PVC (Back)", supplier: "JHNM", thickNess: "0.15", quantity: "850", note: "", structure: "" },
    { no: "5", materialName: "Overlay (Back)", supplier: "CPPC", thickNess: "0.05", quantity: "850", note: "", structure: "" },
    { no: "6", materialName: "Dải từ", supplier: "", thickNess: "", quantity: "HI-co đen 12.7", note: "", structure: "" },
];

function TechFormProcedureDraft(props) {
    return (<div className={cx('wrapper')}>
        <div>
            <Table dataSource={[]} rowKey='step1' bordered pagination={false}>
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
            <Table dataSource={data2} rowKey='no' bordered pagination={false}>
                <Table.Column title='No.' dataIndex='no' key='no' align='left' width={130} />
                <Table.Column
                    onCell={(item, index) => {
                        return index === 2 ? { rowSpan: 2 } : index === 3 ? { rowSpan: 0 } : { rowSpan: 1 };
                    }}
                    title='Tên vật liệu/Materials Name'
                    dataIndex='materialName'
                    key='materialName'
                    align='center'
                />
                <Table.Column title='Xuất xứ/Supplier' dataIndex='supplier' key='supplier' align='center' />
                <Table.Column
                    title='Độ dày/Thickness(mm)'
                    dataIndex='thickNess'
                    key='thickNess'
                    align='center'
                    onCell={(item, index: any) => {
                        return index === 2
                            ? { rowSpan: 3 }
                            : [3, 4].includes(index)
                                ? { rowSpan: 0 }
                                : { rowSpan: 1 };
                    }}
                />
                <Table.Column
                    onCell={(item, index: any) => {
                        return index === 2
                            ? { rowSpan: 3 }
                            : [3, 4].includes(index)
                                ? { rowSpan: 0 }
                                : { rowSpan: 1 };
                    }}
                    title="Số lượng/Q'ty(tấm)"
                    dataIndex='quantity'
                    key='quantity'
                    align='center'
                />
                <Table.Column title='Ghi chú/Remark' dataIndex='remark' key='remark' align='center' />
                <Table.Column
                    onCell={(item, index: any) => {
                        return index === 0 ? { rowSpan: 9 } : { rowSpan: 0 };
                    }}
                    title='Cấu trúc/Structure'
                    dataIndex='structure'
                    key='structure'
                    align='center'
                    className='no-border-column'
                    render={() => (
                        <div>
                            <img
                                src='https://img3.thuthuatphanmem.vn/uploads/2019/07/05/anh-chan-dung-con-gai-toc-ngan_082837328.jpg'
                                width={150}
                                height={220}></img>
                        </div>
                    )}
                />
            </Table>
        </div>
    </div>);
}

export default TechFormProcedureDraft;