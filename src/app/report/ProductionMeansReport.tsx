import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import DataGrid, {
    Column,
    Export,
    FilterRow,
    Item as ToolbarItemDatagrid,
    Lookup,
    OperationDescriptions,
    Pager,
    Paging,
    RemoteOperations,
    SearchPanel,
    Selection,
    Toolbar,
} from "devextreme-react/data-grid";
import { LoadPanel } from "devextreme-react/load-panel";
import { collection, useCollection, useMainStore } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { Dnlnvl } from "../../jmix/entities/Dnlnvl";
import { DnlnvlDetail } from "../../jmix/entities/DnlnvlDetail";
import { Line } from "../../jmix/entities/Line";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { BranchGroup } from "../../jmix/entities/BranchGroup";
import { toastSuccess } from "../../utils/ToastifyManager";
import { loadMessages, locale } from "devextreme/localization";
import { print } from "../../utils/utils";
import CustomStore from "devextreme/data/custom_store";
import { LoadOptions } from "devextreme/data";
import { Condition } from "@haulmont/jmix-rest";

type DnlnvlViewProps = {
    planningWorkOrder?: PlanningWorkOrder | undefined;
};

const mappingOperator = {
    "=": "=",
    "<>": "<>",
    ">": ">",
    ">=": ">=",
    "<": "<",
    "<=": "<=",
    startswith: "startsWith",
    endswith: "endsWith",
    contains: "contains",
    notcontains: "doesNotContain",
};

const ProductionMeansReport: React.FC<DnlnvlViewProps> = observer(({ planningWorkOrder = undefined }) => {
    const dnlnvlCollection =
        planningWorkOrder != undefined && planningWorkOrder.woId != undefined
            ? useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  loadImmediately: false,
                  sort: "-createdAt",
                  filter: {
                      conditions: [{ property: "planningWorkOrder.woId", operator: "=", value: planningWorkOrder.woId }],
                  },
              })
            : useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  loadImmediately: false,
                  sort: "-createdAt",
              });

    const mainStore = useMainStore();

    const lineStateCollection = useCollection<Line>(Line.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const dnlnvlDetailCollection = useCollection<DnlnvlDetail>(DnlnvlDetail.NAME, {
        view: "report-equipment",
        loadImmediately: false,
    });

    const sapBranchGroupCollection = collection<BranchGroup>(BranchGroup.NAME, {
        view: "_base",
        sort: "code",
        loadImmediately: false,
    });

    let dataGrid: DataGrid<any, any> | null = null;

    const [dnlnvlList, setDnlnvlList] = useState<Dnlnvl[] | undefined>(undefined);
    const [lines, setLines] = useState<Line[] | undefined>(undefined);
    const [branchGroupArray, setBranchGroupArray] = useState<any[]>([]);
    const [groupArray, setGroupArray] = useState<any[]>([]);
    const [dnlnvlDetails, setDnlnvlDetails] = useState<DnlnvlDetail[]>([]);
    const [loadPanelVisible, setLoadPanelVisible] = useState(false);
    const [selectedEmployeeNames, setSelectedEmployeeNames] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState();

    const dnlnvlCollection2 =
        planningWorkOrder != undefined && planningWorkOrder.woId != undefined
            ? useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  offset: 0,
                  limit: 10,
                  loadImmediately: false,
                  sort: "-createdAt",
                  filter: {
                      conditions: [{ property: "planningWorkOrder.woId", operator: "=", value: planningWorkOrder.woId }],
                  },
              })
            : useCollection<Dnlnvl>(Dnlnvl.NAME, {
                  view: "with-work-order",
                  offset: 0,
                  limit: 10,
                  loadImmediately: false,
                  sort: "-createdAt",
              });

    const mappingDevextreme = (operator) => {
        return mappingOperator[operator];
    };

    const dnlnvlDetailCollection2 = useCollection<DnlnvlDetail>(DnlnvlDetail.NAME, {
        view: "report-equipment",
        loadImmediately: false,
        sort: "-dnlnvl.planningWorkOrder.startTime",
    });
    // useEffect(() => {
    // loadDnlnvl();
    // loadLine();
    // loadDnlnvlDetail();
    // }, [planningWorkOrder]);

    useEffect(() => {
        loadBranchGroup();
    }, []);

    locale("en");
    loadMessages({
        en: {
            OK: "Đồng ý",
            Cancel: "Hủy bỏ",
            "dxCalendar-todayButtonText": "Hôm nay",
            "dxPager-pageSizesAllText": "Tất cả",
            Loading: "Đang tải...",
        },
    });

    const loadBranchGroup = () => {
        sapBranchGroupCollection.load().then((res) => {
            let branchGroupArrayTmp: any[] = [];
            let groupArrayTmp: any[] = [];
            sapBranchGroupCollection.items.map((item) => {
                let { uBranchcode, uBranchname, uGroupcode, uGroupname } = item;
                if (uBranchcode && uBranchname && uGroupcode && uGroupname) {
                    if (
                        !branchGroupArrayTmp.find((childItem) => {
                            return uBranchcode === childItem.id;
                        })
                    ) {
                        branchGroupArrayTmp.push({ id: uBranchcode, text: uBranchname });
                    }
                    groupArrayTmp.push({ branchCode: uBranchcode, id: uGroupcode, text: uGroupname });
                }
            });
            setBranchGroupArray(branchGroupArrayTmp);
            setGroupArray(groupArrayTmp);
        });
    };

    const loadDnlnvl = async () => {
        console.log("Load dnlnvl");
        // dnlnvlCollection.current.items = dnlnvlCollection2.current.items;
        // await dnlnvlCollection.current.load().then(res => {
        //     if (dnlnvlCollection.current.items) {
        //       setDnlnvlList(dnlnvlCollection.current.items);
        //     }
        //   }
        // );
    };

    const loadDnlnvlDetail = async () => {
        console.log("load dvl detail");
        setLoadPanelVisible(true);
        // dnlnvlDetailCollection.current.items = dnlnvlDetailCollection2.current.items;
        // setDnlnvlDetails(dnlnvlDetailCollection.current.items);
        await dnlnvlDetailCollection.current.load().then((res) => {
            console.log("dnlnvl Collection", dnlnvlDetailCollection.current.items);
            setDnlnvlDetails(dnlnvlDetailCollection.current.items);
        });
        setLoadPanelVisible(false);
    };

    const loadLine = async () => {
        await lineStateCollection.current.load().then((res) => {
            setLines(lineStateCollection.current.items);
        });
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    const dataStore = new CustomStore({
        key: "id",
        cacheRawData: true,
        onLoading(options: LoadOptions) {
            print("onLoading");
            print(options);
        },
        load(options: LoadOptions) {
            console.log("planning wwo");
            console.log(dnlnvlDetailCollection2.current.filter);
            console.log(planningWorkOrder);
            console.log(dnlnvlDetailCollection2.current.items);
            console.log("option Load", options);
            console.log("skip: ", options.skip);
            console.log("take", options.take);

            // Phân trang
            dnlnvlDetailCollection2.current.offset = 0;
            dnlnvlDetailCollection2.current.limit = 10;
            if (options.skip != null) {
                dnlnvlDetailCollection2.current.offset = options.skip;
            }
            if (options.take != null) {
                dnlnvlDetailCollection2.current.limit = options.take;
            }

            // Sắp xếp
            let sort_: string = "-dnlnvl.planningWorkOrder.startTime";
            console.log("sort: ", options.sort);
            if (options.sort != null && options.sort[0].selector != "id") {
                console.log(options.sort);
                // sortBy = loadOptions.sort[0]?.selector;
                sort_ = "+";
                if (options.sort[0].desc === true) {
                    sort_ = "-";
                }
                sort_ += options.sort[0].selector;
            }

            // filter
            let fil: any[] = [];
            let filter: any[] = [];
            let groupFilter: any = {
                group: "AND",
                conditions: [],
            };
            print("Options filter: ");
            print(options.filter);
            if (options.filter != null) {
                if (!Array.isArray(options.filter[0])) {
                    // let opr = mappingDevextreme(options.filter[1]);
                    let tmp: Condition = {
                        property: options.filter[0],
                        operator: mappingDevextreme(options.filter[1]),
                        value: options.filter[2],
                    };
                    let check = false;
                    if (
                        options.filter[0] === "dnlnvl.numOfReq" ||
                        options.filter[0] === "sentBy" ||
                        options.filter[0] === "approver" ||
                        options.filter[0] === "programmingDetail.feederId"
                    ) {
                        // if (isNaN(options.filter[2])) {
                        //   check = true;
                        // }
                        check = true;
                    }
                    if (!check) {
                        filter.push(tmp);
                        // filter.push(tmp);
                        groupFilter.conditions = filter;
                    }
                    // filter.push(tmp);
                    // groupFilter.conditions = filter;
                } else {
                    if (options.filter.length > 3) {
                        if (options.filter[1] == "or") {
                            groupFilter.group = "OR";
                        }
                        options.filter.forEach((item) => {
                            if (item !== "and" && item !== "or") {
                                let tmp: Condition = {
                                    property: item[0],
                                    operator: mappingDevextreme(item[1]),
                                    value: item[2],
                                };
                                let check = false;
                                if (
                                    item[0] === "dnlnvl.numOfReq" ||
                                    item[0] === "sentBy" ||
                                    item[0] === "approver" ||
                                    item[0] === "programmingDetail.feederId"
                                ) {
                                    // if (isNaN(options.filter[2])) {
                                    //   check = true;
                                    // }
                                    check = true;
                                }
                                if (!check) {
                                    filter.push(tmp);
                                    // filter.push(tmp);
                                    // groupFilter.conditions = filter;
                                }
                                // filter.push(tmp);
                            }
                        });
                        groupFilter.conditions = filter;
                    } else {
                        console.log("option Load ");
                        if (options.filter[1] === "or") {
                            groupFilter.group = "OR";
                        }
                        for (let j = 0; j < options.filter.length; j++) {
                            // options.filter.forEach(item => {
                            let filter2: any[] = [];
                            let gr: { group: string; conditions: any[] } = {
                                group: "OR",
                                conditions: [],
                            };
                            if (Array.isArray(options.filter[j][0])) {
                                if (options.filter[j][1] === "and") {
                                    gr.group = "AND";
                                }
                                options.filter[j].forEach((item) => {
                                    if (item !== "and" && item !== "or") {
                                        let tmp: Condition = {
                                            property: item[0],
                                            operator: mappingDevextreme(item[1]),
                                            value: item[2],
                                        };
                                        let check = false;
                                        if (
                                            item[0] === "dnlnvl.numOfReq" ||
                                            item[0] === "sentBy" ||
                                            item[0] === "approver" ||
                                            item[0] === "programmingDetail.feederId"
                                        ) {
                                            // if (isNaN(options.filter[2])) {
                                            //   check = true;
                                            // }
                                            check = true;
                                        }
                                        if (!check) filter2.push(tmp);
                                        // filter2.push(tmp);
                                    }
                                });
                            } else if (options.filter[j] !== "and" && options.filter[j] !== "or") {
                                let tmp: Condition = {
                                    property: options.filter[j][0],
                                    operator: mappingDevextreme(options.filter[j][1]),
                                    value: options.filter[j][2],
                                };
                                let check = false;
                                if (
                                    options.filter[j][0] === "dnlnvl.numOfReq" ||
                                    options.filter[j][0] === "sentBy" ||
                                    options.filter[j][0] === "approver" ||
                                    options.filter[j][0] === "programmingDetail.feederId"
                                ) {
                                    // if (isNaN(options.filter[2])) {
                                    //   check = true;
                                    // }
                                    check = true;
                                }
                                if (!check) filter2.push(tmp);
                                // filter2.push(tmp);
                            }
                            if (options.filter[j] !== "and" && options.filter[j] !== "or") {
                                gr.conditions = filter2;
                                groupFilter.conditions.push(gr);
                            }
                        }

                        console.log(options);
                    }
                }
                fil.push(groupFilter);
                console.log("groupFilter: ", groupFilter);
                dnlnvlDetailCollection2.current.filter = {
                    conditions: fil,
                };
            } else {
                dnlnvlDetailCollection2.current.filter = null;
                // let tmp: Condition = {
                //   property: "dnlnvl.planningWorkOrder.endTime",
                //   operator: ">=",
                //   value: "2000-04-22T15:29:00"
                // }
                // fil.push(tmp)
                // groupFilter.conditions = tmp
                // dnlnvlDetailCollection2.current.filter = {
                //   conditions: fil
                // };
            }

            dnlnvlDetailCollection2.current.sort = sort_;
            if (options.group !== null && options.group !== undefined) {
                let gr = options.group[0].selector;
                return axios
                    .get(PLANNING_API_URL + `/services/api/workorder/test?groupBy=${gr}`, {
                        headers: {
                            Authorization: "Bearer " + mainStore.authToken,
                        },
                    })
                    .then((response) => ({
                        data: response.data,
                        // totalCount: response.data.data.totalElements
                    }))
                    .catch(() => {
                        throw new Error("Data Loading Error");
                    });
            }
            // console.log(options);

            return dnlnvlDetailCollection2.current.load().then((res) => {
                return {
                    data: dnlnvlDetailCollection2.current.items,
                    totalCount: dnlnvlDetailCollection2.current.count,
                };
            });
        },
    });
    const loadDataExport = () => {
        dnlnvlDetailCollection2.current.offset = null;
        dnlnvlDetailCollection2.current.limit = null;
        dnlnvlDetailCollection2.current.load().then((res) => {
            dnlnvlDetailCollection.current.items = dnlnvlDetailCollection2.current.items;
        });
    };

    const onSelectionChanged = (event) => {
        console.log(event);
        print("okokokokokokok");

        const option = dataGrid?.instance.option();

        dataGrid?.instance.getSelectedRowsData().then((rowData) => {
            print("jjjjjjjjjjjj");
            print(rowData);
        });
        dataGrid?.instance.getSelectedRowKeys().then((rowData) => {
            print(rowData);
        });
        // dataGrid?.instance.
        // setSelectedRowKeys(event.selectedRowKeys)
        // setSelectedEmployeeNames(getEmployeeNames(event.selectedRowsData))
    };

    function getEmployeeName(row) {
        return `${row.dnlnvl.planningWorkOrder.productCode} ${row.dnlnvl.planningWorkOrder.productName}`;
    }

    function getEmployeeNames(selectedRowsData) {
        return selectedRowsData.length ? selectedRowsData.map(getEmployeeName).join(", ") : "Nobody has been selected";
    }

    const onExporting = (e) => {
        loadDataExport();
        console.log("Export: ", e);
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("MaterialAttritionReport");

        exportDataGrid({
            component: e.component,
            worksheet,
            topLeftCell: { row: 4, column: 1 },
        })
            .then((cellRange) => {
                const headerRow = worksheet.getRow(2);
                headerRow.height = 30;
                worksheet.mergeCells(2, 1, 2, 8);

                headerRow.getCell(1).value = "Báo cáo công cụ tham gia sản xuất";
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ProductionMeansReport.xlsx");
                    toastSuccess("Xuất file xlsx công cụ tham gia sản xuất thành công");
                });
            });
        e.cancel = true;
    };

    return (
        <div id='production-means-report-view'>
            <div>
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
                        Báo cáo công cụ tham gia sản xuất
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
                    ref={(ref) => {
                        dataGrid = ref;
                    }}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    repaintChangesOnly={true}
                    showBorders={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    focusedRowEnabled={true}
                    onSelectionChanged={onSelectionChanged}
                    // dataSource={dnlnvlDetails}
                    dataSource={dataStore}
                    onExporting={onExporting}
                    noDataText='Không có dữ liệu để hiển thị'>
                    <Export
                        enabled={true}
                        texts={{
                            exportAll: "Xuất file Excel",
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
                    <SearchPanel visible={true} placeholder='VD: XLED' />
                    {/* <HeaderFilter visible={true} /> */}
                    <Paging
                        defaultPageSize={10}
                        defaultPageIndex={0}
                        // onPageIndexChange={(pageIndex) => {loadWarningsPage(pageIndex)}}
                    />
                    <RemoteOperations groupPaging={true} />
                    {/*<Paging enabled={true} defaultPageSize={20} />*/}
                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[10, 20, "all"]}
                        showPageSizeSelector={true}
                        infoText='Trang số {0} trên {1} ({2} bản ghi)'
                    />
                    {/*<Selection*/}
                    {/*  deferred={true}*/}
                    {/*  mode="multiple"*/}
                    {/*  selectAllMode={"allPages"}*/}
                    {/*  showCheckBoxesMode={"always"}*/}
                    {/**/}
                    {/*/>*/}
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
                    <Toolbar>
                        <ToolbarItemDatagrid location={"before"} name={"searchPanel"} />
                        {/* <ToolbarItemDatagrid location={"center"}>
                            <div className={"informer"}>
                                <h5 className={"name"}>Báo cáo công cụ tham gia sản xuất</h5>
                            </div>
                        </ToolbarItemDatagrid> */}
                        <ToolbarItemDatagrid location={"after"} name={"exportButton"} />
                    </Toolbar>
                    <Column
                        dataField='dnlnvl.planningWorkOrder.startTime'
                        caption='Thời gian bắt đầu'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column
                        dataField='dnlnvl.planningWorkOrder.endTime'
                        caption='Thời gian kết thúc'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />
                    <Column dataField='dnlnvl.planningWorkOrder.productOrder' caption={" Mã PO"} alignment='left' />
                    <Column dataField='dnlnvl.planningWorkOrder.parentWorkOrderId' caption={"Mã WO "} alignment='left' />
                    <Column dataField='dnlnvl.planningWorkOrder.woId' caption={"Mã PO-KBSX"} alignment='left' />
                    <Column dataField='dnlnvl.planningWorkOrder.sapWo' caption='SAP WO' />
                    <Column dataField='dnlnvl.planningWorkOrder.lotNumber' width={100} caption='Số LOT' />
                    <Column dataField='dnlnvl.planningWorkOrder.profileName' caption='Profile' />
                    <Column caption={"Ngành"} dataField='dnlnvl.planningWorkOrder.branchCode'>
                        {/*<Lookup dataSource={branchGroupArray} displayExpr="text" valueExpr="id"/>*/}
                    </Column>
                    <Column caption={"Tổ"} dataField='dnlnvl.planningWorkOrder.groupCode' width={100}>
                        {/*<Lookup dataSource={groupArray} displayExpr="text" valueExpr="id"/>*/}
                    </Column>
                    <Column dataField='dnlnvl.planningWorkOrder.productCode' caption='Mã sản phẩm' />
                    <Column dataField='dnlnvl.planningWorkOrder.productName' caption='Tên sản phẩm' />

                    <Column dataField='sentBy' caption='Người gửi' allowSorting={false} />
                    <Column dataField='approver' caption='Người duyệt' allowSorting={false} />
                    <Column
                        width={180}
                        dataField='dnlnvl.createdAt'
                        caption='Ngày tạo'
                        dataType='datetime'
                        format='dd/MM/yyyy hh:mm:ss'
                        allowEditing={false}
                    />

                    <Column dataField='machine.machineName' caption='Machine ' />
                    <Column dataField='programmingDetail.side' caption='Side' />
                    <Column dataField='programmingDetail.subslot' caption='Subslot' />
                    <Column dataField='programmingDetail.feederId' caption='Feeder' />
                    <Column dataField='dnlnvl.numOfReq' caption='Số lần khuyến nghị' width={180} alignment='left' />
                    <Column dataField='partNumber.name' caption='Part Number' allowEditing={false} />
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
                closeOnOutsideClick={true}
                message='Đang tải...'
            />
            {/*<div className="selected-data">*/}
            {/*  <span className="caption">Selected Records:</span>{' '}*/}
            {/*  <span>*/}
            {/*    {selectedEmployeeNames}*/}
            {/*  </span>*/}
            {/*</div>*/}
        </div>
    );
});

export default ProductionMeansReport;

const ROUTING_PATH = "/productionMeansReport";
registerScreen({
    component: ProductionMeansReport,
    caption: "Báo cáo công cụ sản xuất",
    screenId: "screen.ProductionMeansReport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
