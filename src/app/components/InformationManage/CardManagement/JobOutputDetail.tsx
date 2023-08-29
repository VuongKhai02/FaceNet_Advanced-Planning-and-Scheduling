import { locale, loadMessages } from "devextreme/localization";
import React, { } from "react";
import DataGrid, {
    Column, FilterRow, HeaderFilter, SearchPanel,
    Toolbar,
    Item as TItem, Paging, Pager, OperationDescriptions, ColumnChooser,
} from 'devextreme-react/data-grid';
import PopupScanBarCode from "../../../shared/components/PopupScanBarCode/PopupScanBarCode";

const data = [
    { jobOutputCode: 'J01', jobOutputName: 'WO-123-CĐ01-01', cardBoxQuantity: '01', startDate: '15/08/2023', endDate: '16/08/2023' },
    { jobOutputCode: 'J02', jobOutputName: 'WO-123-CĐ01-01', cardBoxQuantity: '01', startDate: '15/08/2023', endDate: '16/08/2023' },
    { jobOutputCode: 'J03', jobOutputName: 'WO-123-CĐ01-01', cardBoxQuantity: '01', startDate: '15/08/2023', endDate: '16/08/2023' }
];

const allowedPageSizes: (number | "auto" | "all")[] = [10, 20, 40];
export const JobOutPutDetail = React.memo((props: any) => {

    locale("en");
    loadMessages(
        {
            "en": {
                "Yes": "Xóa", "No": "Hủy bỏ",
                "dxList-selectAll": "Chọn tất cả",
                "dxList-pageLoadingText": "Đang tải...",
            }
        }
    );

    return (
        <div>
            <DataGrid
                id="gridContainer"
                key={'jobOutputCode'}
                keyExpr="jobOutputCode"
                dataSource={data}
                height={"auto"}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText="Không có dữ liệu để hiển thị"
            >
                <Toolbar>
                    <TItem location={"before"}
                    >
                        <div className={"master-detail-title"}>
                            Danh sách Job output
                        </div>
                    </TItem>
                    <TItem name="addRowButton" />
                    <TItem name="columnChooserButton" />
                </Toolbar>
                <ColumnChooser enabled={true} allowSearch={true} />
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode={"compact"}
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true}
                    infoText="Trang số {0} trên {1} ({2} bản ghi)" />
                <FilterRow visible={false} applyFilter={"auto"} showAllText='Tất cả' resetOperationText="Đặt lại">
                    <OperationDescriptions
                        startsWith="Bắt đầu với"
                        equal="Bằng"
                        endsWith="Kết thúc với"
                        contains="Chứa"
                        notContains="Không chứa"
                        notEqual="Không bằng"
                        lessThan="Nhỏ hơn"
                        lessThanOrEqual="Nhỏ hơn hoặc bằng"
                        greaterThan="Lớn hơn"
                        greaterThanOrEqual="Lớn hơn hoặc bằng"
                        between="Nằm giữa"

                    />
                </FilterRow>
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Nhập thông tin và ấn Enter để tìm kiếm"
                />
                <Column
                    caption="Mã Job output"
                    dataField={"jobOutputCode"}
                />
                <Column
                    dataField="jobOutputName"
                    caption="Tên Job output"
                />
                <Column
                    dataField="cardBoxQuantity"
                    caption="Số lượng thẻ trong hộp"
                />
                <Column
                    dataField="startDate"
                    caption="Ngày tiếp nhận"
                    format={"dd/MM/yyyy"}
                    dataType="datetime"
                />
                <Column
                    dataField="endDate"
                    caption="Ngày kết thúc"
                    dataType="datetime"
                    format={"dd/MM/yyyy"}
                    alignment={"center"}
                />
            </DataGrid>
        </div>
    );
});
export default JobOutPutDetail;