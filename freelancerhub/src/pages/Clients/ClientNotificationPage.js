import React from 'react';
import '../../styles/Freelancers/FreelancerNotificationPage.css';
import NavigationBarClient from './NavigationBarClient';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';


  const notifications2 = [
    { id: 2, text: "Your project was posted successfully", time: "3 hours ago", priority: "normal" },
  ];

const notifications3 = [
    { id: 4, text: "You have updated your saved collaborator succeessfully", time: "1 day ago", priority: "seen" },
  ];

  const notifications4 = [
    { id: 6, text: "You have updated your saved collaborator succeessfully", time: "4 days ago", priority: "seen" }
  ];
  
  const ClientNotificationPage = () => {
    return (
      <div className="notification-page">
        <NavigationBarClient></NavigationBarClient>
        <div className="notification-container">
        <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
            Notifications
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
          <h2 className="notification-timebond">New</h2>
          <Link Link to="/clients/project-posted" className='notificationLink'>
          <div className="notification-list">
            {notifications2.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
          <h2 className="notification-timebond">Yesterday</h2>
          <Link Link to="/clients/saved" className='notificationLink'>
          <div className="notification-list">
            {notifications3.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
          <h2 className="notification-timebond">Earlier</h2>
          <Link Link to="/clients/saved" className='notificationLink'>
          <div className="notification-list">
            {notifications4.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default ClientNotificationPage;