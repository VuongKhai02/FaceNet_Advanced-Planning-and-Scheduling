import React from "react";
import { Modal, Button } from "antd";

interface PopupScanBarCodeProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
}

const PopupScanBarCode: React.FC<PopupScanBarCodeProps> = ({ isVisible, onCancel, onSubmit, modalTitle, modalContent, width }) => {
    return (
        <Modal
            visible={isVisible}
            title={modalTitle}
            footer={[
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                    <Button
                        key='cancel'
                        style={{
                            marginRight: 10,
                            backgroundColor: "#E5E5E5",
                            display: "inline-block",
                            borderRadius: "4px",
                            width: 100,
                            height: 40,
                            fontSize: 16,
                        }}
                        onClick={onCancel}>
                        Hủy bỏ
                    </Button>
                    <Button
                        style={{
                            borderRadius: "4px",
                            backgroundColor: "#ff794e",
                            color: "#ffff",
                            width: 100,
                            height: 40,
                            fontSize: 16,
                            marginRight: 10,
                        }}
                        key='submit'
                        onClick={onSubmit}
                        className='btn btn-save'>
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
