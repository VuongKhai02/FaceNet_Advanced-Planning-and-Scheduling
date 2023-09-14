import axios from "axios";

import { AuthService } from "../auth";

const httpRequests = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:6080",
    headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
        "Content-Type": 'application/json'
    },
})
httpRequests.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            AuthService.doLogin();
        }
        return Promise.reject(error);
    }
)


export default httpRequests;