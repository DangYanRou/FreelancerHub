import React, { useState } from 'react';
import '../styles/NavigationBarFreelancer.css';

const NavigationBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  // Function to toggle the visibility of the sub-menu
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><a href="#Explore">Explore</a></li>
        <li>
          <a href="#Projects" onClick={toggleSubMenu}>Projects</a>
          {/* Conditionally render the sub-menu based on the state */}
          {showSubMenu && (
            <ul className="sub-menu">
              <li><a href="#ProjectsApplied">Projects Applied</a></li>
              <li><a href="#ProjectsCompleted">Projects Completed</a></li>
            </ul>
          )}
        </li>
        <li><a href="#Saved">Saved</a></li>
        <li><a href="#Notification">Notification</a></li>
        <li><a href="#Profile">Profile</a></li>
        <li><a href="#LogOut">Log Out</a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;