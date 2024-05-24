import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FreelancerExplore from '../pages/Freelancer/FreelancerExplore';
import ProjectsApplied from '../pages/Freelancer/ProjectsApplied';
import ProposalForm from '../pages/Freelancer/ProposalForm';
import FreelancerProfile from '../pages/Freelancer/FreelancerProfile';
import ProjectDetailsPage from '../pages/Freelancer/ProjectDetailsPage';
import ApplicationDetails from '../pages/Freelancer/ApplicationDetails';
import FreelancerFeedbackPage from '../pages/Freelancer/FreelancerFeedbackPage';
import FreelancerAverageReviewBox from '../pages/Freelancer/FreelancerAverageReviewBox';
import ProjectCompletedPage from '../pages/Freelancer/ProjectCompletedPage';
import FreelancerNotificationPage from '../pages/Freelancer/FreelancerNotificationPage';
import ClientTemporaryProfile from '../pages/Clients/ClientTemporaryProfile';
import FreelancerSaved from '../pages/Freelancer/FreelancerSaved';
import WithNavigation from '../WithNavigation';

const FreelancerRoutes = () => {
  return (
    <WithNavigation>
      <Routes>
        <Route path="explore" element={<FreelancerExplore />} />
        <Route path="projects-applied" element={<ProjectsApplied />} />
        <Route path="proposal-form" element={<ProposalForm />} />
        <Route path="profile" element={<FreelancerProfile />} />
        <Route path="project-details" element={<ProjectDetailsPage />} />
        <Route path="application" element={<ApplicationDetails />} />
        <Route path="freelancer-feedback-page" element={<FreelancerFeedbackPage />} />
        <Route path="freelancer-average-review-box" element={<FreelancerAverageReviewBox />} />
        <Route path="project-completed-page" element={<ProjectCompletedPage />} />
        <Route path="notifications" element={<FreelancerNotificationPage />} />
        <Route path="client-temporary-profile" element={<ClientTemporaryProfile />} />
        <Route path="saved" element={<FreelancerSaved />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </WithNavigation>
  );
};

export default FreelancerRoutes;