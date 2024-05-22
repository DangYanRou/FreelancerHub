import "./Register.css";
import { Link } from "react-router-dom";
import { FaUser,FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Register=()=>{
    return(
        <div>
            <div className="registerPage">
            <div className="wrapper">
                    <form action="">
                        <h1  >Register</h1>
                        <div className="input-box">
                            <FaUser className="icon"/><input className="username" type="text" placeholder="Username" required></input>
                        </div>
                        <div className="input-box" style={{ color:'white'}}>
                            <MdEmail  className="icon"/><input className="email" type="text" placeholder="Email" required></input>
                        </div>
                        <div className="input-box" style={{ color:'white'}}>
                            <FaLock className="icon"/><input className="pass" type="password" placeholder="Password" required></input>
                        </div>
                        <div className="remember-forgot" style={{ color:'white'}}>
                            <label><input type="checkbox"></input>I agree to the terms & conditions</label>
                            {/* <Link to="/resetPassword" >Forgot password?</Link> */}
                        </div>

                        <button className="register-button" type="submit" style={{margin:10}}>Register</button>

                        <div className="register-link">
                            <p style={{ color:'white',marginLeft:20}}>Already have an account? <Link to="/">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;