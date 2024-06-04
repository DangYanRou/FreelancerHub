import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FreelancerExplore from '../../pages/Freelancer/Project/FreelancerExplore';
import FreelancerProjectsApplied from '../../pages/Freelancer/Application/FreelancerProjectsApplied';
import ProposalForm from '../../pages/Freelancer/Application/FreelancerApplicationForm';
import FreelancerProfile from '../../pages/Freelancer/Profile/FreelancerProfile';
import ApplicationDetails from '../../pages/Freelancer/Application/FreelancerApplicationDetails';
import FreelancerFeedbackPage from '../../pages/Freelancer/Feedback/FreelancerFeedbackPage';
import FreelancerAverageReviewBox from '../../pages/Freelancer/Profile/FreelancerAverageReviewBox';
import ProjectCompletedPage from '../../pages/Freelancer/Project/ProjectCompletedPage';
import NotificationPage from '../../pages/NotificationPage';
import FreelancerSaved from '../../pages/Freelancer/Saved/FreelancerSaved';
import WithNavigation from './WithNavigation';
import ClientProfile from '../../pages/Clients/Profile/ClientProfile'

const FreelancerRoutes = () => {
  return (
    <WithNavigation>
      <Routes>
        <Route path="explore" element={<FreelancerExplore />} />
        <Route path="projects-applied" element={<FreelancerProjectsApplied />} />
        <Route path="proposal-form" element={<ProposalForm />} />
        <Route path="profile" element={<FreelancerProfile />} />
        <Route path="application" element={<ApplicationDetails />} />
        <Route path="freelancer-feedback-page" element={<FreelancerFeedbackPage />} />
        <Route path="freelancer-average-review-box" element={<FreelancerAverageReviewBox />} />
        <Route path="project-completed-page" element={<ProjectCompletedPage />} />
        <Route path="notifications" element={<NotificationPage/>} />
        <Route path="freelancer-view-profile" element={<ClientProfile/>} />
        <Route path="saved" element={<FreelancerSaved />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </WithNavigation>
  );
};

export default FreelancerRoutes;