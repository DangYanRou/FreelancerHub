import React,{ useState }  from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FreelancerLandingPage from './pages/Freelancer/FreelancerLandingPage';
import ProposalForm from './pages/Freelancer/ProposalForm';
import LoginPage from './pages/LoginPage/LoginPage.js';
import ProjectsApplied from './pages/Freelancer/ProjectsApplied';
import ClientLandingPage from './pages/Clients/ClientLandingPage';
import ProposalReceivedPage from './pages/Clients/ProposalReceivedPage';
import FreelancerProfile from './pages/Freelancer/FreelancerProfile';
import ClientProfile from './pages/Clients/ClientProfile';
import ProposalDetails from './pages/Clients/ProposalDetails';
import ResetPassword from './pages/LoginPage/ResetPassword';
import FreelancerExplore from './pages/Freelancer/FreelancerExplore';
import CreateProjectDetail from './pages/Clients/CreateProjectDetail';
import CreateProjectDescription from './pages/Clients/CreateProjectDescription';
import CreateProjectPreferred from './pages/Clients/CreateProjectPreferred';
import CreateProjectInvite from './pages/Clients/CreateProjectInvite';
import CreateProjectPreview from './pages/Clients/CreateProjectPreview';
import './tailwind.css';
import ProjectDetailsPage from './pages/Freelancer/ProjectDetailsPage';
import ProjectPosted from './pages/Clients/ProjectPosted';
import ApplicationDetails from './pages/Freelancer/ApplicationDetails';
import ProjectCompletedPageClient from './pages/Clients/ProjectCompletedPageClient.js';
import ClientFeedbackPage from './pages/Clients/ClientFeedbackPage';
import FreelancerFeedbackPage from './pages/Freelancer/FreelancerFeedbackPage';
import FreelancerAverageReviewBox from './pages/Freelancer/FreelancerAverageReviewBox';
import ClientAverageReviewBox from './pages/Clients/ClientAverageReviewBox';
import ProjectCompletedPage from './pages/Freelancer/ProjectCompletedPage';
import FreelancerSaved from './pages/Freelancer/FreelancerSaved';
import ClientSaved from './pages/Clients/ClientSaved';
import FreelancerNotificationPage from './pages/Freelancer/FreelancerNotificationPage.js';
import FreelancerTemporaryProfile from './pages/Freelancer/FreelancerTemporaryProfile';
import ClientNotificationPage from './pages/Clients/ClientNotificationPage.js';
import Register from './pages/LoginPage/Register';
import ClientTemporaryProfile from './pages/Clients/ClientTemporaryProfile';
import Loading from './pages/Loading.js';
import { UserProvider } from './UserContext';
import { ProjectInfoProvider } from './pages/Clients/ProjectInfoProvider'; 
import NotificationProvider from './pages/NotificationContext.js';





function App() {

  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    <div className="App">
<UserProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </NotificationProvider>

          <Routes> 
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/freelancers/*" element={<FreelancerRoutes />} />
            <Route path="/clients/*" element={<ClientRoutes />} />
          </Routes>
      </UserProvider>



    </div>
  );
}

function FreelancerRoutes() {
  return (
    <Routes>
      <Route path="explore" element={<FreelancerExplore/>}/>
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
  );
}

function ClientRoutes() {
 
  return (
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
      <Route path="profile" element={<ClientProfile/>}/>
      <Route path="client-feedback-page" element={<ClientFeedbackPage />} />
      <Route path="client-average-review-box" element={<ClientAverageReviewBox />} />
      <Route path="notifications" element={<ClientNotificationPage />} />
      <Route path="freelancer-temporary-profile" element={<FreelancerTemporaryProfile />} />
      {/* Add more nested routes as needed */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="saved" element={<ClientSaved/>} />
    </Routes>
    </ProjectInfoProvider>

  
  );
}

export default App;