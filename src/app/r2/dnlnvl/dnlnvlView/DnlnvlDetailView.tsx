import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "devextreme-react/text-area";
import {
    Column,
    DataGrid,
    FilterRow,
    HeaderFilter,
    Item as ToolbarItem1,
    OperationDescriptions,
    Pager,
    Paging,
    Toolbar,
} from "devextreme-react/data-grid";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { useCollection } from "@haulmont/jmix-react-core";
import { Button } from "devextreme-react/button";

const DnlnvlDetailView = observer((props) => {
    const dnlnvl = props.data.data;

    const dnlnvlDetailDetailCollection = useCollection<DnlnvlDetailDetail>(DnlnvlDetailDetail.NAME, {
        view: "with-part",
        loadImmediately: false,
    });

    const [currentDnlnvlDetailDetail, setCurrentDnlnvlDetailDetail] = useState<DnlnvlDetailDetail[] | undefined>(undefined);

    useEffect(() => {
        // console.log("DetailView dnlnvl", dnlnvl);
        loadDnlnvlDetailDetail(dnlnvl.id);
    }, []);

    const renderPartNumberNameCell = (data) => {
        return <div>{data.value?.name}</div>;
    };

    const loadDnlnvlDetailDetail = async (id) => {
        dnlnvlDetailDetailCollection.current.filter = {
            conditions: [{ property: "dnlnvlDetail.id", operator: "=", value: id }],
        };

        await dnlnvlDetailDetailCollection.current.load().then((res) => {
            if (dnlnvlDetailDetailCollection.current.items) {
                setCurrentDnlnvlDetailDetail(dnlnvlDetailDetailCollection.current.items);
            }
        });
    };

    const refresh2 = () => {
        loadDnlnvlDetailDetail(dnlnvl.id);
    };

    useEffect(() => {
        loadDnlnvlDetailDetail(dnlnvl.id);
    }, []);

    const statusCellRender = (cell) => {
        return cell.value == 3 ? "Khả dụng" : "Không khả dụng";
    };

    return (
        <div style={{ width: "100%" }}>
            {currentDnlnvlDetailDetail ? (
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
                    dataSource={currentDnlnvlDetailDetail}>
                    <Toolbar>
                        <ToolbarItem1 location='after'>
                            <Button hint='Refresh' onClick={refresh2} icon='refresh' />
                        </ToolbarItem1>
                    </Toolbar>
                    <Paging enabled={true} defaultPageSize={10} />
                    <Pager
                        visible={true}
                        displayMode={"full"}
                        showInfo={true}
                        showNavigationButtons={true}
                        allowedPageSizes={[5, 10]}
                        infoText='Trang số {0} trên {1} ({2} bản ghi)'
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
                    <HeaderFilter visible={true} />
                    <Column visible={false} dataField='id' caption='Id' />
                    <Column dataField='material' caption='Material Id' alignment={"left"} />
                    <Column dataField='materialName' caption='Material Name' />
                    {/*<Column dataField="partNumberCode"/>*/}
                    <Column dataField='partNumber' caption='Part Name' cellRender={renderPartNumberNameCell} allowEditing={false} />
                    <Column dataField='rankAp' caption='RankAp' />
                    <Column dataField='rankMau' caption='RankMau' />
                    <Column dataField='rankQuang' caption='RankQuang' dataType='string' />
                    <Column dataField='userData4' caption='UserData4' dataType='string' />
                    <Column dataField='userData5' caption='UserData5' />
                    <Column dataField='reserveQty' caption='Reserve Qty' alignment={"left"} />
                    <Column dataField='stillNeed' caption='Still Need' alignment={"left"} />
                    <Column dataField='materialState' caption='Material State' />
                    <Column dataField='locationType' caption='Location (Type)' />
                    <Column dataField='status' caption='Trạng thái' cellRender={statusCellRender} alignment={"left"} />
                </DataGrid>
            ) : (
                ""
            )}
        </div>
    );
});

export default DnlnvlDetailView;
