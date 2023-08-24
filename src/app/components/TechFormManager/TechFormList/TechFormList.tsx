import React, { useEffect, useState } from "react";
import { Button, DataGrid, Popup } from "devextreme-react";
import {
    Column,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
    ColumnChooser,
} from "devextreme-react/data-grid";
import "./TechFormList.css";
import { useMainStore } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-ui";
import TechFormBodyCard from "./TechFormNewAdd/TechFormBodyCard/TechFormBodyCard";
import PopupImportFile from "../../../shared/components/PopupImportFile/PopupImportFile";
import SvgIcon from "../../../icons/SvgIcon/SvgIcon";
import { WarningOutlined } from "@ant-design/icons";
import PopupSendSAP from "../../../shared/components/PopupSendSAP/PopupSendSAP";
import TechFormUpdate from "../TechFormUpdate/TechFormUpdate";
import BOMBodyCardAddInfo from "../../BOM/BOMBodyCard/BOMBodyCardAddInfo/BOMBodyCardAddInfo";
import PopupConfirmGeneral from "../../../shared/components/PopupConfirmGeneral/PopupConfirmGeneral";
import { PLANNING_API_URL } from "../../../../config";
import axios from "axios";

const data = [
    {
        soCode: "1237891",
        manufactureCode: "123567",
        customerName: "BIDV",
        cardName: "Visa BIDV",
        quantity: "1000",
        startDate: "09/08/2023",
        endDate: "10/08/2023",
        priority: "2",
        status: "Đã tạo KHSX",
    },
    {
        soCode: "1237892",
        manufactureCode: "123567",
        customerName: "BIDV",
        cardName: "Visa BIDV",
        quantity: "1000",
        startDate: "09/08/2023",
        endDate: "10/08/2023",
        priority: "2",
        status: "Đã tạo KHSX",
    },
    {
        soCode: "1237893",
        manufactureCode: "123567",
        customerName: "BIDV",
        cardName: "Visa BIDV",
        quantity: "1000",
        startDate: "09/08/2023",
        endDate: "10/08/2023",
        priority: "2",
        status: "Đã tạo KHSX",
    },
];

const dataSource = [
    { id: 1, label: "Option 1", checked: false },
    { id: 2, label: "Option 2", checked: false },
    { id: 3, label: "Option 3", checked: false },
];
const ROUTING_PATH = "/techFormList";
const allowedPageSizes: (number | "auto" | "all")[] = [5, 10, "all"];
export const TechFormList = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);
    const [isModalVisibleSendSAP, setIsModalVisibleSendSAP] = React.useState<boolean>(false);
    const [isPrioritizeLevelChange, setIsPrioritizeLevelChange] = React.useState<boolean>(false);
    const [isVisibleTechFormUpdate, setIsVisibleTechFormUpdate] = React.useState<boolean>(false);
    const [isVisibleBOMBodyCardAddInfo, setIsVisibleBOMBodyCardAddInfo] = React.useState<boolean>(false);
    const [popupVisibleIcon, setPopupVisibleIcon] = React.useState<boolean>(false);
    const [newButtons, setNewButtons] = React.useState<any>([]);

    // const [isVisibleTechFormUpdate, setIsVisibleTechFormUpdate] = React.useState<boolean>(false);
    // const [isVisibleBOMBodyCardAddInfo, setIsVisibleBOMBodyCardAddInfo] = React.useState<boolean>(false);
    // const [popupVisibleIcon, setPopupVisibleIcon] = React.useState<boolean>(false);
    // const [newButtons, setNewButtons] = React.useState<any>([]);
    const [techFormIdChoosed, setTechFormIdChoosed] = React.useState(null);
    const mainStore = useMainStore();

    const [techForms, setTechForms] = React.useState([]);

    const handleAddFormTech = () => {
        setIsAddNewTechForm(true);
    };

    const handleShowUploadImport = () => {
        setPopupVisible(true);
    };

    const hidePopupIcon = () => {
        setPopupVisibleIcon(false);
    };

    const handleAddNewButton = () => {
        setNewButtons([...newButtons, { text: "Thêm mới button", width: 300 }]);
    };

    const loadTechForms = () => {
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "application/json",
        };
        axios.get(PLANNING_API_URL + "/api/techforms", { headers }).then((response) => {
            if (response.status === 200) {
                console.log(response.data.data.data)
                setTechForms(response.data.data.data);
            }
        });
    };
    console.log(techForms);

    useEffect(() => {
        loadTechForms();
    }, []);

    const popupContentIcon = (
        <div
            onClick={() => {
                hidePopupIcon();
            }}>
            <div className='icon-more'>
                <SvgIcon
                    onClick={() => {}}
                    text='Thay đổi mức độ ưu tiên'
                    tooltipTitle='Thay đổi mức độ ưu tiên'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/Compass.svg'
                    textColor='#000'
                    style={{ marginLeft: 17 }}
                />
            </div>
            <div className='icon-more'>
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
            <div className='icon-more'>
                <SvgIcon
                    onClick={() => {}}
                    text='Gửi SAP'
                    tooltipTitle='Gửi SAP'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/CircleRight.svg'
                    textColor='#000'
                    style={{ marginLeft: 17 }}
                />
            </div>
            <div className='icon-more'>
                <SvgIcon
                    onClick={handleAddNewButton}
                    text='Thêm mới'
                    tooltipTitle='Thêm mới'
                    sizeIcon={17}
                    textSize={17}
                    icon='assets/icons/Add.svg'
                    textColor='#FF7A00'
                    style={{ marginLeft: 17 }}
                />
            </div>
            {newButtons.map((button, index) => (
                <div key={index} className='icon-more'>
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
                <TechFormBodyCard isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
            ) : (
                <div>
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
                        <div
                            className='informer'
                            style={{
                                backgroundColor: "#ffffff",
                                paddingLeft: 13,
                            }}>
                            <h5
                                className='name'
                                style={{
                                    color: "rgba(0, 0, 0, 0.7)",
                                    marginBottom: 0,
                                    fontSize: 15,
                                    boxSizing: "border-box",
                                    fontWeight: 550,
                                }}>
                                Tìm kiếm chung
                            </h5>
                        </div>
                        <PopupImportFile
                            visible={popupVisible}
                            onCancel={() => setPopupVisible(false)}
                            title={"Import file"}
                            onSubmit={() => {}}
                            width={900}
                        />
                        <PopupSendSAP
                            isVisible={isModalVisibleSendSAP}
                            onCancel={() => {
                                setIsModalVisibleSendSAP(false);
                            }}
                            onSubmit={() => {}}
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
                                    <h5 style={{ fontWeight: 400, marginTop: 30 }}>
                                        Bạn có chắc chắn muốn gửi thông tin phiếu công nghệ sang SAP?
                                    </h5>
                                </div>
                            }
                            modalContent={
                                <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e" }}>
                                    <h3 style={{ color: "#ff794e" }}>
                                        <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                        Lưu ý:
                                    </h3>
                                    <p style={{ marginLeft: 20, fontSize: 15 }}>
                                        Tất cả các thông tin của phiếu công nghệ sẽ được gửi lên SAP và không được chỉnh sửa !
                                    </p>
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
                            dataSource={techForms}
                            showBorders={true}
                            columnAutoWidth={true}
                            showRowLines={true}
                            rowAlternationEnabled={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}>
                            <Toolbar>
                                <ToolbarItem location='after'>
                                    <SvgIcon
                                        tooltipTitle='Thêm mới'
                                        text='Thêm mới'
                                        onClick={handleAddFormTech}
                                        sizeIcon={17}
                                        textSize={17}
                                        icon='assets/icons/CirclePlus.svg'
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
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    ok: "Đồng ý",
                                    emptyValue: "Rỗng",
                                }}
                                allowSearch={true}
                            />
                            <FilterRow visible={true} />
                            <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
                            <SearchPanel visible={true} placeholder={"VD: PO"} />
                            <Paging defaultPageSize={5} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={"compact"}
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />

                            <Column caption={"Mã SO"} dataField={"soCode"} alignment='left' width={100} />
                            <Column caption={"Mã sản xuất"} dataField={"productionRequirement.productionCode"} />
                            <Column caption={"Tên khách hàng"} dataField={"productionRequirement.customer"} />
                            <Column caption={"Tên thẻ"} dataField={"productionRequirement.cardName"} />
                            <Column caption={"Số lượng"} dataField={"productionRequirement.quantityRequirement"} />
                            <Column caption={"Ngày bắt đầu"} dataType='date' dataField={"productionRequirement.startDate"} format='dd/MM/yyyy' />
                            <Column caption={"Ngày kết thúc"} dataType='date' dataField={"productionRequirement.endDate"} format='dd/MM/yyyy' />
                            <Column caption={"Mức độ ưu tiên"} dataField={"priority"} />
                            <Column caption={"Trạng thái"} dataField='status' />
                            <Column
                                type={"buttons"}
                                caption={"Thao tác"}
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
                                            onClick={() => setIsVisibleBOMBodyCardAddInfo(true)}
                                            tooltipTitle='Tạo BOM'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Folder.svg'
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
                                        />
                                        <SvgIcon
                                            onClick={() => {}}
                                            tooltipTitle='Tạo KHSX'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/CirclePlus.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => {}}
                                            tooltipTitle='Xóa'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/Trash.svg'
                                            textColor='#FF7A00'
                                            style={{ marginRight: 17 }}
                                        />
                                        <SvgIcon
                                            onClick={() => setPopupVisibleIcon(true)}
                                            tooltipTitle='Khác'
                                            sizeIcon={17}
                                            textSize={17}
                                            icon='assets/icons/More.svg'
                                            textColor='#FF7A00'
                                        />
                                    </div>
                                )}
                            />
                            {isVisibleTechFormUpdate && (
                                <TechFormUpdate
                                    id={techFormIdChoosed}
                                    isOpen={isVisibleTechFormUpdate}
                                    setClose={() => setIsVisibleTechFormUpdate(false)}
                                />
                            )}
                            {isVisibleBOMBodyCardAddInfo && (
                                <BOMBodyCardAddInfo
                                    id={null}
                                    isOpen={isVisibleBOMBodyCardAddInfo}
                                    setClose={() => setIsVisibleBOMBodyCardAddInfo(false)}
                                />
                            )}
                        </DataGrid>
                    </div>
                    <div className='icon-more'>
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
                    <div className='icon-more'>
                        <SvgIcon
                            onClick={() => {}}
                            text='Gửi SAP'
                            tooltipTitle='Gửi SAP'
                            sizeIcon={17}
                            textSize={17}
                            icon='assets/icons/CircleRight.svg'
                            textColor='#000'
                            style={{ marginLeft: 17 }}
                        />
                    </div>
                    <div className='icon-more'>
                        <SvgIcon
                            onClick={handleAddNewButton}
                            text='Thêm mới'
                            tooltipTitle='Thêm mới'
                            sizeIcon={17}
                            textSize={17}
                            icon='assets/icons/Add.svg'
                            textColor='#FF7A00'
                            style={{ marginLeft: 17 }}
                        />
                    </div>
                    {newButtons.map((button, index) => (
                        <div key={index} className='icon-more'>
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
            )}
        </>
    );

    // return (
    //     <>
    //         {isAddNewTechForm ? (
    //             <TechFormBodyCard isOpen={isAddNewTechForm} setClose={() => setIsAddNewTechForm(false)} />
    //         ) : (
    //             <div className='box__shadow-table-responsive'>
    //                 <div className='table-responsive'>
    //                     <div
    //                         className='informer'
    //                         style={{
    //                             background: "#fff",
    //                             textAlign: "center",
    //                             paddingTop: 12,
    //                         }}>
    //                         <h5
    //                             className='name'
    //                             style={{
    //                                 fontSize: 18,
    //                                 marginBottom: 0,
    //                             }}>
    //                             Danh sách phiếu công nghệ
    //                         </h5>
    //                     </div>
    //                     <div
    //                         className='informer'
    //                         style={{
    //                             backgroundColor: "#ffffff",
    //                         }}>
    //                         <h5
    //                             className='name'
    //                             style={{
    //                                 color: "rgba(0, 0, 0, 0.7)",
    //                                 marginBottom: 0,
    //                                 fontSize: 15,
    //                                 boxSizing: "border-box",
    //                                 fontWeight: 550,
    //                             }}>
    //                             Tìm kiếm chung
    //                         </h5>
    //                     </div>
    //                     <PopupConfirmGeneral
    //                         isVisible={isPrioritizeLevelChange}
    //                         modalContent={
    //                             <div>
    //                                 <div style={{ marginLeft: 20, marginTop: 20, marginBottom: 30, fontSize: 18, fontWeight: "500" }}>
    //                                     Thay đổi mức độ ưu tiên
    //                                 </div>
    //                                 <div className='reject-reason-container'>
    //                                     <label style={{ marginLeft: 20, fontSize: 18 }}>
    //                                         Mức độ ưu tiên<span className='required'>*</span>
    //                                     </label>
    //                                     <SelectBox
    //                                         dataSource={dataSource}
    //                                         valueExpr='id'
    //                                         displayExpr='id'
    //                                         style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}
    //                                         placeholder='Chọn'
    //                                     />
    //                                 </div>
    //                             </div>
    //                         }
    //                         modalTitle={
    //                             <div style={{ display: "flex", flexDirection: "row" }}>
    //                                 <SvgIcon
    //                                     sizeIcon={25}
    //                                     icon='assets/icons/Announcement.svg'
    //                                     textColor='#FF7A00'
    //                                     style={{ marginRight: 17 }}
    //                                 />
    //                                 <span style={{ color: "#FF7A00", fontSize: 20 }}>Thay đổi mức độ ưu tiên cho phiếu công nghệ</span>
    //                             </div>
    //                         }
    //                         width={600}
    //                         onCancel={() => setIsPrioritizeLevelChange(false)}
    //                         onSubmit={() => {}}
    //                     />
    //                     <PopupImportFile
    //                         visible={popupVisible}
    //                         onCancel={() => setPopupVisible(false)}
    //                         title={"Import file"}
    //                         onSubmit={() => {}}
    //                         width={900}
    //                     />
    //                     <PopupSendSAP
    //                         isVisible={isModalVisibleSendSAP}
    //                         onCancel={() => {
    //                             setIsModalVisibleSendSAP(false);
    //                         }}
    //                         onSubmit={() => {}}
    //                         modalTitle={
    //                             <div>
    //                                 <h3
    //                                     style={{
    //                                         display: "flex",
    //                                         justifyContent: "center",
    //                                         alignItems: "center",
    //                                         color: "#ff794e",
    //                                         fontWeight: 500,
    //                                     }}>
    //                                     Xác nhận gửi SAP
    //                                 </h3>
    //                             </div>
    //                         }
    //                         modalContent={
    //                             <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e" }}>
    //                                 <h4 style={{ fontWeight: 600, marginTop: 20, marginLeft: 20 }}>
    //                                     Bạn chắc chắn muốn gửi thông tin phiếu công nghệ sang SAP?
    //                                 </h4>
    //                                 <h3 style={{ color: "#ff794e" }}>
    //                                     <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
    //                                     Lưu ý:
    //                                 </h3>
    //                                 <p style={{ marginLeft: 20, fontSize: 15 }}>
    //                                     Tất cả các thông tin của phiếu công nghệ sẽ được gửi lên SAP và không được chỉnh sửa !
    //                                 </p>
    //                             </div>
    //                         }
    //                         width={600}
    //                     />
    //                     <Popup
    //                         title='Các Icon thao tác'
    //                         visible={popupVisibleIcon}
    //                         onHiding={hidePopupIcon}
    //                         contentRender={() => popupContentIcon}
    //                         width={320}
    //                         height={350}
    //                         showCloseButton={false}
    //                         hideOnOutsideClick={true}
    //                     />
    //                     <DataGrid
    //                         key={"soCode"}
    //                         keyExpr={"soCode"}
    //                         dataSource={data}
    //                         showBorders={true}
    //                         columnAutoWidth={true}
    //                         showRowLines={true}
    //                         rowAlternationEnabled={true}
    //                         allowColumnResizing={true}
    //                         allowColumnReordering={true}
    //                         focusedRowEnabled={true}>
    //                         <Toolbar>
    //                             <ToolbarItem location='after'>
    //                                 <SvgIcon
    //                                     tooltipTitle='Thêm mới'
    //                                     text='Thêm mới'
    //                                     onClick={handleAddFormTech}
    //                                     sizeIcon={17}
    //                                     textSize={17}
    //                                     icon='assets/icons/CirclePlus.svg'
    //                                     textColor='#FF7A00'
    //                                     style={{ marginRight: 17 }}
    //                                 />
    //                             </ToolbarItem>
    //                             <ToolbarItem location='after'>
    //                                 <SvgIcon
    //                                     tooltipTitle='Import File'
    //                                     text='Import File'
    //                                     onClick={handleShowUploadImport}
    //                                     sizeIcon={17}
    //                                     textSize={17}
    //                                     icon='assets/icons/ImportFile.svg'
    //                                     textColor='#FF7A00'
    //                                     style={{ marginRight: 17 }}
    //                                 />
    //                             </ToolbarItem>
    //                             <ToolbarItem location='after'>
    //                                 <SvgIcon
    //                                     tooltipTitle='Xuất Excel'
    //                                     text='Xuất Excel'
    //                                     sizeIcon={17}
    //                                     textSize={17}
    //                                     icon='assets/icons/ExportFile.svg'
    //                                     textColor='#FF7A00'
    //                                     style={{ marginRight: 17 }}
    //                                 />
    //                             </ToolbarItem>
    //                             <ToolbarItem name='searchPanel' location='before' />
    //                             <ToolbarItem name='columnChooserButton' />
    //                         </Toolbar>
    //                         <HeaderFilter
    //                             visible={true}
    //                             texts={{
    //                                 cancel: "Hủy bỏ",
    //                                 ok: "Đồng ý",
    //                                 emptyValue: "Rỗng",
    //                             }}
    //                             allowSearch={true}
    //                         />
    //                         <FilterRow visible={true} />
    //                         <ColumnChooser enabled={true} allowSearch={true} mode='select' title='Chọn cột' />
    //                         <SearchPanel visible={true} placeholder={"Tìm kiếm..."} width={300} />
    //                         <Paging defaultPageSize={5} />
    //                         <Pager
    //                             visible={true}
    //                             allowedPageSizes={allowedPageSizes}
    //                             displayMode={"compact"}
    //                             showPageSizeSelector={true}
    //                             showInfo={true}
    //                             showNavigationButtons={true}
    //                             infoText='Trang số {0} trên {1} ({2} bản ghi)'
    //                         />

    //                         <Column caption={"Mã SO"} dataField={"soCode"} alignment='left' width={100} />
    //                         <Column caption={"Mã sản xuất"} dataField={"manufactureCode"} />
    //                         <Column caption={"Tên khách hàng"} dataField={"customerName"} />
    //                         <Column caption={"Tên thẻ"} dataField={"cardName"} />
    //                         <Column caption={"Số lượng"} dataField={"quantity"} />
    //                         <Column caption={"Ngày bắt đầu"} dataType='datetime' dataField={"startDate"} format='dd/MM/yyyy hh:mm:ss' />
    //                         <Column caption={"Ngày kết thúc"} dataType='datetime' dataField={"endDate"} format='dd/MM/yyyy hh:mm:ss' />
    //                         <Column caption={"Mức độ ưu tiên"} dataField={"priority"} />
    //                         <Column caption={"Trạng thái"} dataField='status' />
    //                         <Column
    //                             type={"buttons"}
    //                             caption={"Thao tác"}
    //                             alignment='center'
    //                             cellRender={() => (
    //                                 <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
    //                                     <SvgIcon
    //                                         onClick={() => setIsVisibleTechFormUpdate(true)}
    //                                         tooltipTitle='Cập nhật PCN'
    //                                         sizeIcon={17}
    //                                         textSize={17}
    //                                         icon='assets/icons/Edit.svg'
    //                                         textColor='#FF7A00'
    //                                         style={{ marginRight: 17 }}
    //                                     />
    //                                     <SvgIcon
    //                                         onClick={() => setIsVisibleBOMBodyCardAddInfo(true)}
    //                                         tooltipTitle='Tạo BOM'
    //                                         sizeIcon={17}
    //                                         textSize={17}
    //                                         icon='assets/icons/Folder.svg'
    //                                         textColor='#FF7A00'
    //                                         style={{ marginRight: 17 }}
    //                                     />
    //                                     <SvgIcon
    //                                         onClick={() => setIsModalVisibleSendSAP(true)}
    //                                         tooltipTitle='Gửi duyệt'
    //                                         sizeIcon={17}
    //                                         textSize={17}
    //                                         icon='assets/icons/Send.svg'
    //                                         textColor='#FF7A00'
    //                                         style={{ marginRight: 17 }}
    //                                     />
    //                                     <SvgIcon
    //                                         onClick={() => {}}
    //                                         tooltipTitle='Tạo KHSX'
    //                                         sizeIcon={17}
    //                                         textSize={17}
    //                                         icon='assets/icons/CirclePlus.svg'
    //                                         textColor='#FF7A00'
    //                                         style={{ marginRight: 17 }}
    //                                     />
    //                                     <SvgIcon
    //                                         onClick={() => {}}
    //                                         tooltipTitle='Xóa'
    //                                         sizeIcon={17}
    //                                         textSize={17}
    //                                         icon='assets/icons/Trash.svg'
    //                                         textColor='#FF7A00'
    //                                         style={{ marginRight: 17 }}
    //                                     />
    //                                     <SvgIcon
    //                                         onClick={() => setPopupVisibleIcon(true)}
    //                                         tooltipTitle='Khác'
    //                                         sizeIcon={17}
    //                                         textSize={17}
    //                                         icon='assets/icons/More.svg'
    //                                         textColor='#FF7A00'
    //                                     />
    //                                 </div>
    //                             )}
    //                         />
    //                         {isVisibleTechFormUpdate && (
    //                             <TechFormUpdate isOpen={isVisibleTechFormUpdate} setClose={() => setIsVisibleTechFormUpdate(false)} />
    //                         )}
    //                         {isVisibleBOMBodyCardAddInfo && (
    //                             <BOMBodyCardAddInfo
    //                                 isOpen={isVisibleBOMBodyCardAddInfo}
    //                                 setClose={() => setIsVisibleBOMBodyCardAddInfo(false)}
    //                             />
    //                         )}
    //                     </DataGrid>
    //                 </div>
    //             </div>
    //         )}
    //     </>
    // );
};

registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: TechFormList,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
    screenId: "techFormList",
});

export default TechFormList;
