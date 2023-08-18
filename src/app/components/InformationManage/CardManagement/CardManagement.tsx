import React, { } from "react";
import { Button, DataGrid, SelectBox, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    MasterDetail, Button as ButtonIcon, ColumnChooser
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import Barcode from 'react-barcode'
import JobOutPutDetail from "./JobOutputDetail";
import PopupScanBarCode from "../../../shared/components/PopupScanBarCode/PopupScanBarCode";
import PopupDetailBoxCard from "../../../shared/components/PopupDetailBoxCard/PopupDetailBoxCard";
import PopupAddBoxCard from "../../../shared/components/PopupAddBoxCard/PopupAddBoxCard";
import PopupConfirmDelete from "../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";


const data = [
    { boxCode: 'HO1', stageCode: 'CD01', jobCode: 'J01-001', jobName: 'In offset : Ra bản', jobOutputCode: 'J01', jobOutPutName: 'WO-123-CĐ01-01' },
    { boxCode: 'HO2', stageCode: 'CD01', jobCode: 'J01-001', jobName: 'In offset : Ra bản', jobOutputCode: 'J01', jobOutPutName: 'WO-123-CĐ01-01' },
    { boxCode: 'HO3', stageCode: 'CD01', jobCode: 'J01-001', jobName: 'In offset : Ra bản', jobOutputCode: 'J01', jobOutPutName: 'WO-123-CĐ01-01' }
];
const ROUTING_PATH = "/cardManagement";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, 'all'];
export const CardManagement = () => {
    const [isVisibleScanBarCode, setIsVisibleScanBarCode] = React.useState<boolean>(false);
    const [isVisibleDetailBoxCard, setIsVisibleDetailBoxCard] = React.useState<boolean>(false);
    const [isVisibleAddBoxCard, setIsVisibleAddBoxCard] = React.useState<boolean>(false);
    const [isVisibleDelJobOutput, setIsVisibleDelJobOutput] = React.useState<boolean>(false);

    const handleJobOutputDetail = row => {
        return (
            <JobOutPutDetail
                data={row.data}
            />
        );
    };

    const handleCustomFooterButton = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button
                    key="cancel"
                    style={{
                        marginRight: '30px',
                        backgroundColor: '#E5E5E5',
                        display: 'inline-block',
                        borderRadius: '4px',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    onClick={() => setIsVisibleAddBoxCard(false)}
                >
                    Hủy bỏ
                </Button>,
                <Button
                    style={{
                        borderRadius: '4px',
                        backgroundColor: '#ff794e',
                        color: '#ffff',
                        width: 100,
                        height: 40,
                        fontSize: 16,
                        marginRight: 30
                    }}
                    key="submit"
                    onClick={() => { }}
                    className="btn btn-save"
                >
                    Thêm mới
                </Button>,
                <Button
                    style={{
                        borderRadius: '4px',
                        backgroundColor: '#ff794e',
                        color: '#ffff',
                        width: 100,
                        height: 40,
                        fontSize: 16
                    }}
                    key="submit"
                    onClick={() => { }}
                    className="btn btn-save"
                >
                    In mã
                </Button>
            </div>
        </div>
    ];

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
                                marginBottom: 0
                            }}>Danh sách hộp chứa thẻ</h5>
                        </div>
                        <div className="informer" style={{
                            backgroundColor: "#ffffff",
                            paddingLeft: 13
                        }}>
                            <h5 className="name" style={{
                                color: "rgba(0, 0, 0, 0.7)",
                                marginBottom: 0,
                                fontSize: 15,
                                boxSizing: "border-box",
                                fontWeight: 550
                            }}>Tìm kiếm chung</h5>
                        </div>

                        <DataGrid
                            key={'boxCode'}
                            keyExpr={"boxCode"}
                            dataSource={data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                        >
                            <PopupScanBarCode
                                isVisible={isVisibleScanBarCode}
                                modalContent={<div><Barcode value="Nguyen Minh Son" textAlign="center" font="monospace" /></div>}
                                modalTitle='Quét mã Bar code'
                                width={800}
                                onCancel={() => setIsVisibleScanBarCode(false)}
                                onSubmit={() => { }}
                            />
                            <PopupDetailBoxCard
                                isVisible={isVisibleDetailBoxCard}
                                modalContent={
                                    <div>
                                        <h3><p>Xem chi tiết hộp chứa thẻ</p></h3>
                                        <div style={{ marginTop: 40, marginBottom: 30 }}>
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                <td>
                                                    <Barcode value="712345 67001" textAlign="center" font="monospace" />
                                                </td>
                                                <td style={{ marginLeft: 30 }}>
                                                    <p>Mã hộp</p>
                                                    <TextBox id="boxCode" key={'boxCode'} value="H12" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã công đoạn</p>
                                                    <TextBox id="stageCode" key={'stageCode'} value="CDD01, CDD02, CĐ03" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job</p>
                                                    <TextBox id="jobCode" key={'jobCode'} value="J01-001" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job output</p>
                                                    <TextBox id="jobOutputCode" key={'jobOutputCode'} value="J01" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng thẻ trong hộp</p>
                                                    <TextBox id="boxCardQuantity" key={'boxCardQuantity'} value="25" ></TextBox>

                                                </td>
                                                <td style={{ marginRight: 30 }}>
                                                    <p>Tên hộp</p>
                                                    <TextBox id="boxName" key={'boxName'} value="Hộp đựng BTP" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên công đoạn</p>
                                                    <TextBox id="stageName" key={'stageName'} value="In offset, In lưới" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job</p>
                                                    <TextBox id="jobName" key={'jobName'} value="3,000" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job output</p>
                                                    <TextBox id="jobOutputName" key={'jobOutputName'} value="W0-123-CDD01-001" ></TextBox>

                                                </td>
                                            </table>
                                        </div>
                                    </div>
                                }
                                modalTitle='Quét mã Bar code'
                                width={1000}
                                onCancel={() => setIsVisibleDetailBoxCard(false)}
                                onSubmit={() => { }}
                            />
                            <PopupAddBoxCard
                                isVisible={isVisibleAddBoxCard}
                                modalTitle='Thêm mới hộp chứa thẻ'
                                modalContent={
                                    <div>
                                        <h3><p>Thêm mới hộp chứa thẻ</p></h3>
                                        <div style={{ marginTop: 40, marginBottom: 30 }}>
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                <td>
                                                    <Barcode value="712345 67001" textAlign="center" font="monospace" />
                                                </td>
                                                <td style={{ marginLeft: 30 }}>
                                                    <p>Mã hộp</p>
                                                    <TextBox id="boxCode" key={'boxCode'} value="H12" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã công đoạn</p>
                                                    <TextBox id="stageCode" key={'stageCode'} value="" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job</p>
                                                    <TextBox id="jobCode" key={'jobCode'} placeholder="Nhập mã Job"></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job output</p>
                                                    <TextBox id="jobOutputCode" key={'jobOutputCode'} placeholder="Nhập mã Job output" ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng thẻ trong hộp</p>
                                                    <TextBox id="boxCardQuantity" key={'boxCardQuantity'} placeholder="Nhập số lượng thẻ trong hộp" ></TextBox>

                                                </td>
                                                <td style={{ marginRight: 30 }}>
                                                    <p>Tên hộp</p>
                                                    <TextBox id="boxName" key={'boxName'} placeholder="Nhập tên hộp" width={300} ></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên công đoạn</p>
                                                    <SelectBox id="stageName" key={'stageName'} placeholder="--Chọn--" ></SelectBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job</p>
                                                    <TextBox id="jobName" key={'jobName'} placeholder="Nhập tên Job"></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job output</p>
                                                    <TextBox id="jobOutputName" key={'jobOutputName'} placeholder="Nhập tên Job output" ></TextBox>
                                                </td>
                                            </table>
                                        </div>
                                    </div>
                                }
                                width={1000}
                                onCancel={() => { setIsVisibleAddBoxCard(false) }}
                                onSubmit={() => { }}
                                customFooter={handleCustomFooterButton}
                            />
                            <PopupConfirmDelete
                                isVisible={isVisibleDelJobOutput}
                                onCancel={() => setIsVisibleDelJobOutput(false)}
                                onSubmit={() => { }}
                                modalTitle={
                                    <div>
                                        <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500 }}>
                                            Xóa Job output
                                        </h3>
                                        <h5 style={{ fontWeight: 400, marginTop: 30 }}>{'Bạn có chắc chắn muốn xóa Job out này không?'}</h5>
                                    </div>
                                }
                                modalContent={
                                    <div style={{ backgroundColor: '#ffe0c2', borderLeft: '4px solid #ff794e' }}>
                                        <h3 style={{ color: '#ff794e' }}>
                                            <WarningOutlined style={{ color: '#ff794e', marginRight: '8px' }} />
                                            Lưu ý:
                                        </h3>
                                        <p style={{ marginLeft: 20, fontSize: 15 }}>{'Nếu bạn xóa Job output thì mọi dữ liệu liên quan đến Job output này đều sẽ biến mất!'}</p>
                                    </div>
                                }
                                width={600}
                            />
                            <Toolbar>
                                <ToolbarItem location="after">
                                    <Button hint="Thêm mới" icon="add" text="Thêm mới" onClick={() => { setIsVisibleAddBoxCard(true) }} />
                                </ToolbarItem>
                                <ToolbarItem >
                                    <Button icon='print' text="In mã" onClick={() => setIsVisibleScanBarCode(true)} />
                                </ToolbarItem>
                                <ToolbarItem name="columnChooserButton" />
                                <ToolbarItem name="searchPanel" location="before" />
                            </Toolbar>
                            <HeaderFilter visible={true} texts={{
                                cancel: "Hủy bỏ",
                                ok: "Đồng ý",
                                emptyValue: "Rỗng"

                            }} allowSearch={true} />
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} />
                            <SearchPanel visible={true} placeholder={"VD: PO"} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText="Trang số {0} trên {1} ({2} bản ghi)" />

                            <Column caption={"Mã hộp"} dataField={"boxCode"} alignment="left" width={100} />
                            <Column caption={"Mã công đoạn"} dataField={"stageCode"} />
                            <Column caption={"Mã Job"} dataField={"jobCode"} />
                            <Column caption={"Tên Job"} dataField={"jobName"} />
                            <Column caption={"Mã Job Output"} dataField={"jobOutputCode"} />
                            <Column caption={"Tên Job Output"} dataField={"jobOutPutName"} />
                            <Column type={"buttons"} caption={"Thao tác"} alignment="center" >
                                <ButtonIcon icon="info" onClick={() => setIsVisibleDetailBoxCard(true)} />
                                <ButtonIcon icon="smalliconslayout" />
                                <ButtonIcon icon="trash" onClick={() => setIsVisibleDelJobOutput(true)} />
                            </Column>
                            <MasterDetail
                                enabled={true}
                                component={handleJobOutputDetail}
                            />
                        </DataGrid>
                    </div>
                </div>
            }
        </>
    )

}


registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: CardManagement,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "cardManagement"
});

export default CardManagement;