import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectPosted from '../../pages/Clients/Project/ProjectPosted';
import ProposalReceivedPage from '../../pages/Clients/Application/ClientApplicationReceivedPage';
import ProposalDetails from '../../pages/Clients/Application/ClientApplicationDetails';
import ProjectCompletedPageClient from '../../pages/Clients/Project/ProjectCompletedPageClient';
import CreateProjectDetail from '../../pages/Clients/Project/CreateProjectDetail';
import CreateProjectDescription from '../../pages/Clients/Project/CreateProjectDescription';
import CreateProjectPreferred from '../../pages/Clients/Project/CreateProjectPreferred';
import CreateProjectInvite from '../../pages/Clients/Project/CreateProjectInvite';
import CreateProjectPreview from '../../pages/Clients/Project/CreateProjectPreview';
import EditProjectPreview from '../../pages/Clients/Project/EditProjectPreview';
import EditProjectDetail from '../../pages/Clients/Project/EditProjectDetail';
import EditProjectDescription from '../../pages/Clients/Project/EditProjectDescription';
import EditProjectPreferred from '../../pages/Clients/Project/EditProjectPreferred';
import ClientProfile from '../../pages/Clients/Profile/ClientProfile';
import ClientFeedbackPage from '../../pages/Clients/Feedback/ClientFeedbackPage';
import ClientAverageReviewBox from '../../pages/Clients/Profile/ClientAverageReviewBox';
import NotificationPage from '../../pages/NotificationPage';
import FreelancerTemporaryProfile from '../../pages/Freelancer/Profile/FreelancerTemporaryProfile';
import ClientSaved from '../../pages/Clients/Saved/ClientSaved';
import WithNavigation from './WithNavigation';
import { ProjectInfoProvider } from '../../context/ProjectInfoProvider'; 
import { EmailProvider } from '../../context/ProjectInvitationContext'; 

const ClientRoutes = () => {
  return (
    <WithNavigation>
    <ProjectInfoProvider>
    <EmailProvider>
      <Routes>
        <Route path="project-posted" element={<ProjectPosted />} />
        <Route path="proposal-received" element={<ProposalReceivedPage />} />
        <Route path="proposal-details" element={<ProposalDetails />} />
        <Route path="project-completed" element={<ProjectCompletedPageClient />} />
        <Route path="post-project" element={<CreateProjectDetail />} />
        <Route path="post-project-description" element={<CreateProjectDescription />} />
        <Route path="post-project-preferred" element={<CreateProjectPreferred />} />
        <Route path="post-project-invite" element={<CreateProjectInvite />} />
        <Route path="post-project-preview" element={<CreateProjectPreview />} />
        <Route path="edit-project-preview" element={<EditProjectPreview />} />
        <Route path="edit-project/:projectId" element={<EditProjectDetail />} />        
        <Route path="edit-project-description" element={<EditProjectDescription />} />
        <Route path="edit-project-preferred" element={<EditProjectPreferred />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="client-feedback-page" element={<ClientFeedbackPage />} />
        <Route path="client-average-review-box" element={<ClientAverageReviewBox />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="freelancer-temporary-profile" element={<FreelancerTemporaryProfile />} />
        <Route path="saved" element={<ClientSaved />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </EmailProvider>
      </ProjectInfoProvider>
    </WithNavigation>
  );
};

export default ClientRoutes;