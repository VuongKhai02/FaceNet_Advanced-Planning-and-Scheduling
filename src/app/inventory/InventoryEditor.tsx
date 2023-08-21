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
import { Inventory } from "../../jmix/entities/Inventory";

const ENTITY_NAME = "Inventory";
const ROUTING_PATH = "/inventoryMasterDetail";

const LOAD_INVENTORY = gql`
    query InventoryById($id: String = "", $loadItem: Boolean!) {
        InventoryById(id: $id) @include(if: $loadItem) {
            id
            _instanceName
            inventoryAvailablequantity
            inventoryBulkBarcode
            inventoryCalculatedstatus
            inventoryCarrierid
            inventoryCarriernumber
            inventoryCheckindate
            inventoryConsumedquantity
            inventoryExpirationdate
            inventoryInitialquantity
            inventoryIsBulk
            inventoryLabelingstatus
            inventoryLastlocationid
            inventoryLifetimecount
            inventoryLocationid
            inventoryManufacturingdate
            inventoryMaterialcontrol
            inventoryMaterialidentifier
            inventoryMaterialtype
            inventoryParentinventory
            inventoryParentlocationid
            inventoryParentmaterialidentifier
            inventoryPartalternatenumbers
            inventoryPartclass
            inventoryPartid
            inventoryPartnumber
            inventoryPrinter
            inventoryPuLocation
            inventoryQuantity
            inventoryReceiveddate
            inventoryReservationreference
            inventoryReservedquantity
            inventoryScrappedquantity
            inventorySplicedinventoryid
            inventorySplicedmaterialidentifier
            inventoryStatus
            inventoryTrackingtype
            inventoryUomid
            inventoryUomname
            inventoryUpdatedby
            inventoryUpdateddate
            inventoryUsagecount
            inventroyMaterialname
        }
    }
`;

const UPSERT_INVENTORY = gql`
    mutation Upsert_Inventory($inventory: inp_Inventory!) {
        upsert_Inventory(inventory: $inventory) {
            id
        }
    }
`;

const InventoryEditor = observer((props: EntityEditorProps<Inventory>) => {
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
    } = useMasterDetailEditor<Inventory>({
        loadQuery: LOAD_INVENTORY,
        upsertMutation: UPSERT_INVENTORY,
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
                propertyName='inventoryAvailablequantity'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryBulkBarcode'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryCalculatedstatus'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryCarrierid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryCarriernumber'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryCheckindate'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryConsumedquantity'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryExpirationdate'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryInitialquantity'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryIsBulk'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    valuePropName: "checked",
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryLabelingstatus'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryLastlocationid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryLifetimecount'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryLocationid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryManufacturingdate'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryMaterialcontrol'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryMaterialidentifier'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryMaterialtype'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryParentinventory'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryParentlocationid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryParentmaterialidentifier'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryPartalternatenumbers'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryPartclass'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryPartid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryPartnumber'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryPrinter'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryPuLocation'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryQuantity'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryReceiveddate'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryReservationreference'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryReservedquantity'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryScrappedquantity'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventorySplicedinventoryid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventorySplicedmaterialidentifier'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryStatus'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryTrackingtype'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryUomid'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryUomname'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryUpdatedby'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryUpdateddate'
                formItemProps={{
                    style: { marginBottom: "12px" },
                    rules: [{ required: true }],
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventoryUsagecount'
                formItemProps={{
                    style: { marginBottom: "12px" },
                }}
            />

            <Field
                entityName={ENTITY_NAME}
                propertyName='inventroyMaterialname'
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

export default InventoryEditor;
