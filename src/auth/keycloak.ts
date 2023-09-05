import Keycloak from "keycloak-js";

const keycloakConfig = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

const initKeycloak = (onAuthenticatedCallback: () => unknown) => {
    keycloakConfig.init({
        onLoad: 'login-required'
    }).then((authenticated) => {
        if (!authenticated) {
            console.log("user is not authenticated..!");
        } else {

            console.log(`token ${keycloakConfig.token}`)
            const storage = window.localStorage;
            if (keycloakConfig.token)
                storage.setItem("_jmixRestAccessToken", keycloakConfig.token)

            // useMainStore().authToken = _kc.token;
        }
        onAuthenticatedCallback();
    })
        .catch(console.error);
};

async function doLogin() {
    try {
        await keycloakConfig.login();
        const storage = window.localStorage;
        if ((!storage.getItem("_jmixRestAccessToken") && keycloakConfig.token)) {
            storage.removeItem("_jmixRestAccessToken");
            storage.setItem("_jmixRestAccessToken", keycloakConfig.token);
        }
    } catch (error) {
        console.log(error)
    }
}

async function doLogout() {
    try {
        await keycloakConfig.logout();
        const storage = window.localStorage;
        if (storage.getItem("_jmixRestAccessToken")) {
            storage.removeItem("_jmixRestAccessToken")
        }
    } catch (error) {
        console.log(error)
    }
}

const isLoggedIn = () => !!keycloakConfig.token;

const updateToken = (succesCallback: () => unknown) => {
    keycloakConfig.updateToken(5).then(succesCallback).catch(doLogin);
};

const getUsername = () => keycloakConfig.tokenParsed?.preferred_username;
const getAccessToken = () => {
    console.log("get accesssssss", window.localStorage.getItem("_jmixRestAccessToken"));
    return window.localStorage.getItem("_jmixRestAccessToken");
};
const hasRole = (roles: string[]) => roles.some((role) => keycloakConfig.hasRealmRole(role));

export default keycloakConfig;

export {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    updateToken,
    getUsername,
    getAccessToken,
    hasRole
}