import classNames from "classnames/bind";
import styles from "./ProductSpec.module.css"
import { useState } from "react";
import { DataGrid, TextArea, TextBox } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { useTechFormContext } from "../../../pages/components/TechFormManager/TechFormUpdate/TechFormUpdate";
import { updateProductSpec } from "../../../store/action/TechFormAction";

const cx = classNames.bind(styles);

function ProductSpec(prop) {

    console.log('dfghsdj priop', prop)

    const [techFormState, dispatch] = useTechFormContext();
    return ( <div className={cx('wrapper')}>
        {/* <DataGrid dataSource={[prop.data]} showBorders={true} showRowLines={true} showColumnLines={true}>
            <Column
                dataField='sizeType'
                caption='Khổ thẻ/Size'
                cellRender={(cellIfo) => <TextBox
                    onValueChange={(e) => {
                        dispatch(updateProductSpec(prop.data.productionCode))
                    }} placeholder='Nhập' value={cellIfo.value} key={"sizeType"} />}
            />
            <Column
                alignment='left'
                dataField='thickness'
                caption='Độ dày/Thickness(mm)'
                cellRender={(cellIfo) => <TextBox
                    onValueChange={(e) => {
                    }} placeholder='Nhập' value={cellIfo.value} key={"thickness"} />}
            />
            <Column
                dataField='size'
                caption='Kích thước/Size, Dài/Length * Rộng/Width(mm)'
                cellRender={(cellIfo) => (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {" "}
                        <div className={cx('textbox-row')}>
                            <label>Width(W)</label>
                            <TextBox
                                style={{ width: "100%" }}
                                placeholder='Nhập'
                                value={cellIfo.value?.split(";")[0].replace("Width(W):", "").trim()}
                                onValueChange={(e) => {
                                    // let newValue = "Width(W): " + e + ";" + cellIfo.value?.split(";")[1];
                                    console.log(e)
                                    // onChangeProductSpec('size', newValue)
                                }}
                                key={"size"}
                            />
                        </div>{" "}
                        <div className={cx('textbox-row')}>
                            {" "}
                            <label>Height(H)</label>
                            <TextBox
                                style={{ width: "100%" }}
                                placeholder='Nhập'
                                value={cellIfo.value?.split(";")[1].replace("Height(H):", "").trim()}
                                key={"size"}
                            />
                        </div>{" "}
                    </div>
                )}
            />
            <Column
                dataField='other'
                caption='Khác/other'
                cellRender={(cellIfo) => <TextArea onValueChange={(e) => {
                }} placeholder='Nhập' value={cellIfo.value} key={"other"} />}
            />
        </DataGrid> */}
        <table></table>
    </div>);
}

export default ProductSpec;