import React from "react";
import { Modal, Button } from "antd";

interface PopupConfirmGeneralProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    customFooter?: React.ReactNode[] | null;
}

const PopupConfirmGeneral: React.FC<PopupConfirmGeneralProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
    customFooter,
}) => {
    return (
        <Modal
            // closeIcon={true}
            visible={isVisible}
            title={modalTitle}
            footer={
                customFooter !== undefined
                    ? customFooter
                    : [
                          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, marginBottom: 20 }}>
                              <Button
                                  key='cancel'
                                  style={{
                                      marginRight: 20,
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
                              ,
                              <Button
                                  style={{
                                      borderRadius: "4px",
                                      backgroundColor: "#ff794e",
                                      color: "#ffff",
                                      width: 100,
                                      height: 40,
                                      fontSize: 16,
                                      marginRight: 20,
                                  }}
                                  key='submit'
                                  onClick={onSubmit}
                                  className='btn btn-save'>
                                  Xác nhận
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

export default PopupConfirmGeneral;
