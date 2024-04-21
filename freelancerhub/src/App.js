import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FreelancerLandingPage from './pages/Freelancer/FreelancerLandingPage';
import ProposalForm from './pages/Freelancer/ProposalForm';
import LoginPage from './pages/LoginPage';
import ProjectsApplied from './pages/Freelancer/ProjectsApplied';
import ClientLandingPage from './pages/Clients/ClientLandingPage';
import ClientFeedbackPage from './pages/Clients/ClientFeedbackPage';
import FreelancerFeedbackPage from './pages/Freelancer/FreelancerFeedbackPage';
import FreelancerAverageReviewBox from './pages/Freelancer/FreelancerAverageReviewBox';
import ClientAverageReviewBox from './pages/Clients/ClientAverageReviewBox';

function App() {
  return (
    <div className="App">
      <LoginPage />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/freelancers/*" element={<FreelancerRoutes />} />
        <Route path="/clients/*" element={<ClientRoutes />} />
        {/* Add more top-level routes if needed */}
      </Routes>
    </div>
  );
}

function FreelancerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FreelancerLandingPage />} />
      <Route path="projects-applied" element={<ProjectsApplied />} />
      <Route path="proposal-form" element={<ProposalForm />} />
      <Route path="freelancer-feedback-page" element={<FreelancerFeedbackPage />} />
      <Route path="freelancer-average-review-box" element={<FreelancerAverageReviewBox />} />
      {/* Add more nested routes as needed */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientLandingPage />} />
      <Route path="client-feedback-page" element={<ClientFeedbackPage />} />
      <Route path="client-average-review-box" element={<ClientAverageReviewBox />} />
      {/* Add more nested routes as needed */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;