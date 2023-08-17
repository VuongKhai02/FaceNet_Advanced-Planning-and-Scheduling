import { useMainStore } from "@haulmont/jmix-react-core";
import { DataGrid, LoadPanel, ScrollView } from "devextreme-react";
import { Column, FilterRow, HeaderFilter, MasterDetail, OperationDescriptions, Pager, Paging, Scrolling } from "devextreme-react/data-grid";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";
import { toastError } from "../../../../utils/ToastifyManager";

const DnlnvlPopupShowMaterialAvailble = observer(({ partNunbers, planningWorkOrder }) => {
    function renderTemplateMaterDetail(data) {
        // console.log(data)
        return <DnlnvlMaterial data={data} planningWorkOrder={planningWorkOrder} />;
    }

    return (
        <>
            <ScrollView width='100%' height='100%'>
                <div id='textBlock'>
                    <DataGrid
                        dataSource={partNunbers}
                        keyExpr='partNumberId'
                        showBorders={true}
                        allowColumnResizing={true}
                        rowAlternationEnabled={true}
                        noDataText='Không có dữ liệu để hiển thị'>
                        <Column width={150} dataField={"partNumberId"} caption={"Part Number ID"} />
                        <Column dataField={"name"} caption={"Part Number Name"} />
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
                        <Paging enabled={true} defaultPageSize={10} />
                        <Pager
                            visible={true}
                            displayMode={"full"}
                            showInfo={true}
                            showNavigationButtons={true}
                            infoText='Trang số {0} trên {1} ({2} bản ghi)'
                        />
                        <MasterDetail enabled={true} render={renderTemplateMaterDetail} />
                    </DataGrid>
                </div>
            </ScrollView>
        </>
    );
});

export default DnlnvlPopupShowMaterialAvailble;

const DnlnvlMaterial = ({ data, planningWorkOrder }) => {
    const mainStore = useMainStore();
    const [materials, setMaterials] = useState([]);
    const [totalMaterialsUsed, setTotalMaterialsUsed] = useState(0);
    const [totalMaterialsAvailable, setTotalMaterialsAvailable] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadMaterial();
    }, []);

    const loadMaterial = async () => {
        try {
            // console.log("data", data, planningWorkOrder)
            setIsLoading(true);
            const res = await axios.post(
                `${PLANNING_API_URL}/services/api/get-material-used-avaiable/${data?.data.name}`,
                planningWorkOrder,
                {
                    headers: {
                        Authorization: `Bearer ${mainStore.authToken}`,
                    },
                },
            );
            let materials = await res.data;
            let totalUsed = 0;
            let totalAvailable = 0;
            materials.sort((materialUsed, materialAvailable) => {
                return materialAvailable.used - materialUsed.used;
            });
            materials.forEach((material) => {
                if (material.used) {
                    totalUsed++;
                } else {
                    totalAvailable++;
                }
            });
            setMaterials(materials);
            setTotalMaterialsUsed(totalUsed);
            setTotalMaterialsAvailable(totalAvailable);
            setIsLoading(false);
        } catch (error) {
            toastError("Có lỗi xảy ra");
            setIsLoading(false);
        }
    };
    const repaintMaterialsSelected = (event: any) => {
        if (event.rowType === "data" && event.data.used) {
            event.cellElement.style.backgroundColor = "rgba(214,214,214,0.3)";
            event.cellElement.style.color = "rgba(0,0,0,0.5)";
        }
    };

    const hideLoadPanel = () => {
        setIsLoading(false);
    };

    return (
        <>
            <div>
                <h3>Materials used: {totalMaterialsUsed}</h3>
                <h3>Materials available: {totalMaterialsAvailable}</h3>
            </div>
            <LoadPanel
                visible={isLoading}
                showIndicator={true}
                showPane={true}
                shading={true}
                shadingColor='rgba(0,0,0,0.4)'
                onHiding={hideLoadPanel}
                position={{ of: "#root" }}
                message='Đang tải...'
            />
            <ScrollView width='100%' height='100%'>
                <DataGrid
                    dataSource={materials}
                    keyExpr='id'
                    showBorders={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    onCellPrepared={repaintMaterialsSelected}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    height={300}>
                    <Column dataField='material' caption='Material Id' />
                    <Column dataField='materialName' caption='Material Name' />
                    <Column dataField={"materialState"} caption={"Material State"} />
                    <Column dataField={"reserveQty"} caption={"reserveQty"} />
                    <HeaderFilter visible={true} />
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
                    {/* <Paging enabled={true}
                    defaultPageSize={5}
                /> */}
                    {/* <Pager visible={true}
                    displayMode={"full"}
                    showInfo={true}
                    showNavigationButtons={true}
                    allowedPageSizes={[5, 10]} /> */}
                    <Scrolling mode={"virtual"} />
                </DataGrid>
            </ScrollView>
        </>
    );
};
