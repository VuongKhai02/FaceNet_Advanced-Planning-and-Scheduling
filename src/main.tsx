import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { loadMessages } from 'devextreme/localization';
import viMessages from "devextreme/localization/messages/vi.json";
import enMessages from "devextreme/localization/messages/en.json";

import customVn from './locale/vi.json';
import customEn from './locale/en.json';

import App from './App.tsx'
import './index.css'
import store from './store'
import { AuthService } from './auth/index.ts'
import { LoadingProvider } from './contexts/Loading.tsx';
import { LocalizedProvider, getDefaultLanguage } from './contexts/Localization.tsx';


i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: getDefaultLanguage(),                              // language to use
  resources: {
    en: {
      common: customEn
    },
    vi: {
      common: customVn,
    }
  },
});

const rendenReactApp = () => {
  loadMessages(viMessages);
  loadMessages(enMessages);
  loadMessages({
    "vi": customVn,
    "en": customEn
  })
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <LocalizedProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </LocalizedProvider>
      </Provider>
    </React.StrictMode>,
  )
}

AuthService.initKeycloak(rendenReactApp)

