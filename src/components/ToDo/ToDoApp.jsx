import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ErrorComponent from "./Error/Error"
import HeaderComponent from "./Generic/Header"
import LoginComponent from "./Login/Login"
import LogoutComponent from "./Logout/Logout"
import ToDoComponent from "./ToDoDetails/ToDoComponent"
import ToDoListComponent from "./ToDoList/ToDoListComponent"
import WelcomeComponent from "./Welcome/Welcome"
import AuthProvider, { useAuth } from "./security/AuthContext"

function AuthenaticatedRoute({ children })
{
    const authContext = useAuth();

    if (authContext.isAuthenticated)
    {
        return children;
    }
    else
    {
        return <Navigate to="/"></Navigate>
    }
}

export default function ToDoApp()
{
    return (
        <div className="TodoApp">


            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login/*' element={<LoginComponent />} />

                        {/*Welcome Component  */}
                        <Route path='/welcome/:username' element={
                            <AuthenaticatedRoute>
                                <WelcomeComponent />
                            </AuthenaticatedRoute>}
                        />

                        {/*TO Dos Component  */}
                        < Route path='/todos' element={
                            <AuthenaticatedRoute>
                                <ToDoListComponent />
                            </AuthenaticatedRoute>} />


                        {/*TO Dos Component  */}
                        < Route path='/todo/:id' element={
                            <AuthenaticatedRoute>
                                <ToDoComponent />
                            </AuthenaticatedRoute>} />

                        {/*Logout Component  */}
                        <Route path='/logout' element={
                            <AuthenaticatedRoute>
                                <LogoutComponent />
                            </AuthenaticatedRoute>} />

                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                    {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}



