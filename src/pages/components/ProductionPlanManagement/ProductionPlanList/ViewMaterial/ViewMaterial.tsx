import React from "react";
import { DataGrid, Popup } from "devextreme-react";
import {
    Column,
    FilterRow,
    Paging,
    SearchPanel,
    ColumnChooser,
    Button as ButtonIcon,
    OperationDescriptions,
} from "devextreme-react/data-grid";

import { useTranslation } from "react-i18next";

const data = [{}];
export const ViewMaterial = () => {
    const { t } = useTranslation(["common"]);
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
                                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText={t("common.reset")}>
                                    <OperationDescriptions
                                        startsWith={t("common.startsWith")}
                                        equal={t("common.equal")}
                                        endsWith={t("common.endsWith")}
                                        contains={t("common.contains")}
                                        notContains={t("common.notContains")}
                                        notEqual={t("common.notEqual")}
                                        lessThan={t("common.lessThan")}
                                        lessThanOrEqual={t("common.lessThanOrEqual")}
                                        greaterThan={t("common.greaterThan")}
                                        greaterThanOrEqual={t("common.greaterThanOrEqual")}
                                        between={t("common.between")}
                                    />
                                </FilterRow>
                                <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                                <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />
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
                                <Column fixed={true} type={"buttons"} caption={"Thao tác"} alignment='left'>
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
