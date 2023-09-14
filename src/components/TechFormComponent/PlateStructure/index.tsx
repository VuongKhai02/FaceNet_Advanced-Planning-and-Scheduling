import classNames from "classnames/bind";
import styles from './PlateStructure.module.css';
import { DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import SvgIcon from "../../../shared/components/SvgIcon/SvgIcon";

const cx = classNames.bind(styles);

function PlateStructure(props) {
    return (<div className={cx('wrapper')}>
        <div className='container' style={{ paddingTop: 50 }}>
            <div className='checkbox'>
                <label htmlFor='raPhim' style={{ fontWeight: 500 }}>
                    Ra phim/Pre-press
                </label>
                <input
                    onChange={(e) => {
                    }}
                    type='checkbox'
                    id='raPhim'
                    checked={true}
                />
            </div>
            <div className='checkbox'>
                <label htmlFor='raBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                    Ra bản/PC to plate
                </label>
                <input
                    onChange={(e) => {
                    }}
                    type='checkbox'
                    id='raBan'
                    checked={true}
                />
            </div>
            <div className='input'>
                <label htmlFor='tongSoBan' style={{ fontWeight: 500, marginLeft: 50 }}>
                    Tổng số bản: 1
                </label>
            </div>
        </div>
        <div style={{ paddingTop: 10 }}>
            <DataGrid
                key={"no"}
                keyExpr={"no"}
                dataSource={[]}
                showBorders={true}
                showRowLines={true}
                showColumnLines={true}>
                <Column dataField='Id' caption='Id' visible={false} />
                <Column alignment='center' caption='Mặt trước/Front' fixed>
                    <Column
                        dataField='front.item'
                        caption='Nội dung/Item'
                        cellRender={(cellIfo) => {
                            return (
                                <TextBox onValueChange={(e) => {
                                }} placeholder='Nhập' value={cellIfo.value} key={"front.item"} />)
                        }}
                    />
                    <Column
                        dataField='front.quantity'
                        caption="Số lượng/Q'ty"
                        alignment='left'
                        cellRender={(cellIfo) => (
                            <TextBox onValueChange={(e) => {
                            }} placeholder='Nhập' value={cellIfo.value} key={"front.quantity"} />
                        )}
                    />
                    <Column
                        dataField='front.plateSize'
                        caption='Kích thước bản/Plate size'
                        cellRender={(cellIfo) => (
                            <TextBox onValueChange={(e) => {
                            }} placeholder='Nhập' value={cellIfo.value} key={"front.plateSize"} />
                        )}
                    />
                </Column>
                <Column alignment='center' caption='Mặt sau/Back' fixed>
                    <Column
                        dataField='back.item'
                        caption='Nội dung/Item'
                        cellRender={(cellIfo) => (
                            <TextBox onValueChange={(e) => {
                            }} placeholder='Nhập' value={cellIfo.value} key={"back.item"} />
                        )}
                    />
                    <Column
                        dataField='back.quantity'
                        caption="Số lượng/Q'ty"
                        alignment='left'
                        cellRender={(cellIfo) => (
                            <TextBox placeholder='Nhập' onValueChange={(e) => {
                            }} value={cellIfo.value} key={"back.quantity"} />
                        )}
                    />
                    <Column
                        dataField='back.plateSize'
                        caption='Kích thước bản/Plate size'
                        cellRender={(cellIfo) => (
                            <TextBox placeholder='Nhập' onValueChange={(e) => {
                            }} value={cellIfo.value} key={"back.plateSiz"} />
                        )}
                    />
                </Column>
                <Column
                    caption=''
                    dataField=''
                    alignment='center'
                    width={80}
                    cellRender={(cellInfo) => (
                        <div className={cx("action-container")}>
                            <SvgIcon
                                onClick={() => {
                                }}
                                tooltipTitle='Thêm mới'
                                sizeIcon={17}
                                textSize={17}
                                icon='assets/icons/Add.svg'
                                textColor='#FF7A00'
                                style={{ marginRight: 17 }}
                            />
                            <SvgIcon
                                onClick={() => {
                                    // onRemoveRowProcessing(cellInfo.data.no);
                                    // onRemoveRowHostamping(cellInfo.rowIndex)
                                }}
                                tooltipTitle='Xóa hàng'
                                sizeIcon={17}
                                textSize={17}
                                icon='assets/icons/Trash.svg'
                                textColor='#FF7A00'
                            />
                        </div>
                    )}
                />
            </DataGrid>

        </div>
    </div>);
}

export default PlateStructure;