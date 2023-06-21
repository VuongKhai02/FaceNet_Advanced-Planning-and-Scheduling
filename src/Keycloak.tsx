import Keycloak from "keycloak-js";
import {KEYCLOAK_CLIENT, KEYCLOAK_REALM, KEYCLOAK_URL} from "./config";
const _kc = new Keycloak({
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT
});
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'login-required'
  }).then((authenticated) => {
    if (!authenticated) {
      console.log("user is not authenticated..!");
    } else {

      console.log(`token${_kc.token}`)
      let storage = window.localStorage;
      if (_kc.token)
        storage.setItem("_jmixRestAccessToken", _kc.token)

      // useMainStore().authToken = _kc.token;
    }
    onAuthenticatedCallback();
  })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const hasMenuRole = (screenId) => { }
const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;
