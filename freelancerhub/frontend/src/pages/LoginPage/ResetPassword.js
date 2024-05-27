import React from 'react';
import { MdEmail, MdLockReset } from "react-icons/md";
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
                    <form onSubmit={handleSubmit} >
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
};

export default ResetPassword;