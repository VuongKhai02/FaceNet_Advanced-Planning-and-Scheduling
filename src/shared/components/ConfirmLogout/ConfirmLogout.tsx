import React from "react";
import classNames from "classnames/bind";
import { Modal, Button } from "antd";

import styles from "./ConfirmLogout.module.css";

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

const PopupConfirmDelete: React.FC<PopupConfirmDeleteProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
    customFooter,
}) => {
    return (
        <>
            <Modal
                open={isVisible}
                title={modalTitle}
                className={cx("modal-container")}
                footer={
                    customFooter !== undefined
                        ? customFooter
                        : [
                            <div className={cx("footer-container")}>
                                <Button
                                    key='cancel'
                                    className={cx("btn-cancel")}
                                    onClick={onCancel}>
                                    Hủy bỏ
                                </Button>
                                <Button
                                    className={cx(["btn", "btn-save"])}
                                    key='submit'
                                    onClick={onSubmit}>
                                    Đăng xuất
                                </Button>
                            </div>,
                        ]
                }
                width={width}
                onCancel={onCancel}>
                {modalContent}
            </Modal>
        </>
    );
};

export default PopupConfirmDelete;
