import React from "react";
import { Button, DataGrid, Popup, SelectBox, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Paging,
    SearchPanel,
    Toolbar,
    ColumnChooser,
    Button as ButtonIcon,
} from "devextreme-react/data-grid";

const data = [];

export const ViewMaterial = () => {
    return (
        <>
            {
                <div className='box__shadow-table-responsive'>
                    <div className='table-responsive'>
                        <Popup
                            // visible={popupVisible}
                            title='Xem nguyên vật liệu'
                            // onHiding={handleClosePopup}
                            width={800}
                            height={600}>
                            <DataGrid
                                key={"saleOrderId"}
                                keyExpr={"saleOrderId"}
                                dataSource={data}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}>
                                <FilterRow visible={true} />
                                <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                                <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} />
                                <Paging defaultPageSize={5} />
                                <Column caption={"Mã WO"} dataField={"saleOrderId"} alignment='left' width={100} />
                                <Column caption={"Mã SO"} dataField={"productionCode"} />
                                <Column caption={"Mã PCN"} dataField={"productionCode"} />
                                <Column caption={"Tên khách hàng"} dataField={"customer"} />
                                <Column caption={"Tên thẻ "} dataType='datetime' dataField={"startTime"} />
                                <Column caption={"Số lượng"} dataType='datetime' dataField={"deliveryDate"} />
                                <Column caption={"Số lượng bù hao"} dataField={"customer"} />
                                <Column caption={"Mã QR"} dataField={"customer"} />
                                <Column caption={"Mức độ ưu tiên"} dataField={"customer"} />
                                <Column caption={"Trạng thái"} />
                                <Column type={"buttons"} caption={"Thao tác"} alignment='left'>
                                    <ButtonIcon icon='info' />
                                    <ButtonIcon icon='smalliconslayout' />
                                    <ButtonIcon icon='chevronright' />
                                    <ButtonIcon icon='more' />
                                </Column>
                            </DataGrid>
                        </Popup>
                    </div>
                </div>
            }
        </>
    );
};

export default ViewMaterial;
