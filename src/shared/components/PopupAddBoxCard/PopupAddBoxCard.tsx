import React from "react";
import classNames from "classnames/bind";
import { Modal, Button } from "antd";

import styles from "./PopupAddBoxCard.module.css";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

interface PopupConfirmDeleteProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    customFooter?: React.ReactNode[] | null;
}

const PopupAddBoxCard: React.FC<PopupConfirmDeleteProps> = ({
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
            bodyStyle={{ padding: 0 }}
            className={cx("modal-container")}
            open={isVisible}
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
                                className={cx(["btn", "btn-save"])}
                                key='submit'
                                onClick={onSubmit}>
                                {t("common.add-button")}
                            </Button>
                        </div>
                    ]
            }
            width={width}
            onCancel={onCancel}>
            {modalContent}
        </Modal>
    );
};

export default PopupAddBoxCard;
