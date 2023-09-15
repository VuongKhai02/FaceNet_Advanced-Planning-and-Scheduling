import classNames from "classnames/bind";
import styles from "./Printing.module.css";
import { DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";

const cx = classNames.bind(styles);

function Printing(props) {
    return (<div className={cx('wrapper')}>
        <DataGrid
            key={"step"}
            keyExpr={"step"}
            dataSource={[]}
            showBorders={true}
            showRowLines={true}
            showColumnLines={true}>
            <Column alignment='left' caption='Công nghệ In/Printing Technology' fixed>
                <Column alignment='left' caption='Nội dung In/Printing Contents' fixed>
                    <Column
                        dataField='step'
                        alignment='center'
                        caption='Bước/Step'
                        width={100}
                        cellRender={(cellInfo) => (
                            <TextBox placeholder='Nhập' value={cellInfo.value} key={"step"} />
                        )}>
                        {/* <Column>
                                    <Column dataField="" caption="Front" width={50} />
                                    <Column dataField="" caption="Back" width={50} />
                                </Column> */}
                        {/* <Column dataField="id" width={50} alignment="left" caption="" /> */}
                    </Column>
                    <Column
                        dataField='item'
                        caption='Nội dung/Item'
                        cellRender={(cellInfo) => (
                            <TextBox placeholder='Nhập' value={cellInfo.value} key={"item"} />
                        )}
                    />
                    <Column
                        dataField='method'
                        caption='Phương pháp/Method'
                        cellRender={(cellInfo) => (
                            <TextBox placeholder='Nhập' value={cellInfo.value} key={"method"} />
                        )}
                    />
                </Column>
            </Column>
            <Column
                alignment='left'
                headerCellRender={() => {
                    return (
                        <div className='checkbox'>
                            <div>
                                <input
                                    onChange={() => {}}
                                    type='checkbox'
                                    id='In'
                                    checked={true}
                                />
                                <label htmlFor='In' className='checkBoxStyle'>
                                    In trở Nó
                                </label>
                            </div>
                            <div style={{ marginLeft: 120 }}>
                                <input
                                    onChange={() => {}}
                                    type='checkbox'
                                    id='In'
                                    checked={false}
                                />
                                <label htmlFor='In' className='checkBoxStyle'>
                                    In trở Khác
                                </label>
                            </div>
                        </div>
                    );
                }}>
                <Column alignment='center' caption='File'>
                    <Column
                        dataField='colour'
                        caption='Màu/Colour'
                        cellRender={(cellInfo) => (
                            <TextBox placeholder='Nhập' value={cellInfo.value} key={"colour"} />
                        )}
                    />
                    <Column
                        dataField='note'
                        caption='Ghi chú/Note'
                        cellRender={(cellInfo) => (
                            <TextBox placeholder='Nhập' value={cellInfo.value} key={"note"} />
                        )}
                    />
                </Column>
            </Column>
        </DataGrid>
    </div>);
}

export default Printing;