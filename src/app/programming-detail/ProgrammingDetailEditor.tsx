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
import { ProgrammingDetail } from "../../jmix/entities/ProgrammingDetail";

const ENTITY_NAME = "ProgrammingDetail";
const ROUTING_PATH = "/programmingDetailMasterDetail";

const LOAD_PROGRAMMINGDETAIL = gql`
    query ProgrammingDetailById($id: String = "", $loadItem: Boolean!) {
        ProgrammingDetailById(id: $id) @include(if: $loadItem) {
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
            programming {
                id
                _instanceName
                lineName
                name
                note
                programingCode
                updatedAt
            }
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
        LaneList {
            id
            _instanceName
        }

        MachineList {
            id
            _instanceName
        }

        PartNumberList {
            id
            _instanceName
        }

        ProfileList {
            id
            _instanceName
        }

        ProgrammingList {
            id
            _instanceName
        }

        QrFeederList {
            id
            _instanceName
        }
    }
`;

const UPSERT_PROGRAMMINGDETAIL = gql`
    mutation Upsert_ProgrammingDetail($programmingDetail: inp_ProgrammingDetail!) {
        upsert_ProgrammingDetail(programmingDetail: $programmingDetail) {
            id
        }
    }
`;

const ProgrammingDetailEditor = observer((props: EntityEditorProps<ProgrammingDetail>) => {
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
    } = useMasterDetailEditor<ProgrammingDetail>({
        loadQuery: LOAD_PROGRAMMINGDETAIL,
        upsertMutation: UPSERT_PROGRAMMINGDETAIL,
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
                propertyName='createdAt'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='designator'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='lane'
                associationOptions={relationOptions?.get("Lane")}
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationX'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationY'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationZ'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='machine'
                associationOptions={relationOptions?.get("Machine")}
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='note'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

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
                propertyName='partten'
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
                propertyName='profileDetailPartNumbers'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='programming'
                associationOptions={relationOptions?.get("Programming")}
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='qrFeeder'
                associationOptions={relationOptions?.get("QrFeeder")}
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='rotation'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='side'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='slot'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='subslot'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='updatedAt'
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

export default ProgrammingDetailEditor;
