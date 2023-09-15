import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import { DataGrid, Popup, SelectBox } from "devextreme-react";
import { Column, FilterRow, Item as ToolbarItem, SearchPanel, Toolbar, ColumnChooser, MasterDetail } from "devextreme-react/data-grid";
import TechFormBodyCard from "./TechFormNewAdd/TechFormBodyCard/TechFormBodyCard";
import PopupImportFile from "../../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../../shared/components/SvgIcon/SvgIcon";
import { WarningOutlined } from "@ant-design/icons";
import PopupSendSAP from "../../../../shared/components/PopupSendSAP/PopupSendSAP";
import TechFormUpdate from "../TechFormUpdate/TechFormUpdate";
import BOMBodyCardAddInfo from "../../BOM/BOMBodyCard/BOMBodyCardAddInfo/BOMBodyCardAddInfo";
import PopupConfirmGeneral from "../../../../shared/components/PopupConfirmGeneral/PopupConfirmGeneral";
import { PLANNING_API_URL } from "../../../../utils/config";
import CreateProductionPlan from "../../ProductionPlanManagement/ProductionPlanList/CreateProductionPlan/CreateProductionPlan";
import PopupConfirmDelete from "../../../../shared/components/PopupConfirmDelete/PopupConfirmDelete";
import PopupSelectProductionRequirement from "../../../../shared/components/PopupSelectProductionRequirement/PopupSelectProductionRequirement";
import httpRequests from "../../../../utils/httpRequests";
import { useBreadcrumb } from "../../../../contexts/BreadcrumbItems";

import styles from "./TechFormList.module.css";
import PaginationComponent from "../../../../shared/components/PaginationComponent/PaginationComponent";
import ListProduct from "../../BOM/BOMBodyCard/ListProduct/ListProduct";
import ProductionRequirementTechForm from "./ProductionRequirementList/ProductionRequirementList";
import NotificationManager from "../../../../utils/NotificationManager";

const cx = classNames.bind(styles);

const dataSource = [
    { id: 1, label: "Option 1", checked: false },
    { id: 2, label: "Option 2", checked: false },
    { id: 3, label: "Option 3", checked: false },
];
export const TechFormList = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const [isModalVisibleSendSAP, setIsModalVisibleSendSAP] = React.useState<boolean>(false);

    const [isPrioritizeLevelChange, setIsPrioritizeLevelChange] = React.useState<boolean>(false);
    const [isVisibleTechFormUpdate, setIsVisibleTechFormUpdate] = React.useState<boolean>(false);
    const [isVisibleBOMBodyCardAddInfo, setIsVisibleBOMBodyCardAddInfo] = React.useState<boolean>(false);
    const [isCreateProductionPlan, setCreateProductionPlan] = React.useState<boolean>(false);
    const [isConfirmDelete, setIsisConfirmDelete] = React.useState<boolean>(false);
    const [requestInfoChoosed, setRequestInfoChoosed] = React.useState<any>({})

    const [popupVisibleIcon, setPopupVisibleIcon] = React.useState<boolean>(false);
    const [newButtons, setNewButtons] = React.useState<any>([]);
    const [techFormIdChoosed, setTechFormIdChoosed] = React.useState(null);
    const [isOpenSelectPR, setIsOpenSelectPR] = React.useState<boolean>(false)

    const [techForms, setTechForms] = React.useState([]);
    const [pRChoosed, setPRChoosed] = React.useState(null)

    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    // const dataPage = techForms?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    const breadcrumbContext = useBreadcrumb();

    React.useEffect(() => {
        if (breadcrumbContext && breadcrumbContext.setBreadcrumbData) {
            breadcrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "tech-form-manage",
                        title: "Quản lý phiếu công nghệ",
                    },
                    {
                        key: "tech-form-list",
                        title: "Danh sách phiếu công nghệ",
                    }
                ]
            })
        }
    }, []);


    const handleAddFormTech = (info: any) => {
        setPRChoosed(info);
        setIsOpenSelectPR(false)
        setIsAddNewTechForm(true);
    };

    const handleShowUploadImport = () => {
        setPopupVisible(true);
    };

    const hidePopupIcon = () => {
        setPopupVisibleIcon(false);
    };

    const handleListProduct = useCallback(({data}) => {
        console.log(data)
        return <ProductionRequirementTechForm techFormId = {data.id}/>;
    }, [])

    const handleAddNewButton = () => {
        setNewButtons([...newButtons, { text: "Thêm mới button", width: 300 }]);
    };

    const createNewTechForm = (productionRequirementsId) => {
        if (productionRequirementsId.length > 0) {
            httpRequests.post(PLANNING_API_URL + "/api/techforms", JSON.stringify(productionRequirementsId))
            .then(response => {
                console.log(response);
                if (response.status === 200 && response.data.responseCode === '00') {
                    loadTechForms();
                    setTechFormIdChoosed(response.data.data)
                    setIsVisibleTechFormUpdate(true)
                    NotificationManager.success("Tạo phiếu công nghệ thành công")
                    console.log("Ok")
                }
            })
            .finally(() => {
                setIsOpenSelectPR(false);
            })
        }
    }

    const loadTechForms = () => {
        httpRequests.get(PLANNING_API_URL + `/api/techforms?page=${pageIndex - 1}&size=${pageSize}`).then((response) => {
            if (response.status === 200 && response.data.responseCode === '00') {
                setTechForms(response.data.data);
                setTotalPage(Math.ceil(response.data.data.totalItems / pageSize))

            }
        });
    };
    console.log(techForms);

    React.useEffect(() => {
        
        loadTechForms();
    }, [pageIndex, pageSize]);

    const updatePageSize = (size) => {
        setPageSize(size);
        setPageIndex(1);
    }

    const popupContentIcon = (
        <div
            onClick={() => {
                hidePopupIcon();
            }}>
            <div className={cx("icon-more")}>
                <SvgIcon
                    onClick={() => { }}
                    text='Thay đổi mức độ ưu tiên'
                    tooltipTitle='Thay đổi mức độ ưu tiên'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/Compass.svg'
                    textColor='#000'
                    style={{ marginLeft: 17 }}
                />
            </div>
            <div className={cx("icon-more")}>
                <SvgIcon
                    text='In'
                    tooltipTitle='In'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/Print.svg'
                    textColor='#000'
                    style={{ marginLeft: 17 }}
                />
            </div>
            <div className={cx("icon-more")}>
                <SvgIcon
                    onClick={() => { }}
                    text='Gửi SAP'
                    tooltipTitle='Gửi SAP'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/CircleRight.svg'
                    textColor='#000'
                    style={{ marginLeft: 17 }}
                />
            </div>
            <div className={cx("icon-more")}>
                <SvgIcon
                    onClick={() => { }}
                    text='Thêm mới'
                    tooltipTitle='Thêm mới'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/Add.svg'
                    textColor='#FF7A00'
                    style={{ marginLeft: 17 }}
                />
            </div>
            {newButtons.map((button: any, index: any) => (
                <div key={index} className={cx("icon-more")}>
                    <SvgIcon
                        text='Thêm mới button icon'
                        tooltipTitle='Thêm mới'
                        sizeIcon={17}
                        textSize={17}
                        icon='assets/icons/Add.svg'
                        textColor='#FF7A00'
                        style={{ marginLeft: 17 }}
                    />
                </div>
            ))}
        </div>
    );
    return (
        <>
            {isAddNewTechForm ? (
                <TechFormBodyCard prInfo={pRChoosed} isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : isCreateProductionPlan ? (
                <CreateProductionPlan isOpen={isCreateProductionPlan} setClose={() => setCreateProductionPlan(false)} />
            ) : isVisibleTechFormUpdate ? (
                <TechFormUpdate
                    id={techFormIdChoosed}
                    isOpen={isVisibleTechFormUpdate}
                    setClose={() => setIsVisibleTechFormUpdate(false)}
                />
            ) : isVisibleBOMBodyCardAddInfo ? (
                <BOMBodyCardAddInfo
                    bomTemplateId={null}
                    requestId={null}
                    id={null}
                    isOpen={isVisibleBOMBodyCardAddInfo}
                    setClose={() => {
                        setRequestInfoChoosed(null)
                        setTechFormIdChoosed(null)
                        setIsVisibleBOMBodyCardAddInfo(false)
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
                                Danh sách phiếu công nghệ
                            </h5>
                        </div>
                        <PopupConfirmGeneral
                            isVisible={isPrioritizeLevelChange}
                            modalContent={
                                <div>
                                    <div style={{ marginLeft: 20, marginTop: 20, marginBottom: 30, fontSize: 18, fontWeight: "500" }}>
                                        Thay đổi mức độ ưu tiên
                                    </div>
                                    <div className='reject-reason-container'>
                                        <label style={{ marginLeft: 20, fontSize: 18 }}>
                                            Mức độ ưu tiên<span className='required'>*</span>
                                        </label>
                                        <SelectBox
                                            dataSource={dataSource}
                                            valueExpr='id'
                                            displayExpr='id'
                                            style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}
                                            placeholder='Chọn'
                                        />
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
                                    <span style={{ color: "#FF7A00", fontSize: 20 }}>Thay đổi mức độ ưu tiên cho phiếu công nghệ</span>
                                </div>
                            }
                            width={600}
                            onCancel={() => setIsPrioritizeLevelChange(false)}
                            onSubmit={() => { }}
                        />
                        <PopupSelectProductionRequirement
                            visible={isOpenSelectPR}
                            onCancel={() => setIsOpenSelectPR(false)}
                            title={"Chọn yêu cầu sản xuất"}
                            onSubmit={handleAddFormTech}
                            width={1200}
                            onCreateTechForm={createNewTechForm}
                        />
                        <PopupImportFile
                            visible={popupVisible}
                            onCancel={() => setPopupVisible(false)}
                            title={"Import file"}
                            onSubmit={() => { }}
                            width={900}
                        />
                        <PopupSendSAP
                            isVisible={isModalVisibleSendSAP}
                            onCancel={() => {
                                setIsModalVisibleSendSAP(false);
                            }}
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
                                        Xác nhận gửi SAP
                                    </h3>
                                </div>
                            }
                            modalContent={
                                <div>
                                    <h4 style={{ fontWeight: 400 }}>Bạn chắc chắn muốn gửi thông tin phiếu công nghệ sang SAP?</h4>
                                    <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e", borderRadius: 5 }}>
                                        <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                            <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                            Lưu ý:
                                        </h3>
                                        <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                            Tất cả các thông tin của phiếu công nghệ sẽ được gửi lên SAP và không được chỉnh sửa !
                                        </p>
                                    </div>
                                </div>
                            }
                            width={600}
                        />
                        <PopupConfirmDelete
                            isVisible={isConfirmDelete}
                            onCancel={() => setIsisConfirmDelete(false)}
                            onSubmit={() => console.log("ok")}
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
                        <Popup
                            title='Các Icon thao tác'
                            visible={popupVisibleIcon}
                            onHiding={hidePopupIcon}
                            contentRender={() => popupContentIcon}
                            width={320}
                            height={350}
                            showCloseButton={false}
                            hideOnOutsideClick={true}
                        />
                        <DataGrid
                            key={"id"}
                            keyExpr={"id"}
                            dataSource={techForms?.data}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            noDataText='Không có dữ liệu để hiển thị'
                            focusedRowEnabled={true}>
                            <Toolbar>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        tooltipTitle='Thêm mới'
                                        text='Thêm mới'
                                        onClick={() => setIsOpenSelectPR(true)}
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/CircleAdd.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        tooltipTitle='Import File'
                                        text='Import File'
                                        onClick={handleShowUploadImport}
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/ImportFile.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        tooltipTitle='Xuất Excel'
                                        text='Xuất Excel'
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/ExportFile.svg'
                                        textColor='#FF7A00'
                                        style={{ marginRight: 17 }}
                                    />
                                </ToolbarItem>
                                <ToolbarItem name='searchPanel' location='before' />
                                <ToolbarItem name='columnChooserButton' />
                            </Toolbar>
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                            <SearchPanel visible={true} placeholder={"Nhập thông tin và ấn Enter để tìm kiếm"} width={300} />

                            <Column caption={"Mã phiếu công nghệ"} dataField={"techFormCode"} alignment='left' width={100} />
                            <Column caption={"Tên phiếu công nghệ"} dataField={"techFormName"} />
                            <Column caption={"Người lập"} dataField={"createdBy"} />
                            <Column caption={"Người kiểm tra"} dataField={"checkedBy"} />
                            <Column caption={"Người duyệt"} dataField={"approvedBy"} />
                            <Column caption={"Ngày bắt đầu"} dataType='date' dataField={"startDate"} format='dd/MM/yyyy' />
                            <Column caption={"Ngày kết thúc"} dataType='date' dataField={"endDate"} format='dd/MM/yyyy' />
                            <Column caption={"Lý do"} dataField={"reason"} />
                            <Column caption={"Trạng thái"} dataField='status' cellRender={(cellInfo) => {
                                return <TechFormStatus value={cellInfo.value} />
                            }}  />
                            <Column
                                fixed={true}
                                type={"buttons"}
                                caption={"Thao tác"}
                                fixedPosition="right"
                                alignment='center'
                                cellRender={(cellInfo) => (
                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                                        <SvgIcon
                                            onClick={() => {
                                                setIsVisibleTechFormUpdate(true);
                                                setTechFormIdChoosed(cellInfo.data.id);
                                            }}
                                            tooltipTitle='Cập nhật PCN'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Edit.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => setIsModalVisibleSendSAP(true)}
                                            tooltipTitle='Gửi duyệt'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Send.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />{
                                            cellInfo.data.status === "Đã phê duyệt" && 
                                                <SvgIcon
                                                    onClick={() => setCreateProductionPlan(true)}
                                                    tooltipTitle='Tạo KHSX'
                                                    sizeIcon={17}
                                                    textSize={17}
                                                    icon='assets/icons/CirclePlus.svg'
                                                    textColor='#FF7A00'
                                                    style={{ marginRight: 17 }}
                                                />
                                                
                                                
                                            }
                                            <SvgIcon
                                            onClick={() => setIsisConfirmDelete(true)}
                                            tooltipTitle='Xóa'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                    </div>
                                )}
                            />
                            <MasterDetail  enabled={true} render={handleListProduct} />
                        </DataGrid>
                        <PaginationComponent
                            pageSizeOptions={[10, 20, 40]}
                            pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: techForms?.totalItems }}
                            totalPages={totalPage}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                            onPageSizeChanged={(newPageSize) => updatePageSize(newPageSize)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default TechFormList;

export function TechFormStatus({value}) {

    const className = () => {
        switch (value) {
            case "Bản nháp":
                return "draf"
            case "Đã phê duyệt":
                return "appoved"
            case "Từ chối":
                return "refuse"
            case "Đang chờ phê duyệt":
                return "waiting"
        
            default:
                break;
        }
    }

    return ( <div className={cx('status', className())}>
        {value}
    </div> );
}

