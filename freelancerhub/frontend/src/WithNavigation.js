
import React from 'react';
import { useUser } from './UserContext';
import NavigationBarFreelancer from './pages/Freelancer/NavigationBarFreelancer';
import NavigationBarClient from './pages/Clients/NavigationBarClient';

const WithNavigation = ({ children }) => {
  const { user } = useUser();

  return (
    <>
      {user?.type === 'freelancer' && <NavigationBarFreelancer />}
      {user?.type === 'client' && <NavigationBarClient />}
      {children}
    </>
  );
};

export default WithNavigation;