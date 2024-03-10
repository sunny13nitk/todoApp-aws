import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginComponent from "./Login/Login"
import WelcomeComponent from "./Welcome/Welcome"
import ErrorComponent from "./Error/Error"
import ToDoListComponent from "./ToDoList/ToDoListComponent"
import HeaderComponent from "./Generic/Header"
import FooterComponent from "./Generic/Footer"
import LogoutComponent from "./Logout/Logout"

export default function ToDoApp()
{
    return (
        <div className="TodoApp">

            <HeaderComponent />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/welcome/:username' element={<WelcomeComponent />} />
                    <Route path='/todos' element={<ToDoListComponent />} />
                    <Route path='/logout' element={<LogoutComponent />} />

                    <Route path='*' element={<ErrorComponent />} />
                </Routes>
            </BrowserRouter>
            <FooterComponent />


        </div>
    )
}



