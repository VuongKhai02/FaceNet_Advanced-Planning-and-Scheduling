import { useEffect } from "react";
import { useBreadcrumb } from "../../contexts/BreadcrumbItems";

const InformationManagement: React.FC = () => {
    const breadCrumbContext = useBreadcrumb();

    useEffect(() => {
        if (breadCrumbContext && breadCrumbContext.setBreadcrumbData) {
            breadCrumbContext.setBreadcrumbData({
                items: [
                    {
                        key: "1",
                        title: "Home",
                    },
                    {
                        key: "2",
                        title: "Information Management",
                    }
                ]
            });
        }
    }, []);
    return (
        <div>
            <h1>InformationManagement</h1>
            <button onClick={() => {
                console.log("Click me", import.meta.env);
            }}>Click me</button>
        </div>
    );
}

export default InformationManagement;