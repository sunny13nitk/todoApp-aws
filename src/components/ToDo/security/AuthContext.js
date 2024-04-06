import { createContext, useContext, useState } from "react";
import { executeBasicAuthentication } from "../api/HelloWorldApiService";
import { HttpStatusCode } from "axios";
import { apiClient } from "../api/ApiClient";


//Create a Context
export const AuthContext = createContext();

//Exporting AuthContext Created as a Hook to directly use
export const useAuth = () => useContext(AuthContext);





//Share the created Context with other components
export default function AuthProvider({ children })
{
    //Put some state in context

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [currUser, setCurrUser] = useState(null);
    const [token, setToken] = useState(null);

    async function login(username, password)
    {

        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try
        {
            const response = await executeBasicAuthentication(baToken)
            if (response.status === HttpStatusCode.Ok)
            {
                setAuthenticated(true);
                setCurrUser(username);
                setToken(baToken);

                apiClient.interceptors.request.use(
                    (config) =>
                    {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )

                return true;
            }
            else
            {

                logout();
                return false;
            }
        } catch (error)
        {
            logout();
            console.log('Error: ' + error)
            return false;
        }



    }


    function logout()
    {
        setCurrUser(null);
        setAuthenticated(false);
        setToken(null);
    }

    // setInterval(() => setNumber(number + 1), 10000); 

    return (
        <AuthContext.Provider value={{ isAuthenticated, currUser, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}