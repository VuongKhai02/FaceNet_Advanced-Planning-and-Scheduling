import React from "react";
import { Modal, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./PopupWO.module.css";
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
const PopupWO: React.FC<PopupWOProps> = ({ isVisible, onCancel, onSubmit, modalTitle, modalContent, width, customFooter }) => {
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

export default PopupWO;
