import React from "react";
import { Form, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import {
    createAntdFormValidationMessages,
    createUseAntdForm,
    createUseAntdFormValidation,
    RetryDialog,
    Field,
    GlobalErrorsAlert,
    Spinner,
    useMasterDetailEditor,
    EntityEditorProps,
    useCreateAntdResetForm,
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";

const ENTITY_NAME = "PlanningWorkOrder";
const ROUTING_PATH = "/planningWorkOrderMasterDetail";

const LOAD_PLANNINGWORKORDER = gql`
    query PlanningWorkOrderById($id: String = "", $loadItem: Boolean!) {
        PlanningWorkOrderById(id: $id) @include(if: $loadItem) {
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

const UPSERT_PLANNINGWORKORDER = gql`
    mutation Upsert_PlanningWorkOrder($planningWorkOrder: inp_PlanningWorkOrder!) {
        upsert_PlanningWorkOrder(planningWorkOrder: $planningWorkOrder) {
            id
        }
    }
`;

const PlanningWorkOrderEditor = observer((props: EntityEditorProps<PlanningWorkOrder>) => {
    const { onCommit, entityInstance, submitBtnCaption = "common.submit" } = props;

    const [form] = useForm();

    const {
        relationOptions,
        executeLoadQuery,
        loadQueryResult: { loading: queryLoading, error: queryError },
        upsertMutationResult: { loading: upsertLoading },
        serverValidationErrors,
        intl,
        handleSubmit,
        handleSubmitFailed,
        handleCancelBtnClick,
    } = useMasterDetailEditor<PlanningWorkOrder>({
        loadQuery: LOAD_PLANNINGWORKORDER,
        upsertMutation: UPSERT_PLANNINGWORKORDER,
        entityName: ENTITY_NAME,
        routingPath: ROUTING_PATH,
        onCommit,
        entityInstance,
        useEntityEditorForm: createUseAntdForm(form),
        useEntityEditorFormValidation: createUseAntdFormValidation(form),
        resetEntityEditorForm: useCreateAntdResetForm(form),
    });

    if (queryLoading) {
        return <Spinner />;
    }

    if (queryError != null) {
        console.error(queryError);
        return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
        <Form
            onFinish={handleSubmit}
            onFinishFailed={handleSubmitFailed}
            layout='vertical'
            form={form}
            validateMessages={createAntdFormValidationMessages(intl)}>
            <Field
                entityName={ENTITY_NAME}
                propertyName='bomVersion'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='branchCode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='branchName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='createTime'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='endTime'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='groupCode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='groupName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='line'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='lotNumber'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='numberStaff'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='parentWorkOrderId'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='planningWorkOrderAssignmentList'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='planningWorkOrderId'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='product'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='productCode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='productName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='productOrder'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='profile'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='profileId'
                associationOptions={relationOptions?.get("Profile")}
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='profileName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='quantityActual'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='quantityPlan'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='sapWo'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='startTime'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='state'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='status'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='woId'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='workOrderType'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='workOrderTypeName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

            <Form.Item style={{ textAlign: "center" }}>
                <Button htmlType='button' onClick={handleCancelBtnClick}>
                    <FormattedMessage id='common.cancel' />
                </Button>
                <Button type='primary' htmlType='submit' loading={upsertLoading} style={{ marginLeft: "8px" }}>
                    <FormattedMessage id={submitBtnCaption} />
                </Button>
            </Form.Item>
        </Form>
    );
});

export default PlanningWorkOrderEditor;
