import React from "react";
import { DataGrid } from "devextreme-react";
import { Column, FilterRow, Item as ToolbarItem, SearchPanel, Toolbar, ColumnChooser, OperationDescriptions } from "devextreme-react/data-grid";
import ProgressMonitoringWODetail from "./ProgressMonitoringWODetail/ProgressMonitoringWODetail";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import { customizeColor } from "../../../../utils/utils";


const data = [
    {
        id: 1,
        soCode: "SO-001",
        productionCode: "15010623",
        lotNumber: 1,
        customer: "TP Bank",
        cardName: "Visa TPBank",
        hopeQuantity: "3000",
        finishQuantity: "2000",
        finishRatio: "2%",
        errorRatio: "2%",
        status: "In offset",
    },
    {
        id: 2,
        soCode: "SO-001",
        productionCode: "15010623",
        lotNumber: 1,
        customer: "TP Bank",
        cardName: "Visa TPBank",
        hopeQuantity: "3000",
        finishQuantity: "2000",
        finishRatio: "2%",
        errorRatio: "2%",
        status: "Hoàn thành",
    },
    {
        id: 3,
        soCode: "SO-001",
        productionCode: "15010623",
        lotNumber: 2,
        customer: "TP Bank",
        cardName: "Visa TPBank",
        hopeQuantity: "3000",
        finishQuantity: "2000",
        finishRatio: "2%",
        errorRatio: "2%",
        status: "Hostamping",
    },
];
export const ProgressMonitoringManufacture = () => {
    const [isVisibleWODetail, setIsVisibleWODetail] = React.useState<boolean>(false);
    const { t } = useTranslation(["common"]);
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const { setBreadcrumbData } = useBreadcrumb();

    React.useEffect(() => {
        if (setBreadcrumbData) {
            setBreadcrumbData({
                items: [
                    {
                        key: "progress-monitoring",
                        title: "progress-monitoring.progress-monitoring-breadcrumb",
                    },
                    {
                        key: "progress-monitoring-manufacture",
                        title: "progress-monitoring.manufacture-progress-monitoring.header",
                    }
                ]
            })
        }
    }, []);

    const onStatusRender = (value: any) => {
        let customColor: {
            color: string,
            backgroundColor: string,
            fontWeight: string
        } = {
            color: "",
            backgroundColor: "",
            fontWeight: ""
        }
        let border = "";
        customColor = customizeColor(value.data.status)
        border = "1px solid " + customColor.color;
        return <Tag style={{
            fontSize: '14px',
            padding: '7px',
            "width": "100%",
            "textAlign": "center",
            "color": customColor.color,
            "backgroundColor": customColor.backgroundColor,
            "borderRadius": "4px",
            "border": "none",
            fontWeight: customColor.fontWeight
        }}>{value.data.status}</Tag>
    }

    return (
        <>
            {isVisibleWODetail ? (
                <ProgressMonitoringWODetail isOpen={isVisibleWODetail} setClose={() => setIsVisibleWODetail(false)} />
            ) : (
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
                                {t("progress-monitoring.manufacture-progress-monitoring.header")}
                            </h5>
                        </div>
                        <DataGrid
                            key={"id"}
                            keyExpr={"id"}
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
                            <Toolbar>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        onClick={() => { }}
                                        text={t("common.exportExcel")}
                                        tooltipTitle={t("common.exportExcel")}
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/ExportFile.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
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
                            <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                            <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />

                            <Column caption={"Mã đơn hàng"} dataField={"soCode"} />
                            <Column caption={"Mã sản xuất"} dataField={"productionCode"} />
                            <Column caption={"Số lô"} dataField={"lotNumber"} alignment="left" />
                            <Column caption={"Tên khách hàng"} dataField={"customer"} />
                            <Column caption={"Tên thẻ "} dataField={"cardName"} />
                            <Column caption={"Sản lượng dự kiến"} dataField={"hopeQuantity"} />
                            <Column caption={"Sản lượng hoàn thành"} dataField={"finishQuantity"} />
                            <Column caption={"Tỉ lệ hoàn thành"} dataField={"finishRatio"} />
                            <Column caption={"Tỉ lệ lỗi"} dataField={"errorRatio"} />
                            <Column caption={"Trạng thái"} dataField='status' cellRender={onStatusRender} />
                            <Column
                                fixed={true}
                                type={"buttons"}
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SvgIcon
                                            onClick={() => setIsVisibleWODetail(true)}
                                            tooltipTitle='Thông tin chi tiết - WO'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/EyeOpen.svg'
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


export default ProgressMonitoringManufacture;
