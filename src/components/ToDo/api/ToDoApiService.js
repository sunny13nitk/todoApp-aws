import { apiClient } from "./ApiClient";


export const retrieveAllTodosforUserNameApi =
    (username) => apiClient.get(`/users/${username}/todos`)

export const deleteTodoforUserNameByIdApi =
    (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)


export const retrieveAllTodosforUserNameSimpleApi =
    (username) => apiClient.get(`/users/${username}/simpletodos`)

export const retrieveTodoforUserNameByIdApi =
    (username, id) => apiClient.get(`/users/${username}/todos/${id}`)


export const updateTodoforUserNameByIdApi =
    (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const createTodoforUserNameApi =
    (username, todo) => apiClient.post(`/users/${username}/todos`, todo)      