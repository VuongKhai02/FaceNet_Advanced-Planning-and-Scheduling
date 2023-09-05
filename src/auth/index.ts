import {
    doLogin,
    doLogout,
    initKeycloak,
    isLoggedIn,
    updateToken,
    getUsername,
    getAccessToken,
    hasRole
} from './keycloak';

export { default as keycloak } from './keycloak';
export const AuthService = { doLogin, doLogout, initKeycloak, isLoggedIn, updateToken, getUsername, hasRole, getAccessToken };