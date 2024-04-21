import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NavigationBar.css';

const NavigationBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  // Function to toggle the visibility of the sub-menu
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* Use Link component from React Router for navigation */}
        <li><Link to="/freelancers/proposal-form">Explore</Link></li>
        <li>
          <a href="#Projects" onClick={toggleSubMenu}>Projects</a>
          {/* Conditionally render the sub-menu based on the state */}
          {showSubMenu && (
            <ul className="sub-menu">
              <li><Link to="/freelancers/projects-applied">Projects Applied</Link></li>
              <li><Link to="/freelancers/proposal-form">Projects Completed</Link></li>
            </ul>
          )}
        </li>
        <li>
          <a href="#Saved" onClick={toggleSubMenu}>Saved</a>
          {/* Conditionally render the sub-menu based on the state */}
          {showSubMenu && (
            <ul className="sub-menu">
              <li><Link to="/freelancers/proposal-form">Projects</Link></li>
              <li><Link to="/freelancers/proposal-form">Clients</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/freelancers/proposal-form">Notification</Link></li>
        <li><Link to="/freelancers/proposal-form">Profile</Link></li>
        <li><Link to="/login">Log Out</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;