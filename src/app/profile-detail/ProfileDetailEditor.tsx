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
import { ProfileDetail } from "../../jmix/entities/ProfileDetail";

const ENTITY_NAME = "ProfileDetail";
const ROUTING_PATH = "/profileDetailMasterDetail";

const LOAD_PROFILEDETAIL = gql`
    query ProfileDetailById($id: String = "", $loadItem: Boolean!) {
        ProfileDetailById(id: $id) @include(if: $loadItem) {
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
                partNumber {
                    id
                    _instanceName
                    description
                    name
                    partNumberCode
                    vendor
                }
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

const UPSERT_PROFILEDETAIL = gql`
    mutation Upsert_ProfileDetail($profileDetail: inp_ProfileDetail!) {
        upsert_ProfileDetail(profileDetail: $profileDetail) {
            id
        }
    }
`;

const ProfileDetailEditor = observer((props: EntityEditorProps<ProfileDetail>) => {
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
    } = useMasterDetailEditor<ProfileDetail>({
        loadQuery: LOAD_PROFILEDETAIL,
        upsertMutation: UPSERT_PROFILEDETAIL,
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
                propertyName='machineCode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='profile'
                associationOptions={relationOptions?.get("Profile")}
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

export default ProfileDetailEditor;
