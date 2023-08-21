import { DataGrid, DropDownBox, LoadPanel, ScrollView } from "devextreme-react";
import { Column, Selection, Paging, FilterRow, OperationDescriptions } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";

import _ from "lodash";

import { Location } from "../../../../jmix/entities/Location";
import axios from "axios";
import { PLANNING_API_URL } from "../../../../config";

type LocationCompProps = {
    updateLocations?: (filterExp: any) => void;
    modeSelection?: "single" | "multiple" | undefined | "none";
    defaultValue?: any;
};
const LocationComp = observer(
    ({
        updateLocations = (filterExp) => {
            console.log(filterExp);
        },
        modeSelection = "multiple",
        defaultValue,
    }: LocationCompProps) => {
        const gridColumns = ["locationFullname"];

        const [locations, setLocations] = useState<Location[] | undefined>(undefined);

        const [gridBoxValue, setGridBoxValue] = useState(defaultValue || []);

        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            setGridBoxValue(defaultValue || []);
        }, [defaultValue]);

        useEffect(() => {
            loadLocations();
        }, []);

        const loadLocations = async () => {
            setIsLoading(true);

            axios
                .get(PLANNING_API_URL + "/services/api/location", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("_jmixRestAccessToken"),
                    },
                })
                .then(function (response) {
                    setLocations(response.data);
                });
            // await locationsCollection.current.load();
            setIsLoading(false);
        };

        const dataGridOnSelectionChanged = (e: any) => {
            setGridBoxValue((e.selectedRowKeys.length && e.selectedRowKeys) || []);
        };

        const hideLoadPanel = () => {
            setIsLoading(false);
        };

        const dataGridRender = () => {
            return (
                <ScrollView>
                    <LoadPanel
                        visible={isLoading}
                        showIndicator={true}
                        showPane={true}
                        onHidden={hideLoadPanel}
                        position={{ of: "#location" }}
                        message='Đang tải...'
                    />
                    <DataGrid
                        keyExpr={"locationFullname"}
                        // dataSource={listLocations.current}
                        dataSource={locations}
                        columns={gridColumns}
                        hoverStateEnabled={true}
                        selectedRowKeys={gridBoxValue}
                        onSelectionChanged={dataGridOnSelectionChanged}
                        remoteOperations={true}>
                        <Column width={200} allowEditing={false} dataField={"location"} />
                        <Selection mode={modeSelection} />
                        <Paging enabled={true} pageSize={10} />
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
                    </DataGrid>
                </ScrollView>
            );
        };

        const syncDataGridSelection = (e: any) => {
            // console.log("syncDataGridSelection", e);
            if (e.value === null || e.value.length === 0) {
                updateLocations(null);
                setGridBoxValue(e.value || []);
                return;
            } else {
                const filterExp = _.map(e.value, (location) => {
                    return ["locationType", "contains", location];
                });
                // .join(" or ").split(" ").map((item) => {
                // return item === "or" ? "or" : item.split(",")
                // });
                updateLocations(filterExp);
                // console.log("filterExp", filterExp);
                setGridBoxValue(e.value);
            }
        };

        return (
            <div
                className={"123123"}
                style={{
                    position: "relative",
                    top: 46,
                    zIndex: 2,
                    width: "50%",
                }}>
                <DropDownBox
                    width={300} // TODO fix cứng width
                    value={gridBoxValue}
                    valueExpr='locationFullname'
                    deferRendering={false}
                    displayExpr='locationFullname'
                    placeholder='Chọn location ...'
                    showClearButton={true}
                    // dataSource={listLocations.current}
                    dataSource={locations}
                    onValueChanged={syncDataGridSelection}
                    contentRender={dataGridRender}
                />
            </div>
        );
    },
);

export default LocationComp;
