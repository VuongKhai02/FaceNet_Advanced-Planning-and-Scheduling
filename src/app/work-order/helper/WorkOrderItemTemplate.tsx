import { observer } from "mobx-react";
import React from "react";
import DataGrid, { Column, HeaderFilter, Lookup, MasterDetail, Selection } from "devextreme-react/data-grid";
import { collection, injectMainStore, instance, MainStoreInjected } from "@haulmont/jmix-react-core";
import { ProductOrderItem } from "../../../jmix/entities/ProductOrderItem";
import { BomVersionButton } from "../../product/BomversionButton";
import { Coitt } from "../../../jmix/entities/Coitt";
import { PlanningWorkOrder } from "../../../jmix/entities/PlanningWorkOrder";
import WorkOrderLineTemplate from "./WorkOrderLineTemplate";
import { stateCellRender } from "../../utils";
import { Tooltip } from "devextreme-react/tooltip";
import axios from "axios";
import { PLANNING_API_URL } from "../../../config";
import notify from "devextreme/ui/notify";

@observer
@injectMainStore
class WorkOrderItemTemplate extends React.Component<
    { data; mainStore? },
    {
        popupVisible;
        currentRow;
        popupVisible2;
    },
    MainStoreInjected
> {
    key: string = this.props.data.data.woId;
    workOrderItemDs = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
        view: "_base",
        sort: "-woId",
        loadImmediately: true,
        filter: {
            conditions: [{ property: "parentWorkOrderId", operator: "=", value: this.key }],
        },
    });
    lines = [
        {
            ID: "3658da49-bbdd-c50e-73ba-e29c58d3125d",
            Name: "daychuyen_LKDT_01",
        },
        {
            ID: "b7b0f0a6-52b9-97ab-ee6a-a7c73a5eb595",
            Name: "vline_nhua01",
        },
        {
            ID: "a00fc79f-acd7-d2c3-a60c-5d9f8d0b4aab",
            Name: "daychuyen_LKDT_01-1",
        },
    ];
    bomVersionDs = collection<Coitt>(Coitt.NAME, {
        view: "_base",
        loadImmediately: false,
    });
    dataInstance = instance<ProductOrderItem>(ProductOrderItem.NAME, { view: "_base", loadImmediately: false });
    states = [
        {
            ID: 1.1,
            Name: "1.1",
        },
        {
            ID: 1.2,
            Name: "1.2",
        },
        {
            ID: 2.1,
            Name: "2.1",
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            currentRow: null,
            popupVisible2: false,
        };

        this.showBomversionView = this.showBomversionView.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.showCreateWOByProductPopup = this.showCreateWOByProductPopup.bind(this);
        this.buttonViewBom = this.buttonViewBom.bind(this);
        this.handlePopupHidden = this.handlePopupHidden.bind(this);
    }

    async componentDidMount() {
        this.workOrderItemDs = collection<PlanningWorkOrder>(PlanningWorkOrder.NAME, {
            view: "_base",
            sort: "-woId",
            loadImmediately: false,
            filter: {
                conditions: [{ property: "parentWorkOrderId", operator: "=", value: this.key }],
            },
        });
        await this.workOrderItemDs.load().then((res) => {
            this.setState((previewState, props) => ({
                popupVisible: false,
            }));
        });
    }

    render() {
        let { productOrderId } = this.props.data.data;
        return (
            <div>
                <div style={{ fontWeight: "bold", paddingBottom: "3px", paddingLeft: "3px", fontStyle: "italic" }}>
                    Kịch bản sản xuất - LOT
                </div>
                <DataGrid
                    id='gridContainer'
                    dataSource={this.workOrderItemDs.items}
                    keyExpr='id'
                    height={"auto"}
                    onRowUpdating={this.onEdit}
                    showBorders={true}
                    showColumnLines={true}
                    showRowLines={false}
                    rowAlternationEnabled={true}>
                    <Selection mode='single' />
                    <Column dataField='woId' width={120} caption='WO-LOT' cellRender={this.getIcon}></Column>
                    <Column dataField='line' caption='Dây chuyền'>
                        <Lookup dataSource={this.lines} displayExpr='Name' valueExpr='ID' />
                    </Column>
                    <Column dataField='productCode' caption='Mã Sản phẩm' visible={false}></Column>

                    <Column dataField='branchName' caption='Ngành' width={100}></Column>
                    <Column dataField='branchCode' visible={false} caption='Ngành'></Column>
                    <Column dataField='groupName' width={100} caption='Tổ'></Column>
                    <Column dataField='groupCode' width={100} caption='Tổ' visible={false}></Column>
                    <Column dataField='quantityPlan' width={100} caption='Số lượng'></Column>
                    <Column dataField='quantityActual' width={140} caption='Số lượng hoàn thành' visible={false}></Column>
                    <Column dataField='startTime' alignment='right' dataType='datetime' width={160} caption='Thời gian bắt đầu'></Column>
                    <Column dataField='endTime' alignment='right' dataType='datetime' width={160} caption='Thời gian kết thúc'></Column>
                    <Column dataField='bomVersion' width={120} caption='Bom Version'></Column>
                    <Column dataField='sapWo' width={100} visible={false} caption='SAP WO'></Column>
                    <Column dataField='lotNumber' caption='Số Lot' width={100}></Column>
                    <Column
                        dataField='state'
                        visible={false}
                        alignment={"center"}
                        width={140}
                        caption='Trạng thái'
                        cellRender={stateCellRender}>
                        <HeaderFilter groupInterval={10000} />
                    </Column>
                    <Column
                        alignment={"center"}
                        width={140}
                        caption={"Thao tác"}
                        cellRender={this.buttonCellRender}
                        visible={false}></Column>
                    {/*<Editing*/}
                    {/*  mode="popup"*/}
                    {/*  allowUpdating={true}*/}
                    {/*  allowDeleting={true}*/}
                    {/*>*/}
                    {/*  <Popup title="Cập nhật sản phẩm" showTitle={true} width={700} height={525}/>*/}
                    {/*  <Form>*/}
                    {/*    <Item itemType="group" colCount={2} colSpan={2}>*/}
                    {/*      <Item dataField="productCode" disabled={true}/>*/}
                    {/*      <Item dataField="productName" disabled={true}/>*/}
                    {/*      <Item dataField="quantity"/>*/}
                    {/*      <Item dataField="bomVersion"/>*/}
                    {/*    </Item>*/}

                    {/*  </Form>*/}
                    {/*</Editing>*/}
                    <MasterDetail enabled={true} component={WorkOrderLineTemplate} autoExpandAll={true}></MasterDetail>
                </DataGrid>
            </div>
        );
    }

    buttonViewBom = (row) => {
        // console.log("buttonViewBom")
        // console.log(row)
        return <BomVersionButton row={row} showBomversionView={this.showBomversionView} disabled={!row.data.bomVersion} />;
    };

    closePopup() {
        this.setState((previewState, props) => ({
            popupVisible: false,
            popupVisible2: false,
            currentRow: previewState.currentRow,
        }));
    }

    handlePopupHidden() {
        this.setState((previewState, props) => ({
            popupVisible: false,
            popupVisible2: false,
            currentRow: previewState.currentRow,
        }));
    }

    showBomversionView(row) {
        // console.log("showBomversionView")
        // console.log(row.data)
        this.bomVersionDs.filter = {
            conditions: [
                { property: "uProno", operator: "=", value: row.data.productCode },
                { property: "uVersions", operator: "=", value: row.data.bomVersion },
            ],
        };
        this.bomVersionDs.load().then((res) => {
            this.setState((previewState, props) => ({
                popupVisible: true,
                currentRow: row,
            }));
        });
    }

    //tao wo từ product
    showCreateWOByProductPopup(row) {
        // console.log(`showCreateWOByPOPopup`)
        this.setState((previewState, props) => ({
            popupVisible2: true,
            currentRow: row,
        }));
        // this.productOrderItemDs.filter = {
        //   conditions: [{property: 'productOrder', operator: "=", value: key}]
        // }
        // this.productOrderItemDs.load().then(res =>{
        //   this.setState((previewState, props) => ({
        //     popupVisible: true,
        //     currentRow: row,
        //   }))
        // });
        // this.setState((previewState, props) => ({
        //   popupVisible: true,
        //   currentRow: row
        // }))
    }

    onEdit = (data) => {
        // console.log(data);
        let orderItem = data.newData;
        orderItem.id = data.key;
        this.dataInstance.setItem(orderItem);
        this.dataInstance.commit();
    };

    getIcon(row) {
        return (
            <div>
                <i className='dx-icon-hierarchy dx-icon-custom-style-lot'>{row.data.woId}</i>
            </div>
        );
    }

    buttonCellRender = (data) => {
        // console.log(data.data)
        return (
            <div>
                <div id={"buttonSendToScadar" + data.data.id} style={{ float: "left" }}>
                    <BomVersionButton
                        row={data}
                        showBomversionView={this.sendWOToScadar}
                        icon={"chevrondoubleright"}
                        disabled={data.data.state.valueOf() === "SEND_SCADA_OK"}
                    />
                    <Tooltip
                        target={"#buttonSendToScadar" + data.data.id}
                        showEvent='dxhoverstart'
                        hideEvent='dxhoverend'
                        contentRender={() => {
                            return <p>Gửi WO sang Scadar</p>;
                        }}
                        hideOnOutsideClick={false}
                    />
                </div>
            </div>
        );
    };

    sendWOToScadar(row) {
        // console.log("send wo to scadar");
        // console.log(row.data)
        let headers = {
            Authorization: "Bearer " + this.props.mainStore.authToken,
            "content-type": "application/json",
        };
        // console.log("send api to get wo - line " + row.data.productOrder);
        axios
            .get(PLANNING_API_URL + "/services/api/order/get-wo-line?productOrderId=" + row.data.productOrder + "&woId=" + row.data.woId, {
                headers,
            })
            .then((response) => {
                if (response.status === 200) {
                    const woLineList = response.data;
                    // console.log('response data');
                    // console.log(woLineList);
                    let success = false;
                    woLineList.map((woLine) => {
                        // console.log('woLine ' + woLine.Wo_Id);
                        axios
                            .post(
                                "http://192.168.68.21:8080/api/auth/login",
                                {
                                    username: "ecyberlinh@gmail.com",
                                    password: "ATTT@123",
                                },
                                { headers },
                            )
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log("login thanh cong")

                                    const token = response.data.token;
                                    const headers = {
                                        "content-type": "application/json",
                                        "X-Authorization": "Bearer " + token,
                                    };
                                    let assetName = "LINE-" + woLine.Wo_Id;
                                    let lineId = "vline_" + woLine.Line_Id;
                                    let assetId;
                                    axios
                                        .get("http://192.168.68.21:8080/api/tenant/assets?assetName=" + assetName, { headers })
                                        .then((res) => {
                                            if (res.status == 200) {
                                                // console.log("asset name " + assetName + " is exists");
                                                assetId = res.data.id.id;
                                                axios
                                                    .post(
                                                        "http://192.168.68.21:8080/api/plugins/telemetry/ASSET/" +
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
                                                            // console.log("send wo line to scadar success " + woLine.Po_Id + " xxx")
                                                            success = true;
                                                            let headers = {
                                                                Authorization: "Bearer " + this.props.mainStore.authToken,
                                                                "content-type": "application/json",
                                                            };

                                                            axios
                                                                .get(
                                                                    PLANNING_API_URL +
                                                                        "/services/api/workorder/update-wo-state?woId=" +
                                                                        woLine.Wo_Id,
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
                                                        "http://192.168.68.21:8080/api/asset",
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
                                                            // console.log("create scadar asset OK, asset id = " + res.data.id.id)
                                                            axios
                                                                .post(
                                                                    "http://192.168.68.21:8080/api/plugins/telemetry/ASSET/" +
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
                                                                        console.log(
                                                                            "send wo line to scadar success " + woLine.Po_Id + " xxx",
                                                                        );
                                                                        success = true;
                                                                        let headers = {
                                                                            Authorization: "Bearer " + this.props.mainStore.authToken,
                                                                            "content-type": "application/json",
                                                                        };
                                                                        axios
                                                                            .get(
                                                                                PLANNING_API_URL +
                                                                                    "/services/api/workorder/update-wo-state?woId=" +
                                                                                    woLine.Wo_Id,
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
                                            // console.log('reason')
                                            // console.log(reason)
                                            // console.log("create new asset with name " + assetName);
                                            axios
                                                .post(
                                                    "http://192.168.68.21:8080/api/asset",
                                                    {
                                                        name: assetName,
                                                        type: lineId,
                                                        // "type": "vline",
                                                        label: assetName,
                                                        additionalInfo: {
                                                            description: assetName,
                                                        },
                                                    },
                                                    { headers },
                                                )
                                                .then((res) => {
                                                    if (res.status == 200) {
                                                        // console.log("create scadar asset OK, asset id = " + res.data.id.id)
                                                        axios
                                                            .post(
                                                                "http://192.168.68.21:8080/api/plugins/telemetry/ASSET/" +
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
                                                                    // console.log("send wo line to scadar success " + woLine.Po_Id + " xxx")
                                                                    success = true;
                                                                    let headers = {
                                                                        Authorization: "Bearer " + this.props.mainStore.authToken,
                                                                        "content-type": "application/json",
                                                                    };
                                                                    axios
                                                                        .get(
                                                                            PLANNING_API_URL +
                                                                                "/services/api/workorder/update-wo-state?woId=" +
                                                                                woLine.Wo_Id,
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
        this.onRefreshGrid();
    }

    onRefreshGrid() {
        this.loadProductOrder();
    }

    loadProductOrder() {
        this.workOrderItemDs.load().then((res) =>
            this.setState((previewState, props) => ({
                popupVisible: false,
            })),
        );
    }
}

export default WorkOrderItemTemplate;
