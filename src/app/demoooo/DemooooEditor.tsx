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
  GlobalErrorsAlert,
  Spinner,
  useMasterDetailEditor,
  EntityEditorProps,
  useCreateAntdResetForm
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { Demoooo } from "../../jmix/entities/Demoooo";

const ENTITY_NAME = "Demoooo";
const ROUTING_PATH = "/demooooMasterDetail";

const LOAD_DEMOOOO = gql`
  query DemooooById($id: String = "", $loadItem: Boolean!) {
    DemooooById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
    }
  }
`;

const UPSERT_DEMOOOO = gql`
  mutation Upsert_Demoooo($demoooo: inp_Demoooo!) {
    upsert_Demoooo(demoooo: $demoooo) {
      id
    }
  }
`;

const DemooooEditor = observer((props: EntityEditorProps<Demoooo>) => {
  const {
    onCommit,
    entityInstance,
    submitBtnCaption = "common.submit"
  } = props;

  const [form] = useForm();

  const {
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    serverValidationErrors,
    intl,
    handleSubmit,
    handleSubmitFailed,
    handleCancelBtnClick
  } = useMasterDetailEditor<Demoooo>({
    loadQuery: LOAD_DEMOOOO,
    upsertMutation: UPSERT_DEMOOOO,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    onCommit,
    entityInstance,
    useEntityEditorForm: createUseAntdForm(form),
    useEntityEditorFormValidation: createUseAntdFormValidation(form),
    resetEntityEditorForm: useCreateAntdResetForm(form)
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
      layout="vertical"
      form={form}
      validateMessages={createAntdFormValidationMessages(intl)}
    >
      <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

      <Form.Item style={{ textAlign: "center" }}>
        <Button htmlType="button" onClick={handleCancelBtnClick}>
          <FormattedMessage id="common.cancel" />
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={upsertLoading}
          style={{ marginLeft: "8px" }}
        >
          <FormattedMessage id={submitBtnCaption} />
        </Button>
      </Form.Item>
    </Form>
  );
});

export default DemooooEditor;
