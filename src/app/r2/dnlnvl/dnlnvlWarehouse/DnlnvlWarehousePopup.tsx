import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCollection, useMainStore } from "@haulmont/jmix-react-core";
import axios, { AxiosResponse, AxiosError } from "axios";
import _ from "lodash";
import { Button, CheckBox, DataGrid, Form, ScrollView, SelectBox, Popup, DropDownBox, TextArea } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { Dnlnvl } from "../../../../jmix/entities/Dnlnvl";
import { ToolbarItem } from "devextreme-react/popup";
import InfoRow from "../../../../utils/InfoRow";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { PLANNING_API_URL } from "../../../../config";
import { StatusApproveEnum, TransactionType } from "../../enum/statusEnum";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { custom } from "devextreme/ui/dialog";
import {
    Column,
    Editing,
    FilterRow,
    HeaderFilter,
    Pager,
    Paging,
    Toolbar,
    Item as ToolbarItemDataGrid,
    OperationDescriptions,
    Scrolling,
} from "devextreme-react/data-grid";
import { print } from "../../../../utils/utils";
import { SapDvlinh } from "../../../../jmix/entities/SapDvlinh";
import { SapBpgroup } from "../../../../jmix/entities/SapBpgroup";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { DnlnvlMaterialScanFail } from "../../../../jmix/entities/DnlnvlMaterialScanFail";
import PopupScanMaterial from "./PopupScanMaterial";
import moment from "moment";
import { useWindowDimensions } from "../../../../hooks";
import InfoRow2 from "../../../../utils/InfoRow2";
import InfoRow3 from "../../../../utils/InfoRow3";
import DnlnvlPopupShowMaterialAvailble from "../dnlnvlPanel/DnlnvlPopupShowMaterialAvailble";
import UserService from "../../../../Keycloak";

type DnlnvlWarehousePopupProps = {
    isOpen: boolean;
    currentDnlnvl?: Dnlnvl;
    setClose: () => void;
    refreshDnlnvl: () => void;
};
type DnlnvlDetailDetailWithSubLocation = DnlnvlDetailDetail & {
    subLocation: string;
    location: string;
};
const DnlnvlWarehousePopup = ({
    isOpen = false,
    currentDnlnvl,
    setClose = () => {},
    refreshDnlnvl = () => {},
}: DnlnvlWarehousePopupProps) => {
    const mainStore = useMainStore();
    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
        sort: "+warehouseStatus",
    });
    const sapDvlinhCollection = useCollection<SapDvlinh>(SapDvlinh.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const sapBpGroupCollection = useCollection<SapBpgroup>(SapBpgroup.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const dnlnvlMaterialScanFailCollection = useCollection<DnlnvlMaterialScanFail>(DnlnvlMaterialScanFail.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    const [dnlnvlDetailDetails, setDnlnvlDetailDetails] = useState<DnlnvlDetailDetailWithSubLocation[]>([]);
    const [dnlnvlMaterialScanFails, setDnlnvlMaterialScanFails] = useState<DnlnvlMaterialScanFail[]>([]);
    const [wareHouses, setWareHouses] = useState([]);
    const [sourceDepartmentList, setSourceDepartmentList] = useState<SapDvlinh[] | undefined>(undefined);
    const [destinationDepartmentList, setDestinationDepartmentList] = useState<SapBpgroup[] | undefined>(undefined);
    const [wareHouseFrom, setWareHouseFrom] = useState();
    const [warehouseTo, setWareHouseTo] = useState();
    const [transactionType, setTransactionType] = useState<String | null>();
    const [sourceDepartment, setSourceDepartment] = useState<SapDvlinh>();
    const [canSendMES, setCanSendMES] = useState<boolean>(false);
    const [canSendSAP, setCanSendSAP] = useState<boolean>(false);
    const [destinationDepartment, setDestinationDepartment] = useState<SapBpgroup>();
    const transactionsTypes = useMemo(() => {
        return Object.keys(TransactionType).filter((item) => {
            return isNaN(Number(item));
        });
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [openScanCheckFail, setOpenScanCheckFail] = useState<boolean>();
    const [focusRowDnlnvlDetailDetail, setFocusDnlnvlDetailDetail] = useState<string>();
    const [note, setNote] = useState<string>(currentDnlnvl?.noteSendSAP ? currentDnlnvl?.noteSendSAP : "");
    const userComplete = useMemo(() => {
        return UserService.getUsername();
    }, []);

    const { width, height } = useWindowDimensions();

    const dataGridRef = useRef<DataGrid>(null);

    useEffect(() => {
        loadWareHouse();
        loadDnlnvlDetailDetail(currentDnlnvl?.id);
        loadDnlnvlMaterialScanFails(currentDnlnvl?.id);
        loadDestinationDepartment();
        loadSourceDepartment();
        // set default value for transaction type
        if (transactionsTypes.length > 0) {
            setTransactionType(transactionsTypes.find((item) => TransactionType[item] === currentDnlnvl?.transactionType));
        }
        if (currentDnlnvl?.saveSendMES === true) {
            setCanSendMES(currentDnlnvl?.saveSendMES);
        }
        if (currentDnlnvl?.saveSendSAP === true) {
            setCanSendSAP(currentDnlnvl?.saveSendSAP);
        }
        setOpenScanCheckFail(width > 600);
    }, []);

    const dnlWasSent = useMemo(() => {
        return dnlnvlDetailDetails.some(
            (dnlnvlDetailDetail) => dnlnvlDetailDetail.isSent === true || dnlnvlDetailDetail.isSentMES === true,
        );
    }, [dnlnvlDetailDetails]);

    /**
     * Load data WareHouse
     */
    const loadWareHouse = async () => {
        try {
            const response = await axios.get(`${PLANNING_API_URL}/rest/entities/Owh`, {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            });
            setWareHouses(response.data);
            // set default value for warehouse from and warehouse to
            if (response.data.length > 0) {
                setWareHouseFrom(response.data.find((item) => (item as any).whsCode === currentDnlnvl?.owhCodeFrom));
                setWareHouseTo(response.data.find((item) => (item as any).whsCode === currentDnlnvl?.owhCodeTo));
            }
        } catch (error) {
            toastError(error);
        }
    };
    /**
     * load dnlnvl detail detail theo dnlnvl id
     * @param id : id of dnlnvl
     */
    const loadDnlnvlDetailDetail = async (id) => {
        try {
            dnlnvlDetailDetailCollection.current.filter = {
                conditions: [{ property: "dnlnvlDetail.dnlnvl.id", operator: "=", value: id }],
            };
            dnlnvlDetailDetailCollection.current.load().then((res) => {
                setDnlnvlDetailDetails(
                    dnlnvlDetailDetailCollection.current.items.map((item): DnlnvlDetailDetailWithSubLocation => {
                        const subLocation = item.locationType?.split(" - ");
                        return {
                            ...item,
                            subLocation: subLocation && subLocation[1] ? subLocation[1] : "",
                            location: subLocation ? subLocation[0] : "",
                        };
                    }),
                );
            });
        } catch (error) {
            toastError(error);
        }
    };
    /**
     * load material scan fail
     * @param id : id of dnlnvl
     */
    const loadDnlnvlMaterialScanFails = async (id) => {
        try {
            dnlnvlMaterialScanFailCollection.current.filter = {
                conditions: [{ property: "dnlnvl.id", operator: "=", value: id }],
            };
            dnlnvlMaterialScanFailCollection.current.load().then((res) => {
                setDnlnvlMaterialScanFails(dnlnvlMaterialScanFailCollection.current.items);
            });
        } catch (error) {
            toastError(error);
        }
    };
    const loadSourceDepartment = async () => {
        try {
            await sapDvlinhCollection.current.load();
            setSourceDepartmentList(sapDvlinhCollection.current.items);
            if (sapDvlinhCollection.current.items.length > 0) {
                const sourceDepartment = sapDvlinhCollection.current.items.find(
                    (item) => item.code === currentDnlnvl?.sourceDepartmentCode,
                );
                setSourceDepartment(sourceDepartment);
            }
        } catch (error) {
            toastError(error);
        }
    };
    const loadDestinationDepartment = async () => {
        try {
            await sapBpGroupCollection.current.load();
            setDestinationDepartmentList(sapBpGroupCollection.current.items);
            // set default value for destination department
            if (sapBpGroupCollection.current.items.length > 0) {
                const destinationDepartment = sapBpGroupCollection.current.items.find(
                    (item) => item.code === currentDnlnvl?.destinationDepartmentCode,
                );
                setDestinationDepartment(destinationDepartment);
            }
        } catch (error) {
            toastError(error);
        }
    };

    const onSetCompleteDnlnvl = async (completeDnlnvl: boolean) => {
        if (!wareHouseFrom) {
            toastError("Vui lòng chọn xuất kho!");
            return;
        }
        if (!warehouseTo) {
            toastError("Vui lòng chọn kho đến!");
            return;
        }
        if (!transactionType) {
            toastError("Vui lòng chọn loại giao dịch!");
            return;
        }
        if (!sourceDepartment) {
            toastError("Vui lòng chọn đối tượng!");
            return;
        }
        if (!destinationDepartment) {
            toastError("Vui lòng chọn đơn vị lĩnh!");
            return;
        }
        if (!canSendSAP && !canSendMES) {
            toastError("Vui lòng chọn hệ thống nhận!");
            return;
        }

        const promptPromise = custom({
            title: "Xác nhận gửi đi",
            messageHtml: `<p>Bạn có chắc chắn muốn gửi sang ${canSendSAP ? "SAP" : ""}${canSendSAP && canSendMES ? ", MES" : ""}${
                canSendMES && !canSendSAP ? "MES" : ""
            } không?</p>`,
            buttons: [
                {
                    text: "Hủy bỏ",
                    onClick: function (e) {
                        return false;
                    },
                },
                {
                    text: "Gửi đi",
                    onClick: function (e) {
                        return true;
                    },
                },
            ],
        });
        let isConfirmComplete = false;
        await promptPromise.show().then((result) => {
            isConfirmComplete = result;
        });
        const requestBody = {
            listDnlnvlDetailDetail: dnlnvlDetailDetails,
            listScanFailed: dnlnvlMaterialScanFails,
            noteSendSAP: note,
        };
        // console.log("requestBody", JSON.stringify(requestBody))
        // print(requestBody);

        if (isConfirmComplete) {
            axios
                .put(`${PLANNING_API_URL}/services/api/dnlnvl/complete`, requestBody, {
                    headers: {
                        Authorization: "Bear" + mainStore.authToken,
                    },
                    params: {
                        owhCodeFrom: (wareHouseFrom as any).whsCode,
                        owhCodeTo: (warehouseTo as any).whsCode,
                        owhNameFrom: (wareHouseFrom as any).whsName,
                        owhNameTo: (warehouseTo as any).whsName,
                        transactionType: TransactionType[transactionType as string],
                        destinationDepartmentName: destinationDepartment.name,
                        destinationDepartmentCode: destinationDepartment.code,
                        sourceDepartmentName: sourceDepartment.name,
                        sourceDepartmentCode: sourceDepartment.code,
                        sendMES: canSendMES,
                        sendSAP: canSendSAP,
                        stopDnlnvl: completeDnlnvl,
                        userComplete: mainStore.userName,
                        dnlnvlId: currentDnlnvl?.id,
                    },
                })
                .then((response: AxiosResponse) => {
                    console.log(response.data);
                    if (canSendMES && canSendSAP) {
                        toastSuccess("Đã gửi SAP, MES");
                    } else if (canSendSAP) {
                        toastSuccess("Đã gửi SAP");
                    } else if (canSendMES) {
                        toastSuccess("Đã gửi MES");
                    }
                    setClose();
                    refreshDnlnvl();
                })
                .catch((error: AxiosError) => {
                    if (error.response && error.response?.data) {
                        toastError(error.response?.data);
                    }
                });
        }
    };

    const onExportXlsx = () => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("ExportComparisonDetails");
        const dataGrid = dataGridRef.current?.instance;

        exportDataGrid({
            component: dataGrid,
            worksheet,
            topLeftCell: { row: 4, column: 1 },
        })
            .then((cellRange) => {
                const headerRow = worksheet.getRow(2);
                headerRow.height = 30;
                worksheet.mergeCells(2, 1, 2, 8);

                headerRow.getCell(1).value = "Chi tiết đối chiếu nguyên vật liệu cho từng WO";
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
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "exportComparisonDetails.xlsx");
                    toastSuccess("Xuất file Excel chi tiết đối chiếu nguyên vật liệu cho từng WO thành công");
                });
            });
    };
    /**
     * export file csv
     */

    const onExportCsv = (e) => {
        setIsLoading(true);
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("ExportComparisonDetails");
        const dataGrid = dataGridRef.current?.instance;
        exportDataGrid({
            component: dataGrid,
            worksheet,
            // topLeftCell: { row: 4, column: 1 },
            // }).then((cellRange) => {
            //   const headerRow = worksheet.getRow(2);
            //   headerRow.height = 30;
            //   worksheet.mergeCells(2, 1, 2, 8);

            //   headerRow.getCell(1).value = 'Export file CSV';
            //   headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
            //   headerRow.getCell(1).alignment = { horizontal: 'center' };

            // @ts-ignore
            // const footerRowIndex = cellRange.to.row + 2;
            // const footerRow = worksheet.getRow(footerRowIndex);
            // worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);

            // footerRow.getCell(1).value = 'https://rangdong.com.vn';
            // footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
            // footerRow.getCell(1).alignment = { horizontal: 'right' };
        }).then(() => {
            workbook.csv.writeBuffer().then((buffer) => {
                saveAs(
                    new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), buffer], { type: "text/csv;charset=utf-8" }),
                    "exportComparisonDetails.csv",
                );
            });
        });
        toastSuccess("Xuất file csv chi tiết đối chiếu nguyên vật liệu cho từng WO thành công");
        setIsLoading(false);
        e.cancel = true;
    };

    const refresh = () => {
        setIsLoading(true);
        loadDnlnvlDetailDetail(currentDnlnvl?.id).then((res) => {
            setIsLoading(false);
        });
    };
    const saveDnlnvl = async () => {
        // console.log("aaaaa", wareHouseFrom, warehouseTo)
        axios
            .put(
                `${PLANNING_API_URL}/services/api/dnlnvl/update-destination-dnlnvl`,
                {
                    listDnlnvlDetailDetail: dnlnvlDetailDetails,
                    listScanFailed: dnlnvlMaterialScanFails,
                    noteSendSAP: note,
                },
                {
                    headers: {
                        Authorization: "Bear" + mainStore.authToken,
                    },
                    params: {
                        owhCodeFrom: wareHouseFrom ? (wareHouseFrom as any).whsCode : null,
                        owhCodeTo: warehouseTo ? (warehouseTo as any).whsCode : null,
                        owhNameFrom: wareHouseFrom ? (wareHouseFrom as any).whsName : null,
                        owhNameTo: warehouseTo ? (warehouseTo as any).whsName : null,
                        transactionType: TransactionType[transactionType as string],
                        destinationDepartmentName: destinationDepartment?.name || null,
                        destinationDepartmentCode: destinationDepartment?.code || null,
                        sourceDepartmentName: sourceDepartment?.name || null,
                        sourceDepartmentCode: sourceDepartment?.code || null,
                        sendMES: canSendMES,
                        sendSAP: canSendSAP,
                        userComplete: userComplete,
                        dnlnvlId: currentDnlnvl?.id,
                    },
                },
            )
            .then((res) => {
                toastSuccess("Lưu trạng thái ĐNL thành công");
                setClose();
                refreshDnlnvl();
            })
            .catch((error) => {
                toastError("Lưu trạng thái ĐNL thất bại");
            });
    };

    const updateStatusWareHouse = (status: number, dnlnvlId: string | undefined, scanCheck: number = 1) => {
        setDnlnvlDetailDetails(
            dnlnvlDetailDetails.map((item) => {
                if (item?.id === dnlnvlId) {
                    return {
                        ...item,
                        scanCheck: scanCheck,
                        warehouseStatus: status,
                    };
                }
                return item;
            }),
        );
        dataGridRef.current?.instance.saveEditData();
    };

    const updateMaterialScanFailList = (materialScanFail: DnlnvlMaterialScanFail) => {
        setDnlnvlMaterialScanFails([materialScanFail, ...dnlnvlMaterialScanFails]);
    };

    function updateAllMaterial() {
        const startTime = performance.now();
        // setDnlnvlDetailDetails(dnlnvlDetailDetails.map((item) => {
        //   if (item?.scanCheck !== 1) {
        //     return {
        //       ...item,
        //       scanCheck: 1,
        //       warehouseStatus: 1
        //     }
        //   }
        //   return item;
        // }));

        const dataSource = dataGridRef.current?.instance.getDataSource();
        const filterExp = dataGridRef.current?.instance.getCombinedFilter();
        dataSource
            ?.store()
            .load({
                filter: filterExp,
            })
            .then((result: DnlnvlDetailDetailWithSubLocation[]) => {
                setDnlnvlDetailDetails((prev) => {
                    return prev.map((item) => {
                        const newData = result.find((resultItem) => resultItem.id === item.id);
                        if (newData && newData.scanCheck !== 1) {
                            return {
                                ...newData,
                                scanCheck: 1,
                                warehouseStatus: 1,
                            };
                        }
                        return item;
                    });
                });
                const endTime = performance.now();
                console.log("time", endTime - startTime);
            });

        // const endTime = performance.now();
        // console.log("time", endTime - startTime);
    }

    const renderCheckScan = (cellData) => {
        return (
            <CheckBox
                disabled={cellData.data.isSent === true || cellData.data.isSentMES === true}
                value={cellData.data.scanCheck === 1}
                onValueChange={(value) => {
                    // console.log(cellData);
                    if (value) {
                        cellData.data.scanCheck = 1;
                    } else {
                        cellData.data.warehouseStatus = null;
                        cellData.data.scanCheck = 0;
                    }
                    dataGridRef.current?.instance.saveEditData();
                }}
            />
        );
    };
    const renderWarehouseStatus = (cellData) => {
        let status = "";
        let color = "";
        if (cellData.data.warehouseStatus === 0) {
            status = "Không hợp lệ";
            color = "red";
        } else if (cellData.data.warehouseStatus === 1) {
            status = "Hợp lệ";
            color = "green";
        } else {
            status = "Chờ phê duyệt";
            color = "#E4B819";
        }
        return <div style={{ color: color }}>{status}</div>;
    };
    const dataSourceStatusWareHouse = [
        { id: 0, value: "Không hợp lệ" },
        { id: 1, value: "Hợp lệ" },
    ];
    const renderEditStatusWareHouse = (cellData) => {
        return !cellData.data.isSent ? (
            <SelectBox
                dataSource={dataSourceStatusWareHouse}
                displayExpr='value'
                valueExpr='id'
                onSelectionChanged={(e) => {
                    // console.log(cellData.data, e.selectedItem.value);
                    cellData.data.warehouseStatus = e.selectedItem.id;
                    cellData.data.scanCheck = 1;
                    dataGridRef.current?.instance.saveEditData();
                }}
            />
        ) : (
            <div style={{ padding: "0 7px" }}>{renderWarehouseStatus(cellData)}</div>
        );
    };

    function onRepaintMobile(event) {
        if (event.rowType === "data") {
            let color;
            if (event.data.warehouseStatus === 0) {
                color = "rgba(245, 40, 30, 0.8)";
            } else if (event.data.warehouseStatus === 1) {
                color = "rgba(83, 244, 31, 0.8)";
            } else {
                color = "rgba(228, 184, 25, 0.8)";
            }
            event.cellElement.style.backgroundColor = color;
        }
    }

    function onFocusedRowChanging(e) {
        const rowsCount = e.component.getVisibleRows().length;
        const pageCount = e.component.pageCount();
        const pageIndex = e.component.pageIndex();
        const key = e.event && e.event.key;

        if (key && e.prevRowIndex === e.newRowIndex) {
            if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                e.component.pageIndex(pageIndex + 1).done(() => {
                    e.component.option("focusedRowIndex", 0);
                });
            } else if (e.newRowIndex === 0 && pageIndex > 0) {
                e.component.pageIndex(pageIndex - 1).done(() => {
                    e.component.option("focusedRowIndex", rowsCount - 1);
                });
            }
        }
    }

    const renderContent = () => {
        return (
            <ScrollView height={"100%"} useNative={true} showScrollbar='always'>
                <div
                    style={{
                        height: "100%",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        padding: "8px 16px",
                        marginTop: "8px",
                        borderRadius: "16px",
                        position: "relative",
                    }}>
                    <span
                        style={{
                            background: "#fff",
                            position: "absolute",
                            top: -10,
                            left: 30,
                            padding: "0 8px",
                        }}>
                        <b>Thông tin đề nghị lĩnh</b>
                    </span>

                    <div
                        style={{
                            padding: "4px 15px",
                            borderRadius: "16px",
                            backgroundColor: "rgba(175, 25, 228, 0.1)",
                            color: "#AF19E4",
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            fontSize: 15,
                        }}>
                        <span>Chờ gửi đối chiếu NVL</span>
                    </div>
                    {currentDnlnvl?.planningWorkOrder ? (
                        <div style={{ backgroundColor: "white", marginBottom: "20px" }}>
                            <Form colCount={3} colCountByScreen={3} alignItemLabels={true}>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"Loại"} data={currentDnlnvl.dnlnvlType} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"Mã sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productCode} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"SL kế khoạch"} data={currentDnlnvl?.planningWorkOrder.quantityPlan} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"PO"} data={currentDnlnvl?.planningWorkOrder.productOrder} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"Tên sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productName} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2
                                        label={"Ngày bắt đầu"}
                                        data={
                                            currentDnlnvl?.planningWorkOrder.startTime
                                                ? new Date(currentDnlnvl?.planningWorkOrder.startTime).toLocaleString("en-GB")
                                                : ""
                                        }
                                    />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2
                                        label={"Ngày kết thúc"}
                                        data={
                                            currentDnlnvl?.planningWorkOrder.endTime
                                                ? new Date(currentDnlnvl?.planningWorkOrder.endTime).toLocaleString("en-GB")
                                                : ""
                                        }
                                    />
                                </SimpleItem>
                                <SimpleItem colSpan={1}>
                                    <InfoRow2 label={"Profile"} data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode} />
                                </SimpleItem>
                                <SimpleItem colSpan={1}></SimpleItem>
                                <SimpleItem colSpan={1}></SimpleItem>
                            </Form>
                            {/*{width > 600 ? <Form colCount={3} alignItemLabels={true}>*/}
                            {/*  <SimpleItem colSpan={3}>*/}
                            {/*    <table width={"100%"}>*/}
                            {/*      <td>*/}
                            {/*        <InfoRow label={"Loại"} data={currentDnlnvl.dnlnvlType} />*/}
                            {/*        <InfoRow label={"PO"} data={currentDnlnvl?.planningWorkOrder.productOrder} />*/}
                            {/*        <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />*/}
                            {/*        <InfoRow label={"Profile"}*/}
                            {/*          data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode} />*/}
                            {/*      </td>*/}
                            {/*      <td>*/}
                            {/*        <InfoRow label={"Mã sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productCode} />*/}
                            {/*        <InfoRow label={"Tên sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productName} />*/}
                            {/*        <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />*/}
                            {/*      </td>*/}
                            {/*      <td>*/}
                            {/*        <InfoRow label={"SL kế khoạch"}*/}
                            {/*          data={currentDnlnvl?.planningWorkOrder.quantityPlan} />*/}
                            {/*        /!* <InfoRow label={"Ngày bắt đầu"} data={currentDnlnvl?.planningWorkOrder.startTime} />*/}
                            {/*        <InfoRow label={"Ngày kết thúc"} data={currentDnlnvl?.planningWorkOrder.endTime} /> *!/*/}
                            {/*        <InfoRow label={"Ngày bắt đầu"} data={currentDnlnvl?.planningWorkOrder.startTime ? new Date(currentDnlnvl?.planningWorkOrder.startTime).toLocaleString('en-GB') : ''} />*/}
                            {/*        <InfoRow label={"Ngày kết thúc"} data={currentDnlnvl?.planningWorkOrder.endTime ? new Date(currentDnlnvl?.planningWorkOrder.endTime).toLocaleString('en-GB') : ''} />*/}
                            {/*      </td>*/}
                            {/*    </table>*/}
                            {/*  </SimpleItem>*/}
                            {/*</Form> :*/}
                            {/*  <Form colCount={2} alignItemLabels>*/}
                            {/*    <SimpleItem colSpan={2}>*/}
                            {/*      <table width={"100%"}>*/}
                            {/*        <td>*/}
                            {/*          <InfoRow label={"Loại"} data={currentDnlnvl.dnlnvlType} />*/}
                            {/*          <InfoRow label={"PO"} data={currentDnlnvl?.planningWorkOrder.productOrder} />*/}
                            {/*          <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />*/}
                            {/*          <InfoRow label={"Mã sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productCode} />*/}
                            {/*          <InfoRow label={"Tên sản phẩm"} data={currentDnlnvl?.planningWorkOrder.productName} />*/}
                            {/*        </td>*/}
                            {/*        <td>*/}
                            {/*          <InfoRow label={"Profile"}*/}
                            {/*            data={currentDnlnvl?.planningWorkOrder.profileId?.profileCode} />*/}
                            {/*          <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />*/}
                            {/*          <InfoRow label={"SL kế khoạch"}*/}
                            {/*            data={currentDnlnvl?.planningWorkOrder.quantityPlan} />*/}
                            {/*          <InfoRow label={"Ngày bắt đầu"} data={currentDnlnvl?.planningWorkOrder.startTime} />*/}
                            {/*          <InfoRow label={"Ngày kết thúc"} data={currentDnlnvl?.planningWorkOrder.endTime} />*/}
                            {/*        </td>*/}
                            {/*      </table>*/}
                            {/*    </SimpleItem>*/}
                            {/*  </Form>}*/}
                        </div>
                    ) : (
                        ""
                    )}
                    <PopupScanMaterial
                        dnlnvlDetailDetails={dnlnvlDetailDetails}
                        updateStatusMaterial={updateStatusWareHouse}
                        updateScanFail={updateMaterialScanFailList}
                        updateFocusRow={(material) => setFocusDnlnvlDetailDetail(material)}
                    />
                    <DataGrid
                        ref={dataGridRef}
                        keyExpr={"material"}
                        showColumnLines={true}
                        rowAlternationEnabled={true}
                        columnAutoWidth={true}
                        repaintChangesOnly={true}
                        showBorders={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        focusedRowEnabled={true}
                        focusedRowKey={focusRowDnlnvlDetailDetail}
                        onFocusedRowChanging={onFocusedRowChanging}
                        onFocusedRowChanged={(e) => {
                            if (e.row && e.row.data) setFocusDnlnvlDetailDetail(e.row.data.material);
                        }}
                        autoNavigateToFocusedRow
                        dataSource={dnlnvlDetailDetails}
                        noDataText='Không có dữ liệu để hiển thị'
                        height={width <= 600 ? "100vh" : undefined}
                        onCellPrepared={width <= 600 ? onRepaintMobile : undefined}>
                        {width <= 600 && <Scrolling mode={"infinite"} />}
                        <Toolbar visible={true}>
                            <ToolbarItemDataGrid location={"before"}>
                                <div>
                                    <h5
                                        style={{
                                            marginBottom: 0,
                                        }}>
                                        Danh sách nguyên vật liệu đối chiếu thành công
                                    </h5>
                                </div>
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"}>
                                <Button onClick={onExportXlsx} icon='xlsxfile' hint='Xuất file Excel' />
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"}>
                                <Button onClick={onExportCsv} icon='csvfile' hint='Xuất file Csv' />
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"} name={"exportButton"} />
                            <ToolbarItemDataGrid location={"after"}></ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"}>
                                <Button hint='Refresh' icon='refresh' onClick={refresh} />
                            </ToolbarItemDataGrid>
                            <ToolbarItemDataGrid location={"after"}>
                                <Button hint='Duyệt tất cả' icon='check' onClick={updateAllMaterial} />
                            </ToolbarItemDataGrid>
                        </Toolbar>
                        {width > 600 && <Paging defaultPageSize={5} enabled={true} />}
                        {width > 600 && (
                            <Pager
                                visible={true}
                                showInfo={true}
                                showNavigationButtons={true}
                                allowedPageSizes={[5, 10]}
                                displayMode='full'
                                infoText='Trang số {0} trên {1} ({2} bản ghi)'
                            />
                        )}
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
                        <HeaderFilter
                            visible={true}
                            texts={{
                                cancel: "Hủy bỏ",
                                emptyValue: "Rỗng",
                                ok: "Đồng ý",
                            }}
                        />
                        <Column dataField='materialName' caption={"Material Name"} allowEditing={false} alignment='left' />
                        <Column dataField='partNumber.name' caption='Part Number' allowEditing={false} />
                        {width > 600 && <Column dataField='userData4' caption={"User Data 4"} allowEditing={false} />}
                        <Column dataField='reserveQty' caption={"Số lượng"} alignment='left' allowEditing={false} />
                        {width > 600 && <Column dataField={"lot"} caption={"Số LOT"} allowEditing={false} />}
                        {/* <Column dataField="locationType" caption={"Location"} allowEditing={false} cellRender={(data) => {
              const location = (data?.value as string).split(" - ");
              return <div>{location[0]}</div>
            }} />
            <Column dataField={"locationType"} caption={"Sub Location"} allowEditing={false} cellRender={(data) => {
              const subLocation = (data?.value as string).split(" - ");
              return <div>{subLocation[1] ? subLocation[1] : ""}</div>
            }} /> */}
                        <Column dataField='location' caption={"Location"} allowEditing={false} />
                        <Column dataField={"subLocation"} caption={"Sub Location"} allowEditing={false} />
                        {width > 600 && (
                            <Column
                                dataField='scanCheck'
                                caption={"Check Scan"}
                                allowEditing={false}
                                alignment='center'
                                cellRender={renderCheckScan}>
                                <HeaderFilter
                                    visible={false}
                                    texts={{
                                        cancel: "Hủy bỏ",
                                        ok: "Đồng ý",
                                        emptyValue: "Rỗng",
                                    }}
                                />
                            </Column>
                        )}
                        {width > 600 && (
                            <Column
                                dataField='warehouseStatus'
                                caption={"Trạng thái"}
                                alignment='left'
                                cellRender={renderWarehouseStatus}
                                editCellRender={renderEditStatusWareHouse}
                                allowEditing={currentDnlnvl?.status === StatusApproveEnum["Chờ gửi đối chiếu NVL"]}>
                                <HeaderFilter
                                    visible={false}
                                    dataSource={[
                                        { text: "Không hợp lệ", value: 0 },
                                        { text: "Hợp lệ", value: 1 },
                                        { text: "Chờ phê duyệt", value: null },
                                    ]}
                                />
                            </Column>
                        )}
                        <Editing mode='batch' allowUpdating={true} />
                    </DataGrid>
                    {width <= 600 && (
                        <Button
                            style={{
                                color: "#fff",
                                background: "rgba(31, 110, 229, 1)",
                                borderRadius: 8,
                                padding: "8px 4px",
                                fontSize: 16,
                            }}
                            onClick={() => setOpenScanCheckFail((prev) => !prev)}>
                            Danh sách NVL đối chiếu thừa
                        </Button>
                    )}
                    {openScanCheckFail && (
                        <DataGrid
                            keyExpr={"materialName"}
                            showColumnLines={true}
                            rowAlternationEnabled={true}
                            columnAutoWidth={true}
                            repaintChangesOnly={true}
                            showBorders={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            focusedRowEnabled={true}
                            dataSource={dnlnvlMaterialScanFails}
                            noDataText='Không có dữ liệu để hiển thị'
                            height={width <= 600 && dnlnvlMaterialScanFails.length > 0 ? "100vh" : undefined}>
                            {width <= 600 && <Scrolling mode={"infinite"} />}
                            <Toolbar visible={true}>
                                <ToolbarItemDataGrid location={"before"}>
                                    <div>
                                        <h5
                                            style={{
                                                marginBottom: 0,
                                            }}>
                                            Danh sách nguyên vật liệu đối chiếu thừa
                                        </h5>
                                    </div>
                                </ToolbarItemDataGrid>
                            </Toolbar>
                            {width > 600 && <Paging defaultPageSize={5} enabled={true} />}
                            {width > 600 && (
                                <Pager
                                    visible={true}
                                    showInfo={true}
                                    showNavigationButtons={true}
                                    allowedPageSizes={[5, 10]}
                                    displayMode='full'
                                    infoText='Trang số {0} trên {1} ({2} bản ghi)'
                                />
                            )}
                            <FilterRow visible={true} applyFilter={"auto"} resetOperationText='Đặt lại'>
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
                            <HeaderFilter
                                visible={true}
                                texts={{
                                    cancel: "Hủy bỏ",
                                    emptyValue: "Rỗng",
                                    ok: "Đồng ý",
                                }}
                            />
                            <Column caption={"Material Name"} dataField={"materialName"} />
                            <Column caption={"Part Number"} dataField={"partNumber"} />
                            {width > 600 && <Column caption={"User Data 4"} dataField={"userData4"} />}
                            <Column caption={"Số lượng"} dataField={"quantity"} alignment='left' />
                            {width > 600 && <Column caption={"Số LOT"} dataField={"lot"} />}
                            <Column
                                caption={"Trạng thái"}
                                cellRender={() => {
                                    return <div style={{ color: "red" }}>Thất bại</div>;
                                }}
                            />
                        </DataGrid>
                    )}
                </div>
                <div
                    style={{
                        position: "relative",
                        marginTop: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "16px",
                        padding: "16px",
                        display: "grid",
                        gridTemplateColumns: width > 600 ? "30% 30% 30%" : "45% 45%",
                        gridTemplateRows: width > 600 ? "auto auto auto" : "auto auto auto auto",
                        justifyContent: "space-between",
                        rowGap: "20px",
                    }}>
                    <span
                        style={{
                            background: "#fff",
                            position: "absolute",
                            top: -10,
                            left: 30,
                            padding: "0 8px",
                        }}>
                        <b>Chọn thông tin gửi SAP, QMS</b>
                    </span>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn kho gửi
                        </div>
                        <SelectBox
                            style={{}}
                            placeholder={"-- Lựa chọn --"}
                            displayExpr={"whsName"}
                            dataSource={wareHouses}
                            value={wareHouseFrom}
                            onSelectionChanged={(e) => {
                                setWareHouseFrom(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn loại giao dịch
                        </div>
                        <SelectBox
                            placeholder={"-- Lựa chọn --"}
                            dataSource={transactionsTypes}
                            value={transactionType}
                            onSelectionChanged={(e) => {
                                setTransactionType(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn đơn vị lĩnh
                        </div>
                        <SelectBox
                            displayExpr={"name"}
                            placeholder={"-- Lựa chọn --"}
                            dataSource={sourceDepartmentList}
                            value={sourceDepartment}
                            onSelectionChanged={(e) => {
                                setSourceDepartment(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["name"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn kho đến
                        </div>
                        <SelectBox
                            items={wareHouses}
                            placeholder={"-- Lựa chọn --"}
                            displayExpr={"whsName"}
                            value={warehouseTo}
                            onSelectionChanged={(e) => {
                                setWareHouseTo(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["whsName"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                paddingBottom: 4,
                                paddingLeft: 8,
                                fontWeight: 600,
                            }}>
                            Chọn đối tượng
                        </div>
                        <SelectBox
                            displayExpr={"name"}
                            placeholder={"-- Lựa chọn --"}
                            dataSource={destinationDepartmentList}
                            value={destinationDepartment}
                            onSelectionChanged={(e) => {
                                setDestinationDepartment(e.selectedItem);
                            }}
                            searchEnabled={true}
                            searchExpr={["name"]}
                            searchMode={"contains"}
                            disabled={currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]}
                        />
                    </div>
                    <div>
                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Chọn hệ thống nhận
                            </div>
                            <div
                                style={{
                                    marginTop: "4px",
                                }}>
                                <CheckBox
                                    disabled={currentDnlnvl?.status === StatusApproveEnum["Đã gửi SAP, MES"] || dnlWasSent}
                                    value={canSendSAP}
                                    onValueChanged={() => {
                                        setCanSendSAP((prevState) => {
                                            return !prevState;
                                        });
                                    }}
                                    text={"Gửi SAP"}
                                />
                                <CheckBox
                                    value={canSendMES}
                                    onValueChanged={() => {
                                        setCanSendMES((prevState) => {
                                            return !prevState;
                                        });
                                    }}
                                    disabled={currentDnlnvl?.status === StatusApproveEnum["Đã gửi SAP, MES"] || dnlWasSent}
                                    text={"Gửi MES"}
                                    style={{
                                        marginLeft: "30px",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div
                                style={{
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    fontWeight: 600,
                                }}>
                                Ghi chú
                            </div>
                        </div>
                        <div>
                            <TextArea
                                value={note}
                                disabled={currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"]}
                                onValueChanged={(e) => {
                                    setNote(e.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </ScrollView>
        );
    };
    return (
        <>
            <Popup
                visible={isOpen}
                onHiding={setClose}
                title='Thông tin đề nghị lĩnh cần đối chiếu NVL'
                showTitle={true}
                fullScreen={false}
                dragEnabled={false}
                resizeEnabled={false}
                hideOnOutsideClick={true}
                contentRender={renderContent}
                height={width > 600 ? "95%" : "100%"}
                width={width > 600 ? undefined : "100%"}>
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hủy",
                        stylingMode: "outlined",
                        onClick: setClose,
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Lưu",
                        type: "default",
                        disabled: currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"],
                        onClick: saveDnlnvl,
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Gửi",
                        type: "success",
                        onClick: () => onSetCompleteDnlnvl(false),
                        disabled: currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"],
                    }}
                />
                <ToolbarItem
                    widget='dxButton'
                    toolbar='bottom'
                    location='after'
                    options={{
                        text: "Hoàn thành",
                        type: "success",
                        onClick: () => onSetCompleteDnlnvl(true),
                        disabled: currentDnlnvl?.status !== StatusApproveEnum["Chờ gửi đối chiếu NVL"],
                    }}
                />
            </Popup>
        </>
    );
};

export default DnlnvlWarehousePopup;