
import React, { useEffect, useRef } from 'react';
import "./Notification.css"
import SvgIcon from '../SvgIcon/SvgIcon';
import { useTranslation } from 'react-i18next';

interface NotificationProps {
    isOpen: boolean;
    onClose: () => void;
    onCloseOutSide: boolean;
}

const dataNotification = [
    {
        id: 1,
        label: "Cập nhật",
        description: "QLCL đã phê duyệt PCN với mã sản xuất ABC nhé anh",
        time: "1 giờ trước",
        date: "Hôm nay"
    },
    {
        id: 2,
        label: "Cập nhật",
        description: "QLCL đã phê duyệt PCN với mã sản xuất XYZ nhé anh",
        time: "16 giờ trước",
        date: "Hôm qua"
    },
    {
        id: 3,
        label: "Cập nhật",
        description: "QLCL đã phê duyệt PCN với mã sản xuất MNS nhé anh",
        time: "2 ngày trước",
        date: "Hôm kia"
    },
    {
        id: 4,
        label: "Cập nhật",
        description: "Leader đã phê duyệt PCN với mã sản xuất RBB nhé anh",
        time: "30 phút trước",
        date: "Hôm nay"
    }
];

const Notification: React.FC<NotificationProps> = ({ isOpen, onClose, onCloseOutSide }) => {
    const { t } = useTranslation(["common"]);
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
        <div className={`notification ${isOpen ? 'visible' : 'hidden'}`} ref={popupNotificationRef} >
            <div className='header-notification'>
                <p style={{ fontSize: 23 }}>{t("common.notification")}</p>
                <div>
                    <SvgIcon
                        onClick={() => { }}
                        tooltipTitle={t("common.notification-setting")}
                        sizeIcon={20}
                        textSize={17}
                        icon='assets/icons/SettingNoFill.svg'
                        textColor='#FF7A00'
                    /></div>
            </div>
            {dataNotification.map((item, index: number) => {
                return <>
                    <div className='layout-notification' key={index}>
                        <div className='layout-container'>
                            <div className='update'>
                                <div className='title-container'>
                                    <div className='icon-title'></div>
                                    <div className='title'>{item.label}</div>
                                </div>
                                <div className='discription'>{item.description}</div>
                            </div>
                            <div className='date-time'>
                                <div className='time'>{item.time}</div>
                                <div className='date'>{item.date}</div>
                            </div>
                        </div>
                    </div>

                    <div className='footer-notification'>
                        <p className='footer-notification-label'>{t("common.see-more")}</p>
                        <SvgIcon
                            onClick={() => { }}
                            tooltipTitle={t("common.see-more")}
                            sizeIcon={17}
                            textSize={17}
                            icon='assets/icons/ArrowDownRightSquare.svg'
                            textColor='#FF7A00'
                        />
                    </div>
                </>

            })}
        </div >

    );
};

export default Notification;
