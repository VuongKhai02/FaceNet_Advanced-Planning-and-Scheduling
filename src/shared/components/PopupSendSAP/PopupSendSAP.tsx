import React from "react";
import { Modal, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./PopupSendSAP.module.css";
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
                        Hủy bỏ
                    </Button>
                    <Button
                        className={cx("btn-save")}
                        key='submit'
                        onClick={onSubmit}
                    >
                        Xác nhận
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
