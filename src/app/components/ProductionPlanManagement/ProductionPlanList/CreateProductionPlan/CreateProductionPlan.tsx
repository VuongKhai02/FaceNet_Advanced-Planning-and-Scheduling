import React, { } from "react";
import { Button, DataGrid } from "devextreme-react";

import {
    Column,
    FilterRow,
    HeaderFilter,
    MasterDetail,
} from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";

type CreateProductionPlanProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { codeJob: 'In lưới', nameJob: '', startTime: '', endTime: '' },
    { codeJob: 'In offset', nameJob: '', startTime: '', endTime: '' },
    { codeJob: 'Ép', nameJob: '', startTime: '', endTime: '' }

]

export const CreateProductionPlan: React.FC<CreateProductionPlanProps> = observer(({
    isOpen = false, setClose }) => {


    return (
        <>
            {
                <div>
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "center",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 30
                            }}>Tạo kế hoạch sản xuất</h5>
                        </div>

                        <div style={{ marginBottom: 50 }}>
                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                <td>
                                    <InfoRow label='Mã WO' data='WO-T06/2023' />
                                    <InfoRow label='Tên thẻ' data='Phôi thẻ Visa Credit Classic, TP Bank, T8/2022' />
                                </td>
                                <td>
                                    <InfoRow label='Mã phiếu công nghệ' data='PCN-T06/2023' />
                                    <InfoRow label='Số lượng' data='20000' />
                                </td>
                                <td>
                                    <InfoRow label='Tên khách hàng' data='TP bank' />
                                    <InfoRow label='Số lượng đã bù hao' data='20400' />
                                </td>
                            </table>
                        </div>
                        <DataGrid
                            key={'codeJob'}
                            keyExpr={"codeJob"}
                            dataSource={data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}

                        >

                            <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} />
                            <FilterRow visible={true} />

                            <Column caption={"Mã Job"} dataField={"codeJob"} alignment="left" width={100} />
                            <Column caption={"Tên Job"} dataField={"nameJob"} />
                            <Column caption={"Thời gian bắt đầu"} dataType="datetime" dataField={""}
                                format="dd/MM/yyyy hh:mm:ss">
                            </Column>
                            <Column caption={"Thời gian kết thúc"} dataType="datetime" dataField={"endTime"}
                                format="dd/MM/yyyy hh:mm:ss" />
                            <MasterDetail
                                enabled={true}
                            // component={getProductOrderItemTemplate}
                            />
                        </DataGrid>
                        <div
                            className="toolbar"
                            style={{
                                marginTop: 10,
                                float: "right",
                                // background: "#ffffff",
                                padding: "8px",
                                borderRadius: "4px",
                            }}
                        >
                            <Button
                                text="Hủy bỏ"
                                onClick={setClose}
                                style={{ marginRight: "20px", backgroundColor: "#E5E5E5", color: "#333" }}
                            />
                            <Button text="Lưu lại" style={{ marginRight: '20px', backgroundColor: "#FF7A00", color: "#fff" }} />
                            <Button text="Phát lệnh sản xuất" style={{ backgroundColor: "#FF7A00", color: "#fff" }} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
})


export default CreateProductionPlan;