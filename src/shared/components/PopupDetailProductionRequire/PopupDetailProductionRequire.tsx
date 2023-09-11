import React from "react";
import classNames from "classnames/bind";
import { Modal, Button, Radio } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";

import styles from "./PopupDetailProductionRequire.module.css";

const cx = classNames.bind(styles);

interface PopupDetailProductionRequireProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    className?: string;
}

const PopupDetailProductionRequire: React.FC<PopupDetailProductionRequireProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
    className,
}) => {
    return (
        <Modal
            className={cx(['modal-container', className])}
            bodyStyle={{ padding: 0 }}
            // closeIcon={true}
            open={isVisible}
            title={modalTitle}
            footer={[
                <div>
                    <div className={cx("footer-container")}>
                        <Button
                            key='cancel'
                            onClick={onCancel}>
                            Đóng
                        </Button>
                    </div>
                </div>,
            ]}
            width={width}
            onCancel={onCancel}>
            {modalContent}
        </Modal>
    );
};

export default PopupDetailProductionRequire;
