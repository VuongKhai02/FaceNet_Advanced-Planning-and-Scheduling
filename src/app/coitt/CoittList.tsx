import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useEntityList, EntityListProps, registerEntityList } from "@haulmont/jmix-react-ui";
import { Coitt } from "../../jmix/entities/Coitt";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "Coitt";
const ROUTING_PATH = "/coittList";

const COITT_LIST = gql`
    query CoittList($limit: Int, $offset: Int, $orderBy: inp_CoittOrderBy, $filter: [inp_CoittFilterCondition]) {
        CoittCount(filter: $filter)
        CoittList(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
            id
            _instanceName
            canceled
            createDate
            createTime
            creator
            dataSource
            docNum
            handwrtten
            instance
            logInst
            object
            period
            remark
            requestStatus
            series
            status
            transfered
            uActive
            uDocurl
            uFromdate
            uInact
            uPrefix
            uPronam
            uProno
            uQuantity
            uRemark
            uSpec
            uStatus
            uTodate
            uUom
            uVersions
            uWhscod
            updateDate
            updateTime
            userSign
        }
    }
`;

const CoittList = observer((props: EntityListProps<Coitt>) => {
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
    } = useEntityList<Coitt>({
        listQuery: COITT_LIST,
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
                "canceled",
                "createDate",
                "createTime",
                "creator",
                "dataSource",
                "docNum",
                "handwrtten",
                "instance",
                "logInst",
                "object",
                "period",
                "remark",
                "requestStatus",
                "series",
                "status",
                "transfered",
                "uActive",
                "uDocurl",
                "uFromdate",
                "uInact",
                "uPrefix",
                "uPronam",
                "uProno",
                "uQuantity",
                "uRemark",
                "uSpec",
                "uStatus",
                "uTodate",
                "uUom",
                "uVersions",
                "uWhscod",
                "updateDate",
                "updateTime",
                "userSign",
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
    component: CoittList,
    caption: "screen.CoittList",
    screenId: "CoittList",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: `${ROUTING_PATH}/:entityId?`,
        menuLink: ROUTING_PATH,
    },
});

export default CoittList;
