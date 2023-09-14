import React from "react";
import { DataGrid } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    ColumnChooser,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import InfoJobOutputDetail from "./InfoJobOutputDetail/InfoJobOutputDetail";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import VerificationJobOutput from "./VerificationJobOutput/VerificationJobOutput";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { useTranslation } from "react-i18next";

const data = [
    {
        jobOutputCode: "J03",
        jobOutPutName: "WO-123-CĐ01-01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        stageCode: "CĐ02",
        boxCode: "H01",
        boxName: "Hộp đựng BTP",
        quantity: "100",
        status: "Chuyển công đoạn",
    },
    {
        jobOutputCode: "J04",
        jobOutPutName: "WO-123-CĐ01-01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        stageCode: "CĐ02",
        boxCode: "H01",
        boxName: "Hộp đựng BTP",
        quantity: "100",
        status: "Công đoạn hiện tại",
    },
    {
        jobOutputCode: "J05",
        jobOutPutName: "WO-123-CĐ01-01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        stageCode: "CĐ02",
        boxCode: "H01",
        boxName: "Hộp đựng BTP",
        quantity: "100",
        status: "Chuyển công đoạn",
    },
];
export const ManageJobOutput = () => {
    const [isVisibleJobOutputDetail, setIsVisibleJobOutputDetail] = React.useState<boolean>(false);
    const [isVisibleDelJobOutput, setIsVisibleDelJobOutput] = React.useState<boolean>(false);
    const [isVisibleVerificationJobOutput, setIsVisibleVerificationJobOutput] = React.useState<boolean>(false);
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const breadcrumbContext = useBreadcrumb();
    const { t } = useTranslation(["common"]);
    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "info-manage",
                        title: t("management-info.mana-info"),
                    },
                    {
                        key: "manage-job-output",
                        title: t("management-info.management-job-output.breadcrumb-label"),
                    }
                ]
            })
        }
    }, []);

    return (
        <>
            {isVisibleJobOutputDetail ? (
                <InfoJobOutputDetail
                    isOpen={isVisibleJobOutputDetail}
                    setClose={() => {
                        setIsVisibleJobOutputDetail(false);
                    }}
                />
            ) : isVisibleVerificationJobOutput ? (
                <VerificationJobOutput
                    isOpen={isVisibleVerificationJobOutput}
                    setClose={() => setIsVisibleVerificationJobOutput(false)}
                />
            ) :
                (
                    <div className='box__shadow-table-responsive'>
                        <div className='table-responsive'>
                            <div
                                className='informer'
                                style={{
                                    background: "#fff",
                                    textAlign: "center",
                                    paddingTop: 12,
                                }}>
                                <h5
                                    className='name'
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 0,
                                    }}>
                                    {t("management-info.management-job-output.label")}
                                </h5>
                            </div>

                            <DataGrid
                                key={"jobOutputCode"}
                                keyExpr={"jobOutputCode"}
                                dataSource={dataPage}
                                showBorders={true}
                                columnAutoWidth={true}
                                showRowLines={true}
                                rowAlternationEnabled={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                focusedRowEnabled={true}
                                noDataText={t("common.noData-text")}
                            >
                                <PopupConfirmDelete
                                    isVisible={isVisibleDelJobOutput}
                                    onCancel={() => setIsVisibleDelJobOutput(false)}
                                    onSubmit={() => { }}
                                    modalTitle={
                                        <div>
                                            <h3
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "#ff794e",
                                                    fontWeight: 500,
                                                }}>
                                                Xóa Job output
                                            </h3>
                                        </div>
                                    }
                                    modalContent={
                                        <div>
                                            <h4 style={{ fontWeight: 400 }}>{"Bạn có chắc chắn muốn xóa Job out này không?"}</h4>
                                            <div
                                                style={{
                                                    backgroundColor: "#ffe0c2",
                                                    borderLeft: "4px solid #ff794e",
                                                    borderRadius: 5,
                                                    height: 100,
                                                }}>
                                                <h3 style={{ color: "#ff794e" }}>
                                                    <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                                    Lưu ý:
                                                </h3>
                                                <p style={{ marginLeft: 20, fontSize: 15 }}>
                                                    {"Nếu bạn xóa Job output thì mọi dữ liệu liên quan đến Job output này đều sẽ biến mất!"}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    width={600}
                                />
                                <Toolbar>
                                    <ToolbarItem name='columnChooserButton' />
                                    <ToolbarItem name='searchPanel' location='before' />
                                </Toolbar>
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
                                <ColumnChooser enabled={true} allowSearch={true} />
                                <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />

                                <Column caption={"Mã Job Output"} dataField={"jobOutputCode"} />
                                <Column caption={"Tên Job Output"} dataField={"jobOutPutName"} />
                                <Column caption={"Mã Job"} dataField={"jobCode"} />
                                <Column caption={"Tên Job"} dataField={"jobName"} />
                                <Column caption={"Mã công đoạn"} dataField={"stageCode"} />
                                <Column caption={"Mã hộp"} dataField={"boxCode"} />
                                <Column caption={"Tên hộp"} dataField={"boxName"} />
                                <Column caption={"Số lượng thẻ"} dataField={"quantity"} />
                                <Column caption={"Trạng thái"} dataField={"status"} />
                                <Column
                                    fixed={true}
                                    fixedPosition="right"
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={() => (
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                            <SvgIcon
                                                onClick={() => setIsVisibleJobOutputDetail(true)}
                                                tooltipTitle='Thông tin chi tiết Job output'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={() => setIsVisibleVerificationJobOutput(true)}
                                                tooltipTitle='Xác minh Job output'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/FileEarmarkCheck.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={() => setIsVisibleDelJobOutput(true)}
                                                tooltipTitle='Xóa Job output'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Trash.svg'
                                                textColor='#FF7A00'
                                            />
                                        </div>
                                    )}></Column>
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
                    </div>
                )}
        </>
    );
};

export default ManageJobOutput;
