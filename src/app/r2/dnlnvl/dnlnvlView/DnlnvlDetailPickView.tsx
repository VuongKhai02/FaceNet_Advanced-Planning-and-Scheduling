import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import {
    Column,
    ColumnChooser,
    DataGrid,
    Export,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem,
    OperationDescriptions,
    Pager,
    Paging,
    Toolbar,
} from "devextreme-react/data-grid";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { Button } from "devextreme-react/button";
import { Tooltip } from "devextreme-react/tooltip";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { str } from "../../../../utils/utils";
import { LoadPanel } from "devextreme-react/load-panel";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { locale, loadMessages } from "devextreme/localization";

const DnlnvlDetailPickView = observer(({ data }) => {
    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });

    const mainStore = useMainStore();

    const [currentDnlnvlDetailDetail, setCurrentDnlnvlDetailDetail] = useState<DnlnvlDetailDetail[] | undefined>(undefined);
    // const [isTextExportBtnTooltipShowing, setIsTextExportBtnTooltipShowing] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data?.id) {
            loadDnlnvlDetailDetail(data.id);
        }
    }, []);

    const loadDnlnvlDetailDetail = async (id) => {
        dnlnvlDetailDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvlDetail.dnlnvl.id", operator: "=", value: id }],
        };

        await dnlnvlDetailDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailDetailCollection.current.items) {
                setCurrentDnlnvlDetailDetail(dnlnvlDetailDetailCollection.current.items);
            }
        });
    };

    const refresh2 = () => {
        if (data?.id) {
            loadDnlnvlDetailDetail(data.id);
        }
    };

    locale("en");
    loadMessages({
        en: { Yes: "Đồng ý", No: "Hủy bỏ", Cancel: "Hủy", Search: "Tìm kiếm" },
    });

    const onExportDnlnvlJson = async () => {
        setIsLoading(true);
        await axios
            .get(PLANNING_API_URL + "/services/api/dnlvnl/export/json/" + data.id, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            })
            .then((res) => {
                const element = document.createElement("a");
                const file = new Blob([str(res.data)], {
                    type: "text/plain",
                });
                element.href = URL.createObjectURL(file);
                element.download = "exportDnlnvl.json";
                document.body.appendChild(element);
                element.click();

                toastSuccess("Xuất đề nghị lĩnh file json thành công");
                setIsLoading(false);
            })
            .catch(function (error) {
                toastError(error);
                setIsLoading(false);
            });
    };

    const onExportDnlnvlExcel = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("DnlnvlDetailPickView");
        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
        }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "exportDnlnvl.xlsx");
            });
        });
        e.cancel = true;
        toastSuccess("Xuất đề nghị lĩnh file xlsx thành công");
    };

    return (
        <div id='data-grid-demo'>
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={{ of: "#dnlnvl" }}
                visible={isLoading}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={false}
                message='Đang tải...'
            />
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
                dataSource={currentDnlnvlDetailDetail}
                onExporting={onExportDnlnvlExcel}
                noDataText='Không có dữ liệu để hiển thị'>
                <Export
                    enabled={true}
                    texts={{
                        exportAll: "Xuất file Excel",
                    }}
                />
                <Toolbar>
                    <ToolbarItem>
                        <Button id={"btnExportJson"} onClick={onExportDnlnvlJson} icon='jsonfile' />
                        <Tooltip target='#btnExportJson' showEvent='dxhoverstart' hideEvent='dxhoverend' closeOnOutsideClick={false}>
                            <div>Xuất file JSON</div>
                        </Tooltip>
                    </ToolbarItem>
                    <ToolbarItem name='exportButton' location={"after"} />
                    <ToolbarItem name='columnChooserButton' />
                    <ToolbarItem>
                        <Button hint='Refresh' onClick={refresh2} icon='refresh' />
                    </ToolbarItem>
                </Toolbar>
                <ColumnChooser enabled={true} />
                <Paging enabled={true} defaultPageSize={10} />
                <Pager
                    visible={true}
                    displayMode={"full"}
                    showInfo={true}
                    showNavigationButtons={true}
                    allowedPageSizes={[5, 10]}
                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                />
                <HeaderFilter
                    visible={true}
                    texts={{
                        cancel: "Hủy bỏ",
                        ok: "Đồng ý",
                        emptyValue: "Rỗng",
                    }}
                />
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
                <Column dataField='id' caption='Material Id' alignment={"left"} />
                <Column dataField='materialName' caption='Material Name' />
                <Column dataField='partNumber.name' caption={"Part Number"} />
                <Column dataField='rankAp' caption='RankAp' />
                <Column dataField='rankMau' caption='RankMau' />
                <Column dataField='rankQuang' caption='RankQuang' dataType='string' />
                <Column dataField='userData4' caption='UserData4' dataType='string' />
                <Column dataField='userData5' caption='UserData5' />
                <Column dataField='reserveQty' caption='Reserve Qty' alignment={"left"} />
                <Column dataField='stillNeed' caption='Still Need' alignment={"left"} />
                <Column dataField='materialState' caption='Material State' />
                <Column dataField='locationType' caption='Location (Type)' />
                <Column dataField='status' caption='Trạng thái' alignment={"left"} />
                {/* <Export enabled={true} allowExportSelectedData={true} /> */}
            </DataGrid>
        </div>
    );
});

export default DnlnvlDetailPickView;
