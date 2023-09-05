import classNames from "classnames/bind";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellFilled,
    FullscreenOutlined,
    FullscreenExitOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { Badge, Button, Layout, Select } from "antd";

import styles from "./AppHeader.module.css";

import { AuthService } from "../../auth";
import { useState } from "react";

const cx = classNames.bind(styles);


const { Header } = Layout;
const { Option } = Select;

export type AppHeaderProps = {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
};

const itemsLanguage = [
    {
        value: "en",
        label: "English",
        imageUrl: "src/assets/GreatBritainFlag.png",
        imageAlt: "English"
    },
    {
        value: "vi",
        label: "Tiếng Việt",
        imageUrl: "src/assets/VietNamFlag.png",
        imageAlt: "Tiếng Việt"
    }
]

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed = false, setCollapsed = () => { } }) => {
    const [fullScreen] = useState(false);

    function logout() {
        AuthService.doLogout();
    }

    return (<Header className={cx("header-container")} style={{ padding: 0 }}>
        <div className={cx("menu-left")}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={cx("button-none", "font-size-16")}
            />
            <p className={cx("application", "none-select")}>Advanced Planning and Scheduling</p>
        </div>
        <div className={cx("menu-right")}>
            <div className={cx("user")}>
                <img className={cx("user-avatar")} src={"src/assets/thuy_nga.jpg"} alt="user" />
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
                <Button className={cx("button-none")} icon={!fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />} />
            </div>
            <div>
                <Badge count={5} className={cx("badge")}>
                    <Button className={cx("button-none")} icon={<BellFilled className={cx("bell")} />} />
                </Badge>
            </div>
            <div>
                <Button
                    className={cx(["button-none", "mg-rignt-16", "mg-left-8"])}
                    onClick={() => logout()}
                    icon={<LogoutOutlined />} />
            </div>
        </div>
    </Header>)
}

export default AppHeader;