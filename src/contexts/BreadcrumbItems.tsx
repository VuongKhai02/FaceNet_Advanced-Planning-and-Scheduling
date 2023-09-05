import React, { useState, createContext, useContext } from 'react';
import type { BreadcrumbContextType } from '../types';

const BreadcrumbContext = createContext<BreadcrumbContextType>({} as BreadcrumbContextType);

const useBreadcrumb = () => useContext(BreadcrumbContext);

function BreadcrumbProvider(props: React.PropsWithChildren<unknown>) {
    const [breadcrumbData, setBreadcrumbData] = useState({
        items: [{}]
    });

    return (
        <BreadcrumbContext.Provider
            value={{ breadcrumbData, setBreadcrumbData }}
            {...props}
        />
    );
}

export { BreadcrumbProvider, useBreadcrumb }