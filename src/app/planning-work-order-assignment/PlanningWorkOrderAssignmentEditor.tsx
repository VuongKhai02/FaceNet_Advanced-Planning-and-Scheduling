import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import FormDev, { Item } from "devextreme-react/form";
import {
    createAntdFormValidationMessages,
    createUseAntdForm,
    createUseAntdFormValidation,
    RetryDialog,
    Field,
    GlobalErrorsAlert,
    Spinner,
    useEntityEditor,
    EntityEditorProps,
    registerEntityEditor,
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { PlanningWorkOrderAssignment } from "../../jmix/entities/PlanningWorkOrderAssignment";

const ENTITY_NAME = "PlanningWorkOrderAssignment";
const ROUTING_PATH = "/planningWorkOrderAssignmentEditor";

const LOAD_PLANNINGWORKORDERASSIGNMENT = gql`
    query PlanningWorkOrderAssignmentById($id: String = "", $loadItem: Boolean!) {
        PlanningWorkOrderAssignmentById(id: $id) @include(if: $loadItem) {
            id
            _instanceName
            actual
            batch
            bomVersion
            endTime
            exptected
            line {
                id
                _instanceName
                color
                errorRatio
                inputQuantity
                lineName
                location
                performance
                status
                workCenter
            }
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
        LineList {
            id
            _instanceName
        }
    }
`;

const UPSERT_PLANNINGWORKORDERASSIGNMENT = gql`
    mutation Upsert_PlanningWorkOrderAssignment($planningWorkOrderAssignment: inp_PlanningWorkOrderAssignment!) {
        upsert_PlanningWorkOrderAssignment(planningWorkOrderAssignment: $planningWorkOrderAssignment) {
            id
        }
    }
`;

const PlanningWorkOrderAssignmentEditor = observer((props: EntityEditorProps<PlanningWorkOrderAssignment>) => {
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
    } = useEntityEditor<PlanningWorkOrderAssignment>({
        loadQuery: LOAD_PLANNINGWORKORDERASSIGNMENT,
        upsertMutation: UPSERT_PLANNINGWORKORDERASSIGNMENT,
        entityName: ENTITY_NAME,
        routingPath: ROUTING_PATH,
        onCommit,
        entityInstance,
        useEntityEditorForm: createUseAntdForm(form),
        useEntityEditorFormValidation: createUseAntdFormValidation(form),
    });

    if (queryLoading) {
        return <Spinner />;
    }

    if (queryError != null) {
        console.error(queryError);
        return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
        <Card className='narrow-layout'>
            <FormDev
                // onFinish={handleSubmit}
                // onFinishFailed={handleSubmitFailed}
                // layout="vertical"
                formData={form}
                // validateMessages={createAntdFormValidationMessages(intl)}
            >
                <Item
                    // entityName={ENTITY_NAME}
                    dataField='productName'
                    // formItemProps={{
                    //   style: { marginBottom: "12px" }
                    // }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='productOrderId'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />
                <Field
                    entityName={ENTITY_NAME}
                    propertyName='actual'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='batch'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='bomVersion'
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
                    propertyName='endTime'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='line'
                    associationOptions={relationOptions?.get("Line")}
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='machine'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='performEmployee'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='planning'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='planningWo'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='qaEmployee'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='sapBatchCode'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='sapBranchGroupCode'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='sapWorkOrder'
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
                    propertyName='workCenter'
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
            </FormDev>
        </Card>
    );
});

registerEntityEditor({
    component: PlanningWorkOrderAssignmentEditor,
    caption: "screen.PlanningWorkOrderAssignmentEditor",
    screenId: "PlanningWorkOrderAssignmentEditor",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});

export default PlanningWorkOrderAssignmentEditor;
