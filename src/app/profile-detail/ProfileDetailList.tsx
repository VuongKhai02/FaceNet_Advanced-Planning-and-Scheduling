import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useMasterDetailList, EntityListProps } from "@haulmont/jmix-react-ui";
import { ProfileDetail } from "../../jmix/entities/ProfileDetail";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "ProfileDetail";
const ROUTING_PATH = "/profileDetailMasterDetail";

const PROFILEDETAIL_LIST = gql`
    query ProfileDetailList($limit: Int, $offset: Int, $orderBy: inp_ProfileDetailOrderBy, $filter: [inp_ProfileDetailFilterCondition]) {
        ProfileDetailCount(filter: $filter)
        ProfileDetailList(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
            id
            _instanceName
            machineCode
            profile {
                id
                _instanceName
                description
                docEntry
                name
                profileCode
                status
                uProname
                uProno
                uVersion
                updatedAt
            }
            profileDetailPartNumbers {
                id
                _instanceName
                type
            }
            programmingDetail {
                id
                _instanceName
                createdAt
                designator
                lane {
                    id
                    _instanceName
                    laneName
                }
                locationX
                locationY
                locationZ
                machine {
                    id
                    _instanceName
                    lineId
                    machineName
                    status
                    workCenterId
                }
                note
                partNumber {
                    id
                    _instanceName
                    description
                    name
                    partNumberCode
                    vendor
                }
                partten
                qrFeeder {
                    id
                    _instanceName
                    name
                    note
                    qrFeederCode
                }
                rotation
                side
                slot
                subslot
                updatedAt
            }
        }

        ProfileList {
            id
            _instanceName
        }

        ProgrammingDetailList {
            id
            _instanceName
        }
    }
`;

const ProfileDetailList = observer((props: EntityListProps<ProfileDetail>) => {
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
    } = useMasterDetailList<ProfileDetail>({
        listQuery: PROFILEDETAIL_LIST,
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
            columnDefinitions={["machineCode", "profile", "programmingDetail"]}
            onRowSelectionChange={handleSelectionChange}
            onFilterChange={handleFilterChange}
            onSortOrderChange={handleSortOrderChange}
            onPaginationChange={handlePaginationChange}
            hideSelectionColumn={true}
            buttons={buttons}
        />
    );
});

export default ProfileDetailList;
