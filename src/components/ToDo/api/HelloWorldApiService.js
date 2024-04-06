import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')

export const retrieveHelloWorldPathVariable =
    (username, token) => apiClient.get(`/hello-world/path-variable/${username}`,
        {
            headers:
            {
                Authorization: token
            }
        })

export const executeBasicAuthentication =
    (token) => apiClient.get(`/basicAuth`,
        {
            headers:
            {
                Authorization: token
            }
        })


