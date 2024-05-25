
import React from 'react';
import { useUser } from '../../context/UserContext';
import NavigationBarFreelancer from '../NavigationBarFreelancer';
import NavigationBarClient from '../NavigationBarClient';

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