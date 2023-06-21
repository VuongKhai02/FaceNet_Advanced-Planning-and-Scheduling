import React from "react";
import ReactDOM from "react-dom";
import App from "./app/app";
import {ComponentPreviews} from "./dev/previews";
import {useDevLogin} from "./dev/hooks";
import {DevSupport} from "@haulmont/react-ide-toolbox";

import {initializeApolloClient, JmixAppProvider, Screens, ScreensContext} from "@haulmont/jmix-react-core";
import {I18nProvider, Modals} from "@haulmont/jmix-react-ui";
import {initializeApp} from "@haulmont/jmix-rest";
import {GRAPHQL_URI, JMIX_REST_URL, REST_CLIENT_ID, REST_CLIENT_SECRET} from "./config";
import "mobx-react-lite/batchingForReactDom";
import metadata from "./jmix/metadata.json";
import "antd/dist/antd.min.css";
import "@haulmont/jmix-react-ui/dist/index.min.css";
import "./index.css";
import {antdLocaleMapping, messagesMapping} from "./i18n/i18nMappings";
import {ApolloProvider} from "@apollo/client";

// Define types of plugins used by dayjs
import "dayjs/plugin/customParseFormat";
import "dayjs/plugin/advancedFormat";
import "dayjs/plugin/weekday";
import "dayjs/plugin/localeData";
import "dayjs/plugin/weekOfYear";
import "dayjs/plugin/weekYear";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import UserService from "./Keycloak"
// import {Redirect} from "react-router-dom";

export const jmixREST = initializeApp({
  name: "",
  apiUrl: JMIX_REST_URL,
  restClientId: REST_CLIENT_ID,
  restClientSecret: REST_CLIENT_SECRET,
  storage: window.localStorage,
  defaultLocale: "en"
});

const client = initializeApolloClient({
  graphqlEndpoint: GRAPHQL_URI,
  tokenStorageKey: "_jmixRestAccessToken",
  localeStorageKey: "_jmixLocale"
});

const devScreens = new Screens();

const reactRenderApp = () => ReactDOM.render(
  <JmixAppProvider
    apolloClient={client}
    jmixREST={jmixREST}
    config={{
      appName: "",
      clientId: REST_CLIENT_ID, // TODO Rename once we remove REST
      secret: REST_CLIENT_SECRET,
      locale: "en"
    }}
    metadata={metadata}
    Modals={Modals}
  >
    <ApolloProvider client={client}>
      <I18nProvider
        messagesMapping={messagesMapping}
        antdLocaleMapping={antdLocaleMapping}
      >
        <DevSupport
          ComponentPreviews={
            <ScreensContext.Provider value={devScreens}>
              <ComponentPreviews/>
            </ScreensContext.Provider>
          }
          useInitialHook={useDevLogin}
        >
          <App/>
        </DevSupport>
        <ToastContainer/>
      </I18nProvider>
    </ApolloProvider>
  </JmixAppProvider>,
  document.getElementById("root") as HTMLElement
);
UserService.initKeycloak(reactRenderApp)
// registerServiceWorker();
window.onerror = function (message, source, lineno, colno, error) {
  console.log("window.onerror")
  console.log(error)
}