import classNames from "classnames/bind";
import { Breadcrumb, Layout, theme } from "antd";

import styles from "./AppContent.module.css";
import { useBreadcrumb } from "../../contexts/BreadcrumbItems";

const cx = classNames.bind(styles);
const { Content } = Layout;

export type AppContentProps = {
    children?: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
    const { token: { colorBgContainer } } = theme.useToken();
    const breadcrumbContext = useBreadcrumb();
    return <>
        <Breadcrumb
            className={cx("app-breadcrumb")}
            separator=">"
            items={breadcrumbContext.breadcrumbData.items}
        />
        <Content
            className={cx("app-content")}
            style={{
                background: colorBgContainer,
            }}
        >
            {children ?? "Content"}
        </Content>
    </>
}

export default AppContent;