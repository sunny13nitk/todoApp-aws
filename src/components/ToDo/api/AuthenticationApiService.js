import { apiClient } from "./ApiClient";

export const executeBasicAuthentication =
    (token) => apiClient.get(`/basicAuth`,
        {
            headers:
            {
                Authorization: token
            }
        })


export const executeJwtAuthentication =
    (username, password) => apiClient.post(`/authenticate`,{username, password})        