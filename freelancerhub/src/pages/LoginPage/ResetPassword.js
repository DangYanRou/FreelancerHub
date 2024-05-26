import React from 'react';
import { MdEmail, MdLockReset } from "react-icons/md";
import { Link } from "react-router-dom";
import "./ResetPassword.css";
import { Link, useNavigate } from "react-router-dom";
import "./styles/ResetPassword.css";
import { useUser } from '../../context/UserContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const ResetPassword=()=>{
    const history= useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const emailVal=e.target.elements.email.value;
        try {
            await sendPasswordResetEmail(auth, emailVal);
            alert("Check your email for a password reset link");
            history("/");
        } catch (error) {
            alert('Error sending password reset email:', error);
            console.error(`Error: ${error.message} (${error.code})`);
        }
    }

    return(
        <div className="resetPage">
            <div className="wrapper">
                    <form action="">
                        <MdLockReset className="main_icon" style={{ color:'white'}}/>
                        <h1 style={{ color:'white'}}>Trouble Logging In?</h1>
                        <p style={{ color:'white'}}>Enter your email and we'll send you a link to get back into your account.</p>
                        <div className="input-box">
                            <MdEmail className="emailIcon" style={{ color:'white'}}/><input type="text" placeholder="Email" required></input>
                    <form onSubmit={handleSubmit} >
                        <MdLockReset className="main_icon"/>
                        <h1 style={{ color:'white'}}>Trouble Logging In?</h1>
                        <p style={{ color:'white'}}>Enter your email and we'll send you a link to get back into your account.</p>
                        <div className="input-box">
                            <MdEmail className="emailIcon"/>
                            <input name="email" type="email" placeholder="Email" required></input>
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