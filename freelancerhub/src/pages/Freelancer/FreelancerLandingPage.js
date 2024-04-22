import React from 'react';
import NavigationBarFreelancer from './NavigationBarFreelancer';
import { useNavigate } from 'react-router-dom';


function FreelancerLandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <NavigationBarFreelancer/>
      <div>
         <button onClick={() => navigate('./freelancer-feedback-page')}>Submit feedback</button>
         <button onClick={() => navigate('./freelancer-average-review-box')}>Show average review</button>
      </div>
    </div>
  );
}

export default FreelancerLandingPage;