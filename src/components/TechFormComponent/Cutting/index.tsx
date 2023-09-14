import classNames from "classnames/bind";
import styles from "./Cutting.module.css";
import { DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import SvgIcon from "../../../shared/components/SvgIcon/SvgIcon";

const cx = classNames.bind(styles);

function Cutting(props) {
    return (<div className={cx('wrapper')}>
        <DataGrid
            key={"no"}
            dataSource={[]}
            keyExpr='no'
            showBorders={true}
            showRowLines={true}
            showColumnLines={true}>
            <Column dataField='no' caption='No.' alignment='left' width={100} />
            <Column
                dataField='content'
                caption='Nội dung/Content'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                    }} value={cellInfo.value} key={"content"} />
                )}
            />
            <Column
                dataField='machine'
                caption='Máy/Machine'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                    }} value={cellInfo.value} key={"machine"} />
                )}
            />
            <Column
                caption=''
                dataField=''
                alignment='center'
                width={150}
                cellRender={(cellInfo) => (
                    <div className={cx('action-container')}>
                        <SvgIcon
                            onClick={() => {
                                // console.log(cellInfo);
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
    </div>);
}

export default Cutting;