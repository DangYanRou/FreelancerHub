import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLandingPage from '../pages/Clients/ClientLandingPage';
import ProjectPosted from '../pages/Clients/ProjectPosted';
import ProposalReceivedPage from '../pages/Clients/ApplicationReceivedPage';
import ProposalDetails from '../pages/Clients/ProposalDetails';
import ProjectCompletedPageClient from '../pages/Clients/ProjectCompletedPageClient';
import CreateProjectDetail from '../pages/Clients/CreateProjectDetail';
import CreateProjectDescription from '../pages/Clients/CreateProjectDescription';
import CreateProjectPreferred from '../pages/Clients/CreateProjectPreferred';
import CreateProjectInvite from '../pages/Clients/CreateProjectInvite';
import CreateProjectPreview from '../pages/Clients/CreateProjectPreview';
import ClientProfile from '../pages/Clients/ClientProfile';
import ClientFeedbackPage from '../pages/Clients/ClientFeedbackPage';
import ClientAverageReviewBox from '../pages/Clients/ClientAverageReviewBox';
import ClientNotificationPage from '../pages/Clients/ClientNotificationPage';
import FreelancerTemporaryProfile from '../pages/Freelancer/FreelancerTemporaryProfile';
import ClientSaved from '../pages/Clients/ClientSaved';
import WithNavigation from '../WithNavigation';
import { ProjectInfoProvider } from '../pages/Clients/ProjectInfoProvider'; 

const ClientRoutes = () => {
  return (
    <WithNavigation>
    <ProjectInfoProvider>
      <Routes>
        <Route path="/" element={<ClientLandingPage />} />
        <Route path="project-posted" element={<ProjectPosted />} />
        <Route path="proposal-received" element={<ProposalReceivedPage />} />
        <Route path="proposal-details" element={<ProposalDetails />} />
        <Route path="project-completed" element={<ProjectCompletedPageClient />} />
        <Route path="post-project" element={<CreateProjectDetail />} />
        <Route path="post-project-description" element={<CreateProjectDescription />} />
        <Route path="post-project-preferred" element={<CreateProjectPreferred />} />
        <Route path="post-project-invite" element={<CreateProjectInvite />} />
        <Route path="post-project-preview" element={<CreateProjectPreview />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="client-feedback-page" element={<ClientFeedbackPage />} />
        <Route path="client-average-review-box" element={<ClientAverageReviewBox />} />
        <Route path="notifications" element={<ClientNotificationPage />} />
        <Route path="freelancer-temporary-profile" element={<FreelancerTemporaryProfile />} />
        <Route path="saved" element={<ClientSaved />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </ProjectInfoProvider>
    </WithNavigation>
  );
};

export default ClientRoutes;