import React from 'react';
import { Modal, Button, Radio } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface PopupJobOutputDetailProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    className?: string;
    customFooter?: React.ReactNode[] | null;
}

const PopupJobOutputDetail: React.FC<PopupJobOutputDetailProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
    className,
    customFooter
}) => {
    const { t } = useTranslation(["common"]);
    return (
        <Modal
            className={className}
            bodyStyle={{ padding: 0 }}
            // closeIcon={true}
            visible={isVisible}
            title={modalTitle}
            footer={customFooter !== undefined ? customFooter : [
                <div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                        <Button
                            key="cancel"
                            style={{
                                marginRight: '30px',
                                backgroundColor: '#E5E5E5',
                                display: 'inline-block',
                                borderRadius: '4px',
                                width: 100,
                                height: 40,
                                fontSize: 16
                            }}
                            onClick={onCancel}
                        >
                            {t("common.cancel-button")}
                        </Button>
                        <Button
                            style={{
                                borderRadius: '4px',
                                backgroundColor: '#ff794e',
                                color: '#ffff',
                                width: 100,
                                height: 40,
                                fontSize: 16
                            }}
                            key="submit"
                            onClick={onSubmit}
                            className="btn btn-save"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            ]}
            width={width}
            onCancel={onCancel}
        >
            {modalContent}
        </Modal>
    );
};

export default PopupJobOutputDetail;
