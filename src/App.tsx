import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { locale } from 'devextreme/localization';
import { useTranslation } from 'react-i18next';

import type { Locale } from 'antd/es/locale';
import enUS from "antd/es/locale/en_US";
import viVN from "antd/es/locale/vi_VN";
import { ConfigProvider } from 'antd';

import Loading from './shared/components/Loading/Loading';

import './App.css'
import { DefaultLayout, Loading as LD } from './components';
import { ROUTES } from './route';
import { NavigationProvider } from './contexts/navigate';
import { useLoading } from './contexts/Loading';
import { useLocalized, getDefaultLanguage } from './contexts/Localization';

function localeLanguage(language: string) {
  locale(language);
  localStorage.setItem("defaultLanguage", language);
}

function App() {

  const { loadingData } = useLoading();
  const { localizedData } = useLocalized();
  const { i18n } = useTranslation();
  const [languageAntd, setLanguageAntd] = useState<Locale>(getDefaultLanguage() === 'vi' ? viVN : enUS);

  useEffect(() => {
    if (localizedData.language) {
      localeLanguage(localizedData.language);
      if (localizedData.language === 'vi') {
        setLanguageAntd(viVN);
        i18n.changeLanguage('vi');
        document.documentElement.lang = 'vi';
      } else {
        setLanguageAntd(enUS);
        i18n.changeLanguage('en');
        document.documentElement.lang = 'en';
      }
    }
  }, [localizedData.language])

  return (
    <>
      {loadingData.loading === "loading" && <Loading />}
      <Router>
        <NavigationProvider>
          <ConfigProvider locale={languageAntd}>
            <DefaultLayout>
              <Suspense fallback={<Loading />}>
                <Routes>
                  {ROUTES.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>

              </Suspense>
            </DefaultLayout>
          </ConfigProvider>
        </NavigationProvider>
      </Router>
    </>
  )
}

export default App;
