import { createContext, useContext, useState } from 'react';
import { LocalizedContextType } from '../types';

const LocalizedContext = createContext<LocalizedContextType>({} as LocalizedContextType);

function getDefaultLanguage(): string {
    const defaultLanguage = localStorage.getItem("defaultLanguage");
    if (defaultLanguage) {
        return defaultLanguage;
    }
    if (navigator.language.includes("vi")) {
        return "vi";
    }
    return "en";
}

const useLocalized = () => useContext(LocalizedContext);

function LocalizedProvider(props: React.PropsWithChildren<unknown>) {
    const [localizedData, setLocalizedData] = useState({ language: getDefaultLanguage() });

    return (
        <LocalizedContext.Provider
            value={{ localizedData, setLocalizedData }}
            {...props}
        />
    );
}

export { useLocalized, LocalizedProvider, getDefaultLanguage };