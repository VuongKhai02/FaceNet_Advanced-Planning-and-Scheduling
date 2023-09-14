import classNames from "classnames/bind";
import styles from "./Processing.module.css";
import { DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import SvgIcon from "../../../shared/components/SvgIcon/SvgIcon";

const cx = classNames.bind(styles);

function Processing(props) {
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
                dataField='ink'
                caption='Mực/Lnk'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                    }} value={cellInfo.value} key={"lnk"} />
                )}></Column>
            <Column
                dataField='nilon'
                caption='Nilon'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                    }} value={cellInfo.value} key={"nilon"} />
                )}
            />
            <Column
                dataField='cut'
                caption='Cắt'
                cellRender={(cellInfo) => <TextBox placeholder='Nhập'
                    onValueChange={(e) => {
                    }} value={cellInfo.value} key={"cut"} />}
            />
            <Column
                dataField='hold'
                caption='Bế'
                cellRender={(cellInfo) => (
                    <TextBox value={cellInfo.value} onValueChange={(e) => {
                    }} placeholder='Nhập' key={"hold"} />
                )}></Column>
            <Column
                dataField='pull'
                caption='Đùn'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                    }} value={cellInfo.value} key={"pull"} />
                )}
            />
            <Column
                dataField='other'
                caption='Khác/Other'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập' onValueChange={(e) => {
                    }} value={cellInfo.value} key={"other"} />
                )}
            />
            <Column
                caption=''
                dataField=''
                alignment='center'
                cellRender={(cellInfo) => (
                    <div className={cx('action-container')}>
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

export default Processing;