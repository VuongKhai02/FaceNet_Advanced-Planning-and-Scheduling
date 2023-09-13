import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellFilled,
    FullscreenOutlined,
    FullscreenExitOutlined,
    LogoutOutlined,
    WarningOutlined
} from "@ant-design/icons";
import { Badge, Button, Layout, Select } from "antd";
import ConfirmLogout from "../../shared/components/ConfirmLogout/ConfirmLogout";
import styles from "./AppHeader.module.css";
import { AuthService } from "../../auth";
import { useLocalized } from "../../contexts/Localization";
import Notification from "../../shared/components/Notification/Notification";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);


const { Header } = Layout;
const { Option } = Select;

export type AppHeaderProps = {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
};

const itemsLanguage = [
    {
        value: "vi",
        label: "Tiếng Việt",
        imageUrl: "assets/images/VietNam_Flag1.png",
        imageAlt: "Tiếng Việt"
    },
    {
        value: "en",
        label: "English",
        imageUrl: "assets/images/GreatBritainFlag.png",
        imageAlt: "English"
    }
]

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed = false, setCollapsed = () => { } }) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [isVisibleNotification, setIsVisibleNotification] = useState<boolean>(false);
    const { localizedData, setLocalizedData } = useLocalized();
    const { t } = useTranslation(["common"]);
    function handleChangeLanguage(value: string) {
        if (setLocalizedData) {
            setLocalizedData({ language: value });
        }
    }

    const [notificationCount, setNotificationCount] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setNotificationCount(notificationCount + 1);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [notificationCount]);

    useEffect(() => {
        if (notificationCount > 0) {
            const badgeElement = document.querySelector(cx('.ant-badge'));
            badgeElement?.classList.add(cx('shake'));
            setTimeout(() => {
                badgeElement?.classList.remove(cx('shake'));
            }, 1000);
        }
    }, [notificationCount]);

    function logout() {
        AuthService.doLogout();
    }

    const handleToggleFullScreen = () => {
        if (!isFullScreen) {
            enterFullScreen();
        } else {
            exitFullScreen();
        }
    };

    const enterFullScreen = () => {
        setIsFullScreen(true);
        document.documentElement.requestFullscreen();
    };
    const exitFullScreen = () => {
        setIsFullScreen(false);
        document.exitFullscreen();
    };

    return (<Header className={cx("header-container")} style={{ padding: 0 }}>
        <Notification isOpen={isVisibleNotification} onClose={() => setIsVisibleNotification(!isVisibleNotification)} onCloseOutSide={true} />
        <ConfirmLogout
            isVisible={isLogout}
            onCancel={() => setIsLogout(false)}
            onSubmit={() => logout()}
            modalTitle={
                <div>
                    <h3
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#ff794e",
                            fontWeight: 500,
                        }}>
                        Xác nhận đăng xuất
                    </h3>
                </div>
            }
            modalContent={
                <div>
                    <div
                        style={{
                            backgroundColor: "#ffe0c2",
                            borderLeft: "4px solid #ff794e",
                            height: 100,
                            borderRadius: 5,
                        }}>
                        <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                            <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                            Lưu ý:
                        </h3>
                        <p style={{ marginLeft: 20, fontSize: 18, fontWeight: 400 }}>
                            <p>Bạn có chắc chắn muốn đăng xuất ra khỏi tài khoản hiện tại?</p>
                        </p>
                    </div>
                </div>
            }
            width={600}
        />
        <div className={cx("menu-left")}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={cx("button-none", "font-size-16")}
            />
            <h2 className={cx("application", "none-select")}>Advanced Planning and Scheduling</h2>
        </div>
        <div className={cx("menu-right")}>
            <div className={cx("user")}>
                <img className={cx("user-avatar")} src={"assets/images/GirlImage.jpg"} alt="user" />
                <div className={cx("user-container")}>
                    <span className={cx("user-hello")}>{t("common.hello")}</span>
                    <span className={cx("user-username")}>{AuthService.getUsername()}</span>
                </div>
            </div>
            <div className={cx("center")}>
                <Select
                    placeholder={"Choose language"}
                    className={cx("language-select")}
                    defaultValue={localizedData.language}
                    onChange={handleChangeLanguage}
                >{itemsLanguage.map((item, index) => {
                    return <Option key={index} value={item.value}>
                        <div className={cx("language-container")}>
                            <img className={cx("language-image")} src={item.imageUrl} alt={item.imageAlt} />
                            <span className={cx("language-text")}>{item.label}</span>
                        </div>
                    </Option>
                })}
                </Select>
            </div>
            <div>
                <Button className={cx("button-none")} icon={!isFullScreen ? <FullscreenOutlined onClick={handleToggleFullScreen} /> : <FullscreenExitOutlined onClick={handleToggleFullScreen} />} />
            </div>
            <div>
                <Badge count={notificationCount} className={cx("badge", 'shake')} >
                    <Button onClick={() => setIsVisibleNotification(!isVisibleNotification)} className={cx("button-none")} icon={<BellFilled className={cx("bell")} />} />
                </Badge>
            </div>
            <div>
                <Button
                    className={cx(["button-none", "mg-rignt-16", "mg-left-8"])}
                    onClick={() => setIsLogout(true)}
                    icon={<LogoutOutlined />}
                />
            </div>
        </div>
    </Header>)
}

export default AppHeader;