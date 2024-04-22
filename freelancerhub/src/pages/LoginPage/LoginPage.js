import React, { useState } from 'react';
import { useHistory } from 'react-router-use-history'
import "./LoginPage.css"
import { FaUser,FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    const handleFreelancerClick = () => {
        setIsLoggedIn(true);
        history.push('/freelancers');
    };

    const handleClientsClick = () => {
        setIsLoggedIn(true);
        history.push('/clients');
    };

    const onSubmit= () =>{
        const username = document.querySelector(".username").value;
        const pass = document.querySelector(".pass").value;
        if ((username=="freelancer") && (pass=="elonmusk")){
            handleFreelancerClick();
        }
        else if ((username=="client")&& (pass=="agnes")){
            handleClientsClick();
        }
    }

    // Render login page only if user is not logged in
    if (!isLoggedIn) {
        return (
            <div className="loginPage">
                <div className="wrapper">
                    <form onSubmit={onSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <FaUser className="icon"/><input className="username" type="text" placeholder="Username" required></input>
                        </div>
                        <div className="input-box">
                            <FaLock className="icon"/><input className="pass" type="password" placeholder="Password" required></input>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox"></input>Remember Me</label>
                            <Link to="/resetPassword" >Forgot password?</Link>
                        </div>

                        <button type="submit">Login</button>

                        <div className="register-link">
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return ;
    }
};

export default LoginPage;