import { createContext, useContext, useState } from "react";

//Create a Context
export const AuthContext = createContext();

//Exporting AuthContext Created as a Hook to directly use
export const useAuth = () => useContext(AuthContext);





//Share the created Context with other components
export default function AuthProvider({ children })
{
    //Put some state in context

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [currUser, setCurrUser] = useState('');

    function login(username, password)
    {
        if (username === 'sunny' && password === 'dummy')
        {
            setAuthenticated(true);
            setCurrUser(username);
            return true;
        }
        else
        {
            setAuthenticated(false);
            setCurrUser('');
            return false;
        }
    }

    function logout()
    {
        setCurrUser('');
        setAuthenticated(false);
    }

    // setInterval(() => setNumber(number + 1), 10000);

    return (
        <AuthContext.Provider value={{ isAuthenticated, currUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}