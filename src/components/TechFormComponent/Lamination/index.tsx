import classNames from "classnames/bind";
import styles from "./Lamination.module.css";
import { DataGrid, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import SvgIcon from "../../../shared/components/SvgIcon/SvgIcon";

const cx = classNames.bind(styles);

function Lamination(props) {
    return (<div className={cx('wrapper')}>
        <DataGrid
            key={"step"}
            dataSource={[]}
            keyExpr='step'
            showBorders={true}
            showRowLines={true}
            showColumnLines={true}>
            <Column dataField='step' caption='Bước' alignment='left' width={100} />
            <Column
                dataField='contents'
                caption='Nội dung ép/Contens'
                cellRender={(cellInfo) => (
                    <TextBox onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellInfo.value} key={"contents"} />
                )}
            />
            <Column
                dataField='classify'
                caption='Phân loại/Classify'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập'
                        onValueChange={(e) => {
                        }} value={cellInfo.value} key={"classify"} />
                )}
            />
            <Column
                dataField='parameter'
                caption='Thông số máy/Lamination Parameter'
                width={270}
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập'
                        onValueChange={(e) => {
                        }} value={cellInfo.value} key={"parameter"} />
                )}
            />
            <Column
                dataField='other'
                caption='Khác/Other'
                cellRender={(cellInfo) => (
                    <TextBox placeholder='Nhập'
                        onValueChange={(e) => {
                        }} value={cellInfo.value} key={"other"} />
                )}></Column>
            <Column
                caption=''
                dataField=''
                alignment='center'
                cellRender={(cellInfo) => (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
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

export default Lamination;