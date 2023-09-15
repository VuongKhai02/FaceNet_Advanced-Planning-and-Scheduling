import classNames from "classnames/bind";
import styles from "./MaterialTable.module.css";
import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";

const cx = classNames.bind(styles);


function MaterialTable(props) {
    return (<div className={cx('wrapper')}>
        <DataGrid
            key={"no"}
            dataSource={[]}
            keyExpr='no'
            showBorders={true}
            showRowLines={true}
            showColumnLines={true}>
            <Column dataField='no' caption='No.' allowEditing={false} alignment='left' />
            <Column dataField='materialCode' caption='Mã vật tư/Material Code' />
            <Column dataField='materialName' caption='Tên vật tư/Material Name' width={500} />
            <Column dataField='quantity' caption="Số lượng/Q'ty" />
            <Column dataField='note' caption='Ghi chú/Remarks' />
            <Column dataField='structure' caption='Cấu trúc/Structure' />
        </DataGrid>
    </div>);
}

export default MaterialTable;