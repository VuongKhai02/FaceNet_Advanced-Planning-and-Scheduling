import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Layout } from 'antd';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppHeader from '../Header/AppHeader';
import AppSider from '../Sider/AppSider';
import AppContent from '../Content/AppContent';
import AppFooter from '../Footer/AppFooter';


import styles from './DefaultLayout.module.css';
import { BreadcrumbProvider } from '../../contexts/BreadcrumbItems';

const cx = classNames.bind(styles);

export type DefaultLayoutProps = {
    children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout className={cx('container')}>
                <AppSider collapsed={collapsed} />
                <Layout className={cx('wrapper123')}>
                    <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                    <BreadcrumbProvider>
                        <AppContent>{children}</AppContent>
                    </BreadcrumbProvider>
                    <AppFooter />
                </Layout>

            </Layout>

            <ToastContainer />
        </>
    );
};

export default DefaultLayout;