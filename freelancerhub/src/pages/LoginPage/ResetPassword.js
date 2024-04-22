import React from 'react';
import { MdEmail, MdLockReset } from "react-icons/md";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword=()=>{
    return(
        <div className="resetPage">
            <div className="wrapper">
                    <form action="">
                        <MdLockReset className="main_icon"/>
                        <h1>Trouble Logging In?</h1>
                        <p>Enter your email and we'll send you a link to get back into your account.</p>
                        <div className="input-box">
                            <MdEmail className="icon"/><input type="text" placeholder="Email" required></input>
                        </div>
                        <button type="submit">Send</button>
                        <div className="register-link">
                            <p><Link to="/Login">Back to Login</Link></p>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default ResetPassword;