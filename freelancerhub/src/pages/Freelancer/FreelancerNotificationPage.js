import React from 'react';
import '../../styles/Freelancers/FreelancerNotificationPage.css';
import NavigationBar from './NavigationBarFreelancer';

const notifications = [
    { id: 1, text: "You have received a project invatation", time: "2 hours ago", priority: "important"},
    { id: 2, text: "Your application was submitted successfully", time: "3 hours ago", priority: "normal" },
    { id: 3, text: "You have updated your saved projects succeessfully", time: "1 day ago", priority: "seen" },
    { id: 4, text: "You have updated your saved collaborator succeessfully", time: "1 day ago", priority: "seen" },
    { id: 5, text: "You have updated your saved projects succeessfully", time: "3 days ago", priority: "seen" },
    { id: 6, text: "You have updated your saved collaborator succeessfully", time: " days ago", priority: "seen" }
  ];
  
  const NotificationPage = () => {
    return (
      <div className="notification-page">
        <NavigationBar></NavigationBar>
        <div className="notification-container">
          <h1 className="notification-heading">Notifications</h1>
          <div className="notification-list">
            {notifications.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default NotificationPage;