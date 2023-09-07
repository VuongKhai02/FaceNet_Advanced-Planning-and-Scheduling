import React from "react";
import classNames from "classnames/bind";
import { Modal, Button } from "antd";

import styles from "./PopupScanBarCode.module.css";
interface PopupScanBarCodeProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
}

const cx = classNames.bind(styles);

const PopupScanBarCode: React.FC<PopupScanBarCodeProps> = ({ isVisible, onCancel, onSubmit, modalTitle, modalContent, width }) => {
    return (
        <Modal
            open={isVisible}
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
                        onClick={onSubmit}>
                        In mã
                    </Button>
                </div>,
            ]}
            width={width}
            onCancel={onCancel}>
            {modalContent}
        </Modal>
    );
};

export default PopupScanBarCode;
