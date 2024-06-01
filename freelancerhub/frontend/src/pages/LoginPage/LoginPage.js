import React, { useState } from 'react';
import { useHistory } from 'react-router-use-history';
import "./styles/LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { useUser } from '../../context/UserContext';
import Switch from "../../components/Switch";
import { useNotification } from '../../context/NotificationContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import {getDocs,collection, where, query} from 'firebase/firestore'
import { db,auth } from '../../firebase';
import { get } from 'vant/lib/utils';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [collectionName, setCollectionName] = useState('freelancers');
    const { updateUser } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();
    const navigate = useNavigate();

    const handleToggle = (newState) => {
        console.log('Switch is now', newState ? 'FREELANCER' : 'CLIENT');
        setCollectionName(newState ? 'freelancers' : 'clients');
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const dbref = collection(db, collectionName);
        const matchUsername = query(dbref, where('username', '==', email));
        const matchEmail = query(dbref, where('email', '==', email));
        try {
            let userCredential;
            const usernameSnapshot = await getDocs(matchUsername);
            const usernameArray = usernameSnapshot.docs.map((doc) => doc.data());
            const emailSnapshot = await getDocs(matchEmail);
            const emailArray = emailSnapshot.docs.map((doc) => doc.data());
    
            if (usernameArray.length > 0) {
                const matchedUser = usernameArray[0];
                userCredential = await signInWithEmailAndPassword(auth, matchedUser.email, pass);
            } else if (emailArray.length > 0) {
                const matchedUser = emailArray[0];
                userCredential = await signInWithEmailAndPassword(auth, matchedUser.email, pass);
            } else {
                throw new Error('No user found.');
            }
    
            console.log(userCredential, "authData");
            setIsLoggedIn(true);
            if (collectionName === 'freelancers') {
                updateUser({id:"freelancerID1",type:"freelancer"});
                navigate("/freelancers/explore");
            } else if (collectionName === 'clients') {
                updateUser({id:"clientID1",type:"client"});
                navigate("/clients/post-project");
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                alert('No user found.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');
            } else {
                console.error('Error logging in:', error);
                alert(`Error logging in: ${error.message}`);
            }
        }
    };

    //const { setPathname } = useNotification();
    //setPathname(null);
    // updateUser(null);

    // const handlefreelancersClick = () => {
    //     setIsLoggedIn(true);
    //     //setPathname('/freelancers/notifications');
    //     history.push('/freelancers/explore');
    // };

    // const handleclientsClick = () => {
    //     setIsLoggedIn(true);
    //     //setPathname('/clients/notifications');
    //     history.push('/clients/post-project');
    // };

    // setIsLoggedIn(false);
        return(
        <div className="loginPage">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ color: 'white' }}>Login</h1>
                    <div className="input-box" style={{ color: 'white' }}>
                        <FaUser className="icon" /><input name="user" className="email" type="text" placeholder="Email/Username" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-box" style={{ color: 'white' }}>
                        <FaLock className="icon" /><input name="pass" className="pass" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} required />
                    </div>
                    <div className="identity" style={{ color: 'white' }}>
                    <Link to="/resetPassword" id="forgotPass">Forgot password?</Link>
                        <label className="identity-label">
                            <Switch
                                id="role"
                                className="switch"
                                initialFreelancerState={true}
                                onToggle={handleToggle}
                                onColor='grey'
                            />
                        </label>
                    </div>
                    <div className='button_container' style={{paddingTop:10}}>
                        <button className='login-button' type="submit">Login</button>
                    </div>
                    <div className="register-link">
                        <p style={{ color: 'white' }}>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
   );
};

export default LoginPage;