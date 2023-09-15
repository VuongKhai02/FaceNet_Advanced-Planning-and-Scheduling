import React from "react";
import { DataGrid, SelectBox, TextBox } from "devextreme-react";
import classNames from "classnames/bind";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    MasterDetail,
    ColumnChooser,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import Barcode from "react-barcode";
import JobOutPutDetail from "./JobOutputDetail";
import PopupScanBarCode from "../../../../shared/components/PopupScanBarCode/PopupScanBarCode";
import PopupDetailBoxCard from "../../../../shared/components/PopupDetailBoxCard/PopupDetailBoxCard";
import PopupAddBoxCard from "../../../../shared/components/PopupAddBoxCard/PopupAddBoxCard";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";

import styles from "./CardManagement.module.css";

import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import InfoRow from "../../../../shared/components/InfoRow/InfoRow";
import { Button } from "antd";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const data = [
    {
        boxCode: "HO1",
        stageCode: "CD01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        jobOutputCode: "J01",
        jobOutPutName: "WO-123-CĐ01-01",
    },
    {
        boxCode: "HO2",
        stageCode: "CD01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        jobOutputCode: "J01",
        jobOutPutName: "WO-123-CĐ01-01",
    },
    {
        boxCode: "HO3",
        stageCode: "CD01",
        jobCode: "J01-001",
        jobName: "In offset : Ra bản",
        jobOutputCode: "J01",
        jobOutPutName: "WO-123-CĐ01-01",
    },
];
export const CardManagement = () => {
    const [isVisibleScanBarCode, setIsVisibleScanBarCode] = React.useState<boolean>(false);
    const [isVisibleDetailBoxCard, setIsVisibleDetailBoxCard] = React.useState<boolean>(false);
    const [isVisibleAddBoxCard, setIsVisibleAddBoxCard] = React.useState<boolean>(false);
    const [isVisibleDelJobOutput, setIsVisibleDelJobOutput] = React.useState<boolean>(false);

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(data?.length / pageSize);
    const dataPage = data?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const { setBreadcrumbData } = useBreadcrumb();
    const { t } = useTranslation(["common"]);
    React.useEffect(() => {
        if (setBreadcrumbData) {
            setBreadcrumbData({
                items: [
                    {
                        key: "info-manage",
                        title: "management-info.mana-info"
                    },
                    {
                        key: "manage-card-box",
                        title: "management-info.management-box-card.breadcrumb-label"
                    }
                ]
            })
        }
    }, []);

    const handleJobOutputDetail = (row: any) => {
        return <JobOutPutDetail data={row.data} />;
    };

    const handleCustomFooterButton = [
        <div>
            <div className={cx("footer-container")}>
                <Button
                    key='cancel'
                    className={cx("btn-cancel")}
                    onClick={() => setIsVisibleAddBoxCard(false)}>
                    {t("common.cancel-button")}
                </Button>
                <Button
                    key='submit'
                    onClick={() => { }}
                    className={cx(["btn", "btn-add"])}
                >
                    {t("common.add-button")}
                </Button>
                <Button
                    key='submit'
                    onClick={() => { }}
                    className={cx(["btn", "btn-save"])}>
                    In mã
                </Button>
            </div>
        </div>,
    ];

    return (
        <>
            {
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
                                {t("management-info.management-box-card.label")}
                            </h5>
                        </div>
                        <DataGrid
                            key={"boxCode"}
                            keyExpr={"boxCode"}
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
                            <PopupScanBarCode
                                isVisible={isVisibleScanBarCode}
                                modalContent={
                                    <div style={{
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '5px'
                                    }}>
                                        <h3 style={{ display: "flex", justifyContent: "center", fontWeight: 500 }}>Customer: VP Bank - Chíp D350</h3>
                                        <div style={{
                                            display: "flex", justifyContent: "center", flexDirection: 'row',
                                        }}>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <Barcode value='Cool Girl' textAlign='center' font='monospace' />
                                            </div>
                                            <div>
                                                <InfoRow label='Quantity' data='500 pcs' />
                                                <InfoRow label='Pro.code' data='<Empty>' />
                                                <InfoRow label='Box' data='<Empty>' />
                                                <InfoRow label='Card type' data='<Empty>' />
                                                <InfoRow label='Packing date' data='25/08/2023' />
                                            </div>
                                        </div>

                                    </div>
                                }
                                modalTitle={
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon
                                            sizeIcon={25}
                                            icon='assets/icons/Announcement.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        Quét mã Bar code
                                    </div>
                                }
                                width={800}
                                onCancel={() => setIsVisibleScanBarCode(false)}
                                onSubmit={() => { }}
                            />
                            <PopupDetailBoxCard
                                isVisible={isVisibleDetailBoxCard}
                                modalContent={
                                    <div>
                                        <div>
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                <td>
                                                    <Barcode value='712345 67001' textAlign='center' font='monospace' />
                                                </td>
                                                <td style={{ marginLeft: 30 }}>
                                                    <p>Mã hộp</p>
                                                    <TextBox id='boxCode' key={"boxCode"} value='H12' width={250}></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã công đoạn</p>
                                                    <TextBox id='stageCode' key={"stageCode"} value='CDD01, CDD02, CĐ03'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job</p>
                                                    <TextBox id='jobCode' key={"jobCode"} value='J01-001'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job output</p>
                                                    <TextBox id='jobOutputCode' key={"jobOutputCode"} value='J01'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng thẻ trong hộp</p>
                                                    <TextBox id='boxCardQuantity' key={"boxCardQuantity"} value='25'></TextBox>
                                                </td>
                                                <td>
                                                    <p>Tên hộp</p>
                                                    <TextBox id='boxName' key={"boxName"} value='Hộp đựng BTP' width={250}></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên công đoạn</p>
                                                    <TextBox id='stageName' key={"stageName"} value='In offset, In lưới'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job</p>
                                                    <TextBox id='jobName' key={"jobName"} value='3,000'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job output</p>
                                                    <TextBox id='jobOutputName' key={"jobOutputName"} value='W0-123-CDD01-001'></TextBox>
                                                </td>
                                            </table>
                                        </div>
                                    </div>
                                }
                                modalTitle={
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon
                                            sizeIcon={25}
                                            icon='assets/icons/Announcement.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        Quét mã Bar code
                                    </div>
                                }
                                width={1000}
                                onCancel={() => setIsVisibleDetailBoxCard(false)}
                                onSubmit={() => { }}
                            />
                            <PopupAddBoxCard
                                isVisible={isVisibleAddBoxCard}
                                modalTitle={
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon
                                            sizeIcon={25}
                                            icon='assets/icons/Announcement.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        Thêm mới hộp chứa thẻ
                                    </div>
                                }
                                modalContent={
                                    <div>
                                        <div style={{ marginTop: 40, marginBottom: 30 }}>
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                <td>
                                                    <Barcode value='712345 67001' textAlign='center' font='monospace' />
                                                </td>
                                                <td style={{ marginLeft: 30 }}>
                                                    <p>Mã hộp</p>
                                                    <TextBox id='boxCode' key={"boxCode"} value='H12' width={250}></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã công đoạn</p>
                                                    <TextBox id='stageCode' key={"stageCode"} value=''></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job</p>
                                                    <TextBox id='jobCode' key={"jobCode"} placeholder='Nhập mã Job'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Mã Job output</p>
                                                    <TextBox
                                                        id='jobOutputCode'
                                                        key={"jobOutputCode"}
                                                        placeholder='Nhập mã Job output'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng thẻ trong hộp</p>
                                                    <TextBox
                                                        id='boxCardQuantity'
                                                        key={"boxCardQuantity"}
                                                        placeholder='Nhập số lượng thẻ trong hộp'></TextBox>
                                                </td>
                                                <td style={{ marginRight: 30 }}>
                                                    <p>Tên hộp</p>
                                                    <TextBox id='boxName' key={"boxName"} placeholder='Nhập tên hộp' width={250}></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên công đoạn</p>
                                                    <SelectBox id='stageName' key={"stageName"} placeholder='Chọn'></SelectBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job</p>
                                                    <TextBox id='jobName' key={"jobName"} placeholder='Nhập tên Job'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên Job output</p>
                                                    <TextBox
                                                        id='jobOutputName'
                                                        key={"jobOutputName"}
                                                        placeholder='Nhập tên Job output'></TextBox>
                                                </td>
                                            </table>
                                        </div>
                                    </div>
                                }
                                width={1000}
                                onCancel={() => {
                                    setIsVisibleAddBoxCard(false);
                                }}
                                onSubmit={() => { }}
                                customFooter={handleCustomFooterButton}
                            />
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
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        text='Thêm mới mã thẻ'
                                        onClick={() => { }}
                                        tooltipTitle='Thêm mới mã thẻ'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/CircleAdd.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        text={t("common.add-button")}
                                        onClick={() => {
                                            setIsVisibleAddBoxCard(true);
                                        }}
                                        tooltipTitle={t("common.add-button")}
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/CircleAdd.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem>
                                    <SvgIcon
                                        text='In mã'
                                        onClick={() => setIsVisibleScanBarCode(true)}
                                        tooltipTitle='In mã'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/Print.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
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
                            <ColumnChooser enabled={true} allowSearch={true} title='Chọn cột' mode='select' />
                            <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />

                            <Column caption={"Mã hộp"} dataField={"boxCode"} alignment='left' width={100} />
                            <Column caption={"Mã công đoạn"} dataField={"stageCode"} />
                            <Column caption={"Mã Job"} dataField={"jobCode"} />
                            <Column caption={"Tên Job"} dataField={"jobName"} />
                            <Column caption={"Mã Job Output"} dataField={"jobOutputCode"} />
                            <Column caption={"Tên Job Output"} dataField={"jobOutPutName"} />
                            <Column
                                type={"buttons"}
                                fixed={true}
                                fixedPosition="right"
                                caption={"Thao tác"}
                                alignment='center'
                                cellRender={() => (
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <SvgIcon
                                            onClick={() => setIsVisibleDetailBoxCard(true)}
                                            tooltipTitle='Xem chi tiết hộp chứa thẻ'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/InfoCircle.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => { }}
                                            tooltipTitle='Bar Code'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/BarCode.svg'
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
                            <MasterDetail enabled={true} component={handleJobOutputDetail} />
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
            }
        </>
    );
};

export default CardManagement;
