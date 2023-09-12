import {
    AppstoreAddOutlined,
    WarningOutlined,
    FormOutlined,
    DashboardOutlined,
    UserOutlined,
} from "@ant-design/icons";

export type AppMenuItemType = {
    key: string;
    icon?: React.ReactNode;
    label: string;
    children?: AppMenuItemType[];
    hidden?: boolean;
    path?: string;
}

export const MENU_ITEMS: AppMenuItemType[] = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'sider.home',
        hidden: false
    },

    {
        key: '1',
        icon: <AppstoreAddOutlined />,
        label: 'sider.information',
        hidden: false,
        children: [
            {
                key: '1-1',
                label: 'sider.information-list.order',
                path: '/product-order-manager',
            },
            {
                key: '1-2',
                label: 'sider.information-list.manufacturer',
                path: '/manage-production-equirements',
            },
            {
                key: '1-3',
                label: 'sider.information-list.box-card',
                path: '/manage-card-box',
            },
            {
                key: '1-4',
                label: "sider.information-list.job-output",
                path: '/manage-job-output',
            }
        ]
    },
    {
        key: '2',
        icon: <AppstoreAddOutlined />,
        label: 'sider.bom',
        children: [
            {
                key: '2.1',
                label: "sider.bom-list.bom-bodycard",
                path: "/BOM-bodycard"
            },
            {
                key: '2.2',
                label: "sider.bom-list.bom-personalized",
                path: "/BOM-personalized"
            }
        ]
    },
    {
        key: '3',
        icon: <AppstoreAddOutlined />,
        label: 'sider.techform',
        children: [
            {
                key: '3.1',
                label: "sider.techform-list.techform-list",
                path: "/tech-form-list"
            },
            {
                key: '3.2',
                label: "sider.techform-list.techform-approve",
                path: "/tech-form-approve"
            }
        ]
    },
    {
        key: '4',
        icon: <AppstoreAddOutlined />,
        label: 'sider.manufacture-plan',
        hidden: false,
        children: [
            {
                key: '4.1',
                label: "sider.manufacture-plan-list.manufacture-plan",
                path: "/production-plan-list"
            },
            {
                key: '4.2',
                label: "sider.manufacture-plan-list.manufacture-plan-declare",
                path: "/declare-production-object"
            }
        ]
    },
    {
        key: '5',
        icon: <AppstoreAddOutlined />,
        label: 'sider.progress-monitoring',
        path: '/progress-management',
        hidden: false,
        children: [
            {
                key: '5.1',
                label: "sider.progress-monitoring-list.manufacture-progress-monitoring",
                path: "/progress-monitoring-manufacture"
            },
            {
                key: '5.2',
                label: "sider.progress-monitoring-list.order-progress-monitoring",
                path: "/progress-monitoring-order"
            },
            {
                key: '5.3',
                label: "sider.progress-monitoring-list.machine-monitoring",
                path: "/machine-monitoring"
            },
            {
                key: '5.4',
                label: "sider.progress-monitoring-list.stage-queue",
                path: "/stage-queue"
            }
        ]

    },
    {
        key: '6',
        icon: <AppstoreAddOutlined />,
        label: 'sider.declare-production-quantity',
        path: '/declare-quantity',
        hidden: false,

    },
    {
        key: '7',
        icon: <UserOutlined />,
        label: 'sider.account',
        path: '/user-management',
        hidden: false,

    },
    {
        key: '8',
        icon: <WarningOutlined />,
        label: 'sider.warning',
        path: '/warning-management',
        hidden: false,
    },
    {
        key: '9',
        icon: <FormOutlined />,
        label: 'sider.report-statistics',
        path: '/report-management',
        hidden: false,
    }
]
