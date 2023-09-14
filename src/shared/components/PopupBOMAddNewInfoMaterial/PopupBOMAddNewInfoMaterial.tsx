import React from 'react';
import { Modal, Button, Radio } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface PopupBOMAddNewInfoMaterialProps {
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    modalTitle: React.ReactNode;
    modalContent: React.ReactNode;
    width: number;
    className?: string;
}

const PopupBOMAddNewInfoMaterial: React.FC<PopupBOMAddNewInfoMaterialProps> = ({
    isVisible,
    onCancel,
    onSubmit,
    modalTitle,
    modalContent,
    width,
    className
}) => {
    const { t } = useTranslation(["common"]);
    return (
        <Modal
            className={className}
            bodyStyle={{ padding: 0 }}
            // closeIcon={true}
            visible={isVisible}
            title={modalTitle}
            footer={[
                <div>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        {/* <Radio.Group defaultValue="active"> */}
                        <Radio value="active" checked={true}>Hoạt động</Radio>
                        {/* </Radio.Group> */}
                        <Radio value="inactive">Ngừng hoạt động</Radio>
                        <QrcodeOutlined style={{ fontSize: 30 }} />
                    </div>

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
                            {t("common.add-button")}
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

export default PopupBOMAddNewInfoMaterial;
