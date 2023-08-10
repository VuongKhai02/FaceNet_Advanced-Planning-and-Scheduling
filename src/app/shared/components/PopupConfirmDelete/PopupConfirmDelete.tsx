import React from 'react';
import { Modal, Button } from 'antd';

interface PopupConfirmDeleteProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
}

const PopupConfirmDelete: React.FC<PopupConfirmDeleteProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
}) => {
    return (
        <Modal
            bodyStyle={{ padding: 0 }}
            closeIcon={true}
            visible={isVisible}
            title={modalTitle}
            footer={[
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
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
                        Hủy bỏ
                    </Button>,
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
                        Xóa
                    </Button>
                </div>
            ]}
            width={width}
            onCancel={onCancel}
        >
            {modalContent}
        </Modal>
    );
};

export default PopupConfirmDelete;
