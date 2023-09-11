import React from "react";
import classNames from "classnames/bind";
import { Modal, Button } from "antd";

import styles from "./PopupDetailBoxCard.module.css";

const cx = classNames.bind(styles);
interface PopupDetailBoxCardProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    className?: string;
}

const PopupDetailBoxCard: React.FC<PopupDetailBoxCardProps> = ({
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
            className={cx("modal-container", className)}
            bodyStyle={{ padding: 0 }}
            // closeIcon={true}
            open={isVisible}
            title={modalTitle}
            footer={[
                <div>
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
                            Cập nhật
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

export default PopupDetailBoxCard;
