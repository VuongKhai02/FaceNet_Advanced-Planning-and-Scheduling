export const JMIX_REST_URL = process.env.REACT_APP_JMIX_REST_URL ?? "/rest/";
export const SERVICE_URL = process.env.REACT_APP_SERVICE_URL ?? "http://192.168.68.91:8080/";
export const REST_CLIENT_ID = process.env.REACT_APP_REST_CLIENT_ID ?? "client";
export const REST_CLIENT_SECRET = process.env.REACT_APP_REST_CLIENT_SECRET ?? "secret";
export const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI ?? "/graphql";

export const DEFAULT_COUNT = 10; // Typical amount of entities to be loaded on browse screens

export const PLANNING_API_URL = process.env.REACT_APP_API_URL

export const MDM_API_URL = process.env.REACT_APP_MDM_API

//Scada config
export const SCADA_URL = process.env.REACT_APP_SCADA_API_URL ?? "http://192.168.68.95:4200"
export const SCADA_USER = "ecyberlinh@gmail.com"
export const SCADA_PWD = "ATTT@123"

//Keycloak config
export const KEYCLOAK_REALM = process.env.REACT_APP_KEYCLOAK_REALM ?? "QLSX"
export const KEYCLOAK_URL = process.env.REACT_APP_KEYCLOAK_URL ?? "http://192.168.68.90:8080/auth/"
export const KEYCLOAK_CLIENT= process.env.REACT_APP_KEYCLOAK_CLIENT ?? "planning_react"








