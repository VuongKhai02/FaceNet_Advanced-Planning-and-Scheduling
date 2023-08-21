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
import { Employee } from "../../jmix/entities/Employee";

const ENTITY_NAME = "Employee";
const ROUTING_PATH = "/employeeMasterDetail";

const LOAD_EMPLOYEE = gql`
    query EmployeeById($id: String = "", $loadItem: Boolean!) {
        EmployeeById(id: $id) @include(if: $loadItem) {
            id
            _instanceName
            employeeCode
            employeeGroup
            fullName
            image
            mail
            status
            userName
        }
    }
`;

const UPSERT_EMPLOYEE = gql`
    mutation Upsert_Employee($employee: inp_Employee!) {
        upsert_Employee(employee: $employee) {
            id
        }
    }
`;

const EmployeeEditor = observer((props: EntityEditorProps<Employee>) => {
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
    } = useMasterDetailEditor<Employee>({
        loadQuery: LOAD_EMPLOYEE,
        upsertMutation: UPSERT_EMPLOYEE,
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
                propertyName='employeeCode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='employeeGroup'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='fullName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='image'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='mail'
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
                propertyName='userName'
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

export default EmployeeEditor;
