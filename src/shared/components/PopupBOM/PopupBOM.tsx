import React from "react";
import { Modal, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./PopupBOM.module.css";
interface PopupWOProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    customFooter?: React.ReactNode[] | null;
}
const cx = classNames.bind(styles);
const PopupBOM: React.FC<PopupWOProps> = ({ isVisible, onCancel, onSubmit, modalTitle, modalContent, width, customFooter }) => {
    return (
        <Modal
            visible={isVisible}
            title={modalTitle}
            className={cx(["modal-container"])}
            footer={
                customFooter !== undefined
                    ? customFooter
                    : [
                        <div className={cx("footer-container")}>
                            <Button
                                key='cancel'
                                className={cx("btn-cancel")}
                                onClick={onCancel}>
                                Hủy
                            </Button>
                            ,
                            <Button
                                className={cx("btn-save")}
                                key='submit'
                                onClick={onSubmit}
                            >
                                Lưu lại
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

export default PopupBOM;
