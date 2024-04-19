import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FreelancerLandingPage from './pages/Freelancer/FreelancerLandingPage';
import ProposalForm from './pages/Freelancer/ProposalForm';
import LoginPage from './pages/LoginPage';
import ProjectsApplied from './pages/Freelancer/ProjectsApplied';
import ClientLandingPage from './pages/Clients/ClientLandingPage';
import ProposalReceivedPage from './pages/Clients/ProposalReceivedPage';
import FreelancerProfile from './pages/Freelancer/FreelancerProfile';
import ClientProfile from './pages/Clients/ClientProfile';
import ProposalDetails from './pages/Clients/ProposalDetails';

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
      <Route path="profile" element={<FreelancerProfile />} />
      {/* Add more nested routes as needed */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientLandingPage />} />
      <Route path="proposal-received" element={<ProposalReceivedPage />} />
      <Route path="profile" element={<ClientProfile />} />
      <Route path="proposal-details" element={<ProposalDetails />} />
      {/* Add more nested routes as needed */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;