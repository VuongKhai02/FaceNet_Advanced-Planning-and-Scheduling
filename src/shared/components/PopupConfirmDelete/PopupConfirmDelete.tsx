import React from "react";
import { Modal, Button } from "antd";
import PopupConfirmCancel from "../PopupConfirmCancel/PopupConfirmCancel";
import { WarningOutlined } from "@ant-design/icons";

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
    const [isConfirmCancel, setIsConfirmCancel] = React.useState<boolean>(false);
    return (
        <>
            <Modal
                // closeIcon={true}
                visible={isVisible}
                title={modalTitle}
                footer={
                    customFooter !== undefined
                        ? customFooter
                        : [
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    marginTop: 14,
                                    marginBottom: 14,
                                }}>
                                <Button
                                    key='cancel'
                                    style={{
                                        marginRight: 14,
                                        backgroundColor: "#E5E5E5",
                                        display: "inline-block",
                                        borderRadius: "4px",
                                        width: 100,
                                        height: 40,
                                        fontSize: 16,
                                    }}
                                    onClick={onCancel}>
                                    Hủy
                                </Button>
                                <Button
                                    style={{
                                        borderRadius: "4px",
                                        backgroundColor: "#ff794e",
                                        color: "#ffff",
                                        width: 100,
                                        height: 40,
                                        fontSize: 16,
                                        //   marginRight: 7,
                                    }}
                                    key='submit'
                                    onClick={onSubmit}
                                    className='btn btn-save'>
                                    Xóa
                                </Button>
                            </div>,
                        ]
                }
                width={width}
                onCancel={onCancel}>
                {modalContent}
            </Modal>

            {/* {
                isConfirmCancel && (
                    <PopupConfirmCancel
                        isVisible={isConfirmCancel}
                        onCancel={() => setIsConfirmCancel(false)}
                        onSubmit={() => { }}
                        width={600}
                        modalTitle={
                            <div>
                                <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#ff794e', fontWeight: 500 }}>
                                    Xác nhận hủy
                                </h3>
                            </div>
                        }
                        modalContent={
                            <div>
                                <h4 style={{ fontWeight: 400 }}>Bạn có chắc chắn muốn <b>Hủy thao tác</b>?</h4>
                                <div style={{ backgroundColor: '#ffe0c2', borderLeft: '4px solid #ff794e', height: 100, borderRadius: 5 }}>
                                    <h3 style={{ color: '#ff794e', fontWeight: 500 }}>
                                        <WarningOutlined style={{ color: '#ff794e', marginRight: '8px' }} />
                                        Lưu ý:
                                    </h3>
                                    <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>Nếu bạn <b>Hủy thao tác</b> thì các dữ liệu nhập sẽ bị mất</p>
                                </div>
                            </div>
                        }
                    />
                )
            } */}
        </>
    );
};

export default PopupConfirmDelete;
