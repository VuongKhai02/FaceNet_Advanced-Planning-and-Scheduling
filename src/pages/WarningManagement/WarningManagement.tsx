import { useEffect } from "react";
import { useBreadcrumb } from "../../contexts/BreadcrumbItems";

const WarningManagement: React.FC = () => {
    const { setBreadcrumbData } = useBreadcrumb();

    useEffect(() => {
        if (setBreadcrumbData) {
            setBreadcrumbData({
                items: [
                    {
                        key: "home",
                        title: "Home",
                    },
                    {
                        key: "warning-management",
                        title: "Warning Management",
                    }
                ]
            })
        }
    }, []);
    return <div>Warning Management</div>
}

export default WarningManagement;