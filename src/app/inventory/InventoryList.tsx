import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useMasterDetailList, EntityListProps } from "@haulmont/jmix-react-ui";
import { Inventory } from "../../jmix/entities/Inventory";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "Inventory";
const ROUTING_PATH = "/inventoryMasterDetail";

const INVENTORY_LIST = gql`
    query InventoryList($limit: Int, $offset: Int, $orderBy: inp_InventoryOrderBy, $filter: [inp_InventoryFilterCondition]) {
        InventoryCount(filter: $filter)
        InventoryList(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
            id
            _instanceName
            inventoryAvailablequantity
            inventoryBulkBarcode
            inventoryCalculatedstatus
            inventoryCarrierid
            inventoryCarriernumber
            inventoryCheckindate
            inventoryConsumedquantity
            inventoryExpirationdate
            inventoryInitialquantity
            inventoryIsBulk
            inventoryLabelingstatus
            inventoryLastlocationid
            inventoryLifetimecount
            inventoryLocationid
            inventoryManufacturingdate
            inventoryMaterialcontrol
            inventoryMaterialidentifier
            inventoryMaterialtype
            inventoryParentinventory
            inventoryParentlocationid
            inventoryParentmaterialidentifier
            inventoryPartalternatenumbers
            inventoryPartclass
            inventoryPartid
            inventoryPartnumber
            inventoryPrinter
            inventoryPuLocation
            inventoryQuantity
            inventoryReceiveddate
            inventoryReservationreference
            inventoryReservedquantity
            inventoryScrappedquantity
            inventorySplicedinventoryid
            inventorySplicedmaterialidentifier
            inventoryStatus
            inventoryTrackingtype
            inventoryUomid
            inventoryUomname
            inventoryUpdatedby
            inventoryUpdateddate
            inventoryUsagecount
            inventroyMaterialname
        }
    }
`;

const InventoryList = observer((props: EntityListProps<Inventory>) => {
    const { entityList, onEntityListChange } = props;

    const {
        items,
        count,
        relationOptions,
        executeListQuery,
        listQueryResult: { loading, error },
        handleSelectionChange,
        handleFilterChange,
        handleSortOrderChange,
        handlePaginationChange,
        handleDeleteBtnClick,
        handleCreateBtnClick,
        goToParentScreen,
        entityListState,
    } = useMasterDetailList<Inventory>({
        listQuery: INVENTORY_LIST,
        entityName: ENTITY_NAME,
        routingPath: ROUTING_PATH,
        entityList,
        onEntityListChange,
    });

    if (error != null) {
        console.error(error);
        return <RetryDialog onRetry={executeListQuery} />;
    }

    const buttons = [
        <EntityPermAccessControl entityName={ENTITY_NAME} operation='create' key='create'>
            <Button
                htmlType='button'
                style={{ margin: "0 12px 12px 0" }}
                type='primary'
                icon={<PlusOutlined />}
                onClick={handleCreateBtnClick}>
                <span>
                    <FormattedMessage id='common.create' />
                </span>
            </Button>
        </EntityPermAccessControl>,
        <EntityPermAccessControl entityName={ENTITY_NAME} operation='delete' key='delete'>
            <Button
                htmlType='button'
                style={{ margin: "0 12px 12px 0" }}
                disabled={entityListState.selectedEntityId == null}
                onClick={handleDeleteBtnClick}
                key='remove'
                type='default'>
                <FormattedMessage id='common.remove' />
            </Button>
        </EntityPermAccessControl>,
    ];

    if (entityList != null) {
        buttons.unshift(
            <Tooltip title={<FormattedMessage id='common.back' />}>
                <Button
                    htmlType='button'
                    style={{ margin: "0 12px 12px 0" }}
                    icon={<LeftOutlined />}
                    onClick={goToParentScreen}
                    key='back'
                    type='default'
                    shape='circle'
                />
            </Tooltip>,
        );
    }

    return (
        <DataTable
            items={items}
            count={count}
            relationOptions={relationOptions}
            current={entityListState.pagination?.current}
            pageSize={entityListState.pagination?.pageSize}
            entityName={ENTITY_NAME}
            loading={loading}
            error={error}
            enableFiltersOnColumns={entityList != null ? [] : undefined}
            enableSortingOnColumns={entityList != null ? [] : undefined}
            columnDefinitions={[
                "inventoryAvailablequantity",
                "inventoryBulkBarcode",
                "inventoryCalculatedstatus",
                "inventoryCarrierid",
                "inventoryCarriernumber",
                "inventoryCheckindate",
                "inventoryConsumedquantity",
                "inventoryExpirationdate",
                "inventoryInitialquantity",
                "inventoryIsBulk",
                "inventoryLabelingstatus",
                "inventoryLastlocationid",
                "inventoryLifetimecount",
                "inventoryLocationid",
                "inventoryManufacturingdate",
                "inventoryMaterialcontrol",
                "inventoryMaterialidentifier",
                "inventoryMaterialtype",
                "inventoryParentinventory",
                "inventoryParentlocationid",
                "inventoryParentmaterialidentifier",
                "inventoryPartalternatenumbers",
                "inventoryPartclass",
                "inventoryPartid",
                "inventoryPartnumber",
                "inventoryPrinter",
                "inventoryPuLocation",
                "inventoryQuantity",
                "inventoryReceiveddate",
                "inventoryReservationreference",
                "inventoryReservedquantity",
                "inventoryScrappedquantity",
                "inventorySplicedinventoryid",
                "inventorySplicedmaterialidentifier",
                "inventoryStatus",
                "inventoryTrackingtype",
                "inventoryUomid",
                "inventoryUomname",
                "inventoryUpdatedby",
                "inventoryUpdateddate",
                "inventoryUsagecount",
                "inventroyMaterialname",
            ]}
            onRowSelectionChange={handleSelectionChange}
            onFilterChange={handleFilterChange}
            onSortOrderChange={handleSortOrderChange}
            onPaginationChange={handlePaginationChange}
            hideSelectionColumn={true}
            buttons={buttons}
        />
    );
});

export default InventoryList;