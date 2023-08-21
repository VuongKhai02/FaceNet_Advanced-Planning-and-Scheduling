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
import { Location } from "../../jmix/entities/Location";

const ENTITY_NAME = "Location";
const ROUTING_PATH = "/locationMasterDetail";

const LOAD_LOCATION = gql`
    query LocationById($id: String = "", $loadItem: Boolean!) {
        LocationById(id: $id) @include(if: $loadItem) {
            id
            _instanceName
            locationAreaname
            locationBarcode
            locationChildlocationcolumncount
            locationChildlocationrowcount
            locationControlflag
            locationCreatedby
            locationCreatedon
            locationDescription
            locationDontallowcarriers
            locationDontallowmaterials
            locationFullname
            locationIsmultilocation
            locationLocationtypeName
            locationName
            locationNamecannotbechanged
            locationNotification
            locationOwnmaterial
            locationPrefixname
            locationPrefixseperator
            locationProductlimit
            locationRestrictonepart
            locationSubareaid
            locationSuffixdigitlen
            locationSuffixseperator
            locationTsm
            locationTsmenabled
            locationUniqueid
            locationUnloadlocation
            locationUpdatedby
            locationUpdatedon
            locationXpos
            locationYpos
            notifyMaterialChange
        }
    }
`;

const UPSERT_LOCATION = gql`
    mutation Upsert_Location($location: inp_Location!) {
        upsert_Location(location: $location) {
            id
        }
    }
`;

const LocationEditor = observer((props: EntityEditorProps<Location>) => {
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
    } = useMasterDetailEditor<Location>({
        loadQuery: LOAD_LOCATION,
        upsertMutation: UPSERT_LOCATION,
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
                propertyName='locationAreaname'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationBarcode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationChildlocationcolumncount'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationChildlocationrowcount'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationControlflag'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationCreatedby'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationCreatedon'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationDescription'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationDontallowcarriers'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationDontallowmaterials'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationFullname'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationIsmultilocation'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationLocationtypeName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationName'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationNamecannotbechanged'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationNotification'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationOwnmaterial'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationPrefixname'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationPrefixseperator'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationProductlimit'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationRestrictonepart'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationSubareaid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationSuffixdigitlen'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationSuffixseperator'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationTsm'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationTsmenabled'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationUniqueid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationUnloadlocation'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationUpdatedby'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationUpdatedon'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationXpos'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='locationYpos'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='notifyMaterialChange'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
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

export default LocationEditor;
