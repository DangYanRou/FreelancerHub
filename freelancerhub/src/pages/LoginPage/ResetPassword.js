import React from 'react';
import { MdEmail, MdLockReset } from "react-icons/md";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword=()=>{
    return(
        <div className="resetPage">
            <div className="wrapper">
                    <form action="">
                        <MdLockReset className="main_icon" style={{ color:'white'}}/>
                        <h1 style={{ color:'white'}}>Trouble Logging In?</h1>
                        <p style={{ color:'white'}}>Enter your email and we'll send you a link to get back into your account.</p>
                        <div className="input-box">
                            <MdEmail className="icon" style={{ color:'white'}}/><input type="text" placeholder="Email" required></input>
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