
import React, { useState } from 'react';
import { useHistory } from 'react-router-use-history'

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

    // Render login page only if user is not logged in
    if (!isLoggedIn) {
        return (
            <div>
                LoginPage
                <button onClick={handleFreelancerClick}>Freelancer</button>
                <button onClick={handleClientsClick}>Clients</button>
            </div>
        );
    } else {
        return ;
    }
};

export default LoginPage;