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
        <li><Link to="/freelancers/Explore">Explore</Link></li>
        <li>
          <a href="#Projects" onClick={toggleSubMenu}>Projects</a>
          {/* Conditionally render the sub-menu based on the state */}
          {showSubMenu && (
            <ul className="sub-menu">
              <li><Link to="/freelancers/projects-applied">Projects Applied</Link></li>
              <li><Link to="/freelancers/project-completed-page">Projects Completed</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/freelancers/saved">Saved</Link></li>
        <li><Link to="/freelancers/proposal-form">Notification</Link></li>
        <li><Link to="/freelancers/profile">Profile</Link></li>
        <li><Link to="/">Log Out</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;