import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useEntityList, EntityListProps, registerEntityList } from "@haulmont/jmix-react-ui";
import { Line } from "../../jmix/entities/Line";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "Line";
const ROUTING_PATH = "/lineList";

const LINE_LIST = gql`
    query LineList($limit: Int, $offset: Int, $orderBy: inp_LineOrderBy, $filter: [inp_LineFilterCondition]) {
        LineCount(filter: $filter)
        LineList(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
            id
            _instanceName
            errorRatio
            inputQuantity
            lineCode
            lineName
            location
            performance
            status
            workCenter
        }
    }
`;

const LineList = observer((props: EntityListProps<Line>) => {
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
    } = useEntityList<Line>({
        listQuery: LINE_LIST,
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
            columnDefinitions={["errorRatio", "inputQuantity", "lineCode", "lineName", "location", "performance", "status", "workCenter"]}
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
    component: LineList,
    caption: "screen.LineList",
    screenId: "LineList",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default LineList;
