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
import { StageCode } from "../../jmix/entities/StageCode";

const ENTITY_NAME = "StageCode";
const ROUTING_PATH = "/stageCodeEditor";

const LOAD_STAGECODE = gql`
    query StageCodeById($id: String = "", $loadItem: Boolean!) {
        StageCodeById(id: $id) @include(if: $loadItem) {
            stageCode
            _instanceName
            stageName
            status
        }
    }
`;

const UPSERT_STAGECODE = gql`
    mutation Upsert_StageCode($stageCode: inp_StageCode!) {
        upsert_StageCode(stageCode: $stageCode) {
            id
        }
    }
`;

const StageCodeEditor = observer((props: EntityEditorProps<StageCode>) => {
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
    } = useEntityEditor<StageCode>({
        loadQuery: LOAD_STAGECODE,
        upsertMutation: UPSERT_STAGECODE,
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
                    propertyName='stageName'
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
    component: StageCodeEditor,
    caption: "screen.StageCodeEditor",
    screenId: "StageCodeEditor",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});

export default StageCodeEditor;
