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
        label: 'Dashboard',
        hidden: false
    },

    {
        key: '1',
        icon: <AppstoreAddOutlined />,
        label: 'Quản lý thông tin',
        hidden: false,
        children: [
            {
                key: '1-1',
                label: 'Quản lý đơn hàng',
                path: '/product-order-manager',
            },
            {
                key: '1-2',
                label: 'Quản lý yêu cầu sản xuất',
                path: '/manage-production-equirements',
            },
            {
                key: '1-3',
                label: 'Quản lý hộp chứa thẻ',
                path: '/manage-card-box',
            },
            {
                key: '1-4',
                label: "Quản lý Job output",
                path: '/manage-job-output',
            }
        ]
    },
    {
        key: '2',
        icon: <AppstoreAddOutlined />,
        label: 'Quản lý BOM',
        children: [
            {
                key: '2.1',
                label: " Quản lý BOM bodycard",
                path: "/BOM-bodycard"
            },
            {
                key: '2.2',
                label: "Quản lý BOM cá thể hóa",
                path: "/BOM-personalized"
            }
        ]
    },
    {
        key: '3',
        icon: <AppstoreAddOutlined />,
        label: 'Quản lý phiếu công nghệ',
        children: [
            {
                key: '3.1',
                label: "Danh sách phiếu công nghệ",
                path: "/tech-form-list"
            },
            {
                key: '3.2',
                label: "Phê duyệt phiếu công nghệ",
                path: "/tech-form-approve"
            }
        ]
    },
    {
        key: '4',
        icon: <AppstoreAddOutlined />,
        label: 'Quản lý kế hoạch sản xuất',
        hidden: false,
        children: [
            {
                key: '4.1',
                label: "Danh sách kế hoạch sản xuất",
                path: "/production-plan-list"
            },
            {
                key: '4.2',
                label: "Khai báo thông tin sản xuất",
                path: "/declare-production-object"
            }
        ]
    },
    {
        key: '5',
        icon: <AppstoreAddOutlined />,
        label: 'Giám sát tiến độ',
        path: '/progress-management',
        hidden: false,
        children: [
            {
                key: '5.1',
                label: "Giám sát tiến độ sản xuất",
                path: "/progress-monitoring-manufacture"
            },
            {
                key: '5.2',
                label: "Giám sát tiến độ đơn hàng",
                path: "/progress-monitoring-order"
            },
            {
                key: '5.3',
                label: "Giám sát máy",
                path: "/machine-monitoring"
            },
            {
                key: '5.4',
                label: "Hàng chờ công đoạn",
                path: "/stage-queue"
            }
        ]

    },
    {
        key: '6',
        icon: <AppstoreAddOutlined />,
        label: 'Khai báo sản lượng',
        path: '/declare-quantity',
        hidden: false,

    },
    {
        key: '7',
        icon: <UserOutlined />,
        label: 'Quản lý tài khoản',
        path: '/user-management',
        hidden: false,

    },
    {
        key: '8',
        icon: <WarningOutlined />,
        label: 'Cảnh báo',
        path: '/warning-management',
        hidden: false,
    },
    {
        key: '9',
        icon: <FormOutlined />,
        label: 'Báo cáo, thống kê',
        path: '/report-management',
        hidden: false,
    }
]
