import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useEntityList, EntityListProps, registerEntityList } from "@haulmont/jmix-react-ui";
import { Citt1 } from "../../jmix/entities/Citt1";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "Citt1";
const ROUTING_PATH = "/citt1List";

const CITT1_LIST = gql`
    query Citt1List($limit: Int, $offset: Int, $orderBy: inp_Citt1OrderBy, $filter: [inp_Citt1FilterCondition]) {
        Citt1Count(filter: $filter)
        Citt1List(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
            uItemcode
            _instanceName
            docEntry
            lineId
            logInst
            object
            uAlter
            uCtrlevel
            uDocentry
            uIssue
            uItemname
            uItmtech
            uLocation
            uOthernam
            uPartnumber
            uQuantity
            uRemarks
            uSelect
            uSlect
            uType
            uUom
            uVendor
            uVersions
            uWhscod
            visOrder
        }
    }
`;

const Citt1List = observer((props: EntityListProps<Citt1>) => {
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
        handleEditBtnClick,
        goToParentScreen,
        entityListState,
    } = useEntityList<Citt1>({
        listQuery: CITT1_LIST,
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
        <EntityPermAccessControl entityName={ENTITY_NAME} operation='update' key='update'>
            <Button
                htmlType='button'
                style={{ margin: "0 12px 12px 0" }}
                disabled={entityListState.selectedEntityId == null}
                type='default'
                onClick={handleEditBtnClick}>
                <FormattedMessage id='common.edit' />
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
                "docEntry",
                "lineId",
                "logInst",
                "object",
                "uAlter",
                "uCtrlevel",
                "uDocentry",
                "uIssue",
                "uItemname",
                "uItmtech",
                "uLocation",
                "uOthernam",
                "uPartnumber",
                "uQuantity",
                "uRemarks",
                "uSelect",
                "uSlect",
                "uType",
                "uUom",
                "uVendor",
                "uVersions",
                "uWhscod",
                "visOrder",
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

registerEntityList({
    component: Citt1List,
    caption: "screen.Citt1List",
    screenId: "Citt1List",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default Citt1List;
