import { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";

interface NavigationData {
    currentPath: string;
}

export type NavigationContextType = {
    setNavigationData?: ({ currentPath }: NavigationData) => void;
    navigationData: NavigationData;
}

interface BreadcrumbItemData {
    items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
}

export type BreadcrumbContextType = {
    setBreadcrumbData?: ({ items }: BreadcrumbItemData) => void;
    breadcrumbData: BreadcrumbItemData;
}

interface LoadingData {
    loading: "idle" | "loading" | "failed";
}

export type LoadingContextType = {
    setLoadingData?: ({ loading }: LoadingData) => void;
    loadingData: LoadingData;
}

export type ResponseType<T> = {
    data: T;
    responseCode: string;
    message: string;
    ok: boolean;
}

export type PaginationResponse<T> = {
    totalItems: number;
    currentPage: number;
    data: T[];
}

export type EntityState<T> = {
    status: "idle" | "loading" | "failed";
    entities: T[];
    entity: T;
    totalItems: number;
    currentPage: number;
}