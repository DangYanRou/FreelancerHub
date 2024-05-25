import React, { useState } from 'react';
import NavigationBarClient from './NavigationBarClient';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




function ClientLandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
         <button onClick={() => navigate('./client-feedback-page')}>Submit feedback</button>
         <button onClick={() => navigate('./client-average-review-box')}>Show average review</button>
      </div>
    </div>

    
  );
}

export default ClientLandingPage;