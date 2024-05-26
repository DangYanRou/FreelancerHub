import React, { useState } from 'react';
import './styles/Switch.css';

const Switch = ({ initialFreelancerState= true, onToggle, onColor = 'grey'}) => {
  const [isFreelancer, setIsFreelancer] = useState(initialFreelancerState);

  const handleToggleSwitch = () => {
    setIsFreelancer(prevState => {
      const newState = !prevState;
      if (onToggle) {
        onToggle(newState);
      }
      return newState;
    });
  };

  return (
    <>
      <input
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
        checked={isFreelancer}
        onChange={handleToggleSwitch}
      />
      <label
        className="react-switch-label"
        htmlFor="react-switch-new"
        style={{ background: isFreelancer ? onColor : '#213e60' }}
      >
        <span className="react-switch-button" />
        <span className={`switch-text ${isFreelancer ? 'switch-text-left' : 'switch-text-right'}`}>
          {isFreelancer ? 'FREELANCER' : 'CLIENT'}
        </span>
      </label>
    </>
  );
};

export default Switch;

