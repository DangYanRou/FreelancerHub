import React from 'react';
import '../../styles/Freelancers/FreelancerNotificationPage.css';
import NavigationBarClient from './NavigationBarClient';
import { Link } from 'react-router-dom';

const notifications1 = [
    { id: 1, text: "You have received a project invitation", time: "2 hours ago", priority: "important"}
  ];

  const notifications2 = [
    { id: 2, text: "Your application was submitted successfully", time: "3 hours ago", priority: "normal" },
  ];

const notifications3 = [
    { id: 3, text: "You have updated your saved projects succeessfully", time: "1 day ago", priority: "seen" },
    { id: 4, text: "You have updated your saved collaborator succeessfully", time: "1 day ago", priority: "seen" },
  ];

  const notifications4 = [
    { id: 5, text: "You have updated your saved projects succeessfully", time: "3 days ago", priority: "seen" },
    { id: 6, text: "You have updated your saved collaborator succeessfully", time: "4 days ago", priority: "seen" }
  ];
  
  const ClientNotificationPage = () => {
    return (
      <div className="notification-page">
        <NavigationBarClient></NavigationBarClient>
        <div className="notification-container">
          <h1 className="notification-heading">Notifications</h1>
          <h2 className="notification-timebond">New</h2>
          <div className="notification-list">
            {notifications1.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>

            ))}
          </div>
          <Link Link to="/freelancers/projects-applied" className='notificationLink'>
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
          <Link Link to="/freelancers/saved" className='notificationLink'>
          <div className="notification-list">
            {notifications3.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
          <h2 className="notification-timebond">Last 30 Days</h2>
          <Link Link to="/freelancers/saved" className='notificationLink'>
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