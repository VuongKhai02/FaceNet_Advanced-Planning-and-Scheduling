import { memo } from "react";
import { withTranslation } from 'react-i18next'
import classNames from "classnames/bind";
import { Breadcrumb, Layout, theme } from "antd";

import styles from "./AppContent.module.css";
import { useBreadcrumb } from "../../contexts/BreadcrumbItems";

const cx = classNames.bind(styles);
const { Content } = Layout;

export type AppContentProps = {
    children?: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = memo(({ children }) => {
    const { token: { colorBgContainer } } = theme.useToken();
    const breadcrumbContext = useBreadcrumb();
    return <>
        <Breadcrumb
            className={cx("app-breadcrumb")}
            separator=">"
            items={breadcrumbContext.breadcrumbData.items.map((item) => ({
                ...item,
                title: item.title && <I18nBreadcrumb>{item.title}</I18nBreadcrumb>,
            }))}
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
});

export default AppContent;

const I18nBreadcrumb = withTranslation(["common"])(({ t, children }) => {
    return <span>{t(children)}</span>
});