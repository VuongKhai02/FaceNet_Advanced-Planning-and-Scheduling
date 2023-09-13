
import React, { useEffect, useRef } from 'react';
import "./Notification.css"
import SvgIcon from '../SvgIcon/SvgIcon';

interface NotificationProps {
    isOpen: boolean;
    onClose: () => void;
    onCloseOutSide: boolean;
}
const Notification: React.FC<NotificationProps> = ({ isOpen, onClose, onCloseOutSide }) => {
    const popupNotificationRef = useRef<HTMLDivElement>(null);

    const handleOnCloseOutside = (e: MouseEvent) => {
        if (onCloseOutSide && isOpen && popupNotificationRef.current && !popupNotificationRef.current.contains(e.target as Node)) {
            onClose();
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOnCloseOutside);
        } else {
            document.removeEventListener('mousedown', handleOnCloseOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleOnCloseOutside);
        };
    }, [isOpen, onClose, onCloseOutSide]);

    return (
        <div className={`notification ${isOpen ? 'visible' : 'hidden'}`} ref={popupNotificationRef}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <h3><b>Thông báo mới nhất</b></h3>
                <div style={{ marginTop: 25 }}> <SvgIcon
                    onClick={() => { }}
                    tooltipTitle='Cài đặt thông báo'
                    sizeIcon={20}
                    textSize={17}
                    icon='assets/icons/SettingNoFill.svg'
                    textColor='#FF7A00'
                /></div>
            </div>
        </div>
    );
};

export default Notification;
