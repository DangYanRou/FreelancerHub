import React, { useState } from 'react';
import { useHistory } from 'react-router-use-history';
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from '../../UserContext';
import { useNotification } from '../NotificationContext';

const LoginPage = () => {
    const { updateUser } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();
    const { setPathname } = useNotification();
    updateUser("null");
    setPathname('null');

    const handleFreelancerClick = () => {
        setIsLoggedIn(true);
        setPathname('/freelancers/notifications');
        history.push('/freelancers/explore');
    };

    const handleClientsClick = () => {
        setIsLoggedIn(true);
        setPathname('/clients/notifications');
        history.push('/clients/post-project');
    };

    const onSubmit = (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        const username = document.querySelector(".username").value;
        const pass = document.querySelector(".pass").value;
        if (username === "freelancer" && pass === "elonmusk") {
            updateUser("freelancerID1");
            handleFreelancerClick();
        } else if (username === "client" && pass === "agnes") {
            updateUser("clientID1");
            handleClientsClick();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="loginPage">
                <div className="wrapper">
                    <form onSubmit={onSubmit}>
                        <h1 style={{ color: 'white' }}>Login</h1>
                        <div className="input-box">
                            <FaUser className="icon" /><input className="username" type="text" placeholder="Username" required />
                        </div>
                        <div className="input-box" style={{ color: 'white' }}>
                            <FaLock className="icon" /><input className="pass" type="password" placeholder="Password" required />
                        </div>
                        <div className="remember-forgot">
                            <label style={{ color: 'white' }}><input type="checkbox" />Remember Me</label>
                            <Link to="/resetPassword">Forgot password?</Link>
                        </div>
                        <button className='login-button' type="submit">Login</button>
                        <div className="register-link">
                            <p style={{ color: 'white' }}>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default LoginPage;