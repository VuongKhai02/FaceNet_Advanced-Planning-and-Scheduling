import React from 'react';
import { Modal, Button, Radio } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

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
    className
}) => {
    return (
        <Modal
            className={className}
            bodyStyle={{ padding: 0 }}
            // closeIcon={true}
            visible={isVisible}
            title={modalTitle}
            footer={[
                <div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, marginBottom: 20 }}>
                        <Button
                            key="cancel"
                            style={{
                                marginRight: '15px',
                                backgroundColor: '#E5E5E5',
                                display: 'inline-block',
                                borderRadius: '4px',
                                width: 100,
                                height: 40,
                                fontSize: 16
                            }}
                            onClick={onCancel}
                        >
                            Đóng
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

export default PopupDetailProductionRequire;
