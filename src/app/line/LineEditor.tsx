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
import { Line } from "../../jmix/entities/Line";

const ENTITY_NAME = "Line";
const ROUTING_PATH = "/lineEditor";

const LOAD_LINE = gql`
    query LineById($id: String = "", $loadItem: Boolean!) {
        LineById(id: $id) @include(if: $loadItem) {
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

const UPSERT_LINE = gql`
    mutation Upsert_Line($line: inp_Line!) {
        upsert_Line(line: $line) {
            id
        }
    }
`;

const LineEditor = observer((props: EntityEditorProps<Line>) => {
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
    } = useEntityEditor<Line>({
        loadQuery: LOAD_LINE,
        upsertMutation: UPSERT_LINE,
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
                    propertyName='errorRatio'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='inputQuantity'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />
                <Field
                    entityName={ENTITY_NAME}
                    propertyName='lineCode'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='lineName'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='location'
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='performance'
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
            </Form>
        </Card>
    );
});

registerEntityEditor({
    component: LineEditor,
    caption: "screen.LineEditor",
    screenId: "LineEditor",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});

export default LineEditor;
