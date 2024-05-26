import "./styles/Register.css";
import Switch from "../../components/Switch";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from 'react';
import { db, auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [collectionName, setCollectionName] = useState('freelancers');

    const handleToggle = (newState) => {
        console.log('Switch is now', newState ? 'FREELANCER' : 'CLIENT');
        setCollectionName(newState ? 'freelancers' : 'clients');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (pass.length < 6) {
            alert('Password should be at least 6 characters long');
            return;
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            // Add user details to Firestore
            const dbref = collection(db, collectionName);
            await addDoc(dbref, { uid: user.uid, username: username, email: email });

            console.log(userCredential, "authData");
            alert('User registered successfully!');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('The email address is already in use by another account.');
            } else {
                console.error('Error registering user:', error);
                alert(`Error registering user: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <div className="registerPage">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <div className="input-box">
                            <FaUser className="icon" /><input className="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required></input>
                        </div>
                        <div className="input-box" style={{ color: 'white' }}>
                            <MdEmail className="icon" /><input name="email" className="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                        <div className="input-box" style={{ color: 'white' }}>
                            <FaLock className="icon" /><input name="pass" className="pass" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} required></input>
                        </div>
                        <div className="identity" style={{ color: 'white' }}>
                            <label className="identity-label">
                                I am a
                                <Switch
                                    id="role"
                                    className="switch"
                                    initialFreelancerState={true}
                                    onToggle={handleToggle}
                                    onColor='grey'
                                />
                            </label>
                        </div>
                        <div className="remember-forgot" style={{ color: 'white' }}>
                            <label><input type="checkbox" />I agree to the terms & conditions</label>
                        </div>

                        <button id="submit" className="register-button" type="submit" style={{ margin: 10 }}>Register</button>

                        <div className="register-link">
                            <p style={{ color: 'white', marginLeft: 20 }}>Already have an account? <Link to="/">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
