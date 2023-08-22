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
import { ProfileDetailPartNumber } from "../../jmix/entities/ProfileDetailPartNumber";

const ENTITY_NAME = "ProfileDetailPartNumber";
const ROUTING_PATH = "/profileDetailPartNumberEditor";

const LOAD_PROFILEDETAILPARTNUMBER = gql`
    query ProfileDetailPartNumberById($id: String = "", $loadItem: Boolean!) {
        ProfileDetailPartNumberById(id: $id) @include(if: $loadItem) {
            id
            _instanceName
            partNumber {
                id
                _instanceName
                description
                name
                partNumberCode
                vendor
            }
            programmingDetail {
                id
                _instanceName
                createdAt
                designator
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
            type
        }
        PartNumberList {
            id
            _instanceName
        }

        ProgrammingDetailList {
            id
            _instanceName
        }
    }
`;

const UPSERT_PROFILEDETAILPARTNUMBER = gql`
    mutation Upsert_ProfileDetailPartNumber($profileDetailPartNumber: inp_ProfileDetailPartNumber!) {
        upsert_ProfileDetailPartNumber(profileDetailPartNumber: $profileDetailPartNumber) {
            id
        }
    }
`;

const ProfileDetailPartNumberEditor = observer((props: EntityEditorProps<ProfileDetailPartNumber>) => {
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
    } = useEntityEditor<ProfileDetailPartNumber>({
        loadQuery: LOAD_PROFILEDETAILPARTNUMBER,
        upsertMutation: UPSERT_PROFILEDETAILPARTNUMBER,
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
                    propertyName='partNumber'
                    associationOptions={relationOptions?.get("PartNumber")}
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='programmingDetail'
                    associationOptions={relationOptions?.get("ProgrammingDetail")}
                    formItemProps={{
                        style: { marginBottom: "12px" },
                    }}
                />

                <Field
                    entityName={ENTITY_NAME}
                    propertyName='type'
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
    component: ProfileDetailPartNumberEditor,
    caption: "screen.ProfileDetailPartNumberEditor",
    screenId: "ProfileDetailPartNumberEditor",
    entityName: ENTITY_NAME,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});

export default ProfileDetailPartNumberEditor;