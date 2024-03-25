
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import './Login.css';

export default function LoginComponent()
{

    // Defining State Element - array containing element name and method to update element
    const [username, setUserName] = useState('testUser');
    const [password, setPassword] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    //Hook to AuthContext
    const authContext = useAuth();

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
        if (authContext.login(username, password))
        {
            navigate(`/welcome/${username}`);
        }
        else
        {
            setShowErrorMessage(true);
        }
    }



    return (
        <div className="Login" >



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