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
import { EmployeeGroup } from "../../jmix/entities/EmployeeGroup";

const ENTITY_NAME = "EmployeeGroup";
const ROUTING_PATH = "/employeeGroupMasterDetail";

const LOAD_EMPLOYEEGROUP = gql`
    query EmployeeGroupById($id: String = "", $loadItem: Boolean!) {
        EmployeeGroupById(id: $id) @include(if: $loadItem) {
            userGroup
            _instanceName
            userGroupCode
            userGroupName
        }
    }
`;

const UPSERT_EMPLOYEEGROUP = gql`
    mutation Upsert_EmployeeGroup($employeeGroup: inp_EmployeeGroup!) {
        upsert_EmployeeGroup(employeeGroup: $employeeGroup) {
            id
        }
    }
`;

const EmployeeGroupEditor = observer((props: EntityEditorProps<EmployeeGroup>) => {
    const { onCommit, entityInstance, submitBtnCaption = "common.submit" } = props;

    const [form] = useForm();

    const {
        executeLoadQuery,
        loadQueryResult: { loading: queryLoading, error: queryError },
        upsertMutationResult: { loading: upsertLoading },
        serverValidationErrors,
        intl,
        handleSubmit,
        handleSubmitFailed,
        handleCancelBtnClick,
    } = useMasterDetailEditor<EmployeeGroup>({
        loadQuery: LOAD_EMPLOYEEGROUP,
        upsertMutation: UPSERT_EMPLOYEEGROUP,
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
                propertyName='userGroupCode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='userGroupName'
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

export default EmployeeGroupEditor;
