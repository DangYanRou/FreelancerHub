import React from 'react';
import { MdEmail, MdLockReset } from "react-icons/md";
import { Link } from "react-router-dom";
import "./styles/ResetPassword.css";
import { useUser } from '../../context/UserContext';

const ResetPassword=()=>{
    return(
        <div className="resetPage">
            <div className="wrapper">
                    <form action="">
                        <MdLockReset className="main_icon"/>
                        <h1 style={{ color:'white'}}>Trouble Logging In?</h1>
                        <p style={{ color:'white'}}>Enter your email and we'll send you a link to get back into your account.</p>
                        <div className="input-box">
                            <MdEmail className="emailIcon"/><input type="text" placeholder="Email" required></input>
                        </div>
                        <button type="submit">Send</button>
                        <div className="register-link">
                            <p style={{marginTop:10, marginLeft:100}}><Link to="/">Back to Login</Link></p>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default ResetPassword;