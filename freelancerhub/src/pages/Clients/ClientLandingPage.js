import React, { useState } from 'react';
import NavigationBarClient from './NavigationBarClient';

import { useNavigate } from 'react-router-dom';




function ClientLandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBarClient/>
      <div>
         <button onClick={() => navigate('./client-feedback-page')}>Submit feedback</button>
      </div>
    </div>

    
  );
}

export default ClientLandingPage;