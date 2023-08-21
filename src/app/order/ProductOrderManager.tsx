import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    FilterRow,
    Form,
    Format,
    FormItem,
    HeaderFilter,
    Item as TItem,
    Lookup,
    MasterDetail,
    OperationDescriptions,
    Pager,
    Paging,
    Popup,
    SearchPanel,
    Selection,
    Toolbar,
} from "devextreme-react/data-grid";
import CheckBox from "devextreme-react/check-box";
import { Item } from "devextreme-react/form";
import { collection, injectMainStore, instance } from "@haulmont/jmix-react-core";
import { PlanningProductionOrder } from "../../jmix/entities/PlanningProductionOrder";
import "./ProductOderManager.css";
import { loadMessages, locale } from "devextreme/localization";
import { BomVersionButton } from "../product/BomversionButton";
import { Coitt } from "../../jmix/entities/Coitt";
import ProductOrderItemTemplate from "./helper/ProductOrderItemTemplate";
import { Button } from "devextreme-react/button";
import CreateWorkOrderByPO from "./helper/CreateWorkOrderByPO";
import { ProductOrderItem } from "../../jmix/entities/ProductOrderItem";
import { Tag } from "antd";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { Tooltip } from "devextreme-react/tooltip";
import { PLANNING_API_URL, SCADA_URL } from "../../config";
import { colorByCompletePercent, orderStatusList } from "../utils";
import { custom } from "devextreme/ui/dialog";
import ScadaService from "../services/ScadaService";
import CreateWOByPOObject from "../observables/CreateWOByPOObject";
import { CreateWorkOrderByPOPopup } from "./popup/CreateWorkOrderByPOPopup";
import { ReasonList } from "../../jmix/entities/ReasonList";
import BusinessLogObject from "../observables/BusinessLogObject";
import { WorkOrderLogPopup } from "../work-order/popup/WorkOrderLogPopup";
import BusinessLogService from "../services/BusinessLogService";
import { currentDateTime, customizeColor, getColor } from "../../utils/utils";

const ROUTING_PATH = "/productOrderManager";

const createWOByPOObj = new CreateWOByPOObject();
const businessLogObject = new BusinessLogObject();

locale("en");
loadMessages({
    en: {
        Yes: "Xóa",
        No: "Hủy bỏ",
        "dxList-selectAll": "Chọn tất cả",
        "dxList-pageLoadingText": "Đang tải...",
        "dxPager-pageSizesAllText": "Tất cả",
    },
});

// @observer
@injectMainStore
class ProductOrderManagerComponent extends React.Component<
    { mainStore? },
    {
        popupVisible;
        currentRow;
        productItems;
        autoExpandAll;
        isRender;
        productsFullArrays;
        reasonList;
    }
> {
    productOderDatasource = collection<PlanningProductionOrder>(PlanningProductionOrder.NAME, {
        view: "_base",
        sort: "-createdDate",
        loadImmediately: false,
    });
    productOrderItemDs = collection<ProductOrderItem>(ProductOrderItem.NAME, {
        view: "_base",
        sort: "productCode",
        loadImmediately: false,
    });
    bomVersionDs = collection<Coitt>(Coitt.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    reasonsDs = collection<ReasonList>(ReasonList.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    dataInstance = instance<PlanningProductionOrder>(PlanningProductionOrder.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    allowedPageSizes: (number | "all" | "auto")[] = [10, 15, "all"];

    constructor(props) {
        super(props);

        this.state = {
            isRender: false,
            popupVisible: false,
            currentRow: null,
            productItems: [],
            autoExpandAll: false,
            productsFullArrays: [],
            reasonList: [],
        };
        this.handlePopupHidden = this.handlePopupHidden.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.showCreateWOByPOPopup = this.showCreateWOByPOPopup.bind(this);
        this.sendToScadar = this.sendToScadar.bind(this);
        this.senWOToScadarWithConfirm = this.senWOToScadarWithConfirm.bind(this);
        this.approveOrder = this.approveOrder.bind(this);
        this.approveOrderWithComfirm = this.approveOrderWithComfirm.bind(this);
        this.createWorkOrderBtn = this.createWorkOrderBtn.bind(this);
        this.onRefreshGrid = this.onRefreshGrid.bind(this);
        this.loadProductOrder = this.loadProductOrder.bind(this);
        this.loadBomVersion = this.loadBomVersion.bind(this);
        this.loadReason = this.loadReason.bind(this);
        this.getProductOrderItemTemplate = this.getProductOrderItemTemplate.bind(this);
    }

    onRefreshGrid() {
        this.loadProductOrder();
    }

    loadProductOrder() {
        this.productOderDatasource.load().then((res) =>
            this.setState((previewState, props) => ({
                isRender: true,
            })),
        );
    }

    loadReason() {
        this.reasonsDs.load().then(() => {
            if (this.reasonsDs.items) {
                this.setState({ reasonList: this.reasonsDs.items });
            }
        });
    }

    async showWoLog(row) {
        businessLogObject.setData(row.data.productOrderId, true);
    }

    loadBomVersion() {
        this.bomVersionDs.load().then((res) => {
            let productsFullArraystmp: any[] = [];
            if (this.bomVersionDs.items) {
                this.bomVersionDs.items.map((item) => {
                    let { id, uProno, uPronam, uVersions, uDocurl, uDocurl2 } = item;
                    if (uProno && uPronam && uVersions) {
                        productsFullArraystmp.push({
                            id: id,
                            productCode: uProno,
                            productName: uPronam,
                            bomVersion: uVersions,
                            uDocurl: uDocurl,
                            uDocurl2: uDocurl2,
                        });
                    }
                });
            }
            this.setState({ productsFullArrays: productsFullArraystmp });
        });
    }

    componentDidMount() {
        this.loadProductOrder();
        this.loadBomVersion();
        this.loadReason();
    }

    getProductOrderItemTemplate = (row) => {
        return (
            <ProductOrderItemTemplate data={row.data} productsFullArrays={this.state.productsFullArrays} reasons={this.state.reasonList} />
        );
    };

    orderHeaderFilter = (data) => {
        data.dataSource.postProcess = (results) => {
            results.push({
                text: "Weekends",
                value: "weekends",
            });
            return results;
        };
    };

    render() {
        // console.log("Parent render");
        let statusWOOptions = {
            items: orderStatusList,
            searchEnabled: true,
            displayExpr: "Name",
            valueExpr: "ID",
        };
        return (
            <div>
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
                            Quản lý đơn hàng
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
                        id='gridContainer'
                        // ref={(ref) => dataGrid = ref}
                        dataSource={this.productOderDatasource.items}
                        keyExpr='id'
                        showBorders={true}
                        height={"auto"}
                        onRowUpdating={this.onEdit}
                        onRowRemoving={this.onDelete}
                        allowColumnResizing={true}
                        columnMinWidth={50}
                        rowAlternationEnabled={false}
                        wordWrapEnabled={true}
                        columnAutoWidth={true}
                        onCellPrepared={this.onCellPrepared}
                        noDataText={"Không có dữ liệu để hiển thị"}>
                        <Paging defaultPageSize={10} />
                        <Pager
                            visible={true}
                            allowedPageSizes={this.allowedPageSizes}
                            displayMode={"full"}
                            showPageSizeSelector={true}
                            showInfo={true}
                            showNavigationButtons={true}
                            infoText='Trang số {0} trên {1} ({2} bản ghi)'
                        />
                        <Toolbar>
                            {/* <TItem location={"center"}>
              <div className={"caption-wo-manager"}>Quản lý đơn hàng</div>
            </TItem> */}
                            <TItem name='searchPanel' location={"before"} />
                            <TItem location='after' widget='dxButton'>
                                <Button icon={"refresh"} onClick={this.onRefreshGrid} hint='Refresh' />
                            </TItem>
                            <TItem name='columnChooserButton' />
                        </Toolbar>
                        <ColumnChooser enabled={true} />
                        <Selection mode='single' />
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
                                ok: "Đồng ý",
                                emptyValue: "Rỗng",
                            }}
                        />
                        <SearchPanel visible={true} width={240} placeholder='VD: RD'></SearchPanel>
                        <Column type={"buttons"} caption={"Tùy chọn"} alignment='left' />
                        <Column dataField='productOrderId' minWidth={200} caption='Mã PO'>
                            <HeaderFilter groupInterval={10000} />
                        </Column>
                        <Column dataField='externalPoId' minWidth={120} caption='Mã PO ngoài' cssClass={"highlightColumn"}>
                            <HeaderFilter groupInterval={10000} />
                        </Column>
                        <Column dataField='customerCode' caption='Mã khách hàng' minWidth={150} cssClass={"highlightColumn"}>
                            <HeaderFilter groupInterval={10000} />
                        </Column>
                        <Column dataField='customerName' caption='Tên khách hàng' hidingPriority={0} minWidth={200}>
                            <HeaderFilter groupInterval={10000} />
                        </Column>
                        <Column dataField='quantity' alignment='right' caption='Tổng sản lượng sản xuất' width={120} hidingPriority={4}>
                            <Format type='fixedPoint' precision={0} />
                        </Column>
                        <Column
                            dataField='quantityOut'
                            alignment='left'
                            caption='Sản lượng nhập kho'
                            cellRender={this.quantityOut}
                            width={170}
                            hidingPriority={5}></Column>
                        <Column
                            dataField={"completePercent"}
                            alignment='left'
                            cellRender={this.completePercent}
                            caption={"Tỷ lệ hoàn thành"}
                            width={160}
                        />
                        <Column dataField={"scadaQuantityOut"} caption={"Sản lượng Scada"} alignment='right' width={120} />
                        <Column dataField={"scadaQuantityOut1"} caption={"Sản lượng CĐ1"} alignment='right' width={120} />
                        <Column
                            dataField='createdDate'
                            alignment='center'
                            dataType='date'
                            caption={"Ngày tạo"}
                            format={"dd/MM/yyyy"}
                            minWidth={150}
                            hidingPriority={1}></Column>
                        <Column
                            dataField='orderDate'
                            alignment='center'
                            dataType='datetime'
                            format={"dd/MM/yyyy"}
                            caption={"Ngày đặt hàng"}
                            minWidth={150}
                            hidingPriority={2}>
                            <HeaderFilter dataSource={this.orderHeaderFilter} />
                        </Column>
                        <Column
                            dataField='completeDate'
                            alignment='center'
                            minWidth={150}
                            dataType='date'
                            format={"dd/MM/yyyy"}
                            caption='Ngày trả hàng'
                            hidingPriority={3}>
                            <HeaderFilter dataSource={this.orderHeaderFilter} />
                        </Column>

                        <Column alignment='center' cellRender={this.stateCellRender} caption='Trạng thái' width={120}></Column>

                        <Column
                            alignment='center'
                            caption='Đánh giá'
                            // cellComponent={this.renderProcessStatus}
                            cellComponent={this.onStatusPoRender}
                            width={150}>
                            <HeaderFilter visible={false} />
                        </Column>
                        <Column alignment='center' width={100} caption='Trạng thái hoạt động' dataField={"status"} visible={false}></Column>
                        <Column alignment='center' width={130} caption='Thao tác' cellRender={this.createWorkOrderBtn}>
                            <HeaderFilter dataSource={this.orderHeaderFilter} />
                        </Column>

                        <Column dataField='note' visible={true} caption={"Ghi chú"} hidingPriority={5}>
                            <FormItem colSpan={2} editorType='dxTextArea' editorOptions={{ height: 100 }} />
                        </Column>
                        <Column dataField='reasonId' caption={"Nguyên nhân"} hidingPriority={0} visible={false}>
                            <Lookup dataSource={this.state.reasonList} displayExpr='reason' valueExpr='id' allowClearing={true} />
                        </Column>
                        <Editing
                            mode='form'
                            useIcons={true}
                            allowUpdating={true}
                            allowDeleting={true}
                            texts={{
                                cancelRowChanges: "Hủy bỏ",
                                saveRowChanges: "Lưu lại",
                                confirmDeleteTitle: "Xác nhận xóa bản ghi",
                                confirmDeleteMessage: "Bạn chắc chắn muốn xóa bản ghi này?",
                                deleteRow: "Xóa",
                                editRow: "Sửa",
                                addRow: "Thêm",
                            }}>
                            <Popup title='Cập nhật thông tin đơn hàng' showTitle={true} width={700} height={"auto"} />
                            <Form>
                                <Item itemType='group' colCount={2} colSpan={2}>
                                    <Item dataField='productOrderId' disabled={true} />
                                    <Item dataField='customerCode' />
                                    <Item dataField='customerName' />
                                    <Item dataField='completeDate' />
                                    <Item dataField='status' editorType='dxSelectBox' editorOptions={statusWOOptions} />
                                    <Item dataField='reasonId' />
                                    <Item dataField='note' colSpan={2} />
                                </Item>
                            </Form>
                        </Editing>

                        <MasterDetail
                            enabled={true}
                            component={this.getProductOrderItemTemplate}
                            autoExpandAll={this.state.autoExpandAll}
                        />
                    </DataGrid>
                </div>

                {/*popup create wo from po*/}
                <CreateWorkOrderByPOPopup createWOByPoObj={createWOByPOObj} />
                <WorkOrderLogPopup businessLogObject={businessLogObject} />

                <div className='options'>
                    <div className='caption'>Tùy chọn</div>
                    <div className='option'>
                        <CheckBox
                            text='Mở rộng tất cả các nhóm'
                            value={this.state.autoExpandAll}
                            onValueChanged={this.onAutoExpandAllChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }

    onEdit = (data) => {
        let orderItem = data.newData;
        let startTime = currentDateTime();
        orderItem.id = data.key;
        orderItem.productOrderId = data.oldData.productOrderId;
        this.dataInstance.setItem(orderItem);
        this.dataInstance.commit().then((res) => {
            // console.log("send to PLANNING_API_URL");
            let headers = {
                Authorization: "Bearer " + this.props.mainStore.authToken,
                "content-type": "application/json",
            };
            axios.post(PLANNING_API_URL + "/services/api/order/save-wo-by-po", orderItem, { headers }).then((res) => {
                notify(
                    {
                        message: "Cập nhật thành công đơn hàng " + orderItem.productOrderId,
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            });

            BusinessLogService.save("EDIT_PRODUCT_ORDER", orderItem, orderItem.productOrderId, null, startTime);
        });
    };

    onDelete = (data) => {
        let startTime = new Date();
        console.log("on delete");
        this.productOderDatasource.delete(data.data).then((res) => {
            BusinessLogService.save("REMOVE_PRODUCT_ORDER", data.data, data.data.productOrderId, null, startTime);

            notify(
                {
                    message: "Xóa thành công đơn hàng " + data.data.productOrderId + "!",
                    width: 450,
                },
                "SUCCESS",
                3000,
            );
        });
    };

    rowIndexRender = (row) => {
        return <div>{row.rowIndex + 1}</div>;
    };
    createWorkOrderBtn = (data) => {
        // console.log(data)
        return (
            <div>
                <div id={"buttonCreateWOByPO" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton
                        row={data}
                        showBomversionView={this.showCreateWOByPOPopup}
                        disabled={data.data.state !== "CREATED" || data.data.status === "deactive"}
                        icon={"plus"}
                    />
                    <Tooltip
                        target={"#buttonCreateWOByPO" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Thêm KBSX cho các sản phẩm trong đơn hàng</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
                <div id={"buttonApproveOrder" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton
                        row={data}
                        showBomversionView={this.approveOrderWithComfirm}
                        disabled={
                            data.data.state === "APPROVED" ||
                            data.data.state === "CREATED" ||
                            data.data.state === "SEND_SCADA" ||
                            data.data.status === "deactive"
                        }
                        icon={"todo"}
                        style={"success"}
                    />
                    <Tooltip
                        target={"#buttonApproveOrder" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Phê duyệt</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
                <div id={"buttonSendToScadar" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton
                        row={data}
                        showBomversionView={this.senWOToScadarWithConfirm}
                        disabled={data.data.state !== "APPROVED" || data.data.status === "deactive"}
                        icon={"chevrondoubleright"}
                    />
                    <Tooltip
                        target={"#buttonSendToScadar" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Gửi tất cả WO sang Scadar</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
                <div id={"viewLog" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton row={data} showBomversionView={this.showWoLog} icon='textdocument' />

                    <Tooltip
                        target={"#viewLog" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Show History</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
            </div>
        );
    };

    async showCreateWOByPOPopup(row) {
        const key = row.data.productOrderId;
        // console.log(key);
        this.productOrderItemDs.filter = {
            conditions: [{ property: "productOrder", operator: "=", value: key }],
        };
        await this.productOrderItemDs.load().then((res) => {
            createWOByPOObj.setData(true, row.data, this.productOrderItemDs.items, null);
            // this.setState((previewState, props) => ({
            //   popupVisible: true,
            //   currentRow: row,
            //   productItems: this.productOrderItemDs.items
            // }))
        });
        // await this.setState((previewState, props) => ({
        //   popupVisible: true,
        //   currentRow: row
        // }))
    }

    approveOrderWithComfirm(row) {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                messageHtml: "Bạn chắc chắn muốn phê duyệt đơn hàng <b>" + row.data.productOrderId + "</b> này chứ?",
                title: "Xác nhận phê duyệt",
                buttons: [
                    {
                        text: "Hủy bỏ",
                        onClick: function (e) {
                            return false;
                        },
                    },
                    {
                        text: "Phê duyệt",
                        onClick: function (e) {
                            return true;
                        },
                    },
                ],
            });
            promptPromise.show().then((dialogResult) => {
                if (dialogResult) {
                    this.approveOrder(row);
                    resolve(false);
                } else {
                    reject("");
                }
            });
        });
    }

    approveOrder(row) {
        let startTime = currentDateTime();
        let order: PlanningProductionOrder = {};
        order.id = row.data.id;
        order.state = "APPROVED";
        this.dataInstance.setItem(order);
        this.dataInstance.commit().then((res) => {
            notify(
                {
                    message: "Phê duyệt thành công đơn hàng " + row.data.productOrderId,
                    width: 450,
                },
                "SUCCESS",
                3000,
            );
            this.onRefreshGrid();
        });

        BusinessLogService.save("APPROVE_PRODUCT_ORDER", null, row.data.productOrderId, null, startTime);
    }

    senWOToScadarWithConfirm(row) {
        const isCanceled = new Promise((resolve, reject) => {
            const promptPromise = custom({
                messageHtml: "Bạn chắc chắn gửi tất cả KBSX của đơn hàng <b>" + row.data.productOrderId + "</b> này sang SCADA ?",
                title: "Xác nhận gửi scada",
                buttons: [
                    {
                        text: "Xác nhận",
                        onClick: function (e) {
                            return true;
                        },
                    },
                    {
                        text: "Hủy bỏ",
                        onClick: function (e) {
                            return false;
                        },
                    },
                ],
            });

            promptPromise.show().then((dialogResult) => {
                if (dialogResult) {
                    this.sendToScadar(row);
                    resolve(false);
                } else {
                    reject("");
                }
            });
        });
    }

    sendToScadar(row) {
        // console.log("send to scadar");
        let headers = {
            Authorization: "Bearer " + this.props.mainStore.authToken,
            "content-type": "application/json",
        };
        // console.log("send api to get wo - line " + row.data.productOrderId);
        axios
            .get(PLANNING_API_URL + "/services/api/order/get-wo-line?productOrderId=" + row.data.productOrderId, { headers })
            .then((response) => {
                if (response.status === 200) {
                    const woLineList = response.data;
                    // console.log("response data");
                    // console.log(woLineList);
                    let success = false;
                    woLineList.map((woLine) => {
                        // console.log("woLine " + woLine.Wo_Id);
                        axios
                            .post(
                                SCADA_URL + "/api/auth/login",
                                {
                                    username: "ecyberlinh@gmail.com",
                                    password: "ATTT@123",
                                },
                                { headers },
                            )
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log("login thanh cong");

                                    const token = response.data.token;
                                    const headers = {
                                        "content-type": "application/json",
                                        "X-Authorization": "Bearer " + token,
                                    };
                                    let assetName = woLine.Wo_Id + "-" + woLine.Lot_Number;
                                    // let lineId = woLine.Line_Id ? "vline" : "Machines";
                                    let lineId = "vline";
                                    let assetId;
                                    axios
                                        .get(SCADA_URL + "/api/tenant/assets?assetName=" + assetName, { headers })
                                        .then((res) => {
                                            if (res.status == 200) {
                                                // console.log("asset name " + assetName + " is exists");
                                                assetId = res.data.id.id;
                                                axios
                                                    .post(
                                                        SCADA_URL +
                                                            "/api/plugins/telemetry/ASSET/" +
                                                            res.data.id.id +
                                                            "/attributes/SERVER_SCOPE",
                                                        woLine,
                                                        { headers },
                                                    )
                                                    .then((res) => {
                                                        if (res.status == 200) {
                                                            notify(
                                                                {
                                                                    message: "Đã gửi WO sang scadar thành công",
                                                                    width: 450,
                                                                },
                                                                "SUCCESS",
                                                                3000,
                                                            );
                                                            // console.log(
                                                            //   "send wo line to scadar success " +
                                                            //   woLine.Po_Id +
                                                            //   " xxx"
                                                            // );
                                                            ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                            success = true;
                                                            let headers = {
                                                                Authorization: "Bearer " + this.props.mainStore.authToken,
                                                                "content-type": "application/json",
                                                            };

                                                            axios
                                                                .get(
                                                                    PLANNING_API_URL +
                                                                        "/services/api/order/update-wo-state?poId=" +
                                                                        woLine.Po_Id,
                                                                    { headers },
                                                                )
                                                                .then((res) => {
                                                                    // console.log("update state ok");
                                                                    this.onRefreshGrid();
                                                                });
                                                        } else {
                                                            console.log(res);
                                                        }
                                                    });
                                            } else {
                                                // console.log("create new asset with name " + assetName);
                                                axios
                                                    .post(
                                                        SCADA_URL + "/api/asset",
                                                        {
                                                            name: assetName,
                                                            type: lineId,
                                                            label: assetName,
                                                            additionalInfo: {
                                                                description: assetName,
                                                            },
                                                        },
                                                        { headers },
                                                    )
                                                    .then((res) => {
                                                        if (res.status == 200) {
                                                            assetId = res.data.id.id;
                                                            // console.log(
                                                            //   "create scadar asset OK, asset id = " + assetId
                                                            // );
                                                            axios
                                                                .post(
                                                                    SCADA_URL +
                                                                        "/api/plugins/telemetry/ASSET/" +
                                                                        res.data.id.id +
                                                                        "/attributes/SERVER_SCOPE",
                                                                    woLine,
                                                                    { headers },
                                                                )
                                                                .then((res) => {
                                                                    if (res.status == 200) {
                                                                        notify(
                                                                            {
                                                                                message: "Đã gửi WO sang scadar thành công",
                                                                                width: 450,
                                                                            },
                                                                            "SUCCESS",
                                                                            3000,
                                                                        );
                                                                        // console.log(
                                                                        //   "send wo line to scadar success " +
                                                                        //   woLine.Po_Id +
                                                                        //   " xxx"
                                                                        // );
                                                                        ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                                        success = true;
                                                                        let headers = {
                                                                            Authorization: "Bearer " + this.props.mainStore.authToken,
                                                                            "content-type": "application/json",
                                                                        };
                                                                        axios
                                                                            .get(
                                                                                PLANNING_API_URL +
                                                                                    "/services/api/order/update-wo-state?poId=" +
                                                                                    woLine.Po_Id,
                                                                                { headers },
                                                                            )
                                                                            .then((res) => {
                                                                                // console.log("update state ok");
                                                                                this.onRefreshGrid();
                                                                            });
                                                                    } else {
                                                                        console.log(res);
                                                                    }
                                                                });
                                                        }
                                                    });
                                            }
                                        })
                                        .catch((reason) => {
                                            // console.log("reason");
                                            // console.log(reason);
                                            // console.log("create new asset with name " + assetName);
                                            axios
                                                .post(
                                                    SCADA_URL + "/api/asset",
                                                    {
                                                        name: assetName,
                                                        type: lineId,
                                                        label: assetName,
                                                        additionalInfo: {
                                                            description: assetName,
                                                        },
                                                    },
                                                    { headers },
                                                )
                                                .then((res) => {
                                                    if (res.status == 200) {
                                                        assetId = res.data.id.id;
                                                        // console.log(
                                                        //   "create scadar asset OK, asset id = " + assetId
                                                        // );
                                                        axios
                                                            .post(
                                                                SCADA_URL +
                                                                    "/api/plugins/telemetry/ASSET/" +
                                                                    res.data.id.id +
                                                                    "/attributes/SERVER_SCOPE",
                                                                woLine,
                                                                { headers },
                                                            )
                                                            .then((res) => {
                                                                if (res.status == 200) {
                                                                    notify(
                                                                        {
                                                                            message: "Đã gửi WO sang scadar thành công",
                                                                            width: 450,
                                                                        },
                                                                        "SUCCESS",
                                                                        3000,
                                                                    );
                                                                    // console.log(
                                                                    //   "send wo line to scadar success " +
                                                                    //   woLine.Po_Id +
                                                                    //   " xxx"
                                                                    // );
                                                                    ScadaService.updateProductName(woLine.Product_Code, token, assetId);
                                                                    success = true;
                                                                    let headers = {
                                                                        Authorization: "Bearer " + this.props.mainStore.authToken,
                                                                        "content-type": "application/json",
                                                                    };
                                                                    axios
                                                                        .get(
                                                                            PLANNING_API_URL +
                                                                                "/services/api/order/update-wo-state?poId=" +
                                                                                woLine.Po_Id,
                                                                            { headers },
                                                                        )
                                                                        .then((res) => {
                                                                            // console.log("update state ok");
                                                                            this.onRefreshGrid();
                                                                        });
                                                                } else {
                                                                    console.log(res);
                                                                    success = false;
                                                                }
                                                            });
                                                    }
                                                });
                                        });

                                    if (success) {
                                        // console.log("update wo state to SEND SCADAR OK");
                                        // console.log(woLineList.get());
                                        let headers = {
                                            Authorization: "Bearer " + this.props.mainStore.authToken,
                                            "content-type": "application/json",
                                        };
                                        // axios.post('http://192.168.68.91:3000/services/api/order/update-wo-state', {headers})
                                    }
                                } else {
                                    notify("Gửi yêu cầu sang Scadar thất bại!", "error", 3000);
                                }
                            });
                    });
                    const headers = { "content-type": "application/json" };
                } else {
                    notify("lấy wo list thất bại!", "error", 3000);
                }
            });
    }

    renderPopup = () => {
        // console.log(this.state.currentRow)
        return <CreateWorkOrderByPO row={this.state.currentRow} productOrderItems={this.state.productItems} closePopup={this.closePopup} />;
    };

    handlePopupHidden() {
        // this.productOderDatasource.load();
        this.setState((previewState, props) => ({
            popupVisible: false,
            currentRow: previewState.currentRow,
        }));
        this.onRefreshGrid();
    }

    closePopup() {
        this.setState((previewState, props) => ({
            popupVisible: false,
            currentRow: previewState.currentRow,
        }));
    }

    onAutoExpandAllChanged = () => {
        this.setState((previewState, props) => ({
            autoExpandAll: !previewState.autoExpandAll,
        }));
    };

    stateCellRender(rowInfo) {
        let cl = "processing";
        let str = "Mới tạo";
        if (!rowInfo.data.status || rowInfo.data.status === "active") {
            if (rowInfo.data.state === "CREATED") {
                cl = "processing";
                str = "Mới tạo";
            }
            if (rowInfo.data.state === "SEND_SCADA") {
                cl = "warning";
                str = "Đã gửi scada";
            }
            if (rowInfo.data.state === "CREATE_WO") {
                cl = "warning";
                str = "Đã khai WO";
            }
            if (rowInfo.data.state === "APPROVED") {
                cl = "success";
                str = "Đã phê duyệt";
            }
        } else {
            cl = "error";
            str = "Ngưng sản xuất";
        }
        return <Tag color={cl}>{str}</Tag>;
    }

    onStatusPoRender = (rowInfo) => {
        // console.log("Data color,", data?.value)
        let customColor: {
            color: string;
            backgroundColor: string;
        } = {
            color: "",
            backgroundColor: "",
        };
        let status = "";
        // let backgroundColor = "";
        let padding = "";
        let borderRadius = "";
        let width = "";
        let border = "";

        // let value = rowInfo.data.data.processStatus;
        const getColor = (value) => {
            // let color = ""
            switch (value) {
                case "new":
                    status = "Chờ sản xuất";
                    break;
                case "complete":
                    status = "Hoàn thành";
                    break;
                case "not_complete":
                    status = "Chưa hoàn thành";
                    break;
                case "in_production":
                    status = "Đang sản xuất";
                    break;
                case "early_complete":
                    status = "Hoàn thành sớm";
                    break;
                case "delay":
                    status = "Chậm tiến độ";
                    break;
                case "unknown":
                    status = "Chưa xác định";
                    break;
                case "wait_production":
                    status = "Chờ sản xuất";
                    break;
                case "stop":
                    status = "Ngưng sản xuất";
                    break;
                default:
                    status = "Chưa xác định";
                    break;
            }
        };

        getColor(rowInfo.data.data.processStatus);
        customColor = customizeColor(status);
        border = "1px solid " + customColor.color;
        // const color = getColor(rowInfo.data.data.processStatus)
        // return <Tag color={color}>{status}</Tag>
        return (
            <Tag
                style={{
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    color: customColor.color,
                    backgroundColor: customColor.backgroundColor,
                    // "padding": padding,
                    borderRadius: "4px",
                    // "width": width,
                    border: border,
                }}>
                {status}
            </Tag>
        );
    };

    renderProcessStatus(rowInfo) {
        let cl = "processing";
        let str = "Chưa xác định";
        if (!rowInfo.data.data.processStatus || rowInfo.data.data.processStatus === "new") {
            cl = "processing";
            str = "Chờ sản xuất";
        } else if (rowInfo.data.data.processStatus === "complete") {
            cl = "success";
            str = "Hoàn thành";
        } else if (rowInfo.data.data.processStatus === "not_complete") {
            cl = "error";
            str = "Chưa hoàn thành";
        } else if (rowInfo.data.data.processStatus === "early_complete") {
            cl = "success";
            str = "Hoàn thành sớm";
        } else if (rowInfo.data.data.processStatus === "delay") {
            cl = "warning";
            str = "Chậm tiến độ";
        } else if (rowInfo.data.data.processStatus === "in_production") {
            cl = "processing";
            str = "Đang sản xuất";
        } else if (rowInfo.data.data.processStatus === null || rowInfo.data.data.processStatus === "unknown") {
            cl = "error";
            str = "Chưa xác định";
        }
        let color = getColor(str);
        return <Tag color={color}>{str}</Tag>;
    }

    completePercent(row) {
        let outQuantity = row.data.quantityOut;
        let quantity = row.data.quantity;
        let displayQuantity = (outQuantity * 100) / quantity;
        if (outQuantity && quantity) {
            return <div className={"highlightColumnQuantity"}>{displayQuantity.toFixed(2)}%</div>;
        }
        return <div>---</div>;
    }

    quantityOut(row) {
        let outQuantity = row.data.quantityOut;
        if (outQuantity)
            return <div className={"highlightColumnQuantity"}>{outQuantity.toLocaleString("en-US", { maximumFractionDigits: 2 })}</div>;
        return <div>0.00</div>;
    }

    onCellPrepared(e) {
        if (e.rowType === "data") {
            e.cellElement.style.color = colorByCompletePercent(e.data.quantityOut, e.data.quantity);
        }
    }
}

export const ProductOrderManager = () => <ProductOrderManagerComponent />;

registerScreen({
    component: ProductOrderManager,
    caption: "screen.ProductOrderManager",
    screenId: "ProductOrderManager",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
