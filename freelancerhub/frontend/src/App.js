import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FreelancerRoutes from './nav/routes/FreelancerRoutes';
import ClientRoutes from './nav/routes/ClientRoutes';
import LoginPage from './pages/LoginPage/LoginPage.js';
import ResetPassword from './pages/LoginPage/ResetPassword';
import Register from './pages/LoginPage/Register';
import { UserProvider, useUser } from './context/UserContext.js';
import NotificationProvider from './context/NotificationContext.js';
import WithNavigation from './nav/routes/WithNavigation';
import './tailwind.css';
import Layout from './components/Layout.js';



function App() {
  return (
    <div className="App">
      <UserProvider>
      <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
            <Routes> 
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/freelancers/*" element={<FreelancerRoutes />} />
              <Route path="/clients/*" element={<ClientRoutes />} />
            </Routes>
          </Layout>
         
          
      </UserProvider>
    </div>
  );
}

export default App;