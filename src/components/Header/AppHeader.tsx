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
import styles from "./AppHeader.module.css";
import { AuthService } from "../../auth";
import { useState } from "react";
import ConfirmLogout from "../../shared/components/ConfirmLogout/ConfirmLogout";

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
        imageUrl: "assets/images/VietNamFlag.png",
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
                    <span className={cx("user-hello")}>Xin chào</span>
                    <span className={cx("user-username")}>{AuthService.getUsername()}</span>
                </div>
            </div>
            <div className={cx("center")}>
                <Select
                    placeholder={"Choose language"}
                    className={cx("language-select")}
                    defaultValue={itemsLanguage[0].value}
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
                <Badge count={5} className={cx("badge")}>
                    <Button className={cx("button-none")} icon={<BellFilled className={cx("bell")} />} />
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