import { useEffect, useState } from "react";
import { useMainStore } from "@haulmont/jmix-react-core";
import axios from "axios";

import { Form, Popup, ScrollView } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import Lookup from "devextreme-react/lookup";

import DnlnvlDetailPickView from "./DnlnvlDetailPickView";

import InfoRow from "../../../../utils/InfoRow";
import { PLANNING_API_URL } from "../../../../config";
import { toastError } from "../../../../utils/ToastifyManager";
import { locale, loadMessages } from "devextreme/localization";
import { Scrolling } from "devextreme-react/data-grid";

const DnlnvlPopupPick = ({ popupIsOpen = false, setPopupClose = () => {}, currentDnlnvl }) => {
    const mainStore = useMainStore();
    const [parentLocation, setParentLocation] = useState<any[]>([]);
    const [parentLocationSelectedValue, setParentLocationSelectedValue] = useState<String>("");
    const [subLocationSelectedValue, setSubLocationSelectedValue] = useState<String>("");
    const [subLocation, setSubLocation] = useState<any[]>([]);
    const [warehouse, setWarehouse] = useState<any[]>([]);
    const [warehouseSelectedValue, setWarehouseSelectedValue] = useState<String>("");

    let offset = 8;

    useEffect(() => {
        loadMaterialLocation("", "").then(() => {});
        loadSubLocationData("", "").then(() => {});
        loadWarehouseData().then(() => {});
    }, []);

    locale("vi");
    loadMessages({
        vi: { Yes: "Đồng ý", No: "Hủy bỏ", Cancel: "Hủy", Search: "Tìm kiếm", "Export all data": "Xuất file Excel" },
    });

    const loadMaterialLocation = async (locationFullnameSearching: String, locationNameSearching: String) => {
        try {
            const res = await axios.get(PLANNING_API_URL + "/services/api/parent-location", {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
                params: {
                    locationFullnameSearching: locationFullnameSearching,
                    locationNameSearching: locationNameSearching,
                    firstResult: offset,
                },
            });
            const data = await res.data;
            // console.log("dnlnvlView loadMeterialLocation", data);
            setParentLocation((old) => [...old, ...data]);
        } catch (error) {
            toastError(error);
        }
        offset += 3000;
    };

    const loadSubLocationData = async (locationFullnameSearching: String, locationNameSearching: String) => {
        try {
            const res = await axios.get(PLANNING_API_URL + "/services/api/sub-location", {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
                params: {
                    locationFullnameSearching: locationFullnameSearching,
                    locationNameSearching: locationNameSearching,
                    firstResult: offset,
                },
            });
            const data = await res.data;
            setSubLocation((old) => [...old, ...data]);
        } catch (error) {
            toastError(error);
        }
        offset += 300;
    };
    const loadWarehouseData = async () => {
        try {
            const res = await axios.get(PLANNING_API_URL + "/services/api/warehouse", {
                headers: {
                    Authorization: "Bearer " + mainStore.authToken,
                },
            });
            setWarehouse(res.data);
        } catch (error) {
            toastError(error);
        }
    };

    const onScrollParentLocation = (e) => {
        if (e.reachedBottom) {
            // console.log("parent bottom" + e.reachedBottom);
            loadMaterialLocation("", "").then(() => {});
        }
    };
    const onScrollSubLocation = (e) => {
        if (e.reachedBottom) {
            // console.log("sub bottom" + e.reachedBottom);
            loadSubLocationData("", "").then(() => {});
        }
    };
    const onValueChangedParentLocation = (e) => {
        setParentLocationSelectedValue(e.value);
    };
    const onValueChangedSubLocation = (e) => {
        setSubLocationSelectedValue(e.value);
    };
    const onValueChangedWarehouse = (e) => {
        setWarehouseSelectedValue(e.value);
    };
    const onSearchSubLocation = (e) => {
        // console.log("input e: " + e);
        // console.log("value input" + e.value)
    };
    const getDisplaySubLocationList = (item) => {
        return item ? item.subLocation : "Chọn subLocation";
    };
    const getDisplayParentLocationList = (item) => {
        return item ? item.parentLocation : "Chọn parentLocation";
    };
    const getDisplayWarehouseList = (item) => {
        return item ? item.whsCodeAndName : "Chọn warehouse";
    };
    const popUpPickContentRender = () => {
        return (
            <ScrollView height={"100%"} useNative={true} showScrollbar='always'>
                <div style={{ height: "100%" }}>
                    <div>
                        {currentDnlnvl?.planningWorkOrder ? (
                            <>
                                <div style={{ backgroundColor: "white" }}>
                                    <Form colCount={4} alignItemLabels={true}>
                                        <SimpleItem colSpan={2}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <InfoRow label={"Dây chuyền"} data={currentDnlnvl?.planningWorkOrder.line} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <InfoRow label={"WO"} data={currentDnlnvl?.planningWorkOrder.woId} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <InfoRow label={"Số LOT"} data={currentDnlnvl?.planningWorkOrder.lotNumber} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <InfoRow
                                                                label={"Mã sản phẩm"}
                                                                data={currentDnlnvl?.planningWorkOrder.productCode}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <InfoRow
                                                                label={"Tên sản phẩm"}
                                                                data={currentDnlnvl?.planningWorkOrder.productName}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <InfoRow label={"Profile"} data={currentDnlnvl?.planningWorkOrder.profile} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <InfoRow
                                                                label={"Profile name"}
                                                                data={currentDnlnvl?.planningWorkOrder.profileId?.name}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </SimpleItem>
                                        <SimpleItem colSpan={2}>
                                            <div className='dx-fieldset-header'>Mã Warehouse</div>
                                            <div className='dx-fieldset'>
                                                <div className='dx-field'>
                                                    <Lookup
                                                        value={warehouseSelectedValue}
                                                        items={warehouse}
                                                        displayExpr={getDisplayWarehouseList}
                                                        placeholder='Chọn Mã Warehouse'
                                                        onValueChanged={onValueChangedWarehouse}
                                                        onEnterKey={onSearchSubLocation}></Lookup>
                                                </div>
                                            </div>
                                            <br />
                                            <div className='dx-fieldset-header'>Mã SubLocation</div>
                                            <div className='dx-fieldset'>
                                                <div className='dx-field'>
                                                    <Lookup
                                                        value={subLocationSelectedValue}
                                                        items={subLocation}
                                                        displayExpr={getDisplaySubLocationList}
                                                        placeholder='Chọn SubLocation'
                                                        onValueChanged={onValueChangedSubLocation}
                                                        onScroll={onScrollSubLocation}></Lookup>
                                                </div>
                                            </div>
                                            <br />
                                            <div className='dx-fieldset-header'>Mã Location</div>
                                            <div className='dx-fieldset'>
                                                <div className='dx-field'>
                                                    <Lookup
                                                        value={parentLocationSelectedValue}
                                                        items={parentLocation}
                                                        displayExpr={getDisplayParentLocationList}
                                                        placeholder='Chọn Mã Kho'
                                                        onValueChanged={onValueChangedParentLocation}
                                                        onScroll={onScrollParentLocation}></Lookup>
                                                </div>
                                            </div>
                                        </SimpleItem>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            ""
                        )}

                        {currentDnlnvl ? <DnlnvlDetailPickView data={currentDnlnvl} /> : ""}
                    </div>
                </div>
            </ScrollView>
        );
    };

    // <Scrolling mode="infinite" />

    return (
        <Popup
            id='gridContainer'
            visible={popupIsOpen}
            onHiding={setPopupClose}
            title='Danh sách nguyên liệu cần lấy'
            // titleRender={() => { return <div>Danh sách nguyên liệu cần lấy</div> }}
            showTitle={true}
            fullScreen={false}
            dragEnabled={false}
            contentRender={popUpPickContentRender}
            showCloseButton={true}
            closeOnOutsideClick={true}>
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={{
                    text: "Hủy",
                    onClick: setPopupClose,
                    stylingMode: "outlined",
                }}
            />
        </Popup>
    );
};

export default DnlnvlPopupPick;
