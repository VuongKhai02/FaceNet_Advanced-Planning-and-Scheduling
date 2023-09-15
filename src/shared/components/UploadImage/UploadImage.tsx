import React, { useState } from 'react';
import { Upload, Modal } from 'antd';

function getBase64(file: File) {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const UploadImage: React.FC = () => {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>('');
    const [fileList, setFileList] = useState<any[]>([]);

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }: any) => setFileList(fileList);

    const handleUploadImage = (
        <div>
            <div className="ant-upload-text">
                Tải ảnh lên
            </div>
        </div>
    );

    return (
        <div className="clearfix">
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : handleUploadImage}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="girl" style={{ width: '100%' }} src={previewImage as string} />
            </Modal>
        </div>
    );
};

export default UploadImage;
