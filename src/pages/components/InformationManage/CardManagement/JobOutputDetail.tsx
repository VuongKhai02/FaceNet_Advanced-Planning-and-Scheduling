
import React from "react";
import DataGrid, {
    Column,
    FilterRow,
    SearchPanel,
    Toolbar,
    Item as TItem,
    OperationDescriptions,
    ColumnChooser,
} from "devextreme-react/data-grid";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { useTranslation } from "react-i18next";

const data = [
    { jobOutputCode: "J01", jobOutputName: "WO-123-CĐ01-01", cardBoxQuantity: "01", startDate: "15/08/2023", endDate: "16/08/2023" },
    { jobOutputCode: "J02", jobOutputName: "WO-123-CĐ01-01", cardBoxQuantity: "01", startDate: "15/08/2023", endDate: "16/08/2023" },
    { jobOutputCode: "J03", jobOutputName: "WO-123-CĐ01-01", cardBoxQuantity: "01", startDate: "15/08/2023", endDate: "16/08/2023" },
];

export const JobOutPutDetail = React.memo((props: any) => {
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const { t } = useTranslation(["common"]);
    return (
        <div>
            <DataGrid
                id='gridContainer'
                key={"jobOutputCode"}
                keyExpr='jobOutputCode'
                dataSource={dataPage}
                height={"auto"}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText={t("common.noData-text")}>
                <Toolbar>
                    <TItem location={"before"}>
                        <div style={{ fontSize: 18, fontWeight: "bold" }}>Danh sách Job output</div>
                    </TItem>
                    <TItem name='addRowButton' />
                    <TItem name='columnChooserButton' />
                </Toolbar>
                <ColumnChooser enabled={true} allowSearch={true} />

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
                <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />
                <Column caption='Mã Job output' dataField={"jobOutputCode"} />
                <Column dataField='jobOutputName' caption='Tên Job output' />
                <Column dataField='cardBoxQuantity' caption='Số lượng thẻ trong hộp' />
                <Column dataField='startDate' caption='Ngày tiếp nhận' format={"dd/MM/yyyy"} dataType='datetime' />
                <Column dataField='endDate' caption='Ngày kết thúc' dataType='datetime' format={"dd/MM/yyyy"} alignment={"center"} />
            </DataGrid>
            <PaginationComponent
                pageSizeOptions={[10, 20, 40]}
                pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: data?.length }}
                totalPages={totalPage}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
            />
        </div>
    );
});
export default JobOutPutDetail;
