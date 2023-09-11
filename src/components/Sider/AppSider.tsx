import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "./AppSider.module.css";
import { AppMenuItemType } from "../../route";
import { MENU_ROUTES } from "../../route";

const cx = classNames.bind(styles);
const { Sider } = Layout;

export type AppSiderProps = {
    collapsed: boolean;
}


const items: AppMenuItemType[] = MENU_ROUTES

const AppSider: React.FC<AppSiderProps> = ({ collapsed = false }) => {
    const navigate = useNavigate();

    function navigateTo(path?: string) {
        navigate(path || "/");
    }
    return <Sider
        width={320}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={cx("app-sider")}
        style={{
            background: "#E5E5E5"
        }}
    >
        <div className={cx("logo")}>
            <img className={cx("logo-image")} src="assets/icons/facenet-logo.svg" alt="logo" />
            {!collapsed && <img className={cx("logo-text")} src="assets/icons/facenet.svg" alt="facenet" />}
        </div>
        <div className={cx("sider-wrapper")}>
            <Menu
                className={cx("menu")}
                mode="inline"
                items={items.filter(item => !item.hidden).map(item => {
                    return {
                        key: item.key,
                        title: item.label,
                        icon: item.icon,
                        label: item.label,
                        children: item.children?.filter(child => !child.hidden).map(child => {
                            return {
                                key: child.key,
                                title: child.label,
                                icon: child.icon,
                                label: child.label,
                                onClick: () => navigateTo(child.path)
                            }
                        }),
                        onClick: item.children ? undefined : () => navigateTo(item.path)
                    }
                })}
            >
            </Menu>
        </div>
    </Sider>
}

export default AppSider;