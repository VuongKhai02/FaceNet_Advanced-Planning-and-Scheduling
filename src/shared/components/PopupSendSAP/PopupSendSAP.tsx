import React from "react";
import { Modal, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./PopupSendSAP.module.css";
import { useTranslation } from "react-i18next";
interface PopupSendSAPProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
}
const cx = classNames.bind(styles);
const PopupSendSAP: React.FC<PopupSendSAPProps> = ({ isVisible, onCancel, onSubmit, modalTitle, modalContent, width }) => {
    const { t } = useTranslation(["common"]);
    return (
        <Modal
            className={cx(["modal-container"])}
            visible={isVisible}
            title={modalTitle}
            footer={[
                <div className={cx("footer-container")}>
                    <Button
                        key='cancel'
                        className={cx("btn-cancel")}
                        onClick={onCancel}>
                        {t("common.cancel-button")}
                    </Button>
                    <Button
                        className={cx("btn-save")}
                        key='submit'
                        onClick={onSubmit}
                    >
                        {t("common.confirm-button")}
                    </Button>
                </div>,
            ]}
            width={width}
            onCancel={onCancel}>
            {modalContent}
        </Modal>
    );
};

export default PopupSendSAP;
