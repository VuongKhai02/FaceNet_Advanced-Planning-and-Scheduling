import classNames from "classnames/bind";
import styles from "./Hostamping.module.css";
import { DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import SvgIcon from "../../../shared/components/SvgIcon/SvgIcon";

const cx = classNames.bind(styles);

function Hostamping(props) {
    return (<div className={cx('wrapper')}>
        <DataGrid
            key={"step"}
            dataSource={[]}
            keyExpr='step'
            showBorders={true}
            showRowLines={true}
            showColumnLines={true}>
            <Column dataField='step' caption='Bước' alignment='center' width={100} />
            <Column
                dataField='process'
                caption='Công đoạn/Process'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"process"} />
                )}
            />
            <Column
                dataField='content'
                alignment='center'
                caption='Nội dung hots/Content'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"content"} />
                )}
            />
            <Column
                dataField='rmCode'
                alignment='center'
                caption='Mã vật liệu/RMcode'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"rmCode"} />
                )}
            />
            <Column
                dataField='type'
                alignment='center'
                caption='Loại phôi hots/Type'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"type"} />
                )}
            />
            <Column
                dataField='position'
                alignment='center'
                caption='Vị trí'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"position"} />
                )}></Column>
            <Column
                dataField='machine'
                alignment='center'
                caption='Máy/Machine'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"machine"} />
                )}
            />
            <Column
                dataField='other'
                alignment='center'
                caption='Khác/Other'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"other"} />
                )}
            />
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

export default Hostamping;