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
            <div>
                
            </div>
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