
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WelcomeComponent from '../Welcome/Welcome';
import './Login.css';

export default function LoginComponent()
{

    // Defining State Element - array containing element name and method to update element
    const [username, setUserName] = useState('testUser');
    const [password, setPassword] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    //useNavigate Hook to Redirect to different component
    const navigate = useNavigate();

    function handleUsernameChange(event)
    {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event)
    {
        setPassword(event.target.value);
    }

    function handleSubmit()
    {
        if (username === 'in28minutes' && password === 'dummy')
        {
            console.log("Success");
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            navigate(`/welcome/${username}`);
        }
        else
        {
            console.log("Failed");
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    }



    return (
        <div className="Login" >

            <Routes>
                <Route path='/welcome/:username' element={<WelcomeComponent />}></Route>
            </Routes>


            {showSuccessMessage && <div className='LoginSuccess' >Login Successful!</div>}
            {showErrorMessage && <div className='LoginFailed'>Login Failed! Please check your credentials.</div>}

            <div className="LoginForm">

                {/* UserName */}
                <div>
                    <label>User Name</label>
                    {/* Tying form Element with state */}
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}></input>
                </div>

                {/* Password */}
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
                </div>

                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>



            </div>

        </div>
    )
}