import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useMasterDetailList, EntityListProps } from "@haulmont/jmix-react-ui";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "PlanningWorkOrder";
const ROUTING_PATH = "/planningWorkOrderMasterDetail";

const PLANNINGWORKORDER_LIST = gql`
    query PlanningWorkOrderList(
        $limit: Int
        $offset: Int
        $orderBy: inp_PlanningWorkOrderOrderBy
        $filter: [inp_PlanningWorkOrderFilterCondition]
    ) {
        PlanningWorkOrderCount(filter: $filter)
        PlanningWorkOrderList(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
            id
            _instanceName
            bomVersion
            branchCode
            branchName
            createTime
            endTime
            groupCode
            groupName
            line
            lotNumber
            numberStaff
            parentWorkOrderId
            planningWorkOrderAssignmentList {
                id
                _instanceName
                actual
                batch
                bomVersion
                endTime
                exptected
                machine
                performEmployee
                planning
                planningWo
                productName
                productOrderId
                qaEmployee
                sapBatchCode
                sapBranchGroupCode
                sapWorkOrder
                startTime
                state
                status
                workCenter
            }
            planningWorkOrderId
            product
            productCode
            productName
            productOrder
            profile
            profileId {
                id
                _instanceName
                description
                docEntry
                name
                profileCode
                programming {
                    id
                    _instanceName
                    lineName
                    name
                    note
                    programingCode
                    programmingDetails {
                        id
                        _instanceName
                        createdAt
                        designator
                        dnlnvllList {
                            id
                            _instanceName
                            bufferQty
                            dnlnvlDetailList {
                                id
                                _instanceName
                                locationType
                                materialId
                                materialName
                                materialState
                                partNumberCode
                                partNumberId
                                reserveQty
                                status
                                stillNeed
                            }
                            estReqdQty
                            estTotalQty
                            laneId
                            laneName
                            partNumberCode
                            partNumberId
                            slot
                            stillNeed
                        }
                        locationX
                        locationY
                        locationZ
                        note
                        partten
                        rotation
                        side
                        slot
                        subslot
                        updatedAt
                    }
                    updatedAt
                }
                status
                uProname
                uProno
                uVersion
                updatedAt
            }
            profileName
            quantityActual
            quantityPlan
            sapWo
            startTime
            state
            status
            woId
            workOrderType
            workOrderTypeName
        }

        ProfileList {
            id
            _instanceName
        }
    }
`;

const PlanningWorkOrderList = observer((props: EntityListProps<PlanningWorkOrder>) => {
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
    } = useMasterDetailList<PlanningWorkOrder>({
        listQuery: PLANNINGWORKORDER_LIST,
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
                "bomVersion",
                "branchCode",
                "branchName",
                "createTime",
                "endTime",
                "groupCode",
                "groupName",
                "line",
                "lotNumber",
                "numberStaff",
                "parentWorkOrderId",
                "planningWorkOrderId",
                "product",
                "productCode",
                "productName",
                "productOrder",
                "profile",
                "profileId",
                "profileName",
                "quantityActual",
                "quantityPlan",
                "sapWo",
                "startTime",
                "state",
                "status",
                "woId",
                "workOrderType",
                "workOrderTypeName",
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

export default PlanningWorkOrderList;
