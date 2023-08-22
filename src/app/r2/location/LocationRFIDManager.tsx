import { registerScreen } from "@haulmont/jmix-react-ui";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    Editing,
    Export,
    FilterRow,
    HeaderFilter,
    Item,
    OperationDescriptions,
    Pager,
    Paging,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import { Popup as StandalonePopup } from "devextreme-react/popup";
import { LoadPanel } from "devextreme-react/load-panel";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { Button } from "devextreme-react/button";
import { PLANNING_API_URL } from "../../../config";
import { toastError, toastSuccess } from "../../../utils/ToastifyManager";
import axios from "axios";
import LocationImport from "../../profile/LocationImport";
import { Area } from "../../../jmix/entities/Area";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { LocationRfid } from "../../../jmix/entities/LocationRfid";

type LocationRfidProps = {
    locationAreaid?: Area | null;
};

const LocationRFIDManager: React.FC<LocationRfidProps> = observer(({ locationAreaid = undefined }) => {
    const mainStore = useMainStore();
    const locationRfidCollection = useCollection<LocationRfid>(LocationRfid.NAME, {
        view: "_base",
        loadImmediately: false,
    });

    // const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
    //     view: '_base',
    //     loadImmediately: false,
    // });

    const [locationRfids, setLocationRfids] = useState<LocationRfid[] | undefined>(undefined);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
    const [popupImportIsOpen, setPopupImportIsOpen] = useState<boolean>(false);

    useEffect(() => {
        loadLocationRfids();
    }, []);

    const loadLocationRfids = async () => {
        await locationRfidCollection.current.load().then((res) => {
            if (locationRfidCollection.current.items) {
                setLocationRfids(locationRfidCollection.current.items);
            }
        });
    };

    const syncDataSublocation = () => {
        setLoadPanelVisible(true);
        axios
            .get(PLANNING_API_URL + "/services/api/location/syncPanaCIMMC", {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then(function (response) {
                toastSuccess("Đồng bộ dữ liệu theo trường Sublocation thành công");
                setLoadPanelVisible(false);
            })
            .catch(function (err) {
                toastError(err.response?.data?.message);
                setLoadPanelVisible(false);
            });
    };

    const onExportLocationRFID = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Location");

        exportDataGrid({
            component: e.component,
            worksheet,
            topLeftCell: { row: 4, column: 1 },
        })
            .then((cellRange) => {
                const headerRow = worksheet.getRow(2);
                headerRow.height = 30;
                worksheet.mergeCells(2, 1, 2, 8);

                headerRow.getCell(1).value = "Location";
                headerRow.getCell(1).font = { name: "Segoe UI Light", size: 22 };
                headerRow.getCell(1).alignment = { horizontal: "center" };

                // @ts-ignore
                const footerRowIndex = cellRange.to.row + 2;
                const footerRow = worksheet.getRow(footerRowIndex);
                worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);

                footerRow.getCell(1).value = "https://rangdong.com.vn";
                footerRow.getCell(1).font = { color: { argb: "BFBFBF" }, italic: true };
                footerRow.getCell(1).alignment = { horizontal: "right" };
            })
            .then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Location.xlsx");
                    toastSuccess("Xuất file xlsx Location thành công");
                });
            });
        e.cancel = true;
    };

    const setPopUpImportClose = () => {
        setPopupImportIsOpen(false);
    };

    const setPopUpImportOpen = () => {
        setPopupImportIsOpen(true);
    };

    const popUpImportRender = () => {
        return <LocationImport />;
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    return (
        <div id='location-RFID-view'>
            <StandalonePopup
                visible={popupImportIsOpen ? popupImportIsOpen : false}
                onHiding={setPopUpImportClose}
                title='Import Location - Map RFID'
                showTitle={true}
                fullScreen={false}
                contentRender={popUpImportRender}
                hideOnOutsideClick={true}></StandalonePopup>

            <div>
                <div
                    className='informer'
                    style={{
                        textAlign: "center",
                        background: "#fff",
                        paddingTop: 12,
                    }}>
                    <h5
                        className='name'
                        style={{
                            fontSize: 18,
                            marginBottom: 0,
                        }}>
                        Quản lý Location
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
                <DataGrid
                    keyExpr='id'
                    showColumnLines={true}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    repaintChangesOnly={true}
                    showBorders={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    focusedRowEnabled={true}
                    dataSource={locationRfids}
                    onExporting={onExportLocationRFID}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Export
                        enabled={true}
                        texts={{
                            exportAll: "Xuất file Excel",
                        }}
                    />

                    <Toolbar>
                        <Item location='after'>
                            <Button icon='import' hint='Import' onClick={setPopUpImportOpen} />
                        </Item>
                        <Item location={"after"} name={"exportButton"} />
                        <Item location='after'>
                            <Button hint='Đồng bộ' icon='pulldown' onClick={syncDataSublocation} />
                        </Item>

                        <Item name='searchPanel' location='before'></Item>

                        <Item name='columnChooserButton'></Item>
                    </Toolbar>

                    <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText='Đặt lại'>
                        <OperationDescriptions
                            startsWith='Bắt đầu với'
                            equal='Bằng'
                            endsWith='Kết thúc với'
                            contains='Chứa'
                            notContains='Không chứa'
                            notEqual='Không bằng'
                            lessThan='Nhỏ hơn'
                            lessThanOrEqual='Nhỏ hơn hoặc bằng'
                            greaterThan='Lớn hơn'
                            greaterThanOrEqual='Lớn hơn hoặc bằng'
                            between='Nằm giữa'
                        />
                    </FilterRow>

                    <SearchPanel visible={true} placeholder='VD: RD' />
                    <HeaderFilter
                        visible={true}
                        allowSearch={true}
                        texts={{
                            cancel: "Hủy bỏ",
                            ok: "Đồng ý",
                            emptyValue: "Rỗng",
                        }}
                    />
                    <Paging enabled={true} defaultPageSize={20} />
                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[5, 10]}
                        infoText='Trang số {0} trên {1} ({2} bản ghi)'
                    />
                    <Editing
                        // mode='form'
                        mode='row'
                        useIcons={true}
                        allowUpdating={true}
                        allowAdding={true}
                        texts={{
                            editRow: "Sửa",
                            saveRowChanges: "Lưu lại",
                            cancelRowChanges: "Hoàn tác",
                        }}
                    />
                    <Column type='buttons' caption={"Tùy chọn"} alignment={"center"}></Column>
                    <Column dataField='area' caption={"Mã kho"} alignment='left' allowEditing={true} />
                    <Column dataField='locationCode' caption={"Location ID"} alignment='left' allowEditing={true} />
                    <Column dataField='locationName' caption={"Location Name"} alignment='left' allowEditing={true} />

                    <Column dataField={"subLocationName"} caption='SubLocation' allowEditing={true} />
                    <Column dataField='rfId' caption='RF-ID Code' allowEditing={true} />
                </DataGrid>
            </div>
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={"center"}
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                hideOnOutsideClick={true}
                message='Đang tải...'
            />
        </div>
    );
});

export default LocationRFIDManager;

const ROUTING_PATH = "/locationRFIDManager";
registerScreen({
    component: LocationRFIDManager,
    caption: "Quản lý Location",
    screenId: "screen.LocationRFIDManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
