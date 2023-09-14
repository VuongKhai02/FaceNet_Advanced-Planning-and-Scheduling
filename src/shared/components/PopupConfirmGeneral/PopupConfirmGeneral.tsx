import React from "react";
import { Modal, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./PopupConfirmGeneral.module.css";
import { useTranslation } from "react-i18next";
interface PopupConfirmGeneralProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    customFooter?: React.ReactNode[] | null;
}
const cx = classNames.bind(styles);
const PopupConfirmGeneral: React.FC<PopupConfirmGeneralProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
    customFooter,
}) => {
    const { t } = useTranslation(["common"]);
    return (
        <Modal
            className={cx(["modal-container"])}
            visible={isVisible}
            title={modalTitle}
            footer={
                customFooter !== undefined
                    ? customFooter
                    : [
                        <div className={cx("footer-container")}>
                            <Button
                                key='cancel'
                                className={cx("btn-cancel")}
                                onClick={onCancel}>
                                {t("common.cancel-button")}
                            </Button>
                            <Button

                                key='submit'
                                onClick={onSubmit}
                                className={cx("btn-save")}>
                                {t("common.confirm-button")}
                            </Button>
                        </div>,
                    ]
            }
            width={width}
            onCancel={onCancel}>
            {modalContent}
        </Modal>
    );
};

export default PopupConfirmGeneral;
