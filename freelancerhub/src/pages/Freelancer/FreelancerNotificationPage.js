import React from 'react';
import '../../styles/Freelancers/FreelancerNotificationPage.css';
import NavigationBar from './NavigationBarFreelancer';
import { Link } from 'react-router-dom';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { useState } from 'react';
import { useHistory } from 'react-router-use-history';
import Heading from '../../components/Heading';
import Alert from '@mui/material/Alert';
import { useUser } from '../../UserContext';

const NotificationPage = () => {
  const { userId } = useUser();
  console.log(userId)

    return (
      <div className="notification-page">
        <NavigationBar></NavigationBar>
        <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
          Notifications
        </Heading>
        <p>User ID: {userId}</p>
        <div className="notification-container">
          <Alert severity="success">This is a success Alert.</Alert>
          <Alert severity="info">This is an info Alert.</Alert>
          <Alert severity="warning">This is a warning Alert.</Alert>
          <Alert severity="error">This is an error Alert.</Alert>
        </div>  
      </div>
    );
  }
  
  export default NotificationPage;