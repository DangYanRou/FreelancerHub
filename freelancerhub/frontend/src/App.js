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

const user_types={
  public:"public",
  freelancers:"freelancer",
  clients:"client",
}

const current_user_type=user_types.public
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PublicElement><LoginPage /></PublicElement>} />
          </Routes>
          <Routes> 
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/freelancers/*" element={<FreelancerElement><FreelancerRoutes /></FreelancerElement>} />
            <Route path="/clients/*" element={<ClientElement><ClientRoutes /></ClientElement>} />
          </Routes>
        </Layout> 
      </UserProvider>
    </div>
  );
}

function PublicElement({children}){
  return <>{children}</>
}

function FreelancerElement({children}){
  const { user } = useUser();
  if (user.type===user_types.freelancers){
    return <>{children}</>
  }else{
    return <Navigate to ={"/"}/>
  }
}

function ClientElement({children}){
  const { user } = useUser();
  if (user.type===user_types.clients){
    return <>{children}</>
  }else{
    return <Navigate to ={"/"}/>
  }
}

export default App;