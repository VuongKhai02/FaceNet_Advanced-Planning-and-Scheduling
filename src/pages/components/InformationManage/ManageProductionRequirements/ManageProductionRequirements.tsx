import React from "react";
import { DataGrid, TextBox } from "devextreme-react";
import {
    Column,
    FilterRow,
    Item as ToolbarItem,
    SearchPanel,
    Toolbar,
    ColumnChooser,
    OperationDescriptions,
} from "devextreme-react/data-grid";
import "./ManageProductionRequirements.css";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import { WarningOutlined } from "@ant-design/icons";
import PopupDetailProductionRequire from "../../../../shared/components/PopupDetailProductionRequire/PopupDetailProductionRequire";
import ViewDetailProductRequires from "./ViewDetailProductRequires/ViewDetailProductRequires";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { PLANNING_API_URL } from "../../../../utils/config";
import httpRequests from "../../../../utils/httpRequests";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import { Tag } from "antd";
import { customizeColor, getColor } from "../../../../utils/utils";
import { useTranslation } from "react-i18next";
import NotificationManager from "../../../../utils/NotificationManager";

export const ManageProductionRequirements = () => {
    const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);
    const [isVisibleDetailProductionRequire, setIsVisibleDetailProductionRequire] = React.useState<boolean>(false);
    const [isViewDetailProductRequire, setIsViewDetailProductRequire] = React.useState<boolean>(false);
    const [productionRequirements, setProductionRequirements] = React.useState<any>([]);
    const [productionRequirementChoosed, setProductionRequirementChoosed] = React.useState<any>(null);

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const totalPage = Math.ceil(productionRequirements?.length / pageSize);
    const dataPage = productionRequirements?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    const { setBreadcrumbData } = useBreadcrumb();
    const { t } = useTranslation(["common"]);

    React.useEffect(() => {
        if (setBreadcrumbData) {
            setBreadcrumbData({
                items: [
                    {
                        key: "info-manage",
                        title: "management-info.mana-info",
                    },
                    {
                        key: "manage-production-equirements",
                        title: "management-info.manufacture-request.breadcrumb-label",
                    }
                ]

            })
        }
    }, []);

    const getProductionRequirements = () => {
        httpRequests.get(PLANNING_API_URL + "/api/production_requirements").then((response) => {
            if (response.status === 200) {
                console.log(response.data.data);
                setProductionRequirements(response.data.data.data)
            }
        });
    }

    React.useEffect(() => {
        getProductionRequirements()
    }, [])

    const handleShowModalDel = () => {
        setIsConfirmDelete(true);
    };
    const NotificationDelete = () => {
        NotificationManager.success(t("Xóa dữ liệu thành công!"))
    }


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

    const onPriorityRender = (value: any) => {
        let customColor: {
            color: string,
            backgroundColor: string
        } = {
            color: "",
            backgroundColor: ""
        }
        let status = "";
        let border = "";
        getColor(value.data.priority);
        customColor = customizeColor(value.data.priority)
        border = "1px solid" + customColor.color;
        return <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Tag style={{
                    height: "20px",
                    "fontWeight": "bold",
                    "width": "30px",
                    "textAlign": "center",
                    "color": customColor.color,
                    "backgroundColor": customColor.backgroundColor,
                    "borderRadius": "100px",
                    "border": border
                }}>{value.data.priority}</Tag>
            </div>
        </>
    }

    return (
        <>
            {isViewDetailProductRequire ? (
                <ViewDetailProductRequires
                    isOpen={isViewDetailProductRequire}
                    setClose={() => {
                        setIsViewDetailProductRequire(false);
                    }}
                />
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
                                {t("management-info.manufacture-request.label")}
                            </h5>
                        </div>
                        <div>
                            <DataGrid
                                key='id'
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
                                <PopupDetailProductionRequire
                                    isVisible={isVisibleDetailProductionRequire}
                                    modalContent={
                                        <div >
                                            <table style={{ display: "flex", justifyContent: "space-between" }}>
                                                <td>
                                                    <p>Mã sx/Production Code </p>
                                                    <TextBox
                                                        disabled
                                                        id='productionCode'
                                                        key={"productionCode"}
                                                        value={productionRequirementChoosed?.productionCode}
                                                        width={300}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên khách hàng/Customer</p>
                                                    <TextBox
                                                        disabled
                                                        id='customer'
                                                        key={"customer"}
                                                        value={productionRequirementChoosed?.customer}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Tên thẻ/Card name </p>
                                                    <TextBox
                                                        disabled
                                                        id='cardName'
                                                        key={"cardName"}
                                                        value={productionRequirementChoosed?.cardName}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số HĐ/P.O</p>
                                                    <TextBox
                                                        disabled
                                                        id='someContracts'
                                                        key={"someContracts"}
                                                        value={productionRequirementChoosed?.poNumber}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Bắt đầu sx/Start </p>
                                                    <TextBox disabled id='start' key={"start"} value={productionRequirementChoosed?.startDate} className='colorTextBox'></TextBox>
                                                </td>
                                                <td>
                                                    <p>Người gửi/Sender</p>
                                                    <TextBox
                                                        disabled
                                                        id='sender'
                                                        key={"sender"}
                                                        value={productionRequirementChoosed?.sender}
                                                        width={300}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Số lượng thẻ/Q'ty</p>
                                                    <TextBox
                                                        disabled
                                                        id='quantity'
                                                        key={"'quantity'"}
                                                        value={productionRequirementChoosed?.quantityRequirement}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>SL thẻ đã tính bù hao</p>
                                                    <TextBox
                                                        disabled
                                                        id='lossCard'
                                                        key={"lossCard"}
                                                        value={productionRequirementChoosed?.quantityCompensation}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Kết thúc sx/Finish</p>
                                                    <TextBox
                                                        disabled
                                                        id='finish'
                                                        key={"finish"}
                                                        value={productionRequirementChoosed?.endDate}
                                                        className='colorTextBox'></TextBox>
                                                    <p style={{ marginTop: 30 }}>Giao hàng/ Delivery Date</p>
                                                    <TextBox
                                                        disabled
                                                        id='deliveryDate'
                                                        key={"deliveryDate"}
                                                        value={productionRequirementChoosed?.deliveryDate}
                                                        className='colorTextBox'></TextBox>
                                                </td>
                                            </table>
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
                                            Thông tin chi tiết yêu cầu sản xuất
                                        </div>
                                    }
                                    width={800}
                                    onCancel={() => { setIsVisibleDetailProductionRequire(false); setProductionRequirementChoosed(null) }}
                                    onSubmit={() => { }}
                                />
                                <PopupConfirmDelete
                                    isVisible={isConfirmDelete}
                                    onCancel={() => setIsConfirmDelete(false)}
                                    onSubmit={() => { NotificationDelete(); setIsConfirmDelete(false) }}
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
                                                Xóa dữ liệu
                                            </h3>
                                        </div>
                                    }
                                    modalContent={
                                        <div>
                                            <h4 style={{ fontWeight: 400 }}>
                                                Bạn có chắc chắn muốn xóa <b>Dữ liệu hiện tại</b>?
                                            </h4>
                                            <div
                                                style={{
                                                    backgroundColor: "#ffe0c2",
                                                    borderLeft: "4px solid #ff794e",
                                                    height: 100,
                                                    borderRadius: 5,
                                                }}>
                                                <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                                    <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                                    Lưu ý:
                                                </h3>
                                                <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                                    Nếu bạn xóa <b>Dữ liệu hiện tại </b> thì các thông tin liên quan đều bị mất
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    width={600}
                                />
                                <Toolbar>
                                    <ToolbarItem name='searchPanel' location='before' />
                                    <ToolbarItem name='columnChooserButton' location='after'></ToolbarItem>
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
                                <SearchPanel visible={true} placeholder={t("common.search-placeholder")} width={300} />
                                <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />

                                <Column dataField='productionCode' caption='Mã sản xuất' />
                                <Column dataField='salesOrderCode' caption='Mã đơn hàng' />
                                <Column dataField='salesOrderCode' caption='Mã khách hàng' />
                                {/* <Column dataField='poNumber' caption='Số hợp đồng' /> */}
                                <Column dataField='customer' caption='Tên khách hàng' alignment='left' />
                                <Column dataField='cardName' caption='Mã thẻ' alignment={"left"} />
                                <Column dataField='cardName' caption='Tên thẻ' alignment={"left"} />
                                <Column dataField='quantityRequirement' caption='Số lượng thẻ' alignment="left" />
                                <Column caption={"Ngày bắt đầu"} dataType='datetime' dataField={"startDate"} format='dd/MM/yyyy' />
                                <Column
                                    dataField='endDate'
                                    dataType='datetime'
                                    format='dd/MM/yyyy'
                                    alignment={"left"}
                                    caption={"Ngày kết thúc"}
                                />
                                <Column caption={"Mức độ ưu tiên"} dataField='priority' cellRender={onPriorityRender} />
                                <Column caption={"Trạng thái"} dataField='status' cellRender={onStatusRender} />
                                <Column
                                    fixed={true}
                                    type={"buttons"}
                                    caption={"Thao tác"}
                                    alignment='center'
                                    cellRender={(cellInfo) => (
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <SvgIcon
                                                onClick={() => {
                                                    setIsViewDetailProductRequire(true);
                                                }}
                                                tooltipTitle='Xem chi tiết yêu cầu sản xuất'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/InfoCircle.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={() => {
                                                    console.log(cellInfo.data.id)
                                                    setIsVisibleDetailProductionRequire(true);
                                                    setProductionRequirementChoosed(productionRequirements.find((item: any) => item.id === cellInfo.data.id))
                                                }}
                                                tooltipTitle='Thêm phiếu công nghệ'
                                                sizeIcon={17}
                                                textSize={17}
                                                icon='assets/icons/Add.svg'
                                                textColor='#FF7A00'
                                                style={{ marginRight: 17 }}
                                            />
                                            <SvgIcon
                                                onClick={handleShowModalDel}
                                                tooltipTitle='Xóa'
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
                                pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: productionRequirements?.length }}
                                totalPages={totalPage}
                                pageIndex={pageIndex}
                                pageSize={pageSize}
                                onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                                onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default ManageProductionRequirements;
