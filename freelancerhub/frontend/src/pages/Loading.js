import React from 'react';
import '../styles/Loading.css'; 
import { MagnifyingGlass } from 'react-loader-spinner';
import Working from "../Gallery/working.png";
import PopNoti from './NotificationContext';

const Loading = ({ text = "Loading..." }) => {
  const wrappedText = text.split("").map((char, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char}</span>
  ));

  return (
    <div className="loading-overlay">
      <div className="blurred-content"></div>

      <div className="loading-content">
        <div className="loading-spinner">
          <div className="magnifying-glass-wrapper combined-animation">
            <MagnifyingGlass
              visible={true}
              height="100"
              width="100"
              ariaLabel="magnifying-glass-loading"
              glassColor="#F0F7F9"
              color="#213E60"
            />
          </div>
        </div>

        <img src={Working} alt="Working badge" className="working-badge" />
        
        <div className="loading-text">{wrappedText}</div>
      </div>
    </div>
  );
};

export default Loading;