import React from 'react';
import '../styles/NavigationBarFreelancer.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><a href="#Explore">Explore</a></li>
        <li><a href="#Projects">Projects</a></li>
        <li><a href="#Saved">Saved</a></li>
        <li><a href="#Notification">Notification</a></li>
        <li><a href="#Profile">Profile</a></li>
        <li><a href="#LogOut">Log Out</a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;