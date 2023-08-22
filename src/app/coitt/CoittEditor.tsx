import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
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
import { Coitt } from "../../jmix/entities/Coitt";

const ENTITY_NAME = "Coitt";
const ROUTING_PATH = "/coittEditor";

const LOAD_COITT = gql`
    query CoittById($id: String = "", $loadItem: Boolean!) {
        CoittById(id: $id) @include(if: $loadItem) {
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

const UPSERT_COITT = gql`
    mutation Upsert_Coitt($coitt: inp_Coitt!) {
        upsert_Coitt(coitt: $coitt) {
            id
        }
    }
`;

const CoittEditor = observer((props: EntityEditorProps<Coitt>) => {
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
    } = useEntityEditor<Coitt>({
        loadQuery: LOAD_COITT,
        upsertMutation: UPSERT_COITT,
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
            <Form
                onFinish={handleSubmit}
                onFinishFailed={handleSubmitFailed}
                layout='vertical'
                form={form}
                validateMessages={createAntdFormValidationMessages(intl)}>
                <Field
                    entityName={ENTITY_NAME}
                    propertyName='canceled'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='createDate'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='createTime'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='creator'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='dataSource'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='docNum'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='handwrtten'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='instance'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='logInst'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='object'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='period'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='remark'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='requestStatus'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='series'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='status'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='transfered'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uActive'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uDocurl'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uFromdate'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uInact'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uPrefix'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uPronam'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uProno'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uQuantity'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uRemark'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uSpec'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uStatus'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uTodate'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uUom'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uVersions'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='uWhscod'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='updateDate'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='updateTime'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='userSign'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                        rules: [{ required: true }],
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
        </Card>
    );
});

registerEntityEditor({
    component: CoittEditor,
    caption: "screen.CoittEditor",
    screenId: "CoittEditor",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});

export default CoittEditor;
